import { PieChart } from 'lucide-react';

export const pieChartData = {
  id: 'pie-chart',
  name: 'Pie Chart',
  icon: PieChart,
  galleryExamples:
    'vis pie\ndata\n  - category 火锅\n    value 22\n  - category 自助餐\n    value 12\n  - category 小吃快餐\n    value 8\n  - category 西餐\n    value 6\n  - category 其它\n    value 44',
  description:
    '饼图，是一个划分为几个扇形的圆形统计图表。在饼图中，每个扇形的弧长（以及圆心角和面积）大小，表示该种类占总体的比例，且这些扇形合在一起刚好是一个完全的圆形。 饼图最显著的功能在于表现"占比"。习惯上，人们也用饼图来比较扇形的大小，从而获得对数据的认知。但是，由于人类对"角度"的感知力并不如"长度"，在需要准确的表达数值（尤其是当数值接近、或数值很多）时，饼图常常不能胜任，建议用柱状图代替。 从数据来看，饼图一般需要一个分类数据字段、一个连续数据字段。值得注意的是，分类字段的数据，在图表使用的语境下，应当构成一个整体（例如一班、二班、三班，构成了整个高一年级），而不能是独立、无关的。',
  knowledge: {
    introduction:
      '饼图，是一个划分为几个扇形的圆形统计图表。在饼图中，每个扇形的弧长（以及圆心角和面积）大小，表示该种类占总体的比例，且这些扇形合在一起刚好是一个完全的圆形。 饼图最显著的功能在于表现"占比"。习惯上，人们也用饼图来比较扇形的大小，从而获得对数据的认知。但是，由于人类对"角度"的感知力并不如"长度"，在需要准确的表达数值（尤其是当数值接近、或数值很多）时，饼图常常不能胜任，建议用柱状图代替。 从数据来看，饼图一般需要一个分类数据字段、一个连续数据字段。值得注意的是，分类字段的数据，在图表使用的语境下，应当构成一个整体（例如一班、二班、三班，构成了整个高一年级），而不能是独立、无关的。',
    useCases: [
      '用于显示组成部分的比例，如市场份额、预算分配等',
      '想要突出表示某个部分在整体中所占比例',
    ],
    config: [
      {
        name: 'Configuration Options',
        config: [
          {
            property: 'type',
            type: 'required',
            description: '图表的类型，必填，文本类型，值必须为 "pie"。',
          },
          {
            property: 'data',
            type: 'required',
            description: '图表的数据，必填，数组对象类型；',
          },
          {
            property: 'data.category',
            type: 'required',
            description: '数据分类的名称，必填，文本类型；',
          },
          {
            property: 'data.value',
            type: 'required',
            description: '数据的值，必填，数值类型，不可以使用百分比数字；',
          },
          {
            property: 'innerRadius',
            type: 'optional',
            description: '将饼图设置为环图，选填，数值类型，当需要开启为环图时，可设置值为 0.6。',
          },
          {
            property: 'title',
            type: 'optional',
            description: '图表的标题，选填，文本类型。',
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
      title:
        '我国的餐饮业营收额中，火锅占到 22%，其次是自助餐（12%）、川菜（8%）、小吃快餐（8%）、西餐（6%）、其它（44%）。用饼图可视化。',
      description:
        '我国的餐饮业营收额中，火锅占到 22%，其次是自助餐（12%）、川菜（8%）、小吃快餐（8%）、西餐（6%）、其它（44%）。用饼图可视化。',
      code: 'vis pie\ndata\n  - category 火锅\n    value 22\n  - category 自助餐\n    value 12\n  - category 小吃快餐\n    value 8\n  - category 西餐\n    value 6\n  - category 其它\n    value 44\ntitle 餐饮业营收额占比',
    },
    {
      title:
        '全国人口中居住在城镇的人口占比为 63.89%，居住在乡村的人口占比为 36.11%。用环图可视化。',
      description:
        '全国人口中居住在城镇的人口占比为 63.89%，居住在乡村的人口占比为 36.11%。用环图可视化。',
      code: 'vis pie\ndata\n  - category 城镇人口\n    value 63.89\n  - category 乡村人口\n    value 36.11\ninnerRadius 0.6\ntitle 全国人口居住对比',
    },
    {
      title:
        '用饼图可视化我的数据 [{ "name": "第一产业","industrial": 7200.0 },{ "name": "第二产业", "industrial": 36600.0 },{ "...',
      description:
        '用饼图可视化我的数据 [{ "name": "第一产业","industrial": 7200.0 },{ "name": "第二产业", "industrial": 36600.0 },{ "...',
      code: 'vis pie\ndata\n  - category 第一产业\n    value 7200.0\n  - category 第二产业\n    value 36600.0\n  - category 第三产业\n    value 41000.0',
    },
  ],
};
