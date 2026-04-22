import { LineChart } from 'lucide-react';

export const lineChartData = {
  id: 'line-chart',
  name: 'Line Chart',
  icon: LineChart,
  galleryExamples:
    'vis line\ndata\n  - time 2015\n    value 0.87\n  - time 2016\n    value 0.99\n  - time 2017\n    value 0.91\n  - time 2018\n    value 0.83\n  - time 2019\n    value 0.98\n  - time 2020\n    value 1.02\n  - time 2021\n    value 0.85\n  - time 2022\n    value 0.89\n  - time 2023\n    value 1.17\n  - time 2024\n    value 1.29\ntitle 全球平均温度距平变化\naxisXTitle 年份\naxisYTitle 温度距平 (°C)',
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
      title: '全球平均温度距平变化',
      description: '全球平均温度距平变化',
      code: 'vis line\ndata\n  - time 2015\n    value 0.87\n  - time 2016\n    value 0.99\n  - time 2017\n    value 0.91\n  - time 2018\n    value 0.83\n  - time 2019\n    value 0.98\n  - time 2020\n    value 1.02\n  - time 2021\n    value 0.85\n  - time 2022\n    value 0.89\n  - time 2023\n    value 1.17\n  - time 2024\n    value 1.29\ntitle 全球平均温度距平变化\naxisXTitle 年份\naxisYTitle 温度距平 (°C)',
    },
    {
      title: '四城市月均气温对比，自定义颜色',
      description: '四城市月均气温对比',
      code: 'vis line\ndata\n  - time 1月\n    value 2\n    group 北京\n  - time 2月\n    value 5\n    group 北京\n  - time 3月\n    value 12\n    group 北京\n  - time 4月\n    value 20\n    group 北京\n  - time 5月\n    value 26\n    group 北京\n  - time 6月\n    value 30\n    group 北京\n  - time 7月\n    value 31\n    group 北京\n  - time 8月\n    value 30\n    group 北京\n  - time 9月\n    value 25\n    group 北京\n  - time 10月\n    value 18\n    group 北京\n  - time 11月\n    value 9\n    group 北京\n  - time 12月\n    value 3\n    group 北京\n  - time 1月\n    value 8\n    group 上海\n  - time 2月\n    value 9\n    group 上海\n  - time 3月\n    value 13\n    group 上海\n  - time 4月\n    value 18\n    group 上海\n  - time 5月\n    value 23\n    group 上海\n  - time 6月\n    value 27\n    group 上海\n  - time 7月\n    value 32\n    group 上海\n  - time 8月\n    value 32\n    group 上海\n  - time 9月\n    value 27\n    group 上海\n  - time 10月\n    value 22\n    group 上海\n  - time 11月\n    value 16\n    group 上海\n  - time 12月\n    value 10\n    group 上海\n  - time 1月\n    value 15\n    group 广州\n  - time 2月\n    value 16\n    group 广州\n  - time 3月\n    value 19\n    group 广州\n  - time 4月\n    value 23\n    group 广州\n  - time 5月\n    value 27\n    group 广州\n  - time 6月\n    value 29\n    group 广州\n  - time 7月\n    value 30\n    group 广州\n  - time 8月\n    value 30\n    group 广州\n  - time 9月\n    value 28\n    group 广州\n  - time 10月\n    value 25\n    group 广州\n  - time 11月\n    value 21\n    group 广州\n  - time 12月\n    value 17\n    group 广州\n  - time 1月\n    value -4\n    group 哈尔滨\n  - time 2月\n    value 0\n    group 哈尔滨\n  - time 3月\n    value 8\n    group 哈尔滨\n  - time 4月\n    value 16\n    group 哈尔滨\n  - time 5月\n    value 22\n    group 哈尔滨\n  - time 6月\n    value 27\n    group 哈尔滨\n  - time 7月\n    value 29\n    group 哈尔滨\n  - time 8月\n    value 27\n    group 哈尔滨\n  - time 9月\n    value 20\n    group 哈尔滨\n  - time 10月\n    value 11\n    group 哈尔滨\n  - time 11月\n    value 1\n    group 哈尔滨\n  - time 12月\n    value -6\n    group 哈尔滨\ntitle 四城市月均气温对比\naxisXTitle 月份\naxisYTitle 气温 (°C)\nstyle\n  palette\n    - "#A855F7"\n    - "#38BDF8"\n    - "#F9A8D4"\n    - "#34D399"\n  backgroundColor "#f8f7ff"',
    },
    {
      title: '全球新能源装机容量趋势，自定义配色',
      description: '全球新能源装机容量趋势',
      code: 'vis line\ndata\n  - time 2018\n    value 480\n    group 风电\n  - time 2019\n    value 540\n    group 风电\n  - time 2020\n    value 620\n    group 风电\n  - time 2021\n    value 730\n    group 风电\n  - time 2022\n    value 840\n    group 风电\n  - time 2023\n    value 960\n    group 风电\n  - time 2024\n    value 1100\n    group 风电\n  - time 2018\n    value 400\n    group 光伏\n  - time 2019\n    value 500\n    group 光伏\n  - time 2020\n    value 650\n    group 光伏\n  - time 2021\n    value 850\n    group 光伏\n  - time 2022\n    value 1050\n    group 光伏\n  - time 2023\n    value 1300\n    group 光伏\n  - time 2024\n    value 1600\n    group 光伏\n  - time 2018\n    value 180\n    group 生物质\n  - time 2019\n    value 200\n    group 生物质\n  - time 2020\n    value 220\n    group 生物质\n  - time 2021\n    value 245\n    group 生物质\n  - time 2022\n    value 270\n    group 生物质\n  - time 2023\n    value 300\n    group 生物质\n  - time 2024\n    value 330\n    group 生物质\ntitle 全球新能源装机容量趋势\naxisXTitle 年份\naxisYTitle 装机容量 (GW)\ntheme academy\nstyle\n  palette\n    - "#C45B42"\n    - "#7D8C6E"\n    - "#D4A373"\n  backgroundColor "#FBF8F4"\n  lineWidth 3',
    },
  ],
};
