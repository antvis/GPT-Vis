import { AreaChart } from 'lucide-react';

export const areaChartData = {
  id: 'area-chart',
  name: 'Area Chart',
  icon: AreaChart,
  galleryExamples:
    'vis area\ndata\n  - time 2018\n    value 201\n  - time 2019\n    value 221\n  - time 2020\n    value 307\n  - time 2021\n    value 460\n  - time 2022\n    value 620\n  - time 2023\n    value 830\n  - time 2024\n    value 1080\ntitle 全球电动汽车销量趋势\naxisXTitle 年份\naxisYTitle 销量 (万辆)',
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
      title: '全球电动汽车销量趋势',
      description: '全球电动汽车销量趋势',
      code: 'vis area\ndata\n  - time 2018\n    value 201\n  - time 2019\n    value 221\n  - time 2020\n    value 307\n  - time 2021\n    value 460\n  - time 2022\n    value 620\n  - time 2023\n    value 830\n  - time 2024\n    value 1080\ntitle 全球电动汽车销量趋势\naxisXTitle 年份\naxisYTitle 销量 (万辆)',
    },
    {
      title: '中国电力结构变化趋势，自定义颜色',
      description: '中国电力结构变化趋势',
      code: 'vis area\ndata\n  - time 2018\n    value 3800\n    group 火电\n  - time 2019\n    value 3750\n    group 火电\n  - time 2020\n    value 3650\n    group 火电\n  - time 2021\n    value 3600\n    group 火电\n  - time 2022\n    value 3550\n    group 火电\n  - time 2023\n    value 3480\n    group 火电\n  - time 2024\n    value 3400\n    group 火电\n  - time 2018\n    value 1200\n    group 水电\n  - time 2019\n    value 1250\n    group 水电\n  - time 2020\n    value 1300\n    group 水电\n  - time 2021\n    value 1350\n    group 水电\n  - time 2022\n    value 1380\n    group 水电\n  - time 2023\n    value 1420\n    group 水电\n  - time 2024\n    value 1450\n    group 水电\n  - time 2018\n    value 500\n    group 核电\n  - time 2019\n    value 550\n    group 核电\n  - time 2020\n    value 600\n    group 核电\n  - time 2021\n    value 650\n    group 核电\n  - time 2022\n    value 700\n    group 核电\n  - time 2023\n    value 750\n    group 核电\n  - time 2024\n    value 800\n    group 核电\nstack true\ntitle 中国电力结构变化趋势\naxisXTitle 年份\naxisYTitle 发电量 (TWh)\nstyle\n  palette\n    - "#A855F7"\n    - "#38BDF8"\n    - "#34D399"\n  backgroundColor "#f8f7ff"',
    },
    {
      title: '全球云计算市场规模趋势，自定义配色',
      description: '全球云计算市场规模趋势',
      code: 'vis area\ndata\n  - time 2019\n    value 350\n    group IaaS\n  - time 2020\n    value 480\n    group IaaS\n  - time 2021\n    value 650\n    group IaaS\n  - time 2022\n    value 830\n    group IaaS\n  - time 2023\n    value 1050\n    group IaaS\n  - time 2024\n    value 1320\n    group IaaS\n  - time 2019\n    value 520\n    group SaaS\n  - time 2020\n    value 680\n    group SaaS\n  - time 2021\n    value 870\n    group SaaS\n  - time 2022\n    value 1100\n    group SaaS\n  - time 2023\n    value 1380\n    group SaaS\n  - time 2024\n    value 1700\n    group SaaS\n  - time 2019\n    value 180\n    group PaaS\n  - time 2020\n    value 250\n    group PaaS\n  - time 2021\n    value 340\n    group PaaS\n  - time 2022\n    value 440\n    group PaaS\n  - time 2023\n    value 560\n    group PaaS\n  - time 2024\n    value 700\n    group PaaS\ntitle 全球云计算市场规模趋势\naxisXTitle 年份\naxisYTitle 市场规模 (亿美元)\ntheme academy\nstyle\n  palette\n    - "#C45B42"\n    - "#7D8C6E"\n    - "#D4A373"\n  backgroundColor "#FBF8F4"',
    },
  ],
};
