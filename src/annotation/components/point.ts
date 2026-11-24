import type { Annotation } from '../../types/annotation';
import type { Point } from '../layout';
import type { AnnotationComponent, AnnotationDraw } from '../registry';
import type { MarkElement } from '../runtime';
import { createPointPulse } from '../utils';

/** Mark geometry and point halos belong to the same capability on both rendering stacks. */
export const point = {
  create: createPoint,
  g2: () => drawG2,
  g6: () => drawG6,
} satisfies AnnotationComponent<'point', 'g2' | 'g6'> & {
  create: typeof createPoint;
};

const observations = new WeakMap<object, { fillOpacity?: number }>();

/** Internal observation settings preserve native positions and series paint without public options. */
function createPoint<T extends object>(
  options: Omit<Extract<Annotation<T>, { type: 'point' }>, 'type'>,
  observation?: { fillOpacity?: number },
): Extract<Annotation<T>, { type: 'point' }>[] {
  if (Array.isArray(options.data) && !options.data.length) return [];
  const annotation = { ...options, type: 'point' as const };
  if (observation) observations.set(annotation, observation);
  return [annotation];
}

const drawG2: AnnotationDraw<'point', 'g2'> = (annotations, context) => {
  const { defaults } = context;
  // G2 copies attributes onto retained shapes when updating native marks.
  const owner = Symbol('point');
  let disposed = false;
  let pulse: ReturnType<typeof createPointPulse> | undefined;
  const update = () => {
    if (disposed) return;
    const scene = context.getScene();
    // Native exit elements remain mounted until their transition cleanup finishes.
    const elements = (scene.querySelectorAll('.element') as MarkElement[]).filter(
      (element) => !element.__removed__,
    );
    const points = elements.filter(
      (element) => element.getAttribute('annotationPoint')?.owner === owner,
    );
    pulse?.clear();
    if (!points.length) return;
    pulse ??= createPointPulse(scene, defaults.pulse, update);
    const centers = elements.flatMap((element): Point[] => {
      if (element.markType !== 'point' || !element.isVisible()) return [];
      const { halfExtents } = element.getLocalBounds();
      if (!halfExtents[0] && !halfExtents[1]) return [];
      const { points } = element.__data__;
      const a = points[0],
        b = points[points.length - 1];
      return [[(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]];
    });
    for (const element of points) {
      const {
        anchor,
        size,
        color,
        fill,
        stroke,
        pulse: animated,
      } = element.getAttribute('annotationPoint');
      const covered = fill === undefined && hasPointAt(centers, anchor);
      element.setAttribute('fill', fill ?? (covered ? 'transparent' : color));
      element.setAttribute('stroke', covered ? 'transparent' : stroke);
      pulse.add(element.parentNode!, anchor, size, color, animated);
    }
  };
  return {
    update,
    cleanup() {
      disposed = true;
      pulse?.destroy();
    },
    marks: annotations.map((annotation) => {
      const observation = observations.get(annotation);
      const size = annotation.style?.size ?? defaults.size;
      const stroke = annotation.style?.stroke ?? defaults.stroke;
      const shape = defaults.shape;
      return context.createMark(annotation, {
        nativeType: 'point',
        shape,
        encode: { size },
        labelGap: size * defaults.pulse.endScale,
        label: { annotationPreferSide: true, connectorStroke: stroke },
        style: {
          shape,
          stroke: annotation.style?.stroke ?? defaults.pointStroke,
          lineWidth: annotation.style?.lineWidth ?? defaults.lineWidth.point,
          fill: annotation.style?.fill ?? 'transparent',
          fillOpacity: observation?.fillOpacity,
        },
        decorate: (element, points) => {
          const [a, b = a] = points;
          const fill = annotation.style?.fill;
          const anchor: Point = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
          const radius = size * defaults.pulse.endScale;
          element.setAttribute('annotationBounds', {
            x: anchor[0] - radius,
            y: anchor[1] - radius,
            width: radius * 2,
            height: radius * 2,
          });
          element.setAttribute('annotationPoint', {
            owner,
            anchor,
            size,
            color: observation
              ? (fill ??
                context.color(
                  Array.isArray(annotation.data) ? annotation.data[0] : annotation.data,
                ))
              : fill && fill !== 'none' && fill !== 'transparent'
                ? fill
                : stroke,
            fill,
            stroke: annotation.style?.stroke ?? defaults.pointStroke,
            pulse: annotation.pulse,
          });
        },
        geometry: (native) => (_index, scale, value, coordinate) => {
          const data = Array.isArray(annotation.data) ? annotation.data : [annotation.data];
          const positions = data.map((datum) => context.position(datum, coordinate, !!observation));
          // Resolved anchors are positions, even when the source view exposes interval ends.
          const channels = { ...value };
          for (const key of ['x1', 'y1', 'dx', 'dy']) delete channels[key];
          return native(
            positions.flatMap((p, i) => (p ? [i] : [])),
            scale,
            {
              ...channels,
              x: positions.map((p) => p?.[0] ?? 0),
              y: positions.map((p) => p?.[1] ?? 0),
            },
            coordinate,
          );
        },
      });
    }),
  };
};

const drawG6: AnnotationDraw<'point', 'g6'> = (annotations, context) => {
  const { defaults } = context;
  for (const annotation of annotations) {
    for (const data of Array.isArray(annotation.data) ? annotation.data : [annotation.data]) {
      const anchor = context.position(data);
      if (!anchor) continue;
      const [x, y] = anchor;
      const r = annotation.style?.size ?? defaults.size;
      const halo = r * defaults.pulse.endScale;
      context.boxes.push({ x: x - halo, y: y - halo, width: halo * 2, height: halo * 2 });
      const stroke = annotation.style?.stroke ?? defaults.stroke;
      const covered = annotation.style?.fill === undefined && hasPointAt(context.centers, anchor);
      const paint = {
        lineWidth: annotation.style?.lineWidth ?? defaults.lineWidth.point,
        stroke: covered ? 'transparent' : (annotation.style?.stroke ?? defaults.pointStroke),
        fill: annotation.style?.fill ?? (covered ? 'transparent' : stroke),
      };
      context
        .pulse()
        .add(
          context.root,
          anchor,
          r,
          paint.fill !== 'none' && paint.fill !== 'transparent' ? paint.fill : stroke,
          annotation.pulse,
        );
      const shape = defaults.shape;
      if (shape === 'square' || shape === 'hollowSquare')
        context.add('rect', { ...paint, x: x - r, y: y - r, width: 2 * r, height: 2 * r });
      else if (shape === 'diamond' || shape === 'hollowDiamond')
        context.add('path', {
          ...paint,
          d: [
            ['M', x, y - r * 1.5],
            ['L', x + r, y],
            ['L', x, y + r * 1.5],
            ['L', x - r, y],
            ['Z'],
          ],
        });
      else if (shape === 'triangle' || shape === 'hollowTriangle')
        context.add('path', {
          ...paint,
          d: [['M', x, y - r], ['L', x + r, y + r], ['L', x - r, y + r], ['Z']],
        });
      else if (shape === 'triangleDown')
        context.add('path', {
          ...paint,
          d: [['M', x, y + r], ['L', x + r, y - r], ['L', x - r, y - r], ['Z']],
        });
      else if (['point', 'circle', 'hollow', 'hollowCircle'].includes(shape))
        context.add('circle', { ...paint, cx: x, cy: y, r });
      else throw new Error(`Unsupported annotation point shape: ${shape}.`);
      context.label(annotation, anchor, { gap: halo });
    }
  }
  return {};
};

/** Allow only floating-point differences between mapped renderer coordinates. */
function hasPointAt(points: Point[], [x, y]: Point) {
  return points.some(([px, py]) => Math.hypot(px - x, py - y) < 1e-6);
}
