import { describe, expect, it } from 'vitest';
import { parse } from '../src/syntax/parser';

describe('parse - flow-diagram chart', () => {
  it('should parse data with nodes and edges sub-sections', () => {
    const result = parse(`
vis flow-diagram
data
  nodes
    - name 开始
    - name 处理
    - name 结束
  edges
    - source 开始
      target 处理
    - source 处理
      target 结束
    `);

    expect(result.type).toBe('flow-diagram');
    expect(result.data).toEqual({
      nodes: [{ name: '开始' }, { name: '处理' }, { name: '结束' }],
      edges: [
        { source: '开始', target: '处理' },
        { source: '处理', target: '结束' },
      ],
    });
  });

  it('should parse flow-diagram with edge names', () => {
    const result = parse(`
vis flow-diagram
data
  nodes
    - name 用户注册
    - name 邮箱验证
    - name 注册成功
    - name 注册失败
  edges
    - source 用户注册
      target 邮箱验证
      name 提交信息
    - source 邮箱验证
      target 注册成功
      name 验证通过
    - source 邮箱验证
      target 注册失败
      name 验证失败
    `);

    expect(result.type).toBe('flow-diagram');
    expect(result.data).toEqual({
      nodes: [
        { name: '用户注册' },
        { name: '邮箱验证' },
        { name: '注册成功' },
        { name: '注册失败' },
      ],
      edges: [
        { source: '用户注册', target: '邮箱验证', name: '提交信息' },
        { source: '邮箱验证', target: '注册成功', name: '验证通过' },
        { source: '邮箱验证', target: '注册失败', name: '验证失败' },
      ],
    });
  });

  it('should parse flow-diagram with theme', () => {
    const result = parse(`
vis flow-diagram
data
  nodes
    - name 步骤A
    - name 步骤B
  edges
    - source 步骤A
      target 步骤B
theme dark
    `);

    expect(result.type).toBe('flow-diagram');
    expect(result.theme).toBe('dark');
  });

  it('should parse flow-diagram with custom style', () => {
    const result = parse(`
vis flow-diagram
data
  nodes
    - name 开始
    - name 结束
  edges
    - source 开始
      target 结束
style
  palette #5B8FF9 #61DDAA #65789B
  backgroundColor #1a1a2e
    `);

    expect(result.style).toEqual({
      palette: ['#5B8FF9', '#61DDAA', '#65789B'],
      backgroundColor: '#1a1a2e',
    });
  });
});
