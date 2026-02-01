import { describe, expect, it } from 'vitest';
import { parse } from '../src/syntax/parser';

describe('parse - network-graph chart', () => {
  it('should parse basic network-graph with nodes', () => {
    const result = parse(`
vis network-graph
data
  - name 哈利·波特
  - name 赫敏·格兰杰
  - name 罗恩·韦斯莱
  - name 伏地魔
    `);

    expect(result.type).toBe('network-graph');
    expect(result.data).toEqual([
      { name: '哈利·波特' },
      { name: '赫敏·格兰杰' },
      { name: '罗恩·韦斯莱' },
      { name: '伏地魔' },
    ]);
  });

  it('should parse network-graph with edges', () => {
    const result = parse(`
vis network-graph
data
  - source 哈利·波特
    target 赫敏·格兰杰
    name 朋友
  - source 哈利·波特
    target 罗恩·韦斯莱
    name 朋友
  - source 哈利·波特
    target 伏地魔
    name 敌人
    `);

    expect(result.type).toBe('network-graph');
    expect(result.data).toEqual([
      { source: '哈利·波特', target: '赫敏·格兰杰', name: '朋友' },
      { source: '哈利·波特', target: '罗恩·韦斯莱', name: '朋友' },
      { source: '哈利·波特', target: '伏地魔', name: '敌人' },
    ]);
  });

  it('should parse network-graph with bidirectional edges', () => {
    const result = parse(`
vis network-graph
data
  - source 哈利·波特
    target 伏地魔
    name 敌人
  - source 伏地魔
    target 哈利·波特
    name 试图杀死
    `);

    expect(result.type).toBe('network-graph');
    expect(result.data).toEqual([
      { source: '哈利·波特', target: '伏地魔', name: '敌人' },
      { source: '伏地魔', target: '哈利·波特', name: '试图杀死' },
    ]);
  });
});
