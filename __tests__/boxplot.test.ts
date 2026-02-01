import { describe, expect, it } from 'vitest';
import { parse } from '../src/syntax/parser';

describe('parse - boxplot chart', () => {
  it('should parse basic boxplot chart', () => {
    const result = parse(`
vis boxplot
data
  - category 班级A
    value 15
  - category 班级A
    value 18
  - category 班级A
    value 22
  - category 班级A
    value 27
  - category 班级A
    value 35
  - category 班级B
    value 10
  - category 班级B
    value 14
  - category 班级B
    value 19
  - category 班级B
    value 23
  - category 班级B
    value 30
title 成绩分布
    `);

    expect(result.type).toBe('boxplot');
    expect(result.title).toBe('成绩分布');
    expect(result.data).toEqual([
      { category: '班级A', value: 15 },
      { category: '班级A', value: 18 },
      { category: '班级A', value: 22 },
      { category: '班级A', value: 27 },
      { category: '班级A', value: 35 },
      { category: '班级B', value: 10 },
      { category: '班级B', value: 14 },
      { category: '班级B', value: 19 },
      { category: '班级B', value: 23 },
      { category: '班级B', value: 30 },
    ]);
  });

  it('should parse boxplot chart with theme', () => {
    const result = parse(`
vis boxplot
data
  - category 实验组1
    value 12
  - category 实验组1
    value 15
  - category 实验组1
    value 20
  - category 实验组2
    value 18
  - category 实验组2
    value 22
  - category 实验组2
    value 28
title 实验数据分布
theme dark
    `);

    expect(result.type).toBe('boxplot');
    expect(result.theme).toBe('dark');
    expect(result.title).toBe('实验数据分布');
  });

  it('should parse boxplot chart with group field', () => {
    const result = parse(`
vis boxplot
data
  - category Adelie
    group MALE
    value 181
  - category Adelie
    group FEMALE
    value 186
  - category Adelie
    group MALE
    value 190
  - category Adelie
    group FEMALE
    value 181
title 帕尔默企鹅身高性别差异
    `);

    expect(result.type).toBe('boxplot');
    expect(result.data).toEqual([
      { category: 'Adelie', group: 'MALE', value: 181 },
      { category: 'Adelie', group: 'FEMALE', value: 186 },
      { category: 'Adelie', group: 'MALE', value: 190 },
      { category: 'Adelie', group: 'FEMALE', value: 181 },
    ]);
  });
});
