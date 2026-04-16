import { LineChart } from 'lucide-react';

export const lineChartData = {
  id: 'line-chart',
  name: 'Line Chart',
  icon: LineChart,
  galleryExamples:
    'vis line\ndata\n  - time "2015 年"\n    value 1655\n  - time "2016 年"\n    value 1786\n  - time "2017 年"\n    value 1723\naxisXTitle 年份\naxisYTitle 出生人口（万人）',
  description:
    '折线图是是一个由笛卡尔坐标系（直角坐标系），一些点和线组成的统计图表，常用来表示数值随连续时间间隔或有序类别的变化。在折线图中，x 轴通常用作连续时间间隔或有序类别。y 轴用于量化的数据，如果为负值则绘制于 y 轴下方。连线用于连接两个相邻的数据点。 折线图用于分析事物随时间或有序类别而变化的趋势。从数据上来说，折线图需要一个连续时间字段或一个分类字段和至少一个连续数据字段。',
  knowledge: {
    introduction:
      '折线图是是一个由笛卡尔坐标系（直角坐标系），一些点和线组成的统计图表，常用来表示数值随连续时间间隔或有序类别的变化。在折线图中，x 轴通常用作连续时间间隔或有序类别。y 轴用于量化的数据，如果为负值则绘制于 y 轴下方。连线用于连接两个相邻的数据点。 折线图用于分析事物随时间或有序类别而变化的趋势。从数据上来说，折线图需要一个连续时间字段或一个分类字段和至少一个连续数据字段。',
    useCases: [
      '同一变量随时间或有序类别的变化，比如 2000 到 2016 年苹果电脑销售额在苹果利润的占比的变化趋势',
    ],
    config: [
      {
        name: 'Configuration Options',
        config: [
          {
            property: 'type',
            type: 'required',
            description: '图表的类型，必填，文本类型，值必须为 "line"。',
          },
          {
            property: 'data',
            type: 'required',
            description: '图表的数据，必填，数组对象类型；',
          },
          {
            property: 'data.time',
            type: 'required',
            description: '数据的时序名称 ，必填，文本或数值类型；',
          },
          {
            property: 'data.value',
            type: 'required',
            description: '数据的值，必填，数值类型；',
          },
          {
            property: 'data.group',
            type: 'optional',
            description: '数据分组名称，选填，文本类型；',
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
            description: '颜色映射，选填，数组类型，值为合法的颜色值数组。',
          },
          {
            property: 'style.lineWidth',
            type: 'optional',
            description: '图形描边的宽度，选填，数值类型，值为大于 0 的数值。',
          },
        ],
      },
    ],
  },
  examples: [
    {
      title: 'GDP 年度趋势折线图：展示 2013-2022 年 GDP 变化趋势，从 59.3 万亿增长至 121 万亿。',
      description:
        'GDP 年度趋势折线图：展示 2013-2022 年 GDP 变化趋势，从 59.3 万亿增长至 121 万亿。',
      code: 'vis line\ndata\n  - time 2013\n    value 59.3\n  - time 2014\n    value 64.4\n  - time 2015\n    value 68.9\n  - time 2016\n    value 74.4\n  - time 2017\n    value 82.7\n  - time 2018\n    value 91.9\n  - time 2019\n    value 99.1\n  - time 2020\n    value 101.6\n  - time 2021\n    value 114.4\n  - time 2022\n    value 121\ntitle GDP年度趋势\naxisXTitle 年份\naxisYTitle GDP(万亿)',
    },
    {
      title:
        '2019 年到 2023 年中三个城市的空气污染指数变化：北京分别为 150，160，145，155，165；广州分别为 100，110，105，115，120；上海分别为 9...',
      description:
        '2019 年到 2023 年中三个城市的空气污染指数变化：北京分别为 150，160，145，155，165；广州分别为 100，110，105，115，120；上海分别为 9...',
      code: 'vis line\ndata\n  - time 2019年\n    value 150\n    group 北京\n  - time 2020年\n    value 160\n    group 北京\n  - time 2021年\n    value 145\n    group 北京\n  - time 2022年\n    value 155\n    group 北京\n  - time 2023年\n    value 165\n    group 北京\n  - time 2019年\n    value 100\n    group 广州\n  - time 2020年\n    value 110\n    group 广州\n  - time 2021年\n    value 105\n    group 广州\n  - time 2022年\n    value 115\n    group 广州\n  - time 2023年\n    value 120\n    group 广州\n  - time 2019年\n    value 90\n    group 上海\n  - time 2020年\n    value 85\n    group 上海\n  - time 2021年\n    value 80\n    group 上海\n  - time 2022年\n    value 75\n    group 上海\n  - time 2023年\n    value 70\n    group 上海\ntitle 城市空气污染指数变化\naxisXTitle 年份\naxisYTitle 空气污染指数',
    },
    {
      title:
        '用折线图可视化 1974-1977 年 Gas flaring、Renewables、Fossil fuels 三类能源数据的变化趋势。',
      description:
        '用折线图可视化 1974-1977 年 Gas flaring、Renewables、Fossil fuels 三类能源数据的变化趋势。',
      code: 'vis line\ndata\n  - time 1974\n    value 107\n    group "Gas flaring"\n  - time 1974\n    value 208\n    group Renewables\n  - time 1974\n    value 356\n    group "Fossil fuels"\n  - time 1975\n    value 173\n    group "Gas flaring"\n  - time 1975\n    value 415\n    group Renewables\n  - time 1975\n    value 364\n    group "Fossil fuels"\n  - time 1976\n    value 117\n    group "Gas flaring"\n  - time 1976\n    value 220\n    group Renewables\n  - time 1976\n    value 373\n    group "Fossil fuels"\n  - time 1977\n    value 122\n    group "Gas flaring"\n  - time 1977\n    value 225\n    group Renewables\n  - time 1977\n    value 382\n    group "Fossil fuels"\naxisXTitle Year\naxisYTitle Value',
    },
  ],
};
