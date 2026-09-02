/**
 * Common visualization options for all chart components.
 * Defines the container and dimensions for rendering visualizations.
 */
export type VisualizationTheme = 'default' | 'light' | 'dark' | 'academy';

export interface VisualizationOptions {
  container: string | HTMLElement;
  width?: number;
  height?: number;
  theme?: VisualizationTheme; // Theme for visualization (default: 'default', rendered as light)
  wrapper?: boolean; // Whether to show the outer wrapper container (default: false)
  locale?: string; // Locale for user-facing labels and number formatting (default: 'en-US')
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
