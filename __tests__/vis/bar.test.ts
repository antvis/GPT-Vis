import { beforeEach, describe, expect, it, vi } from 'vitest';
import { parse } from '../../src/syntax/parser';
import { Bar } from '../../src/vis/bar';
import { chartOptions } from '../helpers/renderers';

vi.mock('@antv/g2', async () => ({ Chart: (await import('../helpers/renderers')).MockChart }));

const options = { container: {} as HTMLElement, width: 600, height: 400 };

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

describe('render - bar theme', () => {
  beforeEach(() => {
    chartOptions.length = 0;
  });
  it('applies interval, axis, legend and label styles', () => {
    Bar(options).render({
      data: [
        { category: 'A', value: 10, group: 'One' },
        { category: 'B', value: 12, group: 'Two' },
      ],
      style: {
        axis: { labelFill: '#475569' },
        legend: { itemLabelFill: '#334155' },
        label: { fontSize: 16 },
        mark: { interval: { shape: 'hollow', lineWidth: 4 } },
      },
    });

    expect(chartOptions.at(-1)).toMatchObject({
      labels: [expect.objectContaining({ fontSize: 16 })],
      style: { lineWidth: 4, shape: 'hollow' },
      theme: {
        axis: {
          labelFill: '#475569',
        },
        legendCategory: {
          itemLabelFill: '#334155',
        },
      },
    });
  });

  it('keeps value labels enabled by default', () => {
    Bar(options).render({ data: [{ category: 'A', value: 120 }] });

    expect(chartOptions.at(-1)).toMatchObject({
      animate: false,
      labels: [expect.objectContaining({ text: 'value', fill: '#FFFFFF' })],
    });
  });

  it('lets chart config disable labels even with label styles', () => {
    Bar(options).render({
      data: [{ category: 'A', value: 120 }],
      label: false,
      style: { label: { fill: '#b42318' } },
    });

    expect(chartOptions.at(-1).labels).toEqual([]);
  });

  it('bar preserves an explicit label fill', () => {
    const chart = Bar({ container: {} as HTMLElement, width: 600, height: 400 });

    chart.render({
      data: [{ category: 'A', value: 120 }],
      style: { label: { fill: '#b42318' } },
    });

    expect(chartOptions.at(-1)?.labels[0]).toMatchObject({
      fill: '#b42318',
    });
    expect(chartOptions.at(-1)?.labels[0].transform).toBeUndefined();
  });
});
