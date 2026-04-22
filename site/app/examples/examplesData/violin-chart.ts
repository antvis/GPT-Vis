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
            property: 'style.palette',
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
      title: '鸢尾花萼片长度分布（按种类分组）',
      description:
        '鸢尾花萼片长度分布（按种类分组）：I. setosa、I. versicolor、I. virginica 三种鸢尾花萼片长度（cm）分布对比。',
      code: 'vis violin\ndata\n  - category "I. setosa"\n    value 5.1\n  - category "I. setosa"\n    value 4.9\n  - category "I. setosa"\n    value 4.7\n  - category "I. setosa"\n    value 4.6\n  - category "I. setosa"\n    value 5.0\n  - category "I. setosa"\n    value 5.4\n  - category "I. setosa"\n    value 4.6\n  - category "I. setosa"\n    value 5.0\n  - category "I. setosa"\n    value 4.4\n  - category "I. setosa"\n    value 4.9\n  - category "I. setosa"\n    value 5.4\n  - category "I. setosa"\n    value 4.8\n  - category "I. setosa"\n    value 4.8\n  - category "I. setosa"\n    value 4.3\n  - category "I. setosa"\n    value 5.8\n  - category "I. versicolor"\n    value 7.0\n  - category "I. versicolor"\n    value 6.4\n  - category "I. versicolor"\n    value 6.9\n  - category "I. versicolor"\n    value 5.5\n  - category "I. versicolor"\n    value 6.5\n  - category "I. versicolor"\n    value 5.7\n  - category "I. versicolor"\n    value 6.3\n  - category "I. versicolor"\n    value 4.9\n  - category "I. versicolor"\n    value 6.6\n  - category "I. versicolor"\n    value 5.2\n  - category "I. versicolor"\n    value 5.0\n  - category "I. versicolor"\n    value 5.9\n  - category "I. versicolor"\n    value 6.0\n  - category "I. versicolor"\n    value 6.1\n  - category "I. virginica"\n    value 6.3\n  - category "I. virginica"\n    value 5.8\n  - category "I. virginica"\n    value 7.1\n  - category "I. virginica"\n    value 6.3\n  - category "I. virginica"\n    value 6.5\n  - category "I. virginica"\n    value 7.6\n  - category "I. virginica"\n    value 4.9\n  - category "I. virginica"\n    value 7.3\n  - category "I. virginica"\n    value 6.7\n  - category "I. virginica"\n    value 7.2\n  - category "I. virginica"\n    value 6.5\n  - category "I. virginica"\n    value 6.4\n  - category "I. virginica"\n    value 6.8\n  - category "I. virginica"\n    value 5.7\ntitle 鸢尾花萼片长度分布\naxisYTitle 萼片长度（cm）',
    },
    {
      title: '四城市气温分布：北京、上海、广州、哈尔滨各 30 个气温样本，自定义颜色',
      description: '四城市气温分布：北京、上海、广州、哈尔滨各 30 个气温样本',
      code: 'vis violin\ndata\n  - category 北京\n    value -2\n  - category 北京\n    value 5\n  - category 北京\n    value 15\n  - category 北京\n    value 25\n  - category 北京\n    value 30\n  - category 北京\n    value 28\n  - category 北京\n    value 20\n  - category 北京\n    value 10\n  - category 北京\n    value 0\n  - category 北京\n    value -5\n  - category 北京\n    value 8\n  - category 北京\n    value 18\n  - category 北京\n    value 26\n  - category 北京\n    value 32\n  - category 北京\n    value 22\n  - category 北京\n    value 12\n  - category 北京\n    value 3\n  - category 北京\n    value -3\n  - category 北京\n    value 16\n  - category 北京\n    value 27\n  - category 北京\n    value 29\n  - category 北京\n    value 14\n  - category 北京\n    value 6\n  - category 北京\n    value -1\n  - category 北京\n    value 24\n  - category 北京\n    value 19\n  - category 北京\n    value 9\n  - category 北京\n    value 1\n  - category 北京\n    value 31\n  - category 北京\n    value 21\n  - category 上海\n    value 5\n  - category 上海\n    value 10\n  - category 上海\n    value 18\n  - category 上海\n    value 25\n  - category 上海\n    value 30\n  - category 上海\n    value 28\n  - category 上海\n    value 22\n  - category 上海\n    value 15\n  - category 上海\n    value 8\n  - category 上海\n    value 2\n  - category 上海\n    value 12\n  - category 上海\n    value 20\n  - category 上海\n    value 27\n  - category 上海\n    value 32\n  - category 上海\n    value 24\n  - category 上海\n    value 16\n  - category 上海\n    value 7\n  - category 上海\n    value 3\n  - category 上海\n    value 19\n  - category 上海\n    value 26\n  - category 上海\n    value 29\n  - category 上海\n    value 14\n  - category 上海\n    value 9\n  - category 上海\n    value 4\n  - category 上海\n    value 23\n  - category 上海\n    value 21\n  - category 上海\n    value 11\n  - category 上海\n    value 6\n  - category 上海\n    value 31\n  - category 上海\n    value 17\n  - category 广州\n    value 15\n  - category 广州\n    value 18\n  - category 广州\n    value 22\n  - category 广州\n    value 27\n  - category 广州\n    value 30\n  - category 广州\n    value 29\n  - category 广州\n    value 25\n  - category 广州\n    value 20\n  - category 广州\n    value 16\n  - category 广州\n    value 12\n  - category 广州\n    value 19\n  - category 广州\n    value 23\n  - category 广州\n    value 28\n  - category 广州\n    value 31\n  - category 广州\n    value 26\n  - category 广州\n    value 21\n  - category 广州\n    value 17\n  - category 广州\n    value 13\n  - category 广州\n    value 24\n  - category 广州\n    value 27\n  - category 广州\n    value 30\n  - category 广州\n    value 20\n  - category 广州\n    value 16\n  - category 广州\n    value 14\n  - category 广州\n    value 25\n  - category 广州\n    value 22\n  - category 广州\n    value 18\n  - category 广州\n    value 15\n  - category 广州\n    value 32\n  - category 广州\n    value 19\n  - category 哈尔滨\n    value -18\n  - category 哈尔滨\n    value -10\n  - category 哈尔滨\n    value 0\n  - category 哈尔滨\n    value 12\n  - category 哈尔滨\n    value 22\n  - category 哈尔滨\n    value 25\n  - category 哈尔滨\n    value 18\n  - category 哈尔滨\n    value 5\n  - category 哈尔滨\n    value -8\n  - category 哈尔滨\n    value -20\n  - category 哈尔滨\n    value -5\n  - category 哈尔滨\n    value 8\n  - category 哈尔滨\n    value 15\n  - category 哈尔滨\n    value 24\n  - category 哈尔滨\n    value 20\n  - category 哈尔滨\n    value 2\n  - category 哈尔滨\n    value -12\n  - category 哈尔滨\n    value -15\n  - category 哈尔滨\n    value 10\n  - category 哈尔滨\n    value 23\n  - category 哈尔滨\n    value 26\n  - category 哈尔滨\n    value 16\n  - category 哈尔滨\n    value -3\n  - category 哈尔滨\n    value -8\n  - category 哈尔滨\n    value -22\n  - category 哈尔滨\n    value 14\n  - category 哈尔滨\n    value 6\n  - category 哈尔滨\n    value -2\n  - category 哈尔滨\n    value 19\n  - category 哈尔滨\n    value 21\n  - category 哈尔滨\n    value 3\ntitle 四城市气温分布\naxisYTitle 气温 (°C)\nstyle\n  palette\n    - "#A855F7"\n    - "#38BDF8"\n    - "#F9A8D4"\n    - "#34D399"\n  backgroundColor "#f8f7ff"',
    },
    {
      title: '三种作物产量分布：水稻、小麦、玉米各 25 个产量样本，自定义配色',
      description: '三种作物产量分布：水稻、小麦、玉米各 25 个产量样本',
      code: 'vis violin\ndata\n  - category 水稻\n    value 680\n  - category 水稻\n    value 720\n  - category 水稻\n    value 750\n  - category 水稻\n    value 690\n  - category 水稻\n    value 710\n  - category 水稻\n    value 760\n  - category 水稻\n    value 700\n  - category 水稻\n    value 730\n  - category 水稻\n    value 670\n  - category 水稻\n    value 740\n  - category 水稻\n    value 690\n  - category 水稻\n    value 720\n  - category 水稻\n    value 770\n  - category 水稻\n    value 680\n  - category 水稻\n    value 710\n  - category 水稻\n    value 750\n  - category 水稻\n    value 660\n  - category 水稻\n    value 730\n  - category 水稻\n    value 700\n  - category 水稻\n    value 760\n  - category 水稻\n    value 690\n  - category 水稻\n    value 720\n  - category 水稻\n    value 740\n  - category 水稻\n    value 680\n  - category 水稻\n    value 710\n  - category 小麦\n    value 520\n  - category 小麦\n    value 550\n  - category 小麦\n    value 580\n  - category 小麦\n    value 510\n  - category 小麦\n    value 540\n  - category 小麦\n    value 590\n  - category 小麦\n    value 530\n  - category 小麦\n    value 560\n  - category 小麦\n    value 500\n  - category 小麦\n    value 570\n  - category 小麦\n    value 520\n  - category 小麦\n    value 550\n  - category 小麦\n    value 600\n  - category 小麦\n    value 510\n  - category 小麦\n    value 540\n  - category 小麦\n    value 580\n  - category 小麦\n    value 490\n  - category 小麦\n    value 560\n  - category 小麦\n    value 530\n  - category 小麦\n    value 590\n  - category 小麦\n    value 510\n  - category 小麦\n    value 550\n  - category 小麦\n    value 570\n  - category 小麦\n    value 500\n  - category 小麦\n    value 540\n  - category 玉米\n    value 620\n  - category 玉米\n    value 660\n  - category 玉米\n    value 700\n  - category 玉米\n    value 610\n  - category 玉米\n    value 650\n  - category 玉米\n    value 710\n  - category 玉米\n    value 630\n  - category 玉米\n    value 670\n  - category 玉米\n    value 600\n  - category 玉米\n    value 680\n  - category 玉米\n    value 620\n  - category 玉米\n    value 660\n  - category 玉米\n    value 720\n  - category 玉米\n    value 610\n  - category 玉米\n    value 650\n  - category 玉米\n    value 700\n  - category 玉米\n    value 590\n  - category 玉米\n    value 670\n  - category 玉米\n    value 640\n  - category 玉米\n    value 710\n  - category 玉米\n    value 620\n  - category 玉米\n    value 660\n  - category 玉米\n    value 690\n  - category 玉米\n    value 600\n  - category 玉米\n    value 650\ntitle 三种作物产量分布\naxisYTitle 产量 (kg/亩)\ntheme academy\nstyle\n  palette\n    - "#C45B42"\n    - "#7D8C6E"\n    - "#D4A373"\n  backgroundColor "#FBF8F4"',
    },
  ],
};
