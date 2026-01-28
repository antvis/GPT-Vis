import { Graph } from '@antv/g6';
import type { VisualizationOptions } from '../../types';
import { visGraphData2GraphData } from '../../util/graph';

/**
 * FlowDiagram data type (graph structure)
 */
export type FlowDiagramData = {
  nodes: { name: string }[];
  edges: { source: string; target: string; name?: string }[];
};

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
function isLinearStructure(data: { nodes: any[]; edges: any[] }) {
  const { nodes = [], edges = [] } = data;
  const inDegree: { [key: string]: number } = {};
  const outDegree: { [key: string]: number } = {};
  const adjList: { [key: string]: string[] } = {};

  nodes.forEach((node: any) => {
    inDegree[node.id] = 0;
    outDegree[node.id] = 0;
    adjList[node.id] = [];
  });

  edges.forEach((edge: any) => {
    inDegree[edge.target]++;
    outDegree[edge.source]++;
    adjList[edge.source].push(edge.target);
  });

  const visited: Set<string> = new Set();
  const dfs = (nodeId: string) => {
    if (visited.has(nodeId)) return;
    visited.add(nodeId);
    adjList[nodeId].forEach(dfs);
  };
  dfs(nodes[0].id);
  if (visited.size !== nodes.length) return false;

  const sourceNodes = nodes.filter((node: any) => inDegree[node.id] === 0);
  const sinkNodes = nodes.filter((node: any) => outDegree[node.id] === 0);
  if (sourceNodes.length !== 1 || sinkNodes.length !== 1) return false;

  const middleNodes = nodes.filter(
    (node: any) => inDegree[node.id] === 1 && outDegree[node.id] === 1,
  );
  if (middleNodes.length !== nodes.length - 2) return false;

  return true;
}

/**
 * FlowDiagram using G6.
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
export const FlowDiagram = (options: VisualizationOptions): FlowDiagramInstance => {
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

  const render = (config: FlowDiagramConfig): void => {
    const { data } = config;

    // Clean up previous graph if exists
    if (graph) {
      graph.destroy();
    }

    // Transform data from vis format to G6 format
    const graphData = visGraphData2GraphData(data);

    // Check if it's a linear structure
    const isLinear = isLinearStructure(graphData);

    // Configure the flow diagram using G6
    const graphConfig: any = {
      container: container as HTMLElement,
      width,
      height,
      data: graphData,
      autoResize: true,
      autoFit: 'view',
      zoomRange: [0.1, 5],
      zoom: 1,
      node: {
        type: 'rect',
        style: {
          size: [140, 32],
          radius: 4,
          labelText: (d: any) => d.id,
          labelPlacement: 'center',
          labelFontSize: 12,
          labelFill: '#000',
          fill: '#5B8FF9',
          stroke: '#5B8FF9',
          lineWidth: 2,
          ports: [
            { placement: 'right' },
            { placement: 'left' },
            { placement: 'top' },
            { placement: 'bottom' },
          ],
        },
        state: {
          active: {
            fill: '#40a9ff',
            stroke: '#40a9ff',
          },
        },
      },
      edge: {
        type: 'polyline',
        style: {
          endArrow: true,
          labelBackground: true,
          labelMaxLines: 2,
          labelMaxWidth: '40%',
          labelWordWrap: true,
          labelFontSize: 12,
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
          onHover: (e: any) => {
            e.view.setCursor('pointer');
          },
          onHoverEnd: (e: any) => {
            e.view.setCursor('default');
          },
        },
      ],
      transforms: ['transform-v4-data'],
      animation: false,
    };

    // Apply linear layout if detected
    if (isLinear) {
      graphConfig.layout = {
        type: 'grid',
        cols: 3,
        rows: Math.ceil(graphData.nodes.length / 3),
        sortBy: 'topology',
        begin: [20, 20],
        nodeSize: [140, 32],
      };
    } else {
      graphConfig.layout = {
        type: 'dagre',
        rankdir: 'LR',
        nodesep: 30,
        ranksep: 60,
      };
    }

    graph = new Graph(graphConfig);
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
