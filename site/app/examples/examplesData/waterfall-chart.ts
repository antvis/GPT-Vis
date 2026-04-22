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
      title: '年度费用增减分析：8 项费用构成，人力成本和研发投入为主要增量，含年度总计，自定义颜色',
      description: '年度费用增减分析：8 项费用构成，人力成本和研发投入为主要增量，含年度总计',
      code: 'vis waterfall\ndata\n  - category 人力成本\n    value 380\n  - category 研发投入\n    value 250\n  - category 营销费用\n    value -80\n  - category 行政开支\n    value -45\n  - category 设备采购\n    value 120\n  - category 培训支出\n    value 60\n  - category 差旅费用\n    value -35\n  - category 其他\n    value 20\n  - category 年度总计\n    isTotal true\ntitle 年度费用增减分析\naxisXTitle 费用项目\naxisYTitle 金额 (万元)\nstyle\n  palette\n    - "#A855F7"\n    - "#38BDF8"\n    - "#34D399"\n  backgroundColor "#f8f7ff"',
    },
    {
      title:
        '季度营收变化瀑布图：4 个季度收入与成本对比，含各季度利润小计和年度净利润总计，自定义配色',
      description: '季度营收变化瀑布图：4 个季度收入与成本对比，含各季度利润小计和年度净利润总计',
      code: 'vis waterfall\ndata\n  - category Q1收入\n    value 850\n  - category Q1成本\n    value -520\n  - category Q1利润\n    isIntermediateTotal true\n  - category Q2收入\n    value 920\n  - category Q2成本\n    value -480\n  - category Q2利润\n    isIntermediateTotal true\n  - category Q3收入\n    value 780\n  - category Q3成本\n    value -450\n  - category Q3利润\n    isIntermediateTotal true\n  - category Q4收入\n    value 1100\n  - category Q4成本\n    value -550\n  - category Q4利润\n    isIntermediateTotal true\n  - category 年度净利润\n    isTotal true\ntitle 季度营收变化瀑布图\naxisXTitle 季度\naxisYTitle 金额 (万元)\ntheme academy\nstyle\n  palette\n    - "#C45B42"\n    - "#7D8C6E"\n    - "#D4A373"\n  backgroundColor "#FBF8F4"',
    },
  ],
};
