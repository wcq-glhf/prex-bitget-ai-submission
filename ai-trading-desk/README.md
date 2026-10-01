# PREX Market Research Copilot

Track: **AI Trading Desk**

Sub-theme: **Personalized Research Workbench**

## Try PREX online

Open **[PREX market research](https://prex.best/start)** on the production website. This is the primary Bitget research demo for the submission. No local installation or terminal is required.

Register or sign in to PREX and follow the task below; no trading account is needed.

## Complete task to try

1. Open https://prex.best/start and create or sign in to a PREX account.
2. Select **Market analysis**.
3. Ask:

```text
Compare NVDA and AMD on the 4-hour timeframe. Which is stronger,
what evidence supports the view, and what would invalidate it?
```

4. Review the comparison, market evidence, data time, and risks.
5. Continue the same conversation with a question about one of the instruments or a different timeframe.

The user chooses the instruments and timeframe. This research workflow needs no exchange credentials and places no order.

The production research API model configuration checked on October 2, 2026 uses **DeepSeek V4 Flash** to interpret the supplied Bitget evidence. The production NVDA/AMD 4H check returned model text for both instruments. In the public research API used by the optional client, `prex-ai+bitget-v3` identifies a model-generated response and `prex-rules+bitget-v3` identifies deterministic fallback. The logged-in website assistant uses different source labels: `model+bitget-v3` for model text backed by Bitget data and `bitget-v3` for a data-backed fallback. Do not assume the API client's labels or model configuration describe every PREX endpoint. A successful HTTP response alone does not mean the language model produced the answer.

## Optional developer client

An [actual NVDA/AMD research record with screenshot](./RESEARCH_CASE.md) documents the October 1 test-environment API/display-client task, its returned observations and the verification limits. Its historical source is retained; repeat the task using the current production demo. It distinguishes closed-candle prices from newer derivatives snapshots. It is not a recording of the logged-in website.

The repository also includes a separate open-source display client for API users. See [developer setup](../README.md#open-source-display-client-optional-for-developers). Its **市场研究** tab accepts a question, symbol and timeframe, calls PREX's research API, and displays the returned answer and market observations. It includes no indicator calculations, model credentials or proprietary prompts. Anonymous API access remains subject to the hosted API's quotas. Running this client is not required to use the website.

## Existing video

https://drive.google.com/file/d/18hOAWbHKjNPVI5ON2luKm4YQ1UTeMpHG/view?usp=drive_link

The existing video demonstrates the general PREX / Binance Agent OS product workflow. It supplements the current interactive Bitget research workflow; it is not a recording of that new integration. The organizer must assess whether the available demonstration meets the complete-task requirement.
