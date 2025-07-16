import { Bubble, type BubbleProps } from '@ant-design/x';
import { ChartType, GPTVisLite, Histogram, withChartCode } from '@antv/gpt-vis';
import React from 'react';

const markdownContent = `
当然了，以下是为你绘制的一个直方图

\`\`\`vis-chart
{
    "type": "histogram",
    "data": [45, 55, 67, 50, 42, 61, 33, 76, 59, 51, 70, 63, 50, 48, 37, 72, 55, 52, 50, 46, 65, 68, 60, 45, 54, 75, 49, 56, 47, 51, 62, 53, 71, 50, 40, 57, 36, 69, 42, 63, 44, 64, 77, 59, 50, 53, 61, 48, 58, 66, 51, 39, 60, 56, 57, 67, 64, 53, 73, 50, 45, 61, 58, 54, 68, 41, 62, 50, 46, 70, 42, 69, 55, 60, 51, 66, 48, 59, 52, 63, 57, 61, 74, 65, 55, 47, 53, 68, 62, 49, 58, 66, 50, 44, 72, 41],
    "binNumber": 10
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
  components: { [ChartType.Histogram]: Histogram },
  style: { width: 350 },
});

const RenderMarkdown: BubbleProps['messageRender'] = (content) => (
  <GPTVisLite components={{ code: CodeComponent }}>{content}</GPTVisLite>
);

export default () => (
  <div style={bgStyle}>
    <Bubble
      placement="end"
      content="直方图可视化一下我的数据"
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
