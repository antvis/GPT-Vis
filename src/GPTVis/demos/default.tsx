import { GPTVis } from '@antv/gpt-vis';
import React from 'react';

const content = `# GPT-VIS \n\nComponents for GPTs, generative AI, and LLM projects. Not only UI Components.

\`\`\`vis-chart
{
  "type": "pie",
  "data": [
    { "category": "分类一", "value": 27 },
    { "category": "分类二", "value": 25 },
    { "category": "分类三", "value": 18 },
    { "category": "分类四", "value": 15 },
    { "category": "分类五", "value": 10 },
    { "category": "其他", "value": 5 }
  ]
}
\`\`\`
`;

export default () => {
  return <GPTVis>{content}</GPTVis>;
};
