import { Bubble, type BubbleProps } from '@ant-design/x';
import { ChartType, FishboneDiagram, GPTVisLite, withChartCode } from '@antv/gpt-vis';
import React from 'react';

const markdownContent = `
当然了，以下是为你绘制的一个鱼骨图

\`\`\`vis-chart
{
  "type": "fishbone-diagram",
  "data": {
    "name": "生产效率低",
    "children": [
      {
        "name": "设备问题",
        "children": [{ "name": "设备老化" }, { "name": "维护不及时" }]
      },
      {
        "name": "员工问题",
        "children": [{ "name": "技能不足" }, { "name": "工作态度差" }]
      },
      {
        "name": "流程问题",
        "children": [{ "name": "流程繁琐" }, { "name": "缺乏标准化" }]
      }
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
  overflow: 'auto',
};

const CodeComponent = withChartCode({
  components: { [ChartType.FishboneDiagram]: FishboneDiagram },
});

const RenderMarkdown: BubbleProps['messageRender'] = (content) => (
  <GPTVisLite components={{ code: CodeComponent }}>{content}</GPTVisLite>
);

export default () => (
  <div style={bgStyle}>
    <Bubble
      placement="end"
      content='用鱼骨图来可视化一下我的数据 {"problem":"生产效率低","bones":[{"category":"设备问题","factors":["设备老化","维护不及时"]},{"category":"员工问题","factors":["技能不足","工作态度差"]},{"category":"流程问题","factors":["流程繁琐","缺乏标准化"]}]}'
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
