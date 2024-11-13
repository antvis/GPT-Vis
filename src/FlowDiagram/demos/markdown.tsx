import { Bubble, type BubbleProps } from '@ant-design/x';
import { ChartType, FlowDiagram, GPTVis, withChartCode } from '@antv/gpt-vis';
import React from 'react';

const markdownContent = `
当然了，以下是为你绘制的一个流程图

\`\`\`vis-chart
{
  "type": "flow-diagram",
  "data": {
    "nodes": [
      { "name": "客户下单" },
      { "name": "系统生成订单" },
      { "name": "仓库拣货" },
      { "name": "仓库打包" },
      { "name": "物流配送" },
      { "name": "客户收货" }
    ],
    "edges": [
      { "source": "客户下单", "target": "系统生成订单" },
      { "source": "系统生成订单", "target": "仓库拣货" },
      { "source": "仓库拣货", "target": "仓库打包" },
      { "source": "仓库打包", "target": "物流配送" },
      { "source": "物流配送", "target": "客户收货" }
    ]
  }
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
  components: { [ChartType.FlowDiagram]: FlowDiagram },
  style: { width: 500, height: 250 },
});

const RenderMarkdown: BubbleProps['messageRender'] = (content) => (
  <GPTVis components={{ code: CodeComponent }}>{content}</GPTVis>
);

export default () => (
  <div style={bgStyle}>
    <Bubble
      placement="end"
      content="可视化用户网购物流全流程"
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
