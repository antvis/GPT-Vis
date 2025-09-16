import type { BubbleProps } from '@ant-design/x';
import { Bubble } from '@ant-design/x';
import { ChartType, GPTVisLite, Venn, withChartCode } from '@antv/gpt-vis';
import React from 'react';

const markdownContent = `
以下是为你绘制的各类用户的交集关系韦恩图：

\`\`\`vis-chart
{
  "type": "venn",
  "data": [
  { "sets": ["A"], "value": 3500, "label": "购买手机" },
  { "sets": ["B"], "value": 2800, "label": "购买耳机" },
  { "sets": ["C"], "value": 2200, "label": "购买充电器" },
  { "sets": ["A", "B"], "value": 1500 },
  { "sets": ["A", "C"], "value": 1200 },
  { "sets": ["B", "C"], "value": 800 },
  { "sets": ["A", "B", "C"], "value": 600 }
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
  components: { [ChartType.Venn]: Venn },
  style: { width: 350 },
});
const RenderMarkdown: BubbleProps['messageRender'] = (content) => (
  <GPTVisLite components={{ code: CodeComponent }}>{content}</GPTVisLite>
);

export default function VennDemo() {
  return (
    <div style={bgStyle}>
      <Bubble
        placement="end"
        content="根据用户购买行为数据，并绘制韦恩图展示各类用户的交集关系"
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
}
