import type { CodeBlockComponent } from '@antv/gpt-vis';
import { GPTVisLite, useEventPublish, withChartCode } from '@antv/gpt-vis';
import React, { useState } from 'react';

/**
 * 自定义代码块渲染器
 */
const MyUIRenderer: CodeBlockComponent = ({ children }) => {
  const eventPublish = useEventPublish();
  return (
    <div style={{ backgroundColor: '#f0f0f0', padding: '10px' }}>
      <p>{children}</p>
      <button
        onClick={() => {
          eventPublish('xxxclick', {});
        }}
        type="button"
      >
        click
      </button>
    </div>
  );
};
const customRenderers = { 'my-ui': MyUIRenderer };
const components = {
  code: withChartCode({
    languageRenderers: customRenderers,
    components: {},
  }),
};

const content = `
\`\`\`my-ui
my ui data ...
\`\`\`
`;
export default () => {
  const [count, setCount] = useState(0);
  const onClick = (data: any) => {
    console.log('data: ', data);
    setCount((pre) => pre + 1);
    // do something
  };

  return (
    <>
      <p>count: {count}</p>
      <GPTVisLite eventSubs={{ xxxclick: onClick }} components={components}>
        {content}
      </GPTVisLite>
    </>
  );
};
