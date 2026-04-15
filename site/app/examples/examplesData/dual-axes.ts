import { TrendingUp } from 'lucide-react';

export const dualAxesData = {
  id: 'dual-axes',
  name: 'Dual Axes Chart',
  icon: TrendingUp,
  galleryExamples:
    'vis dual-axes\ncategories\n  - 2018\n  - 2019\n  - 2020\n  - 2021\n  - 2022\naxisXTitle 年份\nseries\n  - type column\n    axisYTitle 销售额\n    data\n      - 91.9\n      - 99.1\n      - 101.6\n      - 114.4\n      - 121\n  - type line\n    axisYTitle 利润率\n    data\n      - 0.055\n      - 0.06\n      - 0.062\n      - 0.07\n      - 0.075',
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
      title:
        '用双轴图展示某公司的年销售额与利润率，2018 年至 2022 年的销售额分别为 91.9 亿、99.1 亿、101.6 亿、114.4 亿、121 亿，利润率分别为 5.5%、6.0%、6.2...',
      description:
        '用双轴图展示某公司的年销售额与利润率，2018 年至 2022 年的销售额分别为 91.9 亿、99.1 亿、101.6 亿、114.4 亿、121 亿，利润率分别为 5.5%、6.0%、6.2...',
      code: 'vis dual-axes\ncategories\n  - 2018\n  - 2019\n  - 2020\n  - 2021\n  - 2022\ntitle 2018-2022销售额与利润率\naxisXTitle 年份\nseries\n  - type column\n    axisYTitle 销售额\n    data\n      - 91.9\n      - 99.1\n      - 101.6\n      - 114.4\n      - 121\n  - type line\n    axisYTitle 利润率\n    data\n      - 0.055\n      - 0.06\n      - 0.062\n      - 0.07\n      - 0.075',
    },
    {
      title:
        '某软件项目 2020 年 9 月每日任务消耗时间（秒）与完成时间（秒）双轴图，展示每日工作量与效率的联动关系。',
      description:
        '某软件项目 2020 年 9 月每日任务消耗时间（秒）与完成时间（秒）双轴图，展示每日工作量与效率的联动关系。',
      code: 'vis dual-axes\ncategories\n  - 09-01\n  - 09-02\n  - 09-03\n  - 09-04\n  - 09-05\n  - 09-06\n  - 09-07\n  - 09-08\n  - 09-09\n  - 09-10\n  - 09-11\n  - 09-12\ntitle 2020年9月项目日任务消耗与完成时间\naxisXTitle 日期\nseries\n  - type column\n    axisYTitle 消耗时间（秒）\n    data\n      - 10440\n      - 9345\n      - 18459\n      - 9763\n      - 11074\n      - 11770\n      - 12206\n      - 11434\n      - 16218\n      - 11914\n      - 16781\n      - 10555\n  - type line\n    axisYTitle 完成时间（秒）\n    data\n      - 696.4\n      - 692.9\n      - 936.0\n      - 782.9\n      - 653.8\n      - 856.7\n      - 777.2\n      - 773.3\n      - 833.3\n      - 793.5\n      - 894.5\n      - 725.6',
    },
    {
      title: '某地区 2023 年全年月度新增用户数与环比增长率双轴图，展示用户增长的季节性规律。',
      description: '某地区 2023 年全年月度新增用户数与环比增长率双轴图，展示用户增长的季节性规律。',
      code: 'vis dual-axes\ncategories\n  - Jan\n  - Feb\n  - Mar\n  - Apr\n  - May\n  - Jun\n  - Jul\n  - Aug\n  - Sep\n  - Oct\n  - Nov\n  - Dec\ntitle 2023年月度新增用户数与增长率\naxisXTitle 月份\nseries\n  - type column\n    axisYTitle 新增用户数（万人）\n    data\n      - 26\n      - 59\n      - 90\n      - 264\n      - 287\n      - 707\n      - 1756\n      - 1822\n      - 487\n      - 188\n      - 60\n      - 23\n  - type line\n    axisYTitle A渠道增长率（%）\n    data\n      - 2.6\n      - 5.9\n      - 9.0\n      - 26.4\n      - 28.7\n      - 70.7\n      - 175.6\n      - 182.2\n      - 48.7\n      - 18.8\n      - 6.0\n      - 2.3\n  - type line\n    axisYTitle B渠道增长率（%）\n    data\n      - 2.0\n      - 2.2\n      - 3.3\n      - 4.5\n      - 6.3\n      - 10.2\n      - 20.3\n      - 23.4\n      - 23.0\n      - 16.5\n      - 12.0\n      - 6.2',
    },
  ],
};
