import { ConfigProvider, theme } from 'antd';
// @ts-ignore dumi 实际上导出了
import { useOutlet, usePrefersColor } from 'dumi';
import React from 'react';

const GlobalLayout: React.FC = () => {
  const outlet = useOutlet();
  const [color] = usePrefersColor();

  return (
    <ConfigProvider
      theme={{
        algorithm: color === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      {outlet}
    </ConfigProvider>
  );
};

export default GlobalLayout;
