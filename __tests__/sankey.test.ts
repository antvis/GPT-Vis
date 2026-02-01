import { describe, expect, it } from 'vitest';
import { parse } from '../src/syntax/parser';

describe('parse - sankey chart', () => {
  it('should parse basic sankey chart', () => {
    const result = parse(`
vis sankey
data
  - source 煤炭
    target 发电厂
    value 120
  - source 天然气
    target 发电厂
    value 80
  - source 发电厂
    target 工业
    value 100
  - source 发电厂
    target 居民
    value 60
  - source 发电厂
    target 商业
    value 40
nodeAlign justify
title 能源流动关系
    `);

    expect(result.type).toBe('sankey');
    expect(result.data).toEqual([
      { source: '煤炭', target: '发电厂', value: 120 },
      { source: '天然气', target: '发电厂', value: 80 },
      { source: '发电厂', target: '工业', value: 100 },
      { source: '发电厂', target: '居民', value: 60 },
      { source: '发电厂', target: '商业', value: 40 },
    ]);
    expect(result.nodeAlign).toBe('justify');
    expect(result.title).toBe('能源流动关系');
  });

  it('should parse sankey chart with theme', () => {
    const result = parse(`
vis sankey
data
  - source 投资人
    target 创业公司
    value 200
  - source 创业公司
    target 市场营销
    value 80
  - source 创业公司
    target 研发
    value 120
nodeAlign center
title 资金流转路径
theme dark
    `);

    expect(result.theme).toBe('dark');
    expect(result.nodeAlign).toBe('center');
  });

  it('should parse sankey chart with custom style', () => {
    const result = parse(`
vis sankey
data
  - source 首页
    target 产品页
    value 300
  - source 产品页
    target 购物车
    value 150
nodeAlign left
style
  palette #5B8FF9 #61DDAA #65789B #F6BD16 #7262FD
  backgroundColor #f0f2f5
    `);

    expect(result.style).toEqual({
      palette: ['#5B8FF9', '#61DDAA', '#65789B', '#F6BD16', '#7262FD'],
      backgroundColor: '#f0f2f5',
    });
  });
});
