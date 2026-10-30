import { describe, expect, it } from 'vitest';
import {
  cardAttachment,
  crosses,
  differenceRoute,
  inflate,
  overlap,
  placeLabel,
  type Box,
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
});
