import type { Point } from './layout';
import type { G2AnnotationContext } from './runtime/g2';

export interface ContributionBracket {
  paths: Point[][];
  anchor: Point;
  direction: Point;
  labelAnchor?: Point;
}

/** One smooth brace spans the selection; its central cusp owns the shared explanation. */
export function cartesianBracket(
  anchors: Point[],
  geometry: Point[],
  side: 'top' | 'right',
  lane = 0,
): ContributionBracket | undefined {
  if (!anchors.length) return undefined;
  const valid = geometry.filter((point) => point?.every(Number.isFinite));
  const points = valid.length ? valid : anchors;
  const horizontal = side === 'top';
  const axis = horizontal ? 0 : 1;
  let start = Math.min(...points.map((point) => point[axis]));
  let end = Math.max(...points.map((point) => point[axis]));
  if (end - start < 12) {
    start -= 6;
    end += 6;
  }
  const middle = (start + end) / 2;
  const depth = Math.min(6, (end - start) / 6);
  const edge = horizontal
    ? Math.min(...points.map((point) => point[1])) - 12 - lane * 14
    : Math.max(...points.map((point) => point[0])) + 12 + lane * 14;
  const convert = ([a, b]: Point): Point => (horizontal ? [a, edge - b] : [edge + b, a]);
  const curves: Point[][] = [
    [
      [start, -depth],
      [start, 0],
      [start, 0],
      [start + depth, 0],
    ],
    [
      [start + depth, 0],
      [middle - depth, 0],
      [middle - depth, 0],
      [middle, depth],
    ],
    [
      [middle, depth],
      [middle + depth, 0],
      [middle + depth, 0],
      [end - depth, 0],
    ],
    [
      [end - depth, 0],
      [end, 0],
      [end, 0],
      [end, -depth],
    ],
  ];
  const path = curves.flatMap(([a, b, c, d], index) =>
    Array.from({ length: 9 }, (_, i) => i / 8)
      .filter((t) => !index || t > 0)
      .map((t) =>
        convert(
          [0, 1].map(
            (axis) =>
              (1 - t) ** 3 * a[axis] +
              3 * (1 - t) ** 2 * t * b[axis] +
              3 * (1 - t) * t * t * c[axis] +
              t ** 3 * d[axis],
          ) as Point,
        ),
      ),
  );
  return {
    paths: [path],
    anchor: convert([middle, depth]),
    direction: horizontal ? [0, -1] : [1, 0],
  };
}

/** Merge only adjacent sectors, including adjacency across the circular seam. */
export function radialBracket(
  sectors: { y?: number; y1?: number }[],
  coordinate: ReturnType<G2AnnotationContext<object>['getCoordinate']>,
  lane = 0,
): ContributionBracket | undefined {
  const intervals = sectors
    .flatMap(({ y, y1 }) =>
      Number.isFinite(y) && Number.isFinite(y1) && y !== y1
        ? [[Math.min(y!, y1!), Math.max(y!, y1!)]]
        : [],
    )
    .sort((a, b) => a[0] - b[0]);
  const runs: number[][] = [];
  for (const [start, end] of intervals) {
    const last = runs.at(-1);
    if (last && start <= last[1] + 1e-6) last[1] = Math.max(last[1], end);
    else runs.push([start, end]);
  }
  if (runs.length > 1 && runs[0][0] < 1e-6 && runs.at(-1)![1] > 1 - 1e-6) {
    const first = runs.shift()!;
    runs.at(-1)![1] = first[1] + 1;
  }
  if (!runs.length) return undefined;
  const center = coordinate.getCenter() as Point;
  const outer = (angle: number, offset: number): Point => {
    const point = coordinate.map([0, angle % 1]) as Point;
    const radius = Math.hypot(point[0] - center[0], point[1] - center[1]);
    return point.map(
      (value, axis) => center[axis] + (value - center[axis]) * (1 + offset / radius),
    ) as Point;
  };
  const offset = 10 + lane * 12;
  const paths = runs.map(([start, end]) => {
    const full = end - start >= 1 - 1e-6;
    const trim = full ? 0 : Math.min(0.008, (end - start) / 8);
    const from = start + trim,
      to = end - trim;
    const steps = Math.max(8, Math.ceil((to - from) * 120));
    const arc = Array.from({ length: steps + 1 }, (_, i) =>
      outer(from + ((to - from) * i) / steps, offset),
    );
    return full ? arc : [outer(from, offset - 5), ...arc, outer(to, offset - 5)];
  });
  const primary = runs.reduce((best, run) => (run[1] - run[0] > best[1] - best[0] ? run : best));
  const anchor = outer((primary[0] + primary[1]) / 2, offset);
  const radius = Math.hypot(anchor[0] - center[0], anchor[1] - center[1]);
  const inner = coordinate.map([1, 0]) as Point;
  const innerRadius = Math.hypot(inner[0] - center[0], inner[1] - center[1]);
  return {
    paths,
    anchor,
    direction: [(anchor[0] - center[0]) / radius, (anchor[1] - center[1]) / radius],
    labelAnchor: innerRadius >= 50 ? center : undefined,
  };
}
