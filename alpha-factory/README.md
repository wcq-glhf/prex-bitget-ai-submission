# PREX rToken Alpha Lab

Track: **Alpha Factory**

Sub-theme: **rToken Factor Strategies**

PREX integrates Bitget rToken market data into the existing Strategy Studio. Users choose instruments and strategy settings, run a hosted backtest, and inspect performance and equity curves.

## Open-source display client

Run `npm start` in the repository root, open `http://127.0.0.1:4178`, and select **自定义回测**. Fill in the **Bitget rToken form** with your instruments, dates, interval, indicator and lookback, test capital and rebalance settings. The basic form submits a single-indicator, long-only, unlevered configuration; use your own complete strategy JSON for more complex inputs. The client creates a hosted task and displays its returned metrics and curve. It contains input serialization, not indicator formulas or the proprietary calculation engine. The separate **示例报告** tab retrieves an existing report and does not substitute for a custom result.

The natural-language mode supports the existing Binance / OKX / Hyperliquid route, but currently rejects Bitget prompts because that hosted natural-language route has not been integrated. Use the parameter form, user-authored JSON or the hosted Strategy Studio for Bitget. See [client architecture](../ARCHITECTURE.md).

## Product and results

- [Strategy Studio](https://test.prex.best/strategies?view=backtest)
- [Results-only report](https://test.prex.best/api/bitget-ai/factor)
- [Equity and benchmark data](https://test.prex.best/api/bitget-ai/factor?format=csv)
- [Read-only report client](../examples/get-backtest-report.mjs)

Report coverage and metrics come from the service response and may update with newly available market data. Strategy calculations and the PREX engine are not included in this repository.

## Code requirement

The competition instructions require a report-generating code file or notebook, total backtest coverage of at least 60 days, and at least 30 days out of sample. The report client retrieves an existing result; it is not the code that generates it. This material package needs organizer acceptance of a closed-source alternative before it can be treated as satisfying the Alpha Factory code requirement.

Historical simulation only; results do not guarantee future performance.
