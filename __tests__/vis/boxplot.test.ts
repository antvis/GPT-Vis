import { beforeEach, describe, expect, it, vi } from 'vitest';
import { parse } from '../../src/syntax/parser';
import { Boxplot } from '../../src/vis/boxplot';
import { chartOptions } from '../helpers/renderers';

vi.mock('@antv/g2', async () => ({ Chart: (await import('../helpers/renderers')).MockChart }));

const options = { container: {} as HTMLElement, width: 600, height: 400 };

describe('Boxplot component - group field style', () => {
  beforeEach(() => {
    chartOptions.length = 0;
  });

  it('should set point to false in style when data has group field', () => {
    const boxplot = Boxplot({
      container: {} as any,
      width: 600,
      height: 400,
    });

    boxplot.render({
      type: 'boxplot',
      data: [
        { category: 'Adelie', group: 'MALE', value: 181 },
        { category: 'Adelie', group: 'FEMALE', value: 186 },
        { category: 'Chinstrap', group: 'MALE', value: 190 },
        { category: 'Chinstrap', group: 'FEMALE', value: 181 },
      ],
      title: '帕尔默企鹅身高性别差异',
    });

    boxplot.destroy();

    const lastOptions = chartOptions[chartOptions.length - 1];
    expect(lastOptions.style).toEqual({ stroke: 'black', point: false });
  });

  it('should NOT set point in style when data has no group field', () => {
    const boxplot = Boxplot({
      container: {} as any,
      width: 600,
      height: 400,
    });

    boxplot.render({
      type: 'boxplot',
      data: [
        { category: '班级A', value: 15 },
        { category: '班级A', value: 18 },
        { category: '班级B', value: 10 },
        { category: '班级B', value: 14 },
      ],
      title: '成绩分布',
    });

    boxplot.destroy();

    const lastOptions = chartOptions[chartOptions.length - 1];
    expect(lastOptions.style).toEqual({ stroke: 'black' });
    expect(lastOptions.style).not.toHaveProperty('point');
  });

  it('should set legend position to top when data has group field', () => {
    const boxplot = Boxplot({
      container: {} as any,
      width: 600,
      height: 400,
    });

    boxplot.render({
      type: 'boxplot',
      data: [
        { category: 'A', group: 'G1', value: 10 },
        { category: 'A', group: 'G2', value: 20 },
      ],
    });

    boxplot.destroy();

    const lastOptions = chartOptions[chartOptions.length - 1];
    expect(lastOptions.legend).toEqual({ color: { position: 'top' } });
  });

  it('should disable legend when data has no group field', () => {
    const boxplot = Boxplot({
      container: {} as any,
      width: 600,
      height: 400,
    });

    boxplot.render({
      type: 'boxplot',
      data: [
        { category: 'A', value: 10 },
        { category: 'B', value: 20 },
      ],
    });

    boxplot.destroy();

    const lastOptions = chartOptions[chartOptions.length - 1];
    expect(lastOptions.legend).toEqual({ color: false });
  });

  it('should use group as color and series encode when data has group field', () => {
    const boxplot = Boxplot({
      container: {} as any,
      width: 600,
      height: 400,
    });

    boxplot.render({
      type: 'boxplot',
      data: [
        { category: 'A', group: 'G1', value: 10 },
        { category: 'A', group: 'G2', value: 20 },
      ],
    });

    boxplot.destroy();

    const lastOptions = chartOptions[chartOptions.length - 1];
    expect(lastOptions.encode).toEqual({
      x: 'category',
      y: 'value',
      color: 'group',
      series: 'group',
    });
  });
});

describe('parse - boxplot chart', () => {
  it('should parse basic boxplot chart', () => {
    const result = parse(`
vis boxplot
data
  - category 班级A
    value 15
  - category 班级A
    value 18
  - category 班级A
    value 22
  - category 班级A
    value 27
  - category 班级A
    value 35
  - category 班级B
    value 10
  - category 班级B
    value 14
  - category 班级B
    value 19
  - category 班级B
    value 23
  - category 班级B
    value 30
title 成绩分布
    `);

    expect(result.type).toBe('boxplot');
    expect(result.title).toBe('成绩分布');
    expect(result.data).toEqual([
      { category: '班级A', value: 15 },
      { category: '班级A', value: 18 },
      { category: '班级A', value: 22 },
      { category: '班级A', value: 27 },
      { category: '班级A', value: 35 },
      { category: '班级B', value: 10 },
      { category: '班级B', value: 14 },
      { category: '班级B', value: 19 },
      { category: '班级B', value: 23 },
      { category: '班级B', value: 30 },
    ]);
  });

  it('should parse boxplot chart with theme', () => {
    const result = parse(`
vis boxplot
data
  - category 实验组1
    value 12
  - category 实验组1
    value 15
  - category 实验组1
    value 20
  - category 实验组2
    value 18
  - category 实验组2
    value 22
  - category 实验组2
    value 28
title 实验数据分布
theme dark
    `);

    expect(result.type).toBe('boxplot');
    expect(result.theme).toBe('dark');
    expect(result.title).toBe('实验数据分布');
  });

  it('should parse boxplot chart with group field', () => {
    const result = parse(`
vis boxplot
data
  - category Adelie
    group MALE
    value 181
  - category Adelie
    group FEMALE
    value 186
  - category Adelie
    group MALE
    value 190
  - category Adelie
    group FEMALE
    value 181
title 帕尔默企鹅身高性别差异
    `);

    expect(result.type).toBe('boxplot');
    expect(result.data).toEqual([
      { category: 'Adelie', group: 'MALE', value: 181 },
      { category: 'Adelie', group: 'FEMALE', value: 186 },
      { category: 'Adelie', group: 'MALE', value: 190 },
      { category: 'Adelie', group: 'FEMALE', value: 181 },
    ]);
  });
});

describe('render - boxplot theme', () => {
  beforeEach(() => {
    chartOptions.length = 0;
  });
  it('maps boxplot component and composite mark styles', () => {
    Boxplot(options).render({
      data: [{ category: 'A', value: 10 }],
      style: {
        axis: { labelFill: '#475569' },
        legend: { itemLabelFill: '#334155' },
        mark: {
          box: { stroke: '#dc2626', lineWidth: 3 },
          point: { stroke: '#f59e0b' },
        },
      },
    });

    expect(chartOptions.at(-1)).toMatchObject({
      axis: {
        x: { labelFill: '#475569' },
        y: { labelFill: '#475569' },
      },
      style: {
        boxStroke: '#dc2626',
        boxLineWidth: 3,
        pointStroke: '#f59e0b',
      },
    });
  });
});
