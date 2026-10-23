import { beforeEach, describe, expect, it, vi } from 'vitest';
import { parse } from '../src/syntax/parser';
import { Radar } from '../src/vis/radar';
import { chartOptions } from './helpers/renderers';

vi.mock('@antv/g2', async () => ({ Chart: (await import('./helpers/renderers')).MockChart }));

const options = { container: {} as HTMLElement, width: 600, height: 400 };

describe('parse - radar chart', () => {
  it('should parse basic radar chart', () => {
    const result = parse(`
vis radar
data
  - name 沟通能力
    value 2
  - name 协作能力
    value 3
  - name 领导能力
    value 2
  - name 学习能力
    value 5
  - name 创新能力
    value 6
  - name 技术能力
    value 9
    `);

    expect(result.type).toBe('radar');
    expect(result.data).toEqual([
      { name: '沟通能力', value: 2 },
      { name: '协作能力', value: 3 },
      { name: '领导能力', value: 2 },
      { name: '学习能力', value: 5 },
      { name: '创新能力', value: 6 },
      { name: '技术能力', value: 9 },
    ]);
  });

  it('should parse grouped radar chart', () => {
    const result = parse(`
vis radar
data
  - name 语文
    value 95
    group 一班
  - name 数学
    value 96
    group 一班
  - name 外语
    value 85
    group 一班
  - name 语文
    value 75
    group 二班
  - name 数学
    value 93
    group 二班
  - name 外语
    value 66
    group 二班
    `);

    expect(result.type).toBe('radar');
    expect(result.data).toEqual([
      { name: '语文', value: 95, group: '一班' },
      { name: '数学', value: 96, group: '一班' },
      { name: '外语', value: 85, group: '一班' },
      { name: '语文', value: 75, group: '二班' },
      { name: '数学', value: 93, group: '二班' },
      { name: '外语', value: 66, group: '二班' },
    ]);
  });

  it('should parse radar chart with align true', () => {
    const result = parse(`
vis radar
align true
data
  - name 睡眠质量
    value 80
    group 甲
  - name 运动频率
    value 30
    group 甲
  - name 睡眠质量
    value 60
    group 乙
  - name 运动频率
    value 90
    group 乙
    `);

    expect(result.type).toBe('radar');
    expect(result.align).toBe(true);
    expect(result.data).toEqual([
      { name: '睡眠质量', value: 80, group: '甲' },
      { name: '运动频率', value: 30, group: '甲' },
      { name: '睡眠质量', value: 60, group: '乙' },
      { name: '运动频率', value: 90, group: '乙' },
    ]);
  });

  it('should parse radar chart with title and theme', () => {
    const result = parse(`
vis radar
data
  - name Vitamin C
    value 7
  - name Fiber
    value 6
  - name Sugar
    value 5
title 营养成分分析
theme academy
    `);

    expect(result.title).toBe('营养成分分析');
    expect(result.theme).toBe('academy');
  });
});

describe('render - radar theme', () => {
  beforeEach(() => {
    chartOptions.length = 0;
  });
  it('applies line, axis and legend styles', () => {
    Radar(options).render({
      data: [
        { name: 'A', value: 1, group: 'One' },
        { name: 'B', value: 2, group: 'One' },
        { name: 'A', value: 2, group: 'Two' },
        { name: 'B', value: 3, group: 'Two' },
      ],
      style: {
        axis: { labelFill: '#475569' },
        legend: { itemLabelFill: '#334155' },
        mark: { line: { shape: 'hv', lineWidth: 5 } },
      },
    });

    expect(chartOptions.at(-1)).toMatchObject({
      encode: { shape: 'hv' },
      style: { lineWidth: 5 },
      axis: { position: { labelFill: '#475569' } },
      legend: { color: { itemLabelFill: '#334155' } },
    });
  });
});
