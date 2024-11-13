import React, { memo } from 'react';
import type { Options } from 'react-markdown';
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { withDefaultChartCode } from '../ChartCodeRender';

export interface GPTVisProps extends Options {
  /** 自定义 markdown components样式 */
  components?:
    | Options['components']
    | {
        [key: string]: (props: any) => React.ReactNode;
      };
}

const CodeBlock = withDefaultChartCode();

const GPTVis: React.FC<GPTVisProps> = ({ children, components, rehypePlugins, ...rest }) => {
  return (
    <Markdown
      components={{ code: CodeBlock, ...components }}
      rehypePlugins={[rehypeRaw, ...(rehypePlugins ? rehypePlugins : [])]}
      {...rest}
    >
      {children}
    </Markdown>
  );
};

export default memo(GPTVis);
