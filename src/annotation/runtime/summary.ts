import type { getAnnotationDefaults } from '../../theme/annotation';
import type { RendererAnnotation } from '../registry';
import { renderAnnotations } from '../registry';
import type { AnnotationBindingOptions } from './index';

export interface SummaryContext {
  chartType: 'summary';
  container: HTMLElement;
  content: HTMLElement;
  defaults: ReturnType<typeof getAnnotationDefaults>;
}

export interface SummaryAnnotationOptions extends Omit<SummaryContext, 'chartType'> {
  renderer: 'summary';
  annotations?: RendererAnnotation<{ text: string }, 'summary'>[];
}

/** Bind summary annotations and return the resources to clean up on the next render. */
export function bindAnnotations<T extends object>(
  options: AnnotationBindingOptions<T>,
): (() => void) | undefined {
  if (options.renderer !== 'summary') return;
  const { annotations, ...context } = options;
  if (!annotations?.length) return () => {};
  return (
    renderAnnotations('summary', annotations, { ...context, chartType: 'summary' }).cleanup ??
    (() => {})
  );
}
