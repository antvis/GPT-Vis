import { describe, expect, it } from 'vitest';
import { isVisSyntax, parse } from '../parser';

describe('isVisSyntax', () => {
  it('should return true for valid vis syntax', () => {
    expect(isVisSyntax('vis pie')).toBe(true);
    expect(isVisSyntax('  vis pie')).toBe(true);
    expect(isVisSyntax('vis line')).toBe(true);
  });

  it('should return false for invalid syntax', () => {
    expect(isVisSyntax('data')).toBe(false);
    expect(isVisSyntax('type pie')).toBe(false);
    expect(isVisSyntax('')).toBe(false);
    expect(isVisSyntax('{ "type": "pie" }')).toBe(false);
  });
});

describe('parse - basic functionality', () => {
  it('should parse chart type', () => {
    const result = parse('vis pie');
    expect(result.type).toBe('pie');
  });

  it('should parse chart type with extra spaces', () => {
    const result = parse('vis   pie');
    expect(result.type).toBe('pie');
  });

  it('should parse top-level key-value pairs with colon', () => {
    const result = parse(`
vis pie
innerRadius: 0.6
    `);
    expect(result.type).toBe('pie');
    expect(result.innerRadius).toBe(0.6);
  });

  it('should parse top-level key-value pairs without colon', () => {
    const result = parse(`
vis pie
innerRadius 0.6
    `);
    expect(result.type).toBe('pie');
    expect(result.innerRadius).toBe(0.6);
  });

  it('should parse boolean values', () => {
    const result = parse(`
vis bar
group true
stack false
    `);
    expect(result.group).toBe(true);
    expect(result.stack).toBe(false);
  });

  it('should parse string values', () => {
    const result = parse(`
vis pie
title Sales Report
    `);
    expect(result.title).toBe('Sales Report');
  });
});

describe('parse - data arrays', () => {
  it('should parse simple data array', () => {
    const result = parse(`
vis pie
data
  - category Category1
    value 27
  - category Category2
    value 25
    `);

    expect(result.type).toBe('pie');
    expect(result.data).toEqual([
      { category: 'Category1', value: 27 },
      { category: 'Category2', value: 25 },
    ]);
  });

  it('should parse data array with multiple spaces', () => {
    const result = parse(`
vis pie
data
  -   category    Category1
      value    27
  -   category    Category2
      value    25
    `);

    expect(result.data).toEqual([
      { category: 'Category1', value: 27 },
      { category: 'Category2', value: 25 },
    ]);
  });

  it('should handle data with Chinese characters', () => {
    const result = parse(`
vis pie
data
  - category 分类一
    value 27
  - category 分类二
    value 25
    `);

    expect(result.data).toEqual([
      { category: '分类一', value: 27 },
      { category: '分类二', value: 25 },
    ]);
  });
});

describe('parse - style object', () => {
  it('should parse style section', () => {
    const result = parse(`
vis pie
style
  backgroundColor #333
    `);

    expect(result.style).toEqual({
      backgroundColor: '#333',
    });
  });

  it('should parse palette as array', () => {
    const result = parse(`
vis pie
style
  palette #ff5a5f #1fb6ff #13ce66
    `);

    expect(result.style).toEqual({
      palette: ['#ff5a5f', '#1fb6ff', '#13ce66'],
    });
  });

  it('should parse style with multiple properties', () => {
    const result = parse(`
vis pie
style
  backgroundColor #333
  palette #ff5a5f #1fb6ff #13ce66
  lineWidth 2
    `);

    expect(result.style).toEqual({
      backgroundColor: '#333',
      palette: ['#ff5a5f', '#1fb6ff', '#13ce66'],
      lineWidth: 2,
    });
  });
});

describe('parse - error tolerance', () => {
  it('should handle multiple consecutive spaces', () => {
    const result = parse(`
vis      pie
data
  -   category      Category1
      value      27
    `);

    expect(result.type).toBe('pie');
    expect(result.data).toEqual([{ category: 'Category1', value: 27 }]);
  });

  it('should handle tabs mixed with spaces', () => {
    const result = parse(`
vis pie
data
	- category Category1
	  value 27
    `);

    expect(result.type).toBe('pie');
    expect(result.data).toEqual([{ category: 'Category1', value: 27 }]);
  });

  it('should handle empty lines between sections', () => {
    const result = parse(`
vis pie

data
  - category Cat1
    value 10

  - category Cat2
    value 20

innerRadius 0.5
    `);

    expect(result.type).toBe('pie');
    expect(result.data).toEqual([
      { category: 'Cat1', value: 10 },
      { category: 'Cat2', value: 20 },
    ]);
    expect(result.innerRadius).toBe(0.5);
  });

  it('should handle trailing whitespace', () => {
    const result = parse(`
vis pie   
data   
  - category Cat1   
    value 10   
    `);

    expect(result.type).toBe('pie');
    expect(result.data).toEqual([{ category: 'Cat1', value: 10 }]);
  });

  it('should handle leading whitespace in entire input', () => {
    const result = parse(`
    
vis pie
data
  - category Cat1
    value 10
    `);

    expect(result.type).toBe('pie');
  });

  it('should handle mixed colon and space formats', () => {
    const result = parse(`
vis pie
innerRadius: 0.6
title My Chart
theme: academy
    `);

    expect(result.innerRadius).toBe(0.6);
    expect(result.title).toBe('My Chart');
    expect(result.theme).toBe('academy');
  });
});

describe('parse - theme configuration', () => {
  it('should parse theme setting', () => {
    const result = parse(`
vis pie
data
  - category Cat1
    value 10
theme academy
    `);

    expect(result.theme).toBe('academy');
  });

  it('should parse dark theme', () => {
    const result = parse(`
vis bar
theme dark
    `);

    expect(result.theme).toBe('dark');
  });
});
