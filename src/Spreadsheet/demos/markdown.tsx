import type { BubbleProps } from '@ant-design/x';
import { Bubble } from '@ant-design/x';
import { ChartType, GPTVisLite, Spreadsheet, withChartCode } from '@antv/gpt-vis';
import React from 'react';

const markdownContent = `
当然了，以下是为你绘制的一个销售透视表

\`\`\`vis-chart
{
  "type": "spreadsheet",
  "data": [
    { "省份": "浙江", "城市": "杭州", "类型": "笔", "价格": 1 },
    { "省份": "浙江", "城市": "杭州", "类型": "纸张", "价格": 2 },
    { "省份": "浙江", "城市": "舟山", "类型": "笔", "价格": 17 },
    { "省份": "浙江", "城市": "舟山", "类型": "纸张", "价格": 6 }
  ],
  "rows": ["省份", "城市"],
  "columns": ["类型"],
  "values": ["价格"]
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
  components: { [ChartType.Spreadsheet]: Spreadsheet },
});
const RenderMarkdown: BubbleProps['messageRender'] = (content) => (
  <GPTVisLite components={{ code: CodeComponent }}>{content}</GPTVisLite>
);

export default () => (
  <div style={bgStyle}>
    <Bubble
      placement="end"
      content="帮我绘制一个销售透视表"
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
