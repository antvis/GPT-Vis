---
title: 扩展 MD 渲染器使用
nav: { title: '指南', order: 0 }
toc: content
order: 2
---

## 扩展 react-markdown 使用

```tsx | pure
import React from 'react';
import Markdown from 'react-markdown';
import { withChartCode, withDefaultChartCode, ChartType, Line } from '@antv/gpt-vis';

const markdownContent = `
# GPT-VIS \n\nComponents for GPTs, generative AI, and LLM projects. Not only UI Components.

Here’s a visualization of Haidilao's food delivery revenue from 2013 to 2022. You can see a steady increase over the years, with notable *growth* particularly in recent years.

\`\`\`vis-chart
{ "type": "line","data": [{"time":2013,"value":59.3},{"time":2014,"value":64.4},{"time":2015,"value":68.9},{"time":2016,"value":74.4},{"time":2017,"value":82.7},{"time":2018,"value":91.9},{"time":2019,"value":99.1},{"time":2020,"value":101.6},{"time":2021,"value":114.4},{"time":2022,"value":121}] }
\`\`\`
`;

const CodeBlock = withChartCode({
  components: { [ChartType.Line]: Line },
});
// 或
// const CodeBlock = withDefaultChartCode();

export default () => {
  return <Markdown components={{ code: CodeBlock }}>{markdownContent}</Markdown>;
};
```
