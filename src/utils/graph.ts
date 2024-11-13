// FIXME: 全量导入 G6 模块
import { G6 } from '@ant-design/graphs';
import type { GraphData, TreeGraphData } from '../types';

const { treeToGraphData } = G6;

export function visTreeData2GraphData(data: TreeGraphData) {
  return treeToGraphData(data as unknown as G6.TreeData, {
    getNodeData: (datum, depth) => {
      datum.id = datum.name;
      datum.depth = depth;
      if (!datum.children) return datum as G6.NodeData;
      const { children, ...restDatum } = datum;
      return {
        ...restDatum,
        children: children.map((child) => child.name),
      } as G6.NodeData;
    },
    getEdgeData: (source, target) =>
      ({
        source: source.name,
        target: target.name,
      }) as G6.EdgeData,
  });
}

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
