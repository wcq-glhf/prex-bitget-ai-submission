# Open client, private computation

```text
User's question / user-authored strategy parameters
                    |
                    v
Open-source local display client
  input validation -> PREX API request -> task status -> returned results
                    |
                    v
Hosted PREX service (not included in this repository)
  market data / strategy interpretation / backtest / risk calculations
                    |
                    v
Display-safe metrics, research text and curve points
```

## Endpoint mapping

| Client action | Hosted PREX endpoint | Effect |
| --- | --- | --- |
| Ask a research question | `POST /api/bitget-ai/research` | Research response; may consume model resources |
| Create a custom backtest | `POST /api/v1/backtests` | Creates a quota-limited server research task |
| Read that task | `GET /api/v1/backtests/:jobId` | Reads status and result; never resubmits |
| View the existing example | `GET /api/bitget-ai/factor` | Returns the existing rToken report |

All requests target `https://test.prex.best` by default. No endpoint places an order, publishes a strategy, accesses an exchange account or transfers funds.

The display client forwards research input or a user-provided strategy; it never supplies PREX's proprietary factor recipe. The Bitget form serializes user selections into the public strategy schema: instrument codes, dates, timeframe, one public indicator identifier and user-chosen period, ranking direction, capital, costs and rebalance interval. It performs input validation, not financial calculations. It is deliberately limited to long-only, unlevered rToken spot research; the historical API asset-class enum is `stock_perp`, but `exchange=bitget` and `marketType=spot` determine the data route, not perpetual execution.

The natural-language API currently does not correctly route Bitget rToken, so the client rejects that input and points users to form/JSON mode or Strategy Studio. A user-authored Bitget configuration is sent through the existing structured API. Unsupported inputs remain errors rather than silently substituted results.

## Source boundary

Public files implement HTTP transport, validation, allowlisted response projection, error handling, interface layout and canvas coordinates. Canvas coordinate scaling only places server-returned numbers on screen; it does not compute financial metrics.

There are no PREX factor formulas, private weight tables, backtest simulation loops, P&L formulas, execution adapters or proprietary engine modules in this repository. Client tests use synthetic display data, not engine code. Unknown response fields are not forwarded to the browser or downloadable display result. Research text is rendered as text rather than executable HTML.

The API remains a separately operated service. MIT licensing of this client does not grant access to PREX's server source or exempt users from API quotas and terms. A remote service returning results is not a local independent reproduction of its calculations.

## Local safety and limits

- Loopback binding, exact Host check, same-origin validation and a required client header.
- Fixed backend origins and API paths; no caller-controlled proxy destinations or redirect following.
- No credentials in browser code or source. Do not add private server environment files to the repository.
- One active custom backtest per client process; no automatic create retry after timeouts.
- Only task IDs created by this process can be polled through its proxy; hosted IP-based access checks remain in effect.
- JSON bodies and response sizes are bounded. Upstream errors are mapped to safe messages, not displayed raw.
- No persistent local task database or analytics. Restarting the client clears its task allowlist; it does not cancel hosted tasks.
- This is a single-user local demo, not a production authentication or multi-tenant gateway.

Keeping code private does not prevent every inference from observable results. Stronger server-side anti-abuse limits, restricted parameter spaces and per-user authentication require separate product controls; a display client cannot guarantee that a black-box service is impossible to reverse engineer.
