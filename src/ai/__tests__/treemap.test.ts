import { describe, expect, it } from 'vitest';
import { parse } from '../parser';

describe('parse - treemap chart', () => {
  it('should parse basic treemap chart', () => {
    const result = parse(`
vis treemap
data
  - name 苹果
    value 800
  - name 橙子
    value 600
  - name 香蕉
    value 500
    `);

    expect(result.type).toBe('treemap');
    expect(result.data).toEqual([
      { name: '苹果', value: 800 },
      { name: '橙子', value: 600 },
      { name: '香蕉', value: 500 },
    ]);
  });

  it('should parse treemap chart with title', () => {
    const result = parse(`
vis treemap
data
  - name 产品A
    value 500
  - name 产品B
    value 400
title 产品销售情况
    `);

    expect(result.title).toBe('产品销售情况');
  });

  it('should parse treemap chart with theme', () => {
    const result = parse(`
vis treemap
data
  - name A
    value 100
  - name B
    value 80
theme academy
    `);

    expect(result.theme).toBe('academy');
  });

  it('should parse treemap chart with style', () => {
    const result = parse(`
vis treemap
data
  - name A
    value 100
style
  backgroundColor #f5f5f5
  palette #5B8FF9 #61DDAA #65789B
    `);

    expect(result.style).toEqual({
      backgroundColor: '#f5f5f5',
      palette: ['#5B8FF9', '#61DDAA', '#65789B'],
    });
  });
});
