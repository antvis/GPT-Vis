import { describe, expect, it } from 'vitest';
import { parse } from '../parser';

describe('parse - bar chart', () => {
  it('should parse basic bar chart', () => {
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
  - category 北京
    value 825.6
    group 油车
  - category 北京
    value 60.2
    group 新能源汽车
  - category 上海
    value 450
    group 油车
  - category 上海
    value 95
    group 新能源汽车
group true
title 油车与新能源汽车售卖量
    `);

    expect(result.group).toBe(true);
    expect(result.data).toEqual([
      { category: '北京', value: 825.6, group: '油车' },
      { category: '北京', value: 60.2, group: '新能源汽车' },
      { category: '上海', value: 450, group: '油车' },
      { category: '上海', value: 95, group: '新能源汽车' },
    ]);
  });

  it('should parse stacked bar chart', () => {
    const result = parse(`
vis bar
data
  - category 北京
    value 825.6
    group 油车
  - category 北京
    value 60.2
    group 新能源汽车
stack true
title 油车与新能源汽车售卖量
    `);

    expect(result.stack).toBe(true);
    expect(result.title).toBe('油车与新能源汽车售卖量');
  });
});
