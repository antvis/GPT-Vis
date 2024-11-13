import { Bubble, type BubbleProps } from '@ant-design/x';
import { ChartType, GPTVis, Scatter, withChartCode } from '@antv/gpt-vis';
import React from 'react';

const markdownContent = `
当然了，以下是为你绘制的一个散点图

\`\`\`vis-chart
{
    "type": "scatter",
    "data": [
      { "x": 22, "y": 3000 },
      { "x": 23, "y": 3200 },
      { "x": 24, "y": 3100 },
      { "x": 25, "y": 3500 },
      { "x": 26, "y": 3300 },
      { "x": 27, "y": 3600 },
      { "x": 28, "y": 4000 },
      { "x": 29, "y": 3900 },
      { "x": 30, "y": 4200 },
      { "x": 31, "y": 4100 },
      { "x": 32, "y": 4500 },
      { "x": 33, "y": 4700 },
      { "x": 34, "y": 4600 },
      { "x": 35, "y": 4800 },
      { "x": 36, "y": 5000 },
      { "x": 37, "y": 5200 },
      { "x": 38, "y": 5100 },
      { "x": 39, "y": 5500 },
      { "x": 40, "y": 5300 },
      { "x": 41, "y": 5700 },
      { "x": 42, "y": 5600 },
      { "x": 43, "y": 5900 },
      { "x": 44, "y": 5800 },
      { "x": 45, "y": 6000 },
      { "x": 46, "y": 6100 },
      { "x": 47, "y": 6500 },
      { "x": 48, "y": 6300 },
      { "x": 49, "y": 6700 },
      { "x": 50, "y": 6400 },
      { "x": 51, "y": 6800 },
      { "x": 52, "y": 6900 },
      { "x": 53, "y": 7100 },
      { "x": 54, "y": 7000 },
      { "x": 55, "y": 7300 },
      { "x": 56, "y": 7200 },
      { "x": 57, "y": 7500 },
      { "x": 58, "y": 7400 },
      { "x": 59, "y": 7600 },
      { "x": 60, "y": 7700 },
      { "x": 61, "y": 7900 },
      { "x": 62, "y": 7800 },
      { "x": 63, "y": 8000 },
      { "x": 64, "y": 8100 },
      { "x": 65, "y": 8200 },
      { "x": 66, "y": 8300 },
      { "x": 67, "y": 8500 },
      { "x": 68, "y": 8400 },
      { "x": 69, "y": 8600 },
      { "x": 70, "y": 8700 }
    ],
  "axisXTitle": "age",
  "axisYTitle": "income"
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
  components: { [ChartType.Scatter]: Scatter },
  style: { width: 350 },
});

const RenderMarkdown: BubbleProps['messageRender'] = (content) => (
  <GPTVis components={{ code: CodeComponent }}>{content}</GPTVis>
);

export default () => (
  <div style={bgStyle}>
    <Bubble
      placement="end"
      content="可视化年龄与收入的关系"
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
