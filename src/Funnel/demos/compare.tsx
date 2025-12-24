import { Bubble, type BubbleProps } from '@ant-design/x';
import { ChartType, Funnel, GPTVisLite, withChartCode } from '@antv/gpt-vis';
import React from 'react';

const markdownContent = `
当然了，以下是为你绘制的一个对比漏斗图，用于对比站点1与站点2在各阶段的转化：

\`\`\`vis-chart
{
  "type": "funnel",
  "title": "站点对比漏斗图",
  "data": [
    { "category": "访问", "value": 500, "group": "站点1" },
    { "category": "浏览", "value": 400, "group": "站点1" },
    { "category": "交互", "value": 300, "group": "站点1" },
    { "category": "下单", "value": 200, "group": "站点1" },
    { "category": "完成", "value": 100, "group": "站点1" },

    { "category": "访问", "value": 550, "group": "站点2" },
    { "category": "浏览", "value": 420, "group": "站点2" },
    { "category": "交互", "value": 280, "group": "站点2" },
    { "category": "下单", "value": 150, "group": "站点2" },
    { "category": "完成", "value": 80,  "group": "站点2" }
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
  overflow: 'auto',
};

const CodeComponent = withChartCode({
  components: { [ChartType.Funnel]: Funnel },
});

const RenderMarkdown: BubbleProps['messageRender'] = (content) => (
  <GPTVisLite components={{ code: CodeComponent }}>{content}</GPTVisLite>
);

export default () => (
  <div style={bgStyle}>
    <Bubble
      placement="end"
      content="请绘制对比漏斗图，对比两个站点的转化"
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
      styles={{ content: { background: '#fff', width: '720px' } }}
    />
  </div>
);
