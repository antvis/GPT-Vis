import { Graph } from '@antv/g6';
import type { VisualizationOptions } from '../../types';

/**
 * NetworkGraph data type (graph structure)
 */
export type NetworkGraphData = {
  nodes: { name: string }[];
  edges: { source: string; target: string; name?: string }[];
};

/**
 * NetworkGraph configuration for rendering
 */
export interface NetworkGraphConfig {
  type?: 'network-graph';
  data: NetworkGraphData;
}

/**
 * NetworkGraph instance with render and destroy methods
 */
export interface NetworkGraphInstance {
  render: (config: NetworkGraphConfig) => void;
  destroy: () => void;
}

/**
 * NetworkGraph using @antv/g6 directly.
 *
 * @example
 * ```ts
 * const networkGraph = NetworkGraph({
 *   container: '#container',
 *   width: 600,
 *   height: 400,
 * });
 *
 * networkGraph.render({
 *   type: 'network-graph',
 *   data: {
 *     nodes: [
 *       { name: '哈利·波特' },
 *       { name: '赫敏·格兰杰' },
 *     ],
 *     edges: [
 *       { source: '哈利·波特', target: '赫敏·格兰杰', name: '朋友' },
 *     ],
 *   },
 * });
 *
 * networkGraph.destroy();
 * ```
 */
export const NetworkGraph = (options: VisualizationOptions): NetworkGraphInstance => {
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

  const renderComponent = (config: NetworkGraphConfig): void => {
    const { data } = config;

    // Transform data from vis format to G6 format
    const graphData = {
      nodes: data.nodes.map((node) => ({ ...node, id: node.name })),
      edges: data.edges.map((edge) => ({
        ...edge,
        id: `${edge.source}-${edge.target}`,
      })),
    };

    // Destroy existing graph if any
    if (graph) {
      graph.destroy();
    }

    // Create G6 graph with force layout
    graph = new Graph({
      container: container as HTMLElement,
      width,
      height,
      data: graphData,
      autoFit: 'view',
      autoResize: true,
      padding: 20,
      animation: false,
      node: {
        type: 'circle',
        style: {
          size: 60,
          fill: '#5B8FF9',
          stroke: '#fff',
          lineWidth: 3,
          labelText: (d: any) => d.id,
          labelFontSize: 14,
          labelPlacement: 'bottom',
          labelOffsetY: 10,
          labelFill: '#000',
        },
      },
      edge: {
        type: 'line',
        style: {
          stroke: '#99ADD1',
          lineWidth: 2,
          endArrow: true,
          endArrowSize: 8,
          labelText: (d: any) => d.name || '',
          labelFontSize: 12,
          labelFill: '#000',
          labelBackground: true,
          labelBackgroundFill: '#fff',
          labelBackgroundOpacity: 0.9,
          labelBackgroundRadius: 4,
          labelPadding: [4, 8],
        },
      },
      layout: {
        type: 'd3-force',
        preventOverlap: true,
        nodeStrength: 1000,
        edgeStrength: 200,
      },
      behaviors: ['drag-canvas', 'zoom-canvas', 'hover-activate'],
      transforms: ['process-parallel-edges'],
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
