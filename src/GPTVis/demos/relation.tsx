import { GPTVis } from '@antv/gpt-vis';
import React from 'react';

const content = `# GPT-VIS \n\nComponents for GPTs, generative AI, and LLM projects. Not only UI Components.

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
  }
}
\`\`\`
`;

export default () => {
  return <GPTVis>{content}</GPTVis>;
};
