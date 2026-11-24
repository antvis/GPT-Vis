import { Chart, type MarkComponent } from '@antv/g2';
import { describe, expect, it } from 'vitest';
import { bindAnnotations } from '../../src/annotation';
import type { RendererAnnotation } from '../../src/annotation/registry';
import { prepareAnnotations } from '../../src/annotation/registry';
import type { G2AnnotationContext, TableContext } from '../../src/annotation/runtime';
import { selectThreshold } from '../../src/annotation/utils';
import { getAnnotationDefaults, getAnnotationStyle } from '../../src/theme/annotation';
import { getThemeObject } from '../../src/theme/g2';

type Row = {
  id: string;
  time: number | string;
  value: number | null;
  group: string;
  weight?: number;
};
const data: Row[] = [
  { id: 'A', time: 3, value: 20, group: 'North' },
  { id: 'B', time: 1, value: 40, group: 'North' },
  { id: 'C', time: 4, value: 40, group: 'South' },
  { id: 'D', time: 2, value: 10, group: 'South' },
];
const defaults = getAnnotationStyle(getThemeObject('line'));
const tableDefaults = getAnnotationDefaults('table');
function resolve<T extends object>(
  annotations: RendererAnnotation<T, 'g2'>[],
  context: Pick<G2AnnotationContext<T>, 'chartType' | 'mapping' | 'defaults'> &
    Partial<Pick<G2AnnotationContext<T>, 'sourceMarks'>>,
) {
  return prepareAnnotations<T, 'g2'>('g2', annotations, context).map(
    ({ annotation }) => annotation,
  );
}
function resolveTable<T extends object>(
  annotations: RendererAnnotation<T, 'table'>[],
  context: Pick<TableContext<T>, 'data' | 'defaults'>,
) {
  return prepareAnnotations<T, 'table'>('table', annotations, {
    ...context,
    chartType: 'table',
  }).map(({ annotation }) => annotation);
}
function highlights(annotations: RendererAnnotation<Row, 'g2'>[], rows = data) {
  return resolve(annotations, {
    chartType: 'line',
    mapping: { x: 'time', y: 'value', data: rows },
    defaults,
  }).filter(
    (annotation): annotation is Extract<RendererAnnotation<Row, 'g2'>, { type: 'highlight' }> =>
      annotation.type === 'highlight',
  );
}
function ids(annotation: RendererAnnotation<Row, 'g2'>, rows = data) {
  return highlights([annotation], rows).flatMap(({ data: selected }) =>
    (Array.isArray(selected) ? selected : [selected]).map((row) => row.id),
  );
}

describe('highlight selection semantics', () => {
  it.each([
    ['maxX', ['C']],
    ['minX', ['B']],
    ['maxY', ['B', 'C']],
    ['minY', ['D']],
    ['first', ['A']],
    ['last', ['D']],
  ] as const)('selects %s from original fields and order', (type, expected) => {
    expect(ids({ type })).toEqual(expected);
  });

  it('separates calculation options from identically named original fields', () => {
    const rows = [
      { field: 'A', n: 5 },
      { field: 'B', n: 10 },
      { field: 'A', n: 8 },
    ];
    const before = structuredClone(rows);
    const result = resolve([{ type: 'topN', n: 1, data: { field: 'A' } }], {
      chartType: 'line',
      mapping: { x: 'field', y: 'n', data: rows },
      defaults,
    });
    expect(result.filter(({ type }) => type === 'highlight')).toMatchObject([
      { type: 'highlight', data: [rows[2]], label: 'Top 1' },
    ]);
    expect(rows).toEqual(before);
  });

  it('compares ISO dates for x extremes without sorting the source', () => {
    const rows = data.map((row, index) => ({
      ...row,
      time: ['2026-01-03', '2026-01-01', '2026-01-04', '2026-01-02'][index],
    }));
    expect(ids({ type: 'maxX' }, rows)).toEqual(['C']);
    expect(ids({ type: 'minX' }, rows)).toEqual(['B']);
    expect(ids({ type: 'first' }, rows)).toEqual(['A']);
    expect(ids({ type: 'last' }, rows)).toEqual(['D']);
  });

  it('scopes computations to original-field selectors and preserves business order', () => {
    expect(ids({ type: 'maxY', data: { group: 'South' } })).toEqual(['C']);
    expect(ids({ type: 'first', data: [{ id: 'C' }, { id: 'B' }] })).toEqual(['B']);
    expect(ids({ type: 'last', data: { group: 'North' } })).toEqual(['B']);
  });

  it.each([
    [{ type: 'topN', n: 2 }, ['B', 'C']],
    [{ type: 'topN', n: 1 }, ['B']],
    [{ type: 'bottomN', n: 2 }, ['D', 'A']],
    [{ type: 'bottomN', n: 99 }, ['D', 'A', 'B', 'C']],
    [{ type: 'topN', n: 1, data: { group: 'South' } }, ['C']],
  ] satisfies [RendererAnnotation<Row, 'g2'>, string[]][])(
    'ranks %j without mutation',
    (annotation, expected) => {
      const before = structuredClone(data);
      expect(ids(annotation)).toEqual(expected);
      expect(data).toEqual(before);
    },
  );

  it('uses the mapped numeric field and ignores missing and nonfinite values', () => {
    const rows = data.map((row, index) => ({ ...row, value: [2, 1, NaN, 5][index] }));
    expect(ids({ type: 'topN', n: 2 }, rows)).toEqual(['D', 'A']);
    expect(
      ids(
        { type: 'maxY' },
        rows.map((row) => ({ ...row, value: null })),
      ),
    ).toEqual([]);
    expect(
      ids(
        { type: 'topN', n: 2 },
        rows.map((row) => ({ ...row, value: Infinity })),
      ),
    ).toEqual([]);
  });

  it.each(['line', 'area', 'column', 'bar', 'scatter'] as const)(
    'expands group to the selected series in %s',
    (chartType) => {
      const selected = resolve([{ type: 'group', data: { group: 'North' } }], {
        chartType,
        mapping: { x: 'time', y: 'value', series: 'group', data },
        sourceMarks: [{ type: 'interval', transform: [{ type: 'dodgeX' }] }],
        defaults,
      }).filter(({ type }) => type === 'highlight');
      expect(selected).toEqual([{ type: 'highlight', data: [data[0], data[1]] }]);
    },
  );

  it('rejects group for pie charts', () => {
    expect(() =>
      resolve([{ type: 'group', data: { group: 'North' } }], {
        chartType: 'pie',
        mapping: { x: 'id', y: 'value', data },
        defaults,
      }),
    ).toThrow('Unsupported pie annotation type: group');
  });

  it.each(['column', 'bar'] as const)(
    'requires grouped or stacked layout for %s groups',
    (chartType) => {
      const context = {
        chartType,
        mapping: { x: 'time' as const, y: 'value' as const, series: 'group' as const, data },
        defaults,
      };
      expect(() => resolve([{ type: 'group', data: { group: 'North' } }], context)).toThrow(
        'grouped or stacked',
      );
      expect(
        resolve([{ type: 'group', data: [{ group: 'North' }, { group: 'South' }] }], {
          ...context,
          sourceMarks: [{ type: 'interval', transform: [{ type: 'stackY' }] }],
        }),
      ).toEqual([{ type: 'highlight', data }]);
    },
  );

  it('requires real series and rejects partial, empty or nonexistent group targets', () => {
    const context = {
      chartType: 'line' as const,
      mapping: { x: 'time' as const, y: 'value' as const, data },
      defaults,
    };
    expect(() => resolve([{ type: 'group', data: { group: 'North' } }], context)).toThrow(
      'series mapping',
    );
    for (const target of [{ time: 3 }, { group: 'North', time: 3 }, {}, [], undefined]) {
      expect(() =>
        resolve([{ type: 'group', data: target } as RendererAnnotation<Row, 'g2'>], {
          ...context,
          mapping: { ...context.mapping, series: 'group' },
        }),
      ).toThrow('data.group');
    }
    expect(() =>
      resolve([{ type: 'group', data: { group: 'Missing' } }], {
        ...context,
        mapping: { ...context.mapping, series: 'group' },
      }),
    ).toThrow('matches no series');
  });

  it('computes each interleaved series independently and scopes automatic detection', () => {
    const rows = [1, 9, 4, 2, 1, 9].map((value, index) => ({
      id: String(index),
      time: Math.floor(index / 2),
      value,
      group: index % 2 ? 'South' : 'North',
    }));
    const before = structuredClone(rows);
    const context = {
      chartType: 'line' as const,
      mapping: { x: 'time' as const, y: 'value' as const, series: 'group' as const, data: rows },
      defaults,
    };
    expect(
      resolve([{ type: 'peak' }], context).filter(({ type }) => type === 'highlight'),
    ).toMatchObject([{ data: [rows[2]] }]);
    expect(
      resolve([{ type: 'valley' }], context).filter(({ type }) => type === 'highlight'),
    ).toMatchObject([{ data: [rows[3]] }]);
    expect(resolve([{ type: 'peak', data: { group: 'South' } }], context)).toEqual([]);
    expect(rows).toEqual(before);
  });

  it('labels each ranked observation and permits exact overrides or suppression', () => {
    expect(highlights([{ type: 'topN', n: 2 }]).map(({ label }) => label)).toEqual([
      'Top 1',
      'Top 2',
    ]);
    expect(
      highlights([{ type: 'bottomN', label: 'Revenue', n: 2 }]).map(({ label }) => label),
    ).toEqual(['Revenue', 'Revenue']);
    expect(highlights([{ type: 'topN', label: '', n: 2 }]).map(({ label }) => label)).toEqual([
      '',
      '',
    ]);
  });

  it('gives every selected observation its own default, override or suppressed label', () => {
    for (const annotation of [
      { type: 'maxY' },
      { type: 'rangeInside', range: [20, 40] },
    ] satisfies RendererAnnotation<Row, 'g2'>[]) {
      const defaults = highlights([annotation]);
      expect(defaults.length).toBeGreaterThan(1);
      expect(
        defaults.every(
          ({ data, label }) =>
            Array.isArray(data) && data.length === 1 && label?.includes(String(data[0].value)),
        ),
      ).toBe(true);
      expect(
        highlights([{ ...annotation, label: 'Focus' }]).every(({ label }) => label === 'Focus'),
      ).toBe(true);
      expect(highlights([{ ...annotation, label: '' }]).every(({ label }) => label === '')).toBe(
        true,
      );
    }
  });

  it('chooses an unused theme color consistently for multi-series thresholds', () => {
    const mapping = { x: 'time' as const, y: 'value' as const, series: 'group' as const, data };
    const [reference, selected] = resolve([{ type: 'thresholdHighlight', threshold: 30 }], {
      chartType: 'scatter',
      mapping,
      defaults,
    });
    expect(reference).toMatchObject({ style: { stroke: defaults.palette[2] } });
    expect(selected).toMatchObject({ style: { fill: defaults.palette[2] } });
    const monochrome = getAnnotationStyle(
      getThemeObject('line', 'default', { palette: ['#123456'] }),
    );
    const result = resolve([{ type: 'thresholdHighlight', threshold: 30 }], {
      chartType: 'line',
      mapping,
      defaults: monochrome,
    });
    expect(result.find(({ type }) => type === 'path')).toMatchObject({
      style: { stroke: monochrome.labels.highlight.fill },
    });
  });

  it('keeps native threshold drawing separate from whole-observation highlight selection', () => {
    const context = {
      chartType: 'line' as const,
      mapping: { x: 'time' as const, y: 'value' as const, data },
      defaults,
    };
    const [region, reference] = resolve([{ type: 'thresholdHighlight', threshold: 30 }], context);
    expect(reference).toMatchObject({
      type: 'path',
      data: { value: 30 },
      label: 'Threshold: 30',
      style: { stroke: defaults.highlight.color, lineDash: [4, 4] },
    });
    expect(region).toMatchObject({ type: 'thresholdHighlight', threshold: 30 });
    expect(
      resolve([{ type: 'thresholdHighlight', label: '', threshold: 100 }], context),
    ).toMatchObject([{ type: 'thresholdHighlight' }, { type: 'path', label: '' }]);
    expect(
      resolve(
        [
          {
            type: 'thresholdHighlight',
            style: { fill: '#f00', labelFill: '#123456', labelFontSize: 15 },
            threshold: 30,
          },
        ],
        context,
      ),
    ).toMatchObject([
      { type: 'thresholdHighlight', style: { fill: '#f00' } },
      { type: 'path', style: { stroke: '#f00', labelFill: '#123456', labelFontSize: 15 } },
    ]);
  });

  it.each([
    [{ type: 'thresholdHighlight', threshold: 20 }, ['B', 'C']],
    [{ type: 'thresholdHighlight', threshold: 20, inclusive: true }, ['A', 'B', 'C']],
    [{ type: 'thresholdHighlight', threshold: 20, direction: 'below' }, ['D']],
    [
      { type: 'thresholdHighlight', threshold: 20, direction: 'below', inclusive: true },
      ['A', 'D'],
    ],
    [{ type: 'rangeInside', range: [20, 40] }, ['A', 'B', 'C']],
    [{ type: 'rangeOutside', range: [20, 40] }, ['D']],
    [{ type: 'rangeInside', range: [40, 40] }, ['B', 'C']],
  ] satisfies [RendererAnnotation<Row, 'g2'>, string[]][])(
    'handles boundaries for %j',
    (annotation, expected) => {
      if (annotation.type === 'thresholdHighlight')
        expect(selectThreshold(data, 'value', annotation).map((row) => row.id)).toEqual(expected);
      else expect(ids(annotation)).toEqual(expected);
    },
  );

  it.each([
    { type: 'topN', n: 1 },
    { type: 'maxY' },
    { type: 'first' },
    { type: 'last' },
    { type: 'thresholdHighlight', threshold: 100 },
    { type: 'rangeInside', range: [50, 60] },
  ] satisfies RendererAnnotation<Row, 'g2'>[])(
    'produces no highlights for an empty selection: %j',
    (annotation) => {
      expect(highlights([annotation], [])).toEqual([]);
      if (annotation.type === 'rangeInside') expect(highlights([annotation])).toEqual([]);
    },
  );

  it('preserves explicit styles and explanations', () => {
    const annotation = {
      type: 'maxY' as const,
      label: 'Highest revenue',
      style: { dimOpacity: 0.3, stroke: '#123456' },
    };
    const [resolved] = highlights([annotation]);
    expect(resolved.label).toBe(annotation.label);
    expect(resolved.style).toBe(annotation.style);
    expect(Array.isArray(resolved.data) && resolved.data[0]).toBe(data[1]);
  });

  it.each([
    { type: 'topN', n: 0 },
    { type: 'topN', n: 1.5 },
    { type: 'bottomN', n: Infinity },
    { type: 'topN', n: 1, data: { field: 'missing' } },
    { type: 'topN', n: 1, data: { field: 'group' } },
    { type: 'maxY', data: {} },
    { type: 'maxY', data: { missing: 1 } },
    { type: 'maxY', data: { id: 'missing' } },
    { type: 'thresholdHighlight', threshold: NaN },
    { type: 'thresholdHighlight', threshold: 20, direction: 'sideways' },
    { type: 'rangeInside', range: [40, 20] },
    { type: 'rangeInside', range: [0, Infinity] },
  ])('rejects invalid configuration: %j', (annotation) => {
    expect(() => highlights([annotation as RendererAnnotation<Row, 'g2'>])).toThrow(
      'Invalid annotation:',
    );
  });

  it('computes selected contribution against the full input total and respects custom labels', () => {
    const annotation = { type: 'contribution' as const, data: { group: 'North' } };
    expect(highlights([annotation])[0].label).toBe('Selected 2 items: 54.5%');
    expect(highlights([{ type: 'contribution', data: [{ id: 'B' }, { id: 'C' }] }])[0].label).toBe(
      'Selected 2 items: 72.7%',
    );
    expect(highlights([{ ...annotation, label: 'Custom' }])[0].label).toBe('Custom');
    expect(
      highlights(
        [annotation],
        data.map((row) => ({ ...row, value: 0 })),
      ),
    ).toEqual([]);
  });

  it('does not interpret signed data as a nonnegative contribution', () => {
    const rows = data.map((row) => ({ ...row, value: -1 }));
    expect(() => highlights([{ type: 'contribution', data: { id: 'B' } }], rows)).toThrow(
      'nonnegative',
    );
  });

  it('expands different semantic types and explicit highlights into one shared paint pass', () => {
    type Mark = NonNullable<Parameters<MarkComponent>[0]>;
    const chart = new Chart({ container: {} as HTMLElement });
    chart.options({ type: 'interval', data, encode: { x: 'id', y: 'value' } });
    const original = chart.options();
    const cleanup = bindAnnotations({
      renderer: 'g2',
      chartType: 'column',
      chart,
      mapping: { x: 'id', y: 'value', data, interval: true },
      themeObject: getThemeObject('column'),
      annotations: [
        { type: 'topN', n: 1 },
        { type: 'path', data: { value: 30 } },
        { type: 'minY' },
        { type: 'highlight', data: { id: 'C' } },
      ],
    });
    const source = ((chart.options() as Mark).children as Mark[])[0];
    expect(data.map((row) => source.style!.opacity(row))).toEqual([0.5, 1, 1, 1]);
    expect(data.map((row) => source.style!.lineWidth(row))).toEqual([1.5, 3.5, 3.5, 3.5]);
    cleanup();
    expect(chart.options()).toEqual(original);
    chart.destroy();
  });
});

describe('automatic IQR outlier annotations', () => {
  function rows(values: (number | null)[]) {
    return values.map((value, index) => ({
      id: String(index),
      time: index,
      value,
      group: 'North',
    }));
  }

  it.each([
    [
      [-100, 10, 11, 12, 13, 14, 100],
      ['0', '6'],
    ],
    [[0, 2, 4, 6, 8, 15], []],
    [[0, 2, 4, 6, 8, 15.01], ['5']],
    [[-5, 2, 4, 6, 8, 10], []],
    [[-5.01, 2, 4, 6, 8, 10], ['0']],
    [[10, 10, 10, 10, 100], ['4']],
    [[10, 10, 10, 10], []],
    [[10, 10, 100], []],
    [[null, NaN, Infinity, 10, 10, 100], []],
    [[null, NaN, Infinity, 10, 10, 10, 100], ['6']],
    [[], []],
  ] satisfies [(number | null)[], string[]][])(
    'detects IQR outliers in %j without altering source data',
    (values, expected) => {
      const data = rows(values);
      const before = structuredClone(data);
      expect(ids({ type: 'outlier' }, data)).toEqual(expected);
      expect(data).toEqual(before);
    },
  );

  it('uses factor to adjust fences and labels every outlier with exact override support', () => {
    const data = rows([0, 2, 4, 6, 8, 18]);
    expect(ids({ type: 'outlier' }, data)).toEqual(['5']);
    expect(ids({ type: 'outlier', factor: 3 }, data)).toEqual([]);
    const extremes = rows([-100, 10, 11, 12, 13, 14, 100]);
    expect(highlights([{ type: 'outlier' }], extremes).map(({ label }) => label)).toEqual([
      'Outlier: -100',
      'Outlier: 100',
    ]);
    for (const label of ['Custom', ''])
      expect(highlights([{ type: 'outlier', label }], extremes).map((item) => item.label)).toEqual([
        label,
        label,
      ]);
  });

  it('separates interleaved series and uses data to scope candidate observations', () => {
    const north = rows([10, 11, 12, 13, 14, 15, 100]);
    const south = rows([1000, 1001, 1002, 1003, 1004, 1005, 1006]).map((row) => ({
      ...row,
      id: `S${row.id}`,
      group: 'South',
    }));
    const data = north.flatMap((row, i) => [row, south[i]]);
    const result = resolve([{ type: 'outlier' }], {
      chartType: 'line',
      mapping: { x: 'time', y: 'value', series: 'group', data },
      defaults,
    }).filter(({ type }) => type === 'highlight');
    expect(result).toEqual([{ type: 'highlight', data: [north[6]], label: 'Outlier: 100' }]);
    expect(ids({ type: 'outlier', data: { group: 'North' } }, data)).toEqual(['6']);
    expect(ids({ type: 'outlier', data: { id: '6' } }, data)).toEqual([]);
  });

  it('maps table outliers to the requested column while explaining the calculation field', () => {
    const data = rows([0, 2, 4, 6, 8, 18]);
    expect(
      resolveTable([{ type: 'outlier', data: { field: 'value', column: 'time' } }], {
        data,
        defaults: tableDefaults,
      }),
    ).toEqual([
      { type: 'highlight', data: [{ row: data[5], column: 'time' }], label: 'Outlier: 18' },
    ]);
    expect(
      resolveTable([{ type: 'outlier', data: { field: 'value', row: { id: '5' } } }], {
        data,
        defaults: tableDefaults,
      }),
    ).toEqual([]);
    expect(() =>
      resolveTable<Row>(
        [
          // @ts-expect-error Untyped callers must still supply a calculation field.
          { type: 'outlier', data: {} },
        ],
        { data, defaults: tableDefaults },
      ),
    ).toThrow('numeric field');
  });

  it.each([0, -1, NaN, Infinity])(
    'rejects invalid factor %s before applying highlights',
    (factor) => {
      const data = rows([10, 10, 10, 100]);
      const chart = new Chart({ container: {} as HTMLElement });
      chart.options({ type: 'interval', data, encode: { x: 'id', y: 'value' } });
      const original = chart.options();
      expect(() =>
        bindAnnotations({
          renderer: 'g2',
          chartType: 'column',
          chart,
          mapping: { x: 'id', y: 'value', data, interval: true },
          themeObject: getThemeObject('column'),
          annotations: [
            { type: 'highlight', data: { id: '0' } },
            { type: 'outlier', factor },
          ],
        }),
      ).toThrow('factor must be positive and finite');
      expect(chart.options()).toEqual(original);
      chart.destroy();
    },
  );
});

describe('table and graph semantic composition', () => {
  it('rejects group for tables, including untyped JSON configurations', () => {
    expect(() =>
      resolveTable<Row>(
        [
          // @ts-expect-error Tables use highlight for multiple rows or columns.
          { type: 'group', data: { row: { group: 'North' } } },
        ],
        { data, defaults: tableDefaults },
      ),
    ).toThrow('Unsupported table annotation type: group');
  });

  it('maps computed table selections to rows or a named column', () => {
    const annotations: RendererAnnotation<Row, 'table'>[] = [
      { type: 'topN', n: 1, data: { field: 'value', column: 'value' } },
      { type: 'rangeInside', range: [0, 15], data: { field: 'value' } },
    ];
    const result = resolveTable(annotations, { data, defaults: tableDefaults });
    expect(result).toEqual([
      { type: 'highlight', data: [{ row: data[1], column: 'value' }], label: 'Top 1' },
      { type: 'highlight', data: [{ row: data[3] }], label: 'Inside range: 10' },
    ]);
  });

  it('requires an explicit calculation field for tables at runtime', () => {
    expect(() =>
      resolveTable([{ type: 'topN', n: 1, data: {} } as RendererAnnotation<Row, 'table'>], {
        data,
        defaults: tableDefaults,
      }),
    ).toThrow('numeric field');
  });

  it('uses highlight for caller-selected nodes and edges and rejects removed semantic types', () => {
    const rows = [{ name: 'A' }, { name: 'B' }, { source: 'A', target: 'B' }];
    const result = prepareAnnotations<(typeof rows)[number], 'g6'>(
      'g6',
      [
        { type: 'highlight', data: { name: 'A' } },
        { type: 'highlight', data: [{ name: 'B' }, { source: 'A', target: 'B' }] },
      ],
      { chartType: 'network-graph', data: rows },
    );
    expect(result.map(({ annotation }) => annotation)).toEqual([
      { type: 'highlight', data: { name: 'A' } },
      { type: 'highlight', data: [{ name: 'B' }, { source: 'A', target: 'B' }] },
    ]);
    expect(() =>
      prepareAnnotations(
        'g6',
        [
          // @ts-expect-error JSON callers must also receive an unsupported-annotation error.
          { type: 'group', data: { name: 'A' } },
        ],
        { chartType: 'network-graph', data: rows },
      ),
    ).toThrow('Unsupported network-graph annotation type: group');
    expect(() =>
      prepareAnnotations(
        'g6',
        [
          // @ts-expect-error The redundant relationship type was removed.
          { type: 'relationship', data: { name: 'A' } },
        ],
        { chartType: 'network-graph', data: rows },
      ),
    ).toThrow('Unsupported network-graph annotation type: relationship');
  });
});
