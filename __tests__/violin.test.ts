import { describe, expect, it } from 'vitest';
import { parse } from '../src/ai/parser';

describe('parse - violin chart', () => {
  it('should parse basic violin chart', () => {
    const result = parse(`
vis violin
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

    expect(result.type).toBe('violin');
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

  it('should parse violin chart with theme', () => {
    const result = parse(`
vis violin
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

    expect(result.type).toBe('violin');
    expect(result.theme).toBe('dark');
    expect(result.title).toBe('实验数据分布');
  });

  it('should parse violin chart with group field', () => {
    const result = parse(`
vis violin
data
  - group I.setosa
    category PetalWidth
    value 0.2
  - group I.setosa
    category PetalLength
    value 1.4
  - group I.versicolor
    category PetalWidth
    value 1.4
  - group I.versicolor
    category PetalLength
    value 4.7
title 鸢尾花特征分布
    `);

    expect(result.type).toBe('violin');
    expect(result.data).toEqual([
      { group: 'I.setosa', category: 'PetalWidth', value: 0.2 },
      { group: 'I.setosa', category: 'PetalLength', value: 1.4 },
      { group: 'I.versicolor', category: 'PetalWidth', value: 1.4 },
      { group: 'I.versicolor', category: 'PetalLength', value: 4.7 },
    ]);
  });
});
