<img src="https://gw.alipayobjects.com/zos/antfincdn/R8sN%24GNdh6/language.svg" width="18"> [English](./README.md) | 简体中文

<h1 align="center">GPT-Vis</h1>

<div align="center">

Components for GPTs, generative AI, and LLM projects. **Not only UI Components**.

<p align="center">
  <a href="https://gpt-vis.antv.vision" target="_blank">文档</a> •
  <a href="/knowledges" target="_blank">知识库</a> •
  <a href="https://huggingface.co/antvis" target="_blank">Huggingface</a> •
  <a href="https://tbox.alipay.com/share/202410APr1n200110168?platform=WebService" target="_blank">体验 Agent</a>
</p>

<div align="center">
  <img src="https://github.com/eosphoros-ai/GPT-Vis/assets/17919400/c8804ffb-d3d6-45d3-846f-cf217681ab05" width=500">
</div>

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

## 🛠 定制渲染器

```jsx
import { GPTVis, withDefaultChartCode, VisText } from '@antv/gpt-vis';

const markdownContent = `
<vis-text type="time_desc">本月</vis-text>共产生<vis-text type="metric_name">决策数量</vis-text><vis-text type="metric_value">2,783</vis-text>个，环比<vis-text type="trend_desc">增长</vis-text><vis-text type="ratio_value_pos">15.2%</vis-text>。<vis-text type="dim_name">高优先级决策</vis-text>占比<vis-text type="proportion">56.2%</vis-text>，呈现稳定<vis-text type="trend_desc" origin="[1, 2, 6, 18, 24, 48]">上升</vis-text>趋势，预计<vis-text type="time_desc">下月</vis-text>将突破<vis-text type="metric_value">3,000</vis-text>大关。

\`\`\`my-ui
my data
\`\`\`
`;

const customRenderers = { 'my-ui': ({ children }) => <div>{children}</div> };
const components = {
  'vis-text': VisText,
  code: withDefaultChartCode({ languageRenderers: customRenderers }),
};

export default () => {
  return <GPTVis components={components}>{markdownContent}</GPTVis>;
};
```

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

更多了解 👉 [streamlit-gpt-vis](https://github.com/antvis/GPT-Vis/bindings/streamlit-gpt-vis)

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
