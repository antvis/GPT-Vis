import { Bubble, type BubbleProps } from '@ant-design/x';
import { ChartType, GPTVis, NetworkGraph, withChartCode } from '@antv/gpt-vis';
import React from 'react';

const markdownContent = `
当然了，以下是为你绘制的一个网络图

\`\`\`vis-chart
{
  "type": "network-graph",
  "data": {
    "nodes": [
      { "name": "哈利·波特" },
      { "name": "赫敏·格兰杰" },
      { "name": "罗恩·韦斯莱" },
      { "name": "伏地魔" }
    ],
    "edges": [
      { "source": "哈利·波特", "target": "赫敏·格兰杰", "name": "朋友" },
      { "source": "哈利·波特", "target": "罗恩·韦斯莱", "name": "朋友" },
      { "source": "哈利·波特", "target": "伏地魔", "name": "敌人" },
      { "source": "伏地魔", "target": "哈利·波特", "name": "试图杀死" }
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
  components: { [ChartType.NetworkGraph]: NetworkGraph },
  style: { width: 400 },
});

const RenderMarkdown: BubbleProps['messageRender'] = (content) => (
  <GPTVis components={{ code: CodeComponent }}>{content}</GPTVis>
);

export default () => (
  <div style={bgStyle}>
    <Bubble
      placement="end"
      content="在《哈利波特》系列中，有几个主要人物：哈利·波特、赫敏·格兰杰、罗恩·韦斯莱和伏地魔。哈利·波特是主角，他的两个最好的朋友是赫敏·格兰杰和罗恩·韦斯莱。伏地魔是哈利·波特的主要敌人，曾试图杀死哈利。用网络图可视化"
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
