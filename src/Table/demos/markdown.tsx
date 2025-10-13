import type { BubbleProps } from '@ant-design/x';
import { Bubble } from '@ant-design/x';
import { ChartType, GPTVisLite, Table, withChartCode } from '@antv/gpt-vis';
import React from 'react';

const markdownContent = `
当然了，以下是为你绘制的一个面积图

\`\`\`vis-chart
{
  "type": "table",
  "data": [
    { "Indicator": "经度(°)", "Mean": "104.15°", "Std": "±0.64°", "Range": "103.19-105.28", "Q1Q3": "103.62-104.68°" },
    { "Indicator": "纬度(°)", "Mean": "31.60°",  "Std": "±0.48°", "Range": "30.89-32.45°", "Q1Q3": "31.21-32.00°" },
    { "Indicator": "深度(km)", "Mean": "11.82", "Std": "±5.67",  "Range": "3.0-34.8", "Q1Q3": "10.0-10.0" },
    { "Indicator": "震级(mag)", "Mean": "5.29", "Std": "±0.49",  "Range": "5.0-7.9", "Q1Q3": "5.0-5.4" }
  ]
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
  components: { [ChartType.Table]: Table },
  style: { width: 350 },
});
const RenderMarkdown: BubbleProps['messageRender'] = (content) => (
  <GPTVisLite components={{ code: CodeComponent }}>{content}</GPTVisLite>
);

export default () => (
  <div style={bgStyle}>
    <Bubble
      placement="end"
      content="地震指标信息表格展示"
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
