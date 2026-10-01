# PREX · Bitget 提交材料草稿

这份文档用于填写或补充官方表单，不代表项目已经提交、入选或获得闭源豁免。

公开范围：产品说明、体验步骤、结果读取客户端，以及回测指标和净值数据。PREX 引擎、因子公式、权重和策略计算实现保持闭源。开源许可仅覆盖本仓库。

## 可运行的开源展示端

仓库现已包含独立展示程序：`npm start` 后在本机打开 `http://127.0.0.1:4178`。用户可以输入研究问题或自己的回测请求，由 PREX 后端计算，前端展示返回的结论、指标与曲线；已有示例报告单独展示。JSON 配置支持调用已有 Bitget rToken 回测路径；Bitget 自然语言请求暂不支持，不会静默换成其他市场。详见 [运行说明](./README.zh-CN.md) 和 [公开／闭源边界](./ARCHITECTURE.md)。

本次增加的是调用和展示功能，不包含 PREX 计算实现，也不改变下文关于计算代码交付范围的说明。

## 使用前确认

- 两个项目分别填写表单，以各自的功能、体验流程和材料接受评审，不把同一份结果重复描述成两个独立成果。
- 下方项目介绍可以复制；模型名称、已发布的 X 帖链接、团队资料须填写真实信息，不能用占位文字提交。
- 旧视频继续作为产品概览附件，明确其展示的是 PREX / Binance Agent OS，不称为 Bitget 专项录屏。
- 当前材料没有公开 Alpha Factory 要求的策略计算代码，需先询问主办方是否接受闭源替代方式。
- 官方页面目前写明提交截止日期为 **2026 年 9 月 27 日（UTC+8）**。本草稿更新于 2026 年 10 月 1 日；如需新提交或补交，应先确认官方是否接收，不能因表单可打开就认定仍可参赛。

规则来源：[Bitget 官方规则](https://bitget-ai.gitbook.io/bitgetai_hackathons2#iv.-tracks-submission-and-judging)。以主办方最新确认及表单要求为准。

## 项目一：PREX Market Research Copilot

赛道：AI Trading Desk

主题：Personalized Research Workbench

### 项目介绍（可复制）

**1. 为什么做这个产品**

普通交易用户研究股票或代币时，需要反复切换行情、图表和聊天工具。PREX Market Research Copilot 将自然语言问答和 Bitget 行情研究整合在同一个工作台，让用户围绕明确的问题查看市场依据、比较标的并识别风险。AI 辅助分析，交易决定仍由用户作出。

**2. 面向谁，有什么价值**

主要面向关注科技股及代币化股票、会看基础行情但不会编写研究脚本的个人交易者。用户可以指定标的和周期，研究单个资产，或比较多个资产的相对走势，不需要提供交易所密钥或先配置自动交易。

**3. 如何验证**

可体验任务：“比较 NVDA 和 AMD 的 4 小时趋势，谁更强？依据是什么？什么情况下这个判断失效？”用户在 PREX AI 的市场分析模式中提问，检查回答是否对应指定标的与周期、是否提供数据时间和行情依据、是否说明结论的限制及风险，再继续追问。4 小时只是演示参数，不是系统固定周期。

本项目不把回测收益当作投研助手的有效性证明。尚未在本材料中提供该 Bitget 工作流的独立任务完成率或留存统计；后续将基于真实研究任务记录评估回答完整性、数据引用一致性和用户继续研究的情况。

**4. 当前进展**

Bitget 研究入口已融合到 PREX 现有 AI 助手，不需要切换到独立的比赛页面。PREX 原有策略工作室保留自然语言、专业表单、完整策略和代码配置等入口；研究问答与策略回测可以分别使用，不宣称每次研究结论都会自动变成可执行策略。本次展示的研究流程不自动下单。

**5. 交付材料**

提供可访问的 PREX 网站、完整任务体验步骤、公开项目说明及已有产品视频。交互研究需要注册或登录 PREX；公开仓库无需申请访问。已有视频用于介绍 PREX 通用产品流程，Bitget 新增研究功能以当前网站体验为准。

### 大模型的作用（草稿）

大模型用于理解研究问题、提取标的和时间周期、结合接入的市场数据组织解释，以及处理用户追问。行情来源与模型文字生成分开说明；模型不保证涨跌，也不在本投研流程中自主交易。

提交前在此补充**实际调用的模型名称及用途**。本草稿未核验当前部署的模型配置，不默认声称使用 Qwen。

### 提交材料链接（逐行复制）

```text
项目 Demo（需注册或登录）：https://test.prex.best/start
公开项目说明与体验步骤：https://github.com/wcq-glhf/prex-bitget-ai-submission/tree/main/ai-trading-desk
公开仓库（文档及结果读取客户端，不含 PREX 引擎）：https://github.com/wcq-glhf/prex-bitget-ai-submission
已有产品演示视频（PREX / Binance Agent OS 概览，非 Bitget 专项录屏）：https://drive.google.com/file/d/18hOAWbHKjNPVI5ON2luKm4YQ1UTeMpHG/view?usp=drive_link
```

如果表单要求使用 X 或 YouTube 视频链接，可将同一段旧视频上传至指定平台，无需重新录制；但更换发布平台不会使旧视频变成 Bitget 完整研究任务的证明。是否足以满足演示要求，仍应向主办方确认。

## 项目二：PREX rToken Alpha Lab

赛道：Alpha Factory

主题：rToken Factor Strategies

**当前是待确认的提交方案，不是已经满足代码要求的材料包。**

### 项目介绍（可复制）

**1. 为什么做这个产品**

普通用户往往有交易想法，却缺少将想法转成明确规则、运行历史测试并审视风险的工具。PREX rToken Alpha Lab 把 Bitget rToken 数据接入现有策略工作室，帮助用户配置多资产研究与回测任务，并查看收益、回撤、风险指标、成本和净值曲线。

本项目探索不同标的之间的相对表现能否形成可检验的组合策略。具体因子公式、权重及计算实现属于 PREX 的闭源范围；本公开版本不提供可在本地重算该策略的代码。

**2. 面向谁，有什么价值**

面向希望研究代币化股票组合、能够理解收益与回撤但不想自行搭建回测环境的个人用户。用户可以从自然语言或表单配置开始，也可以使用完整策略和代码配置入口；标的、周期和策略参数由用户选择。

**3. 如何验证**

用户可以在网站运行回测，并检查报告中的测试区间、交易成本、风险指标和净值曲线。公开结果接口另提供一个服务器端示例报告及 CSV 曲线，便于直接查看，不需要注册或提供 API Key。

公开报告随可用市场数据更新，具体数值以报告返回的生成时间和测试终点为准，不把当前结果描述成历史提交时已经产生的结果。报告里的样本区间标签本身不能证明样本外数据从未参与选参；严格的样本外有效性还需要参数冻结记录及独立验证。未完成该核验前，不宣称已经满足样本外验证要求。

**4. 当前进展与限制**

Bitget rToken 研究与回测功能已经融合到 PREX 原有策略工作室。公开仓库提供 MIT 许可的只读客户端，用于获取服务器返回的报告；它不计算因子、不模拟成交，也不能独立复现回测。PREX 回测框架及策略计算保持闭源，因此当前材料仍需主办方确认是否接受闭源评审方式。

**5. 交付材料**

提供策略工作室、公开回测结果 JSON、净值 CSV、项目说明和结果读取客户端。已有产品视频作为补充介绍，不声称视频展示了当前 Bitget 策略或对应回测结果。

### 大模型的作用（草稿）

大模型辅助理解用户的策略描述、补全缺失信息和解释回测结果；数值计算由服务器端回测程序完成，而不是由聊天模型凭空生成收益曲线。提交前补充实际使用的模型名称，并按实际链路说明其用途，不把确定性的规则计算描述成 LLM 自主交易。

### 提交材料链接（逐行复制）

```text
项目 Demo／策略工作室（需注册或登录）：https://test.prex.best/strategies?view=backtest
项目说明与闭源范围：https://github.com/wcq-glhf/prex-bitget-ai-submission/tree/main/alpha-factory
回测结果 JSON（动态报告，非生成代码）：https://test.prex.best/api/bitget-ai/factor
净值与基准 CSV：https://test.prex.best/api/bitget-ai/factor?format=csv
开源结果读取客户端（不计算或复现回测）：https://github.com/wcq-glhf/prex-bitget-ai-submission/blob/main/examples/get-backtest-report.mjs
已有产品演示视频（非 Bitget 专项录屏）：https://drive.google.com/file/d/18hOAWbHKjNPVI5ON2luKm4YQ1UTeMpHG/view?usp=drive_link
```

## 可以发给主办方的确认消息

### 中文

你好，我们准备以 PREX 提交 AI Trading Desk 和 Alpha Factory 两个独立方向，产品功能分别是 Bitget 行情投研和 rToken 策略回测。

PREX 的回测引擎、因子公式和策略计算实现属于商业闭源资产。我们可以公开项目说明、可访问 Demo、实际回测指标、净值 CSV，以及 MIT 许可的结果读取客户端；这个客户端仅获取服务器报告，不是生成回测的计算代码。

想确认：

1. Alpha Factory 是否接受这种闭源方式？如果不接受，我们不会将读取报告的脚本作为“生成报告的代码”提交。是否有不要求公开计算源码的评审替代方式？
2. AI Trading Desk 能否使用当前网站上的完整研究任务，加上已有 PREX 产品演示视频？旧视频不是 Bitget 专项录屏。
3. 官方页面的截止日期是 9 月 27 日，目前是否仍可提交或补充上述材料？

我们希望在不公开商业计算实现的前提下，提供足够的可验证材料；任何替代方式都以你们明确同意为准。

### English

Hi, we are preparing two separate PREX entries: a Bitget-powered research workflow for AI Trading Desk and rToken strategy evaluation for Alpha Factory.

Our backtest engine, factor formulas, and strategy calculations are proprietary. We can provide an accessible demo, documentation, actual backtest metrics, equity CSV files, and an MIT-licensed report-reading client. That client retrieves a hosted report; it does not generate or independently reproduce the backtest.

Could you confirm whether Alpha Factory accepts a closed-source submission or another evaluation method that does not require publishing our calculation code? We will not present a report-fetching script as report-generating code.

For AI Trading Desk, would a complete research task in the current product plus our existing PREX overview video be acceptable? The video is not a recording of the new Bitget integration.

The published submission deadline is September 27. Are new submissions or supplemental materials still accepted?

## 最后检查

- [ ] 已确认提交／补交时间。
- [ ] 已确认 Alpha Factory 的闭源替代方式；没有确认则不标记为符合该赛道代码要求。
- [ ] 已补充真实模型名称和用途。
- [ ] 已补充本人实际发布的 X 帖链接，并包含官方要求的标签、提及及引用帖。
- [ ] 已用未登录浏览器检查仓库、报告、CSV 和视频访问权限。
- [ ] 已从新注册账户走通完整投研任务；旧视频不夸大为新增功能录屏。
- [ ] 若提交 Alpha Factory，已核验数据总区间、独立样本外验证及生成时点，并与官方确认可接受的证据形式。
- [ ] 未把原私有仓库改为公开，未上传公式、权重、计算代码或密钥。
- [ ] 两份表单分别填写项目说明和对应材料，未将 GitHub 链接替代项目说明本身。

本文件只整理材料；未代替用户提交表单、发布 X 帖子或联系主办方。
