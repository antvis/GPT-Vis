import { describe, expect, it } from 'vitest';
import { parse } from '../parser';

describe('parse - pie chart', () => {
  it('should parse basic pie chart', () => {
    const result = parse(`
vis pie
data
  - category 火锅
    value 22
  - category 自助餐
    value 12
  - category 川菜
    value 8
    `);

    expect(result.type).toBe('pie');
    expect(result.data).toEqual([
      { category: '火锅', value: 22 },
      { category: '自助餐', value: 12 },
      { category: '川菜', value: 8 },
    ]);
  });

  it('should parse pie chart with innerRadius (donut)', () => {
    const result = parse(`
vis pie
data
  - category 城镇人口
    value 63.89
  - category 乡村人口
    value 36.11
innerRadius 0.6
title 全国人口居住对比
    `);

    expect(result).toEqual({
      type: 'pie',
      data: [
        { category: '城镇人口', value: 63.89 },
        { category: '乡村人口', value: 36.11 },
      ],
      innerRadius: 0.6,
      title: '全国人口居住对比',
    });
  });

  it('should parse pie chart with theme and style', () => {
    const result = parse(`
vis pie
data
  - category 分类一
    value 27
  - category 分类二
    value 25
theme academy
style
  backgroundColor #333
  palette #ff5a5f #1fb6ff #13ce66
    `);

    expect(result.theme).toBe('academy');
    expect(result.style).toEqual({
      backgroundColor: '#333',
      palette: ['#ff5a5f', '#1fb6ff', '#13ce66'],
    });
  });
});
