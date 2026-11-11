import type { getAnnotationDefaults } from '../../theme/annotation';
import type { TableAnnotation } from '../../types/annotation';
import { createAnnotationRenderer } from '../registry';

export interface TableContext<T extends object> {
  container: HTMLElement;
  content: HTMLElement;
  data: T[];
  defaults: ReturnType<typeof getAnnotationDefaults>;
}

const renderAnnotations = createAnnotationRenderer('table');

interface TableAnnotationOptions<T extends object> extends TableContext<T> {
  annotations?: TableAnnotation<T>[];
}

/** Bind table annotations and return the resources to clean up on the next render. */
export function bindTableAnnotations<T extends object>({
  annotations,
  ...context
}: TableAnnotationOptions<T>): () => void {
  if (!annotations?.length) return () => {};
  return renderAnnotations<T>(annotations, context).cleanup ?? (() => {});
}
