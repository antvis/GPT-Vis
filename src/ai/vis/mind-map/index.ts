import { Graph } from '@antv/g6';
import { getBackgroundColor } from '../../util/theme';
import { getG6ThemeTransform, treeToGraphData, type TreeData } from '../util/graph';

/**
 * MindMap data item type
 */
export type MindMapDataItem = TreeData;

/**
 * MindMap initialization options
 */
export interface MindMapOptions {
  container: string | HTMLElement;
  width?: number;
  height?: number;
}

/**
 * MindMap configuration for rendering
 */
export interface MindMapConfig {
  type?: 'mind-map';
  data: MindMapDataItem;
  theme?: 'default' | 'academy' | 'dark';
  style?: {
    backgroundColor?: string;
  };
}

/**
 * MindMap instance with render and destroy methods
 */
export interface MindMapInstance {
  render: (config: MindMapConfig) => void;
  destroy: () => void;
}

/**
 * MindMap chart using G6 5.0.
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
 *       {
 *         name: '研究阶段',
 *         children: [{ name: '市场调研' }, { name: '技术可行性分析' }],
 *       },
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
  let graph: Graph | null = null;

  const render = (config: MindMapConfig): void => {
    const { data, theme = 'default', style = {} } = config;

    // Clean up previous graph if exists
    if (graph) {
      graph.destroy();
    }

    const backgroundColor = style.backgroundColor || getBackgroundColor(theme);

    // Transform tree data to graph data
    const graphData = treeToGraphData(data);

    // Create and configure graph
    graph = new Graph({
      container: container as HTMLElement,
      width,
      height,
      autoFit: 'view',
      data: graphData,
      node: {
        type: 'rect',
        style: {
          size: [120, 40],
          radius: 8,
          labelText: (d: any) => d.id,
          labelPlacement: 'center',
          labelFontSize: 14,
          labelFill: '#262626',
          fill: '#EFF0F0',
          lineWidth: 2,
          ports: [{ placement: 'left' }, { placement: 'right' }],
        },
      },
      edge: {
        type: 'cubic-horizontal',
        style: {
          lineWidth: 2,
          stroke: '#99ADD1',
        },
      },
      layout: {
        type: 'mindmap',
        direction: 'H',
        getHeight: () => 40,
        getWidth: () => 120,
        getVGap: () => 10,
        getHGap: () => 60,
      },
      transforms: [getG6ThemeTransform(theme)],
      behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
      background: backgroundColor,
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
