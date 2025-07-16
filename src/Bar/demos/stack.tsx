import { Bubble, type BubbleProps } from '@ant-design/x';
import { Bar, ChartType, GPTVisLite, withChartCode } from '@antv/gpt-vis';
import React from 'react';

const markdownContent = `
当然了，以下是为你绘制的一个条形图

\`\`\`vis-chart
{
  "type": "bar",
  "data": [
    { "group": "London", "category": "Jan.", "value": 18.9 },
    { "group": "London", "category": "Feb.", "value": 28.8 },
    { "group": "London", "category": "Mar.", "value": 39.3 },
    { "group": "London", "category": "Apr.", "value": 81.4 },
    { "group": "London", "category": "May.", "value": 47 },
    { "group": "London", "category": "Jun.", "value": 20.3 },
    { "group": "London", "category": "Jul.", "value": 24 },
    { "group": "London", "category": "Aug.", "value": 35.6 },
    { "group": "Berlin", "category": "Jan.", "value": 12.4 },
    { "group": "Berlin", "category": "Feb.", "value": 23.2 },
    { "group": "Berlin", "category": "Mar.", "value": 34.5 },
    { "group": "Berlin", "category": "Apr.", "value": 99.7 },
    { "group": "Berlin", "category": "May.", "value": 52.6 },
    { "group": "Berlin", "category": "Jun.", "value": 35.5 },
    { "group": "Berlin", "category": "Jul.", "value": 37.4 },
    { "group": "Berlin", "category": "Aug.", "value": 42.4 }
  ],
  "stack": true,
  "axisXTitle": "month",
  "axisYTitle": "value"
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
  components: { [ChartType.Bar]: Bar },
});
const RenderMarkdown: BubbleProps['messageRender'] = (content) => (
  <GPTVisLite components={{ code: CodeComponent }}>{content}</GPTVisLite>
);

export default () => (
  <div style={bgStyle}>
    <Bubble
      placement="end"
      content="帮我可视化一下我的数据"
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
