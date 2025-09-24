import type { BubbleProps } from '@ant-design/x';
import { Bubble } from '@ant-design/x';
import { ChartType, GPTVisLite, VisTable, withChartCode } from '@antv/gpt-vis';
import React from 'react';

const markdownContent = `
当然了，以下是为你绘制的一个面积图

\`\`\`vis-chart
{
  "type": "vis-table",
  "columns": [
    { "title": "指标", "key": "indicator" },
    { "title": "均值", "key": "mean" },
    { "title": "标准差", "key": "std" },
    { "title": "范围", "key": "range" },
    { "title": "Q1-Q3区间", "key": "q1q3" }
  ],
  "data": [
    { "indicator": "经度(°)", "mean": "104.15°", "std": "±0.64°", "range": "103.19-105.28", "q1q3": "103.62-104.68°" },
    { "indicator": "纬度(°)", "mean": "31.60°",  "std": "±0.48°", "range": "30.89-32.45°", "q1q3": "31.21-32.00°" },
    { "indicator": "深度(km)", "mean": "11.82", "std": "±5.67",  "range": "3.0-34.8", "q1q3": "10.0-10.0" },
    { "indicator": "震级(mag)", "mean": "5.29", "std": "±0.49",  "range": "5.0-7.9", "q1q3": "5.0-5.4" }
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
  components: { [ChartType.VisTable]: VisTable },
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
