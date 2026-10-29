import { beforeEach, describe, expect, it, vi } from 'vitest';
import { parse } from '../../src/syntax/parser';
import { Area } from '../../src/vis/area';
import { chartOptions } from '../helpers/renderers';

vi.mock('@antv/g2', async () => ({ Chart: (await import('../helpers/renderers')).MockChart }));

const options = { container: {} as HTMLElement, width: 600, height: 400 };

describe('parse - area chart', () => {
  it('should parse basic area chart', () => {
    const result = parse(`
vis area
data
  - time 1月
    value 23.895
  - time 2月
    value 23.695
  - time 3月
    value 23.655
title 1月到3月股票价格的变化
axisXTitle 月份
axisYTitle 价格
    `);

    expect(result).toEqual({
      type: 'area',
      data: [
        { time: '1月', value: 23.895 },
        { time: '2月', value: 23.695 },
        { time: '3月', value: 23.655 },
      ],
      title: '1月到3月股票价格的变化',
      axisXTitle: '月份',
      axisYTitle: '价格',
    });
  });

  it('should parse stacked area chart', () => {
    const result = parse(`
vis area
data
  - time 2019年
    value 150
    group 北京
  - time 2020年
    value 160
    group 北京
  - time 2019年
    value 100
    group 广州
  - time 2020年
    value 110
    group 广州
stack true
title 城市空气污染指数变化
    `);

    expect(result.stack).toBe(true);
    expect(result.data).toEqual([
      { time: '2019年', value: 150, group: '北京' },
      { time: '2020年', value: 160, group: '北京' },
      { time: '2019年', value: 100, group: '广州' },
      { time: '2020年', value: 110, group: '广州' },
    ]);
  });

  it('should parse area chart with numeric time', () => {
    const result = parse(`
vis area
data
  - time 2015
    value 7200
  - time 2016
    value 3660
  - time 2017
    value 4100
    `);

    expect(result.data).toEqual([
      { time: 2015, value: 7200 },
      { time: 2016, value: 3660 },
      { time: 2017, value: 4100 },
    ]);
  });
});

describe('render - area theme', () => {
  beforeEach(() => {
    chartOptions.length = 0;
  });
  it('maps area styles to its area, line and point children', () => {
    Area(options).render({
      data: [
        { time: 'Jan', value: 10 },
        { time: 'Feb', value: 12 },
      ],
      style: {
        axis: { labelFill: '#475569' },
        mark: {
          area: { shape: 'smooth', fillOpacity: 0.4 },
          line: { shape: 'smooth', lineWidth: 4 },
          point: { shape: 'diamond', size: 8, stroke: '#dc2626' },
        },
      },
    });

    const chart = chartOptions.at(-1);
    expect(chart.theme.axisX).toMatchObject({ labelFill: '#475569' });
    expect(chart.children).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: 'area',
          style: expect.objectContaining({ fillOpacity: 0.4, shape: 'smooth' }),
        }),
        expect.objectContaining({
          type: 'line',
          style: expect.objectContaining({ lineWidth: 4, shape: 'smooth' }),
        }),
        expect.objectContaining({
          type: 'point',
          encode: expect.objectContaining({ size: 8 }),
          style: expect.objectContaining({ stroke: '#dc2626', shape: 'diamond' }),
        }),
      ]),
    );
  });
});
