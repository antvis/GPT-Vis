import { Graph } from '@antv/g6';
import type { VisualizationOptions } from '../../types';
import { visGraphData2GraphData } from '../../util/graph';

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
 * NetworkGraph using G6.
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
 *       { name: 'Node A' },
 *       { name: 'Node B' },
 *       { name: 'Node C' }
 *     ],
 *     edges: [
 *       { source: 'Node A', target: 'Node B' },
 *       { source: 'Node B', target: 'Node C' }
 *     ]
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

  const render = (config: NetworkGraphConfig): void => {
    const { data } = config;

    // Clean up previous graph if exists
    if (graph) {
      graph.destroy();
    }

    // Transform data from vis format to G6 format
    const graphData = visGraphData2GraphData(data);

    // Configure the network graph using G6
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
        style: {
          size: 28,
          labelFontSize: 10,
          labelBackground: true,
        },
        animation: {
          enter: false,
        },
      },
      edge: {
        style: {
          labelFontSize: 10,
          labelBackground: true,
          endArrow: true,
        },
        animation: { enter: false },
      },
      behaviors: [
        'drag-canvas',
        'zoom-canvas',
        { key: 'hover-activate', type: 'hover-activate', degree: 1 },
      ],
      transforms: ['process-parallel-edges'],
      layout: {
        type: 'force',
        animation: false,
      },
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
