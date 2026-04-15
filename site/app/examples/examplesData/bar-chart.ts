import { BarChartHorizontal } from 'lucide-react';
export const barChartData = {
  id: 'bar-chart',
  name: 'Bar Chart',
  icon: BarChartHorizontal,
  galleryExamples:
    'vis bar\ndata\n  - category "2015 年"\n    value 80\n  - category "2016 年"\n    value 140\n  - category "2017 年"\n    value 220\naxisXTitle 年份\naxisYTitle "金额 （百万元）"',
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
      title:
        '海底捞公司外卖收入的变化，2015 年收入金额 80 百万元，2016 年收入金额 140 百万元，2017 年收入金额 220 百万元。用条形图可视化。',
      description:
        '海底捞公司外卖收入的变化，2015 年收入金额 80 百万元，2016 年收入金额 140 百万元，2017 年收入金额 220 百万元。用条形图可视化。',
      code: 'vis bar\ndata\n  - category "2015 年"\n    value 80\n  - category "2016 年"\n    value 140\n  - category "2017 年"\n    value 220\ntitle 海底捞公司外卖收入\naxisXTitle 年份\naxisYTitle "金额 （百万元）"',
    },
    {
      title:
        '用条形图可视化我的数据 [{ "name": "第一产业","industrial": 7200.0 },{ "name": "第二产业", "industrial": 36600.0 },{ ...',
      description:
        '用条形图可视化我的数据 [{ "name": "第一产业","industrial": 7200.0 },{ "name": "第二产业", "industrial": 36600.0 },{ ...',
      code: 'vis bar\ndata\n  - category 第一产业\n    value 7200.0\n  - category 第二产业\n    value 36600.0\n  - category 第三产业\n    value 41000.0\naxisXTitle name\naxisYTitle industrial',
    },
    {
      title:
        '主要城市油车与新能源汽车的售卖量对比，北京分别是 825.6 万辆 与 60.2 万辆，上海分别是 450 万辆 与 95 万辆，深圳分别是 506 万辆 与 76.7 万辆，广州分别是 976...',
      description:
        '主要城市油车与新能源汽车的售卖量对比，北京分别是 825.6 万辆 与 60.2 万辆，上海分别是 450 万辆 与 95 万辆，深圳分别是 506 万辆 与 76.7 万辆，广州分别是 976...',
      code: 'vis bar\ndata\n  - category 北京\n    value 825.6\n    group 油车\n  - category 北京\n    value 60.2\n    group 新能源汽车\n  - category 上海\n    value 450\n    group 油车\n  - category 上海\n    value 95\n    group 新能源汽车\n  - category 深圳\n    value 506\n    group 油车\n  - category 深圳\n    value 76.7\n    group 新能源汽车\n  - category 广州\n    value 976.6\n    group 油车\n  - category 广州\n    value 97.2\n    group 新能源汽车\n  - category 杭州\n    value 651.2\n    group 油车\n  - category 杭州\n    value 62\n    group 新能源汽车\ngroup true\ntitle 油车与新能源汽车售卖量\naxisXTitle 城市\naxisYTitle "售卖量 （万辆）"',
    },
  ],
};
