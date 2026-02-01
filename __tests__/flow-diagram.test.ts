import { describe, expect, it } from 'vitest';
import { parse } from '../src/ai/parser';

describe('parse - flow-diagram chart', () => {
  it('should parse basic flow-diagram with nodes', () => {
    const result = parse(`
vis flow-diagram
data
  - name 访问注册页面
  - name 填写并提交注册表单
  - name 验证用户信息
  - name 创建新用户账户
    `);

    expect(result.type).toBe('flow-diagram');
    expect(result.data).toEqual([
      { name: '访问注册页面' },
      { name: '填写并提交注册表单' },
      { name: '验证用户信息' },
      { name: '创建新用户账户' },
    ]);
  });

  it('should parse flow-diagram with edges', () => {
    const result = parse(`
vis flow-diagram
data
  - source 客户下单
    target 系统生成订单
  - source 系统生成订单
    target 仓库拣货
  - source 仓库拣货
    target 仓库打包
    `);

    expect(result.type).toBe('flow-diagram');
    expect(result.data).toEqual([
      { source: '客户下单', target: '系统生成订单' },
      { source: '系统生成订单', target: '仓库拣货' },
      { source: '仓库拣货', target: '仓库打包' },
    ]);
  });

  it('should parse flow-diagram with named edges', () => {
    const result = parse(`
vis flow-diagram
data
  - source 验证用户信息
    target 创建新用户账户
    name 信息无误
  - source 验证用户信息
    target 提示修改错误信息
    name 信息有误
    `);

    expect(result.type).toBe('flow-diagram');
    expect(result.data).toEqual([
      { source: '验证用户信息', target: '创建新用户账户', name: '信息无误' },
      { source: '验证用户信息', target: '提示修改错误信息', name: '信息有误' },
    ]);
  });
});
