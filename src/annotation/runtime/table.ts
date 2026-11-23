import type { getAnnotationDefaults } from '../../theme/annotation';
import type { RendererAnnotation } from '../registry';
import { renderAnnotations } from '../registry';
import type { AnnotationBindingOptions } from './index';

export interface TableContext<T extends object> {
  chartType: 'table';
  container: HTMLElement;
  content: HTMLElement;
  data: T[];
  defaults: ReturnType<typeof getAnnotationDefaults>;
}

export interface TableAnnotationOptions<T extends object> extends Omit<
  TableContext<T>,
  'chartType'
> {
  renderer: 'table';
  annotations?: RendererAnnotation<T, 'table'>[];
}

/** Bind table annotations and return the resources to clean up on the next render. */
export function bindAnnotations<T extends object>(
  options: AnnotationBindingOptions<T>,
): (() => void) | undefined {
  if (options.renderer !== 'table') return;
  const { annotations, ...context } = options;
  if (!annotations?.length) return () => {};
  return (
    renderAnnotations<T, 'table'>('table', annotations, { ...context, chartType: 'table' })
      .cleanup ?? (() => {})
  );
}
