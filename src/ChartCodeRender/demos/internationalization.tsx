import { GPTVisLite, withDefaultChartCode } from '@antv/gpt-vis';
import React from 'react';

const markdownContent = `
\`\`\`vis-chart
{
  "type": "pie",
  "data": [
    { "category": "category 1", "value": 27 },
    { "category": "category 2", "value": 25 },
    { "category": "category 3", "value": 18 },
    { "category": "category 4", "value": 15 },
    { "category": "category 5", "value": 10 },
    { "category": "category 6", "value": 5 }
  ]
}
\`\`\`
`;

// 自定义代码块渲染组件，NOTE: withDefaultChartCode 不要直接放入函数内部，避免重复渲染抖动问题！！！
const CodeComponent = withDefaultChartCode({
  debug: true,
  locale: 'en-US',
});

export default () => (
  <div>
    <GPTVisLite
      components={{
        code: CodeComponent,
      }}
    >
      {markdownContent}
    </GPTVisLite>
  </div>
);
