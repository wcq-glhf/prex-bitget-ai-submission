// Serialize user selections into the public API schema. No indicator or backtest calculations.
const indicators = new Set(["PctChange", "Rsi", "EmaDistance", "BollingerPosition", "Volatility"])

function numeric(value, label, minimum, maximum, integer = false) {
  if (!["string", "number"].includes(typeof value) || String(value).trim() === "") throw new Error(`请填写${label}。`)
  const number = Number(value)
  if (!Number.isFinite(number) || number < minimum || number > maximum || (integer && !Number.isInteger(number))) {
    throw new Error(`${label}须为 ${minimum}～${maximum} 之间的${integer ? "整数" : "数值"}。`)
  }
  return number
}

function date(value, label) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) throw new Error(`请填写${label}，格式为 YYYY-MM-DD。`)
  const parsed = new Date(`${value}T00:00:00.000Z`)
  if (!Number.isFinite(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== value) throw new Error(`${label}不是有效日期。`)
  if (value > new Date().toISOString().slice(0, 10)) throw new Error(`${label}不能晚于今天（UTC）。`)
  return value
}

export function formStrategy(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) throw new Error("请填写策略表单。")
  const name = typeof input.name === "string" ? input.name.trim() : ""
  if (!name || name.length > 120) throw new Error("策略名称须为 1～120 个字符。")
  if (typeof input.symbols !== "string" || input.symbols.length > 2000) throw new Error("请填写 Bitget rToken 标的。")
  const universe = input.symbols.trim().toUpperCase().split(/[\s,，、;；]+/u)
  if (!universe.length || universe.length > 50 || universe.some((symbol) => !/^R[A-Z0-9]{1,20}USDT$/.test(symbol))) {
    throw new Error("请填写 1～50 个 rToken 代码，例如 RNVDAUSDT，用逗号或空格分隔。现货币对或美股永续不能混用。")
  }
  if (new Set(universe).size !== universe.length) throw new Error("标的重复，请移除重复项。")
  if (!["1h", "4h", "1d"].includes(input.interval)) throw new Error("请选择 1 小时、4 小时或 1 天 K 线。")
  const start = date(input.start, "开始日期")
  const end = input.end === "" || input.end === undefined ? undefined : date(input.end, "结束日期")
  if (end && end <= start) throw new Error("结束日期须晚于开始日期。")
  if (!indicators.has(input.indicator)) throw new Error("请选择用于排名的指标。")
  if (!["asc", "desc"].includes(input.sort)) throw new Error("请选择指标值从高到低或从低到高。")
  const select = numeric(input.select, "持有数量", 1, 50, true)
  if (select > universe.length) throw new Error("持有数量不能超过标的数量。")
  return {
    name, exchange: "bitget", assetClass: "stock_perp", marketType: "spot",
    strategyMode: "cross_sectional", interval: input.interval, universe, start,
    ...(end ? { end } : {}),
    initialCapital: numeric(input.initialCapital, "模拟本金", 10, 1_000_000),
    feeBps: numeric(input.feeBps, "手续费", 0, 100),
    slippageBps: numeric(input.slippageBps, "滑点", 0, 100),
    rebalanceEveryBars: numeric(input.rebalanceEveryBars, "调仓间隔", 1, 10_000, true),
    leverage: 1,
    long: {
      capWeight: 1, select,
      factors: [{ name: input.indicator, param: numeric(input.lookback, "指标计算周期", 2, 1500, true), sort: input.sort, weight: 1 }],
    },
  }
}
