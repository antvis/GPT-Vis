export type AnnotationValue = string | number;

export type AnnotationTone = 'neutral' | 'info' | 'positive' | 'warning' | 'negative';

export type AnnotationChannel = 'x' | 'y';

export interface CartesianAnnotationTarget {
  x?: AnnotationValue;
  y?: number;
  series?: string;
}

export interface AnnotationBase {
  visible?: boolean;
  tone?: AnnotationTone;
}

export interface ReferenceLineAnnotation extends AnnotationBase {
  type: 'reference-line';
  channel: AnnotationChannel;
  value: AnnotationValue;
  label?: string;
}

export interface ReferenceBandAnnotation extends AnnotationBase {
  type: 'reference-band';
  channel: AnnotationChannel;
  from: AnnotationValue;
  to: AnnotationValue;
  label?: string;
}

export interface HighlightAnnotation extends AnnotationBase {
  type: 'highlight';
  target: CartesianAnnotationTarget;
}

export interface CalloutAnnotation extends AnnotationBase {
  type: 'callout';
  target: CartesianAnnotationTarget;
  label: string;
}

export type Annotation =
  ReferenceLineAnnotation | ReferenceBandAnnotation | HighlightAnnotation | CalloutAnnotation;

export interface AnnotatableConfig {
  annotations?: Annotation[];
}

export type AnnotationDiagnosticCode =
  | 'INVALID_ANNOTATIONS'
  | 'UNSUPPORTED_ANNOTATION_TYPE'
  | 'INVALID_ANNOTATION_VALUE'
  | 'INVALID_ANNOTATION_RANGE'
  | 'INVALID_ANNOTATION_TARGET'
  | 'ANNOTATION_TARGET_NOT_FOUND'
  | 'AMBIGUOUS_ANNOTATION_TARGET';

export interface AnnotationDiagnostic {
  code: AnnotationDiagnosticCode;
  message: string;
}
