import { describe, expect, it } from 'vitest';
import { parse } from '../src/syntax/parser';

describe('parse - liquid chart', () => {
  it('should parse basic liquid chart', () => {
    const result = parse(`
vis liquid
percent 0.75
title 任务完成度
    `);

    expect(result).toEqual({
      type: 'liquid',
      percent: 0.75,
      title: '任务完成度',
    });
  });

  it('should parse liquid chart with theme', () => {
    const result = parse(`
vis liquid
percent 0.6
title 资源使用率
theme dark
    `);

    expect(result.theme).toBe('dark');
    expect(result.percent).toBe(0.6);
  });

  it('should parse liquid chart with shape', () => {
    const result = parse(`
vis liquid
percent 0.92
title KPI达成率
shape triangle
    `);

    expect(result.shape).toBe('triangle');
    expect(result.percent).toBe(0.92);
  });

  it('should parse liquid chart with style', () => {
    const result = parse(`
vis liquid
percent 0.8
title 进度
style
  palette
    - #00BFFF
  backgroundColor #F0F0F0
    `);

    expect(result.style).toEqual({
      palette: ['#00BFFF'],
      backgroundColor: '#F0F0F0',
    });
  });
});
