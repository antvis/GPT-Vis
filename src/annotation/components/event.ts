import type { AnnotationData } from '../../types/annotation';
import type { AnnotationComponent } from '../registry';
import type { G2AnnotationContext } from '../runtime';
import { annotationField, axisPosition, finiteValue, selectRows } from '../utils';
import { path } from './path';

export const event: AnnotationComponent<'event'> = {
  g2: (annotations, { mapping }) =>
    annotations.flatMap((annotation) => {
      const field = annotationField(mapping, annotation.axis ?? 'x');
      const targets = Array.isArray(annotation.data) ? annotation.data : [annotation.data];
      if (!targets.length) throw new Error('Invalid annotation: event needs target data.');
      return targets.flatMap((selector) => {
        const anchor =
          selector?.[field] !== undefined && Object.keys(selector).every((key) => key === field)
            ? selector
            : resolveAnchor(selector, mapping);
        const value = anchor[field];
        return path.create({
          data: axisPosition(field, value),
          label: annotation.label ?? `Event: ${value}`,
          style: { lineDash: [4, 4], ...annotation.style },
        });
      });
    }),
};

function resolveAnchor<T extends object>(
  selector: AnnotationData<T>,
  mapping: G2AnnotationContext<T>['mapping'],
): AnnotationData<T> {
  if (!selector || typeof selector !== 'object' || Array.isArray(selector))
    throw new Error('Invalid annotation: anchor needs an original-field selector or coordinates.');
  if (
    selector[mapping.x] !== undefined &&
    selector[mapping.y] !== undefined &&
    Object.keys(selector).every((key) => key === mapping.x || key === mapping.y)
  ) {
    axisPosition(mapping.x, selector[mapping.x]);
    finiteValue(selector[mapping.y], mapping.y);
    return selector;
  }
  const rows = selectRows(mapping.data, selector);
  if (rows.length !== 1)
    throw new Error(
      `Invalid annotation: anchor matches ${rows.length} observations; expected one.`,
    );
  return rows[0];
}
