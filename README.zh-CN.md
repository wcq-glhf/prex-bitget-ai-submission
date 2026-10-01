# PREX · Bitget AI 黑客松

PREX 面向普通交易用户，支持通过自然语言、专业表单、完整策略和代码配置构建策略，完成回测、保存、发布、持续跟踪与交易管理。

[进入 PREX 官网](https://prex.best) · [Bitget 市场研究](https://prex.best/start) · [Bitget 策略工作室](https://prex.best/strategies?view=backtest&builder=professional&market=bitget-rtoken) · [已有产品视频](https://drive.google.com/file/d/18hOAWbHKjNPVI5ON2luKm4YQ1UTeMpHG/view?usp=drive_link)

## 公开范围

本仓库公开可运行的展示客户端、输入表单、API 请求、任务查询、结果绘图和使用说明，采用 MIT 许可。

PREX 网站、回测引擎、因子公式、内部权重、策略计算代码及实盘执行系统保持闭源。用户输入问题或策略请求，客户端发送给 PREX 后端，再展示后端返回的结果；不在本地执行回测计算。

**Alpha Factory 不公开 PREX 策略代码或回测框架。** 可公开展示客户端、说明、接口调用示例、产品截图及经过字段白名单处理的指标与净值曲线。限制同样适用于 Git 历史、Notebook、压缩包、下载文件和浏览器 source map；密钥及用户私有数据不在公开范围内。[完整公开边界](./alpha-factory/README.md#publication-boundary)

## 在线体验

直接访问 **[prex.best](https://prex.best)**，在浏览器中使用 PREX，无需安装程序或打开终端。

Bitget 功能现已上线生产环境：**[市场研究](https://prex.best/start)** / **[Bitget 策略工作室](https://prex.best/strategies?view=backtest&builder=professional&market=bitget-rtoken)**。注册或登录 PREX 即可体验，研究和回测不需要连接交易账户或钱包。提交表单和产品演示统一使用这些正式站点链接。

**2026 年 10 月 2 日更新：** 生产环境已提供 Bitget 投研、rToken 回测和回测后的自动优化。支持的策略可选择比较最多 8 个候选，每次消耗 10 PREX 积分，任务失败退还；用户查看对比后自行决定是否采用推荐版本。这是本次更新的状态，不倒推为此前截止日已经上线。

## 效果预览

![PREX 展示客户端的真实示例报告](./assets/display-preview.png)

截图为可选 API 客户端在 2026 年 10 月 1 日展示的真实测试环境示例，保留原始来源，不改称生产官网截图、用户自定义结果或收益承诺。当前链接和客户端默认地址已切换生产。报告显示实际曲线区间、生成时间和服务端标记的验证窗口，时间统一使用 UTC；窗口标签本身不证明该区间未参与选参。

市场研究另附 [NVDA / AMD 真实问题、返回数据与截图](./ai-trading-desk/RESEARCH_CASE.md)。研究卡片区分已收盘 K 线价格和实时成交价；记录同时说明验收范围，不将接口成功返回等同于全部分析正确。

## 开源展示客户端（开发者可选）

仓库另外提供独立的本地 API 展示客户端。普通用户直接使用网站，不需要运行下面的程序。

<details>
<summary>查看开发者运行方式和客户端能力</summary>

需要 Node.js 20 或更新版本，不需要安装依赖、连接钱包或提供交易所密钥。Windows 也可在 PowerShell 中运行：

```bash
git clone https://github.com/wcq-glhf/prex-bitget-ai-submission.git
cd prex-bitget-ai-submission
npm start
```

在同一台电脑打开 `npm start` 输出的本地访问地址，使用客户端期间保留该进程运行。这是可选的本地客户端，不代表将它部署到了 PREX 官网。

- **市场研究：** 输入研究问题、标的和周期，PREX 返回基于 Bitget 数据的分析。
- **自定义回测：** 填写 Bitget rToken 参数表单、输入适用市场的自然语言，或粘贴你自己的完整 strategy JSON；提交后查询进度，展示真实返回的收益、回撤、Sharpe 和资金曲线。
- **示例报告：** 单独读取已有的 rToken 示例，不把它冒充为你的自定义结果。

**Bitget rToken 表单**可以填写标的代码、日期、K 线周期、模拟本金、指标、指标计算周期与调仓间隔。它支持简单的单指标排名、现货做多、无杠杆策略；指标名称只是公开接口的选项，不包含指标公式。标的、指标和计算周期由用户自行填写，不预装 PREX 私有示例的策略配方。复杂规则继续使用 JSON 或策略工作室。无效标的、历史不足等由后端校验，不偷偷替换为其他市场或示例。

自然语言回测 API 当前可路由 Binance、OKX 和 Hyperliquid。**Bitget rToken 请使用参数表单、自己的 JSON 配置或 PREX 策略工作室**，展示端会拦截暂未支持的 Bitget 自然语言请求，不会偷换数据市场。表单与 JSON 都是用户自己的参数，不是 PREX 的计算实现；仓库不附带私有策略模板。

默认调用生产环境 `https://prex.best`。开发者可用 `PREX_API_BASE=https://test.prex.best` 显式选择测试环境；测试环境仅用于开发，不作为主要参赛 Demo。客户端沿用现有匿名 API 的限流和客户端 IP 权限，不绕过登录页面或服务器权限。回测时保持同一网络；客户端重启后不保留本地任务访问列表。它只绑定本机地址，不应直接作为公网多用户代理部署。

`npm test` 使用模拟响应验证客户端，不创建远端任务。客户端不保存账户密钥，不自动重试回测提交，不自动交易。下载结果经过字段白名单处理，不带内部排名、因子权重或调仓配置。

</details>

**开源的是展示和调用层，不是可以离线独立计算的引擎。** 后端不可用时，客户端也不能自行计算。详细边界见 [架构说明](./ARCHITECTURE.md)。

## 两个项目

- **PREX Market Research Copilot：**AI Trading Desk / Personalized Research Workbench。在原有 AI 助手中使用 Bitget 数据进行单股研究和多股比较。
- **PREX rToken Alpha Lab：**Alpha Factory / rToken Factor Strategies。在原有策略工作室中使用 Bitget rToken 数据配置和评估策略。

这两项研究与回测功能不需要交易所 API Key，也不会自动下单。

## 体验投研

1. 打开 https://prex.best/start 并注册或登录。
2. 选择“市场分析”。
3. 输入：“比较 NVDA 和 AMD 的 4 小时趋势，谁更强？依据是什么？什么情况下这个判断失效？”
4. 查看研究结论、行情依据、数据时间与风险提示。

4 小时只是示例，实际周期由用户选择。

## 体验回测

1. 打开 [Bitget rToken 专业表单](https://prex.best/strategies?view=backtest&builder=professional&market=bitget-rtoken)。
2. 注册或登录后，确认市场为“Bitget · rToken Spot”。投研读取美股永续行情，此处回测使用 rToken 现货数据，不把两者描述成相同的执行市场。
3. 配置自己的标的和策略，确认规格后运行回测。
4. 查看收益、回撤、风险指标和净值曲线。
5. 对支持的策略，可在回测后点击“自动优化”，查看候选对比；有推荐结果时，再自行决定是否“采用为新版本”。这是官网登录后的功能，公开展示客户端不提供自动优化入口。

## 开源结果读取示例

需要 Node.js 20 或更新版本，不需要安装依赖或填写密钥。

```bash
git clone https://github.com/wcq-glhf/prex-bitget-ai-submission.git
cd prex-bitget-ai-submission
npm run report
```

该示例向 PREX 服务请求现有回测报告，不包含选币、因子、模拟成交或收益计算代码。报告只转发白名单字段；缺失时间显示未提供，不把用户请求区间冒充为实际数据覆盖。

## 提交说明

[查看两份填表草稿与提交检查表](./SUBMISSION.zh-CN.md)：包含项目介绍、逐行材料链接、已核验的投研模型与回退说明，以及询问主办方闭源评审方式的中英文消息。实际 X 帖链接和官方认可情况仍需补充，不能把 GitHub 更新当作已完成报名。

已有视频展示的是 PREX 通用产品和 Binance Agent OS 工作流，不能作为“已录制 Bitget 新功能”的证明。

根据 [10 月 2 日核对的官方规则](https://bitget-ai.gitbook.io/bitgetai_hackathons2#iv.-tracks-submission-and-judging)，Alpha Factory 要求可运行的策略代码和可验证结果。本仓库的展示客户端不满足该代码条款，闭源方式仍需主办方认可。AI Trading Desk 以可访问 Demo 和完整投研任务为主，旧视频作为补充；切换生产环境不代表已获得参赛资格确认。

历史回测和 AI 研究不代表未来表现。
