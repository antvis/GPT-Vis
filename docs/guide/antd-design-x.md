---
title: 在 Ant Design X 中使用
nav: { title: '指南', order: 0 }
toc: content
order: 1
---

## 使用 Markdown 协议

1.定义图表 Markdown 代码块

```js
const markdownContent = `
## GPT-VIS
Components for GPTs, generative AI, and LLM projects. Not only UI Components.

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
\`\`\``;
```

2.扩展聊天气泡渲染

```tsx | pure
import { Bubble, type BubbleProps } from '@ant-design/x';
import { GPTVis } from '@antv/gpt-vis';

const RenderMarkdown: BubbleProps['messageRender'] = (content) => <GPTVis>{content}</GPTVis>;

export default () => {
  return (
    <Bubble
      content={markdownContent}
      messageRender={RenderMarkdown}
      avatar={{
        src: 'https://mdn.alipayobjects.com/huamei_je4oko/afts/img/A*6LRBT7rjOkQAAAAAAAAAAAAADsZ-AQ/original',
      }}
      variant="shadow"
      styles={{ content: { background: '#fff' } }}
    />
  );
};
```

```tsx
import { Bubble, type BubbleProps } from '@ant-design/x';
import { GPTVis } from '@antv/gpt-vis';

const bgStyle = {
  display: 'grid',
  gridGap: '20px 0',
  background: '#f7f7f7',
  padding: 20,
  borderRadius: 8,
  overflow: 'auto',
};

const markdownContent = `
## GPT-VIS 
Components for GPTs, generative AI, and LLM projects. Not only UI Components.

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
\`\`\``;

const RenderMarkdown: BubbleProps['messageRender'] = (content) => <GPTVis>{content}</GPTVis>;

export default () => {
  return (
    <div style={bgStyle}>
      <Bubble
        content={markdownContent}
        messageRender={RenderMarkdown}
        avatar={{
          src: 'https://mdn.alipayobjects.com/huamei_je4oko/afts/img/A*6LRBT7rjOkQAAAAAAAAAAAAADsZ-AQ/original',
        }}
        variant="shadow"
        styles={{ content: { background: '#fff' } }}
      />
    </div>
  );
};
```

## 使用结构化的数据

1. 定义你的图表数据

```js
const mockdata = [
  { category: '分类一', value: 27 },
  { category: '分类二', value: 25 },
  { category: '分类三', value: 18 },
  { category: '分类四', value: 15 },
  { category: '分类五', value: 10 },
  { category: '其他', value: 5 },
];
```

2. 渲染聊天气泡

```tsx | pure
import { Pie } from '@antv/gpt-vis';
import { Bubble } from '@ant-design/x';

export default () => {
  return (
    <Bubble
      content={<Pie data={mockdata} containerStyle={{ width: 300, height: 250 }} />}
      styles={{ content: { background: '#fff' } }}
    />
  );
};
```

```tsx
import { Pie } from '@antv/gpt-vis';
import { Bubble } from '@ant-design/x';

const bgStyle = {
  display: 'grid',
  gridGap: '20px 0',
  background: '#f7f7f7',
  padding: 20,
  borderRadius: 8,
};

const mockdata = [
  { category: '分类一', value: 27 },
  { category: '分类二', value: 25 },
  { category: '分类三', value: 18 },
  { category: '分类四', value: 15 },
  { category: '分类五', value: 10 },
  { category: '其他', value: 5 },
];

export default () => {
  return (
    <div style={bgStyle}>
      <Bubble
        content={<Pie data={mockdata} containerStyle={{ width: 550, height: 300 }} />}
        avatar={{
          src: 'https://mdn.alipayobjects.com/huamei_je4oko/afts/img/A*6LRBT7rjOkQAAAAAAAAAAAAADsZ-AQ/original',
        }}
        variant="shadow"
        styles={{ content: { background: '#fff' } }}
      />
    </div>
  );
};
```
