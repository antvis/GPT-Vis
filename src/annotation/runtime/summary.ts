import type { getAnnotationDefaults } from '../../theme/annotation';
import type { SummaryAnnotation } from '../../types/annotation';
import { createAnnotationRenderer } from '../registry';

export interface SummaryContext {
  container: HTMLElement;
  content: HTMLElement;
  defaults: ReturnType<typeof getAnnotationDefaults>;
}

const renderAnnotations = createAnnotationRenderer('summary');

interface SummaryAnnotationOptions extends SummaryContext {
  annotations?: SummaryAnnotation[];
}

/** Bind summary annotations and return the resources to clean up on the next render. */
export function bindSummaryAnnotations({
  annotations,
  ...context
}: SummaryAnnotationOptions): () => void {
  if (!annotations?.length) return () => {};
  return renderAnnotations(annotations, context).cleanup ?? (() => {});
}
