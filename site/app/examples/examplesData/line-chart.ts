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
      title:
        '我国出生人口，2015 年出生人口 1655 万人，2016 年出生人口 1786 万人，2017 年出生人口 1723 万人。用折线图可视化。',
      description:
        '我国出生人口，2015 年出生人口 1655 万人，2016 年出生人口 1786 万人，2017 年出生人口 1723 万人。用折线图可视化。',
      code: 'vis line\ndata\n  - time "2015 年"\n    value 1655\n  - time "2016 年"\n    value 1786\n  - time "2017 年"\n    value 1723\ntitle 出生人口变化\naxisXTitle 年份\naxisYTitle 出生人口（万人）',
    },
    {
      title:
        '我国出生人口与死亡人口，2015 年分别是 1655 万人与 975 万人，2016 年分别是出生人口 1786 万人与 977 万人，2017 年分别是出生人口 1723 万人与 986 万人...',
      description:
        '我国出生人口与死亡人口，2015 年分别是 1655 万人与 975 万人，2016 年分别是出生人口 1786 万人与 977 万人，2017 年分别是出生人口 1723 万人与 986 万人。',
      code: 'vis line\ndata\n  - time "2015 年"\n    value 1655\n    group 出生人口\n  - time "2015 年"\n    value 975\n    group 死亡人口\n  - time "2016 年"\n    value 1786\n    group 出生人口\n  - time "2016 年"\n    value 977\n    group 死亡人口\n  - time "2017 年"\n    value 1723\n    group 出生人口\n  - time "2017 年"\n    value 986\n    group 死亡人口\ntitle 出生人口与死亡人口变化\naxisXTitle 年份\naxisYTitle 人口（万人）',
    },
    {
      title:
        '用折线图可视化我的数据 [{ "year": 2015,"industrial": 7200.0 },{ "year": 2016, "industrial": 3660.0 },{ "year...',
      description:
        '用折线图可视化我的数据 [{ "year": 2015,"industrial": 7200.0 },{ "year": 2016, "industrial": 3660.0 },{ "year...',
      code: 'vis line\ndata\n  - time 2015\n    value 7200.0\n  - time 2016\n    value 3660.0\n  - time 2017\n    value 4100.0\naxisXTitle year\naxisYTitle industrial',
    },
  ],
};
