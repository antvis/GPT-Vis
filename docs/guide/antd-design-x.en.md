---
title: Using in Ant Design X
nav: { title: 'Guide', order: 0 }
toc: content
order: 1
---

## Using the Markdown Protocol

1.Define chart Markdown code block

```js
const markdownContent = `
## GPT-VIS
Components for GPTs, generative AI, and LLM projects. Not only UI Components.

 \`\`\`vis-chart
  {
    "type": "pie",
    "data": [
      { "category": "Category One", "value": 27 },
      { "category": "Category Two", "value": 25 },
      { "category": "Category Three", "value": 18 },
      { "category": "Category Four", "value": 15 },
      { "category": "Category Five", "value": 10 },
      { "category": "Others", "value": 5 }
    ]
  }
\`\`\``;
```

2.Extend chat bubble rendering

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
      { "category": "Category One", "value": 27 },
      { "category": "Category Two", "value": 25 },
      { "category": "Category Three", "value": 18 },
      { "category": "Category Four", "value": 15 },
      { "category": "Category Five", "value": 10 },
      { "category": "Others", "value": 5 }
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

## Using Structured Data

1. Define your chart data

```js
const mockdata = [
  { category: 'Category One', value: 27 },
  { category: 'Category Two', value: 25 },
  { category: 'Category Three', value: 18 },
  { category: 'Category Four', value: 15 },
  { category: 'Category Five', value: 10 },
  { category: 'Others', value: 5 },
];
```

2. Render chat bubble

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
  { category: 'Category One', value: 27 },
  { category: 'Category Two', value: 25 },
  { category: 'Category Three', value: 18 },
  { category: 'Category Four', value: 15 },
  { category: 'Category Five', value: 10 },
  { category: 'Others', value: 5 },
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
