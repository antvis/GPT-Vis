import { TrendingDown } from 'lucide-react';
export const waterfallChartData = {
  id: 'waterfall-chart',
  name: 'Waterfall Chart',
  icon: TrendingDown,
  galleryExamples:
    'vis waterfall\ndata\n  - category 第一季度\n    value 120000000\n  - category 第二季度\n    value 569000000\n  - category 第三季度\n    value 231000000\n  - category 前三季度总计\n    isIntermediateTotal true\n  - category 第四季度\n    value -342000000\n  - category 第五季度\n    value -232000000\n  - category 四五季度总计\n    isIntermediateTotal true\n  - category 总计\n    isTotal true',
  description:
    '瀑布图用于展示数值从起点到终点的逐步变化过程，清晰地分解增量和减量的贡献。通过起始值、多个正负变化值和最终结果，帮助分析各环节对总体的影响，常用于财务报表、预算对比和阶段性指标拆解。',
  knowledge: {
    introduction:
      '瀑布图用于展示数值从起点到终点的逐步变化过程，清晰地分解增量和减量的贡献。通过起始值、多个正负变化值和最终结果，帮助分析各环节对总体的影响，常用于财务报表、预算对比和阶段性指标拆解。',
    useCases: [
      '展示营收、成本等财务数据的逐步增减过程',
      '对比预算与实际，分析各项差异的贡献',
      '展示项目进度或关键指标的阶段性变化',
      '分析渠道/地域/部门对总体指标的影响',
    ],
    config: [
      {
        name: 'Configuration Options',
        config: [
          {
            property: 'type',
            type: 'required',
            description: '图表的类型，必填，文本类型，值必须为 "waterfall"',
          },
          {
            property: 'data',
            type: 'required',
            description: '图表的数据，必填，数组类型，每个元素包含：',
          },
          {
            property: 'data.category',
            type: 'required',
            description: '步骤名称或类别名称，必填，字符串类型',
          },
          {
            property: 'data.value',
            type: 'optional',
            description: '该步骤的增量或减量，选填，数值类型（正数表示增加，负数表示减少）',
          },
          {
            property: 'data.isIntermediateTotal',
            type: 'optional',
            description: '是否为中间总计栏，选填，布尔类型，默认为 false',
          },
          {
            property: 'data.isTotal',
            type: 'optional',
            description: '是否为总计栏，选填，布尔类型，默认为 false',
          },
          {
            property: 'title',
            type: 'optional',
            description: '图表的标题，选填，文本类型。',
          },
          {
            property: 'axisXTitle',
            type: 'optional',
            description: 'x 轴的标题，选填，文本类型。',
          },
          {
            property: 'axisYTitle',
            type: 'optional',
            description: 'y 轴的标题，选填，文本类型。',
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
            description: '背景颜色，选填，文本类型，值为合法的颜色值。',
          },
          {
            property: 'style.palette',
            type: 'optional',
            description:
              '色板数组，选填，数组类型，顺序为 [正值色, 负值色, 汇总色]，默认值为 ["#FF4D4F", "#2EBB59", "#1783FF"]。',
          },
        ],
      },
    ],
  },
  examples: [
    {
      title: '季度收益瀑布图：展示各季度收益变化，包含前三季度总计和四五季度总计两个中间小计节点。',
      description:
        '季度收益瀑布图：展示各季度收益变化，包含前三季度总计和四五季度总计两个中间小计节点。',
      code: 'vis waterfall\ndata\n  - category 第一季度\n    value 120000000\n  - category 第二季度\n    value 569000000\n  - category 第三季度\n    value 231000000\n  - category 前三季度总计\n    isIntermediateTotal true\n  - category 第四季度\n    value -342000000\n  - category 第五季度\n    value -232000000\n  - category 四五季度总计\n    isIntermediateTotal true\n  - category 总计\n    isTotal true\ntitle 季度收益瀑布图',
    },
    {
      title:
        '季度收益瀑布图：展示四个季度的收益变化，第一季度 620 万，第二季度减少 260 万，第三季度增加 410 万，第四季度增加 370 万，总计 1140 万。',
      description:
        '季度收益瀑布图：展示四个季度的收益变化，第一季度 620 万，第二季度减少 260 万，第三季度增加 410 万，第四季度增加 370 万，总计 1140 万。',
      code: 'vis waterfall\ndata\n  - category 第一季度\n    value 6200000\n  - category 第二季度\n    value -2600000\n  - category 第三季度\n    value 4100000\n  - category 第四季度\n    value 3700000\n  - category 总计\n    value 11400000\n    isTotal true\ntitle 季度收益瀑布图',
    },
  ],
};
