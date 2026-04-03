import { describe, expect, it } from 'vitest';
import { isVisSyntax, parse } from '../../src/syntax/parser';

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

  it('should return false for non-string input', () => {
    expect(isVisSyntax(null)).toBe(false);
    expect(isVisSyntax(undefined)).toBe(false);
    expect(isVisSyntax(123)).toBe(false);
    expect(isVisSyntax({})).toBe(false);
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

  it('should parse chart type with hyphen', () => {
    const result = parse('vis dual-axes');
    expect(result.type).toBe('dual-axes');
  });

  it('should return empty type for empty input', () => {
    const result = parse('');
    expect(result.type).toBe('');
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

  it('should parse top-level key-value pairs with equals sign', () => {
    const result = parse(`
vis pie
innerRadius = 0.6
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

  it('should parse key without value', () => {
    const result = parse(`
vis pie
title
    `);
    expect(result.title).toBe('');
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

  it('should parse simple value arrays (flat arrays)', () => {
    const result = parse(`
vis histogram
data
  - 78
  - 88
  - 60
  - 100
    `);

    expect(result.data).toEqual([78, 88, 60, 100]);
  });

  it('should parse simple string arrays', () => {
    const result = parse(`
vis dual-axes
categories
  - 2018
  - 2019
  - 2020
    `);

    // Numeric-looking values are parsed as numbers
    expect(result.categories).toEqual([2018, 2019, 2020]);
  });

  it('should parse simple string arrays with non-numeric values', () => {
    const result = parse(`
vis dual-axes
categories
  - Q1
  - Q2
  - Q3
    `);

    expect(result.categories).toEqual(['Q1', 'Q2', 'Q3']);
  });

  it('should parse data with multiple properties', () => {
    const result = parse(`
vis line
data
  - time 2020
    value 100
    name Series1
  - time 2021
    value 200
    name Series2
    `);

    // Numeric-looking values are parsed as numbers
    expect(result.data).toEqual([
      { time: 2020, value: 100, name: 'Series1' },
      { time: 2021, value: 200, name: 'Series2' },
    ]);
  });

  it('should handle empty array item marker', () => {
    const result = parse(`
vis pie
data
  -
    category Cat1
    value 10
    `);

    expect(result.data).toEqual([{ category: 'Cat1', value: 10 }]);
  });
});

describe('parse - hierarchical data (children)', () => {
  it('should parse nested children arrays', () => {
    const result = parse(`
vis mind-map
data
  - name 项目计划
    children
      - name 研究阶段
        children
          - name 市场调研
          - name 技术可行性分析
      - name 开发阶段
    `);

    expect(result.data).toEqual([
      {
        name: '项目计划',
        children: [
          {
            name: '研究阶段',
            children: [{ name: '市场调研' }, { name: '技术可行性分析' }],
          },
          { name: '开发阶段' },
        ],
      },
    ]);
  });

  it('should parse treemap data with children', () => {
    const result = parse(`
vis treemap
data
  - name Root
    value 100
    children
      - name Child1
        value 40
      - name Child2
        value 60
    `);

    expect(result.data).toEqual([
      {
        name: 'Root',
        value: 100,
        children: [
          { name: 'Child1', value: 40 },
          { name: 'Child2', value: 60 },
        ],
      },
    ]);
  });
});

describe('parse - series arrays', () => {
  it('should parse series array', () => {
    const result = parse(`
vis dual-axes
series
  - type line
    encode xField
  - type bar
    encode yField
    `);

    expect(result.series).toEqual([
      { type: 'line', encode: 'xField' },
      { type: 'bar', encode: 'yField' },
    ]);
  });

  it('should parse series array with multiple properties', () => {
    const result = parse(`
vis dual-axes
series
  - type line
    name Sales
  - type bar
    name Revenue
    `);

    expect(result.series).toEqual([
      { type: 'line', name: 'Sales' },
      { type: 'bar', name: 'Revenue' },
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

  it('should parse style with colon separator', () => {
    const result = parse(`
vis pie
style
  backgroundColor: #333
  lineWidth: 2
    `);

    expect(result.style).toEqual({
      backgroundColor: '#333',
      lineWidth: 2,
    });
  });

  it('should parse style with numeric array values', () => {
    const result = parse(`
vis line
style
  margin 10 20 10 20
    `);

    expect(result.style).toEqual({
      margin: [10, 20, 10, 20],
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

describe('parse - edge cases for values', () => {
  it('should parse negative numbers', () => {
    const result = parse(`
vis line
data
  - value -10
  - value -20.5
    `);
    expect(result.data).toEqual([{ value: -10 }, { value: -20.5 }]);
  });

  it('should parse float numbers', () => {
    const result = parse(`
vis line
data
  - value 3.14
  - value 0.001
    `);
    expect(result.data).toEqual([{ value: 3.14 }, { value: 0.001 }]);
  });

  it('should parse scientific notation', () => {
    const result = parse(`
vis line
data
  - value 1e5
  - value 2.5e-3
    `);
    expect(result.data).toEqual([{ value: 100000 }, { value: 0.0025 }]);
  });

  it('should not parse NaN as number', () => {
    const result = parse(`
vis line
data
  - value NaN
    `);
    // NaN is not a valid number, should remain as string
    expect(result.data).toEqual([{ value: 'NaN' }]);
  });

  it('should parse Infinity as number', () => {
    const result = parse(`
vis line
data
  - value Infinity
    `);
    // Number('Infinity') returns Infinity which passes the !isNaN check
    expect(result.data).toEqual([{ value: Infinity }]);
  });
});

describe('parse - Unicode key names', () => {
  it('should support Chinese characters in key names', () => {
    const result = parse(`
vis pie
data
  - 分类 分类一
    数值 27
  - 分类 分类二
    数值 25
    `);
    expect(result.data).toEqual([
      { 分类: '分类一', 数值: 27 },
      { 分类: '分类二', 数值: 25 },
    ]);
  });

  it('should support Japanese characters in key names', () => {
    const result = parse(`
vis pie
data
  - カテゴリ 売上
    値 100
    `);
    expect(result.data).toEqual([{ カテゴリ: '売上', 値: 100 }]);
  });

  it('should support Korean characters in key names', () => {
    const result = parse(`
vis pie
data
  - 카테고리 판매
    값 50
    `);
    expect(result.data).toEqual([{ 카테고리: '판매', 값: 50 }]);
  });

  it('should support special characters in key names (parentheses, percent)', () => {
    const result = parse(`
vis line
data
  - time 2020
    增长率(%) 15.5
    产量(吨) 100
    `);
    expect(result.data).toEqual([{ time: 2020, '增长率(%)': 15.5, '产量(吨)': 100 }]);
  });

  it('should support mixed Chinese and English key names', () => {
    const result = parse(`
vis bar
data
  - category A
    销售额 1000
    profit 利润
    `);
    expect(result.data).toEqual([{ category: 'A', 销售额: 1000, profit: '利润' }]);
  });
});

describe('parse - empty and boundary sections', () => {
  it('should handle empty data section', () => {
    const result = parse(`
vis pie
data
    `);
    expect(result.data).toBeUndefined();
  });

  it('should handle empty style section', () => {
    const result = parse(`
vis pie
style
    `);
    expect(result.style).toEqual({});
  });

  it('should handle style with empty value', () => {
    const result = parse(`
vis pie
style
  backgroundColor
    `);
    expect(result.style).toEqual({ backgroundColor: '' });
  });

  it('should handle data section followed immediately by another section', () => {
    const result = parse(`
vis pie
data
style
  backgroundColor #333
    `);
    expect(result.data).toBeUndefined();
    expect(result.style).toEqual({ backgroundColor: '#333' });
  });

  it('should handle empty array item with no properties', () => {
    const result = parse(`
vis pie
data
  -
    `);
    expect(result.data).toEqual([{}]);
  });

  it('should handle multiple empty array items', () => {
    const result = parse(`
vis pie
data
  -
  -
    `);
    expect(result.data).toEqual([{}, {}]);
  });
});

describe('parse - duplicate keys', () => {
  it('should override duplicate top-level keys', () => {
    const result = parse(`
vis pie
title First
title Second
    `);
    expect(result.title).toBe('Second');
  });

  it('should override duplicate keys in data item', () => {
    const result = parse(`
vis pie
data
  - category A
    category B
    value 10
    `);
    expect(result.data).toEqual([{ category: 'B', value: 10 }]);
  });

  it('should override duplicate keys in style', () => {
    const result = parse(`
vis pie
style
  color red
  color blue
    `);
    expect(result.style).toEqual({ color: 'blue' });
  });
});

describe('parse - unknown sections', () => {
  it('should treat unknown single-word as top-level key with empty value', () => {
    const result = parse(`
vis pie
unknownKey
    `);
    // Unknown keys at indent 0 are parsed as key-value pairs
    expect(result.unknownKey).toBe('');
  });

  it('should ignore indented content under unknown section', () => {
    const result = parse(`
vis pie
unknownSection
  key value
    `);
    // unknownSection is not in ARRAY_SECTIONS or OBJECT_SECTIONS
    // So it's treated as a top-level key with empty value
    // The indented "key value" is ignored since it's not under a known section
    expect(result.unknownSection).toBe('');
    expect(result.key).toBeUndefined();
  });
});

describe('parse - deep nesting', () => {
  it('should parse 4+ levels of nested children', () => {
    const result = parse(`
vis mind-map
data
  - name L1
    children
      - name L2
        children
          - name L3
            children
              - name L4
                children
                  - name L5
    `);
    expect(result.data).toEqual([
      {
        name: 'L1',
        children: [
          {
            name: 'L2',
            children: [
              {
                name: 'L3',
                children: [
                  {
                    name: 'L4',
                    children: [{ name: 'L5' }],
                  },
                ],
              },
            ],
          },
        ],
      },
    ]);
  });

  it('should parse multiple children at different levels', () => {
    const result = parse(`
vis treemap
data
  - name Root
    children
      - name Child1
        children
          - name Grandchild1
          - name Grandchild2
      - name Child2
        children
          - name Grandchild3
    `);
    expect(result.data).toEqual([
      {
        name: 'Root',
        children: [
          {
            name: 'Child1',
            children: [{ name: 'Grandchild1' }, { name: 'Grandchild2' }],
          },
          {
            name: 'Child2',
            children: [{ name: 'Grandchild3' }],
          },
        ],
      },
    ]);
  });
});

describe('parse - complete examples', () => {
  it('should parse complete pie chart config', () => {
    const result = parse(`
vis pie
data
  - category 分类一
    value 27
  - category 分类二
    value 25
  - category 分类三
    value 18
  - category 分类四
    value 15
  - category 分类五
    value 10
innerRadius 0.6
title 销售分布
theme academy
style
  backgroundColor #333
  palette #ff5a5f #1fb6ff #13ce66 #ffce00 #ff6b6b
    `);

    expect(result.type).toBe('pie');
    expect(result.data).toHaveLength(5);
    expect(result.innerRadius).toBe(0.6);
    expect(result.title).toBe('销售分布');
    expect(result.theme).toBe('academy');
    expect(result.style).toEqual({
      backgroundColor: '#333',
      palette: ['#ff5a5f', '#1fb6ff', '#13ce66', '#ffce00', '#ff6b6b'],
    });
  });

  it('should parse complete line chart config', () => {
    const result = parse(`
vis line
data
  - time 2020
    value 100
  - time 2021
    value 150
  - time 2022
    value 200
title 年度趋势
    `);

    expect(result.type).toBe('line');
    // Numeric-looking values are parsed as numbers
    expect(result.data).toEqual([
      { time: 2020, value: 100 },
      { time: 2021, value: 150 },
      { time: 2022, value: 200 },
    ]);
    expect(result.title).toBe('年度趋势');
  });

  it('should parse complete table chart config with Unicode keys', () => {
    const result = parse(`
vis table
data
  - 类别 火锅
    营收额占比(%) 22
  - 类别 自助餐
    营收额占比(%) 12
  - 类别 小吃快餐
    营收额占比(%) 8
title 餐饮业营收额数据表
    `);

    expect(result.type).toBe('table');
    expect(result.data).toEqual([
      { 类别: '火锅', '营收额占比(%)': 22 },
      { 类别: '自助餐', '营收额占比(%)': 12 },
      { 类别: '小吃快餐', '营收额占比(%)': 8 },
    ]);
    expect(result.title).toBe('餐饮业营收额数据表');
  });
});
