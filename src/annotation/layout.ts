import type { Point } from './shared';

export interface Box {
  x: number;
  y: number;
  width: number;
  height: number;
}

export type Segment = [Point, Point];

/** Length inside a rectangle, also used to score paths without treating their whole bounds as solid. */
function insideLength([a, b]: Segment, box: Box) {
  let start = 0;
  let end = 1;
  for (const [axis, low, high] of [
    [0, box.x, box.x + box.width],
    [1, box.y, box.y + box.height],
  ]) {
    const delta = b[axis] - a[axis];
    if (!delta) {
      if (a[axis] < low || a[axis] > high) return 0;
    } else {
      const t0 = (low - a[axis]) / delta;
      const t1 = (high - a[axis]) / delta;
      start = Math.max(start, Math.min(t0, t1));
      end = Math.min(end, Math.max(t0, t1));
    }
  }
  return Math.max(0, end - start) * Math.hypot(b[0] - a[0], b[1] - a[1]);
}

function padded(box: Box): Box {
  return { x: box.x - 4, y: box.y - 4, width: box.width + 8, height: box.height + 8 };
}

function overlap(a: Box, b: Box) {
  return (
    Math.max(0, Math.min(a.x + a.width, b.x + b.width) - Math.max(a.x, b.x)) *
    Math.max(0, Math.min(a.y + a.height, b.y + b.height) - Math.max(a.y, b.y))
  );
}

/** Keep a preferred native position when clear; otherwise try nearby spaces and obstacle edges. */
export function placeLabel(
  anchor: Point,
  size: Point,
  view: Point,
  gap: number,
  boxes: Box[],
  segments: Segment[],
  preferred?: Point,
): Box {
  const [x, y] = anchor;
  const [width, height] = size;
  const above: Point = [x - width / 2, y - gap - height];
  const candidates: Point[] = [
    preferred ?? above,
    above,
    [x - width / 2, y + gap],
    [x + gap, y - height / 2],
    [x - gap - width, y - height / 2],
    [x - gap - width, y - gap - height],
    [x + gap, y - gap - height],
    [x - gap - width, y + gap],
    [x + gap, y + gap],
  ];
  const left = Math.min(...candidates.map(([x]) => x));
  const top = Math.min(...candidates.map(([, y]) => y));
  const near = {
    x: left - 4,
    y: top - 4,
    width: Math.max(...candidates.map(([x]) => x)) - left + width + 8,
    height: Math.max(...candidates.map(([, y]) => y)) - top + height + 8,
  };
  for (const box of boxes) {
    if (!overlap(box, near)) continue;
    candidates.push(
      [box.x - width - 4, y - height / 2],
      [box.x + box.width + 4, y - height / 2],
      [x - width / 2, box.y - height - 4],
      [x - width / 2, box.y + box.height + 4],
    );
  }
  let best!: Box;
  let bestScore = Infinity;
  for (const [left, top] of candidates) {
    const box = {
      x: Math.max(0, Math.min(left, view[0] - width)),
      y: Math.max(0, Math.min(top, view[1] - height)),
      width,
      height,
    };
    const collisions =
      boxes.reduce((sum, other) => sum + overlap(box, padded(other)), 0) +
      segments.reduce((sum, segment) => sum + insideLength(segment, padded(box)) * 6, 0);
    const score = collisions * 100 + Math.hypot(box.x - candidates[0][0], box.y - candidates[0][1]);
    if (score < bestScore) {
      best = box;
      bestScore = score;
    }
  }
  return best;
}

/** Route only explanation leaders; explicit annotation lines retain their original geometry. */
export function routeLeader(
  anchor: Point,
  target: Box,
  boxes: Box[],
  segments: Segment[],
): Point[] {
  const [x, y] = anchor;
  const edge: Point = [
    Math.max(target.x, Math.min(x, target.x + target.width)),
    Math.max(target.y, Math.min(y, target.y + target.height)),
  ];
  if (edge[0] === x && edge[1] === y) return [];
  const obstacles = boxes.filter(
    (box) =>
      box !== target &&
      !(x >= box.x && x <= box.x + box.width && y >= box.y && y <= box.y + box.height),
  );
  const routes: Point[][] = [
    [anchor, edge],
    [anchor, [edge[0], y], edge],
    [anchor, [x, edge[1]], edge],
  ];
  for (const box of obstacles) {
    if (!insideLength([anchor, edge], padded(box))) continue;
    for (const lane of [box.x - 6, box.x + box.width + 6])
      routes.push([anchor, [lane, y], [lane, edge[1]], edge]);
    for (const lane of [box.y - 6, box.y + box.height + 6])
      routes.push([anchor, [x, lane], [edge[0], lane], edge]);
  }
  const score = (route: Point[]) =>
    route.slice(1).reduce((sum, point, index) => {
      const segment: Segment = [route[index], point];
      return (
        sum +
        Math.hypot(point[0] - segment[0][0], point[1] - segment[0][1]) +
        obstacles.reduce((cost, box) => cost + insideLength(segment, box) * 100, 0) +
        segments.reduce((cost, other) => cost + (crosses(segment, other) ? 40 : 0), 0) +
        // A leader must approach the card from outside, never travel through its text.
        insideLength(segment, target) * 100
      );
    }, 0);
  return routes.reduce((best, route) => (score(route) < score(best) ? route : best));
}

function crosses([a, b]: Segment, [c, d]: Segment) {
  const side = (p: Point, q: Point, r: Point) =>
    (q[0] - p[0]) * (r[1] - p[1]) - (q[1] - p[1]) * (r[0] - p[0]);
  return side(a, b, c) * side(a, b, d) < 0 && side(c, d, a) * side(c, d, b) < 0;
}
