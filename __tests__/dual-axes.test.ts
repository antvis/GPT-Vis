import { describe, expect, it } from 'vitest';
import { parse } from '../src/ai/parser';

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
