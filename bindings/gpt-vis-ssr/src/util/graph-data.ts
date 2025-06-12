import { G6 } from '@antv/g6-ssr';
const { treeToGraphData: treeToGraphDataG6 } = G6;

type TreeGraphData = {
  name: string;
  children?: TreeGraphData[];
  [key: string]: any;
};

/**
 * Converts a tree structure to a graph data format suitable for G6 visualization.
 * The function transforms each node in the tree to a graph node and each parent-child relationship to a graph edge.
 * @param data
 *
 * type TreeGraphData = {
 *   name: string;
 *   children?: TreeGraphData[];
 *   [key: string]: any;
 * };
 * @returns
 */
export function treeToGraphData(data: any) {
  return treeToGraphDataG6(data as any, {
    getNodeData: (datum: any, depth: any) => {
      const { children, ...restDatum } = datum;
      return {
        id: datum.name,
        depth,
        data: {
          depth,
          ...restDatum,
        },
      };
    },
    getEdgeData: (source, target) => ({
      source: source.name,
      target: target.name,
    }),
  });
}
