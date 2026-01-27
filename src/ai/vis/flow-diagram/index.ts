import type { FlowGraphOptions, G6 } from '@ant-design/graphs';
import { FlowGraph as ADCFlowGraph, RCNode } from '@ant-design/graphs';
import { createElement, render } from 'preact/compat';
import { visGraphData2GraphData } from '../../util/graph';

const { TextNode } = RCNode;

/**
 * FlowDiagram data type (graph structure)
 */
export type FlowDiagramData = {
  nodes: { name: string }[];
  edges: { source: string; target: string; name?: string }[];
};

/**
 * FlowDiagram initialization options
 */
export interface FlowDiagramOptions {
  container: string | HTMLElement;
  width?: number;
  height?: number;
}

/**
 * FlowDiagram configuration for rendering
 */
export interface FlowDiagramConfig {
  type?: 'flow-diagram';
  data: FlowDiagramData;
}

/**
 * FlowDiagram instance with render and destroy methods
 */
export interface FlowDiagramInstance {
  render: (config: FlowDiagramConfig) => void;
  destroy: () => void;
}

/**
 * Adjust graph configuration based on data characteristics.
 */
function getGraphOptionsByData(data: G6.GraphData): FlowGraphOptions {
  if (isLinearStructure(data))
    return {
      node: {
        style: {
          ports: [
            { placement: 'right' },
            { placement: 'left' },
            { placement: 'top' },
            { placement: 'bottom' },
          ],
        },
      },
      layout: {
        type: 'snake',
        cols: 3,
        rowGap: 40,
      },
    };
  return {};
}

function isLinearStructure(data: G6.GraphData) {
  const { nodes = [], edges = [] } = data;
  const inDegree: { [key: G6.ID]: number } = {};
  const outDegree: { [key: G6.ID]: number } = {};
  const adjList: { [key: G6.ID]: G6.ID[] } = {};

  nodes.forEach((node) => {
    inDegree[node.id] = 0;
    outDegree[node.id] = 0;
    adjList[node.id] = [];
  });

  edges.forEach((edge) => {
    inDegree[edge.target]++;
    outDegree[edge.source]++;
    adjList[edge.source].push(edge.target);
  });

  const visited: Set<G6.ID> = new Set();
  const dfs = (nodeId: G6.ID) => {
    if (visited.has(nodeId)) return;
    visited.add(nodeId);
    adjList[nodeId].forEach(dfs);
  };
  dfs(nodes[0].id);
  if (visited.size !== nodes.length) return false;

  const sourceNodes = nodes.filter((node) => inDegree[node.id] === 0);
  const sinkNodes = nodes.filter((node) => outDegree[node.id] === 0);
  if (sourceNodes.length !== 1 || sinkNodes.length !== 1) return false;

  const middleNodes = nodes.filter((node) => inDegree[node.id] === 1 && outDegree[node.id] === 1);
  if (middleNodes.length !== nodes.length - 2) return false;

  return true;
}

function mergeGraphOptions(
  defaultConfig: FlowGraphOptions,
  dataConfig: FlowGraphOptions,
): FlowGraphOptions {
  const result: FlowGraphOptions = {
    ...defaultConfig,
    ...dataConfig,
    node: {
      ...defaultConfig.node,
      ...dataConfig.node,
      style: {
        ...defaultConfig.node?.style,
        ...dataConfig.node?.style,
      },
    },
  };

  // Only include layout if it exists
  if (defaultConfig.layout || dataConfig.layout) {
    result.layout = {
      ...defaultConfig.layout,
      ...dataConfig.layout,
    } as any;
  }

  return result;
}

/**
 * FlowDiagram using @ant-design/graphs.
 *
 * @example
 * ```ts
 * const flowDiagram = FlowDiagram({
 *   container: '#container',
 *   width: 600,
 *   height: 400,
 * });
 *
 * flowDiagram.render({
 *   type: 'flow-diagram',
 *   data: {
 *     nodes: [
 *       { name: 'Start' },
 *       { name: 'Process' },
 *       { name: 'End' }
 *     ],
 *     edges: [
 *       { source: 'Start', target: 'Process' },
 *       { source: 'Process', target: 'End' }
 *     ]
 *   },
 * });
 *
 * flowDiagram.destroy();
 * ```
 */
export const FlowDiagram = (options: FlowDiagramOptions): FlowDiagramInstance => {
  const container =
    typeof options.container === 'string'
      ? document.querySelector(options.container)
      : options.container;

  if (!container) {
    throw new Error('Container not found');
  }

  const width = options.width || 640;
  const height = options.height || 480;

  const renderComponent = (config: FlowDiagramConfig): void => {
    const { data } = config;

    // Transform data from vis format to G6 format
    const graphData = visGraphData2GraphData(data);

    // Default configuration based on the existing React component
    const defaultConfig: FlowGraphOptions = {
      autoResize: true,
      autoFit: 'view',
      zoomRange: [0.1, 5],
      zoom: 1,
      node: {
        style: {
          component: (d: G6.NodeData) => {
            const isActive = d.states?.includes('active');
            return createElement(TextNode, {
              text: d.id,
              isActive,
              type: 'filled',
              style: {
                fontSize: 12,
              },
              borderWidth: 2,
            });
          },
          size: [140, 32],
        },
      },
      edge: {
        style: {
          endArrow: true,
          labelBackground: true,
          labelMaxLines: 2,
          labelMaxWidth: '40%',
          labelWordWrap: true,
        },
        state: {
          active: {
            halo: false,
            labelWordWrap: false,
            stroke: '#001f98',
          },
        },
      },
      behaviors: [
        'drag-canvas',
        'zoom-canvas',
        {
          type: 'hover-activate-neighbors',
          onHover: (e: G6.IPointerEvent) => {
            e.view.setCursor('pointer');
          },
          onHoverEnd: (e: G6.IPointerEvent) => {
            e.view.setCursor('default');
          },
        },
      ],
    };

    // Configure the flow diagram
    const graphConfig: FlowGraphOptions = {
      data: graphData,
      width,
      height,
      ...mergeGraphOptions(defaultConfig, getGraphOptionsByData(graphData)),
    };

    // Render using Preact compat
    render(createElement(ADCFlowGraph, graphConfig), container as HTMLElement);
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
