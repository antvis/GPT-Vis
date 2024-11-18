import { ChartType, Column, GPTVisLite, withChartCode } from '@antv/gpt-vis';
import React from 'react';

const markdownContent = `
\`\`\`vis-chart
{
  "type": "column",
  "data": [
    { "category": "第一产业", "value": 7200.0 },
    { "category": "第二产业", "value": 36600.0 },
    { "category": "第三产业" ,"value": 41000.0 },
    { "category": "第四产业" ,"value": 21000.0 },
    { "category": "其他产业" ,"value": 81000.0 }
  ]
}
\`\`\`
`;

// 自定义代码块渲染组件，NOTE: withChartCode 不要直接放入函数内部，避免重复渲染抖动问题！！！
const CodeComponent = withChartCode({
  components: { [ChartType.Column]: Column },
  debug: true,
});

export default () => {
  return (
    <GPTVisLite
      components={{
        code: CodeComponent,
      }}
    >
      {markdownContent}
    </GPTVisLite>
  );
};
