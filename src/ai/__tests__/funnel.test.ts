import { describe, expect, it } from 'vitest';
import { parse } from '../parser';

describe('parse - funnel chart', () => {
  it('should parse basic funnel chart', () => {
    const result = parse(`
vis funnel
data
  - category 访问
    value 1000
  - category 咨询
    value 600
  - category 下单
    value 300
  - category 成交
    value 120
title 销售漏斗
    `);

    expect(result.type).toBe('funnel');
    expect(result.data).toEqual([
      { category: '访问', value: 1000 },
      { category: '咨询', value: 600 },
      { category: '下单', value: 300 },
      { category: '成交', value: 120 },
    ]);
    expect(result.title).toBe('销售漏斗');
  });

  it('should parse funnel chart with theme', () => {
    const result = parse(`
vis funnel
data
  - category 注册
    value 800
  - category 激活
    value 500
  - category 付费
    value 200
title 用户转化流程
theme dark
    `);

    expect(result.theme).toBe('dark');
    expect(result.title).toBe('用户转化流程');
  });

  it('should parse funnel chart with custom style', () => {
    const result = parse(`
vis funnel
data
  - category 报名
    value 1500
  - category 签到
    value 900
  - category 参与
    value 700
title 活动参与漏斗
style
  palette #FF7F50 #87CEFA #32CD32
  backgroundColor #FFF8DC
    `);

    expect(result.style).toEqual({
      palette: ['#FF7F50', '#87CEFA', '#32CD32'],
      backgroundColor: '#FFF8DC',
    });
  });
});
