import { beforeEach, describe, expect, it, vi } from 'vitest';
import { parse } from '../src/syntax/parser';
import { Pie } from '../src/vis/pie';
import { chartOptions } from './helpers/renderers';

vi.mock('@antv/g2', async () => ({ Chart: (await import('./helpers/renderers')).MockChart }));

const options = { container: {} as HTMLElement, width: 600, height: 400 };

describe('parse - pie chart', () => {
  it('should parse basic pie chart', () => {
    const result = parse(`
vis pie
data
  - category 火锅
    value 22
  - category 自助餐
    value 12
  - category 川菜
    value 8
    `);

    expect(result.type).toBe('pie');
    expect(result.data).toEqual([
      { category: '火锅', value: 22 },
      { category: '自助餐', value: 12 },
      { category: '川菜', value: 8 },
    ]);
  });

  it('should parse pie chart with innerRadius (donut)', () => {
    const result = parse(`
vis pie
data
  - category 城镇人口
    value 63.89
  - category 乡村人口
    value 36.11
innerRadius 0.6
title 全国人口居住对比
    `);

    expect(result).toEqual({
      type: 'pie',
      data: [
        { category: '城镇人口', value: 63.89 },
        { category: '乡村人口', value: 36.11 },
      ],
      innerRadius: 0.6,
      title: '全国人口居住对比',
    });
  });

  it('should parse pie chart with theme and style', () => {
    const result = parse(`
vis pie
data
  - category 分类一
    value 27
  - category 分类二
    value 25
theme academy
style
  backgroundColor #333
  palette
    - #ff5a5f
    - #1fb6ff
    - #13ce66
    `);

    expect(result.theme).toBe('academy');
    expect(result.style).toEqual({
      backgroundColor: '#333',
      palette: ['#ff5a5f', '#1fb6ff', '#13ce66'],
    });
  });
});

describe('render - pie theme', () => {
  beforeEach(() => {
    chartOptions.length = 0;
  });
  it('maps pie layout, legend, label and interval styles', () => {
    Pie(options).render({
      data: [
        { category: 'A', value: 10 },
        { category: 'B', value: 20 },
      ],
      theme: {
        version: '1',
        id: 'pie-test',
        label: 'Pie test',
        charts: {
          pie: {
            style: {
              legend: { itemLabelFill: '#334155' },
              label: { fontSize: 16 },
              mark: { interval: { lineWidth: 4 } },
            },
          },
        },
      },
      innerRadius: 0.6,
    });

    expect(chartOptions.at(-1)).toMatchObject({
      coordinate: { innerRadius: 0.6 },
      legend: { color: { itemLabelFill: '#334155' } },
      labels: [expect.objectContaining({ fontSize: 16 })],
      style: { lineWidth: 4 },
    });
  });

  it('adjusts outside labels to the canvas before hiding collisions at compact sizes', () => {
    Pie({ ...options, width: 280, height: 240 }).render({
      data: [
        { category: 'Research and engineering', value: 20 },
        { category: 'Design', value: 80 },
      ],
      style: { label: { fontSize: 18 } },
    });
    const label = chartOptions.at(-1).labels[0];
    expect(label).toMatchObject({
      position: 'outside',
      fontSize: 18,
      transform: [{ type: 'exceedAdjust', offsetX: 4, offsetY: 4 }, { type: 'overlapHide' }],
    });
    expect(label.text({ category: 'Research and engineering', value: 20 })).toBe(
      'Research and engineering: 20%',
    );
  });
});
