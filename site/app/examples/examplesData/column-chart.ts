import { BarChart2 } from 'lucide-react';

export const columnChartData = {
  id: 'column-chart',
  name: 'Column Chart',
  icon: BarChart2,
  galleryExamples:
    'vis column\ndata\n  - category 1月\n    value 820\n  - category 2月\n    value 650\n  - category 3月\n    value 780\n  - category 4月\n    value 860\n  - category 5月\n    value 920\n  - category 6月\n    value 1350\n  - category 7月\n    value 890\n  - category 8月\n    value 850\n  - category 9月\n    value 960\n  - category 10月\n    value 1100\n  - category 11月\n    value 2180\n  - category 12月\n    value 1250\ntitle 2024 电商平台月度 GMV\naxisXTitle 月份\naxisYTitle GMV (亿元)',
  description:
    '柱状图，是一种使用柱形条，对不同类别进行数值比较的统计图表。最基础的柱形图，需要一个分类变量和一个数值变量。在柱状图上，分类变量的每个实体都被表示为一个矩形（通俗讲即为"柱子"），而数值则决定了柱子的高度。',
  knowledge: {
    introduction:
      '柱状图，是一种使用柱形条，对不同类别进行数值比较的统计图表。最基础的柱形图，需要一个分类变量和一个数值变量。在柱状图上，分类变量的每个实体都被表示为一个矩形（通俗讲即为"柱子"），而数值则决定了柱子的高度。',
    useCases: [
      '柱状图最适合对分类的数据进行比较',
      '尤其是当数值比较接近时，由于人眼对于高度的感知优于其他视觉元素（如面积、角度等），因此，使用柱状图更加合适',
    ],
    config: [
      {
        name: 'Configuration Options',
        config: [
          {
            property: 'type',
            type: 'required',
            description: '图表的类型，必填，文本类型，值必须为 "column"。',
          },
          {
            property: 'data',
            type: 'required',
            description: '图表的数据，必填，数组对象类型；',
          },
          {
            property: 'data.category',
            type: 'required',
            description: '数据分类名称，必填，文本类型；',
          },
          {
            property: 'data.value',
            type: 'required',
            description: '数据分类值，必填，数值类型；',
          },
          {
            property: 'data.group',
            type: 'optional',
            description: '数据分组名称，选填，文本类型；',
          },
          {
            property: 'group',
            type: 'optional',
            description: '是否开启分组，开启分组柱形图需数据中含有 group 字段 ，选填，布尔类型。',
          },
          {
            property: 'stack',
            type: 'optional',
            description: '是否开启堆叠，开启堆叠柱形图需数据中含有 group 字段，选填，布尔类型。',
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
        ],
      },
    ],
  },
  examples: [
    {
      title: '2024 电商平台月度 GMV',
      description: '2024 电商平台月度 GMV',
      code: 'vis column\ndata\n  - category 1月\n    value 820\n  - category 2月\n    value 650\n  - category 3月\n    value 780\n  - category 4月\n    value 860\n  - category 5月\n    value 920\n  - category 6月\n    value 1350\n  - category 7月\n    value 890\n  - category 8月\n    value 850\n  - category 9月\n    value 960\n  - category 10月\n    value 1100\n  - category 11月\n    value 2180\n  - category 12月\n    value 1250\ntitle 2024 电商平台月度 GMV\naxisXTitle 月份\naxisYTitle GMV (亿元)',
    },
    {
      title: '六国 GDP 增速对比，自定义颜色',
      description: '六国 GDP 增速对比',
      code: 'vis column\ndata\n  - category 中国\n    value 5.2\n    group 2023\n  - category 中国\n    value 5.0\n    group 2024\n  - category 美国\n    value 2.5\n    group 2023\n  - category 美国\n    value 2.8\n    group 2024\n  - category 日本\n    value 1.9\n    group 2023\n  - category 日本\n    value 1.2\n    group 2024\n  - category 德国\n    value -0.3\n    group 2023\n  - category 德国\n    value 0.4\n    group 2024\n  - category 印度\n    value 7.2\n    group 2023\n  - category 印度\n    value 6.8\n    group 2024\n  - category 韩国\n    value 1.4\n    group 2023\n  - category 韩国\n    value 2.2\n    group 2024\ngroup true\ntitle 六国 GDP 增速对比\naxisXTitle 国家\naxisYTitle GDP增速 (%)\nstyle\n  palette\n    - "#A855F7"\n    - "#38BDF8"\n  backgroundColor "#f8f7ff"',
    },
    {
      title: '各部门季度支出分布，自定义配色',
      description: '各部门季度支出分布',
      code: 'vis column\ndata\n  - category 研发\n    value 380\n    group Q1\n  - category 研发\n    value 420\n    group Q2\n  - category 研发\n    value 450\n    group Q3\n  - category 研发\n    value 500\n    group Q4\n  - category 市场\n    value 250\n    group Q1\n  - category 市场\n    value 300\n    group Q2\n  - category 市场\n    value 280\n    group Q3\n  - category 市场\n    value 350\n    group Q4\n  - category 运营\n    value 200\n    group Q1\n  - category 运营\n    value 220\n    group Q2\n  - category 运营\n    value 240\n    group Q3\n  - category 运营\n    value 260\n    group Q4\n  - category 人力\n    value 180\n    group Q1\n  - category 人力\n    value 190\n    group Q2\n  - category 人力\n    value 200\n    group Q3\n  - category 人力\n    value 210\n    group Q4\nstack true\ntitle 各部门季度支出分布\naxisXTitle 部门\naxisYTitle 支出 (万元)\ntheme academy\nstyle\n  palette\n    - "#C45B42"\n    - "#7D8C6E"\n    - "#D4A373"\n    - "#E9C46A"\n  backgroundColor "#FBF8F4"',
    },
  ],
};
