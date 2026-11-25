import { describe, expect, it } from 'vitest';
import { crossing } from '../../../src/annotation/components/crossing';
import type { G2AnnotationContext } from '../../../src/annotation/runtime';
import { getAnnotationStyle } from '../../../src/theme/annotation';
import { getThemeObject } from '../../../src/theme/g2';
import type { Annotation } from '../../../src/types/annotation';

type Row = { x: number | string; y: number | null; group?: string };
const data: Row[] = [
  { x: 0, y: 10 },
  { x: 2, y: 30 },
  { x: 4, y: 20 },
];
const defaults = getAnnotationStyle(getThemeObject('line'));
function configs(
  annotations: Extract<Annotation<Row>, { type: 'crossing' }>[],
  rows = data,
  overrides: Partial<Pick<G2AnnotationContext<Row>, 'chartType' | 'sourceMarks' | 'mapping'>> = {},
) {
  const result = crossing.g2(annotations, {
    chartType: 'line',
    mapping: { x: 'x', y: 'y', data: rows },
    defaults,
    ...overrides,
  });
  if (!Array.isArray(result)) throw new Error('Crossing must return annotation configurations.');
  return result.filter((config) => typeof config !== 'function');
}
function points(...args: Parameters<typeof configs>) {
  return configs(...args).filter((annotation) => annotation.type === 'point');
}

describe('crossing calculations', () => {
  const samples = (values: (number | null)[]): Row[] => values.map((y, x) => ({ x, y }));
  it('keeps area crossings and their reference without adding a competing relationship fill', () => {
    const rows = samples([-1, 1, -1]);
    const annotations = [{ type: 'crossing' as const, threshold: 0 }];
    const area = configs(annotations, rows, { chartType: 'area' });
    const line = configs(annotations, rows);
    expect(area.filter((annotation) => annotation.type === 'path')).toMatchObject([
      { data: { y: 0 }, label: 'Threshold: 0' },
    ]);
    expect(line.filter((annotation) => annotation.type === 'path').length).toBeGreaterThan(1);
    expect(area.filter((annotation) => annotation.type === 'point')).toEqual(
      line.filter((annotation) => annotation.type === 'point'),
    );
  });
  it('interpolates numeric threshold crossings and filters direction', () => {
    expect(
      points(
        [{ type: 'crossing', threshold: 2 }],
        [
          { x: 0, y: 0 },
          { x: 2, y: 4 },
          { x: 4, y: 0 },
        ],
      ),
    ).toMatchObject([
      { data: { x: 1, y: 2 }, label: 'Crosses above 2' },
      { data: { x: 3, y: 2 }, label: 'Crosses below 2' },
    ]);
    expect(
      points([{ type: 'crossing', threshold: 0, direction: 'down' }], samples([-1, 1, -1])),
    ).toMatchObject([{ data: { x: 1.5, y: 0 } }]);
  });
  it.each([
    [[-1, 0, -1], []],
    [[-1, 0, 0, 1], [{ x: 1, y: 0 }]],
    [[-1, null, 1], []],
    [[0, 0, 1], []],
    [[-1, 0, null, 1], []],
  ] satisfies [(number | null)[], object[]][])(
    'handles touches, equal plateaus and gaps: %j',
    (values, expected) => {
      expect(
        points([{ type: 'crossing', threshold: 0 }], samples(values)).map(({ data }) => data),
      ).toEqual(expected);
    },
  );
  it('compares differently sampled series only over their shared domain', () => {
    const rows = [
      { x: 0, y: 0, group: 'A' },
      { x: 4, y: 4, group: 'A' },
      { x: 1, y: 3, group: 'B' },
      { x: 3, y: 1, group: 'B' },
    ];
    const result = points(
      [{ type: 'crossing', data: { series: [{ group: 'A' }, { group: 'B' }] } }],
      rows,
      { mapping: { data: rows, x: 'x', y: 'y', series: 'group' } },
    );
    expect(result).toMatchObject([{ data: { x: 2, y: 2 }, label: 'Crosses above' }]);
    expect(rows[0].x).toBe(0);
  });
  it('uses observed categories and supports descending numeric input without mutating it', () => {
    expect(
      points(
        [{ type: 'crossing', threshold: 0 }],
        [
          { x: 'Jan', y: -1 },
          { x: 'Feb', y: 1 },
        ],
      ),
    ).toMatchObject([{ data: { x: 'Feb', y: 1 } }]);
    const rows = [
      { x: 2, y: 1 },
      { x: 0, y: -1 },
    ];
    expect(points([{ type: 'crossing', threshold: 0 }], rows)).toMatchObject([
      { data: { x: 1, y: 0 } },
    ]);
    expect(rows[0].x).toBe(2);
  });
  it('rejects incompatible geometry and selectors before drawing', () => {
    expect(
      points([{ type: 'crossing', threshold: 20 }], data, {
        sourceMarks: [
          { type: 'line', style: { shape: 'line' } },
          { type: 'point', style: { shape: 'point' } },
        ],
      }),
    ).toHaveLength(1);
    expect(() =>
      configs([{ type: 'crossing', threshold: 0 }], data, {
        sourceMarks: [{ type: 'line', transform: [{ type: 'stackY' }] }],
      }),
    ).toThrow('unstacked');
    expect(() =>
      configs(
        [{ type: 'crossing', threshold: 0 }],
        [
          { x: 1, y: 0 },
          { x: 1, y: 1 },
        ],
      ),
    ).toThrow('unique x');
    expect(() => configs([{ type: 'crossing', data: { series: [{ x: 0 }, { x: 0 }] } }])).toThrow(
      'overlap',
    );
  });
});
