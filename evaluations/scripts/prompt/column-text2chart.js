import { writeFile } from 'fs/promises';
import { readKnowledge } from '../helpers/read-knowledge.js';
import { getBasePrompt } from './text2chart.js';

const knowledge = await readKnowledge('柱形图 - Column Chart.md');

const examples = [
  {
    question:
      '海底捞公司外卖收入的变化，2015 年收入金额 80 百万元，2016 年收入金额 140 百万元，2017 年收入金额 220 百万元。用柱形图可视化',
    answer: {
      type: 'column',
      data: [
        { category: '2015 年', value: 80 },
        { category: '2016 年', value: 140 },
        { category: '2017 年', value: 220 },
      ],
      title: '海底捞公司外卖收入',
      axisXTitle: '年份',
      axisYTitle: '金额 （百万元）',
    },
  },
  // {
  //   question:
  //     '根据预测，专家估计到 2030 年这些国家 GDP 将达到，美国 GDP 750 万亿，印度 GDP 420 万亿，英国 GDP 420 万亿，中国 GDP 700 万亿。用柱形图可视化',
  //   answer: {
  //     type: 'column',
  //     data: [
  //       { category: '美国', value: 750 },
  //       { category: '印度', value: 420 },
  //       { category: '英国', value: 900 },
  //       { category: '中国', value: 700 },
  //     ],
  //     title: '预计 2030 GDP',
  //     axisXTitle: '国家',
  //     axisYTitle: '金额 （万亿）',
  //   },
  // },
  // {
  //   question:
  //     '主要城市油车与新能源汽车的售卖量对比，北京分别是 825.6 万辆 与 60.2 万辆，上海分别是 450 万辆 与 95 万辆，深圳分别是 506 万辆 与 76.7 万辆，广州分别是 976.6 万辆 与 97.2 万辆，杭州分别是 651.2 万辆 与 62 万辆。用分组柱形图可视化',
  //   answer: {
  //     type: 'column',
  //     data: [
  //       { category: '北京', value: 825.6, group: '油车' },
  //       { category: '北京', value: 60.2, group: '新能源汽车' },
  //       { category: '上海', value: 450, group: '油车' },
  //       { category: '上海', value: 95, group: '新能源汽车' },
  //       { category: '深圳', value: 506, group: '油车' },
  //       { category: '深圳', value: 76.7, group: '新能源汽车' },
  //       { category: '广州', value: 976.6, group: '油车' },
  //       { category: '广州', value: 97.2, group: '新能源汽车' },
  //       { category: '杭州', value: 651.2, group: '油车' },
  //       { category: '杭州', value: 62, group: '新能源汽车' },
  //     ],
  //     group: true,
  //     title: '主要城市油车与新能源汽车售卖量',
  //     axisXTitle: '城市',
  //     axisYTitle: '售卖量 （万辆）',
  //   },
  // },
  // {
  //   question:
  //     '主要城市油车与新能源汽车的售卖量对比，北京分别是 825.6 万辆 与 60.2 万辆，上海分别是 450 万辆 与 95 万辆，深圳分别是 506 万辆 与 76.7 万辆，广州分别是 976.6 万辆 与 97.2 万辆，杭州分别是 651.2 万辆 与 62 万辆。用堆叠柱形图可视化',
  //   answer: {
  //     type: 'column',
  //     data: [
  //       { category: '北京', value: 825.6, group: '油车' },
  //       { category: '北京', value: 60.2, group: '新能源汽车' },
  //       { category: '上海', value: 450, group: '油车' },
  //       { category: '上海', value: 95, group: '新能源汽车' },
  //       { category: '深圳', value: 506, group: '油车' },
  //       { category: '深圳', value: 76.7, group: '新能源汽车' },
  //       { category: '广州', value: 976.6, group: '油车' },
  //       { category: '广州', value: 97.2, group: '新能源汽车' },
  //       { category: '杭州', value: 651.2, group: '油车' },
  //       { category: '杭州', value: 62, group: '新能源汽车' },
  //     ],
  //     stack: true,
  //     title: '主要城市油车与新能源汽的售卖量',
  //     axisXTitle: '城市',
  //     axisYTitle: '售卖量 （万辆）',
  //   },
  // },
];

const prompt = getBasePrompt('柱形图', knowledge, examples, 5);

console.log('prompt: ', prompt);

await writeFile('prompts/column/text2chart.md', prompt, 'utf8');
