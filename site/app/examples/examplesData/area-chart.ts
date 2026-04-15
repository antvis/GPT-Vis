import { AreaChart } from 'lucide-react';

export const areaChartData = {
  id: 'area-chart',
  name: 'Area Chart',
  icon: AreaChart,
  galleryExamples:
    'vis area\ndata\n  - time 2013\n    value 59.3\n  - time 2014\n    value 64.4\n  - time 2015\n    value 68.9\n  - time 2016\n    value 74.4\n  - time 2017\n    value 82.7\n  - time 2018\n    value 91.9\n  - time 2019\n    value 99.1\n  - time 2020\n    value 101.6\n  - time 2021\n    value 114.4\n  - time 2022\n    value 121\naxisXTitle 年份\naxisYTitle GDP(万亿)',
  description:
    '面积图，或称区域图，是一种随有序变量的变化，反映数值变化的统计图表，原理与折线图相似。而面积图的特点在于，折线与自变量坐标轴之间的区域，会由颜色填充。',
  knowledge: {
    introduction:
      '面积图，或称区域图，是一种随有序变量的变化，反映数值变化的统计图表，原理与折线图相似。而面积图的特点在于，折线与自变量坐标轴之间的区域，会由颜色填充。',
    useCases: [
      '想要体现在连续自变量下，数据的趋势变化，同时也能够观察到数据总量的变化趋势',
      '例如，位移=速度（平均速度或微速度）x 时间：s=v\\*t; 那么如果我们的 x 轴是时间 t，y 轴是每个时刻的速度 v，使用面积图，不仅可以观察速度随时间变化的趋势，还可以根据面积大小来感受位移距离的长度变化',
    ],
    config: [
      {
        name: 'Configuration Options',
        config: [
          {
            property: 'type',
            type: 'required',
            description: '图表的类型，必填，文本类型，值必须为 "area"。',
          },
          {
            property: 'data',
            type: 'required',
            description: '图表的数据，必填，数组对象类型；',
          },
          {
            property: 'data.time',
            type: 'required',
            description: '数据的时序名称，必填，文本或数值类型；',
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
            property: 'stack',
            type: 'optional',
            description: '是否开启堆叠，开启堆叠面积图需数据中含有 group 字段，选填，布尔类型。',
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
            description: '图形描边的宽度，选填，数值类型，值为大于等于 0 的数值。',
          },
        ],
      },
    ],
  },
  examples: [
    {
      title: 'GDP 年度趋势面积图：展示 2013-2022 年 GDP 变化趋势，从 59.3 万亿增长至 121 万亿。',
      description:
        'GDP 年度趋势面积图：展示 2013-2022 年 GDP 变化趋势，从 59.3 万亿增长至 121 万亿。',
      code: 'vis area\ndata\n  - time 2013\n    value 59.3\n  - time 2014\n    value 64.4\n  - time 2015\n    value 68.9\n  - time 2016\n    value 74.4\n  - time 2017\n    value 82.7\n  - time 2018\n    value 91.9\n  - time 2019\n    value 99.1\n  - time 2020\n    value 101.6\n  - time 2021\n    value 114.4\n  - time 2022\n    value 121\ntitle GDP年度趋势\naxisXTitle 年份\naxisYTitle GDP(万亿)',
    },
    {
      title:
        '在某项研究中，2019 年到 2023 年中三个城市的空气污染指数变化如下：北京分别为 150，160，145，155，165；广州分别为 100，110，105，115，120；上海分别为 9...',
      description:
        '在某项研究中，2019 年到 2023 年中三个城市的空气污染指数变化如下：北京分别为 150，160，145，155，165；广州分别为 100，110，105，115，120；上海分别为 9...',
      code: 'vis area\ndata\n  - time 2019年\n    value 150\n    group 北京\n  - time 2020年\n    value 160\n    group 北京\n  - time 2021年\n    value 145\n    group 北京\n  - time 2022年\n    value 155\n    group 北京\n  - time 2023年\n    value 165\n    group 北京\n  - time 2019年\n    value 100\n    group 广州\n  - time 2020年\n    value 110\n    group 广州\n  - time 2021年\n    value 105\n    group 广州\n  - time 2022年\n    value 115\n    group 广州\n  - time 2023年\n    value 120\n    group 广州\n  - time 2019年\n    value 90\n    group 上海\n  - time 2020年\n    value 85\n    group 上海\n  - time 2021年\n    value 80\n    group 上海\n  - time 2022年\n    value 75\n    group 上海\n  - time 2023年\n    value 70\n    group 上海\nstack true\ntitle 城市空气污染指数变化\naxisXTitle 年份\naxisYTitle 空气污染指数',
    },
    {
      title:
        '用面积图可视化 1974-1977 年 Gas flaring、Renewables、Fossil fuels 三类能源数据的变化趋势。',
      description:
        '用面积图可视化 1974-1977 年 Gas flaring、Renewables、Fossil fuels 三类能源数据的变化趋势。',
      code: 'vis area\ndata\n  - time 1974\n    value 107\n    group "Gas flaring"\n  - time 1974\n    value 208\n    group Renewables\n  - time 1974\n    value 356\n    group "Fossil fuels"\n  - time 1975\n    value 173\n    group "Gas flaring"\n  - time 1975\n    value 415\n    group Renewables\n  - time 1975\n    value 364\n    group "Fossil fuels"\n  - time 1976\n    value 117\n    group "Gas flaring"\n  - time 1976\n    value 220\n    group Renewables\n  - time 1976\n    value 373\n    group "Fossil fuels"\n  - time 1977\n    value 122\n    group "Gas flaring"\n  - time 1977\n    value 225\n    group Renewables\n  - time 1977\n    value 382\n    group "Fossil fuels"\naxisXTitle Year\naxisYTitle Value',
    },
  ],
};
