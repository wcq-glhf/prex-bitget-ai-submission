const $ = (id) => document.getElementById(id)
let currentJob = null
let busy = false
let lastResult = null
let chartObserver = null

function status(message, error = false) {
  $("status").textContent = message
  $("status").classList.toggle("error", error)
}
function lock(value) {
  busy = value
  for (const button of document.querySelectorAll(".primary, #refresh-job")) button.disabled = value
}
function node(tag, className, content) {
  const item = document.createElement(tag)
  if (className) item.className = className
  if (content !== undefined) item.textContent = content
  return item
}
const format = (value, unit = "") => typeof value === "number" && Number.isFinite(value)
  ? `${value.toLocaleString("zh-CN", { maximumFractionDigits: 2, minimumFractionDigits: 2 })}${unit}` : "—"

function beginRequest(title) {
  chartObserver?.disconnect()
  chartObserver = null
  lastResult = null
  $("download").hidden = true
  $("result-title").textContent = title
  $("output").replaceChildren(node("p", "hint", "等待 PREX 返回本次请求结果…"))
}

async function api(path, body) {
  const response = await fetch(path, {
    method: body === undefined ? "GET" : "POST",
    headers: { "X-PREX-Client": "display-v1", ...(body === undefined ? {} : { "Content-Type": "application/json" }) },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
    signal: AbortSignal.timeout(55_000),
  })
  const data = await response.json()
  if (!response.ok) throw new Error(data.error || "请求失败，请稍后重试。")
  return data
}

for (const tab of document.querySelectorAll("[data-mode]")) tab.addEventListener("click", () => {
  for (const other of document.querySelectorAll("[data-mode]")) {
    other.classList.toggle("selected", other === tab)
    other.setAttribute("aria-pressed", String(other === tab))
  }
  $("research-form").hidden = tab.dataset.mode !== "research"
  $("backtest-form").hidden = tab.dataset.mode !== "backtest"
  $("sample-panel").hidden = tab.dataset.mode !== "sample"
})
function changeInputMode() {
  const mode = $("input-mode").value
  for (const [value, id] of [["form", "form-fields"], ["prompt", "prompt-field"], ["json", "json-field"]]) {
    const field = $(id)
    field.hidden = mode !== value
    for (const control of field.querySelectorAll("input, select, textarea")) control.disabled = mode !== value
  }
}
$("input-mode").addEventListener("change", changeInputMode)
changeInputMode()
for (const field of $("form-fields").querySelectorAll("input[type=date]")) field.max = new Date().toISOString().slice(0, 10)
$("form-fields").addEventListener("input", () => {
  const form = $("backtest-form").elements
  const bars = Number(form.rebalanceEveryBars.value)
  const hours = { "1h": 1, "4h": 4, "1d": 24 }[form.interval.value]
  $("schedule-summary").textContent = Number.isInteger(bars) && bars >= 1 && bars <= 10_000
    ? `每 ${bars} 根 ${form.interval.selectedOptions[0].textContent} K 线调仓（约 ${bars * hours} 小时）。实际执行取决于可用 K 线。`
    : "填写调仓间隔后显示对应时间。"
})
// Ensure invalid inputs inside collapsed cost settings can receive browser validation focus.
$("form-fields").addEventListener("invalid", (event) => {
  const details = event.target.closest("details")
  if (details) details.open = true
}, true)

$("research-form").addEventListener("submit", async (event) => {
  event.preventDefault()
  if (busy) return
  lock(true)
  beginRequest("正在研究你的问题")
  status("正在请求 PREX 研究服务…")
  try {
    const form = new FormData(event.currentTarget)
    const result = await api("/api/research", Object.fromEntries(form))
    renderResearch(result)
    status(result.source.includes("rules") ? "已返回 · 当前使用 PREX 规则分析回退" : "已返回 · PREX AI + Bitget 行情")
  } catch (error) { status(error.message, true) } finally { lock(false) }
})

$("backtest-form").addEventListener("submit", async (event) => {
  event.preventDefault()
  if (busy) return
  lock(true)
  beginRequest("正在创建你的回测")
  status("正在提交到 PREX 回测服务…")
  try {
    const form = new FormData(event.currentTarget)
    const body = form.get("mode") === "form"
      ? { mode: "form", parameters: Object.fromEntries(form) }
      : form.get("mode") === "json"
        ? { mode: "json", strategy: JSON.parse(form.get("strategy")) }
        : { mode: "prompt", prompt: form.get("prompt") }
    // This POST is never retried automatically.
    const { job } = await api("/api/backtests", body)
    currentJob = job.id
    $("refresh-job").hidden = false
    await pollJob()
  } catch (error) {
    status(error instanceof SyntaxError ? "JSON 格式不正确，请粘贴完整 strategy 对象。" : error.message, true)
  } finally { lock(false) }
})

async function pollJob() {
  const id = currentJob
  const deadline = Date.now() + 10 * 60_000
  $("result-title").textContent = "你的回测任务"
  do {
    const payload = await api(`/api/backtests/${encodeURIComponent(id)}`)
    const names = { queued: "已排队", running: "正在计算", completed: "计算完成", failed: "计算失败" }
    status(`${names[payload.job.status]} · ${id}`)
    if (payload.job.status === "completed") {
      $("refresh-job").hidden = true
      currentJob = null
      if (!payload.result) throw new Error("任务已结束，但尚无可展示结果，请在 PREX 查看。")
      renderReport(payload.result)
      return
    }
    if (payload.job.status === "failed") {
      $("refresh-job").hidden = true
      currentJob = null
      throw new Error("该策略未能完成回测，请到 PREX 核对参数和数据范围。没有自动重新提交。")
    }
    await new Promise((resolve) => setTimeout(resolve, 5_000))
  } while (Date.now() < deadline)
  status(`任务仍在服务器处理 · ${id}。可稍后点击“刷新当前任务”；不会重新创建。`)
}

$("refresh-job").addEventListener("click", async () => {
  if (busy || !currentJob) return
  lock(true)
  try { await pollJob() } catch (error) { status(error.message, true) } finally { lock(false) }
})
$("load-sample").addEventListener("click", async () => {
  if (busy) return
  lock(true)
  beginRequest("Bitget rToken · 已有示例")
  status("正在获取已有示例报告…")
  try {
    const result = await api("/api/sample")
    renderReport(result)
    status(`已有示例 · 非当前输入的回测 · ${result.generatedAt || "生成时间未返回"}`)
  } catch (error) { status(error.message, true) } finally { lock(false) }
})

function clearOutput(result) {
  chartObserver?.disconnect()
  chartObserver = null
  $("output").replaceChildren()
  lastResult = result
  $("download").hidden = false
}
function metric(label, value, unit = "", accent = false) {
  const card = node("div", "metric")
  card.append(node("div", "metric-label", label))
  card.append(node("div", `metric-value${accent && typeof value === "number" ? value >= 0 ? " positive" : " negative" : ""}`, format(value, unit)))
  return card
}
function renderResearch(result) {
  clearOutput(result)
  $("result-title").textContent = "研究结论"
  $("output").append(node("div", "research-answer", result.message || "服务未返回文字结论。"))
  for (const market of result.markets) {
    const card = node("section", "market-card")
    card.append(node("h3", "", `${market.symbol} · ${market.interval}`))
    const data = node("div", "market-data")
    data.append(metric("参考价格", market.price), metric("RSI", market.rsi), metric("支撑", market.support), metric("压力", market.resistance))
    card.append(data, node("p", "market-time", `数据时间：${market.dataTime || "未提供"} · ${market.trend || "未提供趋势"}`))
    $("output").append(card)
  }
}
function renderReport(result) {
  clearOutput(result)
  $("result-title").textContent = result.kind === "sample" ? "Bitget rToken · 已有示例" : "你的回测结果"
  const metrics = node("div", "metrics")
  for (const item of result.metrics) metrics.append(metric(item.label, item.value, item.unit, item.key === "totalReturnPct"))
  $("output").append(metrics)
  const heading = node("div", "chart-heading")
  heading.append(node("span", "", "资金曲线"), node("span", "", `调仓次数 ${result.executionCount ?? "—"}`))
  $("output").append(heading)
  if (result.equity.length < 2) {
    $("output").append(node("p", "hint", "服务器尚未返回足够的曲线点。"))
    return
  }
  const canvas = node("canvas")
  canvas.setAttribute("role", "img")
  canvas.setAttribute("aria-label", "PREX 回测资金曲线；完整数值可下载展示结果查看。")
  $("output").append(canvas, node("p", "chart-caption", "青绿：策略 · 灰色：基准（如有）｜数值来自 PREX 服务，客户端不计算收益或风险指标。"))
  const draw = () => plot(canvas, result.equity, result.benchmark)
  chartObserver = new ResizeObserver(draw)
  chartObserver.observe(canvas)
  draw()
}

// Coordinate scaling for drawing only, never financial calculations.
function plot(canvas, equity, benchmark) {
  const width = Math.max(canvas.clientWidth, 240)
  const height = 260
  const ratio = window.devicePixelRatio || 1
  canvas.width = width * ratio
  canvas.height = height * ratio
  const ctx = canvas.getContext("2d")
  ctx.scale(ratio, ratio)
  const all = [...equity, ...benchmark]
  let min = Infinity, max = -Infinity, first = Infinity, last = -Infinity
  for (const point of all) { min = Math.min(min, point.value); max = Math.max(max, point.value); first = Math.min(first, point.timestamp); last = Math.max(last, point.timestamp) }
  const padding = (max - min || Math.abs(max) * 0.02 || 1) * 0.12
  min -= padding; max += padding
  const margin = { left: 64, right: 12, top: 20, bottom: 28 }
  const x = (time) => margin.left + (time - first) / (last - first || 1) * (width - margin.left - margin.right)
  const y = (value) => margin.top + (max - value) / (max - min) * (height - margin.top - margin.bottom)
  ctx.font = "10px system-ui"
  for (let i = 0; i <= 4; i++) {
    const value = min + (max - min) * i / 4
    ctx.strokeStyle = "#223138"; ctx.lineWidth = 1
    ctx.beginPath(); ctx.moveTo(margin.left, y(value)); ctx.lineTo(width - margin.right, y(value)); ctx.stroke()
    ctx.fillStyle = "#8aa0a8"; ctx.textAlign = "right"; ctx.fillText(value.toLocaleString("zh-CN", { maximumFractionDigits: 2 }), margin.left - 7, y(value) + 3)
  }
  for (const [series, color] of [[benchmark, "#71878d"], [equity, "#2ee8b0"]]) {
    ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.beginPath()
    series.forEach((p, i) => i ? ctx.lineTo(x(p.timestamp), y(p.value)) : ctx.moveTo(x(p.timestamp), y(p.value)))
    ctx.stroke()
  }
  ctx.fillStyle = "#8aa0a8"; ctx.textAlign = "left"
  ctx.fillText(new Date(first).toLocaleDateString(), margin.left, height - 5)
  ctx.textAlign = "right"; ctx.fillText(new Date(last).toLocaleDateString(), width - margin.right, height - 5)
}

$("download").addEventListener("click", () => {
  if (!lastResult) return
  const url = URL.createObjectURL(new Blob([JSON.stringify(lastResult, null, 2)], { type: "application/json" }))
  const link = document.createElement("a")
  link.href = url; link.download = `prex-${lastResult.kind}-display.json`; link.click()
  setTimeout(() => URL.revokeObjectURL(url), 1_000)
})

api("/api/config").then(({ upstream }) => {
  $("endpoint").textContent = `计算服务：${new URL(upstream).host}`
  $("studio-link").href = `${upstream}/strategies?view=backtest`
}).catch(() => status("本地连接失败，请确认 npm start 仍在运行。", true))
