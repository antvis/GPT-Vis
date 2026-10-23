import type { ThemeInput } from './theme';

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
