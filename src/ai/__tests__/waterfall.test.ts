import { describe, expect, it } from 'vitest';
import { parse } from '../parser';

describe('parse - waterfall chart', () => {
  it('should parse basic waterfall chart', () => {
    const result = parse(`
vis waterfall
data
  - category 期初利润
    value 100
  - category 销售收入
    value 80
  - category 运营成本
    value -50
  - category 税费
    value -20
  - category 总计
    isTotal true
    `);

    expect(result.type).toBe('waterfall');
    expect(result.data).toEqual([
      { category: '期初利润', value: 100 },
      { category: '销售收入', value: 80 },
      { category: '运营成本', value: -50 },
      { category: '税费', value: -20 },
      { category: '总计', isTotal: true },
    ]);
  });

  it('should parse waterfall chart with title and axis titles', () => {
    const result = parse(`
vis waterfall
data
  - category 起始值
    value 120
  - category 一月
    value 20
  - category 二月
    value -30
  - category 三月
    value 15
title 利润变化
axisXTitle 月份
axisYTitle 金额（万元）
    `);

    expect(result.title).toBe('利润变化');
    expect(result.axisXTitle).toBe('月份');
    expect(result.axisYTitle).toBe('金额（万元）');
  });

  it('should parse waterfall chart with intermediate total', () => {
    const result = parse(`
vis waterfall
data
  - category 基础预算
    value 500
  - category 市场投入
    value 120
  - category 总投入
    isIntermediateTotal true
  - category 采购优化
    value -60
  - category 总利润
    isTotal true
    `);

    expect(result.data).toEqual([
      { category: '基础预算', value: 500 },
      { category: '市场投入', value: 120 },
      { category: '总投入', isIntermediateTotal: true },
      { category: '采购优化', value: -60 },
      { category: '总利润', isTotal: true },
    ]);
  });

  it('should parse waterfall chart with theme', () => {
    const result = parse(`
vis waterfall
data
  - category 起始
    value 100
  - category 增加
    value 50
theme dark
    `);

    expect(result.theme).toBe('dark');
  });
});
