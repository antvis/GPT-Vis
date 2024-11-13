import { GPTVis, withDefaultChartCode } from '@antv/gpt-vis';
import React from 'react';

/**
 * 自定义的 Kotlin 代码块渲染器
 */
const KotlinRenderer: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <pre style={{ backgroundColor: '#f0f0f0', padding: '10px' }}>
      <code>{children}</code>
    </pre>
  );
};

const markdownContent = `
\`\`\`kotlin
// A Kotlin code block
fun main() {
  println("Hello, world!")
}
\`\`\`

\`\`\`javascript
// Normal code block
console.log('Hello World');
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

// 自定义代码块渲染组件，NOTE: withDefaultChartCode 不要直接放入函数内部，避免重复渲染抖动问题！！！
const CodeComponent = withDefaultChartCode({
  languageRenderers: {
    kotlin: KotlinRenderer,
  },
});

export default () => (
  <div>
    <GPTVis
      components={{
        code: CodeComponent,
      }}
    >
      {markdownContent}
    </GPTVis>
  </div>
);
