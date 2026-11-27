import { describe, expect, it } from 'vitest';
import { labelConnectors } from '../../../src/annotation/label';
import type { Point } from '../../../src/annotation/layout';
import { prepareAnnotations } from '../../../src/annotation/registry';
import type { G2AnnotationContext } from '../../../src/annotation/runtime';
import { getAnnotationStyle } from '../../../src/theme/annotation';
import { getThemeObject } from '../../../src/theme/g2';

const data = [10, 10, 20, 20, 20, 20].map((value, id) => ({ id, value }));
const coordinate = {
  getCenter: () => [100, 100],
  map: ([, angle]: number[]) => [
    100 + 60 * Math.cos(angle * Math.PI * 2),
    100 + 60 * Math.sin(angle * Math.PI * 2),
  ],
} as unknown as ReturnType<G2AnnotationContext<object>['getCoordinate']>;

/** Resolve the semantic selection, then supply measured sectors to its deferred connector layout. */
function layout(ids: number[], visible = ids) {
  const [entry] = prepareAnnotations<(typeof data)[number], 'g2'>(
    'g2',
    [{ type: 'contribution', data: ids.map((id) => ({ id })) }],
    {
      chartType: 'pie',
      mapping: { x: 'id', y: 'value', data },
      defaults: getAnnotationStyle(getThemeObject('pie')),
    },
  );
  if (!entry) return undefined;
  const selected = new Set(visible);
  let total = 0;
  const geometry = data.flatMap(({ id, value }) => {
    const y = total / 100;
    total += value;
    return selected.has(id) ? [{ points: [] as Point[], y, y1: total / 100 }] : [];
  });
  return labelConnectors.get(entry.annotation)!(
    geometry.map(({ y }) => coordinate.map([0, y]) as Point),
    geometry,
    coordinate,
    0,
    1,
  );
}

describe('contribution connector composition', () => {
  it('merges adjacent selections and preserves gaps for unselected sectors', () => {
    const bracket = layout([1, 2, 4])!;
    expect(bracket.paths).toHaveLength(2);
    for (const path of bracket.paths) {
      const angles = path.map(([x, y]) => (Math.atan2(y - 100, x - 100) / (Math.PI * 2) + 1) % 1);
      expect(
        angles.every((angle) => (angle >= 0.1 && angle <= 0.4) || (angle >= 0.6 && angle <= 0.8)),
      ).toBe(true);
    }
  });

  it('joins selections across the seam and handles full and empty selections', () => {
    expect(layout([0, 5])!.paths).toHaveLength(1);
    const full = layout(data.map(({ id }) => id))!;
    expect(full.paths).toHaveLength(1);
    expect(full.paths.flat(2).every(Number.isFinite)).toBe(true);
    expect(layout([0], [])).toBeUndefined();
  });
});
