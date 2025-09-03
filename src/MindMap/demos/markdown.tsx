import { Bubble, type BubbleProps } from '@ant-design/x';
import { ChartType, GPTVisLite, MindMap, withChartCode } from '@antv/gpt-vis';
import React from 'react';

const markdownContent = `
当然了，以下是为你绘制的一个思维导图

\`\`\`vis-chart
{
  "type": "mind-map",
  "data": {
    "name": "台风形成的因素",
    "children": [
      {
        "name": "气象条件",
        "children": [
          { "name": "温暖的海水" },
          { "name": "气压分布" },
          { "name": "湿度水平" },
          { "name": "风的切变" }
        ]
      },
      {
        "name": "地理环境",
        "children": [
          { "name": "大陆架的形状与深度" },
          { "name": "海洋暖流的分布" },
          { "name": "热带地区的气候特征" },
          { "name": "岛屿的影响" }
        ]
      }
    ]
  },
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
  components: { [ChartType.MindMap]: MindMap },
  style: { width: 500 },
});

const RenderMarkdown: BubbleProps['messageRender'] = (content) => (
  <GPTVisLite components={{ code: CodeComponent }}>{content}</GPTVisLite>
);

export default () => (
  <div style={bgStyle}>
    <Bubble
      placement="end"
      content='用思维导图来可视化一下我的数据 {"name":"台风形成的因素","children":[{"name":"气象条件","children":[{"name":"温暖的海水"},{"name":"气压分布"},{"name":"湿度水平"},{"name":"风的切变"}]},{"name":"地理环境","children":[{"name":"大陆架的形状与深度"},{"name":"海洋暖流的分布"},{"name":"热带地区的气候特征"},{"name":"岛屿的影响"}]}]}'
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
