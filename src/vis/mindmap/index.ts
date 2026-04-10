import { Graph, idOf, positionOf, treeToGraphData } from '@antv/g6';
import type { TreeGraphData, VisualizationOptions } from '../../types';
import { getBackgroundColor, getThemeColors } from '../../util/theme';

export type MindmapData = TreeGraphData;

/**
 * MindmapConfig defines the configuration for rendering the mindmap.
 */
export interface MindmapConfig {
  type?: 'mindmap';
  data: MindmapData;
  direction?: 'H' | 'LR' | 'RL';
  theme?: 'default' | 'academy' | 'dark';
  title?: string;
  style?: {
    backgroundColor?: string;
    palette?: string[];
  };
}

/**
 * MindmapInstance represents a mindmap instance with render and destroy methods.
 */
export interface MindmapInstance {
  render: (config: MindmapConfig) => void;
  destroy: () => void;
  zoomTo: (zoom: number) => void;
  getZoom: () => number | undefined;
}

/** Props type for SSR package to import */
export type MindMapProps = Pick<MindmapConfig, 'data' | 'direction'>;

/**
 * Convert GPT-Vis tree data (name-based) to G6 tree data (id-based).
 */
function toG6TreeData(node: TreeGraphData): any {
  return {
    id: node.name,
    children: (node.children || []).map(toG6TreeData),
  };
}

/**
 * Convert GPT-Vis tree data to G6 graph data with depth info.
 */
function convertTreeData(treeData: TreeGraphData) {
  return treeToGraphData(toG6TreeData(treeData), {
    getNodeData: (datum: any, depth: number) => {
      datum.depth = depth;
      if (!datum.children) return datum;
      const { children, ...rest } = datum;
      return {
        ...rest,
        children: children.map((child: any) => child.id),
      };
    },
  });
}

/**
 * Assign branch colors to graph data before rendering.
 * Each depth=1 node gets a unique color from the palette; descendants inherit.
 * Runs before Graph creation so colors are available on first render.
 */
function assignBranchColors(graphData: any, colors: string[]) {
  const nodes = graphData.nodes || [];
  let colorIndex = 0;

  const nodeMap = new Map<string, any>();
  for (const node of nodes) {
    nodeMap.set(String(node.id), node);
  }

  const dfs = (nodeId: string, color?: string) => {
    const node = nodeMap.get(String(nodeId));
    if (!node) return;
    node.style = node.style || {};
    node.style.color = color || colors[colorIndex++ % colors.length];
    (node.children as string[] | undefined)?.forEach((childId) => dfs(childId, node.style.color));
  };

  nodes.filter((n: any) => n.depth === 1).forEach((n: any) => dfs(String(n.id)));
}

/**
 * Get the side of a node relative to its parent.
 */
function getNodeSide(nodeData: any, parentData: any): 'left' | 'right' | 'center' {
  if (!parentData) return 'center';
  return positionOf(parentData)[0] > positionOf(nodeData)[0] ? 'left' : 'right';
}

/**
 * Estimate node width based on text length (approximate).
 */
function estimateNodeWidth(text: string, fontSize: number, padding: number): number {
  const avgCharWidth = fontSize * 0.58;
  const cjkCount = (text.match(/[\u4e00-\u9fff\u3000-\u303f\uff00-\uffef]/g) || []).length;
  const otherCount = text.length - cjkCount;
  const textWidth = cjkCount * fontSize + otherCount * avgCharWidth;
  return Math.min(Math.max(textWidth + padding, 120), 300);
}

/**
 * Mindmap component using G6 5.0 with mindmap layout.
 * Follows the "boxed" type style from 0.x @ant-design/graphs MindMap.
 */
export const Mindmap = (options: VisualizationOptions): MindmapInstance => {
  const { container, width, height, theme: chartTheme = 'default' } = options;
  let graph: Graph | null = null;

  const render = (config: MindmapConfig): void => {
    const { data, direction = 'H', theme = chartTheme, title, style = {} } = config;

    if (!data || !data.name) {
      throw new Error('Mindmap: data with a name field is required');
    }

    if (graph) {
      graph.destroy();
      graph = null;
    }

    const containerEl =
      typeof container === 'string' ? document.querySelector<HTMLElement>(container) : container;

    if (!containerEl) {
      throw new Error('Mindmap: container element not found');
    }

    containerEl.innerHTML = '';

    const colors =
      style.palette && style.palette.length > 0 ? style.palette : getThemeColors(theme);
    const backgroundColor = style.backgroundColor || getBackgroundColor(theme);
    const isDark = theme === 'dark';

    containerEl.style.background = backgroundColor;

    const graphWidth = containerEl.offsetWidth || width || 600;
    const graphHeight = containerEl.offsetHeight || height || 400;

    // Convert tree data and assign branch colors before rendering
    const graphData = convertTreeData(data);
    assignBranchColors(graphData, colors);

    // Pre-calculate node sizes so layout and renderer use consistent values
    for (const node of graphData.nodes || []) {
      const label = String(node.id);
      const depth = node.depth ?? 0;
      const fontSize = depth === 0 ? 24 : 16;
      const pad = depth === 0 ? 64 : 36;
      node.layoutSize = [estimateNodeWidth(label, fontSize, pad), depth === 0 ? 60 : 48];
    }

    graph = new Graph({
      container: containerEl,
      width: graphWidth,
      height: graphHeight,
      autoFit: 'view',
      autoResize: true,
      padding: 2,
      zoomRange: [0.1, 5],
      zoom: 1,
      theme: chartTheme,
      data: graphData,
      animation: false,
      plugins: title
        ? [{ key: 'title', type: 'title', title, titleFill: isDark ? '#e0e6ed' : '#1a1a2e' }]
        : [],
      node: {
        type: 'rect',
        animation: { translate: false, update: false },
        style: function (this: any, d: any) {
          const depth = (d as any).depth ?? 0;
          const color = (d.style as any)?.color;
          const label = String(idOf(d));
          const parentData = this.getParentData(idOf(d), 'tree');
          const [nodeWidth, nodeHeight] = (d as any).layoutSize || [120, 48];

          // Node side for dx offset (matching 0.x getNodeSide + dx logic)
          const side =
            direction === 'RL' ? 'left' : direction === 'LR' ? 'right' : getNodeSide(d, parentData);

          const fontSize = depth === 0 ? 24 : 16;
          const fontWeight = depth <= 1 ? 600 : 400;

          // dx offset: left=-width, center=-width/2, right=0 (matching 0.x)
          const dx = side === 'left' ? -nodeWidth : side === 'center' ? -nodeWidth / 2 : 0;

          // Common style
          const base = {
            size: [nodeWidth, nodeHeight] as [number, number],
            dx,
            radius: 8,
            labelText: label,
            labelPlacement: 'center' as const,
            labelFontSize: fontSize,
            labelFontWeight: fontWeight,
            ports: [{ placement: 'left' }, { placement: 'right' }],
          };

          // Depth 0: gray filled (root)
          if (depth === 0) {
            return {
              ...base,
              fill: isDark ? '#333' : '#f1f4f5',
              labelFill: isDark ? '#e0e0e0' : '#252525',
            };
          }

          // Depth 1: filled with branch color
          if (depth === 1) {
            return {
              ...base,
              fill: color || '#99ADD1',
              labelFill: '#fff',
            };
          }

          // Depth 2+: outlined with branch color border
          return {
            ...base,
            fill: backgroundColor,
            stroke: color || (isDark ? '#555' : '#99ADD1'),
            lineWidth: 3,
            labelFill: isDark ? color || '#ccc' : color || '#333',
          };
        } as any,
      },
      edge: {
        type: 'cubic-horizontal',
        animation: { translate: false, update: false },
        style: {
          lineWidth: 3,
          stroke: function (edgeData: any) {
            const sourceNode = (this as any).getNodeData(edgeData.source);
            return (sourceNode?.style as any)?.color || (isDark ? '#555' : '#99ADD1');
          },
        } as any,
      },
      layout: {
        type: 'mindmap',
        direction,
        preLayout: false,
        getWidth: (nodeData: any) => nodeData.layoutSize?.[0] ?? 120,
        getHeight: (nodeData: any) => nodeData.layoutSize?.[1] ?? 48,
        getHGap: () => 64,
        getVGap: () => 14,
      },
      behaviors: ['drag-canvas'],
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
    zoomTo: (zoom) => graph?.zoomTo(zoom),
    getZoom: () => graph?.getZoom(),
  };
};
