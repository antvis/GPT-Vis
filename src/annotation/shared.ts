import type { Annotation, AnnotationDataReference } from '../types/annotation';

/** Fail before replacing the current chart; structured diagnostics come later. */
export function annotationError(annotation: Annotation, message: string): never {
  throw new Error(`Annotation ${annotation.id ?? annotation.type}: ${message}`);
}

/** Resolve original fields only. An empty reference must never select everything. */
export function matchData(
  data: object[],
  reference: AnnotationDataReference,
  annotation: Annotation,
): number[] {
  if (!reference || typeof reference !== 'object' || Array.isArray(reference)) {
    return annotationError(annotation, 'data references must be non-empty objects.');
  }
  const entries = Object.entries(reference);
  if (!entries.length) return annotationError(annotation, 'data references must not be empty.');
  const indices = data.flatMap((datum, index) =>
    entries.every(
      ([key, value]) =>
        Object.prototype.hasOwnProperty.call(datum, key) &&
        (datum as Record<string, unknown>)[key] === value,
    )
      ? [index]
      : [],
  );
  if (!indices.length) return annotationError(annotation, 'no data matches the reference.');
  return indices;
}

export function matchOne(
  data: object[],
  reference: AnnotationDataReference,
  annotation: Annotation,
): number {
  const indices = matchData(data, reference, annotation);
  if (indices.length !== 1) {
    return annotationError(
      annotation,
      'reference must identify one item; include more data fields.',
    );
  }
  return indices[0];
}
