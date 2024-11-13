import { Bubble, type BubbleProps } from '@ant-design/x';
import { ChartType, DualAxes, GPTVis, withChartCode } from '@antv/gpt-vis';
import React from 'react';

const markdownContent = `
当然了，以下是为你绘制的一个多轴图

\`\`\`vis-chart
{
    "type": "dual-axes",
    "xField": "Month",
    "children": [
        {
            "type": "column",
            "yField": "Evaporation",
            "data": [
                {
                    "Month": "Jan",
                    "Evaporation": 2
                },
                {
                    "Month": "Feb",
                    "Evaporation": 4.9
                },
                {
                    "Month": "Mar",
                    "Evaporation": 7
                },
                {
                    "Month": "Apr",
                    "Evaporation": 23.2
                },
                {
                    "Month": "May",
                    "Evaporation": 25.6
                },
                {
                    "Month": "Jun",
                    "Evaporation": 76.7
                },
                {
                    "Month": "Jul",
                    "Evaporation": 135.6
                },
                {
                    "Month": "Aug",
                    "Evaporation": 162.2
                },
                {
                    "Month": "Sep",
                    "Evaporation": 32.6
                },
                {
                    "Month": "Oct",
                    "Evaporation": 20
                },
                {
                    "Month": "Nov",
                    "Evaporation": 6.4
                },
                {
                    "Month": "Dec",
                    "Evaporation": 3.3
                }
            ]
        },
        {
            "type": "line",
            "yField": "Precipitation",
            "data": [
                {
                    "Month": "Jan",
                    "Precipitation": 2.6
                },
                {
                    "Month": "Feb",
                    "Precipitation": 5.9
                },
                {
                    "Month": "Mar",
                    "Precipitation": 9
                },
                {
                    "Month": "Apr",
                    "Precipitation": 26.4
                },
                {
                    "Month": "May",
                    "Precipitation": 28.7
                },
                {
                    "Month": "Jun",
                    "Precipitation": 70.7
                },
                {
                    "Month": "Jul",
                    "Precipitation": 175.6
                },
                {
                    "Month": "Aug",
                    "Precipitation": 182.2
                },
                {
                    "Month": "Sep",
                    "Precipitation": 48.7
                },
                {
                    "Month": "Oct",
                    "Precipitation": 18.8
                },
                {
                    "Month": "Nov",
                    "Precipitation": 6
                },
                {
                    "Month": "Dec",
                    "Precipitation": 2.3
                }
            ]
        },
        {
            "type": "line",
            "yField": "Temperature",
            "data": [
                {
                    "Month": "Jan",
                    "Temperature": 2
                },
                {
                    "Month": "Feb",
                    "Temperature": 2.2
                },
                {
                    "Month": "Mar",
                    "Temperature": 3.3
                },
                {
                    "Month": "Apr",
                    "Temperature": 4.5
                },
                {
                    "Month": "May",
                    "Temperature": 6.3
                },
                {
                    "Month": "Jun",
                    "Temperature": 10.2
                },
                {
                    "Month": "Jul",
                    "Temperature": 20.3
                },
                {
                    "Month": "Aug",
                    "Temperature": 23.4
                },
                {
                    "Month": "Sep",
                    "Temperature": 23
                },
                {
                    "Month": "Oct",
                    "Temperature": 16.5
                },
                {
                    "Month": "Nov",
                    "Temperature": 12
                },
                {
                    "Month": "Dec",
                    "Temperature": 6.2
                }
            ]
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
