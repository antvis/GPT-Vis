import { Bubble, type BubbleProps } from '@ant-design/x';
import { Bar, ChartType, GPTVisLite, withChartCode } from '@antv/gpt-vis';
import React from 'react';

const markdownContent = `
当然了，以下是为你绘制的一个条形图

\`\`\`vis-chart
{
  "type": "bar",
  "data": [
        { "category": "1951 年", "value": 38 },
        { "category": "1952 年", "value": 52 },
        { "category": "1956 年", "value": 61 },
        { "category": "1957 年", "value": 145 },
        { "category": "1958 年", "value": 48 },
        { "category": "1959 年", "value": 38 },
        { "category": "1960 年", "value": 38 },
        { "category": "1962 年", "value": 38 }
  ],
  "axisXTitle": "year",
  "axisYTitle": "sales"
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
      content="帮我可视化一下最近几年销售情况"
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
