import type { ShapeComponent } from '@antv/g2';
import type { getAnnotationDefaults } from '../theme/annotation';
import type { HighlightAnnotation } from '../types/annotation';

export type Point = [number, number];

/** Allow only floating-point differences between mapped renderer coordinates. */
export function hasPointAt(points: Point[], [x, y]: Point) {
  return points.some(([px, py]) => Math.hypot(px - x, py - y) < 1e-6);
}

/** G2 and G6 share the native AntV scene and animation API. */
export function createPointPulse(
  scene: NonNullable<Parameters<ShapeComponent>[1]>['document'],
  defaults: ReturnType<typeof getAnnotationDefaults>['pulse'],
  redraw: () => void,
) {
  type Shape = ReturnType<ReturnType<ShapeComponent>>;
  const rings = new Set<Shape>();
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const clear = () => {
    for (const ring of rings) ring.destroy();
    rings.clear();
  };
  // Rebuild halos: cancellation can still flush the old native animation frame.
  motion.addEventListener('change', redraw);
  return {
    add(
      parent: Pick<Shape, 'appendChild'>,
      [x, y]: Point,
      size: number,
      color: string,
      animated = true,
    ) {
      const ring = scene.createElement('circle', {
        className: 'annotation-pulse',
        style: {
          cx: x,
          cy: y,
          r: size * defaults.staticScale,
          stroke: color,
          fill: 'none',
          lineWidth: defaults.lineWidth,
          opacity: defaults.opacity,
          pointerEvents: 'none',
          zIndex: -1,
        },
      });
      parent.appendChild(ring);
      rings.add(ring);
      if (!animated || motion.matches) return;
      const animation = ring.animate(
        [
          { r: size * defaults.startScale, opacity: defaults.opacity },
          { r: size * defaults.endScale, opacity: 0 },
        ],
        { duration: defaults.duration, iterations: Infinity, easing: 'ease-out' },
      );
      // Keep batches and subsequent redraws on the same pulse phase.
      if (animation) animation.currentTime = performance.now() % defaults.duration;
    },
    clear,
    destroy() {
      motion.removeEventListener('change', redraw);
      clear();
    },
  };
}

export function validateHighlight(
  annotation: Pick<HighlightAnnotation<Record<string, unknown>>, 'type'>,
) {
  if (annotation.type !== 'highlight')
    throw new Error('Invalid annotation: this view supports highlight only.');
}
