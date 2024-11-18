import type { CodeBlockComponent } from '@antv/gpt-vis';
import { ChartType, GPTVisLite, Pie, withChartCode } from '@antv/gpt-vis';
import React from 'react';

/**
 * 自定义代码块渲染器
 */
const MyUIRenderer: CodeBlockComponent = ({ children }) => {
  return <div style={{ backgroundColor: '#f0f0f0', padding: '10px' }}>{children}</div>;
};
const customRenderers = { 'my-ui': MyUIRenderer };
const components = {
  code: withChartCode({
    languageRenderers: customRenderers, // register custom block renderer
    components: { [ChartType.Pie]: Pie }, // register a pie chart
  }),
};

const content = `
\`\`\`my-ui
my data ...
\`\`\`

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
export default () => <GPTVisLite components={components}>{content}</GPTVisLite>;
