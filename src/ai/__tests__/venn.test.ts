import { describe, expect, it } from 'vitest';
import { parse } from '../parser';

describe('parse - venn chart', () => {
  it('should parse basic venn chart with two sets', () => {
    const result = parse(`
vis venn
data
  - sets A
    value 20
    label 集合A
  - sets B
    value 15
    label 集合B
  - sets A,B
    value 5
    label 交集AB
title 集合交集示例
    `);

    expect(result.type).toBe('venn');
    expect(result.data).toEqual([
      { sets: 'A', value: 20, label: '集合A' },
      { sets: 'B', value: 15, label: '集合B' },
      { sets: 'A,B', value: 5, label: '交集AB' },
    ]);
    expect(result.title).toBe('集合交集示例');
  });

  it('should parse venn chart with three sets', () => {
    const result = parse(`
vis venn
data
  - sets A
    value 10
    label 集合A
  - sets B
    value 8
    label 集合B
  - sets C
    value 6
    label 集合C
  - sets A,B
    value 4
  - sets A,C
    value 2
  - sets B,C
    value 1
  - sets A,B,C
    value 1
title 三集合关系
theme dark
    `);

    expect(result.data).toEqual([
      { sets: 'A', value: 10, label: '集合A' },
      { sets: 'B', value: 8, label: '集合B' },
      { sets: 'C', value: 6, label: '集合C' },
      { sets: 'A,B', value: 4 },
      { sets: 'A,C', value: 2 },
      { sets: 'B,C', value: 1 },
      { sets: 'A,B,C', value: 1 },
    ]);
    expect(result.theme).toBe('dark');
  });

  it('should parse venn chart with custom style', () => {
    const result = parse(`
vis venn
data
  - sets A
    value 30
    label 购买手机
  - sets B
    value 25
    label 购买耳机
  - sets A,B
    value 10
title 标签交集
style
  palette #FFB6C1 #87CEFA
  backgroundColor #F8F8FF
    `);

    expect(result.style).toEqual({
      palette: ['#FFB6C1', '#87CEFA'],
      backgroundColor: '#F8F8FF',
    });
  });
});
