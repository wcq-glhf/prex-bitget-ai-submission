import { createServer } from "node:http"
import { readFile } from "node:fs/promises"
import { fileURLToPath } from "node:url"
import { resolve } from "node:path"
import { displayJob, displayReport, displayResearch, backtestInput, researchInput } from "./lib/display.mjs"

const root = new URL("./public/", import.meta.url)
const assets = new Map([
  ["/", ["index.html", "text/html; charset=utf-8"]],
  ["/app.mjs", ["app.mjs", "text/javascript; charset=utf-8"]],
  ["/styles.css", ["styles.css", "text/css; charset=utf-8"]],
])
const destinations = new Set(["https://test.prex.best", "https://prex.best"])

export function createDisplayServer({ upstream = process.env.PREX_API_BASE || "https://test.prex.best", fetchImpl = fetch } = {}) {
  if (!destinations.has(upstream)) throw new Error("PREX_API_BASE must be https://test.prex.best or https://prex.best")
  const jobs = new Map()
  let creating = false
  let nextCreateAt = 0
  let researching = false
  let sampling = false

  async function request(path, body) {
    let response
    try {
      response = await fetchImpl(`${upstream}${path}`, {
        method: body === undefined ? "GET" : "POST",
        headers: { accept: "application/json", ...(body === undefined ? {} : { "content-type": "application/json" }) },
        ...(body === undefined ? {} : { body: JSON.stringify(body) }),
        signal: AbortSignal.timeout(45_000), redirect: "error",
      })
    } catch {
      throw problem(504, body === undefined ? "读取服务超时，请稍后重试。" : "请求结果暂时未知。没有自动重发，请先在 PREX 检查，避免重复创建。")
    }
    if (!response.ok) {
      const messages = {
        400: "参数或策略描述暂不支持。请补齐标的、周期、日期及交易规则，或到 PREX 策略工作室完善。",
        401: "服务未授权，请到 PREX 检查访问权限。",
        403: "当前请求没有访问权限。",
        404: "任务不存在、已过期或当前网络无权读取。",
        429: "请求频率过高或已有回测运行中。请稍后刷新任务，不要连续提交。",
      }
      const retry = Number(response.headers.get("retry-after"))
      await response.body?.cancel()
      throw problem(response.status, messages[response.status] || "PREX 服务暂时不可用，请稍后再试。", Number.isFinite(retry) && retry > 0 ? Math.min(retry, 300) : 15)
    }
    // Bound the public-client response; never print upstream bodies or provider errors to logs.
    const reader = response.body.getReader()
    const chunks = []
    let size = 0
    try {
      for (;;) {
        const { done, value } = await reader.read()
        if (done) break
        size += value.byteLength
        if (size > 16 * 1024 * 1024) { await reader.cancel(); throw new Error("oversize") }
        chunks.push(value)
      }
      return JSON.parse(Buffer.concat(chunks).toString("utf8"))
    } catch {
      throw problem(502, "服务返回的数据无法读取，请在 PREX 网站查看任务。")
    }
  }

  const server = createServer(async (req, res) => {
    res.setHeader("Cache-Control", "no-store")
    res.setHeader("X-Content-Type-Options", "nosniff")
    res.setHeader("Referrer-Policy", "no-referrer")
    res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self'; style-src 'self'; connect-src 'self'; img-src 'self' data:; frame-ancestors 'none'; base-uri 'none'; form-action 'self'")
    try {
      // Loopback-only, Host + Origin validation prevent DNS rebinding and cross-site requests.
      const port = server.address()?.port
      if (req.headers.host !== `127.0.0.1:${port}` && req.headers.host !== `localhost:${port}`) throw problem(403, "仅允许本机访问。")
      const origin = `http://${req.headers.host}`
      if (req.headers.origin && req.headers.origin !== origin) throw problem(403, "拒绝跨站请求。")
      const url = new URL(req.url, origin)
      const asset = assets.get(url.pathname)
      if (asset && req.method === "GET") {
        res.setHeader("Content-Type", asset[1])
        return res.end(await readFile(new URL(asset[0], root)))
      }
      if (req.headers["x-prex-client"] !== "display-v1") throw problem(403, "请从展示页面访问。")
      if (url.pathname === "/api/config" && req.method === "GET") return json(res, 200, { upstream })
      if (url.pathname === "/api/sample" && req.method === "GET") {
        if (sampling) throw problem(429, "示例报告正在加载。")
        sampling = true
        try {
          const payload = await request("/api/bitget-ai/factor")
          if (payload.success !== true || !payload.result) throw problem(502, "示例报告暂不可用。")
          return json(res, 200, displayReport(payload.result, { sample: true, generatedAt: payload.verification?.generatedAt }))
        } finally { sampling = false }
      }
      if (url.pathname === "/api/research" && req.method === "POST") {
        const input = validate(researchInput, await readJson(req))
        if (researching) throw problem(429, "研究请求正在处理，请等待。")
        researching = true
        try {
          const payload = await request("/api/bitget-ai/research", input)
          if (payload.success !== true) throw problem(502, "研究服务暂不可用。")
          return json(res, 200, displayResearch(payload))
        } finally { researching = false }
      }
      if (url.pathname === "/api/backtests" && req.method === "POST") {
        const input = validate(backtestInput, await readJson(req))
        for (const [id, job] of jobs) if (Date.now() - job.createdAt > 3_600_000) jobs.delete(id)
        if (creating || Date.now() < nextCreateAt || [...jobs.values()].some((j) => !["completed", "failed"].includes(j.status))) {
          throw problem(429, "本客户端有请求等待处理，请先刷新原任务。", 20)
        }
        creating = true
        nextCreateAt = Date.now() + 30_000
        try {
          const job = displayJob(await request("/api/v1/backtests", input))
          jobs.set(job.id, { ...job, createdAt: Date.now() })
          return json(res, 202, { job })
        } finally { creating = false }
      }
      const match = url.pathname.match(/^\/api\/backtests\/([a-zA-Z0-9-]{1,80})$/)
      if (match && req.method === "GET") {
        const local = jobs.get(match[1])
        if (!local) throw problem(404, "当前展示进程没有创建过此任务；重启后请在 PREX 查看。")
        const payload = await request(`/api/v1/backtests/${encodeURIComponent(match[1])}`)
        const job = displayJob(payload.job)
        if (job.id !== local.id) throw problem(502, "任务返回不一致。")
        jobs.set(job.id, { ...local, ...job })
        return json(res, 200, { job, ...(payload.result ? { result: displayReport(payload.result, { generatedAt: payload.job?.finishedAt }) } : {}) })
      }
      throw problem(404, "页面或接口不存在。")
    } catch (error) {
      json(res, error.status || 500, { error: error.publicMessage || "展示客户端处理失败，请稍后重试。" }, error.retryAfter)
    }
  })
  server.requestTimeout = 15_000
  server.headersTimeout = 10_000
  return server
}

function problem(status, publicMessage, retryAfter) { return Object.assign(new Error("request_failed"), { status, publicMessage, retryAfter }) }
function validate(fn, value) { try { return fn(value) } catch (e) { throw problem(400, e.message) } }
function json(res, status, value, retryAfter) {
  if (res.destroyed || res.writableEnded) return
  res.statusCode = status
  res.setHeader("Content-Type", "application/json; charset=utf-8")
  if (retryAfter) res.setHeader("Retry-After", String(retryAfter))
  res.end(JSON.stringify(value))
}
async function readJson(req) {
  if (!req.headers["content-type"]?.startsWith("application/json")) throw problem(415, "仅接受 JSON。")
  const chunks = []
  let length = 0
  for await (const chunk of req) {
    length += chunk.length
    if (length > 64 * 1024) throw problem(413, "请求不能超过 64KB。")
    chunks.push(chunk)
  }
  try { return JSON.parse(Buffer.concat(chunks).toString("utf8")) } catch { throw problem(400, "JSON 格式不正确。") }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT || 4178)
  if (!Number.isInteger(port) || port < 1024 || port > 65535) throw new Error("PORT must be 1024-65535")
  createDisplayServer().listen(port, "127.0.0.1", () => {
    console.log(`PREX display client: http://127.0.0.1:${port}`)
    console.log("Local display only. Research and backtest calculations run on PREX; no orders are placed.")
  })
}
