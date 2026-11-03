/** Internal geometry in renderer coordinates. No placement options leak into the public API. */
export type Point = [number, number];
export type Segment = [Point, Point];
export interface Box {
  x: number;
  y: number;
  width: number;
  height: number;
}

export const inflate = (box: Box, gap: number): Box => ({
  x: box.x - gap,
  y: box.y - gap,
  width: box.width + gap * 2,
  height: box.height + gap * 2,
});

export function overlap(a: Box, b: Box): number {
  return (
    Math.max(0, Math.min(a.x + a.width, b.x + b.width) - Math.max(a.x, b.x)) *
    Math.max(0, Math.min(a.y + a.height, b.y + b.height) - Math.max(a.y, b.y))
  );
}

/** Segment/rectangle intersection, including segments which cross without an endpoint inside. */
export function crosses(box: Box, [a, b]: Segment): boolean {
  let lo = 0;
  let hi = 1;
  for (const [start, delta, min, max] of [
    [a[0], b[0] - a[0], box.x, box.x + box.width],
    [a[1], b[1] - a[1], box.y, box.y + box.height],
  ]) {
    if (delta === 0) {
      if (start < min || start > max) return false;
    } else {
      const t0 = (min - start) / delta;
      const t1 = (max - start) / delta;
      lo = Math.max(lo, Math.min(t0, t1));
      hi = Math.min(hi, Math.max(t0, t1));
      if (lo > hi) return false;
    }
  }
  return true;
}

/** Includes collinear overlap, so leaders cannot share a comparison's stem. */
export function intersects([a, b]: Segment, [c, d]: Segment): boolean {
  const cross = (p: Point, q: Point, r: Point) =>
    (q[0] - p[0]) * (r[1] - p[1]) - (q[1] - p[1]) * (r[0] - p[0]);
  return (
    Math.max(Math.min(a[0], b[0]), Math.min(c[0], d[0])) <=
      Math.min(Math.max(a[0], b[0]), Math.max(c[0], d[0])) &&
    Math.max(Math.min(a[1], b[1]), Math.min(c[1], d[1])) <=
      Math.min(Math.max(a[1], b[1]), Math.max(c[1], d[1])) &&
    cross(a, b, c) * cross(a, b, d) <= 0 &&
    cross(c, d, a) * cross(c, d, b) <= 0
  );
}

/** Prefer nearby whitespace; keep every explanation, even when a dense chart has no perfect slot. */
export function placeLabel(
  anchor: Point,
  size: { width: number; height: number },
  bounds: Box,
  occupied: Box[],
  segments: Segment[] = [],
  preferredGap = 24,
  connector = false,
): Box {
  const width = Math.min(size.width, bounds.width);
  const height = Math.min(size.height, bounds.height);
  let best: Box = { x: bounds.x, y: bounds.y, width, height };
  let bestScore = Infinity;
  for (const gap of [
    preferredGap,
    preferredGap + 20,
    preferredGap + 48,
    preferredGap + 84,
    preferredGap + 132,
  ]) {
    for (const [dx, dy] of [
      [1, -1],
      [-1, -1],
      [1, 1],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, 0],
      [-1, 0],
      ...(connector
        ? [
            [1, -0.25],
            [-1, -0.25],
            [1, 0.25],
            [-1, 0.25],
          ]
        : []),
    ]) {
      const x = anchor[0] + (dx === 0 ? -width / 2 : dx > 0 ? gap : -gap - width);
      const yGap = gap * Math.abs(dy);
      const y = anchor[1] + (dy === 0 ? -height / 2 : dy > 0 ? yGap : -yGap - height);
      const box = {
        x: Math.max(bounds.x, Math.min(x, bounds.x + bounds.width - width)),
        y: Math.max(bounds.y, Math.min(y, bounds.y + bounds.height - height)),
        width,
        height,
      };
      const clearance = inflate(box, 6);
      const leader: Segment = [anchor, cardAttachment(anchor, box)];
      const score =
        occupied.reduce((sum, other) => sum + overlap(clearance, other) * 1000, 0) +
        segments.filter((segment) => crosses(clearance, segment)).length * 2400 +
        (connector
          ? occupied.filter((other) => crosses(other, leader)).length * 2400 +
            segments.filter((segment) => intersects(leader, segment)).length * 12000
          : 0) +
        Math.hypot(box.x + width / 2 - anchor[0], box.y + height / 2 - anchor[1]) +
        (dy > 0 ? 8 : 0);
      if (score < bestScore) {
        best = box;
        bestScore = score;
      }
    }
  }
  return best;
}

/** Nearest attachment on the card; the line never passes through its text. */
export function cardAttachment(anchor: Point, box: Box): Point {
  return [
    Math.max(box.x, Math.min(anchor[0], box.x + box.width)),
    Math.max(box.y, Math.min(anchor[1], box.y + box.height)),
  ];
}

/** Offset measurement bracket with a directed terminal, independent of data-unit distances. */
export function differenceRoute(
  from: Point,
  to: Point,
  lane = 0,
  transpose = false,
  boxes?: [Box, Box],
  bounds?: Box,
) {
  if (transpose && boxes) {
    const [a, b] = boxes;
    const fromSide = from[0] === a.x ? -1 : 1;
    const toSide = to[0] === b.x ? -1 : 1;
    const left = Math.max(bounds?.x ?? -Infinity, Math.min(a.x, b.x) - 38 - lane * 34);
    const right = Math.min(
      bounds ? bounds.x + bounds.width : Infinity,
      Math.max(a.x + a.width, b.x + b.width) + 38 + lane * 34,
    );
    const start: Point = [from[0] + fromSide * 10, from[1]];
    const end: Point = [to[0] + toSide * 10, to[1]];
    if (fromSide !== toSide) {
      // Opposite signs need both exterior sides, joined in the gap between bars.
      const [upper, lower] = a.y < b.y ? [a, b] : [b, a];
      const y = (upper.y + upper.height + lower.y) / 2;
      const x1 = fromSide < 0 ? left : right;
      const x2 = toSide < 0 ? left : right;
      return {
        points: [start, [x1, from[1]], [x1, y], [x2, y], [x2, to[1]], end] as Point[],
        label: [right, y] as Point,
        side: true,
      };
    }
    const x = fromSide < 0 ? left : right;
    return {
      points: [start, [x, from[1]], [x, to[1]], end] as Point[],
      label: [x, (from[1] + to[1]) / 2] as Point,
      side: true,
    };
  }
  if (transpose || Math.abs(to[0] - from[0]) < 28) {
    const x = Math.max(from[0], to[0]) + 38 + lane * 34;
    return {
      points: [
        [from[0] + 10, from[1]],
        [x, from[1]],
        [x, to[1]],
        [to[0] + 10, to[1]],
      ] as Point[],
      label: [x, (from[1] + to[1]) / 2] as Point,
      side: true,
    };
  }
  const y = Math.min(from[1], to[1]) - 40 - lane * 34;
  return {
    points: [
      [from[0], from[1] - 10],
      [from[0], y],
      [to[0], y],
      [to[0], to[1] - 10],
    ] as Point[],
    label: [(from[0] + to[0]) / 2, y] as Point,
    side: false,
  };
}
