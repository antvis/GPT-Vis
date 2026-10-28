import type * as G6Module from '@antv/g6';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { parse } from '../../src/syntax/parser';
import { getChartVisualTokens } from '../../src/util/tokens';
import { Mindmap } from '../../src/vis/mindmap';
import { createContainer, graphOptions } from '../helpers/renderers';

vi.mock('@antv/g6', async (importOriginal) => ({
  ...(await importOriginal<typeof G6Module>()),
  Graph: (await import('../helpers/renderers')).MockGraph,
}));

describe('parse - mindmap', () => {
  it('should parse basic mindmap with root node only', () => {
    const result = parse(`
vis mindmap
data
  name Root
    `);

    expect(result.type).toBe('mindmap');
    expect(result.data).toEqual({ name: 'Root' });
  });

  it('should parse mindmap with one level of children', () => {
    const result = parse(`
vis mindmap
data
  name Modeling Methods
  children
    - name Classification
    - name Regression
    - name Clustering
    `);

    expect(result.type).toBe('mindmap');
    const data = result.data as any;
    expect(data.name).toBe('Modeling Methods');
    expect(data.children).toHaveLength(3);
    expect(data.children[0]).toEqual({ name: 'Classification' });
    expect(data.children[1]).toEqual({ name: 'Regression' });
    expect(data.children[2]).toEqual({ name: 'Clustering' });
  });

  it('should parse mindmap with multi-level hierarchy', () => {
    const result = parse(`
vis mindmap
data
  name Modeling Methods
  children
    - name Classification
      children
        - name Logistic regression
        - name Decision trees
        - name SVM
    - name Regression
      children
        - name Linear regression
        - name Polynomial regression
    `);

    const data = result.data as any;
    expect(data.name).toBe('Modeling Methods');
    expect(data.children).toHaveLength(2);

    const classification = data.children[0];
    expect(classification.name).toBe('Classification');
    expect(classification.children).toHaveLength(3);
    expect(classification.children[0]).toEqual({ name: 'Logistic regression' });
    expect(classification.children[1]).toEqual({ name: 'Decision trees' });
    expect(classification.children[2]).toEqual({ name: 'SVM' });

    const regression = data.children[1];
    expect(regression.name).toBe('Regression');
    expect(regression.children).toHaveLength(2);
  });

  it('should parse mindmap with three levels of nesting', () => {
    const result = parse(`
vis mindmap
data
  name Root
  children
    - name Level1A
      children
        - name Level2A
          children
            - name Level3A
            - name Level3B
        - name Level2B
    - name Level1B
    `);

    const data = result.data as any;
    expect(data.name).toBe('Root');
    expect(data.children[0].name).toBe('Level1A');
    expect(data.children[0].children[0].name).toBe('Level2A');
    expect(data.children[0].children[0].children[0].name).toBe('Level3A');
    expect(data.children[0].children[0].children[1].name).toBe('Level3B');
    expect(data.children[0].children[1].name).toBe('Level2B');
    expect(data.children[1].name).toBe('Level1B');
  });

  it('should parse mindmap with direction property', () => {
    const result = parse(`
vis mindmap
data
  name Root
  children
    - name A
    - name B
direction LR
    `);

    expect(result.type).toBe('mindmap');
    expect(result.direction).toBe('LR');
  });

  it('should parse mindmap with title and theme', () => {
    const result = parse(`
vis mindmap
data
  name 算法分类
  children
    - name 分类算法
    - name 回归算法
title 算法体系
theme academy
    `);

    expect(result.type).toBe('mindmap');
    expect(result.title).toBe('算法体系');
    expect(result.theme).toBe('academy');
    expect((result.data as any).name).toBe('算法分类');
  });

  it('should parse mindmap with style options', () => {
    const result = parse(`
vis mindmap
data
  name Root
  children
    - name A
    - name B
style
  backgroundColor #f0f0f0
  palette
    - #1783FF
    - #F08F56
    - #D580FF
    `);

    expect(result.style).toEqual({
      backgroundColor: '#f0f0f0',
      palette: ['#1783FF', '#F08F56', '#D580FF'],
    });
  });

  it('should parse mindmap with Chinese names', () => {
    const result = parse(`
vis mindmap
data
  name 前端技术栈
  children
    - name 框架
      children
        - name React
        - name Vue
        - name Angular
    - name 可视化
      children
        - name AntV
        - name D3
    `);

    const data = result.data as any;
    expect(data.name).toBe('前端技术栈');
    expect(data.children).toHaveLength(2);
    expect(data.children[0].name).toBe('框架');
    expect(data.children[0].children).toHaveLength(3);
    expect(data.children[1].name).toBe('可视化');
    expect(data.children[1].children).toHaveLength(2);
  });

  it('should parse mindmap with dark theme', () => {
    const result = parse(`
vis mindmap
data
  name Root
  children
    - name A
    - name B
theme dark
    `);

    expect(result.type).toBe('mindmap');
    expect(result.theme).toBe('dark');
    const data = result.data as any;
    expect(data.name).toBe('Root');
    expect(data.children).toHaveLength(2);
  });

  it('should parse mindmap with RL direction', () => {
    const result = parse(`
vis mindmap
data
  name Root
  children
    - name A
    - name B
direction RL
    `);

    expect(result.type).toBe('mindmap');
    expect(result.direction).toBe('RL');
  });

  it('should parse mindmap with all options combined', () => {
    const result = parse(`
vis mindmap
data
  name 项目计划
  children
    - name 研究阶段
      children
        - name 市场调研
        - name 技术分析
    - name 开发阶段
      children
        - name 编写代码
        - name 单元测试
title 项目计划
direction LR
theme academy
style
  backgroundColor #fafafa
  palette
    - #4e79a7
    - #f28e2c
    - #e15759
    `);

    expect(result.type).toBe('mindmap');
    expect(result.title).toBe('项目计划');
    expect(result.direction).toBe('LR');
    expect(result.theme).toBe('academy');
    expect(result.style).toEqual({
      backgroundColor: '#fafafa',
      palette: ['#4e79a7', '#f28e2c', '#e15759'],
    });

    const data = result.data as any;
    expect(data.name).toBe('项目计划');
    expect(data.children).toHaveLength(2);
    expect(data.children[0].children).toHaveLength(2);
    expect(data.children[1].children).toHaveLength(2);
  });

  it('should handle extra whitespace in mindmap syntax', () => {
    const result = parse(`
vis   mindmap
data
  name   Root Node
  children
    -  name  Child A
    -  name  Child B
    `);

    expect(result.type).toBe('mindmap');
    const data = result.data as any;
    expect(data.name).toBe('Root Node');
    expect(data.children[0].name).toBe('Child A');
    expect(data.children[1].name).toBe('Child B');
  });

  it('should parse mindmap with single child node', () => {
    const result = parse(`
vis mindmap
data
  name Root
  children
    - name Only Child
    `);

    const data = result.data as any;
    expect(data.name).toBe('Root');
    expect(data.children).toHaveLength(1);
    expect(data.children[0]).toEqual({ name: 'Only Child' });
  });

  it('should parse mindmap with many sibling nodes', () => {
    const result = parse(`
vis mindmap
data
  name Center
  children
    - name Branch1
    - name Branch2
    - name Branch3
    - name Branch4
    - name Branch5
    - name Branch6
    `);

    const data = result.data as any;
    expect(data.children).toHaveLength(6);
    expect(data.children.map((c: any) => c.name)).toEqual([
      'Branch1',
      'Branch2',
      'Branch3',
      'Branch4',
      'Branch5',
      'Branch6',
    ]);
  });
});

describe('render - mindmap theme', () => {
  beforeEach(() => {
    graphOptions.length = 0;
  });
  it('maps mindmap node and edge styles', () => {
    Mindmap({ container: createContainer() }).render({
      data: { name: 'Root', children: [{ name: 'Child' }] },
      style: {
        node: { fill: '#f59e0b', labelFill: '#111827' },
        edge: { stroke: '#dc2626', lineWidth: 5 },
      },
    });

    const graph = graphOptions.at(-1);
    const nodeStyle = graph.node.style.call(
      { getParentData: () => undefined },
      { id: 'Root', depth: 0, layoutSize: [120, 60], style: {} },
    );
    expect(nodeStyle).toMatchObject({ fill: '#f59e0b', labelFill: '#111827' });
    expect(graph.edge.style).toMatchObject({ stroke: '#dc2626', lineWidth: 5 });
  });

  it('applies dark title colors and reserves space for large text', () => {
    Mindmap({ container: createContainer() }).render({
      data: { name: 'Root' },
      theme: 'dark',
      title: 'Report',
      subtitle: 'Theme test',
      style: { title: { titleFontSize: 40, subtitleFontSize: 20, spacing: 20 } },
    });

    const graph = graphOptions.at(-1);

    const plugin = graph.plugins.find((item: any) => item.type === 'title');

    expect(plugin.subtitleFill).toBe(getChartVisualTokens('dark').textSecondary);

    expect(graph.padding[0]).toBeGreaterThanOrEqual(plugin.size + 16);
  });

  it('sizes nodes and layout from the themed label size', () => {
    const chart = Mindmap({ container: createContainer() });
    const data = { name: 'Root', children: [{ name: 'A branch' }] };
    chart.render({ data });
    const original = graphOptions.at(-1).data.nodes[1].layoutSize;
    chart.render({ data, style: { node: { labelFontSize: 40 } } });
    const graph = graphOptions.at(-1);
    const branch = graph.data.nodes[1];
    const nodeStyle = graph.node.style.call({ getParentData: () => undefined }, branch);
    expect(nodeStyle.labelFontSize).toBe(40);
    expect(nodeStyle.size[0]).toBeGreaterThan(original[0]);
    expect(nodeStyle.size[1]).toBeGreaterThan(40);
    expect([graph.layout.getWidth(branch), graph.layout.getHeight(branch)]).toEqual(nodeStyle.size);
  });
});
