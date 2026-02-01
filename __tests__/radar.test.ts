import { describe, expect, it } from 'vitest';
import { parse } from '../src/ai/parser';

describe('parse - radar chart', () => {
  it('should parse basic radar chart', () => {
    const result = parse(`
vis radar
data
  - name 沟通能力
    value 2
  - name 协作能力
    value 3
  - name 领导能力
    value 2
  - name 学习能力
    value 5
  - name 创新能力
    value 6
  - name 技术能力
    value 9
    `);

    expect(result.type).toBe('radar');
    expect(result.data).toEqual([
      { name: '沟通能力', value: 2 },
      { name: '协作能力', value: 3 },
      { name: '领导能力', value: 2 },
      { name: '学习能力', value: 5 },
      { name: '创新能力', value: 6 },
      { name: '技术能力', value: 9 },
    ]);
  });

  it('should parse grouped radar chart', () => {
    const result = parse(`
vis radar
data
  - name 语文
    value 95
    group 一班
  - name 数学
    value 96
    group 一班
  - name 外语
    value 85
    group 一班
  - name 语文
    value 75
    group 二班
  - name 数学
    value 93
    group 二班
  - name 外语
    value 66
    group 二班
    `);

    expect(result.type).toBe('radar');
    expect(result.data).toEqual([
      { name: '语文', value: 95, group: '一班' },
      { name: '数学', value: 96, group: '一班' },
      { name: '外语', value: 85, group: '一班' },
      { name: '语文', value: 75, group: '二班' },
      { name: '数学', value: 93, group: '二班' },
      { name: '外语', value: 66, group: '二班' },
    ]);
  });

  it('should parse radar chart with title and theme', () => {
    const result = parse(`
vis radar
data
  - name Vitamin C
    value 7
  - name Fiber
    value 6
  - name Sugar
    value 5
title 营养成分分析
theme academy
    `);

    expect(result.title).toBe('营养成分分析');
    expect(result.theme).toBe('academy');
  });
});
