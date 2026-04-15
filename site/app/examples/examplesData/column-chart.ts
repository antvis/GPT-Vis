import { BarChart2 } from 'lucide-react';

export const columnChartData = {
  id: 'column-chart',
  name: 'Column Chart',
  icon: BarChart2,
  galleryExamples:
    'vis column\ndata\n  - category "2015 年"\n    value 80\n  - category "2016 年"\n    value 140\n  - category "2017 年"\n    value 220\naxisXTitle 年份\naxisYTitle "金额 （百万元）"',
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
      title:
        '海底捞公司外卖收入的变化，2015 年收入金额 80 百万元，2016 年收入金额 140 百万元，2017 年收入金额 220 百万元。用柱形图可视化。',
      description:
        '海底捞公司外卖收入的变化，2015 年收入金额 80 百万元，2016 年收入金额 140 百万元，2017 年收入金额 220 百万元。用柱形图可视化。',
      code: 'vis column\ndata\n  - category "2015 年"\n    value 80\n  - category "2016 年"\n    value 140\n  - category "2017 年"\n    value 220\ntitle 海底捞公司外卖收入\naxisXTitle 年份\naxisYTitle "金额 （百万元）"',
    },
    {
      title:
        '用柱形图可视化我的数据 [{ "title": "第一产业","industrial": 7200.0 },{ "title": "第二产业", "industrial": 36600.0 },...',
      description:
        '用柱形图可视化我的数据 [{ "title": "第一产业","industrial": 7200.0 },{ "title": "第二产业", "industrial": 36600.0 },...',
      code: 'vis column\ndata\n  - category 第一产业\n    value 7200.0\n  - category 第二产业\n    value 36600.0\n  - category 第三产业\n    value 41000.0\naxisXTitle title\naxisYTitle industrial',
    },
    {
      title:
        '主要城市油车与新能源汽车的售卖量对比，北京分别是 825.6 万辆 与 60.2 万辆，上海分别是 450 万辆 与 95 万辆，深圳分别是 506 万辆 与 76.7 万辆，广州分别是 976...',
      description:
        '主要城市油车与新能源汽车的售卖量对比，北京分别是 825.6 万辆 与 60.2 万辆，上海分别是 450 万辆 与 95 万辆，深圳分别是 506 万辆 与 76.7 万辆，广州分别是 976...',
      code: 'vis column\ndata\n  - category 北京\n    value 825.6\n    group 油车\n  - category 北京\n    value 60.2\n    group 新能源汽车\n  - category 上海\n    value 450\n    group 油车\n  - category 上海\n    value 95\n    group 新能源汽车\n  - category 深圳\n    value 506\n    group 油车\n  - category 深圳\n    value 76.7\n    group 新能源汽车\n  - category 广州\n    value 976.6\n    group 油车\n  - category 广州\n    value 97.2\n    group 新能源汽车\n  - category 杭州\n    value 651.2\n    group 油车\n  - category 杭州\n    value 62\n    group 新能源汽车\ngroup true\ntitle 油车与新能源汽车售卖量\naxisXTitle 城市\naxisYTitle "售卖量 （万辆）"',
    },
  ],
};
