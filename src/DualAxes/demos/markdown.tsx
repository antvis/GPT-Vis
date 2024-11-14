import { Bubble, type BubbleProps } from '@ant-design/x';
import { ChartType, DualAxes, GPTVis, withChartCode } from '@antv/gpt-vis';
import React from 'react';

const markdownContent = `
当然了，以下是为你绘制的一个双轴图

\`\`\`vis-chart
{
  "type": "dual-axes",
  "categories": ["2020", "2021", "2022"],
  "series": [
    {
      "type": "column",
      "data": [500, 600, 700],
      "axisYTitle": "amount"
    },
    {
      "type": "line",
      "data": [10, 12, 15],
      "axisYTitle": "rate"
    }
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
};

const CodeComponent = withChartCode({
  components: { [ChartType.DualAxes]: DualAxes },
  style: { width: 350 },
});

const RenderMarkdown: BubbleProps['messageRender'] = (content) => (
  <GPTVis components={{ code: CodeComponent }}>{content}</GPTVis>
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
