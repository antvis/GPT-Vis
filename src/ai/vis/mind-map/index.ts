import { Graph } from '@antv/g6';
import type { VisualizationOptions } from '../../types';
import { visTreeData2GraphData } from '../../util/graph';
import { createTextNode } from '../../util/html-nodes';
import { getBoxedTextNodeStyle } from '../../util/measure-text';
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
 * Get node side (left, right, or center)
 */
function getNodeSide(graph: Graph, data: any): 'left' | 'right' | 'center' {
  const layout = graph.getOptions().layout as any;
  if (!layout || layout.direction !== 'H') return 'right';
  
  const depth = data.depth || 0;
  if (depth === 0) return 'center';
  
  // Determine side based on position in parent's children
  const parentId = data.id?.split('-').slice(0, -1).join('-');
  if (!parentId) return 'right';
  
  // Simple heuristic: alternate or based on index
  return depth % 2 === 1 ? 'right' : 'left';
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

    const minWidth = 120;
    const maxWidth = 300;

    // Configure the mind map using G6 with HTML nodes
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
        type: 'html',
        style: {
          size: (d: any) => {
            const label = d.id || d.name || '';
            const depth = d.depth || 0;
            return getBoxedTextNodeStyle(label, minWidth, maxWidth, depth).size;
          },
          dx: function (d: any) {
            const side = getNodeSide(this as unknown as Graph, d);
            const label = d.id || d.name || '';
            const depth = d.depth || 0;
            const [w] = getBoxedTextNodeStyle(label, minWidth, maxWidth, depth).size;
            return side === 'left' ? -w : side === 'center' ? -w / 2 : 0;
          },
          innerHTML: (d: any) => {
            const depth = d.depth || 0;
            const color = d.style?.color || themeConfig.colors?.[depth % themeConfig.colors.length] || '#1783ff';
            const label = d.id || d.name || '';
            const { font } = getBoxedTextNodeStyle(label, minWidth, maxWidth, depth);
            const isActive = d.states?.includes('active');
            
            const nodeType = depth === 0 
              ? 'filled' 
              : depth === 1 
                ? 'filled' 
                : 'outlined';
            
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
          ports: [{ placement: 'left' }, { placement: 'right' }],
        },
        animation: { translate: false, update: false },
      },
      edge: {
        type: 'cubic-horizontal',
        style: {
          lineWidth: 3,
          stroke: function (d: any) {
            const source = (this as unknown as Graph).getNodeData(d.source);
            const depth = source?.depth || 0;
            return source?.style?.color || themeConfig.colors?.[depth % themeConfig.colors.length] || '#99ADD1';
          },
        },
        animation: { translate: false, update: false },
      },
      layout: {
        type: 'mindmap',
        direction: 'H',
        getHeight: (d: any) => {
          const label = d.id || d.name || '';
          const depth = d.depth || 0;
          const [, h] = getBoxedTextNodeStyle(label, minWidth, maxWidth, depth).size;
          return h;
        },
        getWidth: (d: any) => {
          const label = d.id || d.name || '';
          const depth = d.depth || 0;
          const [w] = getBoxedTextNodeStyle(label, minWidth, maxWidth, depth).size;
          return w;
        },
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
