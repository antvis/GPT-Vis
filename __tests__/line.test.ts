import { describe, expect, it } from 'vitest';
import { parse } from '../src/syntax/parser';

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
  palette #5B8FF9 #61DDAA
    `);

    expect(result.theme).toBe('academy');
    expect(result.style).toEqual({
      lineWidth: 3,
      palette: ['#5B8FF9', '#61DDAA'],
    });
  });
});
