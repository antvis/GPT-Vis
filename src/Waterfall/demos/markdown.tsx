import type { BubbleProps } from '@ant-design/x';
import { Bubble } from '@ant-design/x';
import { ChartType, GPTVisLite, Waterfall, withChartCode } from '@antv/gpt-vis';
import React from 'react';

const markdownContent = `
当然了，以下是为你绘制的一个瀑布图，以下为第一个季度、第二季度、第三季度、第四季度的收益分别为6.2 百万、-2.6百万、4.1 百万、3.7百万，总计11.4 百万。

\`\`\`vis-chart
{
  "type": "waterfall",
  "data": [
    { "category": "第一季度", "value": 6200000 },
    { "category": "第二季度", "value": -2600000 },
    { "category": "第三季度", "value": 4100000 },
    { "category": "第四季度", "value": 3700000 },
    { "category": "总计", "value": 11400000, "isTotal": true }
  ],
  "title": "季度收益瀑布图",
  "axisXTitle": "季度",
  "axisYTitle": "金额",
  "style": {
    "palette": {
      "positiveColor": "#52c41a",
      "negativeColor": "#ff4d4f",
      "totalColor": "#666"
    }
  }
}
\`\`\`
`;

const bgStyle = {
  display: 'grid',
  gridGap: '20px 0',
  padding: 20,
  background: '#f7f7f7',
  borderRadius: 8,
  overflow: 'auto',
};

const CodeComponent = withChartCode({
  components: { [ChartType.Waterfall]: Waterfall },
  style: { width: '100%' },
});
const RenderMarkdown: BubbleProps['messageRender'] = (content) => (
  <GPTVisLite components={{ code: CodeComponent }}>{content}</GPTVisLite>
);

export default () => (
  <div style={bgStyle}>
    <Bubble
      placement="end"
      content="帮我绘制瀑布图显示季度收益情况"
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
