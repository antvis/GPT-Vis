import { describe, expect, it } from 'vitest';
import { parse } from '../src/ai/parser';

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
