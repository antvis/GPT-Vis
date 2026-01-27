import type { G6, MindMapOptions } from '@ant-design/graphs';
import { MindMap as ADCMindMap } from '@ant-design/graphs';
import { h, render as preactRender } from 'preact';
import { G6THEME_MAP } from '../../util/theme';
import { visTreeData2GraphData, type TreeGraphData } from '../util/graph';

export type MindMapDataItem = TreeGraphData;

export interface MindMapConfig {
  type?: 'mind-map';
  data: MindMapDataItem;
  theme?: 'default' | 'academy';
}

export interface MindMapOptions {
  container: string | HTMLElement;
  width?: number;
  height?: number;
}

export interface MindMapInstance {
  render: (config: MindMapConfig) => void;
  destroy: () => void;
}

const getDefaultConfig = (theme: 'default' | 'academy' = 'default') => {
  return {
    type: 'boxed' as const,
    autoFit: 'view' as const,
    autoResize: true,
    padding: 2,
    zoomRange: [0.1, 5] as [number, number],
    zoom: 1,
    node: { animation: { translate: false, update: false } } as const,
    edge: { animation: { translate: false, update: false } } as const,
    transforms: (prev: any[]) => [
      ...prev.filter(
        (transform) => (transform as G6.BaseTransformOptions).type !== 'collapse-expand-react-node',
      ),
      {
        ...(prev.find(
          (transform: G6.CustomBehaviorOption) =>
            (transform as G6.BaseTransformOptions).type === 'collapse-expand-react-node',
        ) as G6.BaseTransformOptions),
        enable: true,
      },
      {
        ...(prev.find((transform) => (transform as any).key === 'assign-color-by-branch') ||
          ({} as any)),
        ...G6THEME_MAP[theme],
      },
    ],
    behaviors: ['drag-canvas'],
  };
};

/**
 * MindMap chart using @ant-design/graphs with preact.
 *
 * @example
 * ```ts
 * const mindMap = MindMap({
 *   container: '#container',
 *   width: 600,
 *   height: 400,
 * });
 *
 * mindMap.render({
 *   data: {
 *     name: '项目计划',
 *     children: [
 *       { name: '研究阶段', children: [{ name: '市场调研' }] },
 *     ],
 *   },
 * });
 *
 * mindMap.destroy();
 * ```
 */
export const MindMap = (options: MindMapOptions): MindMapInstance => {
  const container =
    typeof options.container === 'string'
      ? document.querySelector(options.container)
      : options.container;

  if (!container) {
    throw new Error('Container not found');
  }

  const width = options.width || 640;
  const height = options.height || 480;

  const render = (config: MindMapConfig): void => {
    const { data, theme = 'default' } = config;

    const graphData = visTreeData2GraphData(data);
    const defaultConfig = getDefaultConfig(theme);

    // Use preact to render the React component
    preactRender(
      h(ADCMindMap as any, {
        data: graphData,
        width,
        height,
        ...defaultConfig,
      }),
      container as HTMLElement,
    );
  };

  const destroy = (): void => {
    if (container) {
      preactRender(null, container as HTMLElement);
    }
  };

  return {
    render,
    destroy,
  };
};
