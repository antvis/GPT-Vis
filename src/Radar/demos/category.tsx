import { Bubble, type BubbleProps } from '@ant-design/x';
import { ChartType, GPTVisLite, Radar, withChartCode } from '@antv/gpt-vis';
import React from 'react';

const markdownContent = `
当然了，以下是为你绘制的一个雷达图

\`\`\`vis-chart
{
  "type": "radar",
  "data": [
    { "group": "Apple", "name": "Vitamin C", "value": 5 },
    { "group": "Apple", "name": "Fiber", "value": 7 },
    { "group": "Apple", "name": "Sugar", "value": 6 },
    { "group": "Apple", "name": "Protein", "value": 2 },
    { "group": "Apple", "name": "Iron", "value": 3 },
    { "group": "Apple", "name": "Calcium", "value": 2 },
    { "group": "Banana", "name": "Vitamin C", "value": 4 },
    { "group": "Banana", "name": "Fiber", "value": 5 },
    { "group": "Banana", "name": "Sugar", "value": 7 },
    { "group": "Banana", "name": "Protein", "value": 3 },
    { "group": "Banana", "name": "Iron", "value": 2 },
    { "group": "Banana", "name": "Calcium", "value": 3 }
  ]
}
\`\`\`
`;

const bgStyle = {
  display: 'grid',
  gridGap: '20px 0',
  background: '#f7f7f7',
  padding: 20,
  borderRadius: 8,
  overflow: 'auto',
};

const CodeComponent = withChartCode({
  components: { [ChartType.Radar]: Radar },
});

const RenderMarkdown: BubbleProps['messageRender'] = (content) => (
  <GPTVisLite components={{ code: CodeComponent }}>{content}</GPTVisLite>
);

export default () => (
  <div style={bgStyle}>
    <Bubble
      placement="end"
      content="帮我可视化一下水果数据"
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
