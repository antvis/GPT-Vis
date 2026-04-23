import { PieChart } from 'lucide-react';

export const pieChartData = {
  id: 'pie-chart',
  name: 'Pie Chart',
  icon: PieChart,
  galleryExamples:
    'vis pie\ndata\n  - category Android\n    value 72\n  - category iOS\n    value 27\n  - category 其他\n    value 1\ntitle 手机系统市场份额',
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
      title: '2024 年全球手机操作系统市场份额',
      description: '2024 年全球手机操作系统市场份额',
      code: 'vis pie\ndata\n  - category Android\n    value 71.8\n  - category iOS\n    value 27.2\n  - category HarmonyOS\n    value 0.6\n  - category Others\n    value 0.4\ntitle 2024 全球手机操作系统市场份额',
    },
    {
      title: '企业 IT 预算分配（环形图，自定义颜色）',
      description: '企业 IT 预算分配（环形图）',
      code: 'vis pie\ndata\n  - category 云服务\n    value 35\n  - category 网络安全\n    value 22\n  - category 软件许可\n    value 20\n  - category 硬件维护\n    value 15\n  - category 技术支持\n    value 8\ninnerRadius 0.6\ntitle 企业 IT 预算分配\nstyle\n  palette\n    - "#A855F7"\n    - "#38BDF8"\n    - "#F9A8D4"\n    - "#34D399"\n    - "#818CF8"\n  backgroundColor "#f8f7ff"',
    },
    {
      title: '全球能源消费结构，自定义配色',
      description: '全球能源消费结构',
      code: 'vis pie\ndata\n  - category 石油\n    value 31\n  - category 天然气\n    value 24\n  - category 煤炭\n    value 27\n  - category 核能\n    value 4\n  - category 水电\n    value 7\n  - category 风能\n    value 4\n  - category 太阳能\n    value 3\ntitle 全球能源消费结构\ntheme academy\nstyle\n  palette\n    - "#C45B42"\n    - "#7D8C6E"\n    - "#D4A373"\n    - "#E9C46A"\n    - "#A98467"\n    - "#8B9A46"\n    - "#CB997E"\n  backgroundColor "#FBF8F4"',
    },
  ],
};
