import { ConfigProvider, theme as antdTheme } from 'antd';
import { isArray } from 'lodash';
import { useContext } from 'react';

/** 判断是否运用了 antd dark algorithm */
export const useAntdDarkAlgorithm = () => {
  // 放到函数内部，避免用户使用 antd@4，theme 变量不存在情况！！！
  const darkAlgorithm = antdTheme?.darkAlgorithm;

  const config = useContext(ConfigProvider.ConfigContext);
  const currentAlgorithm = config.theme?.algorithm;

  if (isArray(currentAlgorithm) && currentAlgorithm.includes(darkAlgorithm)) return true;
  return !!darkAlgorithm && currentAlgorithm === darkAlgorithm;
};
