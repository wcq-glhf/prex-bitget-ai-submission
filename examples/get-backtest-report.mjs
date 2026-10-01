// This client reads a hosted report. It does not calculate or reproduce a backtest.
import { displayReport } from "../lib/display.mjs"
const response = await fetch("https://prex.best/api/bitget-ai/factor", {
  headers: { accept: "application/json" },
  signal: AbortSignal.timeout(30_000),
})

if (!response.ok) throw new Error(`PREX report request failed: HTTP ${response.status}`)
const payload = await response.json()
if (payload.success !== true || !payload.result) {
  throw new Error("PREX did not return a report. Try again later.")
}

console.log(JSON.stringify(displayReport(payload.result, {
  sample: true, generatedAt: payload.verification?.generatedAt,
}), null, 2))
