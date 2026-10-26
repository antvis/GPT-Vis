import type * as G6Module from '@antv/g6';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { parse } from '../../src/syntax/parser';
import { getBuiltInThemeValues } from '../../src/theme/shared';
import { NetworkGraph } from '../../src/vis/network-graph';
import { createContainer, graphOptions } from '../helpers/renderers';

vi.mock('@antv/g6', async (importOriginal) => ({
  ...(await importOriginal<typeof G6Module>()),
  Graph: (await import('../helpers/renderers')).MockGraph,
}));

describe('parse - network-graph', () => {
  it('should parse basic network graph with nested nodes and edges in data', () => {
    const result = parse(`
vis network-graph
data
  nodes
    - name 哈利·波特
    - name 赫敏·格兰杰
    - name 罗恩·韦斯莱
    - name 伏地魔
  edges
    - source 哈利·波特
      target 赫敏·格兰杰
      name 朋友
    - source 哈利·波特
      target 罗恩·韦斯莱
      name 朋友
    - source 哈利·波特
      target 伏地魔
      name 敌人
    - source 伏地魔
      target 哈利·波特
      name 试图杀死
    `);

    expect(result.type).toBe('network-graph');
    expect((result.data as any).nodes).toEqual([
      { name: '哈利·波特' },
      { name: '赫敏·格兰杰' },
      { name: '罗恩·韦斯莱' },
      { name: '伏地魔' },
    ]);
    expect((result.data as any).edges).toEqual([
      { source: '哈利·波特', target: '赫敏·格兰杰', name: '朋友' },
      { source: '哈利·波特', target: '罗恩·韦斯莱', name: '朋友' },
      { source: '哈利·波特', target: '伏地魔', name: '敌人' },
      { source: '伏地魔', target: '哈利·波特', name: '试图杀死' },
    ]);
  });

  it('should parse network graph with title and layout', () => {
    const result = parse(`
vis network-graph
data
  nodes
    - name 节点A
    - name 节点B
    - name 节点C
  edges
    - source 节点A
      target 节点B
      name 关系1
    - source 节点B
      target 节点C
      name 关系2
title 基本网络图
layout circular
    `);

    expect(result.type).toBe('network-graph');
    expect(result.title).toBe('基本网络图');
    expect(result.layout).toBe('circular');
    expect((result.data as any).nodes).toHaveLength(3);
    expect((result.data as any).edges).toHaveLength(2);
  });

  it('should parse network graph with theme', () => {
    const result = parse(`
vis network-graph
data
  nodes
    - name X
    - name Y
  edges
    - source X
      target Y
      name 连接
layout force
theme dark
    `);

    expect(result.theme).toBe('dark');
    expect(result.layout).toBe('force');
  });

  it('should parse network graph with custom style', () => {
    const result = parse(`
vis network-graph
data
  nodes
    - name A
    - name B
  edges
    - source A
      target B
      name 关联
style
  palette
    - #1783FF
    - #F08F56
    - #D580FF
  backgroundColor #f5f5f5
    `);

    expect(result.style).toEqual({
      palette: ['#1783FF', '#F08F56', '#D580FF'],
      backgroundColor: '#f5f5f5',
    });
  });
});

describe('render - network-graph theme', () => {
  beforeEach(() => {
    graphOptions.length = 0;
  });
  it('maps network graph element types and visual styles', () => {
    NetworkGraph({ container: createContainer() }).render({
      data: {
        nodes: [{ name: 'A' }, { name: 'B' }],
        edges: [{ source: 'A', target: 'B', name: 'Next' }],
      },
      style: {
        node: { type: 'diamond', fill: '#f59e0b', lineWidth: 4 },
        edge: { type: 'cubic', stroke: '#dc2626', lineWidth: 5 },
      },
    });

    const graph = graphOptions.at(-1);
    expect(graph.node.type).toBe('diamond');
    expect(graph.edge.type).toBe('cubic');
    expect(graph.data.nodes[0].style).toMatchObject({ fill: '#f59e0b', lineWidth: 4 });
    expect(graph.data.edges[0].style).toMatchObject({ stroke: '#dc2626', lineWidth: 5 });
  });

  it('keeps subtitle seed and local color overrides above the built-in fallback', () => {
    const graph = NetworkGraph({ container: createContainer() });
    const config = {
      data: { nodes: [{ name: 'A' }], edges: [] },
      title: 'Report',
      subtitle: 'Theme test',
      theme: {
        id: 'subtitle-test',
        label: 'Subtitle test',
        baseTheme: 'dark' as const,
        tokens: { colorTextSecondary: '#facc15' },
      },
    };
    graph.render(config);
    expect(graphOptions.at(-1).plugins[0].subtitleFill).toBe('#facc15');
    graph.render({ ...config, style: { title: { subtitleFill: '#dc2626' } } });
    expect(graphOptions.at(-1).plugins[0].subtitleFill).toBe('#dc2626');
  });

  it('applies dark title colors and reserves space for large text', () => {
    NetworkGraph({ container: createContainer() }).render({
      data: { nodes: [{ name: 'A' }], edges: [] },
      theme: 'dark',
      title: 'Report',
      subtitle: 'Theme test',
      style: { title: { titleFontSize: 40, subtitleFontSize: 20, spacing: 20 } },
    });

    const graph = graphOptions.at(-1);

    const plugin = graph.plugins.find((item: any) => item.type === 'title');

    expect(plugin.subtitleFill).toBe(getBuiltInThemeValues('dark').textSecondary);

    expect(graph.padding[0]).toBeGreaterThanOrEqual(plugin.size + 16);
  });
});
