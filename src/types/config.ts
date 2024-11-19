import type { GraphOptions as ADCGraphOptions } from '@ant-design/graphs';
import type { G2 } from '@ant-design/plots';
import type { Charts } from './chart';

type PlotGlobalConfig = {
  theme?: G2.Theme;
  [key: string]: any;
};

type GraphGlobalConfig = ADCGraphOptions & {
  [key: string]: any;
};

type MapGlobalConfig = {
  style?: 'normal' | 'light' | 'dark' | string;
  token?: string;
  enableZoom?: boolean;
  enableRotate?: boolean;
  [key: string]: any;
};

type ComponentsGlobalConfig = Partial<Record<Charts, Record<string, any>>>;

export type GlobalConfig = {
  plot?: PlotGlobalConfig;
  graph?: GraphGlobalConfig;
  map?: MapGlobalConfig;
  components?: ComponentsGlobalConfig;
};
