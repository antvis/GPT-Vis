import { bindAnnotations as bindG2, type G2AnnotationOptions } from './g2';
import { bindAnnotations as bindG6, type G6AnnotationOptions } from './g6';
import { bindAnnotations as bindSummary, type SummaryAnnotationOptions } from './summary';
import { bindAnnotations as bindTable, type TableAnnotationOptions } from './table';

export type { G2AnnotationContext, MarkElement, MarkOptions, Scene } from './g2';
export type { G6AnnotationContext } from './g6';
export type { SummaryContext } from './summary';
export type { TableContext } from './table';

export type AnnotationBindingOptions<T extends object> =
  | G2AnnotationOptions<T>
  | G6AnnotationOptions
  | TableAnnotationOptions<T>
  | SummaryAnnotationOptions;

const binders = [bindG2, bindG6, bindTable, bindSummary];

/** Each runtime checks the explicit renderer and returns its cleanup when applicable. */
export function bindAnnotations<T extends object>(
  options: AnnotationBindingOptions<T>,
): () => void {
  for (const bind of binders) {
    const cleanup = bind(options);
    if (cleanup) return cleanup;
  }
  throw new Error('Unsupported annotation runtime.');
}
