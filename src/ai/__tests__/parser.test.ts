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

describe('parse - pie chart', () => {
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
  - category 其他
    value 5
innerRadius: 0.6
style
  backgroundColor #333
  palette #ff5a5f #1fb6ff #13ce66
    `);

    expect(result).toEqual({
      type: 'pie',
      data: [
        { category: '分类一', value: 27 },
        { category: '分类二', value: 25 },
        { category: '分类三', value: 18 },
        { category: '分类四', value: 15 },
        { category: '分类五', value: 10 },
        { category: '其他', value: 5 },
      ],
      innerRadius: 0.6,
      style: {
        backgroundColor: '#333',
        palette: ['#ff5a5f', '#1fb6ff', '#13ce66'],
      },
    });
  });
});

describe('parse - line chart', () => {
  it('should parse line chart with time series data', () => {
    const result = parse(`
vis line
data
  - time 2015年
    value 1700
  - time 2016年
    value 1500
  - time 2017年
    value 1200
title 出生人口变化
axisXTitle 年份
axisYTitle 出生人口（万人）
    `);

    expect(result).toEqual({
      type: 'line',
      data: [
        { time: '2015年', value: 1700 },
        { time: '2016年', value: 1500 },
        { time: '2017年', value: 1200 },
      ],
      title: '出生人口变化',
      axisXTitle: '年份',
      axisYTitle: '出生人口（万人）',
    });
  });

  it('should parse line chart with grouped data', () => {
    const result = parse(`
vis line
data
  - time 2015年
    value 1700
    group 城市
  - time 2015年
    value 1200
    group 农村
  - time 2016年
    value 1500
    group 城市
  - time 2016年
    value 1100
    group 农村
    `);

    expect(result.data).toEqual([
      { time: '2015年', value: 1700, group: '城市' },
      { time: '2015年', value: 1200, group: '农村' },
      { time: '2016年', value: 1500, group: '城市' },
      { time: '2016年', value: 1100, group: '农村' },
    ]);
  });
});

describe('parse - bar chart', () => {
  it('should parse bar chart config', () => {
    const result = parse(`
vis bar
data
  - category 2015年
    value 80
  - category 2016年
    value 140
  - category 2017年
    value 220
title 海底捞公司外卖收入
axisXTitle 年份
axisYTitle 金额（百万元）
    `);

    expect(result).toEqual({
      type: 'bar',
      data: [
        { category: '2015年', value: 80 },
        { category: '2016年', value: 140 },
        { category: '2017年', value: 220 },
      ],
      title: '海底捞公司外卖收入',
      axisXTitle: '年份',
      axisYTitle: '金额（百万元）',
    });
  });

  it('should parse grouped bar chart', () => {
    const result = parse(`
vis bar
data
  - category Q1
    value 100
    group 产品A
  - category Q1
    value 80
    group 产品B
group true
    `);

    expect(result.group).toBe(true);
    expect(result.data).toEqual([
      { category: 'Q1', value: 100, group: '产品A' },
      { category: 'Q1', value: 80, group: '产品B' },
    ]);
  });

  it('should parse stacked bar chart', () => {
    const result = parse(`
vis bar
data
  - category Q1
    value 100
    group 产品A
  - category Q1
    value 80
    group 产品B
stack true
    `);

    expect(result.stack).toBe(true);
  });
});

describe('parse - column chart', () => {
  it('should parse column chart config', () => {
    const result = parse(`
vis column
data
  - category Q1
    value 100
  - category Q2
    value 150
  - category Q3
    value 200
  - category Q4
    value 180
title 季度销售额
axisXTitle 季度
axisYTitle 销售额（万元）
    `);

    expect(result).toEqual({
      type: 'column',
      data: [
        { category: 'Q1', value: 100 },
        { category: 'Q2', value: 150 },
        { category: 'Q3', value: 200 },
        { category: 'Q4', value: 180 },
      ],
      title: '季度销售额',
      axisXTitle: '季度',
      axisYTitle: '销售额（万元）',
    });
  });
});

describe('parse - area chart', () => {
  it('should parse area chart config', () => {
    const result = parse(`
vis area
data
  - time 2015
    value 3
  - time 2016
    value 4
  - time 2017
    value 3.5
  - time 2018
    value 5
title 趋势图
    `);

    expect(result).toEqual({
      type: 'area',
      data: [
        { time: 2015, value: 3 },
        { time: 2016, value: 4 },
        { time: 2017, value: 3.5 },
        { time: 2018, value: 5 },
      ],
      title: '趋势图',
    });
  });
});

describe('parse - radar chart', () => {
  it('should parse radar chart config', () => {
    const result = parse(`
vis radar
data
  - item 销售
    value 70
  - item 管理
    value 50
  - item 技术
    value 80
  - item 服务
    value 65
    `);

    expect(result.type).toBe('radar');
    expect(result.data).toEqual([
      { item: '销售', value: 70 },
      { item: '管理', value: 50 },
      { item: '技术', value: 80 },
      { item: '服务', value: 65 },
    ]);
  });
});

describe('parse - funnel chart', () => {
  it('should parse funnel chart config', () => {
    const result = parse(`
vis funnel
data
  - category 展示
    value 5000
  - category 点击
    value 2000
  - category 访问
    value 1000
  - category 咨询
    value 500
  - category 订单
    value 200
    `);

    expect(result.type).toBe('funnel');
    expect(result.data).toEqual([
      { category: '展示', value: 5000 },
      { category: '点击', value: 2000 },
      { category: '访问', value: 1000 },
      { category: '咨询', value: 500 },
      { category: '订单', value: 200 },
    ]);
  });
});

describe('parse - scatter chart', () => {
  it('should parse scatter chart config', () => {
    const result = parse(`
vis scatter
data
  - x 10
    y 20
  - x 15
    y 30
  - x 25
    y 25
  - x 35
    y 40
axisXTitle X轴
axisYTitle Y轴
    `);

    expect(result.type).toBe('scatter');
    expect(result.data).toEqual([
      { x: 10, y: 20 },
      { x: 15, y: 30 },
      { x: 25, y: 25 },
      { x: 35, y: 40 },
    ]);
    expect(result.axisXTitle).toBe('X轴');
    expect(result.axisYTitle).toBe('Y轴');
  });
});

describe('parse - sankey chart', () => {
  it('should parse sankey chart config', () => {
    const result = parse(`
vis sankey
data
  - source 访问
    target 注册
    value 100
  - source 注册
    target 付费
    value 60
  - source 注册
    target 流失
    value 40
    `);

    expect(result.type).toBe('sankey');
    expect(result.data).toEqual([
      { source: '访问', target: '注册', value: 100 },
      { source: '注册', target: '付费', value: 60 },
      { source: '注册', target: '流失', value: 40 },
    ]);
  });
});

describe('parse - treemap chart', () => {
  it('should parse treemap chart config', () => {
    const result = parse(`
vis treemap
data
  - name 分类A
    value 100
  - name 分类B
    value 80
  - name 分类C
    value 60
    `);

    expect(result.type).toBe('treemap');
    expect(result.data).toEqual([
      { name: '分类A', value: 100 },
      { name: '分类B', value: 80 },
      { name: '分类C', value: 60 },
    ]);
  });
});

describe('parse - word-cloud chart', () => {
  it('should parse word-cloud chart config', () => {
    const result = parse(`
vis word-cloud
data
  - word JavaScript
    weight 100
  - word TypeScript
    weight 90
  - word React
    weight 85
    `);

    expect(result.type).toBe('word-cloud');
    expect(result.data).toEqual([
      { word: 'JavaScript', weight: 100 },
      { word: 'TypeScript', weight: 90 },
      { word: 'React', weight: 85 },
    ]);
  });
});

describe('parse - liquid chart', () => {
  it('should parse liquid chart config', () => {
    const result = parse(`
vis liquid
percent 0.75
title 完成进度
    `);

    expect(result).toEqual({
      type: 'liquid',
      percent: 0.75,
      title: '完成进度',
    });
  });
});

describe('parse - waterfall chart', () => {
  it('should parse waterfall chart config', () => {
    const result = parse(`
vis waterfall
data
  - category 起始值
    value 120
  - category 一月
    value 20
  - category 二月
    value -30
  - category 三月
    value 15
    `);

    expect(result.type).toBe('waterfall');
    expect(result.data).toEqual([
      { category: '起始值', value: 120 },
      { category: '一月', value: 20 },
      { category: '二月', value: -30 },
      { category: '三月', value: 15 },
    ]);
  });
});

describe('parse - histogram chart', () => {
  it('should parse histogram chart config', () => {
    const result = parse(`
vis histogram
data
  - value 23
  - value 45
  - value 56
  - value 67
  - value 78
binWidth 10
    `);

    expect(result.type).toBe('histogram');
    expect(result.data).toEqual([{ value: 23 }, { value: 45 }, { value: 56 }, { value: 67 }, { value: 78 }]);
    expect(result.binWidth).toBe(10);
  });
});

describe('parse - venn chart', () => {
  it('should parse venn chart config', () => {
    const result = parse(`
vis venn
data
  - sets A
    value 10
  - sets B
    value 8
  - sets A,B
    value 3
    `);

    expect(result.type).toBe('venn');
    expect(result.data).toEqual([
      { sets: 'A', value: 10 },
      { sets: 'B', value: 8 },
      { sets: 'A,B', value: 3 },
    ]);
  });
});

describe('parse - dual-axes chart', () => {
  it('should parse dual-axes chart config', () => {
    const result = parse(`
vis dual-axes
data
  - time 2020
    value 100
    value2 0.5
  - time 2021
    value 150
    value2 0.6
    `);

    expect(result.type).toBe('dual-axes');
    expect(result.data).toEqual([
      { time: 2020, value: 100, value2: 0.5 },
      { time: 2021, value: 150, value2: 0.6 },
    ]);
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
