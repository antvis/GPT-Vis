// Import G6 utilities directly from @antv/g6
import { treeToGraphData } from '@antv/g6';
import type { GraphData, TreeGraphData } from '../types';

/**
 * Transform tree data from vis format to G6 format
 */
export function visTreeData2GraphData(data: TreeGraphData) {
  return treeToGraphData(data as any, {
    getNodeData: (datum: any, depth: number) => {
      datum.id = datum.name;
      datum.depth = depth;
      if (!datum.children) return datum;
      const { children, ...restDatum } = datum;
      return {
        ...restDatum,
        children: children.map((child: any) => child.name),
      };
    },
    getEdgeData: (source: any, target: any) => ({
      source: source.name,
      target: target.name,
    }),
  });
}

/**
 * Transform graph data from vis format to G6 format
 */
export function visGraphData2GraphData(data: GraphData) {
  return {
    nodes: data.nodes.map((node) => ({
      id: node.name,
      style: { labelText: node.name },
    })),
    edges: data.edges.map((edge) => ({
      source: edge.source,
      target: edge.target,
      style: { labelText: edge.name },
    })),
  };
}
