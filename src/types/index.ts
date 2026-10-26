import type { ThemeInput } from './theme';

export type { ChartType, ThemeInput, ThemeSeedTokens, ThemeSpec, ThemeStyle } from './theme';

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

/** Common construction options shared by every visualization. */
export interface VisualizationOptions {
  container: string | HTMLElement;
  width?: number;
  height?: number;
  /** A built-in theme name or reusable ThemeSpec. Defaults to `default`. */
  theme?: ThemeInput;
  /** Whether to render the outer wrapper. Defaults to `false`. */
  wrapper?: boolean;
  /** Locale used by user-facing labels and number formatting. */
  locale?: string;
}
