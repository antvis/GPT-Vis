import { beforeEach, describe, expect, it, vi } from 'vitest';
import { parse } from '../../src/syntax/parser';
import { Line } from '../../src/vis/line';
import { chartOptions } from '../helpers/renderers';

vi.mock('@antv/g2', async () => ({ Chart: (await import('../helpers/renderers')).MockChart }));

const options = { container: {} as HTMLElement, width: 600, height: 400 };

describe('parse - line chart', () => {
  it('should parse basic line chart', () => {
    const result = parse(`
vis line
data
  - time 2015年
    value 1700
  - time 2016年
    value 1500
  - time 2017年
    value 1200
title 出生人口变化
axisXTitle 年份
axisYTitle 出生人口（万人）
    `);

    expect(result).toEqual({
      type: 'line',
      data: [
        { time: '2015年', value: 1700 },
        { time: '2016年', value: 1500 },
        { time: '2017年', value: 1200 },
      ],
      title: '出生人口变化',
      axisXTitle: '年份',
      axisYTitle: '出生人口（万人）',
    });
  });

  it('should parse multi-line chart with group field', () => {
    const result = parse(`
vis line
data
  - time 2015年
    value 1700
    group 出生人口
  - time 2015年
    value 965
    group 死亡人口
  - time 2016年
    value 1500
    group 出生人口
  - time 2016年
    value 846
    group 死亡人口
title 出生人口与死亡人口变化
    `);

    expect(result.type).toBe('line');
    expect(result.data).toEqual([
      { time: '2015年', value: 1700, group: '出生人口' },
      { time: '2015年', value: 965, group: '死亡人口' },
      { time: '2016年', value: 1500, group: '出生人口' },
      { time: '2016年', value: 846, group: '死亡人口' },
    ]);
  });

  it('should parse line chart with numeric time values', () => {
    const result = parse(`
vis line
data
  - time 2015
    value 7200
  - time 2016
    value 3660
  - time 2017
    value 4100
axisXTitle year
axisYTitle industrial
    `);

    expect(result.data).toEqual([
      { time: 2015, value: 7200 },
      { time: 2016, value: 3660 },
      { time: 2017, value: 4100 },
    ]);
  });

  it('should parse line chart with style', () => {
    const result = parse(`
vis line
data
  - time Q1
    value 100
  - time Q2
    value 150
theme academy
style
  lineWidth 3
  palette
    - #5B8FF9
    - #61DDAA
    `);

    expect(result.theme).toBe('academy');
    expect(result.style).toEqual({
      lineWidth: 3,
      palette: ['#5B8FF9', '#61DDAA'],
    });
  });
});

describe('render - line theme', () => {
  beforeEach(() => {
    chartOptions.length = 0;
  });
  it('uses a reusable theme from construction options and lets local styles override it', () => {
    Line({
      ...options,
      theme: {
        id: 'report',
        label: 'Report',
        baseTheme: 'dark',
        tokens: { lineWidth: 2 },
        style: { mark: { line: { shape: 'smooth' } } },
        charts: { line: { style: { mark: { line: { lineWidth: 4 } } } } },
      },
    }).render({
      data: [{ time: 'Jan', value: 10 }],
      style: { mark: { line: { lineWidth: 6 } } },
    });

    expect(chartOptions.at(-1)).toMatchObject({
      theme: { type: 'dark' },
      children: expect.arrayContaining([
        expect.objectContaining({
          type: 'line',
          encode: expect.objectContaining({ shape: 'smooth' }),
          style: expect.objectContaining({ lineWidth: 6 }),
        }),
      ]),
    });
  });
  it('maps line styles to its line and point children', () => {
    Line(options).render({
      data: [
        { time: 'Jan', value: 10, group: 'One' },
        { time: 'Feb', value: 12, group: 'One' },
      ],
      style: {
        axis: { labelFill: '#475569' },
        legend: { itemLabelFill: '#334155' },
        mark: {
          line: { shape: 'hv', lineWidth: 4 },
          point: { shape: 'diamond', size: 8 },
        },
      },
    });

    const chart = chartOptions.at(-1);
    expect(chart.axis.x).toMatchObject({ labelFill: '#475569' });
    expect(chart.legend.color).toMatchObject({ itemLabelFill: '#334155' });
    expect(chart.children).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: 'line',
          encode: expect.objectContaining({ shape: 'hv' }),
          style: expect.objectContaining({ lineWidth: 4 }),
        }),
        expect.objectContaining({
          type: 'point',
          encode: expect.objectContaining({ shape: 'diamond', size: 8 }),
        }),
      ]),
    );
  });

  it('maps a view composition background to style.viewFill', () => {
    const chart = Line({ container: {} as HTMLElement, width: 600, height: 400 });

    chart.render({
      data: [{ time: 'Jan', value: 28 }],
      theme: {
        id: 'background',
        label: 'Background',
        style: { backgroundColor: '#fff4df' },
      },
    });

    expect(chartOptions.at(-1)).toMatchObject({
      type: 'view',
      style: { viewFill: '#fff4df' },
    });
  });
});
