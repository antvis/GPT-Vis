import { createGraph } from '@antv/g6-ssr';
import { type NetworkGraphOptions } from '../type';

export async function NetworkGraph(options: NetworkGraphOptions) {
  const { data, width = 600, height = 400 } = options;

  const graphData = {
    nodes: data.nodes.map((node) => ({ ...node, id: node.name })),
    edges: data.edges.map((edge) => ({ ...edge, id: `${edge.source}-${edge.target}` })),
  };

  return await createGraph({
    data: graphData,
    width: width,
    height: height,
    devicePixelRatio: 3,
    autoFit: 'view',
    padding: 20,
    animation: false,
    node: {
      type: 'circle',
      style: {
        size: 20,
        // @ts-ignore
        labelText: (d) => d.name,
        labelSize: 10,
        labelFontSize: 10,
        labelBackground: true,
      },
    },
    edge: {
      style: {
        // @ts-ignore
        labelText: (d) => d.name,
        labelFontSize: 10,
        labelBackground: true,
        endArrow: true,
      },
      animation: { enter: false },
    },
    layout: {
      type: 'force-atlas2',
      preventOverlap: true,
      kr: 600,
    },
    transforms: ['process-parallel-edges'],
  });
}
