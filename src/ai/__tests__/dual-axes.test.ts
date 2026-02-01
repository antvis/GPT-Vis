import { describe, expect, it } from 'vitest';
import { parse } from '../parser';

describe('parse - dual-axes chart', () => {
  it('should parse basic dual-axes chart', () => {
    const result = parse(`
vis dual-axes
categories
  - value 2018
  - value 2019
  - value 2020
  - value 2021
  - value 2022
title 2018-2022销售额与利润率
axisXTitle 年份
    `);

    expect(result.type).toBe('dual-axes');
    expect(result.title).toBe('2018-2022销售额与利润率');
    expect(result.axisXTitle).toBe('年份');
    expect(result.categories).toEqual([
      { value: 2018 },
      { value: 2019 },
      { value: 2020 },
      { value: 2021 },
      { value: 2022 },
    ]);
  });

  it('should parse dual-axes chart with string categories', () => {
    const result = parse(`
vis dual-axes
categories
  - value Q1
  - value Q2
  - value Q3
  - value Q4
title 季度数据
    `);

    expect(result.type).toBe('dual-axes');
    expect(result.categories).toEqual([
      { value: 'Q1' },
      { value: 'Q2' },
      { value: 'Q3' },
      { value: 'Q4' },
    ]);
    expect(result.title).toBe('季度数据');
  });

  it('should parse dual-axes chart with series', () => {
    const result = parse(`
vis dual-axes
series
  - type column
    axisYTitle 人数
  - type line
    axisYTitle 增长率
title 五一期间景区人流量
    `);

    expect(result.series).toEqual([
      { type: 'column', axisYTitle: '人数' },
      { type: 'line', axisYTitle: '增长率' },
    ]);
  });

  it('should parse dual-axes chart with theme', () => {
    const result = parse(`
vis dual-axes
categories
  - value Q1
  - value Q2
  - value Q3
theme academy
    `);

    expect(result.theme).toBe('academy');
  });
});
