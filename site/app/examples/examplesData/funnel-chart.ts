import { Filter } from 'lucide-react';

export const funnelChartData = {
  id: 'funnel-chart',
  name: 'Funnel Chart',
  icon: Filter,
  galleryExamples:
    'vis funnel\ndata\n  - category 浏览网站\n    value 50000\n  - category 放入购物车\n    value 35000\n  - category 生成订单\n    value 25000\n  - category 支付订单\n    value 15000\n  - category 完成交易\n    value 8000',
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
      title:
        '电商平台用户购买转化漏斗：从浏览网站（50000人）到完成交易（8000人），分析各环节转化瓶颈。',
      description:
        '电商平台用户购买转化漏斗：从浏览网站（50000人）到完成交易（8000人），分析各环节转化瓶颈。',
      code: 'vis funnel\ndata\n  - category 浏览网站\n    value 50000\n  - category 放入购物车\n    value 35000\n  - category 生成订单\n    value 25000\n  - category 支付订单\n    value 15000\n  - category 完成交易\n    value 8000\ntitle 电商平台购买转化漏斗',
    },
    {
      title:
        'SaaS 产品用户生命周期转化漏斗（主题 dark）：从注册（12400人）到成为付费用户（1860人）的各阶段留存情况。',
      description:
        'SaaS 产品用户生命周期转化漏斗（主题 dark）：从注册（12400人）到成为付费用户（1860人）的各阶段留存情况。',
      code: 'vis funnel\ndata\n  - category 注册用户\n    value 12400\n  - category 完成新手引导\n    value 8370\n  - category 7日活跃\n    value 5240\n  - category 30日活跃\n    value 3180\n  - category 付费用户\n    value 1860\ntitle SaaS产品用户转化漏斗\ntheme dark',
    },
    {
      title:
        '2024年"双11"大促活动参与漏斗：从收到推送（180000人）到完成分享（52000人），自定义颜色。',
      description:
        '2024年"双11"大促活动参与漏斗：从收到推送（180000人）到完成分享（52000人），自定义颜色。',
      code: 'vis funnel\ndata\n  - category 收到活动推送\n    value 180000\n  - category 点击进入活动页\n    value 124000\n  - category 参与互动游戏\n    value 89300\n  - category 完成分享任务\n    value 52000\ntitle 双11大促活动参与漏斗\nstyle\n  palette\n    - #FF7F50\n    - #87CEFA\n    - #32CD32\n    - #FFD700\n  backgroundColor #FFF8DC',
    },
  ],
};
