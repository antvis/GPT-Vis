import { Radar } from 'lucide-react';

export const radarChartData = {
  id: 'radar-chart',
  name: 'Radar Chart',
  icon: Radar,
  galleryExamples:
    'vis radar\ndata\n  - name 沟通能力\n    value 2\n  - name 协作能力\n    value 3\n  - name 领导能力\n    value 2\n  - name 学习能力\n    value 5\n  - name 创新能力\n    value 6\n  - name 技术能力\n    value 9',
  description:
    '雷达图是一种显示多变量数据的图。通常从表同一中心点开始等角度间隔地射出三个以上的轴，每个轴代表一个定量变量，各轴上的点依次连接成线或几何图形。雷达图可以用来在变量间进行对比，或者查看变量中有没有异常值。另外，多幅雷达图之间或者雷达图的多层数据线之间，还可以进行总体数值情况的对比。',
  knowledge: {
    introduction:
      '雷达图是一种显示多变量数据的图。通常从表同一中心点开始等角度间隔地射出三个以上的轴，每个轴代表一个定量变量，各轴上的点依次连接成线或几何图形。雷达图可以用来在变量间进行对比，或者查看变量中有没有异常值。另外，多幅雷达图之间或者雷达图的多层数据线之间，还可以进行总体数值情况的对比。',
    useCases: [
      '某一数据对象由多个特征类别构成，比如食品的营养成分（糖、维生素、矿物质、脂肪、水）。',
      '数据特征类别是有限的，并且都可以进行归一化或者能被离散化。',
    ],
    config: [
      {
        name: 'Configuration Options',
        config: [
          {
            property: 'type',
            type: 'required',
            description: '图表的类型，必填，文本类型，值必须为 "radar"。',
          },
          {
            property: 'data',
            type: 'required',
            description: '图表的数据，必填，数组对象类型；',
          },
          {
            property: 'data.name',
            type: 'required',
            description: '数据分类名称，必填，文本类型；',
          },
          {
            property: 'data.value',
            type: 'required',
            description: '分类的数值大小，必填，数值类型；',
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
            description: '颜色映射，选填 ，数组类型，值为合法的颜色值数组。',
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
        '小明对自己进行能力评估：沟通能力 2 分、协作能力 3 分、领导能力 2 分、学习能力 5 分、创新能力 6 分、技术能力 9 分，用雷达图可视化：',
      description:
        '小明对自己进行能力评估：沟通能力 2 分、协作能力 3 分、领导能力 2 分、学习能力 5 分、创新能力 6 分、技术能力 9 分，用雷达图可视化：',
      code: 'vis radar\ndata\n  - name 沟通能力\n    value 2\n  - name 协作能力\n    value 3\n  - name 领导能力\n    value 2\n  - name 学习能力\n    value 5\n  - name 创新能力\n    value 6\n  - name 技术能力\n    value 9',
    },
    {
      title:
        '某中学进行了第一次模拟考，三年级中 3 个班级的平均成绩为，一班语文 95，数学 96，外语 85，物理 63，化学 91；二班语文 75，数学 93，外语 66，物理 85，化学 88；三班语...',
      description:
        '某中学进行了第一次模拟考，三年级中 3 个班级的平均成绩为，一班语文 95，数学 96，外语 85，物理 63，化学 91；二班语文 75，数学 93，外语 66，物理 85，化学 88；三班语...',
      code: 'vis radar\ndata\n  - name 语文\n    value 95\n    group 一班\n  - name 数学\n    value 96\n    group 一班\n  - name 外语\n    value 85\n    group 一班\n  - name 物理\n    value 63\n    group 一班\n  - name 化学\n    value 91\n    group 一班\n  - name 语文\n    value 75\n    group 二班\n  - name 数学\n    value 93\n    group 二班\n  - name 外语\n    value 66\n    group 二班\n  - name 物理\n    value 85\n    group 二班\n  - name 化学\n    value 88\n    group 二班\n  - name 语文\n    value 86\n    group 三班\n  - name 数学\n    value 76\n    group 三班\n  - name 外语\n    value 96\n    group 三班\n  - name 物理\n    value 93\n    group 三班\n  - name 化学\n    value 67\n    group 三班',
    },
    {
      title:
        '用雷达图可视化我的数据 `[ { "nutrient": "Vitamin C", "score": 7 }, { "nutrient": "Fiber", "score": 6 }, { "n...',
      description:
        '用雷达图可视化我的数据 `[ { "nutrient": "Vitamin C", "score": 7 }, { "nutrient": "Fiber", "score": 6 }, { "n...',
      code: 'vis radar\ndata\n  - name "Vitamin C"\n    value 7\n  - name Fiber\n    value 6\n  - name Sugar\n    value 5\n  - name Protein\n    value 4\n  - name Iron\n    value 3\n  - name Calcium\n    value 2',
    },
  ],
};
