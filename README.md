# PREX · Bitget AI Hackathon

**AI strategy creation and execution for everyday traders.**

[Try PREX](https://prex.best) · [Bitget market research](https://prex.best/start) · [Bitget Strategy Studio](https://prex.best/strategies?view=backtest&builder=professional&market=bitget-rtoken) · [Product video](https://drive.google.com/file/d/18hOAWbHKjNPVI5ON2luKm4YQ1UTeMpHG/view?usp=drive_link) · [中文说明](./README.zh-CN.md)

PREX helps users describe trading ideas, configure strategies, review historical performance, publish their work, and use their own connected trading accounts. The Bitget integration adds stock-market research and rToken strategy evaluation to the existing PREX interface.

This public repository contains an MIT-licensed display client, request adapters, and project documentation. Users can enter a research question or their own backtest request and view the hosted PREX service's response. PREX's application, backtest engine, factor formulas, internal weights, strategy calculations, and execution infrastructure remain proprietary.

## Try PREX online

Visit **[prex.best](https://prex.best)** to use PREX in your browser. No local installation or terminal is required.

The Bitget workflows are live on the production website: **[Market research](https://prex.best/start)** and **[Bitget Strategy Studio](https://prex.best/strategies?view=backtest&builder=professional&market=bitget-rtoken)**. Register or sign in to use them; no exchange key or wallet connection is needed for research and backtesting. Use these production links in submission forms and product demonstrations.

**October 2, 2026 update:** production now includes Bitget research, rToken backtesting, and optional automatic optimization after a supported backtest. Optimization compares up to eight candidates, costs 10 PREX points, and refunds failed jobs. Users review the comparison and choose whether to adopt a recommended version. This dated update does not claim these features were available at an earlier submission deadline.

## Preview

![PREX display client showing a real hosted sample report](./assets/display-preview.png)

An actual test-environment sample rendered by the optional API client on October 1, 2026, not the production website UI or a custom-user result. This historical screenshot is retained with its original provenance; the links and client defaults now use production. The report shows its actual curve dates, generation time and server-labelled validation window. These labels alone do not prove an untouched out-of-sample test.

For market research, see the [actual NVDA/AMD task, returned observations and screenshot](./ai-trading-desk/RESEARCH_CASE.md). Research cards distinguish closed-candle prices from live quotes; the record states the verification scope and remaining limitations.

## Open-source display client (optional, for developers)

The repository also includes a separate local API/display client. Running it is optional and is not necessary to use the PREX website.

<details>
<summary>Developer setup and client capabilities</summary>

Requirements: Node.js 20 or newer. No dependency installation, exchange key, or wallet connection is needed.

```bash
git clone https://github.com/wcq-glhf/prex-bitget-ai-submission.git
cd prex-bitget-ai-submission
npm start
```

Open the local address printed by `npm start` on the same computer. Keep that process running while using the optional client; it does not deploy the client to the PREX website.

- **Market research:** enter a question, default stock symbol and timeframe; PREX returns Bitget-backed research and market observations.
- **Custom backtest:** fill in the Bitget rToken form, submit natural language for supported venues, or paste your own complete `strategy` JSON object. The client creates a hosted job, polls its status and draws the returned curve.
- **Sample report:** retrieve the existing rToken example, explicitly separate from user-created results.

The **Bitget rToken form** collects your instrument codes, dates, timeframe, test capital, indicator, lookback and rebalance interval. It submits a simple long-only, unlevered, single-indicator ranking configuration. Indicator names are public API options, not their formulas. You supply the strategy parameters; the form does not embed the proprietary example's recipe. Unsupported symbols or unavailable history remain backend validation errors. Use JSON or Strategy Studio for more complex rules.

Natural-language backtesting currently routes Binance, OKX and Hyperliquid requests. For **Bitget rToken**, use the form, your own JSON configuration or the hosted Strategy Studio. This client rejects Bitget natural-language requests rather than silently testing another venue. Form/JSON configuration is user input, not PREX's calculation source.

The default backend is production, `https://prex.best`. Developers can explicitly select staging with `PREX_API_BASE=https://test.prex.best`; arbitrary hosts are rejected. Staging is for development and is not the primary submission demo. Anonymous API access is subject to PREX's quotas and client-IP task ownership. Remain on the same network during a job. A server restart clears the local task allowlist; do not use this local demo as a public multi-user proxy.

`npm test` runs local mocked integration tests; it does not create remote jobs. The application binds only to loopback, validates Host/Origin, does not retry POST requests, and keeps calculation details out of browser responses and downloads. It uses no local database, cookies, API credentials, trading permissions or automatic execution.

</details>

### What is open, and what is not?

**Alpha Factory does not publish PREX's strategy source or backtest framework.** The [publication boundary](./alpha-factory/README.md#publication-boundary) also applies to Git history, notebooks, archives, downloads and browser source maps. Results and client code do not grant access to private calculation code.

| Open in this repository | Hosted privately by PREX |
| --- | --- |
| Input forms, request validation and API calls | Strategy interpretation and engine internals |
| Job status handling and bounded polling | Factor formulas, ranking and internal weights |
| Display-field allowlists and chart drawing | Backtest simulation, costs and performance calculations |
| Tests and usage documentation | Execution infrastructure, private data and credentials |

The client needs an available PREX backend. Cloning it does **not** install a standalone backtest engine. A downloadable display report contains returned results, not the algorithm that produced them. See [architecture and privacy boundary](./ARCHITECTURE.md).

## Projects

| Project | Track | Product entry |
| --- | --- | --- |
| [PREX Market Research Copilot](./ai-trading-desk/README.md) | AI Trading Desk / Personalized Research Workbench | PREX AI → Market analysis |
| [PREX rToken Alpha Lab](./alpha-factory/README.md) | Alpha Factory / rToken Factor Strategies | Strategy Studio → Bitget rToken |

## What users can do

- Research a single crypto asset or stock, or compare several stocks using Bitget market data.
- Build strategies through natural language, a visual form, complete strategy specifications, or code configuration.
- Evaluate single-asset time-series strategies and multi-asset portfolio strategies.
- Review test dates, returns, drawdown, risk metrics, costs, and equity curves.
- Save and publish strategies, browse authors, and continue through PREX's existing strategy-management workflow.

The research and backtest workflows do not require exchange credentials and do not place orders. Custom backtests create server-side research jobs and consume the existing API quota; the existing-report reader only retrieves a report.

## Try the research workflow

1. Open [PREX AI](https://prex.best/start).
2. Create or sign in to a PREX account; no trading account is needed.
3. Select **Market analysis**.
4. Ask: **Compare NVDA and AMD on the 4-hour timeframe. Which is stronger, what evidence supports the view, and what would invalidate it?**
5. Review the answer, its market evidence, the data time, and the risks.

The 4-hour timeframe is an example. Users choose the timeframe for their own requests.

## Try the strategy workflow

1. Open the [Bitget rToken professional form](https://prex.best/strategies?view=backtest&builder=professional&market=bitget-rtoken).
2. Register or sign in, then confirm the market is **Bitget · rToken Spot**. Research uses stock-futures data; this backtest uses rToken spot data and is not a futures execution test.
3. Select the instruments and configure your own strategy.
4. Review the recognized specifications, run the backtest, and inspect the metrics and equity curve.
5. For supported strategies, optionally click **Automatic optimization / 自动优化** after the backtest. Review the candidate comparison; adopt a new version only if one is recommended and you choose to use it. This signed-in website feature is separate from the optional public API client.

## Read an existing report through the open-source client

Requirements: Node.js 20 or newer. No packages or API key are needed.

```bash
git clone https://github.com/wcq-glhf/prex-bitget-ai-submission.git
cd prex-bitget-ai-submission
npm run report
```

[`examples/get-backtest-report.mjs`](./examples/get-backtest-report.mjs) requests a results-only report from the hosted PREX service and prints its metrics and curves. It does not calculate indicators, generate trading decisions, simulate orders, or reproduce the backtest locally.

- [Public report / JSON](https://prex.best/api/bitget-ai/factor)
- [Public equity data / CSV](https://prex.best/api/bitget-ai/factor?format=csv)

The report updates with available market data; values can change between visits. Dates are shown in UTC. Custom-report dates reflect returned curve coverage, not an assumed date range. Missing timestamps remain explicitly unavailable. No financial metrics are recomputed by this client.

## Submission materials

[Copy-ready Chinese form answers](./SUBMISSION.zh-CN.md) follow the current official form: project names, summaries within 140 characters, five-part descriptions, model roles and line-by-line material links for each entry. The guide also records the form's updated deadline and separates personal fields from project text. These are preparation materials, not a claim that either entry has been submitted or accepted.

- **PREX website:** https://prex.best
- **Demo environment:** production PREX; staging is optional for development only.
- **Public repository:** https://github.com/wcq-glhf/prex-bitget-ai-submission
- **Research workflow:** https://prex.best/start
- **Backtest workflow:** https://prex.best/strategies?view=backtest&builder=professional&market=bitget-rtoken
- **Backtest results:** https://prex.best/api/bitget-ai/factor
- **Equity data:** https://prex.best/api/bitget-ai/factor?format=csv
- **Existing product video:** https://drive.google.com/file/d/18hOAWbHKjNPVI5ON2luKm4YQ1UTeMpHG/view?usp=drive_link

The existing video shows the general PREX / Binance Agent OS product workflow. It is supplementary product evidence, not a recording of the new Bitget integration. The hosted interactive workflows require a PREX login; the repository and public report links do not.

## Evaluation scope

The [official Alpha Factory requirements](https://bitget-ai.gitbook.io/bitgetai_hackathons2#iv.-tracks-submission-and-judging), checked on October 2, require runnable strategy code and verifiable results. This repository provides an input/display client that requests hosted calculations, not that calculation code. Acceptance of a closed-source alternative must be confirmed with the organizer; moving the demo to production does not change that boundary.

AI Trading Desk requires an accessible demo and a complete research task. The production workflow is the main demo. The current [submission form](https://docs.google.com/forms/d/e/1FAIpQLScojKm9H2xDNFL3ijcDcKxwG-_PvkmyimiAB-SEFOx_WsqGNA/viewform) requires a demo video when login is needed; the existing overview video is included with its original scope. Whether it adequately covers the submitted workflow remains for the organizer to assess.

## License and contact

The MIT license applies only to files in this repository. It grants no license to PREX's hosted service or proprietary engine.

- Website: https://prex.best
- X: https://x.com/No_tariff3
- Telegram: @WARD999999
- Email: hello@prex.best

Historical simulations and AI-generated research do not guarantee future performance.
