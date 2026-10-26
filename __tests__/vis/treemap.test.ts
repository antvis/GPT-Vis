import { beforeEach, describe, expect, it, vi } from 'vitest';
import { parse } from '../../src/syntax/parser';
import { getBuiltInThemeValues } from '../../src/theme/shared';
import type { ThemeInput } from '../../src/types';
import { Treemap } from '../../src/vis/treemap';
import { chartOptions } from '../helpers/renderers';

vi.mock('@antv/g2', async () => ({ Chart: (await import('../helpers/renderers')).MockChart }));

const options = { container: {} as HTMLElement, width: 600, height: 400 };

describe('parse - treemap chart', () => {
  it('should parse basic treemap chart', () => {
    const result = parse(`
vis treemap
data
  - name 苹果
    value 800
  - name 橙子
    value 600
  - name 香蕉
    value 500
    `);

    expect(result.type).toBe('treemap');
    expect(result.data).toEqual([
      { name: '苹果', value: 800 },
      { name: '橙子', value: 600 },
      { name: '香蕉', value: 500 },
    ]);
  });

  it('should parse treemap chart with title', () => {
    const result = parse(`
vis treemap
data
  - name 产品A
    value 500
  - name 产品B
    value 400
title 产品销售情况
    `);

    expect(result.title).toBe('产品销售情况');
  });

  it('should parse treemap chart with nested children', () => {
    const result = parse(`
vis treemap
data
  - name A部门
    value 100
    children
      - name A1
        value 40
      - name A2
        value 30
      - name A3
        value 30
  - name B部门
    value 80
    children
      - name B1
        value 50
      - name B2
        value 30
    `);

    expect(result.type).toBe('treemap');
    expect(result.data).toEqual([
      {
        name: 'A部门',
        value: 100,
        children: [
          { name: 'A1', value: 40 },
          { name: 'A2', value: 30 },
          { name: 'A3', value: 30 },
        ],
      },
      {
        name: 'B部门',
        value: 80,
        children: [
          { name: 'B1', value: 50 },
          { name: 'B2', value: 30 },
        ],
      },
    ]);
  });

  it('should parse treemap chart with deeply nested children', () => {
    const result = parse(`
vis treemap
data
  - name 苹果
    value 800
    children
      - name 红富士
        value 400
      - name 黄元帅
        value 400
  - name 橙子
    value 600
  - name 香蕉
    value 500
    `);

    expect(result.type).toBe('treemap');
    expect(result.data).toEqual([
      {
        name: '苹果',
        value: 800,
        children: [
          { name: '红富士', value: 400 },
          { name: '黄元帅', value: 400 },
        ],
      },
      { name: '橙子', value: 600 },
      { name: '香蕉', value: 500 },
    ]);
  });

  it('should parse treemap chart with style', () => {
    const result = parse(`
vis treemap
data
  - name A
    value 100
style
  backgroundColor #f5f5f5
  palette
    - #5B8FF9
    - #61DDAA
    - #65789B
    `);

    expect(result.style).toEqual({
      backgroundColor: '#f5f5f5',
      palette: ['#5B8FF9', '#61DDAA', '#65789B'],
    });
  });
});

describe('render - treemap theme', () => {
  beforeEach(() => {
    chartOptions.length = 0;
  });
  it('applies chart-specific mark styles', () => {
    Treemap(options).render({
      data: [{ name: 'A', value: 10 }],
      theme: {
        version: '1',
        id: 'treemap-test',
        label: 'Treemap test',
        charts: {
          treemap: {
            style: { mark: { treemap: { radius: 8 } } },
          },
        },
      },
    });

    expect(chartOptions.at(-1)).toMatchObject({
      layout: { paddingInner: 2 },
      style: { radius: 8 },
    });
  });

  it('applies theme text colors to internal labels', () => {
    const theme: ThemeInput = {
      version: '1',
      id: 'composite-text',
      label: 'Composite text',
      baseTheme: 'dark',
      tokens: { colorText: '#facc15' },
    };

    Treemap(options).render({ data: [{ name: 'A', value: 10 }], theme });

    expect(chartOptions.at(-1).style.labelFill).toBe('#facc15');
  });

  it.each(['default', 'dark'] as const)('uses %s built-in colors for internal text', (theme) => {
    Treemap(options).render({ data: [{ name: 'A', value: 10 }], theme });
    expect(chartOptions.at(-1).style.labelFill).toBe(getBuiltInThemeValues(theme).textPrimary);
  });
});
