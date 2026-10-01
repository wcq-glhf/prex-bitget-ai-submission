import test from "node:test"
import assert from "node:assert/strict"
import { once } from "node:events"
import { get } from "node:http"
import { backtestInput, researchInput, displayReport, displayResearch } from "../lib/display.mjs"
import { createDisplayServer } from "../server.mjs"

const sentinel = "PRIVATE_TEST_SENTINEL"
const id = "public-test-job"
const report = {
  strategy: { factors: sentinel }, methodology: sentinel,
  metrics: { totalReturnPct: 12.3, sharpe: 1.2, totalRebalances: 5, private: sentinel },
  equityCurve: [{ ts: 1, equity: 100, private: sentinel }, { ts: 2, equity: 112.3 }],
  rebalances: [sentinel], benchmark: { equityCurve: [{ ts: 1, equity: 100 }, { ts: 2, equity: 103 }] },
}
test("results are explicit allowlists, not raw engine payloads", () => {
  const result = displayReport(report)
  assert.equal(result.metrics[0].value, 12.3)
  assert.equal(result.executionCount, 5)
  assert.deepEqual(result.equity, [{ timestamp: 1, value: 100 }, { timestamp: 2, value: 112.3 }])
  assert.equal(JSON.stringify(result).includes(sentinel), false)
})
test("sample curves keep their server values and are explicitly labelled", () => {
  const result = displayReport({ equity: [{ timestamp: 1, value: 1.2 }], metrics: { totalReturnPct: Infinity } }, { sample: true })
  assert.equal(result.kind, "sample")
  assert.equal(result.equity[0].value, 1.2)
  assert.equal(result.metrics[0].value, null)
})
test("research display drops scoring and private fields", () => {
  const result = displayResearch({ source: "prex-ai+bitget-v3", message: "hello", analyses: [{ market: { symbol: "NVDAUSDT" }, analysis: { price: 100, score: sentinel }, internals: sentinel }] })
  assert.equal(result.markets[0].price, 100)
  assert.equal(JSON.stringify(result).includes(sentinel), false)
})
test("input forwards user parameters without embedding PREX calculation rules", () => {
  const prompt = "Binance BTCUSDT 1h，从 2026-09-01 开始测试我自己的趋势策略。"
  assert.deepEqual(backtestInput({ prompt, ignore: sentinel }), { prompt, language: "zh" })
  const strategy = { name: "User-authored", exchange: "bitget" }
  assert.deepEqual(backtestInput({ mode: "json", strategy }), { strategy })
  assert.throws(() => backtestInput({ prompt: "Bitget rToken 股票动量回测，请帮我测试一下。" }), /JSON/)
  assert.throws(() => backtestInput({ prompt: "hi" }))
  assert.throws(() => researchInput({ question: "test", interval: "15m", symbol: "NVDAUSDT" }))
})

async function fixture(t, fetchImpl) {
  const server = createDisplayServer({ fetchImpl })
  server.listen(0, "127.0.0.1")
  await once(server, "listening")
  t.after(() => new Promise((resolve) => { server.closeAllConnections(); server.close(resolve) }))
  const origin = `http://127.0.0.1:${server.address().port}`
  const call = (path, body, extra = {}) => fetch(`${origin}${path}`, {
    method: body === undefined ? "GET" : "POST",
    headers: { "x-prex-client": "display-v1", "content-type": "application/json", origin, ...extra },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  })
  return { call, origin }
}
test("create then poll is functional; no engine fields reach the browser", async (t) => {
  const calls = []
  const { call } = await fixture(t, async (url, options) => {
    calls.push({ url, options })
    return Response.json(options.method === "POST" ? { id, status: "queued" } : { job: { id, status: "completed" }, result: report })
  })
  const response = await call("/api/backtests", { prompt: "Binance BTCUSDT 1h 的趋势策略回测" })
  assert.equal(response.status, 202)
  const created = await response.json()
  assert.equal(created.job.id, id)
  const data = await (await call(`/api/backtests/${id}`)).json()
  assert.equal(data.job.status, "completed")
  assert.equal(data.result.metrics[0].value, 12.3)
  assert.equal(JSON.stringify(data).includes(sentinel), false)
  assert.equal(calls.length, 2)
  assert.equal(calls[0].options.redirect, "error")
})
test("unknown jobs, cross-site requests, Host injection and file traversal are rejected", async (t) => {
  let calls = 0
  const { call, origin } = await fixture(t, async () => { calls++; return Response.json({}) })
  assert.equal((await call(`/api/backtests/${id}`)).status, 404)
  assert.equal((await call("/api/config", undefined, { origin: "https://attacker.example" })).status, 403)
  const hostStatus = await new Promise((resolve, reject) => {
    get(`${origin}/api/config`, { headers: { host: "attacker.example", "x-prex-client": "display-v1" } }, (res) => {
      res.resume(); resolve(res.statusCode)
    }).on("error", reject)
  })
  assert.equal(hostStatus, 403)
  assert.equal((await call("/.env")).status, 404)
  assert.equal((await call("/server.mjs")).status, 404)
  assert.equal(calls, 0)
})
test("timeout never retries POST and immediate resubmission is blocked", async (t) => {
  let calls = 0
  const { call } = await fixture(t, async () => { calls++; throw new Error(sentinel) })
  const response = await call("/api/backtests", { prompt: "Binance BTCUSDT 1h 的趋势策略回测" })
  assert.equal(response.status, 504)
  assert.equal((await response.text()).includes(sentinel), false)
  assert.equal((await call("/api/backtests", { prompt: "Binance BTCUSDT 1h 的趋势策略回测" })).status, 429)
  assert.equal(calls, 1)
})
test("concurrent submissions create only one upstream task", async (t) => {
  let release
  let calls = 0
  const pending = new Promise((resolve) => { release = resolve })
  const { call } = await fixture(t, async () => { calls++; await pending; return Response.json({ id, status: "queued" }) })
  const first = call("/api/backtests", { prompt: "Binance BTCUSDT 1h 的趋势策略回测" })
  while (!calls) await new Promise((resolve) => setTimeout(resolve, 1))
  const second = await call("/api/backtests", { prompt: "Binance BTCUSDT 1h 的趋势策略回测" })
  release()
  assert.equal(second.status, 429)
  assert.equal((await first).status, 202)
  assert.equal(calls, 1)
})
test("upstream errors never expose provider bodies and carry retry hints", async (t) => {
  const { call } = await fixture(t, async () => new Response(sentinel, { status: 429, headers: { "retry-after": "60" } }))
  const response = await call("/api/sample")
  assert.equal(response.status, 429)
  assert.equal(response.headers.get("retry-after"), "60")
  assert.equal((await response.text()).includes(sentinel), false)
})
test("no arbitrary upstream hosts", () => {
  assert.throws(() => createDisplayServer({ upstream: "http://169.254.169.254" }))
})
