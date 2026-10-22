import type { FontWeight } from './style';

/**
 * High-frequency seed tokens for authoring a GPT-Vis theme.
 *
 * Names reuse G2, G6 and T8 terminology where it is stable and semantic.
 * Renderer adapters expand these seeds into concrete component and mark styles.
 */
export interface ThemeSeedTokens {
  /** Primary series or emphasis color. Matches G2's seed token name. */
  colorDefault?: string;
  /** Canvas background. Matches G2's seed token name. */
  colorBackground?: string;
  /** Raised surfaces such as tables, cards and tooltips. */
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
  fontWeight?: FontWeight;
  /** Base line height in pixels. Matches T8's seed token name. */
  lineHeight?: number;

  /** Small spacing step. Matches G2's seed token name. */
  padding1?: number;
  /** Medium spacing step. Matches G2's seed token name. */
  padding2?: number;

  /** Default mark and structural line width. */
  lineWidth?: number;
  /** Default corner radius for intervals, nodes and surfaces. */
  radius?: number;
}
