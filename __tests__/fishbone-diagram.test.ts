import { describe, expect, it } from 'vitest';
import { parse } from '../src/syntax/parser';

describe('parse - fishbone-diagram', () => {
  it('should parse root node only', () => {
    const result = parse(`
vis fishbone-diagram
data
  name 问题根因
    `);

    expect(result.type).toBe('fishbone-diagram');
    expect((result.data as any).name).toBe('问题根因');
    expect((result.data as any).children).toBeUndefined();
  });

  it('should parse with one level of branches', () => {
    const result = parse(`
vis fishbone-diagram
data
  name 产品质量下降
  children
    - name 人员因素
    - name 设备因素
    - name 材料因素
    `);

    expect(result.type).toBe('fishbone-diagram');
    const data = result.data as any;
    expect(data.name).toBe('产品质量下降');
    expect(data.children).toHaveLength(3);
    expect(data.children[0]).toEqual({ name: '人员因素' });
    expect(data.children[1]).toEqual({ name: '设备因素' });
    expect(data.children[2]).toEqual({ name: '材料因素' });
  });

  it('should parse with two levels (branches and leaves)', () => {
    const result = parse(`
vis fishbone-diagram
data
  name 产品不良率上升
  children
    - name 人员因素
      children
        - name 新员工操作不熟练
        - name 质检标准执行不严
    - name 设备因素
      children
        - name 机器校准偏差
        - name 模具磨损
    `);

    const data = result.data as any;
    expect(data.name).toBe('产品不良率上升');
    expect(data.children).toHaveLength(2);

    const personnel = data.children[0];
    expect(personnel.name).toBe('人员因素');
    expect(personnel.children).toHaveLength(2);
    expect(personnel.children[0]).toEqual({ name: '新员工操作不熟练' });
    expect(personnel.children[1]).toEqual({ name: '质检标准执行不严' });

    const equipment = data.children[1];
    expect(equipment.name).toBe('设备因素');
    expect(equipment.children).toHaveLength(2);
    expect(equipment.children[0]).toEqual({ name: '机器校准偏差' });
    expect(equipment.children[1]).toEqual({ name: '模具磨损' });
  });

  it('should parse with three branches having different numbers of leaves', () => {
    const result = parse(`
vis fishbone-diagram
data
  name 网站响应缓慢
  children
    - name 前端因素
      children
        - name 资源未压缩
        - name 第三方脚本过多
    - name 后端因素
      children
        - name 数据库查询未优化
        - name API响应慢
    - name 网络因素
      children
        - name CDN配置不当
        - name 带宽不足
    `);

    const data = result.data as any;
    expect(data.name).toBe('网站响应缓慢');
    expect(data.children).toHaveLength(3);
    expect(data.children[0].children).toHaveLength(2);
    expect(data.children[1].children).toHaveLength(2);
    expect(data.children[2].children).toHaveLength(2);
    expect(data.children[2].children[0]).toEqual({ name: 'CDN配置不当' });
    expect(data.children[2].children[1]).toEqual({ name: '带宽不足' });
  });

  it('should parse with title', () => {
    const result = parse(`
vis fishbone-diagram
data
  name 问题根因
  children
    - name 人员因素
title 生产质量问题分析
    `);

    expect(result.type).toBe('fishbone-diagram');
    expect(result.title).toBe('生产质量问题分析');
    expect((result.data as any).name).toBe('问题根因');
  });

  it('should parse with academy theme', () => {
    const result = parse(`
vis fishbone-diagram
data
  name Root
  children
    - name Branch
theme academy
    `);

    expect(result.type).toBe('fishbone-diagram');
    expect(result.theme).toBe('academy');
  });

  it('should parse with default theme', () => {
    const result = parse(`
vis fishbone-diagram
data
  name Root
  children
    - name Branch
theme default
    `);

    expect(result.theme).toBe('default');
  });

  it('should parse with style texture rough', () => {
    const result = parse(`
vis fishbone-diagram
data
  name Root
  children
    - name Branch
style
  texture rough
    `);

    expect(result.style).toEqual({ texture: 'rough' });
  });

  it('should parse with style backgroundColor', () => {
    const result = parse(`
vis fishbone-diagram
data
  name Root
  children
    - name Branch
style
  backgroundColor #f5f5f5
    `);

    expect(result.style).toEqual({ backgroundColor: '#f5f5f5' });
  });

  it('should parse with all options combined', () => {
    const result = parse(`
vis fishbone-diagram
title 生产质量问题分析
data
  name 产品不良率上升
  children
    - name 人员因素
      children
        - name 新员工操作不熟练
        - name 质检标准执行不严
    - name 设备因素
      children
        - name 机器校准偏差
        - name 模具磨损
    - name 材料因素
      children
        - name 原料批次差异
theme academy
style
  texture rough
    `);

    expect(result.type).toBe('fishbone-diagram');
    expect(result.title).toBe('生产质量问题分析');
    expect(result.theme).toBe('academy');
    expect(result.style).toEqual({ texture: 'rough' });

    const data = result.data as any;
    expect(data.name).toBe('产品不良率上升');
    expect(data.children).toHaveLength(3);
    expect(data.children[0].name).toBe('人员因素');
    expect(data.children[0].children).toHaveLength(2);
    expect(data.children[1].name).toBe('设备因素');
    expect(data.children[1].children).toHaveLength(2);
    expect(data.children[2].name).toBe('材料因素');
    expect(data.children[2].children).toHaveLength(1);
    expect(data.children[2].children[0]).toEqual({ name: '原料批次差异' });
  });

  it('should parse branch with single leaf', () => {
    const result = parse(`
vis fishbone-diagram
data
  name 主问题
  children
    - name 唯一分支
      children
        - name 唯一原因
    `);

    const data = result.data as any;
    expect(data.children).toHaveLength(1);
    expect(data.children[0].children).toHaveLength(1);
    expect(data.children[0].children[0]).toEqual({ name: '唯一原因' });
  });

  it('should parse site example: 产品盈利未达到预期目标', () => {
    const code =
      'vis fishbone-diagram\ntitle 产品盈利未达到预期目标\ndata\n  name 产品盈利未达到预期目标\n  children\n    - name 问题描述与分析\n      children\n        - name 品牌销量分析\n        - name 市场容量评估\n        - name 品牌的市场份额分析\n        - name 总贡献毛利计算\n    - name 品牌定位策略\n      children\n        - name 外包装设计\n        - name 品牌名称选择\n        - name 销售价格定位\n        - name 产品规格定义\n    - name 分销渠道管理\n      children\n        - name 地区分布\n        - name 渠道选择\n        - name 客户类型分类\n        - name 销售人员覆盖范围\n    - name 市场知名度提升\n      children\n        - name 地区权重分析\n        - name 媒体组合策略\n        - name 广告投入预算\n        - name 品质意识提升\n    - name 试购买策略\n      children\n        - name 现场展示效果\n        - name 促销形式设计\n        - name 促销时机选择\n        - name 供货保证措施\n    - name 重复购买策略\n      children\n        - name 消费者档案管理\n        - name 使用场合分析\n        - name 使用次数统计\n        - name 产品原因退货处理';

    const result = parse(code);
    expect(result.type).toBe('fishbone-diagram');
    expect(result.title).toBe('产品盈利未达到预期目标');

    const data = result.data as any;
    expect(data.name).toBe('产品盈利未达到预期目标');
    expect(data.children).toHaveLength(6);
    expect(data.children.map((c: any) => c.name)).toEqual([
      '问题描述与分析',
      '品牌定位策略',
      '分销渠道管理',
      '市场知名度提升',
      '试购买策略',
      '重复购买策略',
    ]);
    expect(data.children[0].children.map((c: any) => c.name)).toEqual([
      '品牌销量分析',
      '市场容量评估',
      '品牌的市场份额分析',
      '总贡献毛利计算',
    ]);
    expect(data.children[5].children.map((c: any) => c.name)).toEqual([
      '消费者档案管理',
      '使用场合分析',
      '使用次数统计',
      '产品原因退货处理',
    ]);
  });

  it('should parse site example: 生产效率低', () => {
    const code =
      'vis fishbone-diagram\ntitle 生产效率低\ndata\n  name 生产效率低\n  children\n    - name 设备问题\n      children\n        - name 设备老化\n        - name 维护不及时\n    - name 员工问题\n      children\n        - name 技能不足\n        - name 工作态度差\n    - name 流程问题\n      children\n        - name 流程繁琐\n        - name 缺乏标准化';

    const result = parse(code);
    expect(result.type).toBe('fishbone-diagram');
    expect(result.title).toBe('生产效率低');

    const data = result.data as any;
    expect(data.name).toBe('生产效率低');
    expect(data.children).toHaveLength(3);
    expect(data.children.map((c: any) => c.name)).toEqual(['设备问题', '员工问题', '流程问题']);
    expect(data.children[0].children.map((c: any) => c.name)).toEqual(['设备老化', '维护不及时']);
    expect(data.children[1].children.map((c: any) => c.name)).toEqual(['技能不足', '工作态度差']);
    expect(data.children[2].children.map((c: any) => c.name)).toEqual(['流程繁琐', '缺乏标准化']);
  });
});
