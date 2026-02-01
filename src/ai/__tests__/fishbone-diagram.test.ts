import { describe, expect, it } from 'vitest';
import { parse } from '../parser';

describe('parse - fishbone-diagram chart', () => {
  it('should parse basic fishbone-diagram', () => {
    const result = parse(`
vis fishbone-diagram
data
  - name 产品销量下降
    `);

    expect(result.type).toBe('fishbone-diagram');
    expect(result.data).toEqual([{ name: '产品销量下降' }]);
  });

  it('should parse fishbone-diagram with categories', () => {
    const result = parse(`
vis fishbone-diagram
data
  - name 产品销量下降
  - name 市场推广
  - name 广告投入减少
  - name 促销活动不足
  - name 产品质量
  - name 产品缺陷
  - name 品质不稳定
    `);

    expect(result.type).toBe('fishbone-diagram');
    expect(result.data).toHaveLength(7);
  });

  it('should parse fishbone-diagram with production efficiency problem', () => {
    const result = parse(`
vis fishbone-diagram
data
  - name 生产效率低
  - name 设备问题
  - name 设备老化
  - name 维护不及时
  - name 员工问题
  - name 技能不足
  - name 工作态度差
    `);

    expect(result.type).toBe('fishbone-diagram');
    expect(result.data).toEqual([
      { name: '生产效率低' },
      { name: '设备问题' },
      { name: '设备老化' },
      { name: '维护不及时' },
      { name: '员工问题' },
      { name: '技能不足' },
      { name: '工作态度差' },
    ]);
  });
});
