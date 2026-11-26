import { describe, expect, it } from 'vitest';
import { centroid } from '../../../src/annotation/components/centroid';
import { getAnnotationStyle } from '../../../src/theme/annotation';
import { getThemeObject } from '../../../src/theme/g2';
import type { Annotation } from '../../../src/types/annotation';

type Row = { x: number; y: number; weight?: number; group?: string };
const defaults = getAnnotationStyle(getThemeObject('scatter'));
function points(annotations: Extract<Annotation<Row>, { type: 'centroid' }>[], data: Row[]) {
  return centroid.g2(annotations, {
    chartType: 'scatter',
    mapping: { x: 'x', y: 'y', data },
    defaults,
  });
}

describe('centroid calculations', () => {
  it('computes ordinary and weighted centers, including very large finite weights', () => {
    const rows = [
      { x: 0, y: 2, weight: 1e308 },
      { x: 8, y: 6, weight: 1e308 },
    ];
    expect(
      points([{ type: 'centroid' }, { type: 'centroid', weight: 'weight' }], rows),
    ).toMatchObject([{ data: { x: 4, y: 4 } }, { data: { x: 4, y: 4 } }]);
    expect(
      points(
        [{ type: 'centroid', weight: 'weight' }],
        [
          { x: 0, y: 2, weight: 1 },
          { x: 8, y: 6, weight: 3 },
        ],
      ),
    ).toMatchObject([{ data: { x: 6, y: 5 } }]);
    expect(() =>
      points([{ type: 'centroid', weight: 'weight' }], [{ x: 1, y: 2, weight: -1 }]),
    ).toThrow('nonnegative');
    expect(() =>
      points([{ type: 'centroid', weight: 'weight' }], [{ x: 1, y: 2, weight: 0 }]),
    ).toThrow('positive total');
  });
});
