import type { getAnnotationDefaults } from '../../theme/annotation';
import type { TableAnnotation } from '../../types/annotation';
import { createAnnotationRenderer } from '../registry';
import type { AnnotationBindingOptions } from './index';

export interface TableContext<T extends object> {
  container: HTMLElement;
  content: HTMLElement;
  data: T[];
  defaults: ReturnType<typeof getAnnotationDefaults>;
}

const renderAnnotations = createAnnotationRenderer('table');

export interface TableAnnotationOptions<T extends object> extends TableContext<T> {
  renderer: 'table';
  annotations?: TableAnnotation<T>[];
}

/** Bind table annotations and return the resources to clean up on the next render. */
export function bindAnnotations<T extends object>(
  options: AnnotationBindingOptions<T>,
): (() => void) | undefined {
  if (options.renderer !== 'table') return;
  const { annotations, ...context } = options;
  if (!annotations?.length) return () => {};
  return renderAnnotations<T>(annotations, context).cleanup ?? (() => {});
}
