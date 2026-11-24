import type { AnnotationResult } from './registry';

export interface AnnotationEntry<A extends { type: string }, C, R = AnnotationResult> {
  annotation: A;
  draw: (annotations: A[], context: C) => R;
}

export interface AnnotationGroup<A extends { type: string }, C, R = AnnotationResult> {
  annotations: A[];
  draw: AnnotationEntry<A, C, R>['draw'];
}

/** Group configurations into shared drawing calls; components resolve the selected data. */
export function mergeAnnotations<A extends { type: string }, C, R = AnnotationResult>(
  entries: AnnotationEntry<A, C, R>[],
): AnnotationGroup<A, C, R>[] {
  const groups: AnnotationGroup<A, C, R>[] = [];
  const shared = new Map<string, AnnotationGroup<A, C, R>>();
  for (const { annotation, draw } of entries) {
    const existing = shared.get(annotation.type);
    if (existing) {
      existing.annotations.push(annotation);
      continue;
    }
    const previous = groups.at(-1);
    if (previous?.annotations[0].type === annotation.type) {
      previous.annotations.push(annotation);
      continue;
    }
    const group = { annotations: [annotation], draw };
    groups.push(group);
    // Native appearance changes share a pass even when reference marks separate their configs.
    if (annotation.type === 'highlight' || annotation.type === 'thresholdHighlight')
      shared.set(annotation.type, group);
  }
  return groups;
}

/** Reused primitives retain their native marks, update hooks and resource cleanup. */
export function mergeResults(results: AnnotationResult[]): AnnotationResult {
  const updates = results.flatMap(({ update }) => (update ? [update] : []));
  const cleanups = results.flatMap(({ cleanup }) => (cleanup ? [cleanup] : []));
  return {
    marks: results.flatMap(({ marks }) => marks ?? []),
    update: updates.length ? () => updates.forEach((update) => update()) : undefined,
    cleanup: cleanups.length ? () => cleanups.forEach((cleanup) => cleanup()) : undefined,
  };
}
