<img src="https://gw.alipayobjects.com/zos/antfincdn/R8sN%24GNdh6/language.svg" width="18"> English | [简体中文](./README.zh-CN.md) | [日本語](./README.ja-JP.md)

<div align="center">
  <img src="https://github.com/eosphoros-ai/GPT-Vis/assets/17919400/c8804ffb-d3d6-45d3-846f-cf217681ab05" height="70">
</div>

<h1 align="center">GPT-Vis</h1>

<div align="center">

**The AI-Native Visualization Component Library for the LLM Era**

Components for GPTs, generative AI, and LLM projects. Not only UI Components.

[![npm version](https://img.shields.io/npm/v/@antv/gpt-vis.svg)](https://www.npmjs.com/package/@antv/gpt-vis)
[![npm downloads](https://img.shields.io/npm/dm/@antv/gpt-vis.svg)](https://www.npmjs.com/package/@antv/gpt-vis)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

<p align="center">
  <a href="https://gpt-vis.antv.vision" target="_blank">📖 Documentation</a> •
  <a href="/knowledges" target="_blank">🧠 Knowledge Base</a> •
  <a href="https://www.tbox.cn/share/202504APmv6c00373739?platform=WebService" target="_blank">🎮 Try Demo</a> •
  <a href="https://github.com/antvis/mcp-server-chart" target="_blank">🔌 MCP Server</a>
</p>

</div>

<div align="center">
  <video src="https://github.com/user-attachments/assets/24b0d820-ebf8-4351-bc5b-4fa607a76e17" />
</div>

<br/>

## 🌟 Why GPT-Vis?

In the AI era, **how LLMs interact with and present data is fundamentally different**. GPT-Vis is purpose-built for this new paradigm:

- **🤖 AI-First Design**: Components designed specifically for LLM-generated content and AI agent workflows
- **📊 Intelligent Protocol**: Standardized visualization protocol that AI models can naturally understand and generate
- **🎯 Zero Learning Curve**: LLMs can create complex visualizations without human intervention
- **🔗 Seamless Integration**: Works out-of-the-box with ChatGPT, Claude, and other leading AI platforms via [MCP](https://github.com/antvis/mcp-server-chart)

## ✨ Features

### 🧠 **AI-Optimized Visual Protocol**

A specialized markup language designed for LLMs to generate visualizations through natural conversation. No complex configurations needed—just describe what you want.

```markdown
\`\`\`vis-chart
{
"type": "line",
"data": [{"time": "2024", "value": 100}]
}
\`\`\`
```

### 🎨 **Rich Component Library**

20+ chart types optimized for AI generation, including:

- **Statistical Charts**: Line, Bar, Pie, Scatter, Heatmap, Histogram
- **Relationship Diagrams**: Network Graph, Mind Map, Organization Chart, Flow Diagram
- **Advanced Analytics**: Dual Axis, Radar, Violin, Bubble Charts

### 📚 **Comprehensive Knowledge Base**

Built-in chart knowledge base that helps AI models:

- **Understand** when to use each chart type
- **Select** the most appropriate visualization for your data
- **Generate** accurate chart specifications automatically

Evaluated on 200+ real-world scenarios with 90%+ accuracy.

### 🌐 **Multi-Platform Support**

- **React**: Native support with `<GPTVis />` component
- **Streamlit**: Python integration via [streamlit-gpt-vis](https://github.com/antvis/GPT-Vis/tree/main/bindings/streamlit-gpt-vis)
- **MCP Protocol**: Universal AI agent integration via [mcp-server-chart](https://github.com/antvis/mcp-server-chart)

## 🚀 Quick Start

### Installation

```bash
npm install @antv/gpt-vis
# or
pnpm add @antv/gpt-vis
```

### Basic Usage

Simply render AI-generated markdown containing visualization blocks:

```jsx
import { GPTVis } from '@antv/gpt-vis';

// This could come from any LLM (ChatGPT, Claude, etc.)
const markdownContent = `
Here's the revenue trend analysis:

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
<summary>🛠 Advanced: Custom Components</summary>

Extend with your own renderers for specific needs:

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

Perfect for data science and AI applications:

```python
import streamlit as st
from streamlit_gpt_vis import set_gpt_vis

content = '''
Here's the trend analysis:

\`\`\`vis-chart
{"type": "line","data": [{"time":2020,"value":100},{"time":2021,"value":120}]}
\`\`\`
'''

set_gpt_vis(content)
```

Learn more 👉 [streamlit-gpt-vis](https://github.com/antvis/GPT-Vis/tree/main/bindings/streamlit-gpt-vis)

## 🧠 AI Knowledge Base

The [Visual Knowledge Base](https://github.com/antvis/GPT-Vis/tree/main/knowledges) provides comprehensive resources to help AI agents understand and select appropriate visualizations. Our evaluation results demonstrate high accuracy across various chart types:

|               |                         |                      |               |                      |                 |         |
| ------------- | ----------------------- | -------------------- | ------------- | -------------------- | --------------- | ------- |
| Line(Multi)   | Column(Grouped/Stacked) | Pie                  | Area(Stacked) | Bar(Grouped/Stacked) | Scatter(Bubble) | Heatmap |
| 40/40         | 25/27                   | 13/14                | 18/18         | 18/20                | 10/10           | 9/10    |
| Histogram     | Tree Map                | Word Cloud           | Radar         | Dual Axis            | Rich Text NTV   | Pin Map |
| 15/16         | 13/15                   | 11/12                | 23/23         | 13/14                | 7.3/10          | 10/11   |
| Network Graph | Mind Map                | Organizational Chart | Flow Diagram  | Fishbone Diagram     |                 |         |
| 8/10          | 12/14                   | 10/12                | 10/11         | 10/12                |                 |         |

_Note: Numbers represent successful chart generations out of total test cases._

## 🤖 Chart Recommendation Dataset

Our [chart recommendation dataset](https://github.com/antvis/GPT-Vis/blob/main/evaluations/datastes/recommend/README.en.md) is designed to evaluate and fine-tune LLMs on chart type selection tasks. It covers:

- **16 chart types** with real-world scenarios
- **1-3 scenarios** per chart type
- **15+ examples** per scenario
- Continuously updated with community contributions

## 💡 Use Cases

GPT-Vis is perfect for:

- **AI Chatbots**: Add rich visualizations to ChatGPT, Claude, or custom LLM interfaces
- **Data Analysis Tools**: Enable LLMs to create charts directly from data analysis
- **Report Generation**: Automatically generate visual reports from AI-processed data
- **Dashboard Creation**: Let AI agents build interactive dashboards on-the-fly
- **Educational Platforms**: Help AI tutors explain concepts with dynamic visualizations

## 💻 Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build library
pnpm build

# Run tests
pnpm test
```

## 🤝 Contributing

We welcome contributions! Whether it's:

- 🐛 Bug reports and fixes
- ✨ New chart types or features
- 📊 Additional chart examples for the knowledge base
- 📝 Documentation improvements
- 🌐 Translations

Please read our contributing guidelines and submit a pull request.

## 📄 License

[MIT](./LICENSE) © [AntV](https://antv.antgroup.com/)

---

<div align="center">

**Built with ❤️ by the AntV Team**

[AntV](https://antv.antgroup.com/) | [GitHub](https://github.com/antvis) | [Twitter](https://twitter.com/AntV_Alipay)

</div>
