import type { NetworkGraphOptions as ADCNetworkGraphOptions } from '@ant-design/graphs';
import { NetworkGraph as ADCNetworkGraph } from '@ant-design/graphs';
import { createElement, render } from 'preact/compat';
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
 * NetworkGraph using @ant-design/graphs.
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

  const renderComponent = (config: NetworkGraphConfig): void => {
    const { data } = config;

    // Transform data from vis format to G6 format
    const graphData = visGraphData2GraphData(data);

    // Configure the network graph based on the existing React component
    const graphConfig: ADCNetworkGraphOptions = {
      data: graphData,
      autoFit: 'view',
      autoResize: true,
      zoomRange: [0.3, 2],
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
      transforms: (prev: any) => [...prev, 'process-parallel-edges'],
      layout: {
        type: 'force',
        animation: false,
      },
    };

    // Render using Preact compat
    render(createElement(ADCNetworkGraph, graphConfig), container as HTMLElement);
  };

  const destroy = (): void => {
    // Clean up by rendering null
    render(null, container as HTMLElement);
  };

  return {
    render: renderComponent,
    destroy,
  };
};
