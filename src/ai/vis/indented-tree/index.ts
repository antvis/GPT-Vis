import { Graph } from '@antv/g6';
import { getBackgroundColor, getBorderColor, getTextColor } from '../../util/theme';
import { getG6ThemeTransform, treeToGraphData, type TreeData } from '../util/graph';

/**
 * IndentedTree data item type
 */
export type IndentedTreeDataItem = TreeData;

/**
 * IndentedTree initialization options
 */
export interface IndentedTreeOptions {
  container: string | HTMLElement;
  width?: number;
  height?: number;
}

/**
 * IndentedTree configuration for rendering
 */
export interface IndentedTreeConfig {
  type?: 'indented-tree';
  data: IndentedTreeDataItem;
  theme?: 'default' | 'academy' | 'dark';
  style?: {
    backgroundColor?: string;
  };
}

/**
 * IndentedTree instance with render and destroy methods
 */
export interface IndentedTreeInstance {
  render: (config: IndentedTreeConfig) => void;
  destroy: () => void;
}

/**
 * IndentedTree component using G6 5.0.
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
 *       {
 *         name: 'Child 1',
 *         children: [{ name: 'Grandchild 1' }],
 *       },
 *     ],
 *   },
 * });
 *
 * indentedTree.destroy();
 * ```
 */
export const IndentedTree = (options: IndentedTreeOptions): IndentedTreeInstance => {
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

  const render = (config: IndentedTreeConfig): void => {
    const { data, theme = 'default', style = {} } = config;

    // Clean up previous graph if exists
    if (graph) {
      graph.destroy();
    }

    const backgroundColor = style.backgroundColor || getBackgroundColor(theme);
    const textColor = getTextColor(theme);
    const borderColor = getBorderColor(theme);

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
          size: [150, 30],
          radius: 4,
          labelText: (d: any) => d.id,
          labelPlacement: 'left',
          labelOffsetX: 10,
          labelFontSize: 14,
          labelFill: textColor,
          fill: 'transparent',
          lineWidth: 0,
          ports: [{ placement: 'left' }, { placement: 'right' }],
        },
      },
      edge: {
        type: 'polyline',
        style: {
          lineWidth: 1,
          stroke: borderColor,
        },
      },
      layout: {
        type: 'indented',
        direction: 'LR',
        dropCap: false,
        indent: 30,
        getHeight: () => 30,
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
