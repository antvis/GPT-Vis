import { createGraph } from '@antv/g6-ssr';
import { type FlowDiagramProps } from '../export';
import { type BaseChartConfig } from './type';

export type FlowDiagramOptions = BaseChartConfig & { type: 'flow-diagram' } & FlowDiagramProps;

export async function FlowDiagram(options: FlowDiagramOptions) {
  const { data, width = 600, height = 400 } = options;

  const graphData = {
    nodes: data.nodes.map((node) => ({ ...node, id: node.name })),
    edges: data.edges.map((edge) => ({ ...edge, id: `${edge.source}-${edge.target}` })),
  };

  return await createGraph({
    data: graphData,
    width,
    height,
    devicePixelRatio: 3,
    autoFit: 'view',
    padding: 20,
    animation: false,
    node: {
      type: 'rect',
      style: {
        size: (d: any) => [d.name.length * 15 + 30, 35],
        radius: 6,
        // @ts-ignore
        iconText: (d) => d.name,
        iconFontSize: 12,
        iconFontWeight: 800,
      },
    },
    edge: {
      type: 'polyline',
      style: {
        lineWidth: 2,
        radius: 10,
        stroke: '#99ADD1',
        endArrow: true,
        // @ts-ignore
        labelText: (d) => d.name,
        labelFill: '#555555',
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
    },
  });
}
