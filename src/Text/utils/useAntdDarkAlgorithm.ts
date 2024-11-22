import { ConfigProvider, theme as antdTheme } from 'antd';
import { isArray } from 'lodash';
import { useContext } from 'react';

const { darkAlgorithm } = antdTheme;

/** 判断是否运用了 antd dark algorithm */
export const useAntdDarkAlgorithm = () => {
  const config = useContext(ConfigProvider.ConfigContext);
  const currentAlgorithm = config.theme?.algorithm;

  if (isArray(currentAlgorithm) && currentAlgorithm.includes(darkAlgorithm)) return true;
  return currentAlgorithm === darkAlgorithm;
};
