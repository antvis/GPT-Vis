import { beforeEach, describe, expect, it, vi } from 'vitest';
import { parse } from '../src/syntax/parser';
import { DualAxes } from '../src/vis/dual-axes';
import { chartOptions } from './helpers/renderers';

vi.mock('@antv/g2', async () => ({ Chart: (await import('./helpers/renderers')).MockChart }));

const options = { container: {} as HTMLElement, width: 600, height: 400 };

describe('parse - dual-axes chart', () => {
  it('should parse basic dual-axes chart with categories and series', () => {
    const result = parse(`
vis dual-axes
categories
  - 2018
  - 2019
  - 2020
  - 2021
  - 2022
title 2018-2022销售额与利润率
axisXTitle 年份
series
  - type column
    axisYTitle 销售额
  - type line
    axisYTitle 利润率
    `);

    expect(result.type).toBe('dual-axes');
    expect(result.title).toBe('2018-2022销售额与利润率');
    expect(result.axisXTitle).toBe('年份');
    // Categories parsed as numbers since they are numeric
    expect(result.categories).toEqual([2018, 2019, 2020, 2021, 2022]);
    expect(result.series).toEqual([
      { type: 'column', axisYTitle: '销售额' },
      { type: 'line', axisYTitle: '利润率' },
    ]);
  });

  it('should parse dual-axes chart with string categories', () => {
    const result = parse(`
vis dual-axes
categories
  - Q1
  - Q2
  - Q3
  - Q4
title 季度数据
    `);

    expect(result.type).toBe('dual-axes');
    expect(result.categories).toEqual(['Q1', 'Q2', 'Q3', 'Q4']);
    expect(result.title).toBe('季度数据');
  });

  it('should parse dual-axes chart with date categories', () => {
    const result = parse(`
vis dual-axes
categories
  - 20240501
  - 20240502
  - 20240503
title 五一期间景区人流量
axisXTitle 日期
series
  - type column
    axisYTitle 人数
  - type line
    axisYTitle 增长率
    `);

    // Date-like values parsed as numbers
    expect(result.categories).toEqual([20240501, 20240502, 20240503]);
    expect(result.series).toEqual([
      { type: 'column', axisYTitle: '人数' },
      { type: 'line', axisYTitle: '增长率' },
    ]);
  });

  it('should parse dual-axes chart with theme', () => {
    const result = parse(`
vis dual-axes
categories
  - Q1
  - Q2
  - Q3
theme academy
    `);

    expect(result.categories).toEqual(['Q1', 'Q2', 'Q3']);
    expect(result.theme).toBe('academy');
  });
});

describe('render - dual-axes theme', () => {
  beforeEach(() => {
    chartOptions.length = 0;
  });
  it('maps dual-axis component styles and both mark families', () => {
    DualAxes(options).render({
      categories: ['Jan', 'Feb'],
      series: [
        { type: 'column', data: [10, 12], axisYTitle: 'Revenue' },
        { type: 'line', data: [0.2, 0.3], axisYTitle: 'Rate' },
      ],
      style: {
        axis: { labelFill: '#475569' },
        legend: { itemLabelFill: '#334155' },
        mark: {
          interval: { shape: 'hollow', lineWidth: 4 },
          line: { shape: 'hv', lineWidth: 5 },
        },
      },
    });

    const chart = chartOptions.at(-1);
    expect(chart.axis.x).toMatchObject({ labelFill: '#475569' });
    expect(chart.legend.color).toMatchObject({ itemLabelFill: '#334155' });
    expect(chart.children[0]).toMatchObject({
      type: 'interval',
      encode: { shape: 'hollow' },
      style: { lineWidth: 4 },
      axis: { y: { labelFill: '#475569' } },
    });
    expect(chart.children[1]).toMatchObject({
      type: 'line',
      encode: { shape: 'hv' },
      style: { lineWidth: 5 },
      axis: { y: { labelFill: '#475569' } },
    });
  });
});
