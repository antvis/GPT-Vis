---
title: 快速上手
nav: { title: '指南', order: 0 }
toc: content
order: 0
---

## ⏬ 安装

```shell
$ npm install @antv/gpt-vis --save
```

## 🌰 使用

```tsx | pure
import React from 'react';
import { GPTVis } from '@antv/gpt-vis';

const markdownContent = `
# GPT-VIS \n\nComponents for GPTs, generative AI, and LLM projects. Not only UI Components.

Here’s a visualization of Haidilao's food delivery revenue from 2013 to 2022. You can see a steady increase over the years, with notable *growth* particularly in recent years.

\`\`\`vis-chart
{ "type": "line","data": [{"time":2013,"value":59.3},{"time":2014,"value":64.4},{"time":2015,"value":68.9},{"time":2016,"value":74.4},{"time":2017,"value":82.7},{"time":2018,"value":91.9},{"time":2019,"value":99.1},{"time":2020,"value":101.6},{"time":2021,"value":114.4},{"time":2022,"value":121}] }
\`\`\`
`;

export default () => {
  return <GPTVis>{markdownContent}</GPTVis>;
};
```

## 🛠 定制渲染器

业务定制 UI 场景，提供方便的扩展机制，支持标签和代码块扩展。

```tsx | pure
import { GPTVis, withDefaultChartCode, VisText } from '@antv/gpt-vis';

const markdownContent = `
\`\`\`my-ui
my data
\`\`\`

<vis-text type="time_desc">本月</vis-text>共产生<vis-text type="metric_name">决策数量</vis-text><vis-text type="metric_value">2,783</vis-text>个，环比<vis-text type="trend_desc">增长</vis-text><vis-text type="ratio_value_pos">15.2%</vis-text>。<vis-text type="dim_name">高优先级决策</vis-text>占比<vis-text type="proportion">56.2%</vis-text>，呈现稳定<vis-text type="trend_desc" origin="[1, 2, 6, 18, 24, 48]">上升</vis-text>趋势，预计<vis-text type="time_desc">下月</vis-text>将突破<vis-text type="metric_value">3,000</vis-text>大关。
`;

const customRenderers = {
  'my-ui': ({ children }) => <div>{children}</div>,
};
const components = {
  'vis-text': VisText,
  code: withDefaultChartCode({ languageRenderers: customRenderers }),
};

export default () => {
  return <GPTVis components={components}>{markdownContent}</GPTVis>;
};
```
