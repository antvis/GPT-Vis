import { GPTVis } from '@antv/gpt-vis';
import React from 'react';

const content = `

 # Ant Design X

Ant Design X 是一款AI应用复合工具集，融合了 UI 组件库、流式 Markdown 渲染引擎和 AI SDK，为开发者提供构建下一代 AI 驱动应用的完整工具链。

![Ant Design X](https://mdn.alipayobjects.com/huamei_yz9z7c/afts/img/0lMhRYbo0-8AAAAAQDAAAAgADlJoAQFr/original)


基于 Ant Design 设计体系的 React UI 库、专为 AI 驱动界面设计，开箱即用的智能对话组件、无缝集成 API 服务，快速搭建智能应用界面，查看详情请点击 [Ant Design X](https://github.com/ant-design/x)。

# GPT-VIS \n\nComponents for GPTs, generative AI, and LLM projects. Not only UI Components.



\`\`\`vis-chart
{
  "type": "pie",
  "data": [
    { "category": "分类一", "value": 27 },
    { "category": "分类二", "value": 25 },
    { "category": "分类三", "value": 18 },
    { "category": "其他", "value": 5 }
  ]
}
\`\`\`
`;

export default () => {
  return <GPTVis>{content}</GPTVis>;
};
