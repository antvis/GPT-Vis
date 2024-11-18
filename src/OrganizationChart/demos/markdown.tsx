import { Bubble, type BubbleProps } from '@ant-design/x';
import { ChartType, GPTVisLite, OrganizationChart, withChartCode } from '@antv/gpt-vis';
import React from 'react';

const markdownContent = `
当然了，以下是为你绘制的一个组织架构图

\`\`\`vis-chart
{
  "type": "organization-chart",
  "data": {
    "name": "Eric Joplin",
    "description": "Chief Executive Officer",
    "children": [
      {
        "name": "Linda Newland",
        "description": "Chief Executive Assistant"
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
};

const CodeComponent = withChartCode({
  components: { [ChartType.OrganizationChart]: OrganizationChart },
  style: { width: 600, height: 250 },
});

const RenderMarkdown: BubbleProps['messageRender'] = (content) => (
  <GPTVisLite components={{ code: CodeComponent }}>{content}</GPTVisLite>
);

export default () => (
  <div style={bgStyle}>
    <Bubble
      placement="end"
      content="组织架构图来可视化一下我的数据"
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
