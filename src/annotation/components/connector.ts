import type { getAnnotationDefaults } from '../../theme/annotation';
import type { PrimitiveAnnotation } from '../../types/annotation';
import type { AnnotationComponent } from '../registry';
import type { Scene } from '../runtime/g2';
import type { Point, Segment } from '../shared/layout';

/** Connector geometry, arrows and label anchors are shared by the native G2 and G6 scenes. */
export const connector: AnnotationComponent<'connector', 'g2' | 'g6'> = {
  g2: (annotations, context) => {
    return {
      marks: annotations.map((annotation) => {
        const { defaults } = context;
        const paint = getPaint(annotation.style, defaults);
        let geometry: ReturnType<typeof getConnectorGeometry>;
        return context.createMark(annotation, {
          nativeType: 'link',
          style: { ...paint, fill: 'none' },
          draw: (scene) => createConnectorShape(scene, geometry, paint, defaults.connector),
          decorate: (element) => element.setAttribute('annotationSegments', geometry.segments),
          label: {
            annotationAnchor: () => geometry.anchor,
            fill: annotation.style?.labelFill ?? paint.stroke,
            position: 'inside',
          },
          geometry: (native) => (_index, scale, value, coordinate) => {
            const points = annotation.data.map((datum) => context.position(datum, coordinate));
            if (points.some((point) => !point)) return [[], []];
            const [from, to] = points as Point[];
            geometry = getConnectorGeometry(
              coordinate.map(from) as Point,
              coordinate.map(to) as Point,
              annotation,
              coordinate.getSize() as Point,
              defaults.connector,
            );
            return native(
              [0],
              scale,
              {
                ...value,
                x: [from[0]],
                y: [from[1]],
                x1: [to[0]],
                y1: [to[1]],
              },
              coordinate,
            );
          },
        });
      }),
    };
  },
  g6: (annotations, context) => {
    for (const annotation of annotations) {
      const positions = annotation.data.map((datum) => context.position(datum));
      if (positions.some((point) => !point)) continue;
      const [a, b] = positions as Point[];
      const { defaults } = context;
      const paint = getPaint(annotation.style, defaults);
      const geometry = getConnectorGeometry(a, b, annotation, context.size, defaults.connector);
      context.segments.push(...geometry.segments);
      const shape = createConnectorShape(context.scene, geometry, paint, defaults.connector);
      shape.className = 'annotation-mark';
      context.root.appendChild(shape);
      context.label(annotation, geometry.anchor, {
        fill: paint.stroke,
      });
    }
    return {};
  },
};
type Connector = Extract<PrimitiveAnnotation, { type: 'connector' }>;
type Defaults = ReturnType<typeof getAnnotationDefaults>['connector'];
type Path = (['M' | 'L', number, number] | ['Q', number, number, number, number])[];

function getPaint(
  style: Connector['style'],
  defaults: { stroke: string; lineWidth: { connector: number } },
) {
  return {
    stroke: style?.stroke ?? defaults.stroke,
    lineWidth: style?.lineWidth ?? defaults.lineWidth.connector,
    lineDash: style?.lineDash,
  };
}

/** Shared screen geometry; adapters resolve data anchors before calling this. */
export function getConnectorGeometry(
  a: Point,
  b: Point,
  { shape = 'line', orientation }: Pick<Connector, 'shape' | 'orientation'>,
  [width, height]: Point,
  defaults: Defaults,
) {
  let points: Point[] = [a, b];
  let path: Path = [
    ['M', ...a],
    ['L', ...b],
  ];
  const guides: Path = [];
  let anchor: Point = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  const guideSegments: Segment[] = [];
  const length = Math.hypot(b[0] - a[0], b[1] - a[1]);
  if (shape === 'curve' && length) {
    // Prefer the upper side; for a vertical segment prefer its left side.
    let nx = (b[1] - a[1]) / length;
    let ny = (a[0] - b[0]) / length;
    if (ny > 0 || (ny === 0 && nx > 0)) {
      nx = -nx;
      ny = -ny;
    }
    const bend = Math.min(defaults.maxCurveHeight, length * defaults.curveRatio);
    if (
      anchor[0] + nx * bend * 2 < 0 ||
      anchor[0] + nx * bend * 2 > width ||
      anchor[1] + ny * bend * 2 < 0 ||
      anchor[1] + ny * bend * 2 > height
    ) {
      nx = -nx;
      ny = -ny;
    }
    const control: Point = [anchor[0] + nx * bend * 2, anchor[1] + ny * bend * 2];
    path = [
      ['M', ...a],
      ['Q', ...control, ...b],
    ];
    // Sample only for label collision scoring; the native path draws the actual curve.
    points = Array.from({ length: 17 }, (_, i): Point => {
      const t = i / 16;
      return [0, 1].map(
        (axis) => (1 - t) ** 2 * a[axis] + 2 * (1 - t) * t * control[axis] + t ** 2 * b[axis],
      ) as Point;
    });
    anchor = points[8];
  } else if (shape === 'dimension' || shape === 'bracket') {
    const horizontal =
      (orientation ?? (shape === 'dimension' ? 'vertical' : 'horizontal')) === 'horizontal';
    const cross = horizontal ? 1 : 0;
    // Horizontal comparisons prefer above; vertical comparisons prefer the right.
    let side = horizontal ? -1 : 1;
    let lane =
      (side < 0 ? Math.min(a[cross], b[cross]) : Math.max(a[cross], b[cross])) +
      side * defaults.offset;
    if (lane < 0 || lane > (horizontal ? height : width)) {
      side = -side;
      lane =
        (side < 0 ? Math.min(a[cross], b[cross]) : Math.max(a[cross], b[cross])) +
        side * defaults.offset;
    }
    lane = Math.max(0, Math.min(horizontal ? height : width, lane));
    const p: Point = horizontal ? [a[0], lane] : [lane, a[1]];
    const q: Point = horizontal ? [b[0], lane] : [lane, b[1]];
    anchor = [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
    if (shape === 'bracket') {
      points = [a, p, q, b];
      path = points.map(([x, y], i) => [i ? 'L' : 'M', x, y]);
    } else {
      points = [p, q];
      path = [
        ['M', ...p],
        ['L', ...q],
      ];
      for (const [source, target] of [
        [a, p],
        [b, q],
      ]) {
        const end: Point = [...target];
        end[cross] += side * defaults.extension;
        guides.push(['M', ...source], ['L', ...end]);
        guideSegments.push([source, end]);
      }
    }
  }
  return {
    path,
    guides,
    anchor,
    points,
    segments: [...points.slice(1).map((point, i): Segment => [points[i], point]), ...guideSegments],
    arrows: shape === 'bracket' ? 'none' : shape === 'dimension' ? 'both' : 'end',
  };
}

/** Native paths and markers share the same geometry in G2 and G6. */
export function createConnectorShape(
  scene: Scene,
  geometry: ReturnType<typeof getConnectorGeometry>,
  paint: Pick<NonNullable<Connector['style']>, 'stroke' | 'lineWidth' | 'lineDash'>,
  defaults: Defaults,
) {
  const group = scene.createElement('g', { style: { pointerEvents: 'none' } });
  const style: Record<string, unknown> = {
    ...paint,
    fill: 'none',
    pointerEvents: 'none',
    lineCap: 'round',
    lineJoin: 'round',
  };
  const path = (attributes: Record<string, unknown>) =>
    scene.createElement('path', { style: { ...style, ...attributes } });
  if (geometry.guides.length)
    group.appendChild(path({ d: geometry.guides, strokeOpacity: 0.5, lineWidth: 1 }));
  const length = geometry.points
    .slice(1)
    .reduce(
      (sum, p, i) => sum + Math.hypot(p[0] - geometry.points[i][0], p[1] - geometry.points[i][1]),
      0,
    );
  const head = Math.min(length * 0.35, Math.max(defaults.arrowSize, (paint.lineWidth ?? 0) * 3));
  const marker = () =>
    path({
      lineDash: undefined,
      d: [
        ['M', head, -head / 2],
        ['L', 0, 0],
        ['L', head, head / 2],
      ],
    });
  group.appendChild(
    path({
      d: geometry.path,
      markerStart: length && geometry.arrows === 'both' ? marker() : undefined,
      markerEnd: length && geometry.arrows !== 'none' ? marker() : undefined,
    }),
  );
  return group;
}
