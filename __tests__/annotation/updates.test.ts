import { Chart, type MarkComponent } from '@antv/g2';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { bindAnnotations } from '../../src/annotation';
import { getThemeObject } from '../../src/theme/g2';
import type { ChartAnnotation } from '../../src/types/annotation';
import { Area } from '../../src/vis/area';
import { Bar } from '../../src/vis/bar';
import { Column } from '../../src/vis/column';
import { Line } from '../../src/vis/line';
import { Pie } from '../../src/vis/pie';
import { Scatter } from '../../src/vis/scatter';

vi.mock('@antv/component', async (original) => ({
  ...(await original<Record<string, unknown>>()),
  measureTextWidth: (text: string) => text.length * 7.2,
}));

type Mark = NonNullable<Parameters<MarkComponent>[0]>;
const data = [
  { category: 'A', value: 12 },
  { category: 'B', value: 24 },
];
const themeObject = getThemeObject('column');

// Use the real G2 declarative API: a replacing options() mock hides merge regressions.
describe('annotation binding and cleanup through the native G2 options tree', () => {
  const getRenderedOptions = () =>
    (vi.mocked(Chart.prototype.render).mock.contexts.at(-1) as Chart).options() as Mark;

  beforeEach(() => {
    vi.stubGlobal('window', { matchMedia: () => ({ matches: false }) });
    vi.spyOn(Chart.prototype, 'render').mockImplementation(function () {
      return Promise.resolve(this);
    });
  });
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('restores original options and keeps repeated highlight bindings stable', () => {
    const chart = new Chart({ container: {} as HTMLElement, width: 640, height: 400 });
    chart.options({
      type: 'interval',
      data,
      encode: { x: 'category', y: 'value' },
      style: { fill: '#123456' },
    });
    const original = chart.options();
    const annotations: ChartAnnotation<(typeof data)[number]>[] = [
      { type: 'highlight', data: { category: 'B' }, label: 'Focus' },
    ];
    for (let i = 0; i < 20; i++) {
      const cleanup = bindAnnotations({
        renderer: 'g2',
        chartType: 'column',
        chart,
        annotations,
        mapping: { x: 'category', y: 'value', data, interval: true },
        themeObject,
      });
      const options = chart.options() as Mark;
      expect(options.width).toBe(640);
      const [source, explanation] = options.children as Mark[];
      expect(options.children as Mark[]).toHaveLength(2);
      expect(source.style!.opacity(data[0])).toBe(0.5);
      expect(source.style!.lineWidth(data[1])).toBe(3.5);
      expect(source.labels).toBeUndefined();
      expect(source.transform).toHaveLength(1);
      expect(options.labelTransform).toHaveLength(1);
      expect(explanation.labels).toHaveLength(1);
      cleanup?.();
      cleanup?.();
      expect(chart.options()).toEqual(original);
    }
    chart.destroy();
  });

  it('restores inherited transforms and removes disposed custom annotation types', () => {
    const chart = new Chart({ container: {} as HTMLElement });
    chart.options({
      type: 'view',
      data,
      encode: { x: 'category', y: 'value' },
      transform: [{ type: 'stackY' }],
      children: [{ type: 'area' }, { type: 'line' }],
    });
    const original = chart.options();
    const bind = () =>
      bindAnnotations({
        renderer: 'g2',
        chartType: 'area',
        chart,
        annotations: [{ type: 'point', data: { category: 'B' } }],
        mapping: { x: 'category', y: 'value', data },
        themeObject,
      });
    const cleanup = bind();
    const before = ((chart.options() as Mark).children as Mark[])[2].type;
    cleanup?.();
    expect(chart.options()).toEqual(original);
    const cleanupNext = bind();
    const options = chart.options() as Mark;
    expect(options.transform).toBeUndefined();
    const [area, line, point] = options.children as Mark[];
    expect(area.transform!.map((t: any) => t.type)).toEqual(['stackY', 'annotationSource']);
    expect(line.transform!.map((t: any) => t.type)).toEqual(['stackY']);
    expect(point.type).not.toBe(before);
    cleanupNext?.();
    expect(chart.options()).toEqual(original);
    chart.destroy();
  });

  it.each([
    ['area', Area],
    ['bar', Bar],
    ['column', Column],
    ['line', Line],
    ['pie', Pie],
    ['scatter', Scatter],
  ] as const)('adds, removes and re-enables highlights through %s', (_name, create) => {
    const rows = [
      { category: 'A', time: 'A', value: 12, x: 1, y: 12 },
      { category: 'B', time: 'B', value: 24, x: 2, y: 24 },
    ];
    const annotations = [{ type: 'highlight' as const, data: rows[1], label: 'Focus' }];
    const instance = create({ container: {} as HTMLElement, width: 640, height: 400 });
    for (let i = 0; i < 3; i++) {
      instance.render({ data: rows, annotations });
      const options = getRenderedOptions();
      const marks = options.children as Mark[];
      expect(
        marks.filter((mark) =>
          mark.labels?.some(
            (label: Record<string, unknown>) => label.annotationLabel === 'highlight',
          ),
        ),
      ).toHaveLength(1);
      expect(marks[0].transform!.filter((t: any) => t.type === 'annotationSource')).toHaveLength(1);
      expect(options.labelTransform).toHaveLength(1);
      instance.render({ data: rows, annotations: [] });
      const plain = getRenderedOptions();
      expect(plain.labelTransform).toBeUndefined();
      expect((plain.children ?? []).some((mark: Mark) => typeof mark.type === 'function')).toBe(
        false,
      );
    }
    instance.destroy();
  });
});
