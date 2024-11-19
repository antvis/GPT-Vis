import { writeFile } from 'fs/promises';
import { readKnowledge } from '../helpers/read-knowledge.js';
import { getBasePrompt } from './text2chart.js';

const knowledge = await readKnowledge('折线图 - Line Chart.md');

const examples = [
  {
    question:
      '我国出生人口 2015 年出生人口 1700 万人，2016 年出生人口 1500 万人，2017 年出生人口 1200 万人。用折线图可视化上面的数据',
    answer: {
      type: 'line',
      data: [
        { time: '2015 年', value: 1700 },
        { time: '2016 年', value: 1500 },
        { time: '2017 年', value: 1200 },
      ],
      title: '出生人口变化',
      axisXTitle: '年份',
      axisYTitle: '出生人口（万人）',
    },
  },
  {
    question:
      '公司季度业绩显示，第一季度销售额为 500 万美元，第二季度为 600 万美元，第三季度为 700 万美元，第四季度为 800 万美元。使用折线图可视化这些数据。',
    answer: {
      type: 'line',
      data: [
        { time: '第一季度', value: 500 },
        { time: '第二季度', value: 600 },
        { time: '第三季度', value: 700 },
        { time: '第四季度', value: 800 },
      ],
      title: '公司季度业绩',
      axisXTitle: '季度',
      axisYTitle: '销售额（万美元）',
    },
  },
  // {
  //   question:
  //     '一项研究跟踪了五个国家在过去十年里每年森林覆盖率的变化，其中中国从2010年的20%增长到了2020年的25%，印度从20%增长至23%，巴西从60%降至55%，俄罗斯从45%增至50%，加拿大保持在30%不变。请用多条折线图展示各国森林覆盖率的变化。',
  //   answer: {
  //     type: 'line',
  //     data: [
  //       { time: '2010年', value: 20, group: '中国' },
  //       { time: '2020年', value: 25, group: '中国' },
  //       { time: '2010年', value: 20, group: '印度' },
  //       { time: '2020年', value: 23, group: '印度' },
  //       { time: '2010年', value: 60, group: '巴西' },
  //       { time: '2020年', value: 55, group: '巴西' },
  //       { time: '2010年', value: 45, group: '俄罗斯' },
  //       { time: '2020年', value: 50, group: '俄罗斯' },
  //       { time: '2010年', value: 30, group: '加拿大' },
  //       { time: '2020年', value: 30, group: '加拿大' },
  //     ],
  //     title: '各国森林覆盖率变化',
  //     axisXTitle: '年份',
  //     axisYTitle: '森林覆盖率（%）',
  //   },
  // },
  // {
  //   question:
  //     '我国出生人口与死亡人口，2015 年分别是 1700 万人与 965 万人，2016 年分别是出生人口 1500 万人与 846 万人，2017 年分别是出生人口 1200 万人与 782 万人。用多折线图可视化',
  //   answer: {
  //     type: 'line',
  //     data: [
  //       { time: '2015 年', value: 1700, group: '出生人口' },
  //       { time: '2015 年', value: 965, group: '死亡人口' },
  //       { time: '2016 年', value: 1500, group: '出生人口' },
  //       { time: '2016 年', value: 846, group: '死亡人口' },
  //       { time: '2017 年', value: 1200, group: '出生人口' },
  //       { time: '2017 年', value: 782, group: '死亡人口' },
  //     ],
  //     title: '出生人口与死亡人口变化',
  //     axisXTitle: '年份',
  //     axisYTitle: '人口（万人）',
  //   },
  // },
];

const linePrompt = getBasePrompt('折线图', knowledge, examples, 10);

console.log('linePrompt: ', linePrompt);

await writeFile('prompts/line/text2chart.md', linePrompt, 'utf8');
