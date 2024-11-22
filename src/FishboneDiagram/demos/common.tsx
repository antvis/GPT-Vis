import { FishboneDiagram } from '@antv/gpt-vis';
import React from 'react';

const data = {
  name: '产品盈利未达到预期目标',
  children: [
    {
      name: '问题描述与分析',
      children: [
        { name: '品牌销量分析' },
        { name: '市场容量评估' },
        { name: '品牌的市场份额分析' },
        { name: '总贡献毛利计算' },
      ],
    },
    {
      name: '品牌定位策略',
      children: [
        { name: '外包装设计' },
        { name: '品牌名称选择' },
        { name: '销售价格定位' },
        { name: '产品规格定义' },
      ],
    },
    {
      name: '分销渠道管理',
      children: [
        { name: '地区分布' },
        { name: '渠道选择' },
        { name: '客户类型分类' },
        { name: '销售人员覆盖范围' },
      ],
    },
    {
      name: '市场知名度提升',
      children: [
        { name: '地区权重分析' },
        { name: '媒体组合策略' },
        { name: '广告投入预算' },
        { name: '品质意识提升' },
      ],
    },
    {
      name: '试购买策略',
      children: [
        { name: '现场展示效果' },
        { name: '促销形式设计' },
        { name: '促销时机选择' },
        { name: '供货保证措施' },
      ],
    },
    {
      name: '重复购买策略',
      children: [
        { name: '消费者档案管理' },
        { name: '使用场合分析' },
        { name: '使用次数统计' },
        { name: '产品原因退货处理' },
      ],
    },
  ],
};

export default () => <FishboneDiagram data={data} />;
