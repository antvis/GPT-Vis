import { Bubble, type BubbleProps } from '@ant-design/x';
import { ChartType, Column, GPTVisLite, withChartCode } from '@antv/gpt-vis';
import React from 'react';

const markdownContent = `
当然了，以下是为你绘制的一个柱状图

\`\`\`vis-chart
{
  "type": "column",
  "data": [{"category":2013,"value":59.3},{"category":2014,"value":64.4},{"category":2015,"value":68.9},{"category":2016,"value":74.4},{"category":2017,"value":82.7},{"category":2018,"value":91.9},{"category":2019,"value":99.1},{"category":2020,"value":101.6},{"category":2021,"value":114.4},{"category":2022,"value":121}],
  "axisXTitle": "year",
  "axisYTitle": "GDP"
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
  components: { [ChartType.Column]: Column },
  style: { width: 350 },
});

const RenderMarkdown: BubbleProps['messageRender'] = (content) => (
  <GPTVisLite components={{ code: CodeComponent }}>{content}</GPTVisLite>
);

export default () => (
  <div style={bgStyle}>
    <Bubble
      placement="end"
      content="帮我可视化一下最近几年 GDP 情况"
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
