import { describe, expect, it } from 'vitest';
import { cartesianBracket, radialBracket } from '../../src/annotation/bracket';
import type { G2AnnotationContext } from '../../src/annotation/runtime/g2';

const coordinate = {
  getCenter: () => [100, 100],
  map: ([, angle]: number[]) => [
    100 + 60 * Math.cos(angle * Math.PI * 2),
    100 + 60 * Math.sin(angle * Math.PI * 2),
  ],
} as unknown as ReturnType<G2AnnotationContext<object>['getCoordinate']>;

describe('contribution brackets', () => {
  it('spans selected geometry with one brace above columns or to the right of bars', () => {
    const points: [number, number][] = [
      [20, 80],
      [40, 30],
      [80, 60],
    ];
    const top = cartesianBracket(points, [], 'top')!;
    expect(top.paths).toHaveLength(1);
    expect(top.anchor).toEqual([50, 12]);
    expect(top.paths[0][0][0]).toBe(20);
    expect(top.paths[0].at(-1)![0]).toBe(80);
    const right = cartesianBracket(points, [], 'right')!;
    expect(right.anchor).toEqual([98, 55]);
    expect(right.paths[0].every(([x]) => x > 80)).toBe(true);
    expect(cartesianBracket([], [], 'top')).toBeUndefined();
  });

  it('merges adjacent sectors while leaving gaps for unselected sectors', () => {
    const bracket = radialBracket(
      [
        { y: 0.1, y1: 0.2 },
        { y: 0.2, y1: 0.4 },
        { y: 0.6, y1: 0.8 },
      ],
      coordinate,
    )!;
    expect(bracket.paths).toHaveLength(2);
    for (const path of bracket.paths) {
      const angles = path.map(([x, y]) => (Math.atan2(y - 100, x - 100) / (Math.PI * 2) + 1) % 1);
      expect(
        angles.every((angle) => (angle >= 0.1 && angle <= 0.4) || (angle >= 0.6 && angle <= 0.8)),
      ).toBe(true);
    }
  });

  it('joins selected sectors across the seam and handles full circles and empty selections', () => {
    expect(
      radialBracket(
        [
          { y: 0, y1: 0.2 },
          { y: 0.8, y1: 1 },
        ],
        coordinate,
      )!.paths,
    ).toHaveLength(1);
    const full = radialBracket([{ y: 0, y1: 1 }], coordinate)!;
    expect(full.paths).toHaveLength(1);
    expect(full.paths.flat(2).every(Number.isFinite)).toBe(true);
    expect(radialBracket([], coordinate)).toBeUndefined();
  });
});
