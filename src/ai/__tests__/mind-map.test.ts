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

  it('should parse mind-map chart with nested structure', () => {
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

  it('should parse mind-map chart with multiple nodes', () => {
    const result = parse(`
vis mind-map
data
  - name 台风形成的因素
  - name 气象条件
  - name 温暖的海水
  - name 气压分布
  - name 地理环境
  - name 大陆架的形状与深度
    `);

    expect(result.type).toBe('mind-map');
    expect(result.data).toHaveLength(6);
  });
});
