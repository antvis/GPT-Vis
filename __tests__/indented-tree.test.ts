import { describe, expect, it } from 'vitest';
import { parse } from '../src/syntax/parser';

describe('parse - indented-tree', () => {
  it('should parse root-only tree (no children)', () => {
    const result = parse(`
vis indented-tree
data
  name Root Node
    `);

    expect(result.type).toBe('indented-tree');
    expect((result.data as any).name).toBe('Root Node');
    expect((result.data as any).children).toBeUndefined();
  });

  it('should parse tree with one level of children', () => {
    const result = parse(`
vis indented-tree
data
  name 人工智能
  children
    - name 机器学习
    - name 深度学习
    `);

    expect(result.type).toBe('indented-tree');
    expect((result.data as any).name).toBe('人工智能');
    expect((result.data as any).children).toHaveLength(2);
    expect((result.data as any).children[0].name).toBe('机器学习');
    expect((result.data as any).children[1].name).toBe('深度学习');
  });

  it('should parse multi-level hierarchy', () => {
    const result = parse(`
vis indented-tree
data
  name my-project
  children
    - name src
      children
        - name components
        - name pages
    - name package.json
    `);

    expect(result.type).toBe('indented-tree');
    const data = result.data as any;
    expect(data.name).toBe('my-project');
    expect(data.children).toHaveLength(2);
    expect(data.children[0].name).toBe('src');
    expect(data.children[0].children).toHaveLength(2);
    expect(data.children[0].children[0].name).toBe('components');
    expect(data.children[0].children[1].name).toBe('pages');
    expect(data.children[1].name).toBe('package.json');
  });

  it('should parse nested list when bullets share indent with the children keyword', () => {
    const result = parse(`
vis indented-tree
data
  name root
  children
    - name parent
      children
      - name a
      - name b
    - name other
    `);
    const data = result.data as any;
    expect(data.children[0].name).toBe('parent');
    expect(data.children[0].children.map((c: any) => c.name)).toEqual(['a', 'b']);
    expect(data.children[1].name).toBe('other');
  });

  it('should parse site example with three siblings under src (no collapsed branch)', () => {
    const code =
      'vis indented-tree\ndata\n  name my-project\n  children\n    - name src\n      children\n        - name components\n        - name pages\n        - name utils\n    - name public\n    - name package.json\ntitle 项目目录结构';
    const result = parse(code);
    const data = result.data as any;
    expect(data.children[0].children).toHaveLength(3);
    expect(data.children[0].children.map((c: any) => c.name)).toEqual([
      'components',
      'pages',
      'utils',
    ]);
    expect(data.children.map((c: any) => c.name)).toEqual(['src', 'public', 'package.json']);
  });

  it('should keep sibling bullets when the second line is slightly deeper than the first', () => {
    const result = parse(`
vis indented-tree
data
  name root
  children
    - name a
          - name b
          - name c
    `);
    const data = result.data as any;
    expect(data.children).toHaveLength(3);
    expect(data.children.map((c: any) => c.name)).toEqual(['a', 'b', 'c']);
  });

  it('should parse company hierarchy tree', () => {
    const result = parse(`
vis indented-tree
data
  name 公司
  children
    - name 技术部
      children
        - name 前端组
        - name 后端组
    - name 产品部
    `);

    const data = result.data as any;
    expect(data.name).toBe('公司');
    expect(data.children[0].name).toBe('技术部');
    expect(data.children[0].children).toHaveLength(2);
    expect(data.children[1].name).toBe('产品部');
  });

  it('should parse AI knowledge tree', () => {
    const result = parse(`
vis indented-tree
data
  name 人工智能
  children
    - name 机器学习
      children
        - name 监督学习
        - name 无监督学习
        - name 强化学习
    - name 深度学习
      children
        - name 卷积神经网络
        - name 循环神经网络
    `);

    const data = result.data as any;
    expect(data.name).toBe('人工智能');
    expect(data.children[0].children).toHaveLength(3);
    expect(data.children[0].children[2].name).toBe('强化学习');
    expect(data.children[1].children).toHaveLength(2);
  });

  it('should parse with direction option', () => {
    const result = parse(`
vis indented-tree
data
  name Root
  children
    - name Child A
    - name Child B
direction H
    `);

    expect(result.type).toBe('indented-tree');
    expect(result.direction).toBe('H');
    const data = result.data as any;
    expect(data.children).toHaveLength(2);
  });

  it('should parse with title', () => {
    const result = parse(`
vis indented-tree
data
  name 根节点
  children
    - name 子节点1
    - name 子节点2
title 目录结构图
    `);

    expect(result.title).toBe('目录结构图');
    expect((result.data as any).name).toBe('根节点');
  });

  it('should parse with theme', () => {
    const result = parse(`
vis indented-tree
data
  name Root
  children
    - name Child
theme dark
    `);

    expect(result.theme).toBe('dark');
  });

  it('should parse with style options', () => {
    const result = parse(`
vis indented-tree
data
  name Root
  children
    - name Child 1
    - name Child 2
style
  palette #1783FF #F08F56 #D580FF
  backgroundColor #f5f5f5
    `);

    expect(result.style).toEqual({
      palette: ['#1783FF', '#F08F56', '#D580FF'],
      backgroundColor: '#f5f5f5',
    });
  });

  it('should treat tab-indented bullets like spaced bullets (same logical depth)', () => {
    const result = parse(`
vis indented-tree
data
  name root
  children
\t  - name a
\t  - name b
`);

    const data = result.data as any;
    expect(data.children).toHaveLength(2);
    expect(data.children[0].name).toBe('a');
    expect(data.children[1].name).toBe('b');
  });

  it('should parse site examples page.tsx code strings exactly (indented-tree)', () => {
    const ex1 =
      'vis indented-tree\ndata\n  name my-project\n  children\n    - name src\n      children\n        - name components\n        - name pages\n        - name utils\n    - name public\n    - name package.json\ntitle 项目目录结构';
    const ex2 =
      'vis indented-tree\ndata\n  name 人工智能\n  children\n    - name 机器学习\n      children\n        - name 监督学习\n        - name 无监督学习\n        - name 强化学习\n    - name 深度学习\n      children\n        - name 卷积神经网络\n        - name 循环神经网络\ntitle AI 知识体系';
    const ex3 =
      'vis indented-tree\ndata\n  name 公司\n  children\n    - name 技术部\n      children\n        - name 前端组\n        - name 后端组\n        - name 测试组\n    - name 产品部\n      children\n        - name 产品设计组\n        - name 用户研究组\ntitle 企业部门层级\ntheme academy';

    const d1 = parse(ex1).data as any;
    expect(d1.children[0].children.map((c: any) => c.name)).toEqual([
      'components',
      'pages',
      'utils',
    ]);
    expect(d1.children.map((c: any) => c.name)).toEqual(['src', 'public', 'package.json']);

    const d2 = parse(ex2).data as any;
    expect(d2.children[0].children.map((c: any) => c.name)).toEqual([
      '监督学习',
      '无监督学习',
      '强化学习',
    ]);
    expect(d2.children[1].children.map((c: any) => c.name)).toEqual([
      '卷积神经网络',
      '循环神经网络',
    ]);

    const r3 = parse(ex3);
    expect(r3.theme).toBe('academy');
    const d3 = r3.data as any;
    expect(d3.children[0].children.map((c: any) => c.name)).toEqual(['前端组', '后端组', '测试组']);
    expect(d3.children[1].children.map((c: any) => c.name)).toEqual(['产品设计组', '用户研究组']);
  });

  it('should parse deeply nested tree (3+ levels)', () => {
    const result = parse(`
vis indented-tree
data
  name L0
  children
    - name L1-A
      children
        - name L2-A1
          children
            - name L3-A1a
        - name L2-A2
    - name L1-B
    `);

    const data = result.data as any;
    expect(data.name).toBe('L0');
    expect(data.children[0].name).toBe('L1-A');
    expect(data.children[0].children[0].name).toBe('L2-A1');
    expect(data.children[0].children[0].children[0].name).toBe('L3-A1a');
    expect(data.children[0].children[1].name).toBe('L2-A2');
    expect(data.children[1].name).toBe('L1-B');
  });
});
