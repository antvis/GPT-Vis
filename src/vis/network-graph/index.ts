import { Graph } from '@antv/g6';
import {
  adaptG6ElementStyle,
  adaptG6Title,
  getG6TitlePadding,
  resolveG6ChartTheme,
} from '../../theme';
import { getBackgroundColor, normalizePalette } from '../../theme/builtins';
import type {
  GraphData,
  NetworkGraphChartStyle,
  ThemeInput,
  VisualizationOptions,
} from '../../types';

export type NetworkGraphNode = GraphData['nodes'][number];
export type NetworkGraphEdge = GraphData['edges'][number];
export type NetworkGraphData = GraphData;

/**
 * NetworkGraphConfig defines the configuration for rendering the network graph.
 */
export interface NetworkGraphConfig {
  type?: 'network-graph';
  data: NetworkGraphData;
  layout?: 'force' | 'circular' | 'grid' | 'radial' | 'concentric' | 'dagre';
  theme?: ThemeInput;
  title?: string;
  subtitle?: string;
  style?: NetworkGraphChartStyle;
}

/**
 * NetworkGraphInstance represents a network graph instance with render and destroy methods.
 */
export interface NetworkGraphInstance {
  render: (config: NetworkGraphConfig) => void;
  destroy: () => void;
  zoomTo: (zoom: number) => void;
  getZoom: () => number | undefined;
}

/**
 * NetworkGraph component using G6 5.0.
 *
 * @example
 * ```ts
 * const graph = NetworkGraph({
 *   container: '#container',
 *   width: 600,
 *   height: 400,
 * });
 *
 * graph.render({
 *   type: 'network-graph',
 *   data: {
 *     nodes: [
 *       { name: '哈利·波特' },
 *       { name: '赫敏·格兰杰' },
 *       { name: '伏地魔' },
 *     ],
 *     edges: [
 *       { source: '哈利·波特', target: '赫敏·格兰杰', name: '朋友' },
 *       { source: '哈利·波特', target: '伏地魔', name: '敌人' },
 *     ],
 *   },
 *   layout: 'force',
 *   theme: 'academy',
 * });
 *
 * graph.destroy();
 * ```
 */
export const NetworkGraph = (options: VisualizationOptions): NetworkGraphInstance => {
  const { container, width, height, theme: chartTheme = 'default' } = options;
  let graph: Graph | null = null;

  /**
   * Render the network graph with the given configuration.
   */
  const render = (config: NetworkGraphConfig): void => {
    const {
      data = { nodes: [], edges: [] },
      layout = 'force',
      theme = chartTheme,
      title,
      subtitle,
      style: localStyle = {},
    } = config;

    const { nodes = [], edges = [] } = data;

    // Clean up previous graph if exists
    if (graph) {
      graph.destroy();
      graph = null;
    }

    const { baseTheme, rendererTheme, style } = resolveG6ChartTheme('network-graph', theme, {
      style: localStyle,
    });
    const colors = normalizePalette(style.palette, baseTheme);
    const backgroundColor = style.backgroundColor || getBackgroundColor(baseTheme);
    const isDark = baseTheme === 'dark';
    const nodeTheme = adaptG6ElementStyle('node', {}, style.node);
    const edgeTheme = adaptG6ElementStyle('edge', {}, style.edge);

    const containerEl =
      typeof container === 'string' ? document.querySelector<HTMLElement>(container) : container;

    if (!containerEl) {
      throw new Error('NetworkGraph: container element not found');
    }

    // Clear previous content
    containerEl.innerHTML = '';

    // Set container styles
    containerEl.style.background = backgroundColor;
    containerEl.style.borderRadius = '4px';
    containerEl.style.overflow = 'hidden';

    // Build G6 node data
    const nodeData = nodes.map((node, index) => ({
      id: node.name,
      data: { label: node.name },
      style: {
        fill: colors[index % colors.length],
        stroke: isDark ? '#444' : '#fff',
        lineWidth: 2,
        labelFill: isDark ? '#e0e0e0' : '#333',
        labelFontSize: 12,
        ...nodeTheme.style,
        size: 28,
        labelText: node.name,
      },
    }));

    // Build G6 edge data
    const edgeData = edges.map((edge) => ({
      source: edge.source,
      target: edge.target,
      data: { label: edge.name ?? '' },
      style: {
        stroke: isDark ? '#555' : '#ccc',
        lineWidth: 1.5,
        endArrow: true,
        labelFill: isDark ? '#aaa' : '#666',
        labelFontSize: 11,
        labelBackground: !!edge.name,
        labelBackgroundFill: backgroundColor,
        labelBackgroundOpacity: 0.8,
        ...edgeTheme.style,
        labelText: edge.name ?? '',
      },
    }));

    // Layout configuration.
    // IMPORTANT for 'force' layout:
    //   - edgeStrength default is 500 (edge attraction), NOT a small decimal
    //   - nodeStrength default is 1000 (node attraction); Coulomb repulsion is
    //     handled separately via factor/coulombDisScale, so no need for negative value
    //   - gravity keeps nodes near center so they don't drift off canvas
    const layoutConfig: Record<string, any> = {
      force: {
        type: 'force',
        preventOverlap: true,
        nodeSize: 32,
        linkDistance: 150,
        gravity: 10,
      },
      circular: {
        type: 'circular',
      },
      grid: {
        type: 'grid',
        rows: Math.max(1, Math.ceil(Math.sqrt(nodes.length))),
      },
      radial: {
        type: 'radial',
        preventOverlap: true,
        nodeSize: 32,
      },
      concentric: {
        type: 'concentric',
        preventOverlap: true,
        nodeSize: 32,
      },
      dagre: {
        type: 'dagre',
        rankdir: 'TB',
        nodesep: 50,
        ranksep: 80,
      },
    };

    // G6 v5 source confirms: autoFit is called AFTER postLayout() completes
    // (see runtime/graph.ts render() method), so autoFit: 'view' is safe here.
    graph = new Graph({
      animation: false,
      container: containerEl,
      width,
      height,
      autoFit: 'view',
      autoResize: true,
      theme: rendererTheme,
      padding: getG6TitlePadding(title, subtitle, style.title),
      data: {
        nodes: nodeData,
        edges: edgeData,
      },
      layout: layoutConfig[layout] || layoutConfig.force,
      node: {
        type: nodeTheme.type ?? 'circle',
        style: {
          labelPlacement: 'bottom',
          labelMaxWidth: 100,
        },
      },
      edge: {
        type: edgeTheme.type ?? 'line',
      },
      behaviors: ['drag-canvas', 'drag-element', 'click-select'],
      plugins: adaptG6Title(title, subtitle, style.title, {
        titleFill: isDark ? '#e0e6ed' : '#000',
        titleFontFamily: 'sans-serif',
      }),
    });

    graph.render();
  };

  /**
   * Destroy the graph instance and clean up resources.
   */
  const destroy = (): void => {
    if (graph) {
      graph.destroy();
      graph = null;
    }
  };

  /**
   * Zoom the graph to a specific level (for wrapper zoom controls).
   */
  const zoomTo = (zoom: number): void => {
    if (graph) {
      graph.zoomTo(zoom);
    }
  };

  /**
   * Get the current zoom level.
   */
  const getZoom = (): number => {
    if (graph) {
      return graph.getZoom();
    }
    return 1;
  };

  return {
    render,
    destroy,
    zoomTo,
    getZoom,
  };
};
