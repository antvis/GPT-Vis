---
title: Quick Start
nav: { title: 'Guide', order: 0 }
toc: content
order: 0
---

## ⏬ Installation

```shell
$ npm install @antv/gpt-vis --save
```

## 🌰 Usage

```tsx | pure
import React from 'react';
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

## Custom Renderer

For business-customized UI scenarios, a convenient extension mechanism is provided, supporting label and code block extension。

```tsx | pure
import { GPTVisLite, withChartCode, ChartType, Pie } from '@antv/gpt-vis';

const markdownContent = `
\`\`\`my-ui
my data
\`\`\`

\`\`\`vis-chart
{
  "type": "pie",
  "data": [
    { "category": "Category One", "value": 27 },
    { "category": "Category Two", "value": 25 },
    { "category": "Category Three", "value": 18 },
    { "category": "Others", "value": 5 }
  ]
}
\`\`\`
`;

const customRenderers = {
  'my-ui': ({ children }) => <div>{children}</div>,
};
const components = {
  code: withChartCode({
    // register custom block renderer
    languageRenderers: customRenderers,
    // register a pie chart
    components: { [ChartType.Pie]: Pie },
  }),
};

export default () => {
  return <GPTVisLite components={components}>{markdownContent}</GPTVisLite>;
};
```
