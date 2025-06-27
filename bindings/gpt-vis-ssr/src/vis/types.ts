import { RendererPlugin } from '@antv/g';

export type CommonOptions = {
  width?: number;
  height?: number;
  theme?: string;
  texture?: 'rough' | 'default';
  renderPlugins?: RendererPlugin[];
};
