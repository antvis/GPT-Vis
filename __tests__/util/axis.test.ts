import type * as Component from '@antv/component';
import { measureTextWidth } from '@antv/component';
import type { Chart } from '@antv/g2';
import { describe, expect, it, vi } from 'vitest';
import { bindCartesianAxisLayout, createCartesianAxis, getCartesianAxis } from '../../src/util';
import { Area } from '../../src/vis/area';
import { Column } from '../../src/vis/column';
import { Histogram } from '../../src/vis/histogram';
import { Line } from '../../src/vis/line';
import { Scatter } from '../../src/vis/scatter';
import { chartOptions, MockChart } from '../helpers/renderers';

vi.mock('@antv/component', async (original) => ({
  ...(await original<typeof Component>()),
  measureTextWidth: vi.fn(
    (text: string, font: { fontSize: number }) => Array.from(text).length * font.fontSize * 0.6,
  ),
}));
vi.mock('@antv/g2', async () => ({ Chart: (await import('../helpers/renderers')).MockChart }));
const options = { container: {} as HTMLElement, width: 320, height: 300 };

describe('Cartesian axis label policy', () => {
  it('selects horizontal, 45° and 90° category layouts as the same container narrows', () => {
    const container = { clientWidth: 800, clientHeight: 300 } as HTMLElement;
    const xValues = [
      'North America Region',
      'Southeast Asia Region',
      'European Central Region',
      'International Region',
    ];
    const { x } = getCartesianAxis({ container, xValues });
    expect(x.labelTransform()).toBe('rotate(0)');
    Object.assign(container, { clientWidth: 360 });
    expect(x.labelTransform()).toBe('rotate(45)');
    expect(x.labelWordWrapWidth()).toBeLessThan(150);
    Object.assign(container, { clientWidth: 240 });
    expect(x.labelTransform()).toBe('rotate(90)');
    Object.assign(container, { clientWidth: 800 });
    expect(x.labelTransform()).toBe('rotate(0)');
  });

  it('keeps dense short labels and dates horizontal using the existing component API', () => {
    for (const xValues of [
      Array.from({ length: 30 }, (_, i) => `项目${i}`),
      ['2026-11-01', '2026-11-02'],
    ]) {
      const { x, y } = getCartesianAxis({ xValues, chartWidth: 240 });
      expect(x.labelTransform()).toBe('rotate(0)');
      expect(x.tickDisplayWithLabel).toBeUndefined();
      expect(y.tickDisplayWithLabel).toBeUndefined();
      expect(x.transform).toEqual([{ type: 'hide' }]);
    }
  });

  it('defaults to numeric inference while preserving explicit category axes', () => {
    const xValues = [1000000, 2000000, 3000000];
    expect(getCartesianAxis({ xValues }).x.labelWordWrap).toBeUndefined();
    expect(getCartesianAxis({ xType: 'category', xValues }).x.labelWordWrap).toBe(true);
    for (const values of [[], ['1000000', '2000000'], [1, '2'], [1, NaN], [1, Infinity]]) {
      expect(getCartesianAxis({ xValues: values }).x.labelWordWrap).toBe(true);
    }
  });

  it('measures category widths once for angle selection across resizing', () => {
    const measure = vi.mocked(measureTextWidth);
    measure.mockClear();
    const container = { clientWidth: 680, clientHeight: 300 } as HTMLElement;
    const ticks = Array.from({ length: 7 }, (_, i) => ({
      value: (i + 0.5) / 7,
      label: `2026-11-0${i + 1}`,
    }));
    const policy = createCartesianAxis({
      container,
      xValues: [...ticks, ...ticks].map(({ label }) => label),
      preferHorizontal: true,
    });
    expect(measure).not.toHaveBeenCalled();
    for (const [width, angle] of [
      [680, 0],
      [500, 45],
      [240, 0],
      [680, 0],
    ]) {
      Object.assign(container, { clientWidth: width });
      for (let i = 0; i < ticks.length; i++) {
        expect(policy.axis.x.labelTransform()).toBe(`rotate(${angle})`);
        policy.axis.x.labelWordWrapWidth();
      }
      policy.layout();
    }
    expect(measure).toHaveBeenCalledTimes(ticks.length);
  });

  it('centers time labels when they fit and protects only overflowing edge labels', () => {
    const container = { clientWidth: 680, clientHeight: 300 } as HTMLElement;
    const ticks = Array.from({ length: 7 }, (_, i) => ({
      value: (i + 0.5) / 7,
      label: `2026-11-0${i + 1}`,
    }));
    const { x } = getCartesianAxis({ container, preferHorizontal: true });
    expect(x.labelTextAlign(ticks[0], 0, ticks)).toBe('center');
    expect(x.labelTextAlign(ticks[6], 6, ticks)).toBe('center');
    Object.assign(container, { clientWidth: 240 });
    expect(x.labelTextAlign(ticks[0], 0, ticks)).toBe('left');
    expect(x.labelTextAlign(ticks[6], 6, ticks)).toBe('right');
    expect(x.labelTextAlign(ticks[3], 3, ticks)).toBe('center');
  });

  it('rotates complete time labels at 45° only when width and height allow it', () => {
    const container = { clientWidth: 680, clientHeight: 300 } as HTMLElement;
    const xValues = Array.from({ length: 7 }, (_, i) => `2026-11-0${i + 1}`);
    const { x } = getCartesianAxis({ container, xValues, preferHorizontal: true });
    expect(x.labelTransform()).toBe('rotate(0)');
    Object.assign(container, { clientWidth: 500 });
    expect(x.labelTransform()).toContain('rotate(45)');
    expect(x.labelTransform()).not.toContain('translate');
    expect(x.labelWordWrapWidth()).toBeGreaterThanOrEqual(72);
    expect(x.labelTextAlign({}, 0)).toBe('start');
    Object.assign(container, { clientHeight: 150 });
    expect(x.labelTransform()).toBe('rotate(0)');
    Object.assign(container, { clientWidth: 240, clientHeight: 300 });
    expect(x.labelTransform()).toBe('rotate(0)');
    Object.assign(container, { clientWidth: 680 });
    expect(x.labelTransform()).toBe('rotate(0)');
  });

  it('keeps dense short line/area categories horizontal', () => {
    const { x } = getCartesianAxis({
      chartWidth: 680,
      xValues: Array.from({ length: 24 }, (_, i) => `D${i}`),
      preferHorizontal: true,
    });
    expect(x.labelTransform()).toBe('rotate(0)');
  });

  it('reserves a bounded right margin, switches to 90° beyond it and restores on resize', () => {
    const container = { clientWidth: 500, clientHeight: 400 } as HTMLElement;
    const policy = createCartesianAxis({
      container,
      xValues: Array.from({ length: 4 }, (_, i) => `abcdefghijklmnop${i}`),
      preferHorizontal: true,
    });
    const config = { axis: policy.axis, ...policy.layout() };
    const chart = new MockChart().options(config);
    bindCartesianAxisLayout(chart as unknown as Chart, policy);
    expect(config.axis.x.labelTransform()).toBe('rotate(45)');
    expect(config.marginRight).toBeGreaterThan(16);
    expect(config.marginRight).toBeLessThanOrEqual(64);
    Object.assign(container, { clientWidth: 320 });
    chart.emit('beforechangesize');
    expect(config.axis.x.labelTransform()).toBe('rotate(90)');
    expect(config.marginRight).toBeUndefined();
    Object.assign(container, { clientWidth: 500 });
    chart.emit('beforechangesize');
    expect(config.axis.x.labelTransform()).toBe('rotate(45)');
    expect(config.marginRight).toBeGreaterThan(16);
    Object.assign(container, { clientWidth: 800 });
    chart.emit('beforechangesize');
    expect(config.axis.x.labelTransform()).toBe('rotate(0)');
    expect(config.marginRight).toBeUndefined();
  });

  it('reserves the full diagonal overhang when area ticks reach the plot edges', () => {
    const options = {
      chartWidth: 500,
      chartHeight: 300,
      xValues: Array.from({ length: 7 }, (_, i) => `2026-11-0${i + 1}`),
      preferHorizontal: true,
    };
    const line = createCartesianAxis(options);
    const area = createCartesianAxis({ ...options, xTicksAtEdges: true });
    expect(line.axis.x.labelTransform()).toBe('rotate(45)');
    expect(area.axis.x.labelTransform()).toBe('rotate(45)');
    expect(area.layout().marginRight).toBeGreaterThan(line.layout().marginRight!);
    expect(area.layout().marginRight).toBeLessThanOrEqual(64);
  });

  it('uses unique categories, theme typography and field types rather than numeric-looking text', () => {
    const options = {
      chartWidth: 360,
      chartHeight: 300,
      xValues: ['123456789012345', '234567890123456', '345678901234567', '456789012345678'],
    };
    const normal = getCartesianAxis(options);
    expect(normal.x.labelTransform()).toContain('rotate(45)');
    const repeated = getCartesianAxis({
      ...options,
      xValues: [...options.xValues, ...options.xValues],
    });
    expect(repeated.x.labelTransform()).toBe(normal.x.labelTransform());
    const large = getCartesianAxis(options, { axisX: { labelFontSize: 24 } });
    expect(large.x.labelTransform()).toBe('rotate(90)');
    expect(getCartesianAxis({ xValues: [1, 2, 3] }).x.labelWordWrap).toBeUndefined();
    expect(getCartesianAxis({ xValues: ['2026-11-01', '2026-11-02'] }).x.labelWordWrap).toBe(true);
  });
  it('keeps a numeric x axis horizontal without changing data or animation', () => {
    Scatter(options).render({
      data: [{ x: 1000000, y: 0.125 }],
    });
    const config = chartOptions.at(-1);
    expect(config.animate.enter.type).toBe('fadeIn');
    expect(config.axis.x.animate).toBeUndefined();
    expect(config.axis.y.animate).toBeUndefined();
    expect(config.axis.x.labelAutoRotate).toBe(false);
    expect(config.axis.x.transform).toEqual([{ type: 'hide' }]);
    // G2's measurement pass supplies no tick array; rendering supplies all ticks.
    expect(config.axis.x.labelTextAlign('1000000', 0)).toBe('center');
    expect(config.axis.x.labelTextAlign({}, 0, [{}, {}])).toBe('left');
    expect(config.axis.x.labelTextAlign({}, 1, [{}, {}])).toBe('right');
    expect(config.axis.y.labelFormatter).toBeUndefined();
    expect(config.scale.x).toEqual({ nice: true });
    expect(config.data[0]).toEqual({ x: 1000000, y: 0.125 });
  });

  for (const [name, createChart] of [
    ['line', Line],
    ['area', Area],
  ] as const) {
    it(`${name}: allows complete diagonal dates without rotating numeric ticks`, () => {
      const chart = createChart({ ...options, width: 500 });
      chart.render({
        data: Array.from({ length: 7 }, (_, i) => ({ time: `2026-11-0${i + 1}`, value: i + 1 })),
      });
      expect(chartOptions.at(-1).axis.x.labelTransform()).toContain('rotate(45)');
      chart.render({ data: [1, 2, 3].map((time) => ({ time, value: 1 })) });
      expect(chartOptions.at(-1).axis.x.labelTransform).toBeUndefined();
      expect(chartOptions.at(-1).axis.x.labelSpacing).toBeUndefined();
    });

    it(`${name}: distinguishes numeric times from long string categories on rerender`, () => {
      const chart = createChart(options);
      chart.render({ data: [1000000, 2000000, 3000000].map((time) => ({ time, value: 1 })) });
      expect(chartOptions.at(-1).axis.x.labelAutoRotate).toBe(false);
      expect(chartOptions.at(-1).axis.x.labelTransform).toBeUndefined();
      expect(chartOptions.at(-1).marginRight).toBeUndefined();
      chart.render({
        data: ['Northwest Territories', 'North America Region', 'Southeast Asia Region'].map(
          (time) => ({ time, value: 1 }),
        ),
      });
      expect(chartOptions.at(-1).axis.x.labelAutoRotate).toBe(false);
      expect(chartOptions.at(-1).axis.x.labelWordWrap).toBe(true);
      expect(chartOptions.at(-1).axis.x.labelWordWrapWidth()).toBeGreaterThan(0);
      expect(chartOptions.at(-1).axis.x.labelTransform()).toBe('rotate(90)');
      expect(chartOptions.at(-1).axis.x.labelTextAlign({}, 1, [{}, {}, {}])).toBe('start');
      expect(chartOptions.at(-1).marginRight).toBeUndefined();
    });
  }

  it('does not infer a numeric scale from numeric-looking category labels', () => {
    Column(options).render({
      data: [202401010001, 202401010002, 202401010003].map((category) => ({
        category: String(category),
        value: 1,
      })),
    });
    expect(chartOptions.at(-1).axis.x.labelAutoRotate).toBe(false);
    expect(chartOptions.at(-1).axis.x.labelWordWrap).toBe(true);
  });

  it('uses the numeric policy for histogram bins and transposed bar value axes', () => {
    Histogram(options).render({ data: [1000000, 2000000, 3000000] });
    expect(chartOptions.at(-1).axis.x.labelAutoRotate).toBe(false);
    expect(getCartesianAxis({}).y.labelAutoRotate).toBe(false);
  });

  it('does not truncate continuous numeric ticks or inherit category rotation', () => {
    const { x } = getCartesianAxis({ xType: 'number' });
    expect(x.labelWordWrap).toBeUndefined();
    expect(x.labelFormatter).toBeUndefined();
    expect(x.transform).toEqual([{ type: 'hide' }]);
  });

  it('bounds category text using live container dimensions after resize', () => {
    const container = { clientWidth: 320, clientHeight: 300 } as HTMLElement;
    const horizontal = getCartesianAxis({ container });
    const bar = getCartesianAxis({ container, transposed: true });
    expect(horizontal.x.labelWordWrapWidth()).toBe(150);
    expect(bar.x.labelWordWrapWidth()).toBe(96);
    expect(bar.x.labelAutoRotate).toBe(false);
    Object.assign(container, { clientWidth: 680, clientHeight: 200 });
    expect(horizontal.x.labelWordWrapWidth()).toBe(100);
    expect(bar.x.labelWordWrapWidth()).toBe(120);
    expect(bar.y.labelAutoRotate).toBe(false);
    expect(bar.y.labelWordWrap).toBeUndefined();
  });
});
