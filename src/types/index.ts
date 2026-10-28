import type { ThemeSpec } from './theme';

export type { ChartType, ThemeSpec, ThemeStyle, ThemeTokens } from './theme';

/** Built-in visualization themes supported by GPT-Vis. */
export type VisualizationTheme = 'default' | 'light' | 'dark' | 'academy' | ThemeSpec;

/** Common construction options shared by every visualization. */
export interface VisualizationOptions {
  container: string | HTMLElement;
  width?: number;
  height?: number;
  /** A built-in theme name or reusable ThemeSpec. Defaults to `default`. */
  theme?: VisualizationTheme;
  /** Whether to render the outer wrapper. Defaults to `false`. */
  wrapper?: boolean;
  /** Locale used by user-facing labels and number formatting. */
  locale?: string;
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
