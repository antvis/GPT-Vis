/**
 * Shared annotation API. Current chart support is listed in the visualization Skill.
 * Like themes, public configuration describes intent. Each renderer implements
 * applicable annotations using its own drawing, layout and native configuration.
 * Analysis results and conversions from external systems remain outside this API.
 */

/**
 * Logical encoding channel, before coordinate transforms.
 * For a horizontal bar chart, x is still category and y is still value.
 */
export type AnnotationAxis = 'x' | 'y';

/** An original category, time or numeric axis value, never a pixel position. */
export type AnnotationValue = string | number;

/**
 * Match original data fields by exact equality. Every supplied field must match.
 * Supply at least one field; include `group` when needed to distinguish series.
 * References use field values rather than array indexes, so sorting is safe.
 * Renderers resolve these fields against original chart data: statistical data
 * items, graph nodes or edges, or table rows. Callers do not specify an element
 * kind or use generated renderer IDs. Ambiguous references need explicit handling
 * in the renderer rather than an arbitrary node/edge choice.
 *
 * @example { time: 'Q2', group: 'East' }
 * @example { category: 'Product A' }
 * @example { x: 10, y: 25 }
 * @example { name: 'Service A' }
 * @example { source: 'Service A', target: 'Service B' }
 * @example { region: 'East' }
 */
export type AnnotationDataReference = Record<string, AnnotationValue | boolean | null>;

/** Shared annotation text. Each renderer owns its placement and layout. */
export interface AnnotationLabel {
  /** Caller-provided text, including any units or computed statistics. */
  text: string;
  /** Optional text paint overrides; omitted values come from the chart theme. */
  style?: {
    fill?: string;
    fontSize?: number;
    fontWeight?: number | 'normal' | 'bold';
  };
}

/**
 * Shared paint overrides. Names reuse the existing theme style vocabulary;
 * renderers translate them into mark styles, graph styles, CSS or text styles.
 * These apply to the annotation visual; label.style controls its explanatory text.
 * Only attributes meaningful for the rendered visual are applicable.
 */
export interface AnnotationStyle {
  fill?: string;
  stroke?: string;
  lineWidth?: number;
  lineDash?: number[];
  /** Opacity from 0 to 1. */
  opacity?: number;
}

/** Shared annotation fields. Omitted appearance values follow the chart theme. */
export interface BaseAnnotation {
  /** Optional annotation identity, unique within one chart. */
  id?: string;
  label?: AnnotationLabel;
  style?: AnnotationStyle;
}

/**
 * Persistent emphasis, independent of hover or selection. Each renderer chooses
 * how to emphasize the matched content and arrange any supplied explanatory text.
 *
 * - data only: emphasize every item matching any reference (OR across references).
 * - fields only: emphasize the specified fields across the data.
 * - data and fields: emphasize those fields within the matching items.
 *
 * In Table these correspond to rows, columns and cells. Each renderer translates
 * supported combinations into its own visual representation; not every chart
 * supports field-level emphasis. Supplied arrays must be non-empty. An empty
 * data array does not mean "all data". Fields use original keys, not column indexes.
 *
 * @example
 * { type: 'highlight', data: [{ category: 'Product A' }] }
 * @example
 * { type: 'highlight', data: [{ name: 'Service A' }] }
 * @example
 * { type: 'highlight', data: [{ source: 'Service A', target: 'Service B' }] }
 * @example
 * { type: 'highlight', data: [{ region: 'East' }] }
 * @example
 * { type: 'highlight', fields: ['revenue'] }
 * @example
 * { type: 'highlight', data: [{ region: 'East' }], fields: ['revenue'] }
 */
export type HighlightAnnotation = BaseAnnotation & {
  type: 'highlight';
} & (
    | { data: AnnotationDataReference[]; fields?: string[] }
    | { data?: AnnotationDataReference[]; fields: string[] }
  );

/**
 * A localized mark and optional explanation attached to exactly one data item.
 * The renderer decides its appearance: for example, a point on a statistical
 * chart, a graph callout or a table row indicator.
 * Statistical charts anchor to the rendered data position, including stacking.
 *
 * @example
 * {
 *   type: 'point',
 *   data: { time: 'Q2', group: 'East' },
 *   label: { text: 'Peak' },
 * }
 */
export interface PointAnnotation extends BaseAnnotation {
  type: 'point';
  data: AnnotationDataReference;
}

/**
 * A constant reference on one logical axis, spanning the plot's other axis.
 * Values such as a mean or target must be supplied by the caller.
 * Only applicable to charts with the corresponding axis; other renderers do
 * not reinterpret it as an unrelated visual effect.
 *
 * @example
 * { type: 'line', axis: 'y', value: 100, label: { text: 'Target' } }
 */
export interface LineAnnotation extends BaseAnnotation {
  type: 'line';
  axis: AnnotationAxis;
  value: AnnotationValue;
}

/**
 * A shaded interval between two axis values. Endpoints follow axis domain order.
 * This is a constant interval, not a per-observation statistical band.
 * Only applicable to charts with the corresponding axis.
 *
 * @example
 * { type: 'range', axis: 'x', value: ['Q2', 'Q3'], label: { text: 'Campaign' } }
 */
export interface RangeAnnotation extends BaseAnnotation {
  type: 'range';
  axis: AnnotationAxis;
  value: [AnnotationValue, AnnotationValue];
}

/**
 * Express a comparison between two data items using caller-provided text.
 * Each reference must identify exactly one item. The renderer owns the comparison
 * layout. Statistical charts require the items to share a value scale.
 * No delta, percentage change or business meaning is inferred.
 *
 * @example
 * {
 *   type: 'difference',
 *   from: { time: 'Q1', group: 'East' },
 *   to: { time: 'Q2', group: 'East' },
 *   label: { text: '+16 (+16%)' },
 * }
 */
export interface DifferenceAnnotation extends BaseAnnotation {
  type: 'difference';
  from: AnnotationDataReference;
  to: AnnotationDataReference;
  /** Required: comparison text is provided, not calculated during rendering. */
  label: AnnotationLabel;
}

/** First-stage annotation configurations, discriminated by `type`. */
export type Annotation =
  HighlightAnnotation | PointAnnotation | LineAnnotation | RangeAnnotation | DifferenceAnnotation;

/**
 * Shared annotation configuration fragment for chart configs.
 * Like src/theme/{g2,g6,table,summary}.ts, renderer-specific annotation modules
 * own capability checks, data matching, layout and native option conversion.
 * Unsupported annotation/data/field combinations need explicit handling there;
 * this shared type does not mean every renderer supports every combination.
 * Summary text addressing and integration remain renderer concerns and must
 * preserve existing T8 syntax and semantics; this API adds no text selector.
 *
 * Each render replaces the annotation list; omission or [] clears annotations.
 * Implementations must distinguish unmatched, ambiguous and unsupported references
 * rather than arbitrarily choosing an item or interpreting them as "all data".
 * Structured diagnostics come later.
 *
 * @example
 * type AnnotatedLineConfig = LineConfig & AnnotationOptions;
 */
export interface AnnotationOptions {
  annotations?: Annotation[];
}
