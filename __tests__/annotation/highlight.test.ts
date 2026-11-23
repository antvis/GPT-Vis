import { stdlib, type Chart, type MarkComponent } from '@antv/g2';
import { describe, expect, it, vi } from 'vitest';
import { bindAnnotations } from '../../src/annotation';
import type { RendererAnnotation } from '../../src/annotation/registry';
import { getThemeObject } from '../../src/theme/g2';
import type { ChartType } from '../../src/types';

type Row = { category: string; value: number; group?: string };
type Mark = NonNullable<Parameters<MarkComponent>[0]>;
const data: Row[] = [
  { category: 'A', value: 12, group: 'North' },
  { category: 'B', value: 24, group: 'North' },
  { category: 'A', value: 18, group: 'South' },
];
const chartTypes = { interval: 'column', point: 'scatter', line: 'line', area: 'area' } as const;

function bind(
  annotations: RendererAnnotation<Row, 'g2'>[],
  type: keyof typeof chartTypes = 'interval',
  theme = getThemeObject('column'),
  chartType: ChartType = chartTypes[type],
) {
  let options: Mark = {
    type,
    data,
    encode: { x: 'category', y: 'value', color: 'group' },
    style: {
      opacity: 0.8,
      lineWidth: 1.5,
      fill: (row: Row) => (row.group === 'North' ? '#123456' : '#abcdef'),
    },
  };
  const chart = {
    map: (transform: (options: Mark) => Mark) => (options = transform(options)),
    getContext: () => ({ library: stdlib() }),
    options: (value?: Mark) => {
      if (value) options = value;
      return options;
    },
    on: vi.fn(),
    off: vi.fn(),
  } as unknown as Chart;
  const cleanup = bindAnnotations({
    renderer: 'g2',
    chartType,
    chart,
    annotations,
    mapping: { x: 'category', y: 'value', data, interval: true },
    themeObject: theme,
  });
  return { base: (options.children as Mark[])[0], options, cleanup };
}

describe('persistent highlights on chart elements', () => {
  it.each(['bar', 'column', 'scatter', 'pie'] as const)(
    'preserves native element paint for %s highlights',
    (chartType) => {
      const type = chartType === 'scatter' ? 'point' : 'interval';
      const theme = getThemeObject(chartType);
      const { base } = bind(
        [{ type: 'highlight', data: { category: 'B' } }],
        type,
        theme,
        chartType,
      );
      expect(base.style!.opacity(data[0])).toBe(0.4);
      expect(base.style!.opacity(data[1])).toBe(0.8);
      expect(base.style!.lineWidth(data[1])).toBe(3.5);
      expect(base.style!.fill(data[1])).toBe('#123456');
      expect(base.style!.stroke(data[0])).toBe(
        chartType === 'scatter' ? theme.theme.category10![0] : 'none',
      );
    },
  );

  it('unions nonconsecutive highlights and dims only unselected elements without replacing their colors', () => {
    const before = structuredClone(data);
    const { base, options } = bind([
      { type: 'highlight', data: { category: 'B' }, style: { dimOpacity: 0.4 } },
      { type: 'path', data: { value: 20 } },
      { type: 'highlight', data: { group: 'South' }, style: { dimOpacity: 0.2 } },
    ]);
    expect(options.children as Mark[]).toHaveLength(2);
    expect(data.map((row) => base.style!.opacity(row))).toEqual([expect.closeTo(0.16), 0.8, 0.8]);
    expect(data.map((row) => base.style!.lineWidth(row))).toEqual([1.5, 3.5, 3.5]);
    expect(data.map((row) => base.style!.fill(row))).toEqual(['#123456', '#123456', '#abcdef']);
    expect(base.style!.stroke(data[0])).toBe('none');
    expect(data).toEqual(before);
  });

  it('retains an area fill border instead of introducing a closed outline for highlights', () => {
    const { base } = bind(
      [{ type: 'highlight', data: { group: 'North' }, style: { stroke: '#f00', lineWidth: 8 } }],
      'area',
    );
    expect(base.style!.stroke).toBeUndefined();
    expect(base.style!.lineWidth).toBe(1.5);
    expect(base.style!.opacity(data[2])).toBe(0.4);
  });

  it('emphasizes whole series, but leaves the stroke weight of a partially selected path alone', () => {
    const { base } = bind([{ type: 'highlight', data: { category: 'B' } }], 'line');
    expect(base.style!.lineWidth(data.slice(0, 2))).toBe(1.5);
    expect(base.style!.opacity([data[2]])).toBe(0.4);
    const full = bind([{ type: 'highlight', data: { group: 'North' } }], 'line').base;
    expect(full.style!.lineWidth(data.slice(0, 2))).toBe(3.5);
    expect(full.style!.stroke(data.slice(0, 2))).toBe(
      getThemeObject('column').theme.category10![0],
    );
  });

  it('treats a series covered by several highlights as fully selected', () => {
    const { base, options } = bind(
      [
        { type: 'highlight', data: { category: 'A' } },
        { type: 'highlight', data: { category: 'B' } },
      ],
      'line',
    );
    expect(base.style!.lineWidth(data.slice(0, 2))).toBe(3.5);
    expect(options.children as Mark[]).toHaveLength(1);
  });

  it('supports theme defaults, explicit style overrides and disabling dimming', () => {
    for (const name of ['default', 'dark', 'academy'] as const) {
      const theme = getThemeObject('column', name, { palette: ['#a12345', '#b23456'] });
      const { base } = bind(
        [
          {
            type: 'highlight',
            data: { category: 'B' },
            style: { dimOpacity: 1, fill: '#f00', lineWidth: 6 },
          },
        ],
        'interval',
        theme,
      );
      expect(base.style!.stroke(data[1])).toBe('#a12345');
      expect(base.style!.fill(data[1])).toBe('#f00');
      expect(base.style!.fill(data[0])).toBe('#123456');
      expect(base.style!.lineWidth(data[1])).toBe(6);
      expect(base.style!.opacity(data[0])).toBe(0.8);
    }
  });

  it('keeps original labels and creates a single explanation for a multirow selection', () => {
    const { base, options } = bind([
      { type: 'highlight', data: { group: 'North' }, label: 'Focus' },
    ]);
    expect(base.labels).toBeUndefined();
    const explanation = (options.children as Mark[])[1];
    expect(explanation.data).toEqual([data[0]]);
    expect(explanation.labels![0].text()).toBe('Focus');
    expect(explanation.labels![0].annotationLabel).toBe('highlight');
  });

  it.each([
    [{}, 'nonempty original-field selector'],
    [[], 'needs target data'],
    [{ missing: 'X' }, 'unknown field'],
    [{ category: 'missing' }, 'matches no data'],
  ])('rejects invalid targets before changing chart options: %j', (target, message) => {
    expect(() => bind([{ type: 'highlight', data: target as Row }])).toThrow(message);
  });

  it.each([-1, 2, NaN])('rejects invalid dim opacity %s', (dimOpacity) => {
    expect(() =>
      bind([{ type: 'highlight', data: { category: 'A' }, style: { dimOpacity } }]),
    ).toThrow('dimOpacity');
  });
});
