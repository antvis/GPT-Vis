import { Filter } from 'lucide-react';

export const funnelChartData = {
  id: 'funnel-chart',
  name: 'Funnel Chart',
  icon: Filter,
  galleryExamples:
    'vis funnel\ndata\n  - category 浏览商品\n    value 100000\n  - category 加入购物车\n    value 45000\n  - category 提交订单\n    value 25000\n  - category 完成支付\n    value 18000\n  - category 确认收货\n    value 15000\ntitle 电商用户转化漏斗',
  description:
    '漏斗图是一种用于展示数据在多个阶段逐步流失或转化的图表。通常以漏斗形状表现各阶段的数据量，顶部宽底部窄，直观反映每个环节的数量变化和转化率。适合分析流程中的瓶颈和优化空间。',
  knowledge: {
    introduction:
      '漏斗图是一种用于展示数据在多个阶段逐步流失或转化的图表。通常以漏斗形状表现各阶段的数据量，顶部宽底部窄，直观反映每个环节的数量变化和转化率。适合分析流程中的瓶颈和优化空间。',
    useCases: [
      '用于展示销售流程、用户转化、活动参与等多阶段数据流失或转化情况',
      '适合突出各阶段的数量分布和转化效率',
    ],
    config: [
      {
        name: 'Configuration Options',
        config: [
          {
            property: 'type',
            type: 'required',
            description: '图表类型，必填，文本类型，值为 "funnel"。',
          },
          {
            property: 'data',
            type: 'required',
            description: '漏斗图数据，必填，数组类型，每项包含 category（名称）和 value（数值）。',
          },
          {
            property: 'data.category',
            type: 'required',
            description: '数据名称，必填，文本类型。',
          },
          {
            property: 'data.value',
            type: 'required',
            description: '数据数值，必填，数值类型。',
          },
          {
            property: 'title',
            type: 'optional',
            description: '图表标题，选填，文本类型。',
          },
          {
            property: 'theme',
            type: 'optional',
            description:
              '图表主题，选填，文本类型，可选值为 "default" | "dark" | "academy"，默认值为 "default"。',
          },
          {
            property: 'style',
            type: 'optional',
            description: '图表样式，选填，对象类型；',
          },
          {
            property: 'style.backgroundColor',
            type: 'optional',
            description: '背景颜色，选填，文本类型，合法颜色值。',
          },
          {
            property: 'style.palette',
            type: 'optional',
            description: '颜色映射，选填，数组类型，合法颜色值数组。',
          },
        ],
      },
    ],
  },
  examples: [
    {
      title: '电商用户转化漏斗：从浏览商品（10万人）到确认收货（1.5万人），分析各环节转化率。',
      description:
        '电商用户转化漏斗：从浏览商品（10万人）到确认收货（1.5万人），分析各环节转化率。',
      code: 'vis funnel\ndata\n  - category 浏览商品\n    value 100000\n  - category 加入购物车\n    value 45000\n  - category 提交订单\n    value 25000\n  - category 完成支付\n    value 18000\n  - category 确认收货\n    value 15000\ntitle 电商用户转化漏斗',
    },
    {
      title: 'SaaS 产品生命周期漏斗：从网站访问（5万人）到推荐他人（1200人），自定义颜色',
      description: 'SaaS 产品生命周期漏斗：从网站访问（5万人）到推荐他人（1200人）',
      code: 'vis funnel\ndata\n  - category 网站访问\n    value 50000\n  - category 注册账号\n    value 18000\n  - category 激活使用\n    value 12000\n  - category 付费转化\n    value 5000\n  - category 持续续费\n    value 3500\n  - category 推荐他人\n    value 1200\ntitle SaaS 产品生命周期漏斗\nstyle\n  palette\n    - "#A855F7"\n    - "#38BDF8"\n    - "#F9A8D4"\n    - "#34D399"\n    - "#818CF8"\n    - "#FB923C"\n  backgroundColor "#f8f7ff"',
    },
    {
      title: '招聘流程漏斗：从投递简历（2800人）到发放 Offer（65人），自定义配色',
      description: '招聘流程漏斗：从投递简历（2800人）到发放 Offer（65人）',
      code: 'vis funnel\ndata\n  - category 投递简历\n    value 2800\n  - category 初筛通过\n    value 850\n  - category 笔试/测评\n    value 420\n  - category 面试环节\n    value 180\n  - category 发放 Offer\n    value 65\ntitle 招聘流程漏斗\ntheme academy\nstyle\n  palette\n    - "#C45B42"\n    - "#7D8C6E"\n    - "#D4A373"\n    - "#E9C46A"\n    - "#A98467"\n  backgroundColor "#FBF8F4"',
    },
  ],
};
