import { describe, expect, it } from 'vitest';
import { parse } from '../src/syntax/parser';

describe('parse - organization-chart', () => {
  it('should parse basic organization chart with root node only', () => {
    const result = parse(`
vis organization-chart
data
  name Eric Joplin
  description Chief Executive Officer
    `);

    expect(result.type).toBe('organization-chart');
    expect(result.data).toEqual({
      name: 'Eric Joplin',
      description: 'Chief Executive Officer',
    });
  });

  it('should parse organization chart with one level of children', () => {
    const result = parse(`
vis organization-chart
data
  name Eric Joplin
  description Chief Executive Officer
  children
    - name Linda Newland
      description Chief Executive Assistant
    `);

    expect(result.type).toBe('organization-chart');
    expect((result.data as any).name).toBe('Eric Joplin');
    expect((result.data as any).description).toBe('Chief Executive Officer');
    expect((result.data as any).children).toEqual([
      { name: 'Linda Newland', description: 'Chief Executive Assistant' },
    ]);
  });

  it('should parse organization chart with multi-level hierarchy', () => {
    const result = parse(`
vis organization-chart
data
  name Alice Johnson
  description Chief Technology Officer
  children
    - name Bob Smith
      description Senior Software Engineer
      children
        - name Charlie Brown
          description Software Engineer
        - name Diana White
          description Software Engineer
    - name Eve Black
      description IT Support Department Head
      children
        - name Frank Green
          description IT Support Specialist
        - name Grace Blue
          description IT Support Specialist
    `);

    expect(result.type).toBe('organization-chart');

    const data = result.data as any;
    expect(data.name).toBe('Alice Johnson');
    expect(data.description).toBe('Chief Technology Officer');
    expect(data.children).toHaveLength(2);

    const bob = data.children[0];
    expect(bob.name).toBe('Bob Smith');
    expect(bob.description).toBe('Senior Software Engineer');
    expect(bob.children).toHaveLength(2);
    expect(bob.children[0]).toEqual({ name: 'Charlie Brown', description: 'Software Engineer' });
    expect(bob.children[1]).toEqual({ name: 'Diana White', description: 'Software Engineer' });

    const eve = data.children[1];
    expect(eve.name).toBe('Eve Black');
    expect(eve.description).toBe('IT Support Department Head');
    expect(eve.children).toHaveLength(2);
    expect(eve.children[0]).toEqual({ name: 'Frank Green', description: 'IT Support Specialist' });
    expect(eve.children[1]).toEqual({ name: 'Grace Blue', description: 'IT Support Specialist' });
  });

  it('should parse organization chart without description fields', () => {
    const result = parse(`
vis organization-chart
data
  name CEO
  children
    - name CTO
    - name CFO
    - name COO
    `);

    expect(result.type).toBe('organization-chart');
    const data = result.data as any;
    expect(data.name).toBe('CEO');
    expect(data.description).toBeUndefined();
    expect(data.children).toEqual([{ name: 'CTO' }, { name: 'CFO' }, { name: 'COO' }]);
  });

  it('should parse organization chart with title and theme', () => {
    const result = parse(`
vis organization-chart
data
  name 张三
  description CEO
  children
    - name 李四
      description CTO
title 公司组织架构
theme academy
    `);

    expect(result.type).toBe('organization-chart');
    expect(result.title).toBe('公司组织架构');
    expect(result.theme).toBe('academy');
    expect((result.data as any).name).toBe('张三');
    expect((result.data as any).description).toBe('CEO');
    expect((result.data as any).children).toEqual([{ name: '李四', description: 'CTO' }]);
  });

  it('should parse organization chart with Chinese names and descriptions', () => {
    const result = parse(`
vis organization-chart
data
  name 王总
  description 首席执行官
  children
    - name 技术部
      description 负责人：李工
      children
        - name 前端组
          description 组长：小张
        - name 后端组
          description 组长：小李
    - name 产品部
      description 负责人：赵总监
    `);

    const data = result.data as any;
    expect(data.name).toBe('王总');
    expect(data.description).toBe('首席执行官');
    expect(data.children).toHaveLength(2);

    const tech = data.children[0];
    expect(tech.name).toBe('技术部');
    expect(tech.children).toHaveLength(2);
    expect(tech.children[0].name).toBe('前端组');
    expect(tech.children[1].name).toBe('后端组');

    const product = data.children[1];
    expect(product.name).toBe('产品部');
    expect(product.description).toBe('负责人：赵总监');
  });

  it('should parse organization chart with three levels of nesting', () => {
    const result = parse(`
vis organization-chart
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

  it('should parse organization chart with style options', () => {
    const result = parse(`
vis organization-chart
data
  name CEO
  children
    - name CTO
    - name CFO
style
  backgroundColor #f0f0f0
  palette #1783FF #F08F56 #D580FF
    `);

    expect(result.style).toEqual({
      backgroundColor: '#f0f0f0',
      palette: ['#1783FF', '#F08F56', '#D580FF'],
    });
  });

  it('should handle extra whitespace in organization chart syntax', () => {
    const result = parse(`
vis   organization-chart
data
  name   Alice
  description   Chief Officer
  children
    -  name  Bob
       description  Engineer
    `);

    expect(result.type).toBe('organization-chart');
    const data = result.data as any;
    expect(data.name).toBe('Alice');
    expect(data.description).toBe('Chief Officer');
    expect(data.children[0].name).toBe('Bob');
    expect(data.children[0].description).toBe('Engineer');
  });
});
