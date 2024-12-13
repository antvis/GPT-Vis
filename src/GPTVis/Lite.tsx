import React, { memo } from 'react';
import type { Options } from 'react-markdown';
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { GPTVisContext, useGPTVisContext } from './useContext';

export interface GPTVisLiteProps extends Options {
  /**
   * 自定义 markdown components
   */
  components?:
    | Options['components']
    | {
        [key: string]: (props: any) => React.ReactNode;
      };
  /**
   * 🧪 组件上下文数据，实验性属性
   * 用于子组件与容器组件通信
   */
  context?: Record<string, any>;
}

const GPTVisLite: React.FC<GPTVisLiteProps> = ({
  context,
  children,
  components,
  rehypePlugins,
  remarkPlugins,
  ...rest
}) => {
  const renderer = (
    <Markdown
      components={components}
      rehypePlugins={[rehypeRaw, ...(rehypePlugins ? rehypePlugins : [])]}
      remarkPlugins={[remarkGfm, ...(remarkPlugins ? remarkPlugins : [])]}
      {...rest}
    >
      {children}
    </Markdown>
  );

  return context ? <GPTVisContext.Provider value={context} children={renderer} /> : renderer;
};

export { GPTVisContext, useGPTVisContext };

export default memo(GPTVisLite);
