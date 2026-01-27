import type { FishboneOptions } from '@ant-design/graphs';
import { Fishbone as ADCFishbone } from '@ant-design/graphs';
import { h, render as preactRender } from 'preact';
import { G6THEME_MAP } from '../../../theme';
import { visTreeData2GraphData, type TreeGraphData } from '../util/graph';

export type FishboneDiagramDataItem = TreeGraphData;

export interface FishboneDiagramConfig {
  type?: 'fishbone-diagram';
  data: FishboneDiagramDataItem;
  theme?: 'default' | 'academy';
}

export interface FishboneDiagramOptions {
  container: string | HTMLElement;
  width?: number;
  height?: number;
}

export interface FishboneDiagramInstance {
  render: (config: FishboneDiagramConfig) => void;
  destroy: () => void;
}

const getDefaultConfig = (theme: 'default' | 'academy' = 'default') => {
  return {
    autoFit: 'view' as const,
    autoResize: true,
    zoomRange: [0.1, 5] as [number, number],
    zoom: 1,
    behaviors: ['drag-canvas'],
    transforms: (prev: any[]) => [
      {
        ...(prev.find((transform) => (transform as any).key === 'assign-color-by-branch') ||
          ({} as any)),
        ...G6THEME_MAP[theme],
      },
    ],
  };
};

/**
 * FishboneDiagram using @ant-design/graphs with preact.
 *
 * @example
 * ```ts
 * const fishbone = FishboneDiagram({
 *   container: '#container',
 *   width: 600,
 *   height: 400,
 * });
 *
 * fishbone.render({
 *   data: {
 *     name: '问题',
 *     children: [
 *       { name: '原因1', children: [{ name: '子原因1-1' }] },
 *     ],
 *   },
 * });
 *
 * fishbone.destroy();
 * ```
 */
export const FishboneDiagram = (options: FishboneDiagramOptions): FishboneDiagramInstance => {
  const container =
    typeof options.container === 'string'
      ? document.querySelector(options.container)
      : options.container;

  if (!container) {
    throw new Error('Container not found');
  }

  const width = options.width || 640;
  const height = options.height || 480;

  const render = (config: FishboneDiagramConfig): void => {
    const { data, theme = 'default' } = config;

    const graphData = visTreeData2GraphData(data);
    const defaultConfig = getDefaultConfig(theme);

    // Use preact to render the React component
    preactRender(
      h(ADCFishbone as any, {
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
