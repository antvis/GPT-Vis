import { TrendingUp } from 'lucide-react';

export const dualAxesData = {
  id: 'dual-axes',
  name: 'Dual Axes Chart',
  icon: TrendingUp,
  galleryExamples:
    'vis dual-axes\ncategories\n  - 1月\n  - 2月\n  - 3月\n  - 4月\n  - 5月\n  - 6月\n  - 7月\n  - 8月\n  - 9月\n  - 10月\n  - 11月\n  - 12月\nseries\n  - type column\n    axisYTitle 销售额(万元)\n    data\n      - 820\n      - 650\n      - 780\n      - 860\n      - 920\n      - 1350\n      - 890\n      - 850\n      - 960\n      - 1100\n      - 2180\n      - 1250\n  - type line\n    axisYTitle 利润率(%)\n    data\n      - 12\n      - 10\n      - 13\n      - 14\n      - 15\n      - 18\n      - 14\n      - 13\n      - 15\n      - 16\n      - 22\n      - 17\ntitle 月度销售额与利润率\naxisXTitle 月份',
  description:
    '双轴图是一种结合两个不同图表类型的组合图表，通常是将柱状图与折线图结合起来显示。双轴图通过在一个图表中使用两个垂直 Y 轴（左侧和右侧），分别对应不同的数值维度。柱状图用于展示一组数据的大小或数量，而折线图则展示另一组数据的趋势。双轴图非常适合同时展示不同类型的数据变化趋势。',
  knowledge: {
    introduction:
      '双轴图是一种结合两个不同图表类型的组合图表，通常是将柱状图与折线图结合起来显示。双轴图通过在一个图表中使用两个垂直 Y 轴（左侧和右侧），分别对应不同的数值维度。柱状图用于展示一组数据的大小或数量，而折线图则展示另一组数据的趋势。双轴图非常适合同时展示不同类型的数据变化趋势。',
    useCases: [
      '同时展示两个具有不同数量级的数据，例如销售额和增长率。',
      '比较两组变量的相对变化趋势，如同时观察某时间段内的销量和利润率。',
      '数据维度不同且具有共同的 X 轴（例如时间、类别）。',
    ],
    config: [
      {
        name: 'Configuration Options',
        config: [
          {
            property: 'type',
            type: 'required',
            description: '图表的类型，必填，文本类型，值必须为 "dual-axes"。',
          },
          {
            property: 'categories',
            type: 'required',
            description: '图表的 X 轴的数组，必填，数组文本类型。',
          },
          {
            property: 'title',
            type: 'optional',
            description: '图表的标题，选填，文本类型。',
          },
          {
            property: 'axisXTitle',
            type: 'optional',
            description: '图表的 X 轴的标题，选填，文本类型。',
          },
          {
            property: 'series',
            type: 'required',
            description: '图表详细组合，必填，数组对象类型，每个对象代表一个基础图表，包含：',
          },
          {
            property: 'series.type',
            type: 'required',
            description: '基础图表的类型，必填，"column"表示柱状图，"line"表示折线图；',
          },
          {
            property: 'series.data',
            type: 'required',
            description: '基础图表的数据，必填，数组数值类型；',
          },
          {
            property: 'series.axisYTitle',
            type: 'optional',
            description: '基础图表的 Y 轴标题，选填，文本类型；',
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
            description: '颜色映射，选填，数组类型，值为合法的 颜色值数组。',
          },
        ],
      },
    ],
  },
  examples: [
    {
      title: '展示月度销售额(柱状)与利润率(折线)的联动趋势。',
      description: '展示月度销售额(柱状)与利润率(折线)的联动趋势。',
      code: 'vis dual-axes\ncategories\n  - 1月\n  - 2月\n  - 3月\n  - 4月\n  - 5月\n  - 6月\n  - 7月\n  - 8月\n  - 9月\n  - 10月\n  - 11月\n  - 12月\nseries\n  - type column\n    axisYTitle 销售额(万元)\n    data\n      - 820\n      - 650\n      - 780\n      - 860\n      - 920\n      - 1350\n      - 890\n      - 850\n      - 960\n      - 1100\n      - 2180\n      - 1250\n  - type line\n    axisYTitle 利润率(%)\n    data\n      - 12\n      - 10\n      - 13\n      - 14\n      - 15\n      - 18\n      - 14\n      - 13\n      - 15\n      - 16\n      - 22\n      - 17\ntitle 月度销售额与利润率\naxisXTitle 月份',
    },
    {
      title: '展示周活跃用户数(柱状)与增长率(折线)的变化趋势，自定义颜色。',
      description: '展示周活跃用户数(柱状)与增长率(折线)的变化趋势。',
      code: 'vis dual-axes\ncategories\n  - W1\n  - W2\n  - W3\n  - W4\n  - W5\n  - W6\n  - W7\n  - W8\n  - W9\n  - W10\n  - W11\n  - W12\nseries\n  - type column\n    axisYTitle 活跃用户(万)\n    data\n      - 120\n      - 135\n      - 142\n      - 138\n      - 155\n      - 162\n      - 170\n      - 165\n      - 178\n      - 185\n      - 192\n      - 205\n  - type line\n    axisYTitle 增长率(%)\n    data\n      - 5\n      - 12\n      - 5\n      - -3\n      - 12\n      - 5\n      - 5\n      - -3\n      - 8\n      - 4\n      - 4\n      - 7\ntitle 周活跃用户与增长率\naxisXTitle 周次\nstyle\n  palette\n    - "#A855F7"\n    - "#38BDF8"\n  backgroundColor "#f8f7ff"',
    },
    {
      title: '展示季度营收(柱状)与利润率、成本率(双折线)趋势，自定义配色',
      description: '展示季度营收(柱状)与利润率、成本率(双折线)趋势',
      code: 'vis dual-axes\ncategories\n  - 2023Q1\n  - 2023Q2\n  - 2023Q3\n  - 2023Q4\n  - 2024Q1\n  - 2024Q2\n  - 2024Q3\n  - 2024Q4\nseries\n  - type column\n    axisYTitle 营收(亿元)\n    data\n      - 850\n      - 920\n      - 780\n      - 1100\n      - 950\n      - 1020\n      - 880\n      - 1250\n  - type line\n    axisYTitle 利润率(%)\n    data\n      - 15\n      - 18\n      - 14\n      - 22\n      - 16\n      - 19\n      - 15\n      - 24\n  - type line\n    axisYTitle 成本率(%)\n    data\n      - 72\n      - 68\n      - 74\n      - 65\n      - 70\n      - 67\n      - 73\n      - 62\ntitle 季度营收与利润率趋势\naxisXTitle 季度\ntheme academy\nstyle\n  palette\n    - "#C45B42"\n    - "#7D8C6E"\n    - "#D4A373"\n  backgroundColor "#FBF8F4"',
    },
  ],
};
