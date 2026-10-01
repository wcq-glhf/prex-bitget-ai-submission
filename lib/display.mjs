// Display adapters only. All market indicators and backtest statistics come from PREX.
import { formStrategy } from "./form-input.mjs"
const record = (value) => value && typeof value === "object" && !Array.isArray(value) ? value : {}
const text = (value, limit = 200) => typeof value === "string" ? value.slice(0, limit) : ""
const number = (value) => typeof value === "number" && Number.isFinite(value) ? value : null
const date = (value) => {
  if (typeof value !== "string" && typeof value !== "number") return ""
  const time = typeof value === "number" ? value : Date.parse(value)
  return Number.isFinite(time) && Math.abs(time) <= 8.64e15 ? new Date(time).toISOString() : ""
}

export function displayReport(input, { sample = false, generatedAt = "" } = {}) {
  const result = record(input)
  const metrics = record(result.metrics)
  const fields = [
    ["totalReturnPct", "累计收益", "%"], ["maxDrawdownPct", "最大回撤", "%"],
    ["sharpe", "Sharpe", ""], ["winRatePct", "周期胜率", "%"],
    ["annualizedReturnPct", "年化收益", "%"],
    sample ? ["transactionCostPct", "交易成本", "%"] : ["totalCost", "交易成本", ""],
  ]
  const curve = sample ? result.equity : result.equityCurve
  const benchmark = sample ? result.benchmark : record(result.benchmark).equityCurve
  const points = (items) => (Array.isArray(items) ? items : []).slice(0, 50_000).flatMap((entry) => {
    const p = record(entry)
    const timestamp = number(sample ? p.timestamp : p.ts)
    const value = number(sample ? p.value : p.equity)
    return timestamp !== null && value !== null ? [{ timestamp, value }] : []
  })
  const equity = points(curve)
  const coverage = record(result.coverage)
  const validation = record(result.validation)
  const times = equity.map((point) => point.timestamp).filter((time) => time > 0 && time <= 8.64e15)
  const first = times.length ? times.reduce((a, b) => Math.min(a, b)) : null
  const last = times.length ? times.reduce((a, b) => Math.max(a, b)) : null
  return {
    kind: sample ? "sample" : "backtest",
    generatedAt: date(generatedAt),
    coverage: {
      start: sample ? date(coverage.start) : date(first),
      end: sample ? date(coverage.end) : date(last),
      totalDays: number(sample ? coverage.totalDays : metrics.elapsedDays),
    },
    validation: sample ? {
      start: date(coverage.oosStart), end: date(coverage.end), days: number(coverage.oosDays),
      sharpe: number(metrics.oosSharpe),
    } : {
      start: date(validation.start), end: date(validation.end), days: number(validation.days),
      sharpe: number(validation.sharpe),
    },
    metrics: fields.map(([key, label, unit]) => ({ key, label, unit, value: number(metrics[key]) })),
    executionCount: number(sample ? metrics.rebalanceCount : metrics.totalRebalances),
    equity,
    benchmark: points(benchmark),
    // Intentionally exclude strategy details, rebalances, raw payloads and unknown future fields.
  }
}

export function displayResearch(input) {
  const payload = record(input)
  return {
    kind: "research",
    message: text(payload.message, 20_000),
    source: text(payload.source),
    markets: (Array.isArray(payload.analyses) ? payload.analyses : []).slice(0, 3).map((entry) => {
      const item = record(entry)
      const market = record(item.market)
      const analysis = record(item.analysis)
      return {
        symbol: text(market.symbol, 32), interval: text(market.interval, 8),
        dataTime: text(analysis.dataTime, 40), trend: text(analysis.trend, 16),
        price: number(analysis.price), rsi: number(analysis.rsi14),
        support: number(analysis.support), resistance: number(analysis.resistance),
        // Do not forward scores, ranking components or analysis implementation.
      }
    }),
  }
}

export function displayJob(input) {
  const job = record(input)
  const valid = new Set(["queued", "running", "completed", "failed"])
  if (typeof job.id !== "string" || !/^[a-zA-Z0-9-]{1,80}$/.test(job.id) || !valid.has(job.status)) {
    throw new Error("invalid_job")
  }
  return { id: job.id, status: job.status }
}

export function backtestInput(input) {
  const body = record(input)
  if (body.mode === "form") return { strategy: formStrategy(body.parameters) }
  if (body.mode === "json") {
    const strategy = record(body.strategy)
    if (!Object.keys(strategy).length) throw new Error("请提供你自己的完整 strategy 配置。")
    return { strategy }
  }
  if (body.mode !== undefined && body.mode !== "prompt") throw new Error("请选择表单、自然语言或 JSON 输入方式。")
  const prompt = text(body.prompt, 12_001).trim()
  if (prompt.length < 10 || prompt.length > 12_000) throw new Error("请用 10～12000 个字符描述你的策略。")
  // The hosted natural-language API does not yet route Bitget prompts correctly.
  // Never silently run a different venue; user-authored Bitget form/JSON input is supported instead.
  if (/bitget|rtoken|代币化股票|代幣化股票/iu.test(prompt)) {
    throw new Error("Bitget rToken 自定义回测请切换为表单或 JSON 配置，或在 PREX 策略工作室中构建；自然语言 API 暂未支持此市场。")
  }
  return { prompt, language: "zh" }
}

export function researchInput(input) {
  const body = record(input)
  const question = text(body.question, 2_001).trim()
  if (!question || question.length > 2_000) throw new Error("研究问题须为 1～2000 个字符。")
  if (!["1H", "4H", "1D"].includes(body.interval)) throw new Error("请选择 1H、4H 或 1D。")
  const symbol = text(body.symbol, 33).toUpperCase()
  if (!/^[A-Z]{1,12}USDT$/.test(symbol)) throw new Error("请输入如 NVDAUSDT 的美股永续标的。")
  return { question, symbol, interval: body.interval }
}
