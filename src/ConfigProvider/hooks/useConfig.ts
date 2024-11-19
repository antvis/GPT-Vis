import type { GraphOptions } from '@ant-design/graphs';
import type { CommonConfig } from '@ant-design/plots';
import React from 'react';
import type { MapProps } from '../../Map';
import type { Charts } from '../../types';
import { mergeGraphOptions } from '../../utils/config';
import { transform2ADCProps } from '../../utils/plot';
import { ConfigContext } from '../context';

function useConfig() {
  const context = React.useContext(ConfigContext);
  return context;
}

export function useComponentGlobalConfig(name: Charts) {
  const globalConfig = useConfig();
  const { components = {} } = globalConfig;
  const config = components?.[name];

  return config;
}

function usePlotGlobalConfig(name: Charts) {
  const componentConfig = useComponentGlobalConfig(name);
  const { plot: plotConfig } = useConfig();
  const config = {
    ...plotConfig,
    ...componentConfig,
  };

  return config;
}

export function usePlotConfig<T extends CommonConfig>(
  name: Charts,
  defaultConfig: Partial<T> | ((props: Partial<T>) => Partial<T>),
  props: Partial<T>,
): Partial<T> {
  const transformedProps = transform2ADCProps(props);

  const _defaultConfig =
    typeof defaultConfig === 'function' ? defaultConfig(transformedProps) : defaultConfig;

  const globalConfig = usePlotGlobalConfig(name);

  const config = {
    ..._defaultConfig,
    ...globalConfig,
    ...transformedProps,
  };

  return config;
}

function useMapGlobalConfig(name: Charts) {
  const componentConfig = useComponentGlobalConfig(name);
  const { map: mapConfig } = useConfig();
  const transformedProps = {
    mapType: mapConfig?.style,
    token: mapConfig?.token,
  };

  const config = {
    ...transformedProps,
    ...componentConfig,
  };

  return config;
}

export function useMapConfig<T extends MapProps>(name: Charts, props: T) {
  const globalConfig = useMapGlobalConfig(name);

  const mapConfig = {
    ...globalConfig,
    ...props,
  };

  return mapConfig;
}

function useGraphGlobalConfig(name: Charts) {
  const { graph: graphConfig = {} } = useConfig();
  const componentConfig = useComponentGlobalConfig(name);

  return mergeGraphOptions(graphConfig, componentConfig || {});
}

export function useGraphConfig<T extends GraphOptions>(name: Charts, defaultConfig: T, props: T) {
  const globalConfig = useGraphGlobalConfig(name);

  return mergeGraphOptions(defaultConfig, globalConfig, props);
}
