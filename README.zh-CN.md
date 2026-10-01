# PREX · Bitget AI 黑客松

PREX 面向普通交易用户，支持通过自然语言、专业表单、完整策略和代码配置构建策略，完成回测、保存、发布、持续跟踪与交易管理。

[进入 PREX AI](https://test.prex.best/start) · [进入策略工作室](https://test.prex.best/strategies?view=backtest) · [已有产品视频](https://drive.google.com/file/d/18hOAWbHKjNPVI5ON2luKm4YQ1UTeMpHG/view?usp=drive_link)

## 公开范围

本仓库公开产品说明、操作步骤和读取回测结果的客户端示例，示例采用 MIT 许可。

PREX 网站、回测引擎、因子公式、策略计算代码及实盘执行系统保持闭源。用户可以通过产品查看结果，公开客户端仅获取结果，不在本地执行回测计算。

## 两个项目

- **PREX Market Research Copilot：**AI Trading Desk / Personalized Research Workbench。在原有 AI 助手中使用 Bitget 数据进行单股研究和多股比较。
- **PREX rToken Alpha Lab：**Alpha Factory / rToken Factor Strategies。在原有策略工作室中使用 Bitget rToken 数据配置和评估策略。

这两项研究与回测功能不需要交易所 API Key，也不会自动下单。

## 体验投研

1. 打开 https://test.prex.best/start 并注册或登录。
2. 选择“市场分析”。
3. 输入：“比较 NVDA 和 AMD 的 4 小时趋势，谁更强？依据是什么？什么情况下这个判断失效？”
4. 查看研究结论、行情依据、数据时间与风险提示。

4 小时只是示例，实际周期由用户选择。

## 体验回测

1. 打开 https://test.prex.best/strategies?view=backtest 。
2. 选择构建入口，并在适用入口选择“Bitget · rToken Spot”。
3. 配置自己的标的和策略，确认规格后运行回测。
4. 查看收益、回撤、风险指标和净值曲线。

## 开源结果读取示例

需要 Node.js 20 或更新版本，不需要安装依赖或填写密钥。

```bash
git clone https://github.com/wcq-glhf/prex-bitget-ai-submission.git
cd prex-bitget-ai-submission
npm run report
```

该示例向 PREX 服务请求现有回测报告，不包含选币、因子、模拟成交或收益计算代码。

## 提交说明

[查看两份填表草稿与提交检查表](./SUBMISSION.zh-CN.md)：包含项目介绍、逐行材料链接，以及询问主办方闭源评审方式的中英文消息。模型名称、实际 X 帖链接和官方认可情况仍需确认。

已有视频展示的是 PREX 通用产品和 Binance Agent OS 工作流，不能作为“已录制 Bitget 新功能”的证明。

Alpha Factory 要求附生成报告的代码或 notebook。本仓库的结果读取客户端不满足该代码条款，闭源提交方式需先获得主办方认可。AI Trading Desk 要求完整投研任务演示或录屏，现有产品和视频是否充分，也以主办方审核为准。

历史回测和 AI 研究不代表未来表现。
