import { beforeEach, describe, expect, it, vi } from 'vitest';
import { parse } from '../../src/syntax/parser';
import { Histogram } from '../../src/vis/histogram';
import { chartOptions } from '../helpers/renderers';

vi.mock('@antv/g2', async () => ({ Chart: (await import('../helpers/renderers')).MockChart }));

const options = { container: {} as HTMLElement, width: 600, height: 400 };

describe('parse - histogram chart', () => {
  it('should parse basic histogram chart with flat number array', () => {
    const result = parse(`
vis histogram
data
  - 78
  - 88
  - 60
  - 100
  - 95
binNumber 5
title 成绩分布
    `);

    expect(result.type).toBe('histogram');
    expect(result.data).toEqual([78, 88, 60, 100, 95]);
    expect(result.binNumber).toBe(5);
    expect(result.title).toBe('成绩分布');
  });

  it('should parse histogram chart with decimal values', () => {
    const result = parse(`
vis histogram
data
  - 1.2
  - 3.4
  - 3.7
  - 4.3
  - 5.2
  - 5.8
  - 6.1
axisXTitle 花瓣大小分布
axisYTitle 花瓣分布数量
    `);

    expect(result.data).toEqual([1.2, 3.4, 3.7, 4.3, 5.2, 5.8, 6.1]);
    expect(result.axisXTitle).toBe('花瓣大小分布');
    expect(result.axisYTitle).toBe('花瓣分布数量');
  });

  it('should parse histogram chart with theme', () => {
    const result = parse(`
vis histogram
data
  - 20
  - 25
  - 30
  - 35
theme academy
    `);

    expect(result.data).toEqual([20, 25, 30, 35]);
    expect(result.theme).toBe('academy');
  });

  it('should parse histogram chart with style', () => {
    const result = parse(`
vis histogram
data
  - 10
  - 20
  - 30
style
  backgroundColor #f5f5f5
  palette
    - #5B8FF9
    `);

    expect(result.data).toEqual([10, 20, 30]);
    expect(result.style).toEqual({
      backgroundColor: '#f5f5f5',
      palette: ['#5B8FF9'],
    });
  });
});

describe('render - histogram theme', () => {
  beforeEach(() => {
    chartOptions.length = 0;
  });
  it('applies interval and axis styles', () => {
    Histogram(options).render({
      data: [1, 2, 3],
      style: {
        axis: { gridStroke: '#7c3aed' },
        mark: { interval: { shape: 'hollow', lineWidth: 3 } },
      },
    });

    expect(chartOptions.at(-1)).toMatchObject({
      encode: { shape: 'hollow' },
      style: { lineWidth: 3 },
      axis: {
        x: { gridStroke: '#7c3aed' },
        y: { gridStroke: '#7c3aed' },
      },
    });
  });
});
