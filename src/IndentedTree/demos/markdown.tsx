import { Bubble, type BubbleProps } from '@ant-design/x';
import { ChartType, GPTVisLite, IndentedTree, withChartCode } from '@antv/gpt-vis';
import React from 'react';

const markdownContent = `
当然了，以下是为你绘制的一个缩进树

\`\`\`vis-chart
{
  "type": "indented-tree",
  "data": {
    "name": "导航菜单",
    "children": [
      { "name": "首页" },
      {
        "name": "产品",
        "children": [
          {
            "name": "产品分类1",
            "children": [{ "name": "产品1-1" }, { "name": "产品1-2" }]
          },
          {
            "name": "产品分类2",
            "children": [{ "name": "产品2-1" }, { "name": "产品2-2" }]
          }
        ]
      },
      {
        "name": "关于我们",
        "children": [{ "name": "公司简介" }, { "name": "团队介绍" }]
      },
      {
        "name": "服务",
        "children": [{ "name": "咨询服务" }, { "name": "技术支持" }]
      },
      { "name": "联系我们" }
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
  components: { [ChartType.IndentedTree]: IndentedTree },
});

const RenderMarkdown: BubbleProps['messageRender'] = (content) => (
  <GPTVisLite components={{ code: CodeComponent }}>{content}</GPTVisLite>
);

export default () => (
  <div style={bgStyle}>
    <Bubble
      placement="end"
      content="用缩进树来可视化一下我的数据"
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
