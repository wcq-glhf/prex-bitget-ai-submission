# PREX rToken Alpha Lab

Track: **Alpha Factory**

Sub-theme: **rToken Factor Strategies**

PREX integrates Bitget rToken market data into the existing Strategy Studio. Users choose instruments and strategy settings, run a hosted backtest, and inspect performance and equity curves.

## Try PREX online

Open the **[Bitget professional form on production PREX](https://prex.best/strategies?view=backtest&builder=professional&market=bitget-rtoken)**. Register or sign in, confirm **Bitget · rToken Spot**, configure your strategy and run the backtest. This is the primary demo; no local installation or terminal is required. The research workbench's stock-futures observations and this rToken spot backtest refer to different instruments; neither automatically places a trade.

As of October 2, 2026, the signed-in production website also offers **Automatic optimization / 自动优化** after supported backtests. It compares up to eight candidates for 10 PREX points and refunds failed jobs. Review the comparison and decide whether to adopt a recommended version; the original is retained when no replacement is recommended. Optimization does not raise leverage or remove fees and slippage. This website capability is separate from the optional API client and does not establish independently frozen out-of-sample validation.

## Optional developer client

For the separate open-source API/display client, see [developer setup](../README.md#open-source-display-client-optional-for-developers). Select **自定义回测** in that client and fill in the **Bitget rToken form** with your instruments, dates, interval, indicator and lookback, test capital and rebalance settings. The basic form submits a single-indicator, long-only, unlevered configuration; use your own complete strategy JSON for more complex inputs. The client creates a hosted task and displays its returned metrics and curve. It contains input serialization, not indicator formulas or the proprietary calculation engine. The separate **示例报告** tab retrieves an existing report and does not substitute for a custom result.

The natural-language mode supports the existing Binance / OKX / Hyperliquid route, but currently rejects Bitget prompts because that hosted natural-language route has not been integrated. Use the parameter form, user-authored JSON or the hosted Strategy Studio for Bitget. See [client architecture](../ARCHITECTURE.md).

## Product and results

- [Bitget rToken professional form](https://prex.best/strategies?view=backtest&builder=professional&market=bitget-rtoken)
- [Results-only report](https://prex.best/api/bitget-ai/factor)
- [Equity and benchmark data](https://prex.best/api/bitget-ai/factor?format=csv)
- [Read-only report client](../examples/get-backtest-report.mjs)

Report coverage and metrics come from the service response and may update with newly available market data. Strategy calculations and the PREX engine are not included in this repository.

## Publication boundary

Public material is limited to product descriptions, usage instructions, the API/display client, interface screenshots, and allowlisted report metrics and equity curves. User-authored request parameters are inputs, not PREX's proprietary strategy source.

Do not publish PREX's strategy source, private strategy configuration or factor recipe, backtest framework, simulation implementation, or performance-calculation code. This applies to repository history, notebooks, downloadable archives, browser bundles/source maps, sample API responses and attachments—not just the current README. Any future publication needs a file-level review; “open client” does not mean “open engine.” Credentials and user-private data remain excluded.

The hosted result API uses a field allowlist. New internal fields must not automatically become public. A client can display the returned curve but cannot independently recalculate the proprietary strategy offline.

## Code requirement

The [official requirements](https://bitget-ai.gitbook.io/bitgetai_hackathons2#iv.-tracks-submission-and-judging), checked on October 2, require runnable strategy code, total backtest coverage of at least 60 days, and at least 30 days out of sample. The client requests hosted results; it is not the calculation code. This material package needs organizer acceptance of a closed-source alternative before it can be treated as satisfying the Alpha Factory code requirement.

Historical simulation only; results do not guarantee future performance.
