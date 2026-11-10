/** Complete axis fields alone specify coordinates; other objects select existing data. */
export type AnnotationData<T extends object = Record<string, string | number>> = Partial<T>;

type AnnotationPath<T extends object> = [
  AnnotationData<T>,
  AnnotationData<T>,
  ...AnnotationData<T>[],
];

interface LabelOptions {
  label?: string;
  labelFill?: string;
  labelFontSize?: number;
}

interface StrokeOptions {
  stroke?: string;
  lineWidth?: number;
}

interface LineOptions extends StrokeOptions {
  lineDash?: number[];
}

type LineAnnotation<T extends object> = LabelOptions &
  LineOptions & {
    type: 'line';
    /** One axis field: span the plot. Two or more positions: connect in input order. */
    data: AnnotationData<T> | AnnotationPath<T>;
  };

type RangeAnnotation<T extends object> = LabelOptions &
  LineOptions & {
    type: 'range';
    /** Only axis fields are accepted at runtime. An omitted axis spans the plot. */
    data: { [K in keyof T]?: [T[K], T[K]] };
    fill?: string;
    fillOpacity?: number;
  };

type ConnectorAnnotation<T extends object> = LabelOptions &
  LineOptions & {
    type: 'connector';
    /** Draw an arrow from the first position to the second. */
    data: [AnnotationData<T>, AnnotationData<T>];
  };

type PointAnnotation<T extends object> = LabelOptions &
  StrokeOptions & {
    type: 'point';
    /** Arrays draw one marker per object, never a connected path. */
    data: AnnotationData<T> | AnnotationData<T>[];
    fill?: string;
    /** Marker size in pixels, matching theme point sizing: circle radius; other shapes scale proportionally. */
    size?: number;
    /** Animate the halo by default; false keeps it static. Respects reduced-motion preferences. */
    pulse?: boolean;
  };

type TextAnnotation<T extends object> = LabelOptions & {
  type: 'text';
  data: AnnotationData<T>;
  label: string;
};

/** Geometric primitives: positions and labels are supplied by the caller. */
export type PrimitiveAnnotation<T extends object = Record<string, string | number>> =
  | LineAnnotation<T>
  | RangeAnnotation<T>
  | ConnectorAnnotation<T>
  | PointAnnotation<T>
  | TextAnnotation<T>;

/** Graphs provide object anchors, without coordinate axes or ranges. */
export type GraphAnnotation<T extends object> =
  | (LineAnnotation<T> & { data: AnnotationPath<T> })
  | ConnectorAnnotation<T>
  | PointAnnotation<T>
  | TextAnnotation<T>;

/**
 * Emphasize existing content. Data selects table rows; field selects a column.
 * @example { type: 'highlight', data: { product: 'Pro' }, field: 'revenue' }
 * @example { type: 'highlight', field: 'revenue' }
 */
export type HighlightAnnotation<T extends object> = LabelOptions & {
  type: 'highlight';
  /** Opacity of unselected content; multiple highlights use the lowest value. Defaults follow the theme. */
  dimOpacity?: number;
} & (
    | {
        /** Match existing data. Each object can select multiple records. */
        data: AnnotationData<T> | AnnotationData<T>[];
        /** Table column; combined with data this selects cells. */
        field?: keyof T & string;
      }
    | { data?: never; field: keyof T & string }
  );

/** Summary targets visible original text, including text spanning T8 phrases. */
export type SummaryAnnotation = HighlightAnnotation<{ text: string }> & {
  data: { text: string } | { text: string }[];
  field?: never;
};

type SemanticAnnotation<T extends object> = HighlightAnnotation<T>;

/** Shared annotation API; each renderer accepts the expressions meaningful for its view. */
export type Annotation<T extends object = Record<string, string | number>> =
  PrimitiveAnnotation<T> | SemanticAnnotation<T>;
