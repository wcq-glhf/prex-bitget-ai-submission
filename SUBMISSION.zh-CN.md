# PREX · Bitget 提交材料草稿（生产环境）

这份文档用于填写或补充官方表单，不代表项目已经提交、入选或获得闭源豁免。

公开范围：产品说明、体验步骤、研究与回测 API 展示客户端，以及回测指标和净值数据。客户端支持输入问题、提交用户自定义策略、查询任务和展示结果，不是只读报告下载器；PREX 引擎、因子公式、权重和策略计算实现保持闭源。开源许可仅覆盖本仓库。

## 在线体验与可选开源展示端

主要 Demo 使用 **PREX 生产环境**：[市场研究](https://prex.best/start) / [Bitget rToken 策略工作室](https://prex.best/strategies?view=backtest&builder=professional&market=bitget-rtoken)。评委和用户无需安装程序或运行终端，注册或登录后即可体验。正式提交、补充说明及 GitHub 首页统一使用 `prex.best`；测试环境仅保留作开发用途。

仓库另附可选的开源展示客户端，供开发者运行。用户可以输入研究问题或自己的回测请求，由 PREX 后端计算，客户端展示返回的结论、指标与曲线；已有示例报告单独展示。参数表单和 JSON 配置支持调用已有 Bitget rToken 回测路径；表单仅把用户选择转成请求，不包含因子或回测计算代码。客户端的 Bitget 自然语言回测请求暂不支持，不会静默换成其他市场。详见 [运行说明](./README.zh-CN.md) 和 [公开／闭源边界](./ARCHITECTURE.md)。

本次增加的是调用和展示功能，不包含 PREX 计算实现，也不改变下文关于计算代码交付范围的说明。

## 2026 年 10 月 2 日补充说明（可复制）

PREX 的 Bitget 市场研究、rToken 策略回测及回测后的自动优化已上线正式站点。主要研究 Demo 为 https://prex.best/start ，回测 Demo 为 https://prex.best/strategies?view=backtest&builder=professional&market=bitget-rtoken 。请以这两个生产入口替换此前的测试环境链接。

用户登录后可完成“配置策略 → 运行回测 → 查看指标与曲线 → 按需自动优化 → 对比并决定是否采用新版本”。自动优化最多比较 8 个候选，每次消耗 10 PREX 积分，失败退还；没有合适候选时保留原策略。研究和回测均不需要连接交易账户，也不自动下单。

公开仓库继续提供项目说明及 API 展示客户端，PREX 计算引擎保持闭源。已有产品视频沿用为概览附件；10 月 1 日的测试环境截图保留原始时间和来源。本补充反映 10 月 2 日的上线状态，不将新功能或当前报告描述成比赛截止日之前已经存在的成果。

## 使用前确认

- 两个项目分别填写表单，以各自的功能、体验流程和材料接受评审，不把同一份结果重复描述成两个独立成果。
- 下方项目介绍可以复制；模型名称、已发布的 X 帖链接、团队资料须填写真实信息，不能用占位文字提交。
- 旧视频继续作为产品概览附件，明确其展示的是 PREX / Binance Agent OS，不称为 Bitget 专项录屏。
- 当前材料没有公开 Alpha Factory 要求的策略计算代码，需先询问主办方是否接受闭源替代方式。
- 2026 年 10 月 2 日复核时，官方页面仍写明提交截止日期为 **2026 年 9 月 27 日（UTC+8）**。本次为生产上线后的材料更新；新提交、补交或修改已提交内容是否获接收，以主办方确认为准。

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

Bitget 研究入口已在生产站点 `prex.best/start` 上线，融合到 PREX 现有 AI 助手，不需要切换到独立的比赛页面。PREX 原有策略工作室保留自然语言、专业表单、完整策略和代码配置等入口；研究问答与策略回测可以分别使用，不宣称每次研究结论都会自动变成可执行策略。本次展示的研究流程不自动下单。

**5. 交付材料**

提供可访问的 PREX 生产网站、完整任务体验步骤、公开项目说明及已有产品视频。交互研究需要注册或登录 PREX；公开仓库无需申请访问。已有视频用于介绍 PREX 通用产品流程，Bitget 新增研究功能以当前生产网站体验为准。

### 大模型的作用（草稿）

程序先识别支持的标的和时间周期，并读取对应的 Bitget 行情；大模型结合用户问题与这些市场证据组织解释。标的匹配、行情读取与模型文字生成分开说明，不把程序解析描述成模型自主调用交易工具。模型不保证涨跌，也不在本投研流程中自主交易。

2026 年 10 月 2 日核验的生产公开 Bitget 投研 API 调用模型为 **DeepSeek V4 Flash（`deepseek-v4-flash`）**，用于结合 Bitget 快照组织研究结论，不负责产生行情数值或执行交易。当天通过展示客户端请求生产 NVDA / AMD 4H 投研，返回两个标的及模型正文。该公开 API 成功生成模型正文时返回 `prex-ai+bitget-v3`；失败、超时或无可用正文时返回 `prex-rules+bitget-v3`。官网登录助手采用另一组来源字段：结合 Bitget 数据生成模型正文时为 `model+bitget-v3`，数据规则回退为 `bitget-v3`。不能将两个接口的字段混为一谈，也不能将规则回退描述成模型成功回答。该说明不宣称所有 PREX 功能都使用同一模型，也不声称使用 Qwen。

### 提交材料链接（逐行复制）

```text
生产 Demo／市场研究（需注册或登录）：https://prex.best/start
公开项目说明与体验步骤：https://github.com/wcq-glhf/prex-bitget-ai-submission/tree/main/ai-trading-desk
历史投研记录与截图（10 月 1 日测试环境 API 展示端）：https://github.com/wcq-glhf/prex-bitget-ai-submission/blob/main/ai-trading-desk/RESEARCH_CASE.md
公开仓库（研究／自定义回测展示客户端，不含 PREX 引擎）：https://github.com/wcq-glhf/prex-bitget-ai-submission
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

用户可以在生产网站运行回测，并检查报告中的测试区间、交易成本、风险指标和净值曲线。支持的策略可继续运行自动优化、查看候选对比并自行决定是否采用推荐版本。公开结果接口另提供一个服务器端示例报告及 CSV 曲线，便于直接查看，不需要注册或提供 API Key。

10 月 2 日生产上线验收完成真实 Bitget 回测及 8 候选优化，并验证并发提交只扣一次、失败退款、跨账户隔离、分享因子脱敏和手机布局。本次验收样例未推荐替换，因此不将“采用新版本”分支记作该次真实浏览器验收通过；这些检查也不代表策略收益保证或独立样本外有效性证明。

同日切换展示客户端默认地址后，生产公开 API 实测完成一次用户自定义 rToken 回测（返回 179 个净值点），示例报告及 CSV 均返回 209 个曲线点。这些数量只记录本次接口验收，不代表用户规模或固定报告长度。

公开报告随可用市场数据更新，具体数值以报告返回的生成时间和测试终点为准，不把当前结果描述成历史提交时已经产生的结果。报告里的样本区间标签本身不能证明样本外数据从未参与选参；严格的样本外有效性还需要参数冻结记录及独立验证。未完成该核验前，不宣称已经满足样本外验证要求。

**4. 当前进展与限制**

Bitget rToken 回测及自动优化已上线 PREX 生产策略工作室。自动优化按服务器规则比较候选，不通过提高杠杆或移除交易成本美化结果，也不由大模型编造收益。公开仓库提供 MIT 许可的 API 展示客户端，可输入研究问题、提交自己的策略参数、查询回测任务并展示指标与曲线；它不计算因子、不模拟成交，也不能离线独立复现回测。自动优化使用官网登录后的入口。PREX 回测框架及策略计算保持闭源，因此当前材料仍需主办方确认是否接受闭源评审方式。

**5. 交付材料**

提供生产策略工作室、自动优化体验步骤、公开回测结果 JSON、净值 CSV、项目说明和研究／回测展示客户端。已有产品视频作为补充介绍，不声称视频展示了当前 Bitget 策略、自动优化或对应回测结果。

### 大模型的作用（草稿）

大模型辅助理解用户的策略描述、补全缺失信息和解释回测结果；数值计算由服务器端回测程序完成，而不是由聊天模型凭空生成收益曲线。提交前补充实际使用的模型名称，并按实际链路说明其用途，不把确定性的规则计算描述成 LLM 自主交易。

### 提交材料链接（逐行复制）

```text
生产 Demo／Bitget rToken 专业表单及回测后自动优化（需注册或登录）：https://prex.best/strategies?view=backtest&builder=professional&market=bitget-rtoken
项目说明与闭源范围：https://github.com/wcq-glhf/prex-bitget-ai-submission/tree/main/alpha-factory
回测结果 JSON（动态报告，非生成代码）：https://prex.best/api/bitget-ai/factor
净值与基准 CSV：https://prex.best/api/bitget-ai/factor?format=csv
开源研究／回测展示客户端（不含计算引擎）：https://github.com/wcq-glhf/prex-bitget-ai-submission
可选报告读取脚本（不计算或复现回测）：https://github.com/wcq-glhf/prex-bitget-ai-submission/blob/main/examples/get-backtest-report.mjs
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
- [x] 已核验 Bitget 投研模型名称、用途与规则回退标识；提交时仍需检查实际响应，不能将回退当成模型成功。
- [ ] 已补充本人实际发布的 X 帖链接，并包含官方要求的标签、提及及引用帖。
- [x] Demo 链接、公开报告及展示客户端默认地址统一使用生产环境；历史截图保留测试来源。
- [ ] 已用未登录浏览器检查仓库、报告、CSV 和视频访问权限。
- [ ] 已从新注册账户走通完整投研任务；旧视频不夸大为新增功能录屏。
- [ ] 若提交 Alpha Factory，已核验数据总区间、独立样本外验证及生成时点，并与官方确认可接受的证据形式。
- [ ] 未把原私有仓库改为公开，未上传公式、权重、计算代码或密钥。
- [ ] 两份表单分别填写项目说明和对应材料，未将 GitHub 链接替代项目说明本身。

本文件只整理材料；未代替用户提交表单、发布 X 帖子或联系主办方。
