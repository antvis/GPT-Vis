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

## 🌰 示例

### 📦 组件中使用

```tsx | pure
import React from 'react';
import { Pie } from '@antv/gpt-vis';

const data = [
  { category: '分类一', value: 27 },
  { category: '分类二', value: 25 },
  { category: '分类三', value: 18 },
  { category: '分类四', value: 15 },
  { category: '分类五', value: 10 },
  { category: '其他', value: 5 },
];

export default () => {
  return <Pie data={data} />;
};
```

### 📝 Markdown 中使用

#### 方式一：使用 GPTVis 组件

```tsx | pure
import React from 'react';
import { GPTVis } from '@antv/gpt-vis';

const markdownContent = `
# GPT-VIS \n\nComponents for GPTs, generative AI, and LLM projects. Not only UI Components.

\`\`\`vis-chart
{
  "type": "pie",
  "data": [
    { "category": "分类一", "value": 27 },
    { "category": "分类二", "value": 25 },
    { "category": "分类三", "value": 18 },
    { "category": "分类四", "value": 15 },
    { "category": "分类五", "value": 10 },
    { "category": "其他", "value": 5 }
  ]
}
\`\`\`
`;

export default () => {
  return <GPTVis>{markdownContent}</GPTVis>;
};
```

#### 方式二：扩展 react-markdown 使用

```tsx | pure
import React from 'react';
import Markdown from 'react-markdown';
import { withDefaultChartCode } from '@antv/gpt-vis';

const markdownContent = `
# GPT-VIS \n\nComponents for GPTs, generative AI, and LLM projects. Not only UI Components.

\`\`\`vis-chart
{
  "type": "pie",
  "data": [
    { "name": "分类一", "value": 27 },
    { "name": "分类二", "value": 25 },
    { "name": "分类三", "value": 18 },
    { "name": "分类四", "value": 15 },
    { "name": "分类五", "value": 10 },
    { "name": "其他", "value": 5 }
  ]
}
\`\`\`
`;

const CodeBlock = withDefaultChartCode();

export default () => {
  return <Markdown components={{ code: CodeBlock }}>{markdownContent}</Markdown>;
};
```
