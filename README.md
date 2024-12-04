<img src="https://gw.alipayobjects.com/zos/antfincdn/R8sN%24GNdh6/language.svg" width="18"> English | [简体中文](./README.zh-CN.md) | [日本語](./README.ja-JP.md)

<div align="center">
  <img src="https://github.com/eosphoros-ai/GPT-Vis/assets/17919400/c8804ffb-d3d6-45d3-846f-cf217681ab05" height=70">
</div>

<h1 align="center">GPT-Vis</h1>

<div align="center">

Components for GPTs, generative AI, and LLM projects. **Not only UI Components**.

<p align="center">
  <a href="https://gpt-vis.antv.vision" target="_blank">Document</a> •
  <a href="/knowledges" target="_blank">Knowledge</a> •
  <a href="https://tbox.alipay.com/experience/202410APr1n200110168?id=20241122F8eB00104644" target="_blank">Agent Demo</a>
</p>
</div>

<div align="center">
  <video src="https://github.com/user-attachments/assets/b8eb4a89-b0ed-4a39-8fab-316161949446" />
  <!-- <a href="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*ut_RSJxdBMoAAAAAAAAAAAAADmJ7AQ/original" target="_blank"><img src="https://github.com/user-attachments/assets/d6e90e58-9bf7-4c40-a2db-96cbd68ed818" width="800"></a> -->
</div>

## ✨ Features

- 🤖 **LLM Protocol**: A visual protocol for LLM Agent cards, designed for LLM conversational interaction and service serialized output, to facilitate rapid integration into AI applications.
- 🍡 **LLM Component**: Developed components for LLM applications, with 20+ commonly used VIS components built-in, providing convenient expansion mechanism and architecture design for customized UI requirements.
- 📈 **LLM access**: Chart knowledge base and chart recommendation model for seamless access to LLM, directly output visual cards for LLM, and provide knowledge base and recommended model solutions for Agent.

## 📦 Installation

```bash
$ npm i @antv/gpt-vis --save
```

## 🔨 Usage

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
<summary>🛠 Custom renderer UI</summary>

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
    { "category": "category 1", "value": 27 },
    { "category": "category 2", "value": 25 },
    { "category": "category 3", "value": 18 },
    { "category": "other", "value": 5 }
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

Learn more 👉 [streamlit-gpt-vis](https://github.com/antvis/GPT-Vis/tree/main/bindings/streamlit-gpt-vis)

## Visual Knowledge

The purpose of the [Visual Knowledge Base](https://github.com/antvis/GPT-Vis/tree/main/knowledges) is to provide a comprehensive and systematic resource to help Agents understand, select, create various data visualization charts. Below are the metrics for generating accurate chart protocols based on the [evaluation dataset](https://github.com/antvis/GPT-Vis/tree/main/evaluations/datastes/chart) through the RAG.

|               |                         |                      |               |                      |                 |         |
| ------------- | ----------------------- | -------------------- | ------------- | -------------------- | --------------- | ------- |
| Line(Multi)   | Column(Grouped/Stacked) | Pie                  | Area(Stacked) | Bar(Grouped/Stacked) | Scatter(Bubble) | Heatmap |
| 40/40         | 25/27                   | 13/14                | 18/18         | 18/20                | 10/10           | 9/10    |
| Histogram     | Tree Map                | Word Cloud           | Radar         | Dual Axis            | Rich Text NTV   | Pin Map |
| 15/16         | 13/15                   | 11/12                | 23/23         | 13/14                | 7.3/10          | 10/11   |
| Network Graph | Mind Map                | Organizational Chart | Flow Diagram  | Fishbone Diagram     |                 |         |
| 8/10          | 12/14                   | 10/12                | 10/11         | 10/12                |                 |         |
|               |                         |                      |               |                      |                 |         |

Note: The numbers in the format of X/Y represent the metrics of the respective chart types when evaluated against the dataset.

## 🤖 Chart Recommendation Dataset

The chart recommendation dataset is designed to evaluate or fine-tune large language models on their ability to recommend chart types based on given data. The dataset currently encompasses 16 types of charts, with 1-3 different data scenarios per chart type, and more than 15 chart data instances for each scenario. The dataset is continuously updated, and we welcome contributions of chart data collected from your own use cases. For more detailed information about the dataset, please visit [evaluations/recommend](https://github.com/antvis/GPT-Vis/blob/main/evaluations/datastes/recommend/README.en.md).

## 💻 Development

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
