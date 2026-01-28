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
 * MindMap using @antv/g6 directly.
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

  const renderComponent = (config: MindMapConfig): void => {
    const { data, theme = 'default' } = config;

    // Transform data from vis format to G6 format
    const graphData = visTreeData2GraphData(data);

    // Destroy existing graph if any
    if (graph) {
      graph.destroy();
    }

    const themeColors = G6THEME_MAP[theme];

    // Create G6 graph with mindmap layout
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
          fill: themeColors?.palette?.at(0) || '#5B8FF9',
          stroke: '#fff',
          lineWidth: 2,
          radius: 4,
          labelText: (d: any) => d.id,
          labelFontSize: 12,
          labelFill: '#fff',
          ports: [{ placement: 'left' }, { placement: 'right' }],
        },
      },
      edge: {
        type: 'cubic-horizontal',
        style: {
          stroke: themeColors?.palette?.at(1) || '#e2e2e2',
          lineWidth: 2,
        },
      },
      layout: {
        type: 'mindmap',
        direction: 'H',
        getHeight: () => 40,
        getWidth: () => 120,
        getVGap: () => 10,
        getHGap: () => 60,
        getSide: (d: any) => {
          if (d.data.depth === 0) return 'center';
          return d.data.depth % 2 === 0 ? 'left' : 'right';
        },
      },
      behaviors: [
        'drag-canvas',
        'zoom-canvas',
        {
          type: 'collapse-expand',
          enable: true,
        },
      ],
      transforms: [
        {
          key: 'assign-color-by-branch',
          type: 'assign-color-by-branch',
          ...themeColors,
        },
      ],
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
    render: renderComponent,
    destroy,
  };
};
