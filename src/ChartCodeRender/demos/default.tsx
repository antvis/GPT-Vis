import { GPTVisLite, withDefaultChartCode } from '@antv/gpt-vis';
import React from 'react';

const commonString = `
当然可以！在 JavaScript 中，你可以使用加法运算符 \`+\` 来实现两个数字的相加。以下是一个简单的函数，它接受两个参数 \`a\` 和 \`b\`,并返回它们的和：

\`\`\`javascript\nfunction add(a, b) {\n  return a + b;\n}\n\n// 示例用法\nconst result = add(3, 4);\nconsole.log(result); // 输出：7\n\`\`\`\n\n在这个示例中，我们定义了一个名为 \`add\` 的函数，它接受两个参数 \`a\` 和 \`b\`。函数的主体只有一行代码，使用加法运算符 \`+\` 将 \`a\` 和 \`b\` 相加，并返回结果。\n\n然后，我们调用
`;

const markdownContent = `
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

// 自定义代码块渲染组件，NOTE: withDefaultChartCode 不要直接放入函数内部，避免重复渲染抖动问题！！！
const CodeComponent = withDefaultChartCode({
  debug: true,
});

export default () => (
  <div>
    <GPTVisLite>{commonString}</GPTVisLite>
    <GPTVisLite
      components={{
        code: CodeComponent,
      }}
    >
      {markdownContent}
    </GPTVisLite>
  </div>
);
