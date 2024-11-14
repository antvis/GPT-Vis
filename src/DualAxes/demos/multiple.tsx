import { Bubble, type BubbleProps } from '@ant-design/x';
import { ChartType, DualAxes, GPTVis, withChartCode } from '@antv/gpt-vis';
import React from 'react';

const markdownContent = `
当然了，以下是为你绘制的一个多轴图

\`\`\`vis-chart
{
	"type": "dual-axes",
	"categories": [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec"
	],
	"series": [
    {
			"type": "column",
			"data": [
				26,
				59,
				90,
				264,
				287,
				707,
				1756,
				1822,
				487,
				188,
				60,
				23
			],
      "axisYTitle": "总体增长量"
		},
    {
			"type": "line",
			"data": [
				2.6,
				5.9,
				9,
				26.4,
				28.7,
				70.7,
				175.6,
				182.2,
				48.7,
				18.8,
				6,
				2.3
			],
      "axisYTitle": "A增长率"
		},
		{
			"type": "line",
			"data": [
				2,
				2.2,
				3.3,
				4.5,
				6.3,
				10.2,
				20.3,
				23.4,
				23,
				16.5,
				12,
				6.2
			],
      "axisYTitle": "B增长率"
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
