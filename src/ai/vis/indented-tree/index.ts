import { Graph } from '@antv/g6';
import type { VisualizationOptions } from '../../types';
import { visTreeData2GraphData } from '../../util/graph';
import { createTextNode } from '../../util/html-nodes';
import { getLinearTextNodeStyle } from '../../util/measure-text';
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
 * IndentedTree using G6.
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

  const render = (config: IndentedTreeConfig): void => {
    const { data, theme = 'default' } = config;

    // Clean up previous graph if exists
    if (graph) {
      graph.destroy();
    }

    // Transform data from vis format to G6 format
    const graphData = visTreeData2GraphData(data);

    // Get theme colors
    const themeConfig = G6THEME_MAP[theme];

    const minWidth = 0;
    const maxWidth = 300;

    // Configure the indented tree using G6 with HTML nodes
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
        type: 'html',
        style: {
          size: (d: any) => {
            const label = d.id || d.name || '';
            const depth = d.depth || 0;
            return getLinearTextNodeStyle(label, minWidth, maxWidth, depth).size;
          },
          innerHTML: (d: any) => {
            const depth = d.depth || 0;
            const color = d.style?.color || themeConfig.colors?.[depth % themeConfig.colors.length] || '#1783ff';
            const label = d.id || d.name || '';
            const { font } = getLinearTextNodeStyle(label, minWidth, maxWidth, depth);
            const isActive = d.states?.includes('active');
            
            const nodeType = depth === 0 ? 'filled' : 'underlined';
            const nodeColor = depth === 0 ? '#f1f4f5' : color;
            const textColor = depth === 0 ? '#252525' : undefined;
            
            const node = createTextNode({
              type: nodeType,
              text: label,
              color: nodeColor,
              maxWidth,
              font,
              isActive,
            });
            
            if (textColor) {
              node.style.color = textColor;
            }
            
            return node.outerHTML;
          },
        },
        animation: { update: false, translate: false },
      },
      edge: {
        type: 'polyline',
        style: {
          lineWidth: 2,
          radius: 8,
          stroke: function (d: any) {
            const target = (this as unknown as Graph).getNodeData(d.target);
            const depth = target?.depth || 0;
            return target?.style?.color || themeConfig.colors?.[depth % themeConfig.colors.length] || '#99ADD1';
          },
        },
        animation: { update: false, translate: false },
      },
      layout: {
        type: 'indented',
        direction: 'LR',
        indent: 30,
        getHeight: (d: any) => {
          const label = d.id || d.name || '';
          const depth = d.depth || 0;
          const [, h] = getLinearTextNodeStyle(label, minWidth, maxWidth, depth).size;
          return h;
        },
        getVGap: () => 12,
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
