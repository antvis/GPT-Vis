import { describe, expect, it, vi } from 'vitest';
import { isVisSyntax, parse } from '../parser';

describe('GPTVis syntax integration', () => {
  it('should parse pie chart syntax and extract config', () => {
    const syntax = `
vis pie
data
  - category 分类一
    value 27
  - category 分类二
    value 25
innerRadius: 0.6
`;

    const result = parse(syntax);
    expect(result.type).toBe('pie');
    expect(result.innerRadius).toBe(0.6);
    expect(result.data).toEqual([
      { category: '分类一', value: 27 },
      { category: '分类二', value: 25 },
    ]);
  });

  it('should detect syntax string correctly', () => {
    expect(isVisSyntax('vis pie\ndata')).toBe(true);
    expect(isVisSyntax('{ "type": "pie" }')).toBe(false);
    expect(isVisSyntax('pie')).toBe(false);
  });

  it('should parse chart type with hyphens', () => {
    const syntax = `
vis word-cloud
data
  - word JavaScript
    weight 100
  - word TypeScript
    weight 90
`;

    const result = parse(syntax);
    expect(result.type).toBe('word-cloud');
    expect(result.data).toEqual([
      { word: 'JavaScript', weight: 100 },
      { word: 'TypeScript', weight: 90 },
    ]);
  });

  it('should parse mind-map type', () => {
    const syntax = `
vis mind-map
data
  - name Root
`;

    const result = parse(syntax);
    expect(result.type).toBe('mind-map');
  });

  it('should parse dual-axes type', () => {
    const syntax = `
vis dual-axes
data
  - time 2020
    value 100
`;

    const result = parse(syntax);
    expect(result.type).toBe('dual-axes');
  });
});
