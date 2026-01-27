// Tree data transformation utility shared by hierarchical components
import { G6 } from '@ant-design/graphs';

const { treeToGraphData } = G6;

export interface TreeGraphData {
  name: string;
  description?: string;
  children?: TreeGraphData[];
  [key: string]: any;
}

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
