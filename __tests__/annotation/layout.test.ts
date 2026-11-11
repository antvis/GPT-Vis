import { describe, expect, it } from 'vitest';
import { placeLabel, routeLeader, type Box } from '../../src/annotation/layout';

const overlap = (a: Box, b: Box) =>
  a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;

describe('annotation layout', () => {
  it('avoids measured marks, fixed text and lines while remaining inside the plot', () => {
    const boxes = [
      { x: 70, y: 30, width: 60, height: 40 },
      { x: 140, y: 80, width: 50, height: 40 },
    ];
    const result = placeLabel([100, 100], [60, 40], [220, 180], 12, boxes, [
      [
        [0, 80],
        [220, 80],
      ],
    ]);
    expect(boxes.some((box) => overlap(result, box))).toBe(false);
    expect(result.y).toBeGreaterThan(80);
    expect(result.x).toBeGreaterThanOrEqual(0);
    expect(result.y + result.height).toBeLessThanOrEqual(180);
  });

  it('uses a less obstructed position when all four nearby positions are blocked', () => {
    const boxes = [
      { x: 70, y: 40, width: 60, height: 50 },
      { x: 70, y: 110, width: 60, height: 50 },
      { x: 110, y: 80, width: 70, height: 40 },
      { x: 20, y: 80, width: 70, height: 40 },
    ];
    const result = placeLabel([100, 100], [50, 30], [240, 240], 10, boxes, []);
    expect(boxes.some((box) => overlap(result, box))).toBe(false);
    expect(placeLabel([100, 100], [50, 30], [240, 240], 10, boxes, [])).toEqual(result);
  });

  it('places a wide label diagonally when a sloped connector crosses all four side positions', () => {
    const box = placeLabel(
      [150, 150],
      [120, 24],
      [300, 300],
      8,
      [],
      [
        [
          [0, 300],
          [300, 0],
        ],
      ],
    );
    // The whole background, including its clearance, stays above x + y = 300.
    expect(box.x + box.width + box.y + box.height).toBeLessThan(296);
  });

  it('routes to the card boundary around another card without crossing its text', () => {
    const target = { x: 150, y: 80, width: 50, height: 40 };
    const obstacle = { x: 60, y: 70, width: 50, height: 60 };
    const route = routeLeader([20, 100], target, [target, obstacle], []);
    expect(route[0]).toEqual([20, 100]);
    expect(route.at(-1)).toEqual([150, 100]);
    expect(route.some(([, y]) => y < obstacle.y || y > obstacle.y + obstacle.height)).toBe(true);
    expect(routeLeader([160, 100], target, [target], [])).toEqual([]);
  });
});
