/** Built-in visualization themes supported by GPT-Vis. */
export type VisualizationTheme = 'default' | 'light' | 'dark' | 'academy';

/** Tree-shaped data shared by hierarchy visualizations. */
export interface TreeGraphData {
  name: string;
  description?: string;
  children?: TreeGraphData[];
}

/** Name-based graph data accepted by relationship visualizations. */
export interface GraphData {
  nodes: { name: string }[];
  edges: { source: string; target: string; name?: string }[];
}
