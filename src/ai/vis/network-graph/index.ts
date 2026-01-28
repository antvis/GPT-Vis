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

  const renderComponent = (config: NetworkGraphConfig): void => {
    const { data } = config;

    // Transform data from vis format to G6 format
    const graphData = visGraphData2GraphData(data);

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
      zoomRange: [0.1, 5],
      zoom: 1,
      node: {
        type: 'circle',
        style: {
          size: 28,
          fill: '#5B8FF9',
          stroke: '#fff',
          lineWidth: 2,
          labelText: (d: any) => d.id,
          labelFontSize: 10,
          labelBackground: true,
          labelBackgroundFill: '#fff',
          labelBackgroundOpacity: 0.8,
          labelBackgroundRadius: 2,
          labelPadding: [2, 4],
        },
      },
      edge: {
        type: 'line',
        style: {
          stroke: '#e2e2e2',
          lineWidth: 1,
          labelText: (d: any) => d.style?.labelText || '',
          labelFontSize: 10,
          labelBackground: true,
          labelBackgroundFill: '#fff',
          labelBackgroundOpacity: 0.8,
          labelBackgroundRadius: 2,
          labelPadding: [2, 4],
          endArrow: true,
        },
      },
      layout: {
        type: 'd3-force',
        link: {
          distance: 128,
        },
        collide: {
          radius: 32,
        },
        manyBody: {
          strength: -704,
        },
        x: {},
        y: {},
      },
      behaviors: [
        'drag-canvas',
        'zoom-canvas',
        {
          type: 'hover-activate',
          degree: 1,
        },
      ],
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
