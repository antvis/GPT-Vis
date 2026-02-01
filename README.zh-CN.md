<img src="https://gw.alipayobjects.com/zos/antfincdn/R8sN%24GNdh6/language.svg" width="18"> [English](./README.md) | 简体中文 | [日本語](./README.ja-JP.md)

<div align="center">
  <img src="https://github.com/eosphoros-ai/GPT-Vis/assets/17919400/c8804ffb-d3d6-45d3-846f-cf217681ab05" height="70">
</div>

<h1 align="center">GPT-Vis</h1>

<div align="center">

**为 LLM 时代打造的 AI 原生可视化组件库**

面向 GPT、生成式 AI 和 LLM 项目的组件。不仅仅是 UI 组件。

[![npm version](https://img.shields.io/npm/v/@antv/gpt-vis.svg)](https://www.npmjs.com/package/@antv/gpt-vis)
[![npm downloads](https://img.shields.io/npm/dm/@antv/gpt-vis.svg)](https://www.npmjs.com/package/@antv/gpt-vis)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

<p align="center">
  <a href="https://gpt-vis.antv.vision" target="_blank">📖 文档</a> •
  <a href="/knowledges" target="_blank">🧠 知识库</a> •
  <a href="https://www.tbox.cn/share/202504APmv6c00373739?platform=WebService" target="_blank">🎮 在线体验</a> •
  <a href="https://github.com/antvis/mcp-server-chart" target="_blank">🔌 MCP 服务器</a>
</p>

</div>

<div align="center">
  <video src="https://github.com/user-attachments/assets/b8eb4a89-b0ed-4a39-8fab-316161949446" />
</div>

<br/>

## 🌟 为什么选择 GPT-Vis？

在 AI 时代，**大语言模型与数据可视化的交互方式已经发生根本性变化**。GPT-Vis 专为这一新范式而生：

- **🤖 AI 优先设计**：专为 LLM 生成内容和 AI 智能体工作流设计的组件
- **📊 智能化协议**：AI 模型能够自然理解和生成的标准化可视化协议
- **🎯 零学习曲线**：LLM 无需人工干预即可创建复杂可视化
- **🔗 无缝集成**：通过 [MCP](https://github.com/antvis/mcp-server-chart) 开箱即用地支持 ChatGPT、Claude 等主流 AI 平台

## ✨ 核心特性

### 🧠 **AI 优化的可视化协议**

专为 LLM 设计的标记语言，让 AI 通过自然对话生成可视化。无需复杂配置——只需描述你想要的内容。

```markdown
\`\`\`vis-chart
{
"type": "line",
"data": [{"time": "2024", "value": 100}]
}
\`\`\`
```

### 🎨 **丰富的组件库**

20+ 种针对 AI 生成优化的图表类型，包括：

- **统计图表**：折线图、柱状图、饼图、散点图、热力图、直方图
- **关系图表**：网络图、思维导图、组织架构图、流程图
- **高级分析**：双轴图、雷达图、小提琴图、气泡图

### 📚 **全面的知识库**

内置图表知识库帮助 AI 模型：

- **理解**何时使用每种图表类型
- **选择**最适合数据的可视化方式
- **生成**准确的图表配置

在 200+ 真实场景中评估，准确率超过 90%。

### 🌐 **多平台支持**

- **React**：原生支持 `<GPTVis />` 组件
- **Streamlit**：通过 [streamlit-gpt-vis](https://github.com/antvis/GPT-Vis/tree/main/bindings/streamlit-gpt-vis) 实现 Python 集成
- **MCP 协议**：通过 [mcp-server-chart](https://github.com/antvis/mcp-server-chart) 实现通用 AI 智能体集成

## 🚀 快速开始

### 安装

```bash
npm install @antv/gpt-vis
# 或
pnpm add @antv/gpt-vis
```

### 基础用法

直接渲染包含可视化代码块的 AI 生成 Markdown：

```jsx
import { GPTVis } from '@antv/gpt-vis';

// 这可以来自任何 LLM（ChatGPT、Claude 等）
const markdownContent = `
这是收入趋势分析：

\`\`\`vis-chart
{
  "type": "line",
  "data": [
    { "time": "2020", "value": 100 },
    { "time": "2021", "value": 120 },
    { "time": "2022", "value": 150 },
    { "time": "2023", "value": 180 }
  ]
}
\`\`\`
`;

export default () => <GPTVis>{markdownContent}</GPTVis>;
```

<details>
<summary>🛠 进阶：自定义组件</summary>

根据特定需求扩展自定义渲染器：

```jsx
import { GPTVisLite, withChartCode, ChartType, Pie } from '@antv/gpt-vis';

const customRenderers = {
  'my-custom-block': ({ children }) => <div className="custom">{children}</div>,
};

const components = {
  code: withChartCode({
    languageRenderers: customRenderers,
    components: { [ChartType.Pie]: Pie },
  }),
};

export default () => <GPTVisLite components={components}>{aiGeneratedContent}</GPTVisLite>;
```

</details>

### Python / Streamlit

非常适合数据科学和 AI 应用：

```python
import streamlit as st
from streamlit_gpt_vis import set_gpt_vis

content = '''
这是趋势分析：

\`\`\`vis-chart
{"type": "line","data": [{"time":2020,"value":100},{"time":2021,"value":120}]}
\`\`\`
'''

set_gpt_vis(content)
```

了解更多 👉 [streamlit-gpt-vis](https://github.com/antvis/GPT-Vis/tree/main/bindings/streamlit-gpt-vis)

## 🧠 AI 知识库

[可视化知识库](https://github.com/antvis/GPT-Vis/tree/main/knowledges)提供全面的资源，帮助 AI 智能体理解和选择合适的可视化。我们的评估结果展示了各种图表类型的高准确性：

|               |                         |                      |               |                      |                 |         |
| ------------- | ----------------------- | -------------------- | ------------- | -------------------- | --------------- | ------- |
| Line(Multi)   | Column(Grouped/Stacked) | Pie                  | Area(Stacked) | Bar(Grouped/Stacked) | Scatter(Bubble) | Heatmap |
| 40/40         | 25/27                   | 13/14                | 18/18         | 18/20                | 10/10           | 9/10    |
| Histogram     | Tree Map                | Word Cloud           | Radar         | Dual Axis            | Rich Text NTV   | Pin Map |
| 15/16         | 13/15                   | 11/12                | 23/23         | 13/14                | 7.3/10          | 10/11   |
| Network Graph | Mind Map                | Organizational Chart | Flow Diagram  | Fishbone Diagram     |                 |         |
| 8/10          | 12/14                   | 10/12                | 10/11         | 10/12                |                 |         |

_注：数字表示成功生成图表数/总测试用例数。_

## 🤖 图表推荐数据集

我们的[图表推荐数据集](https://github.com/antvis/GPT-Vis/blob/main/evaluations/datastes/recommend/README.md)旨在评估和微调 LLM 的图表类型选择能力。它涵盖：

- **16 种图表类型**及真实场景
- 每种图表类型 **1-3 个场景**
- 每个场景 **15+ 个示例**
- 持续更新并接受社区贡献

## 💡 使用场景

GPT-Vis 非常适合：

- **AI 聊天机器人**：为 ChatGPT、Claude 或自定义 LLM 界面添加丰富的可视化
- **数据分析工具**：让 LLM 直接从数据分析中创建图表
- **报告生成**：从 AI 处理的数据自动生成可视化报告
- **仪表板创建**：让 AI 智能体即时构建交互式仪表板
- **教育平台**：帮助 AI 导师用动态可视化解释概念

## 💻 本地开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建库
pnpm build

# 运行测试
pnpm test
```

## 🤝 贡献

我们欢迎各种形式的贡献！包括：

- 🐛 Bug 报告和修复
- ✨ 新图表类型或功能
- 📊 为知识库添加更多图表示例
- 📝 文档改进
- 🌐 翻译

请阅读我们的贡献指南并提交 Pull Request。

## 📄 开源协议

[MIT](./LICENSE) © [AntV](https://antv.antgroup.com/)

---

<div align="center">

**由 AntV 团队用 ❤️ 打造**

[AntV](https://antv.antgroup.com/) | [GitHub](https://github.com/antvis) | [Twitter](https://twitter.com/AntV_Alipay)

</div>
