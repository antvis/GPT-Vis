import { Tooltip, Typography } from 'antd';
import { pick, toString } from 'lodash';
import React from 'react';
import styled from 'styled-components';
import { useComponentGlobalConfig } from '../ConfigProvider/hooks';
import { type TextConfig, STATICS_KEY } from './config';
import type { VisTextProps } from './types';
import { getThemeColor, useAntdDarkAlgorithm } from './utils';

const { Text } = Typography;

const StyledText = styled(Text)`
  margin-left: 1px;
  margin-right: 1px;
`;

function renderPrefixSuffix(
  symbol: string,
  staticsConfig: TextConfig[typeof STATICS_KEY],
  props: VisTextProps,
) {
  if (!symbol) return null;
  const Component = staticsConfig?.[symbol];
  if (Component) return <Component {...props} />;
  return symbol;
}

const VisText = (props: VisTextProps) => {
  const { children, className, style, type, origin } = props;

  const isDark = useAntdDarkAlgorithm();
  const textConfig = useComponentGlobalConfig('VisText');

  const encoding = type ? textConfig?.[type] : {};
  const staticsConfig = textConfig?.[STATICS_KEY];

  return (
    // TODO  @羽熙 暂时简单处理 tooltip 直接显示 origin，后续可以根据 origin 类型分类处理
    <Tooltip title={toString(origin)}>
      <StyledText
        className={className}
        style={{
          // antd Text 组件写死了 14px，在段落定义了 font-size 的情况下，显示很突兀，这里不设置，跟随上级容器字体大小改变。
          // TODO @羽熙 之后看能否通过 antd ConfigProvider 统一配置
          fontSize: 'unset',
          color: getThemeColor({ type, color: encoding?.color, theme: isDark ? 'dark' : 'light' }),
          ...style,
          ...pick(encoding, ['backgroundColor', 'fontWeight']),
        }}
      >
        {renderPrefixSuffix(encoding?.prefix, staticsConfig, props)}
        {children}
        {renderPrefixSuffix(encoding?.suffix, staticsConfig, props)}
      </StyledText>
    </Tooltip>
  );
};

export default VisText;
