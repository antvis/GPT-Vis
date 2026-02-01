import { describe, expect, it } from 'vitest';
import { parse } from '../parser';

describe('parse - histogram chart', () => {
  it('should parse basic histogram chart', () => {
    const result = parse(`
vis histogram
data
  - value 78
  - value 88
  - value 60
  - value 100
  - value 95
binNumber 5
title 成绩分布
    `);

    expect(result.type).toBe('histogram');
    expect(result.data).toEqual([
      { value: 78 },
      { value: 88 },
      { value: 60 },
      { value: 100 },
      { value: 95 },
    ]);
    expect(result.binNumber).toBe(5);
    expect(result.title).toBe('成绩分布');
  });

  it('should parse histogram chart with decimal values', () => {
    const result = parse(`
vis histogram
data
  - value 1.2
  - value 3.4
  - value 3.7
  - value 4.3
  - value 5.2
  - value 5.8
  - value 6.1
axisXTitle 花瓣大小分布
axisYTitle 花瓣分布数量
    `);

    expect(result.data).toEqual([
      { value: 1.2 },
      { value: 3.4 },
      { value: 3.7 },
      { value: 4.3 },
      { value: 5.2 },
      { value: 5.8 },
      { value: 6.1 },
    ]);
    expect(result.axisXTitle).toBe('花瓣大小分布');
    expect(result.axisYTitle).toBe('花瓣分布数量');
  });

  it('should parse histogram chart with theme', () => {
    const result = parse(`
vis histogram
data
  - value 20
  - value 25
  - value 30
  - value 35
theme academy
    `);

    expect(result.theme).toBe('academy');
  });

  it('should parse histogram chart with style', () => {
    const result = parse(`
vis histogram
data
  - value 10
  - value 20
  - value 30
style
  backgroundColor #f5f5f5
  palette #5B8FF9
    `);

    expect(result.style).toEqual({
      backgroundColor: '#f5f5f5',
      palette: '#5B8FF9',
    });
  });
});
