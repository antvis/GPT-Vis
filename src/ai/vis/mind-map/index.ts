import { Graph } from '@antv/g6';
import type { VisualizationOptions } from '../../types';
import { visTreeData2GraphData } from '../../util/graph';
import { G6THEME_MAP } from '../../util/theme';

/**
 * MindMap data type (tree structure)
 */
export type MindMapData = {
  name: string;
  children?: MindMapData[];
};

/**
 * MindMap configuration for rendering
 */
export interface MindMapConfig {
  type?: 'mind-map';
  data: MindMapData;
  theme?: 'default' | 'academy';
}

/**
 * MindMap instance with render and destroy methods
 */
export interface MindMapInstance {
  render: (config: MindMapConfig) => void;
  destroy: () => void;
}

/**
 * MindMap using G6.
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
 *   type: 'mind-map',
 *   data: {
 *     name: '项目计划',
 *     children: [
 *       { name: '研究阶段' },
 *       { name: '设计阶段' },
 *       { name: '开发阶段' },
 *     ],
 *   },
 * });
 *
 * mindMap.destroy();
 * ```
 */
export const MindMap = (options: VisualizationOptions): MindMapInstance => {
  const container =
    typeof options.container === 'string'
      ? document.querySelector(options.container)
      : options.container;

  if (!container) {
    throw new Error('Container not found');
  }

  const width = options.width || 640;
  const height = options.height || 480;
  let graph: Graph | null = null;

  const render = (config: MindMapConfig): void => {
    const { data, theme = 'default' } = config;

    // Clean up previous graph if exists
    if (graph) {
      graph.destroy();
    }

    // Transform data from vis format to G6 format
    const graphData = visTreeData2GraphData(data);

    // Get theme colors
    const themeConfig = G6THEME_MAP[theme];

    // Configure the mind map using G6
    graph = new Graph({
      container: container as HTMLElement,
      width,
      height,
      data: graphData,
      autoFit: 'view',
      autoResize: true,
      padding: 2,
      zoomRange: [0.1, 5],
      zoom: 1,
      node: {
        type: 'rect',
        style: {
          size: [120, 40],
          radius: 4,
          labelText: (d: any) => d.id,
          labelPlacement: 'center',
          labelFontSize: 12,
          labelFill: '#000',
          ports: [{ placement: 'left' }, { placement: 'right' }],
        },
        animation: { translate: false, update: false },
      },
      edge: {
        type: 'cubic-horizontal',
        style: {
          lineWidth: 2,
        },
        animation: { translate: false, update: false },
      },
      layout: {
        type: 'mindmap',
        direction: 'H',
        getHeight: () => 40,
        getWidth: () => 120,
        getVGap: () => 14,
        getHGap: () => 64,
      },
      transforms: [
        'transform-v4-data',
        {
          ...themeConfig,
          type: 'assign-color-by-branch',
          key: 'assign-color-by-branch',
        },
        {
          type: 'collapse-expand',
          key: 'collapse-expand',
          enable: true,
          trigger: 'click',
        },
      ],
      behaviors: ['drag-canvas', 'zoom-canvas'],
      animation: false,
    });

    graph.render();
  };

  const destroy = (): void => {
    if (graph) {
      graph.destroy();
      graph = null;
    }
  };

  return {
    render,
    destroy,
  };
};
