import { Activity } from 'lucide-react';

export const violinChartData = {
  id: 'violin-chart',
  name: 'Violin Chart',
  icon: Activity,
  galleryExamples:
    'vis violin\ndata\n  - category "I. setosa"\n    value 5.1\n  - category "I. setosa"\n    value 4.9\n  - category "I. setosa"\n    value 4.7\n  - category "I. setosa"\n    value 4.6\n  - category "I. setosa"\n    value 5.0\n  - category "I. setosa"\n    value 5.4\n  - category "I. setosa"\n    value 4.6\n  - category "I. setosa"\n    value 5.0\n  - category "I. setosa"\n    value 4.4\n  - category "I. setosa"\n    value 4.9\n  - category "I. setosa"\n    value 5.4\n  - category "I. setosa"\n    value 4.8\n  - category "I. setosa"\n    value 4.8\n  - category "I. setosa"\n    value 4.3\n  - category "I. setosa"\n    value 5.8\n  - category "I. versicolor"\n    value 7.0\n  - category "I. versicolor"\n    value 6.4\n  - category "I. versicolor"\n    value 6.9\n  - category "I. versicolor"\n    value 5.5\n  - category "I. versicolor"\n    value 6.5\n  - category "I. versicolor"\n    value 5.7\n  - category "I. versicolor"\n    value 6.3\n  - category "I. versicolor"\n    value 4.9\n  - category "I. versicolor"\n    value 6.6\n  - category "I. versicolor"\n    value 5.2\n  - category "I. versicolor"\n    value 5.0\n  - category "I. versicolor"\n    value 5.9\n  - category "I. versicolor"\n    value 6.0\n  - category "I. versicolor"\n    value 6.1\n  - category "I. virginica"\n    value 6.3\n  - category "I. virginica"\n    value 5.8\n  - category "I. virginica"\n    value 7.1\n  - category "I. virginica"\n    value 6.3\n  - category "I. virginica"\n    value 6.5\n  - category "I. virginica"\n    value 7.6\n  - category "I. virginica"\n    value 4.9\n  - category "I. virginica"\n    value 7.3\n  - category "I. virginica"\n    value 6.7\n  - category "I. virginica"\n    value 7.2\n  - category "I. virginica"\n    value 6.5\n  - category "I. virginica"\n    value 6.4\n  - category "I. virginica"\n    value 6.8\n  - category "I. virginica"\n    value 5.7\naxisYTitle 萼片长度（cm）',
  description:
    '小提琴图是一种用于展示数据分布和概率密度的统计图表。通过对称的密度曲线展示数据的分布形态，同时可结合箱线图元素显示中位数和四分位数。适合直观比较不同组数据的分布和密度特征。',
  knowledge: {
    introduction:
      '小提琴图是一种用于展示数据分布和概率密度的统计图表。通过对称的密度曲线展示数据的分布形态，同时可结合箱线图元素显示中位数和四分位数。适合直观比较不同组数据的分布和密度特征。',
    useCases: [
      '用于展示一组或多组数据的分布和密度情况，如成绩分布、实验结果、金融数据等',
      '适合突出数据的分布形态、集中趋势及异常值',
    ],
    config: [
      {
        name: 'Configuration Options',
        config: [
          {
            property: 'type',
            type: 'required',
            description: '图表类型，必填，文本类型，值为 "violin"。',
          },
          {
            property: 'data',
            type: 'required',
            description: '小提琴图数据，必填，数组类型。',
          },
          {
            property: 'data.category',
            type: 'required',
            description: '数据分类名称，必填，文本类型。',
          },
          {
            property: 'data.value',
            type: 'required',
            description: '数据分类值，必填，数值类型。',
          },
          {
            property: 'data.group',
            type: 'optional',
            description: '数据分组名称，选填，文本类型，用于多组数据对比。',
          },
          {
            property: 'title',
            type: 'optional',
            description: '图表标题，选填，文本类型。',
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
            property: 'style.plette',
            type: 'optional',
            description: '颜色映射，选填，数组类型，合法颜色值数组。',
          },
          {
            property: 'style.backgroundColor',
            type: 'optional',
            description: '背景颜色，选填，文本类型，合法颜色值。',
          },
        ],
      },
    ],
  },
  examples: [
    {
      title:
        '鸢尾花萼片长度分布（按种类分组）：I. setosa、I. versicolor、I. virginica 三种鸢尾花萼片长度（cm）分布对比。',
      description:
        '鸢尾花萼片长度分布（按种类分组）：I. setosa、I. versicolor、I. virginica 三种鸢尾花萼片长度（cm）分布对比。',
      code: 'vis violin\ndata\n  - category "I. setosa"\n    value 5.1\n  - category "I. setosa"\n    value 4.9\n  - category "I. setosa"\n    value 4.7\n  - category "I. setosa"\n    value 4.6\n  - category "I. setosa"\n    value 5.0\n  - category "I. setosa"\n    value 5.4\n  - category "I. setosa"\n    value 4.6\n  - category "I. setosa"\n    value 5.0\n  - category "I. setosa"\n    value 4.4\n  - category "I. setosa"\n    value 4.9\n  - category "I. setosa"\n    value 5.4\n  - category "I. setosa"\n    value 4.8\n  - category "I. setosa"\n    value 4.8\n  - category "I. setosa"\n    value 4.3\n  - category "I. setosa"\n    value 5.8\n  - category "I. versicolor"\n    value 7.0\n  - category "I. versicolor"\n    value 6.4\n  - category "I. versicolor"\n    value 6.9\n  - category "I. versicolor"\n    value 5.5\n  - category "I. versicolor"\n    value 6.5\n  - category "I. versicolor"\n    value 5.7\n  - category "I. versicolor"\n    value 6.3\n  - category "I. versicolor"\n    value 4.9\n  - category "I. versicolor"\n    value 6.6\n  - category "I. versicolor"\n    value 5.2\n  - category "I. versicolor"\n    value 5.0\n  - category "I. versicolor"\n    value 5.9\n  - category "I. versicolor"\n    value 6.0\n  - category "I. versicolor"\n    value 6.1\n  - category "I. virginica"\n    value 6.3\n  - category "I. virginica"\n    value 5.8\n  - category "I. virginica"\n    value 7.1\n  - category "I. virginica"\n    value 6.3\n  - category "I. virginica"\n    value 6.5\n  - category "I. virginica"\n    value 7.6\n  - category "I. virginica"\n    value 4.9\n  - category "I. virginica"\n    value 7.3\n  - category "I. virginica"\n    value 6.7\n  - category "I. virginica"\n    value 7.2\n  - category "I. virginica"\n    value 6.5\n  - category "I. virginica"\n    value 6.4\n  - category "I. virginica"\n    value 6.8\n  - category "I. virginica"\n    value 5.7\ntitle 鸢尾花萼片长度分布\naxisYTitle 萼片长度（cm）',
    },
    {
      title:
        '鸢尾花花瓣长度分布（按种类分组）：I. setosa、I. versicolor、I. virginica 三种鸢尾花花瓣长度（cm）分布对比，主题为 dark。',
      description:
        '鸢尾花花瓣长度分布（按种类分组）：I. setosa、I. versicolor、I. virginica 三种鸢尾花花瓣长度（cm）分布对比，主题为 dark。',
      code: 'vis violin\ndata\n  - category "I. setosa"\n    value 1.4\n  - category "I. setosa"\n    value 1.4\n  - category "I. setosa"\n    value 1.3\n  - category "I. setosa"\n    value 1.5\n  - category "I. setosa"\n    value 1.4\n  - category "I. setosa"\n    value 1.7\n  - category "I. setosa"\n    value 1.4\n  - category "I. setosa"\n    value 1.5\n  - category "I. setosa"\n    value 1.4\n  - category "I. setosa"\n    value 1.5\n  - category "I. setosa"\n    value 1.5\n  - category "I. setosa"\n    value 1.6\n  - category "I. setosa"\n    value 1.4\n  - category "I. setosa"\n    value 1.1\n  - category "I. setosa"\n    value 1.2\n  - category "I. versicolor"\n    value 4.7\n  - category "I. versicolor"\n    value 4.5\n  - category "I. versicolor"\n    value 4.9\n  - category "I. versicolor"\n    value 4.0\n  - category "I. versicolor"\n    value 4.6\n  - category "I. versicolor"\n    value 4.5\n  - category "I. versicolor"\n    value 4.7\n  - category "I. versicolor"\n    value 3.3\n  - category "I. versicolor"\n    value 4.6\n  - category "I. versicolor"\n    value 3.9\n  - category "I. versicolor"\n    value 3.5\n  - category "I. versicolor"\n    value 4.2\n  - category "I. versicolor"\n    value 4.0\n  - category "I. versicolor"\n    value 4.7\n  - category "I. virginica"\n    value 6.0\n  - category "I. virginica"\n    value 5.1\n  - category "I. virginica"\n    value 5.9\n  - category "I. virginica"\n    value 5.6\n  - category "I. virginica"\n    value 5.8\n  - category "I. virginica"\n    value 6.6\n  - category "I. virginica"\n    value 4.5\n  - category "I. virginica"\n    value 6.3\n  - category "I. virginica"\n    value 5.8\n  - category "I. virginica"\n    value 6.1\n  - category "I. virginica"\n    value 5.1\n  - category "I. virginica"\n    value 5.3\n  - category "I. virginica"\n    value 5.5\n  - category "I. virginica"\n    value 5.0\ntitle 鸢尾花花瓣长度分布\naxisYTitle 花瓣长度（cm）\ntheme dark',
    },
    {
      title:
        '鸢尾花花瓣宽度分布（按种类分组）：I. setosa、I. versicolor、I. virginica 三种鸢尾花花瓣宽度（cm）分布，自定义调色板和背景色。',
      description:
        '鸢尾花花瓣宽度分布（按种类分组）：I. setosa、I. versicolor、I. virginica 三种鸢尾花花瓣宽度（cm）分布，自定义调色板和背景色。',
      code: 'vis violin\ndata\n  - category "I. setosa"\n    value 0.2\n  - category "I. setosa"\n    value 0.2\n  - category "I. setosa"\n    value 0.2\n  - category "I. setosa"\n    value 0.2\n  - category "I. setosa"\n    value 0.2\n  - category "I. setosa"\n    value 0.4\n  - category "I. setosa"\n    value 0.3\n  - category "I. setosa"\n    value 0.2\n  - category "I. setosa"\n    value 0.2\n  - category "I. setosa"\n    value 0.1\n  - category "I. setosa"\n    value 0.2\n  - category "I. setosa"\n    value 0.2\n  - category "I. setosa"\n    value 0.3\n  - category "I. versicolor"\n    value 1.4\n  - category "I. versicolor"\n    value 1.5\n  - category "I. versicolor"\n    value 1.5\n  - category "I. versicolor"\n    value 1.3\n  - category "I. versicolor"\n    value 1.5\n  - category "I. versicolor"\n    value 1.3\n  - category "I. versicolor"\n    value 1.6\n  - category "I. versicolor"\n    value 1.0\n  - category "I. versicolor"\n    value 1.3\n  - category "I. versicolor"\n    value 1.4\n  - category "I. versicolor"\n    value 1.0\n  - category "I. versicolor"\n    value 1.5\n  - category "I. virginica"\n    value 2.5\n  - category "I. virginica"\n    value 1.9\n  - category "I. virginica"\n    value 2.1\n  - category "I. virginica"\n    value 1.8\n  - category "I. virginica"\n    value 2.2\n  - category "I. virginica"\n    value 2.1\n  - category "I. virginica"\n    value 1.7\n  - category "I. virginica"\n    value 1.8\n  - category "I. virginica"\n    value 1.8\n  - category "I. virginica"\n    value 2.5\n  - category "I. virginica"\n    value 2.0\n  - category "I. virginica"\n    value 1.9\ntitle 鸢尾花花瓣宽度分布\naxisYTitle 花瓣宽度（cm）\nstyle\n  palette\n    - #FF9800\n    - #2196F3\n    - #4CAF50\n  backgroundColor #1a1a2e',
    },
  ],
};
