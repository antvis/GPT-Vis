import { describe, expect, it } from 'vitest';
import { parse } from '../src/syntax/parser';

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
