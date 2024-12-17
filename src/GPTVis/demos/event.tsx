import type { CodeBlockComponent } from '@antv/gpt-vis';
import { GPTVisLite, useEventPublish, withChartCode } from '@antv/gpt-vis';
import React from 'react';

/**
 * 自定义代码块渲染器
 */
const MyUIRenderer: CodeBlockComponent = ({ children }) => {
  const dispatch = useEventPublish();
  console.log('dispatch: ', dispatch);
  return (
    <div style={{ backgroundColor: '#f0f0f0', padding: '10px' }}>
      <p>{children}</p>
      <button
        onClick={() => {
          dispatch('click', {});
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
    languageRenderers: customRenderers, // register custom block renderer
  }),
};

const content = `
\`\`\`my-ui
my ui data ...
\`\`\`
`;
export default () => {
  const onClick = (data: any) => {
    console.log('data: ', data);
    console.log('handleClick');
    // do something
  };

  return (
    <GPTVisLite eventSubscribe={{ click: onClick }} components={components}>
      {content}
    </GPTVisLite>
  );
};
