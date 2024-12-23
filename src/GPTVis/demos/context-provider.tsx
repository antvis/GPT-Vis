import type { CodeBlockComponent } from '@antv/gpt-vis';
import { GPTVisLite, withChartCode } from '@antv/gpt-vis';
import React, { useCallback, useMemo, useState } from 'react';

export const MyContext = React.createContext(null as any);

export function useMyContext() {
  const context = React.useContext(MyContext);
  if (context === undefined || Object.keys(context).length === 0) {
    throw new Error(`useMyContext must be used within a MyContext.Provider`);
  }

  return context;
}

/**
 * 自定义代码块渲染器
 */
const MyUIRenderer: CodeBlockComponent = ({ children }) => {
  const context = useMyContext();
  console.log('context: ', context);
  return (
    <div style={{ backgroundColor: '#f0f0f0', padding: '10px' }}>
      <p>{children}</p>
      <button onClick={context?.onClick} type="button">
        click
      </button>
    </div>
  );
};
const customRenderers = { 'my-ui': MyUIRenderer };
const components = {
  code: withChartCode({
    languageRenderers: customRenderers, // register custom block renderer
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
  const handleClick = useCallback(() => {
    console.log('handleClick');
    setCount((pre) => pre + 1);
    // do something
  }, []);
  const context = useMemo(() => ({ count: count, onClick: handleClick }), [count]);

  return (
    <>
      <p>count: {count}</p>
      <MyContext.Provider value={context}>
        <div>
          {/* other component ... */}
          <div>
            {/* other component ... */}
            <GPTVisLite components={components}>{content}</GPTVisLite>
          </div>
        </div>
      </MyContext.Provider>
    </>
  );
};
