import type { FlowGraphOptions, G6 } from '@ant-design/graphs';

/**
 * Adjust graph configuration based on data characteristics.
 * @param data - graph data
 * @returns graph options
 */
export function getGraphOptionsByData(data: G6.GraphData): FlowGraphOptions {
  if (isLinearStructure(data))
    return {
      node: {
        style: {
          ports: [
            { placement: 'right' },
            { placement: 'left' },
            { placement: 'top' },
            { placement: 'bottom' },
          ],
        },
      },
      layout: {
        type: 'snake',
        cols: 3,
        rowGap: 40,
      },
    };
  return {};
}

function isLinearStructure(data: G6.GraphData) {
  const { nodes = [], edges = [] } = data;
  const inDegree: { [key: G6.ID]: number } = {};
  const outDegree: { [key: G6.ID]: number } = {};
  const adjList: { [key: G6.ID]: G6.ID[] } = {};

  nodes.forEach((node) => {
    inDegree[node.id] = 0;
    outDegree[node.id] = 0;
    adjList[node.id] = [];
  });

  edges.forEach((edge) => {
    inDegree[edge.target]++;
    outDegree[edge.source]++;
    adjList[edge.source].push(edge.target);
  });

  // 检查图是否连通
  // Check if the graph is connected
  const visited: Set<G6.ID> = new Set();
  const dfs = (nodeId: G6.ID) => {
    if (visited.has(nodeId)) return;
    visited.add(nodeId);
    adjList[nodeId].forEach(dfs);
  };
  dfs(nodes[0].id);
  if (visited.size !== nodes.length) return false;

  // 检查是否有且仅有一个源节点和一个汇节点
  // Check if there is exactly one source node and one sink node
  const sourceNodes = nodes.filter((node) => inDegree[node.id] === 0);
  const sinkNodes = nodes.filter((node) => outDegree[node.id] === 0);
  if (sourceNodes.length !== 1 || sinkNodes.length !== 1) return false;

  // 检查中间节点是否只有一个前驱和一个后继
  // Check if the middle nodes have only one predecessor and one successor
  const middleNodes = nodes.filter((node) => inDegree[node.id] === 1 && outDegree[node.id] === 1);
  if (middleNodes.length !== nodes.length - 2) return false;

  return true;
}
