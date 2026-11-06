import { describe, expect, it } from 'vitest';
import {
  cardAttachment,
  crosses,
  differenceRoute,
  inflate,
  intersects,
  overlap,
  placeLabel,
  type Box,
  type Point,
  type Segment,
} from '../../src/annotation/layout';

describe('annotation layout', () => {
  const bounds = { x: 0, y: 0, width: 400, height: 240 };
  it('detects a line crossing a card even when both endpoints are outside', () => {
    const box = { x: 40, y: 40, width: 80, height: 24 };
    expect(
      crosses(box, [
        [0, 52],
        [180, 52],
      ]),
    ).toBe(true);
    expect(
      crosses(box, [
        [70, 0],
        [70, 100],
      ]),
    ).toBe(true);
    expect(
      crosses(box, [
        [0, 20],
        [180, 20],
      ]),
    ).toBe(false);
  });

  it('keeps edge callouts within the plot and away from their anchor', () => {
    for (const anchor of [
      [0, 0],
      [400, 0],
      [0, 240],
      [400, 240],
    ] as [number, number][]) {
      const point = { x: anchor[0] - 10, y: anchor[1] - 10, width: 20, height: 20 };
      const card = placeLabel(anchor, { width: 110, height: 32 }, bounds, [point]);
      expect(card.x).toBeGreaterThanOrEqual(0);
      expect(card.y).toBeGreaterThanOrEqual(0);
      expect(card.x + card.width).toBeLessThanOrEqual(bounds.width);
      expect(card.y + card.height).toBeLessThanOrEqual(bounds.height);
      expect(overlap(card, point)).toBe(0);
    }
  });

  it('separates nearby callouts and avoids a series running through their preferred location', () => {
    const occupied: Box[] = [{ x: 180, y: 110, width: 20, height: 20 }];
    const segment: [[number, number], [number, number]] = [
      [170, 75],
      [390, 75],
    ];
    for (let i = 0; i < 3; i++) {
      const card = placeLabel([190, 120], { width: 96, height: 28 }, bounds, occupied, [segment]);
      expect(occupied.every((other) => overlap(card, other) === 0)).toBe(true);
      expect(crosses(card, segment)).toBe(false);
      occupied.push(inflate(card, 6));
    }
  });

  it('attaches leaders to the card boundary', () => {
    const box = { x: 100, y: 60, width: 100, height: 32 };
    expect(cardAttachment([50, 80], box)).toEqual([100, 80]);
    expect(cardAttachment([140, 150], box)).toEqual([140, 92]);
  });

  it('detects crossed and overlapping leaders without conflating disjoint collinear segments', () => {
    const stem: Segment = [
      [100, 40],
      [100, 120],
    ];
    expect(
      intersects(stem, [
        [100, 80],
        [100, 160],
      ]),
    ).toBe(true);
    expect(
      intersects(stem, [
        [60, 80],
        [140, 80],
      ]),
    ).toBe(true);
    expect(
      intersects(stem, [
        [100, 130],
        [100, 180],
      ]),
    ).toBe(false);
  });

  it('places a callout so its leader does not overlap a comparison stem', () => {
    const anchor: Point = [220, 160];
    const stem: Segment = [
      [220, 40],
      [220, 150],
    ];
    const card = placeLabel(
      anchor,
      { width: 80, height: 28 },
      bounds,
      [{ x: 180, y: 160, width: 80, height: 80 }],
      [stem],
      16,
      true,
    );
    expect(intersects([anchor, cardAttachment(anchor, card)], stem)).toBe(false);
  });

  it('uses whitespace beside a horizontal bar rather than leading through another bar', () => {
    const anchor: Point = [235, 114];
    const bars: Box[] = [
      { x: 0, y: 24, width: 347, height: 44 },
      { x: 0, y: 92, width: 235, height: 44 },
      { x: 0, y: 160, width: 307, height: 44 },
      { x: 0, y: 228, width: 209, height: 44 },
    ];
    const card = placeLabel(
      anchor,
      { width: 108, height: 32 },
      { x: 8, y: 8, width: 546, height: 280 },
      [...bars.map((bar) => inflate(bar, 2)), { x: 283, y: 103, width: 82, height: 36 }],
      [],
      16,
      true,
    );
    const leader: Segment = [anchor, cardAttachment(anchor, card)];
    expect(bars.filter((_, index) => index !== 1).every((bar) => !crosses(bar, leader))).toBe(true);
  });

  it('routes comparisons above data, preserving the caller-provided direction', () => {
    const forward = differenceRoute([60, 180], [180, 100]);
    const reverse = differenceRoute([180, 100], [60, 180]);
    expect(forward.points[1][1]).toBeLessThan(100);
    expect(forward.points[2][1]).toBe(forward.points[1][1]);
    expect(forward.points.at(-1)).toEqual([180, 90]);
    expect(reverse.points.at(-1)).toEqual([60, 170]);
    expect(forward.label[0]).toBe(120);
    expect(differenceRoute([60, 180], [180, 100], 1).label[1]).toBeLessThan(forward.label[1]);
  });

  it('uses a side bracket for vertically aligned observations', () => {
    const route = differenceRoute([80, 180], [80, 80]);
    expect(route.side).toBe(true);
    expect(route.points[1][0]).toBeGreaterThan(80);
    expect(route.points[2][0]).toBe(route.points[1][0]);
    expect(route.points.at(-1)).toEqual([90, 80]);
  });

  it('routes horizontal bar comparisons to the right and preserves direction', () => {
    const forward = differenceRoute([140, 50], [260, 140], 0, true);
    const reverse = differenceRoute([260, 140], [140, 50], 0, true);
    expect(forward.side).toBe(true);
    expect(forward.points[1][0]).toBeGreaterThan(260);
    expect(forward.points.at(-1)).toEqual([270, 140]);
    expect(reverse.points.at(-1)).toEqual([150, 50]);
    expect(differenceRoute([140, 50], [260, 140], 1, true).label[0]).toBeGreaterThan(
      forward.label[0],
    );
  });

  it.each([false, true])(
    'routes comparisons between opposite signs outside both bars (reverse=%s)',
    (reverse) => {
      const boxes: [Box, Box] = [
        { x: 100, y: 40, width: 30, height: 16 },
        { x: 55, y: 60, width: 45, height: 16 },
      ];
      const points: [Point, Point] = [
        [130, 48],
        [55, 68],
      ];
      if (reverse) {
        boxes.reverse();
        points.reverse();
      }
      const route = differenceRoute(points[0], points[1], 0, true, boxes);
      const segments = route.points
        .slice(1)
        .map((point, index): Segment => [route.points[index], point]);
      expect(segments.every((segment) => boxes.every((box) => !crosses(box, segment)))).toBe(true);
      expect(route.points.at(-1)).toEqual(reverse ? [140, 48] : [45, 68]);
    },
  );

  it('connects two negative bars from their left exterior edges', () => {
    const boxes: [Box, Box] = [
      { x: 55, y: 40, width: 45, height: 16 },
      { x: 30, y: 60, width: 70, height: 16 },
    ];
    const route = differenceRoute([55, 48], [30, 68], 0, true, boxes);
    expect(route.points[0][0]).toBeLessThan(55);
    expect(route.points[1][0]).toBeLessThan(30);
    expect(route.points.at(-1)).toEqual([20, 68]);
    route.points.slice(1).forEach((point, index) => {
      expect(boxes.every((box) => !crosses(box, [route.points[index], point]))).toBe(true);
    });
  });

  it('keeps exterior comparison lanes within a narrow plot', () => {
    const boxes: [Box, Box] = [
      { x: 52, y: 40, width: 15, height: 16 },
      { x: 18, y: 60, width: 34, height: 16 },
    ];
    const route = differenceRoute([67, 48], [18, 68], 1, true, boxes, {
      x: 8,
      y: 8,
      width: 240,
      height: 200,
    });
    expect(route.points.every(([x]) => x >= 8 && x <= 248)).toBe(true);
    route.points.slice(1).forEach((point, index) => {
      expect(boxes.every((box) => !crosses(box, [route.points[index], point]))).toBe(true);
    });
  });
});
