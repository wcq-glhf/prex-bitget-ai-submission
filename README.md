# PREX · Bitget AI Hackathon

**AI strategy creation and execution for everyday traders.**

[Try PREX](https://test.prex.best/start) · [Strategy Studio](https://test.prex.best/strategies?view=backtest) · [Product video](https://drive.google.com/file/d/18hOAWbHKjNPVI5ON2luKm4YQ1UTeMpHG/view?usp=drive_link) · [中文说明](./README.zh-CN.md)

PREX helps users describe trading ideas, configure strategies, review historical performance, publish their work, and use their own connected trading accounts. The Bitget integration adds stock-market research and rToken strategy evaluation to the existing PREX interface.

This public repository contains project documentation and an MIT-licensed, read-only report client. PREX's hosted application, backtest engine, factor formulas, strategy calculations, and execution infrastructure remain proprietary.

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

The Bitget research and backtest workflows do not require exchange credentials and do not place orders.

## Try the research workflow

1. Open [PREX AI](https://test.prex.best/start).
2. Create or sign in to a PREX account; no trading account is needed.
3. Select **Market analysis**.
4. Ask: **Compare NVDA and AMD on the 4-hour timeframe. Which is stronger, what evidence supports the view, and what would invalidate it?**
5. Review the answer, its market evidence, the data time, and the risks.

The 4-hour timeframe is an example. Users choose the timeframe for their own requests.

## Try the strategy workflow

1. Open [Strategy Studio](https://test.prex.best/strategies?view=backtest).
2. Choose a strategy-entry method and select **Bitget · rToken Spot** where appropriate.
3. Select the instruments and configure your own strategy.
4. Review the recognized specifications, run the backtest, and inspect the metrics and equity curve.

## Read an existing report through the open-source client

Requirements: Node.js 20 or newer. No packages or API key are needed.

```bash
git clone https://github.com/wcq-glhf/prex-bitget-ai-submission.git
cd prex-bitget-ai-submission
npm run report
```

[`examples/get-backtest-report.mjs`](./examples/get-backtest-report.mjs) requests a results-only report from the hosted PREX service and prints its metrics and curves. It does not calculate indicators, generate trading decisions, simulate orders, or reproduce the backtest locally.

- [Public report / JSON](https://test.prex.best/api/bitget-ai/factor)
- [Public equity data / CSV](https://test.prex.best/api/bitget-ai/factor?format=csv)

The report updates with available market data; values can change between visits.

## Submission materials

[Chinese form drafts and submission checklist](./SUBMISSION.zh-CN.md) include separate project descriptions, line-by-line material links, and a draft question for the organizer about closed-source evaluation. They are preparation materials, not a claim that either entry has been accepted.

- **Project:** https://test.prex.best
- **Public repository:** https://github.com/wcq-glhf/prex-bitget-ai-submission
- **Research workflow:** https://test.prex.best/start
- **Backtest workflow:** https://test.prex.best/strategies?view=backtest
- **Backtest results:** https://test.prex.best/api/bitget-ai/factor
- **Equity data:** https://test.prex.best/api/bitget-ai/factor?format=csv
- **Existing product video:** https://drive.google.com/file/d/18hOAWbHKjNPVI5ON2luKm4YQ1UTeMpHG/view?usp=drive_link

The existing video shows the general PREX / Binance Agent OS product workflow. It is supplementary product evidence, not a recording of the new Bitget integration. The hosted interactive workflows require a PREX login; the repository and public report links do not.

## Evaluation scope

The Alpha Factory submission instructions require the code or notebook that generates the backtest report. This repository provides a report-reading client, not that calculation code. Acceptance of a closed-source alternative must be confirmed with the organizer; a public repository alone does not establish compliance.

AI Trading Desk requires a complete research-task demonstration or recording. The product workflow and existing overview video are available; their acceptance depends on the organizer's assessment of the demonstrated task.

## License and contact

The MIT license applies only to files in this repository. It grants no license to PREX's hosted service or proprietary engine.

- Website: https://prex.best
- X: https://x.com/No_tariff3
- Telegram: @WARD999999
- Email: hello@prex.best

Historical simulations and AI-generated research do not guarantee future performance.
