import React, { useMemo } from 'react';
import type { GlobalConfig } from '../types';
import { mergeGlobalConfig } from '../utils/config';
import { ConfigContext } from './context';

export type ConfigProviderProps = {
  children?: React.ReactNode;
} & GlobalConfig;

const ConfigProvider: React.FC<ConfigProviderProps> = (props) => {
  const { children, ...config } = props;

  const contextValue = useMemo(() => mergeGlobalConfig(config), []);

  return <ConfigContext.Provider value={contextValue}>{children}</ConfigContext.Provider>;
};

export default ConfigProvider;
