import { BarChartHorizontal } from 'lucide-react';
export const barChartData = {
  id: 'bar-chart',
  name: 'Bar Chart',
  icon: BarChartHorizontal,
  galleryExamples:
    'vis bar\ndata\n  - category Python\n    value 28.1\n  - category JavaScript\n    value 18.5\n  - category Java\n    value 15.6\n  - category "C/C++"\n    value 12.3\n  - category TypeScript\n    value 8.2\n  - category Go\n    value 5.7\n  - category Rust\n    value 3.8\n  - category Kotlin\n    value 2.9\ntitle 2024 全球编程语言流行度\naxisXTitle 流行度指数\naxisYTitle 编程语言',
  description:
    '条形图是一种使用水平矩形条对不同类别进行数值比较的统计图表。与柱状图不同的是，条形图的矩形条是从左到右排列的，而不是从下到上。条形图同样需要一个分类变量和一个数值变量。在条形图上，分类变量的每个实体被表示为一个水平矩形条，而数值决定了矩形条的长度。',
  knowledge: {
    introduction:
      '条形图是一种使用水平矩形条对不同类别进行数值比较的统计图表。与柱状图不同的是，条形图的矩形条是从左到右排列的，而不是从下到上。条形图同样需要一个分类变量和一个数值变量。在条形图上，分类变量的每个实体被表示为一个水平矩形条，而数值决定了矩形条的长度。',
    useCases: [
      '条形图适合对分类数据进行比较，尤其是在分类名称较长，或当分类项数量较多的情况下，由于条形图的水平排列更便于显示这些类别',
      '此外，条形图也更适合横向对比',
    ],
    config: [
      {
        name: 'Configuration Options',
        config: [
          {
            property: 'type',
            type: 'required',
            description: '图表的类型，必填，文本类型，值必须为 "bar"。',
          },
          {
            property: 'data',
            type: 'required',
            description: '图表的数据，必填，数组对象类型；',
          },
          {
            property: 'data.category',
            type: 'required',
            description: '数据分类名称，必填，文本或数值类型；',
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
            description: '是否开启分组，开启分组条形图需数据中含有 group 字段 ，选填，布尔类型。',
          },
          {
            property: 'stack',
            type: 'optional',
            description: '是否开启堆叠，开启堆叠条形图需数据中含有 group 字段，选填，布尔类型。',
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
      title: '2024 全球编程语言流行度',
      description: '2024 全球编程语言流行度',
      code: 'vis bar\ndata\n  - category Python\n    value 28.1\n  - category JavaScript\n    value 18.5\n  - category Java\n    value 15.6\n  - category "C/C++"\n    value 12.3\n  - category TypeScript\n    value 8.2\n  - category Go\n    value 5.7\n  - category Rust\n    value 3.8\n  - category Kotlin\n    value 2.9\ntitle 2024 全球编程语言流行度\naxisXTitle 流行度指数\naxisYTitle 编程语言',
    },
    {
      title: '五大行业季度营收对比，自定义颜色',
      description: '五大行业季度营收对比',
      code: 'vis bar\ndata\n  - category 科技\n    value 320\n    group Q1\n  - category 科技\n    value 380\n    group Q2\n  - category 科技\n    value 420\n    group Q3\n  - category 科技\n    value 490\n    group Q4\n  - category 金融\n    value 280\n    group Q1\n  - category 金融\n    value 310\n    group Q2\n  - category 金融\n    value 350\n    group Q3\n  - category 金融\n    value 370\n    group Q4\n  - category 医疗\n    value 200\n    group Q1\n  - category 医疗\n    value 230\n    group Q2\n  - category 医疗\n    value 260\n    group Q3\n  - category 医疗\n    value 290\n    group Q4\n  - category 教育\n    value 150\n    group Q1\n  - category 教育\n    value 170\n    group Q2\n  - category 教育\n    value 190\n    group Q3\n  - category 教育\n    value 210\n    group Q4\n  - category 能源\n    value 250\n    group Q1\n  - category 能源\n    value 240\n    group Q2\n  - category 能源\n    value 260\n    group Q3\n  - category 能源\n    value 280\n    group Q4\ngroup true\ntitle 五大行业季度营收对比\naxisXTitle 营收 (亿元)\naxisYTitle 行业\nstyle\n  palette\n    - "#A855F7"\n    - "#38BDF8"\n    - "#F9A8D4"\n    - "#34D399"\n  backgroundColor "#f8f7ff"',
    },
    {
      title: '各区域产品线销售额，自定义配色',
      description: '各区域产品线销售额',
      code: 'vis bar\ndata\n  - category 华东\n    value 450\n    group 电子产品\n  - category 华东\n    value 320\n    group 服装\n  - category 华东\n    value 280\n    group 食品\n  - category 华东\n    value 180\n    group 家居\n  - category 华东\n    value 120\n    group 运动\n  - category 华南\n    value 380\n    group 电子产品\n  - category 华南\n    value 290\n    group 服装\n  - category 华南\n    value 350\n    group 食品\n  - category 华南\n    value 150\n    group 家居\n  - category 华南\n    value 200\n    group 运动\n  - category 华北\n    value 420\n    group 电子产品\n  - category 华北\n    value 250\n    group 服装\n  - category 华北\n    value 300\n    group 食品\n  - category 华北\n    value 200\n    group 家居\n  - category 华北\n    value 160\n    group 运动\nstack true\ntitle 各区域产品线销售额\naxisXTitle 销售额 (万元)\naxisYTitle 区域\ntheme academy\nstyle\n  palette\n    - "#C45B42"\n    - "#7D8C6E"\n    - "#D4A373"\n    - "#E9C46A"\n    - "#A98467"\n  backgroundColor "#FBF8F4"',
    },
  ],
};
