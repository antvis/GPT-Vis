import type { HighlightAnnotation } from '../types/annotation';

export type Point = [number, number];

export const path = (points: Point[], close = false) =>
  points.map(([x, y], i) => `${i ? 'L' : 'M'}${x},${y}`).join(' ') + (close ? ' Z' : '');

/** Connect from the first position to the second; keep short arrows within their segment. */
export function connectorPath(from: Point, to: Point, lineWidth: number) {
  const vx = to[0] - from[0];
  const vy = to[1] - from[1];
  const length = Math.hypot(vx, vy);
  if (!length) return path([from, to]);
  const ux = vx / length;
  const uy = vy / length;
  const head = Math.min(length * 0.35, Math.max(8, lineWidth * 3));
  const wing = head / 2;
  return (
    path([from, to]) +
    ' ' +
    path([
      [to[0] - ux * head - uy * wing, to[1] - uy * head + ux * wing],
      to,
      [to[0] - ux * head + uy * wing, to[1] - uy * head - ux * wing],
    ])
  );
}

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
