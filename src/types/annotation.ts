/** Complete axis fields alone specify coordinates; other objects select existing data. */
export type AnnotationData<T extends object = Record<string, string | number>> = Partial<T>;

interface LabelStyle {
  labelFill?: string;
  labelFontSize?: number;
}

interface StrokeStyle extends LabelStyle {
  stroke?: string;
  lineWidth?: number;
}

interface LineStyle extends StrokeStyle {
  lineDash?: number[];
}

interface RangeStyle extends LineStyle {
  fill?: string;
  fillOpacity?: number;
}

interface PointStyle extends StrokeStyle {
  /** Defaults to a ring at existing points, or a filled marker at empty positions. */
  fill?: string;
  /** Marker size in pixels, matching theme point sizing: circle radius; other shapes scale proportionally. */
  size?: number;
}

interface HighlightStyle extends StrokeStyle {
  /** Preserve the original series color unless explicitly overridden. */
  fill?: string;
  fillOpacity?: number;
  /** Opacity of unselected content; multiple highlights use the lowest value. Defaults follow the theme. */
  dimOpacity?: number;
}

interface AnnotationOptions<TStyle extends LabelStyle = LabelStyle> {
  /** Analysis components supply defaults; a string replaces the text, and '' hides it. */
  label?: string;
  style?: TStyle;
}

/** Select original observations without exposing renderer-specific fields. */
type Selection<T extends object> = AnnotationData<T> | AnnotationData<T>[];

type TableTarget<T extends object> =
  { row: AnnotationData<T>; column?: keyof T & string } | { row?: never; column: keyof T & string };

/** Calculation field and optional candidate rows / emphasized column. */
type TableMapping<T extends object> = {
  field: keyof T & string;
  row?: Selection<T>;
  column?: keyof T & string;
};

type PathOptions<T extends object> = AnnotationOptions<LineStyle> & {
  /** One axis field: span the plot. Two or more positions: connect with straight segments in input order. */
  data: Selection<T>;
};

type RangeOptions<T extends object> = AnnotationOptions<RangeStyle> & {
  /** Only axis fields are accepted at runtime. An omitted axis spans the plot. */
  data: { [K in keyof T]?: [T[K], T[K]] };
};

type ConnectorOptions<T extends object> = AnnotationOptions<LineStyle> & {
  /** Two anchors to connect or compare; labels and computed results come from the caller. */
  data: [AnnotationData<T>, AnnotationData<T>];
  /** Line and curve point to the second anchor; dimension has two arrows; bracket has none. */
  shape?: 'line' | 'curve' | 'dimension' | 'bracket';
  /** Span of dimension/bracket. Defaults to vertical for dimension, horizontal for bracket. */
  orientation?: 'horizontal' | 'vertical';
};

type PointOptions<T extends object> = AnnotationOptions<PointStyle> & {
  /** Arrays draw one marker per object, never a connected path. */
  data: Selection<T>;
  /** Animate the halo by default; false keeps it static. Respects reduced-motion preferences. */
  pulse?: boolean;
};

type TextOptions<T extends object> = AnnotationOptions & {
  data: AnnotationData<T>;
  label: string;
};

type SelectionOptions<T extends object> = AnnotationOptions<HighlightStyle> & {
  /** Omit to analyze all input observations. */
  data?: Selection<T>;
};

type LocalExtremaOptions<T extends object> = SelectionOptions<T> & {
  /** Minimum prominence in original value units. Defaults to 0. */
  minProminence?: number;
  /** Minimum distance in observations within a series, not pixels or time. Defaults to 1. */
  minDistance?: number;
};

type RankOptions = AnnotationOptions<HighlightStyle> & {
  /** Positive integer; ties retain input order. Select at most n observations. */
  n: number;
};

type ThresholdOptions = AnnotationOptions<Omit<HighlightStyle, 'fillOpacity' | 'dimOpacity'>> & {
  threshold: number;
  /** Defaults to above. */
  direction?: 'above' | 'below';
  /** Include values equal to the threshold. Defaults to false. */
  inclusive?: boolean;
};

type RangeHighlightOptions = AnnotationOptions<HighlightStyle> & {
  /** Ordered bounds: inside includes endpoints, outside is strictly beyond them. */
  range: [number, number];
};

type OutlierOptions = AnnotationOptions<HighlightStyle> & {
  /** Positive IQR fence multiplier. Defaults to 1.5. Each series needs at least four finite values. */
  factor?: number;
};

type GroupOptions = AnnotationOptions<HighlightStyle> & {
  /** Select complete named series, not individual observations. */
  data: { group: string } | { group: string }[];
};

/** Charts use their existing mapping; tables require an explicit calculation field. */
type CalculationDefinition<T extends object, Options> = {
  g2: Options & { data?: Selection<T> };
  table: Options & { data: TableMapping<T> };
};

/** Configuration contracts only; chart support and implementations belong to the registry. */
interface AnnotationDefinitions<T extends object> {
  path: {
    g2: PathOptions<T>;
    g6: PathOptions<T> & { data: AnnotationData<T>[] };
  };
  range: { g2: RangeOptions<T> };
  connector: { g2: ConnectorOptions<T>; g6: ConnectorOptions<T> };
  point: { g2: PointOptions<T>; g6: PointOptions<T> };
  text: { g2: TextOptions<T>; g6: TextOptions<T> };
  highlight: {
    g2: AnnotationOptions<HighlightStyle> & { data: Selection<T> };
    g6: AnnotationOptions<HighlightStyle> & { data: Selection<T> };
    table: AnnotationOptions<HighlightStyle> & { data: TableTarget<T> | TableTarget<T>[] };
    summary: AnnotationOptions<HighlightStyle> & { data: { text: string } | { text: string }[] };
  };
  maxX: { g2: SelectionOptions<T> };
  minX: { g2: SelectionOptions<T> };
  maxY: { g2: SelectionOptions<T> };
  minY: { g2: SelectionOptions<T> };
  first: { g2: SelectionOptions<T> };
  last: { g2: SelectionOptions<T> };
  peak: { g2: LocalExtremaOptions<T> };
  valley: { g2: LocalExtremaOptions<T> };
  topN: CalculationDefinition<T, RankOptions>;
  bottomN: CalculationDefinition<T, RankOptions>;
  thresholdHighlight: CalculationDefinition<T, ThresholdOptions>;
  rangeInside: CalculationDefinition<T, RangeHighlightOptions>;
  rangeOutside: CalculationDefinition<T, RangeHighlightOptions>;
  outlier: CalculationDefinition<T, OutlierOptions>;
  contribution: {
    /** Selected values are summed and divided by the total of all input observations. */
    g2: AnnotationOptions<HighlightStyle> & { data: Selection<T> };
    table: AnnotationOptions<HighlightStyle> & {
      data: TableMapping<T> & { row: Selection<T> };
    };
  };
  group: { g2: GroupOptions };
}

/** @internal Derive renderer data contracts without maintaining parallel annotation-name lists. */
export type RendererAnnotationOptions<T extends object, R extends string> = {
  [K in keyof AnnotationDefinitions<T>]: { type: K } & AnnotationDefinitions<T>[K][Extract<
    keyof AnnotationDefinitions<T>[K],
    R
  >];
}[keyof AnnotationDefinitions<T>];

/** Shared configuration entry; each view accepts the targets and capabilities meaningful to it. */
export type Annotation<T extends object = Record<string, string | number>> =
  RendererAnnotationOptions<T, string>;
