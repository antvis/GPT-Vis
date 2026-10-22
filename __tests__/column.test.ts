import { beforeEach, describe, expect, it, vi } from 'vitest';
import { parse } from '../src/syntax/parser';
import { Column } from '../src/vis/column';
import { chartOptions } from './helpers/renderers';

vi.mock('@antv/g2', async () => ({ Chart: (await import('./helpers/renderers')).MockChart }));

const options = { container: {} as HTMLElement, width: 600, height: 400 };

describe('parse - column chart', () => {
  it('should parse basic column chart', () => {
    const result = parse(`
vis column
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
      type: 'column',
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

  it('should parse grouped column chart', () => {
    const result = parse(`
vis column
data
  - category 北京
    value 825.6
    group 油车
  - category 北京
    value 60.2
    group 新能源汽车
group true
title 油车与新能源汽车售卖量
    `);

    expect(result.group).toBe(true);
    expect(result.data).toEqual([
      { category: '北京', value: 825.6, group: '油车' },
      { category: '北京', value: 60.2, group: '新能源汽车' },
    ]);
  });

  it('should parse stacked column chart', () => {
    const result = parse(`
vis column
data
  - category 北京
    value 825.6
    group 油车
  - category 北京
    value 60.2
    group 新能源汽车
stack true
    `);

    expect(result.stack).toBe(true);
  });
});

describe('render - column theme', () => {
  beforeEach(() => {
    chartOptions.length = 0;
  });
  it('applies interval, axis, legend and label styles', () => {
    Column(options).render({
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
      encode: { shape: 'hollow' },
      style: { lineWidth: 4 },
      axis: {
        x: { labelFill: '#475569' },
        y: { labelFill: '#475569' },
      },
      legend: { color: { itemLabelFill: '#334155' } },
      labels: [expect.objectContaining({ fontSize: 16 })],
    });
  });

  it('keeps value labels enabled by default', () => {
    Column(options).render({ data: [{ category: 'A', value: 120 }] });

    expect(chartOptions.at(-1).labels).toEqual([
      expect.objectContaining({ text: 'value', fill: '#FFFFFF' }),
    ]);
  });

  it('lets chart config disable labels even with label styles', () => {
    Column(options).render({
      data: [{ category: 'A', value: 120 }],
      label: false,
      style: { label: { fill: '#b42318' } },
    });

    expect(chartOptions.at(-1).labels).toEqual([]);
  });

  it('keeps a mark background mapped to viewStyle.viewFill', () => {
    const chart = Column({ container: {} as HTMLElement, width: 600, height: 400 });

    chart.render({
      data: [{ category: 'Jan', value: 28 }],
      theme: {
        version: '1',
        id: 'background',
        label: 'Background',
        style: { backgroundColor: '#fff4df' },
      },
    });

    expect(chartOptions.at(-1)).toMatchObject({
      type: 'interval',
      viewStyle: { viewFill: '#fff4df' },
    });
  });
});
