import type { getAnnotationDefaults } from '../../theme/annotation';
import type { SummaryAnnotation } from '../../types/annotation';
import { createAnnotationRenderer } from '../registry';
import type { AnnotationBindingOptions } from './index';

export interface SummaryContext {
  container: HTMLElement;
  content: HTMLElement;
  defaults: ReturnType<typeof getAnnotationDefaults>;
}

const renderAnnotations = createAnnotationRenderer('summary');

export interface SummaryAnnotationOptions extends SummaryContext {
  renderer: 'summary';
  annotations?: SummaryAnnotation[];
}

/** Bind summary annotations and return the resources to clean up on the next render. */
export function bindAnnotations<T extends object>(
  options: AnnotationBindingOptions<T>,
): (() => void) | undefined {
  if (options.renderer !== 'summary') return;
  const { annotations, ...context } = options;
  if (!annotations?.length) return () => {};
  return renderAnnotations(annotations, context).cleanup ?? (() => {});
}
