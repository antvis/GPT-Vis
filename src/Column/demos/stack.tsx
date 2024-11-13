import { Bubble, type BubbleProps } from '@ant-design/x';
import { ChartType, Column, GPTVis, withChartCode } from '@antv/gpt-vis';
import React from 'react';

const markdownContent = `
以下是为你绘制的一个柱状图

\`\`\`vis-chart
{
  "type": "column",
  "data": [
    { "category": "北京", "value": 825.6, "group": "油车" },
    { "category": "北京", "value": 60.2, "group": "新能源汽车" },
    { "category": "上海", "value": 450, "group": "油车" },
    { "category": "上海", "value": 95, "group": "新能源汽车" },
    { "category": "深圳", "value": 506, "group": "油车" },
    { "category": "深圳", "value": 76.7, "group": "新能源汽车" },
    { "category": "广州", "value": 976.6, "group": "油车" },
    { "category": "广州", "value": 97.2, "group": "新能源汽车" },
    { "category": "杭州", "value": 651.2, "group": "油车" },
    { "category": "杭州", "value": 62, "group": "新能源汽车" }
  ],
  "stack": true,
  "axisXTitle": "城市",
  "axisYTitle": "售量"
}
\`\`\`
`;

const bgStyle = {
  display: 'grid',
  gridGap: '20px 0',
  background: '#f7f7f7',
  padding: 20,
  borderRadius: 8,
};

const CodeComponent = withChartCode({
  components: { [ChartType.Column]: Column },
});

const RenderMarkdown: BubbleProps['messageRender'] = (content) => (
  <GPTVis components={{ code: CodeComponent }}>{content}</GPTVis>
);

export default () => (
  <div style={bgStyle}>
    <Bubble
      placement="end"
      content="主要城市油车与新能源汽车的售卖量对比"
      avatar={{
        src: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*2Q5LRJ3LFPUAAAAAAAAAAAAADmJ7AQ/fmt.webp',
      }}
      styles={{ content: { background: '#ebebeb' } }}
    />
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
