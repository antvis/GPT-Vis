import { Bubble, type BubbleProps } from '@ant-design/x';
import { ChartType, GPTVis, Line, withChartCode } from '@antv/gpt-vis';
import React from 'react';

const markdownContent = `
以下是为你绘制的一个折线图

\`\`\`vis-chart
{
  "type": "line",
  "data": [
    {
      "time": "1974",
      "value": 107,
      "group": "Gas flaring"
    },
    {
      "time": "1974",
      "value": 208,
      "group": "Renewables"
    },
    {
      "time": "1974",
      "value": 356,
      "group": "Fossil fuels"
    },
    {
      "time": "1975",
      "value": 173,
      "group": "Gas flaring"
    },
    {
      "time": "1975",
      "value": 415,
      "group": "Renewables"
    },
    {
      "time": "1975",
      "value": 364,
      "group": "Fossil fuels"
    },
    {
      "time": "1976",
      "value": 117,
      "group": "Gas flaring"
    },
    {
      "time": "1976",
      "value": 220,
      "group": "Renewables"
    },
    {
      "time": "1976",
      "value": 373,
      "group": "Fossil fuels"
    },
    {
      "time": "1977",
      "value": 122,
      "group": "Gas flaring"
    },
    {
      "time": "1977",
      "value": 225,
      "group": "Renewables"
    },
    {
      "time": "1977",
      "value": 382,
      "group": "Fossil fuels"
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
  components: { [ChartType.Line]: Line },
  style: { width: 350 },
});

const RenderMarkdown: BubbleProps['messageRender'] = (content) => (
  <GPTVis components={{ code: CodeComponent }}>{content}</GPTVis>
);

export default () => (
  <div style={bgStyle}>
    <Bubble
      placement="end"
      content="折线图可视化一下我的数据"
      avatar={{
        src: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*2Q5LRJ3LFPUAAAAAAAAAAAAADmJ7AQ/fmt.webp',
      }}
      styles={{ content: { background: '#ebebeb', maxWidth: '60%' } }}
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