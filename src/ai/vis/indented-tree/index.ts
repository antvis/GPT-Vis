import { Graph } from '@antv/g6';
import type { VisualizationOptions } from '../../types';
import { visTreeData2GraphData } from '../../util/graph';
import { G6THEME_MAP } from '../../util/theme';

/**
 * IndentedTree data type (tree structure)
 */
export type IndentedTreeData = {
  name: string;
  children?: IndentedTreeData[];
};

/**
 * IndentedTree configuration for rendering
 */
export interface IndentedTreeConfig {
  type?: 'indented-tree';
  data: IndentedTreeData;
  theme?: 'default' | 'academy';
}

/**
 * IndentedTree instance with render and destroy methods
 */
export interface IndentedTreeInstance {
  render: (config: IndentedTreeConfig) => void;
  destroy: () => void;
}

/**
 * IndentedTree using @antv/g6 directly.
 *
 * @example
 * ```ts
 * const indentedTree = IndentedTree({
 *   container: '#container',
 *   width: 600,
 *   height: 400,
 * });
 *
 * indentedTree.render({
 *   type: 'indented-tree',
 *   data: {
 *     name: 'Root',
 *     children: [
 *       { name: 'Child 1' },
 *       { name: 'Child 2', children: [{ name: 'Grandchild' }] },
 *     ],
 *   },
 * });
 *
 * indentedTree.destroy();
 * ```
 */
export const IndentedTree = (options: VisualizationOptions): IndentedTreeInstance => {
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

  const renderComponent = (config: IndentedTreeConfig): void => {
    const { data, theme = 'default' } = config;

    // Transform data from vis format to G6 format
    const graphData = visTreeData2GraphData(data);

    // Destroy existing graph if any
    if (graph) {
      graph.destroy();
    }

    const themeColors = G6THEME_MAP[theme];

    // Create G6 graph with indented layout
    graph = new Graph({
      container: container as HTMLElement,
      width,
      height,
      data: graphData,
      autoFit: 'view',
      autoResize: true,
      zoomRange: [0.1, 5],
      zoom: 1,
      node: {
        type: 'rect',
        style: {
          size: [150, 30],
          fill: '#5B8FF9',
          stroke: '#5B8FF9',
          lineWidth: 1,
          radius: 4,
          labelText: (d: any) => d.id,
          labelFontSize: 13,
          labelFill: '#000',
          labelPlacement: 'left',
          labelOffsetX: -10,
        },
      },
      edge: {
        type: 'polyline',
        style: {
          stroke: '#5B8FF9',
          lineWidth: 2,
          radius: 8,
          strokeOpacity: 0.6,
        },
      },
      layout: {
        type: 'indented',
        direction: 'LR',
        indent: 30,
        getHeight: () => 30,
        getWidth: () => 120,
        getVGap: () => 10,
        getHGap: () => 30,
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
          palette: themeColors?.palette || [
            '#1783FF',
            '#00C9C9',
            '#F08F56',
            '#D580FF',
          ],
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
