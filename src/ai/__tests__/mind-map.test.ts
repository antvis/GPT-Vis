import { describe, expect, it } from 'vitest';
import { parse } from '../parser';

describe('parse - mind-map chart', () => {
  it('should parse basic mind-map chart', () => {
    const result = parse(`
vis mind-map
data
  - name 项目计划
    `);

    expect(result.type).toBe('mind-map');
    expect(result.data).toEqual([{ name: '项目计划' }]);
  });

  it('should parse mind-map chart with flat nodes', () => {
    const result = parse(`
vis mind-map
data
  - name 人工智能应用
  - name 智能家居
  - name 自动驾驶
  - name 医疗保健
    `);

    expect(result.type).toBe('mind-map');
    expect(result.data).toEqual([
      { name: '人工智能应用' },
      { name: '智能家居' },
      { name: '自动驾驶' },
      { name: '医疗保健' },
    ]);
  });

  it('should parse mind-map chart with nested children', () => {
    const result = parse(`
vis mind-map
data
  - name 项目计划
    children
      - name 研究阶段
        children
          - name 市场调研
          - name 技术可行性分析
      - name 设计阶段
        children
          - name 产品功能确定
          - name UI设计
      - name 开发阶段
        children
          - name 编写代码
          - name 单元测试
    `);

    expect(result.type).toBe('mind-map');
    expect(result.data).toEqual([
      {
        name: '项目计划',
        children: [
          {
            name: '研究阶段',
            children: [{ name: '市场调研' }, { name: '技术可行性分析' }],
          },
          {
            name: '设计阶段',
            children: [{ name: '产品功能确定' }, { name: 'UI设计' }],
          },
          {
            name: '开发阶段',
            children: [{ name: '编写代码' }, { name: '单元测试' }],
          },
        ],
      },
    ]);
  });

  it('should parse mind-map chart with deeply nested children', () => {
    const result = parse(`
vis mind-map
data
  - name 人工智能应用
    children
      - name 智能家居
      - name 自动驾驶
      - name 医疗保健
        children
          - name 精准医疗
          - name 诊断辅助
      - name 金融服务
    `);

    expect(result.type).toBe('mind-map');
    expect(result.data).toEqual([
      {
        name: '人工智能应用',
        children: [
          { name: '智能家居' },
          { name: '自动驾驶' },
          {
            name: '医疗保健',
            children: [{ name: '精准医疗' }, { name: '诊断辅助' }],
          },
          { name: '金融服务' },
        ],
      },
    ]);
  });
});
