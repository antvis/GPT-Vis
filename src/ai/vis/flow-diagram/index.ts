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
 * Detect if graph has linear structure
 */
function isLinearStructure(data: any) {
  const { nodes = [], edges = [] } = data;
  if (nodes.length === 0) return false;

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
 * FlowDiagram using @antv/g6 directly.
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

  const renderComponent = (config: FlowDiagramConfig): void => {
    const { data } = config;

    // Transform data from vis format to G6 format
    const graphData = visGraphData2GraphData(data);

    // Destroy existing graph if any
    if (graph) {
      graph.destroy();
    }

    // Detect layout type based on structure
    const isLinear = isLinearStructure(graphData);
    const layoutConfig = isLinear
      ? {
          type: 'snake',
          cols: 3,
          rowGap: 40,
        }
      : {
          type: 'dagre',
          rankdir: 'TB',
          nodesep: 40,
          ranksep: 60,
        };

    // Create G6 graph
    graph = new Graph({
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
          size: [120, 40],
          radius: 8,
          fill: '#5B8FF9',
          stroke: '#5B8FF9',
          lineWidth: 2,
          labelText: (d: any) => d.id,
          labelFontSize: 14,
          labelFill: '#fff',
          labelPlacement: 'center',
          ports: [
            { placement: 'right' },
            { placement: 'left' },
            { placement: 'top' },
            { placement: 'bottom' },
          ],
        },
      },
      edge: {
        type: 'polyline',
        style: {
          stroke: '#99ADD1',
          lineWidth: 2,
          endArrow: true,
          endArrowSize: 8,
          radius: 8,
          labelText: (d: any) => d.style?.labelText || '',
          labelFontSize: 12,
          labelFill: '#000',
          labelBackground: true,
          labelBackgroundFill: '#fff',
          labelBackgroundOpacity: 0.9,
          labelBackgroundRadius: 4,
          labelPadding: [4, 8],
          labelMaxLines: 2,
          labelMaxWidth: '80%',
          labelWordWrap: true,
        },
        state: {
          active: {
            halo: false,
            labelWordWrap: false,
            stroke: '#1890ff',
          },
        },
      },
      layout: layoutConfig,
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
