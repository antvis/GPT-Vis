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

interface HighlightStyle extends LabelStyle {
  /** Opacity of unselected content; multiple highlights use the lowest value. Defaults follow the theme. */
  dimOpacity?: number;
}

interface AnnotationOptions<TStyle extends LabelStyle = LabelStyle> {
  label?: string;
  style?: TStyle;
}

type PathAnnotation<T extends object> = AnnotationOptions<LineStyle> & {
  type: 'path';
  /** One axis field: span the plot. Two or more positions: connect with straight segments in input order. */
  data: AnnotationData<T> | AnnotationData<T>[];
};

type RangeAnnotation<T extends object> = AnnotationOptions<RangeStyle> & {
  type: 'range';
  /** Only axis fields are accepted at runtime. An omitted axis spans the plot. */
  data: { [K in keyof T]?: [T[K], T[K]] };
};

type ConnectorAnnotation<T extends object> = AnnotationOptions<LineStyle> & {
  type: 'connector';
  /** Two anchors to connect or compare; labels and computed results come from the caller. */
  data: [AnnotationData<T>, AnnotationData<T>];
  /** Line and curve point to the second anchor; dimension has two arrows; bracket has none. */
  shape?: 'line' | 'curve' | 'dimension' | 'bracket';
  /** Span of dimension/bracket. Defaults to vertical for dimension, horizontal for bracket. */
  orientation?: 'horizontal' | 'vertical';
};

type PointAnnotation<T extends object> = AnnotationOptions<PointStyle> & {
  type: 'point';
  /** Arrays draw one marker per object, never a connected path. */
  data: AnnotationData<T> | AnnotationData<T>[];
  /** Animate the halo by default; false keeps it static. Respects reduced-motion preferences. */
  pulse?: boolean;
};

type TextAnnotation<T extends object> = AnnotationOptions & {
  type: 'text';
  data: AnnotationData<T>;
  label: string;
};

/** Geometric primitives: positions and labels are supplied by the caller. */
export type PrimitiveAnnotation<T extends object = Record<string, string | number>> =
  | PathAnnotation<T>
  | RangeAnnotation<T>
  | ConnectorAnnotation<T>
  | PointAnnotation<T>
  | TextAnnotation<T>;

/** Graphs provide object anchors, without coordinate axes or ranges. */
export type GraphAnnotation<T extends object> =
  | (PathAnnotation<T> & { data: AnnotationData<T>[] })
  | ConnectorAnnotation<T>
  | PointAnnotation<T>
  | TextAnnotation<T>;

/** Emphasize existing content. Each view defines its target data; arrays select the union. */
export type HighlightAnnotation<T extends object> = AnnotationOptions<HighlightStyle> & {
  type: 'highlight';
  data: T | T[];
};

type TableTarget<T extends object> =
  | {
      /** Select every row matching all supplied original fields. Use a unique key to target one row. */
      row: AnnotationData<T>;
      /** Omit to select entire rows; supply to select their cells in this column. */
      column?: keyof T & string;
    }
  | {
      row?: never;
      /** Select the entire column, including its header. */
      column: keyof T & string;
    };

/**
 * Select table rows, columns or their intersection. Multiple targets select their union.
 * @example { type: 'highlight', data: { row: { product: 'Pro' }, column: 'revenue' } }
 * @example { type: 'highlight', data: { column: 'revenue' } }
 */
export type TableAnnotation<T extends object> = HighlightAnnotation<TableTarget<T>>;

/** Summary targets visible original text, including text spanning T8 phrases. */
export type SummaryAnnotation = HighlightAnnotation<{ text: string }>;

type SemanticAnnotation<T extends object> =
  HighlightAnnotation<AnnotationData<T>> | TableAnnotation<T>;

/** Shared annotation API; each renderer accepts the expressions meaningful for its view. */
export type Annotation<T extends object = Record<string, string | number>> =
  PrimitiveAnnotation<T> | SemanticAnnotation<T>;
