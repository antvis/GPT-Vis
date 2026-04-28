import { describe, expect, it } from 'vitest';
import { parse } from '../src/syntax/parser';

describe('parse - scatter chart', () => {
  it('should parse basic scatter chart', () => {
    const result = parse(`
vis scatter
data
  - x 10
    y 15
  - x 20
    y 25
  - x 30
    y 35
  - x 40
    y 45
    `);

    expect(result.type).toBe('scatter');
    expect(result.data).toEqual([
      { x: 10, y: 15 },
      { x: 20, y: 25 },
      { x: 30, y: 35 },
      { x: 40, y: 45 },
    ]);
  });

  it('should parse scatter chart with title', () => {
    const result = parse(`
vis scatter
data
  - x 25
    y 5000
  - x 35
    y 7000
  - x 45
    y 10000
title 年龄与收入关系
    `);

    expect(result.title).toBe('年龄与收入关系');
  });

  it('should parse scatter chart with group', () => {
    const result = parse(`
vis scatter
data
  - x 10
    y 20
    group A
  - x 15
    y 25
    group A
  - x 20
    y 30
    group B
  - x 25
    y 35
    group B
    `);

    expect(result.data).toEqual([
      { x: 10, y: 20, group: 'A' },
      { x: 15, y: 25, group: 'A' },
      { x: 20, y: 30, group: 'B' },
      { x: 25, y: 35, group: 'B' },
    ]);
  });

  it('should parse scatter chart with theme', () => {
    const result = parse(`
vis scatter
data
  - x 10
    y 20
theme academy
    `);

    expect(result.theme).toBe('academy');
  });

  it('should parse scatter chart with axisXTitle and axisYTitle', () => {
    const result = parse(`
vis scatter
data
  - x 25
    y 5000
  - x 35
    y 7000
title 年龄与收入关系
axisXTitle 年龄
axisYTitle 收入（元）
    `);

    expect(result.axisXTitle).toBe('年龄');
    expect(result.axisYTitle).toBe('收入（元）');
  });
});
