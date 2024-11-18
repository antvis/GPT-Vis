<img src="https://gw.alipayobjects.com/zos/antfincdn/R8sN%24GNdh6/language.svg" width="18"> English | [简体中文](./README.zh-CN.md)

<h1 align="center">GPT-Vis</h1>

<div align="center">

Components for GPTs, generative AI, and LLM projects. **Not only UI Components**.

<p align="center">
  <a href="https://gpt-vis.antv.vision" target="_blank">Document</a> •
  <a href="/knowledges" target="_blank">Knowledge</a> •
  <a href="https://huggingface.co/antvis" target="_blank">Huggingface</a> •
  <a href="https://tbox.alipay.com/share/202410APr1n200110168?platform=WebService" target="_blank">Agent Demo</a>
</p>

<div align="center">
  <img src="https://github.com/eosphoros-ai/GPT-Vis/assets/17919400/c8804ffb-d3d6-45d3-846f-cf217681ab05" width=500">
</div>

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

## 🛠 Custom renderer

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

Learn more 👉 [streamlit-gpt-vis](https://github.com/antvis/GPT-Vis/bindings/streamlit-gpt-vis)

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
