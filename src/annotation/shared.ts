import type { HighlightAnnotation } from '../types/annotation';

export type Point = [number, number];

export function validateHighlight(
  annotation: Pick<HighlightAnnotation<Record<string, unknown>>, 'type' | 'label' | 'dimOpacity'>,
) {
  if (annotation.type !== 'highlight')
    throw new Error('Invalid annotation: this view supports highlight only.');
  if (annotation.label !== undefined && typeof annotation.label !== 'string')
    throw new Error('Invalid annotation: label must be a string.');
  if (
    annotation.dimOpacity !== undefined &&
    (!Number.isFinite(annotation.dimOpacity) ||
      annotation.dimOpacity < 0 ||
      annotation.dimOpacity > 1)
  )
    throw new Error('Invalid annotation: dimOpacity must be between 0 and 1.');
}
