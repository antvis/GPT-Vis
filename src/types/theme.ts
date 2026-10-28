export type ChartType =
  | 'area'
  | 'bar'
  | 'boxplot'
  | 'column'
  | 'dual-axes'
  | 'fishbone-diagram'
  | 'flow-diagram'
  | 'funnel'
  | 'histogram'
  | 'indented-tree'
  | 'line'
  | 'liquid'
  | 'mindmap'
  | 'network-graph'
  | 'organization-chart'
  | 'pie'
  | 'radar'
  | 'sankey'
  | 'scatter'
  | 'summary'
  | 'table'
  | 'treemap'
  | 'venn'
  | 'violin'
  | 'waterfall'
  | 'word-cloud';

/** Reusable visual theme. Local chart config takes precedence over this spec. */
export interface ThemeSpec {
  /** Stable identifier; does not register a theme name. */
  id: string;
  /** Human-readable theme name. */
  label: string;
  description?: string;
  baseTheme?: string;
  tokens?: ThemeTokens;
  /** Shared visual overrides, applied after token expansion. */
  style?: ThemeStyle;
  /** Additional visual overrides for individual chart types. */
  charts?: Partial<Record<ChartType, { style?: ThemeStyle }>>;
}

/**
 * Visual style namespaces. Each adapter consumes the supported appearance fields;
 * data, layout and behavior remain part of the chart configuration.
 */
export interface ThemeStyle {
  backgroundColor?: string;
  palette?: string[];
  title?: Record<string, unknown>;
  axis?: Record<string, unknown>;
  legend?: Record<string, unknown>;
  label?: Record<string, unknown>;
  mark?: {
    line?: Record<string, unknown>;
    area?: Record<string, unknown>;
    point?: Record<string, unknown>;
    interval?: Record<string, unknown>;
    box?: Record<string, unknown>;
    connector?: Record<string, unknown>;
    path?: Record<string, unknown>;
    density?: Record<string, unknown>;
    link?: Record<string, unknown>;
    liquid?: Record<string, unknown>;
    treemap?: Record<string, unknown>;
    sankey?: Record<string, unknown>;
    wordCloud?: Record<string, unknown>;
  };
  node?: Record<string, unknown>;
  edge?: Record<string, unknown>;
  table?: {
    header?: Record<string, unknown>;
    cell?: Record<string, unknown>;
    border?: Record<string, unknown>;
  };
  summary?: Record<string, unknown>;
  /** Fishbone drawing texture. */
  texture?: 'rough' | 'default';
  /** @deprecated Line, Area and Radar: use `mark.line.lineWidth`. */
  lineWidth?: number;
}

/**
 * High-frequency seed tokens for authoring a GPT-Vis theme.
 *
 * Names reuse G2, G6 and T8 terminology where it is stable and semantic.
 * Renderer adapters expand these seeds into concrete component and mark styles.
 */
export interface ThemeTokens {
  /** Primary series or emphasis color. Matches G2's seed token name. */
  colorDefault?: string;
  /** Canvas background. Matches G2's seed token name. */
  colorBackground?: string;
  /** Table/Liquid surfaces and existing tooltip backgrounds. */
  colorSurface?: string;
  /** Primary text color across G2 components, G6 labels, Table and T8. */
  colorText?: string;
  /** Secondary text used by subtitles, axes and supporting copy. */
  colorTextSecondary?: string;
  /** Text displayed on a contrasting filled surface. */
  colorTextInverse?: string;
  /**
   * Base structural stroke color. The resolver derives axes, grids, borders,
   * nodes and edges from this value. The name matches G2's seed token.
   */
  colorStroke?: string;
  /** Positive semantic color. Matches T8's seed token name. */
  colorPositive?: string;
  /** Negative semantic color. Matches T8's seed token name. */
  colorNegative?: string;
  /** Neutral semantic color for unchanged or unknown status. */
  colorNeutral?: string;

  /** Primary categorical palette. Matches G2's theme field and seed token name. */
  category10?: string[];
  /** Extended categorical palette. Matches G2's theme field and seed token name. */
  category20?: string[];

  /** Base font family. Matches T8 and renderer text style names. */
  fontFamily?: string;
  /** Base font size in pixels. Matches T8 and renderer text style names. */
  fontSize?: number;
  /** Base font weight. Matches renderer text style names. */
  fontWeight?: number | 'normal' | 'bold';
  /** Line height in pixels for G2 labels/legend text, Summary and existing tooltips. */
  lineHeight?: number;

  /** Compact gap in pixels: axis labels, legend spacing and tooltip vertical padding. */
  spacingSmall?: number;
  /** Roomier gap in pixels: title/subtitle, axes, legends, table cells and tooltip horizontal padding. */
  spacingMedium?: number;

  /** Default mark and structural line width. */
  lineWidth?: number;
  /** Default corner radius for intervals, nodes and surfaces. */
  radius?: number;
}
