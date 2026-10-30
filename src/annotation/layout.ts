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

/** Prefer nearby whitespace; keep every explanation, even when a dense chart has no perfect slot. */
export function placeLabel(
  anchor: Point,
  size: { width: number; height: number },
  bounds: Box,
  occupied: Box[],
  segments: Segment[] = [],
  preferredGap = 24,
): Box {
  const width = Math.min(size.width, bounds.width);
  const height = Math.min(size.height, bounds.height);
  let best: Box = { x: bounds.x, y: bounds.y, width, height };
  let bestScore = Infinity;
  for (const gap of [preferredGap, preferredGap + 20, preferredGap + 48, preferredGap + 84]) {
    for (const [dx, dy] of [
      [1, -1],
      [-1, -1],
      [1, 1],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, 0],
      [-1, 0],
    ]) {
      const x = anchor[0] + (dx === 0 ? -width / 2 : dx > 0 ? gap : -gap - width);
      const y = anchor[1] + (dy === 0 ? -height / 2 : dy > 0 ? gap : -gap - height);
      const box = {
        x: Math.max(bounds.x, Math.min(x, bounds.x + bounds.width - width)),
        y: Math.max(bounds.y, Math.min(y, bounds.y + bounds.height - height)),
        width,
        height,
      };
      const clearance = inflate(box, 6);
      const score =
        occupied.reduce((sum, other) => sum + overlap(clearance, other) * 1000, 0) +
        segments.filter((segment) => crosses(clearance, segment)).length * 2400 +
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
export function differenceRoute(from: Point, to: Point, lane = 0) {
  if (Math.abs(to[0] - from[0]) < 28) {
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
