# PREX · Bitget 官方表单填写版（生产环境）

更新于 2026 年 10 月 2 日。按当前官方表单字段整理，两套项目材料分别复制到各自的表单。本文更新不代表已代为提交或修改报名记录。

## 表单依据与填写方式

- [官方提交表单](https://docs.google.com/forms/d/e/1FAIpQLScojKm9H2xDNFL3ijcDcKxwG-_PvkmyimiAB-SEFOx_WsqGNA/viewform) 当前写明截止时间为 **2026 年 10 月 8 日 23:59（UTC+8）**。旧手册的 9 月 27 日与当前表单不一致，此处按实际表单更新，后续以官方最新通知为准。
- 一句话简介最多 140 字符。项目介绍分五部分；材料链接单独逐行放入 `Submission Material Links`，不混进项目介绍。
- 每个项目单独提交，两个项目使用相同的真实团队信息与 Bitget UID。
- 主要 Demo 均为生产 `prex.best`。网站交互需要注册或登录；公开报告、CSV 和仓库无需登录 PREX。
- 表单要求登录项目附演示视频。下面保留现有 PREX 概览视频，不将它说成 Bitget 专项录屏；该旧视频能否充分覆盖评审任务仍需确认。表单推荐公开 X 或 YouTube 视频，时长不超过三分钟。
- PREX 引擎、因子公式、私有权重及策略计算继续闭源。Alpha Factory 的计算代码要求与独立样本外证据仍有未完成项，详见项目二。

## 两份表单共用的信息

| 表单字段 | 填写内容 |
| --- | --- |
| Team Name | PREX |
| Team Lead Bitget UID (numbers only) | 填本人实际 Bitget UID，仅数字；本材料不预填或公开账号标识 |
| Team Lead Email | 填可收信的负责人邮箱；项目公开联系邮箱为 hello@prex.best |
| Team Lead Contact (Telegram Handle or other) | 已有项目联系账号为 @WARD999999，确认仍为报名联系人后使用 |
| Member Background | 按本人真实身份选择，如 Developer、Researcher、Trader、Entrepreneur |
| University Name | 仅申请大学专项奖时填写真实学校，否则留空 |
| Apply for Demo Day | 按本人意愿选择 |
| How did you hear about this event? | 按实际来源选择 |
| X Project Post URL | 填本人已发布的对应项目帖子链接，不能用 X 主页或官方活动帖替代 |
| Did this team participate in S1? | 按真实参赛历史选择 |
| Apply for Post-event Kimi K3 Token Credits | 按本人意愿选择 |
| Open to Playbook Review and Listing Discussion | 按本人意愿选择，不是已上架的声明 |

身份、账号和意愿字段不要整段复制成答案。下文“已观察”是实际检查结果，“计划”是后续验证安排。

## 项目一：AI Trading Desk

### Competition Track

```text
AI Trading Desk
```

### Competition Sub-theme

```text
Personalized Research Workbench
```

### Project Name

```text
PREX Market Research Copilot
```

### One-line Project Summary

```text
在 PREX 生产网站用自然语言研究 Bitget 美股永续行情，比较标的、查看数据依据与风险，并持续追问。
```

### Project Description

复制以下五段到同一个项目介绍字段：

```text
1. 核心想法
个人交易者研究股票相关市场时，常在行情、图表和聊天工具间反复切换，难以核对 AI 判断所依据的数据。PREX Market Research Copilot 将自然语言问答与 Bitget 美股永续行情整合在同一个研究工作台。程序读取对应标的及周期的市场证据，大模型组织解释，用户查看时间、依据和风险后自行作出决定。

2. 目标用户与产品价值
面向关注科技股及代币化股票、会看基础图表但不会编写研究脚本的个人交易者，主要用于交易前的单股研究、同类股票比较和风险复核。用户可按自己的研究频率选择 1 小时、4 小时或日线；研究不要求资金规模、交易所密钥或钱包。与脱离行情的通用聊天相比，PREX 把回答绑定到可检查的标的、周期和数据时间。

3. 验证数据与关键指标
已观察：2026 年 10 月 2 日，通过生产公开接口完成 NVDA/AMD 4 小时研究请求，返回两个目标标的、市场观察和模型正文。可复查任务为“比较 NVDA 和 AMD 的 4 小时趋势，谁更强？依据是什么？什么情况下这个判断失效？”。生产研究页面可访问，展示客户端 15 项本地测试通过。这些是交付及接口验证，不是投资判断准确率或真实用户留存数据。
计划：用固定研究任务集评估标的与周期匹配、数据引用一致性、风险和失效条件是否完整，并记录响应时间与任务完成率；上线使用数据将按首次研究完成、后续追问和再次使用统计，区分实际观察与目标。当前不填虚构的用户数、AUM 或交易量。

4. 当前进展
Bitget 市场研究已融合进生产 PREX 的 AI 助手。用户注册或登录后进入市场分析，输入问题并继续追问。研究服务使用 Bitget 公共 V3 行情接口及 DeepSeek V4 Flash；模型超时或不可用时提供明确标识的规则回退。Next.js、React 和独立 API 展示客户端构成产品与展示入口。已处理请求周期匹配、已收盘 K 线与实时观察区分、回退标识及响应脱敏；后续重点是持续评估研究质量。本项目流程不自动下单。

5. 对 AI Trading 的看法
面向个人交易者的 AI 研究工具应先让数据和判断可复核，再谈自动化。模型负责解释证据和提出需要验证的问题，不能把生成的文字当作真实行情、确定收益或已经执行的交易。
```

### Role of the LLM / AI in Your Project

```text
2026 年 10 月 2 日核验的生产 Bitget 研究 API 使用 DeepSeek V4 Flash（deepseek-v4-flash）。程序识别支持的标的与周期并读取 Bitget 行情，大模型结合这些证据回答比较、趋势及风险问题。模型不生成行情数值、不访问用户交易账户，也不在该流程中自主下单。

模型正文与规则回退有不同来源标识：公开 API 的模型响应为 prex-ai+bitget-v3，回退为 prex-rules+bitget-v3；官网登录助手使用另一组来源标识，不能混同。HTTP 成功本身不代表模型生成成功。本材料只描述已核验的调用链，不声称所有 PREX 功能都使用同一模型或使用了 Qwen。
```

### Submission Material Links

```text
生产 Demo／市场研究（需注册或登录）：https://prex.best/start
完整研究任务步骤：https://github.com/wcq-glhf/prex-bitget-ai-submission/tree/main/ai-trading-desk
研究记录与截图（含原始日期和环境说明）：https://github.com/wcq-glhf/prex-bitget-ai-submission/blob/main/ai-trading-desk/RESEARCH_CASE.md
公开 API 展示客户端及说明：https://github.com/wcq-glhf/prex-bitget-ai-submission
已有 PREX 产品概览视频（非 Bitget 专项录屏）：https://drive.google.com/file/d/18hOAWbHKjNPVI5ON2luKm4YQ1UTeMpHG/view?usp=drive_link
```

## 项目二：Alpha Factory

当前可填写项目说明，但**不能据此标记已满足该赛道全部要求**：公开仓库不含生成回测的计算代码，闭源替代方式尚未确认；报告的 30 天验证窗口也尚无独立参数冻结证明。不得为满足代码字段而公开 PREX 引擎，或把读取报告的脚本冒充计算代码。

### Competition Track

```text
Alpha Factory
```

### Competition Sub-theme

```text
rToken Factor Strategies
```

### Project Name

```text
PREX rToken Alpha Lab
```

### One-line Project Summary

```text
在 PREX 生产策略工作室配置 Bitget rToken 策略，查看真实历史回测，并按需比较自动优化候选。
```

### Project Description

复制以下五段到同一个项目介绍字段：

```text
1. 核心想法
个人用户有代币化股票交易想法，却往往缺少将想法转为明确规则、计算成本并检验历史风险的工具。PREX rToken Alpha Lab 使用 Bitget rToken 现货数据，在既有策略工作室中配置和评估策略，研究多个资产之间的相对表现能否形成可检验的组合规则。用户指定标的、周期和参数，由服务器计算结果；本金、杠杆、回撤约束、手续费及滑点纳入策略规格。具体公式、权重与计算实现属于 PREX 闭源范围。

2. 目标用户与产品价值
面向能够理解收益与回撤、希望研究代币化股票组合但不想自行搭建回测环境的个人交易者。用户可从 Bitget 专业表单或自己的完整策略配置开始，以 1 小时、4 小时或日线进行历史研究，按自己的模拟本金比较结果。本流程用于投入真实资金前的研究，不要求连接交易账户，不宣称固定的最低实盘本金或适合所有风险偏好。

3. 验证数据与关键指标
已观察：公开示例报告生成于 2026-10-01 22:48:02 UTC，曲线覆盖 2026-07-17 12:00 至 2026-10-01 16:00 UTC，约 76.2 天；累计收益 28.87%，最大回撤幅度 4.54%，Sharpe 3.17，盈利周期占比 51.68%，报告标注交易成本 1.05%，调仓 18 次。服务端标记的最后 30 天窗口为 2026-09-01 16:00 至 2026-10-01 16:00 UTC，窗口 Sharpe 为 4.11。以上是历史模拟快照，后续报告可能更新；窗口标签不能证明该区间未参与选参，尚不宣称独立样本外验证已成立。
已观察：生产端另完成用户自定义 rToken 回测和 8 候选优化验收，覆盖并发提交不重复扣费、失败退款、跨账户隔离及分享脱敏。该优化样例未推荐替换，不把运行成功当作收益改善。未公开的指标或费用分项不编造；暂无本 Bitget 工作流独立的用户留存、AUM 或实盘交易量数据。
计划：建立参数冻结与独立验证记录，持续检验不同市场阶段及成本条件下的稳健性，并跟踪回测完成、保存策略和再次使用等实际产品指标。

4. 当前进展
Bitget rToken 回测和回测后的自动优化已上线生产 PREX。用户确认策略后运行回测，查看指标与净值；支持的策略可按需比较最多 8 个候选，再决定是否采用推荐版本。优化每次消耗 10 PREX 积分，失败退还；没有合适候选时保留原版本，不通过提高杠杆或移除费用美化结果。产品使用 Bitget 市场数据、PREX 私有回测引擎、Next.js/React 界面及后台任务。公开仓库只提供 API 调用与展示，不具备离线重算引擎。符合赛道要求的闭源评审方式和独立样本外证据仍待确认。

5. 对 AI Trading 的看法
AI 可以降低策略研究的使用门槛，但计算结果应由可追踪的数据和确定性程序产生。自动优化应呈现比较过程与限制，让用户作出选择，而不是把搜索出的历史表现包装成未来收益保证。
```

### Role of the LLM / AI in Your Project

```text
本次 rToken 演示以用户填写的策略参数进入回测，收益、风险指标和候选比较均由服务器端确定性程序计算。自动优化不是由大模型编造净值或直接作出实盘交易决定。

PREX 相邻的 Bitget 市场研究流程已核验使用 DeepSeek V4 Flash（deepseek-v4-flash），用于结合市场证据组织解释。该研究能力与策略回测可以分别使用；不把投研模型调用描述成每一次回测或优化的必要步骤。本条只覆盖已核验的模型用途。
```

### Submission Material Links

```text
生产 Demo／Bitget rToken 专业表单及回测后自动优化（需注册或登录）：https://prex.best/strategies?view=backtest&builder=professional&market=bitget-rtoken
项目说明与闭源范围：https://github.com/wcq-glhf/prex-bitget-ai-submission/tree/main/alpha-factory
回测记录 JSON（动态更新的结果报告）：https://prex.best/api/bitget-ai/factor
净值与基准 CSV：https://prex.best/api/bitget-ai/factor?format=csv
公开 API 展示客户端（不含生成回测的计算代码）：https://github.com/wcq-glhf/prex-bitget-ai-submission
已有 PREX 产品概览视频（非 Bitget 专项录屏）：https://drive.google.com/file/d/18hOAWbHKjNPVI5ON2luKm4YQ1UTeMpHG/view?usp=drive_link
```

## Material Additions Since S1

仅本人确认参加过 S1 时填写。以下是本次 Bitget 功能更新的候选描述，需先与实际 S1 提交版本比较，只保留当时没有的部分：

```text
本次新增 Bitget 美股永续行情研究与多标的比较、Bitget rToken 现货数据接入原策略工作室，以及生产回测后的候选优化流程。研究、回测、失败退款和分享权限均有对应验收；公开仓库增加研究／自定义回测 API 展示客户端和完整体验说明。此次更新以生产 prex.best 为主要 Demo，保留各项验证发生的真实时间及原始环境，不将旧视频描述成新增功能录屏。
```

## 向主办方确认闭源评审与旧视频的消息草稿

此段只供用户自行发送，未代发。

```text
你好，PREX 的 Bitget 研究与 rToken 回测已上线生产站点。我们准备分别提供 AI Trading Desk 的完整研究任务和 Alpha Factory 的回测记录。

PREX 引擎、因子公式及计算实现为商业闭源资产。我们可以提供可访问 Demo、报告 JSON、净值 CSV 和公开 API 展示客户端，但该客户端不生成或独立复现回测。请问 Alpha Factory 是否接受不公开计算源码的评审替代方式？报告目前有标记的 30 天窗口，但我们不将其冒称为已验证的独立样本外结果。

网站交互需要登录，我们已附现有 PREX 产品概览视频，并公开 Bitget 研究任务步骤及真实记录；旧视频不是 Bitget 专项录屏。请问现有材料是否足以满足登录 Demo 的视频及完整任务要求？若视频需更换发布平台，我们计划复用原视频，不将其改称为新增功能演示。
```

## 提交前仍需本人填写或确认

- 真实 Bitget UID、负责人联系方式、成员背景、来源渠道、S1 历史及各项参加意愿。
- 每个项目对应的真实 X 帖链接；按官方推广要求填写，不使用占位链接。
- 视频对评委可访问，且旧概览视频能否满足本项目展示要求已确认。
- Alpha Factory 的闭源替代方式及独立样本外证据；未确认则保留上述限制，不标记为已满足。
- 两份项目介绍各自复制到表单字段，材料链接逐行填写；GitHub 更新不会自动修改已提交的官方表单。

本材料仅公开产品说明、用户流程、模型用途、公开报告指标及展示客户端。不得加入私有策略配方、回测实现、密钥或用户私有数据；现有研究截图保留原始日期和测试来源，视频继续标为产品概览。
