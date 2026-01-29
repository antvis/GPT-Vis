import { Graph } from '@antv/g6';
import type { VisualizationOptions } from '../../types';

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

const MAX_WIDTH = 110;

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
 *       { name: '客户咨询' },
 *       { name: '判断问题类型' },
 *       { name: '技术问题' },
 *     ],
 *     edges: [
 *       { source: '客户咨询', target: '判断问题类型' },
 *       { source: '判断问题类型', target: '技术问题' },
 *     ],
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

    // Create G6 graph with dagre layout
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
        type: 'rect',
        style: {
          size: [110, 38],
          radius: 6,
          fill: '#5B8FF9',
          stroke: '#5B8FF9',
          lineWidth: 2,
          iconText: (d: any) => d.name || '',
          iconFontSize: 12,
          iconFontWeight: 800,
          iconFill: '#fff',
          iconWordWrapWidth: MAX_WIDTH - 5,
          iconTextOverflow: 'ellipsis',
          iconWordWrap: true,
          iconMaxLines: 2,
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
          radius: 10,
          labelText: (d: any) => d.name || '',
          labelFontWeight: 800,
          labelBackground: true,
          labelBackgroundFill: 'rgba(255,255,255,0.6)',
          labelBackgroundOpacity: 1,
          labelBackgroundLineWidth: 2,
          labelPadding: [2, 5],
          labelBackgroundRadius: 2,
          router: {
            type: 'orth',
          },
        },
      },
      layout: {
        type: 'dagre',
        rankdir: 'LR',
        ranksep: 88,
        nodesep: 60,
      },
      behaviors: ['drag-canvas', 'zoom-canvas'],
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
