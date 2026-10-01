// This client reads a hosted report. It does not calculate or reproduce a backtest.
const response = await fetch("https://test.prex.best/api/bitget-ai/factor", {
  headers: { accept: "application/json" },
  signal: AbortSignal.timeout(30_000),
})

if (!response.ok) throw new Error(`PREX report request failed: HTTP ${response.status}`)
const payload = await response.json()
if (payload.success !== true || !payload.result) {
  throw new Error("PREX did not return a report. Try again later.")
}

const { coverage, metrics, equity, benchmark } = payload.result
console.log(JSON.stringify({
  source: payload.source,
  generatedAt: payload.verification?.generatedAt,
  coverage,
  metrics,
  equity,
  benchmark,
}, null, 2))
