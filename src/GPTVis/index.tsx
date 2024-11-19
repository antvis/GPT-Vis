import React, { memo } from 'react';
import { withDefaultChartCode } from '../ChartCodeRender';
import { default as GPTVisLite, type GPTVisLiteProps } from './Lite';

export interface GPTVisProps extends GPTVisLiteProps {}

const CodeBlock = withDefaultChartCode();

const GPTVis: React.FC<GPTVisProps> = ({ children, components, ...rest }) => {
  return (
    <GPTVisLite components={{ code: CodeBlock, ...components }} {...rest}>
      {children}
    </GPTVisLite>
  );
};

export default memo(GPTVis);
