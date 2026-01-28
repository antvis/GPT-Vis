import { Graph } from '@antv/g6';
import type { VisualizationOptions } from '../../types';
import { visGraphData2GraphData } from '../../util/graph';
import { renderFlowTextNode } from '../../util/nodes';

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
        type: 'html',
        style: {
          size: [140, 32],
          innerHTML: (d: any) => {
            const isActive = d.states?.includes('active') || false;
            return renderFlowTextNode({
              text: d.id,
              isActive,
            });
          },
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
          stroke: '#e2e2e2',
          lineWidth: 1,
          endArrow: true,
          labelText: (d: any) => d.style?.labelText || '',
          labelFontSize: 10,
          labelBackground: true,
          labelBackgroundFill: '#fff',
          labelBackgroundOpacity: 0.8,
          labelBackgroundRadius: 2,
          labelPadding: [2, 4],
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
