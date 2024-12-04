<img src="https://gw.alipayobjects.com/zos/antfincdn/R8sN%24GNdh6/language.svg" width="18"> [English](./README.md) | 简体中文 | [日本語](./README.ja-JP.md)

<div align="center">
  <img src="https://github.com/eosphoros-ai/GPT-Vis/assets/17919400/c8804ffb-d3d6-45d3-846f-cf217681ab05" height=70">
</div>

<h1 align="center">GPT-Vis</h1>

<div align="center">

Components for GPTs, generative AI, and LLM projects. **Not only UI Components**.

<p align="center">
  <a href="https://gpt-vis.antv.vision" target="_blank">文档</a> •
  <a href="/knowledges" target="_blank">知识库</a> •
  <a href="https://tbox.alipay.com/experience/202410APr1n200110168?id=20241122F8eB00104644" target="_blank">体验 Agent</a>
</p>
</div>

<div align="center">
  <video src="https://github.com/user-attachments/assets/b8eb4a89-b0ed-4a39-8fab-316161949446" />
</div>

## 特性

- 🤖 **LLM 协议**：面向 LLM Agent 卡片的可视化协议，针对 LLM 对话式交互，以及服务序列化输出而设计，方便快速集成到 AI 应用中。
- 🍡 **LLM 组件**：面向 LLM 应用研发组件, 内置有 20+ 常用 VIS 组件，对于定制 UI 需求，提供方便的扩展机制和架构设计。
- 📈 **LLM 接入**：面向 LLM 无缝接入的图表知识库和图表推荐模型，针对 LLM 直接输出可视化卡片，为 Agent 提供知识库以及推荐模型方案。

## 📦 安装

```bash
$ npm i @antv/gpt-vis --save
```

## 🔨 使用

```jsx
import { GPTVis } from '@antv/gpt-vis';

const markdownContent = `
# GPT-VIS \n\nComponents for GPTs, generative AI, and LLM projects. Not only UI Components.

Here’s a visualization of Haidilao's food delivery revenue from 2013 to 2022. You can see a steady increase over the years, with notable *growth* particularly in recent years.

\`\`\`vis-chart
{
  "type": "line",
  "data": [
    { "time":2013,"value":59.3 },
    { "time":2014,"value":64.4 },
    { "time":2015,"value":68.9 },
    { "time":2016,"value":74.4 },
    { "time":2017,"value":82.7 },
    { "time":2018,"value":91.9 },
    { "time":2019,"value":99.1 },
    { "time":2020,"value":101.6 },
    { "time":2021,"value":114.4 },
    { "time":2022,"value":121 }
  ]
}
\`\`\`
`;

export default () => {
  return <GPTVis>{markdownContent}</GPTVis>;
};
```

<details>
<summary>🛠 定制渲染 UI</summary>

```jsx
import { GPTVisLite, withChartCode, ChartType, Pie } from '@antv/gpt-vis';

const markdownContent = `
\`\`\`my-ui
my data
\`\`\`

\`\`\`vis-chart
{
  "type": "pie",
  "data": [
    { "category": "分类一", "value": 27 },
    { "category": "分类二", "value": 25 },
    { "category": "分类三", "value": 18 },
    { "category": "其他", "value": 5 }
  ]
}
\`\`\`
`;

const customRenderers = { 'my-ui': ({ children }) => <div>{children}</div> };
const components = {
  code: withChartCode({
    languageRenderers: customRenderers, // register custom block renderer
    components: { [ChartType.Pie]: Pie }, // register a pie chart
  }),
};

export default () => {
  return <GPTVisLite components={components}>{markdownContent}</GPTVisLite>;
};
```

</details>

## 🐍 Streamlit

```python
import streamlit as st
from streamlit_gpt_vis import set_gpt_vis

content = '''
Here’s a visualization of Haidilao's food delivery revenue from 2013 to 2022. You can see a steady increase over the years, with notable *growth* particularly in recent years.

\`\`\`vis-chart
{"type": "line","data": [{"time":2013,"value":59.3},{"time":2014,"value":64.4},{"time":2015,"value":68.9},{"time":2016,"value":74.4},{"time":2017,"value":82.7},{"time":2018,"value":91.9},{"time":2019,"value":99.1},{"time":2020,"value":101.6},{"time":2021,"value":114.4},{"time":2022,"value":121}]}
\`\`\`
'''

set_gpt_vis(content)
```

更多了解 👉 [streamlit-gpt-vis](https://github.com/antvis/GPT-Vis/tree/main/bindings/streamlit-gpt-vis)

## 🗂 可视化知识库

[可视化知识库](https://github.com/antvis/GPT-Vis/tree/main/knowledges)的目的是为了提供一个全面、系统的资源，帮助 Agent 理解、选择、创建各种数据可视化图表，以下是 Agent 通过 RAG 方式接入知识，根据[评测数据集](https://github.com/antvis/GPT-Vis/tree/main/evaluations/datastes/chart)生成准确图表协议的指标。

|               |                         |                      |               |                      |                 |         |
| ------------- | ----------------------- | -------------------- | ------------- | -------------------- | --------------- | ------- |
| Line(Multi)   | Column(Grouped/Stacked) | Pie                  | Area(Stacked) | Bar(Grouped/Stacked) | Scatter(Bubble) | Heatmap |
| 40/40         | 25/27                   | 13/14                | 18/18         | 18/20                | 10/10           | 9/10    |
| Histogram     | Tree Map                | Word Cloud           | Radar         | Dual Axis            | Rich Text NTV   | Pin Map |
| 15/16         | 13/15                   | 11/12                | 23/23         | 13/14                | 7.3/10          | 10/11   |
| Network Graph | Mind Map                | Organizational Chart | Flow Diagram  | Fishbone Diagram     |                 |         |
| 8/10          | 12/14                   | 10/12                | 10/11         | 10/12                |                 |         |
|               |                         |                      |               |                      |                 |         |

## 🤖 图表模型推荐数据集

图表推荐数据集用于评测/微调大模型在“给定数据，推荐图表类型”任务上的能力。数据集目前涵盖了 16 种图表类型，每种图表类型下 1-3 个不同数据场景，每个场景下 15+ 个图表数据。数据会持续更新，也欢迎向我们贡献你的使用场景中收集的图表数据。数据集详细信息见 [evaluations/recommend](https://github.com/antvis/GPT-Vis/blob/main/evaluations/datastes/recommend/README.md)

## 💻 本地开发

```bash
# install dependencies
$ pnpm install

# develop library by docs demo
$ pnpm dev

# build library source code
$ pnpm build
```

## License

[MIT](./LICENSE)
