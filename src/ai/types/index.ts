/**
 * Common visualization options for all chart components.
 * Defines the container and dimensions for rendering visualizations.
 */
export interface VisualizationOptions {
  container: string | HTMLElement;
  width?: number;
  height?: number;
}

/**
 * Tree graph data structure
 */
export interface TreeGraphData {
  name: string;
  description?: string; // For OrganizationChart
  children?: TreeGraphData[];
}

/**
 * Network graph data structure
 */
export interface GraphData {
  nodes: { name: string }[];
  edges: { source: string; target: string; name?: string }[];
}
