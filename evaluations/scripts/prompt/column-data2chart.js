import { writeFile } from 'fs/promises';
import { readKnowledge } from '../helpers/read-knowledge.js';
import { getBasePrompt } from './text2chart.js';

const knowledge = await readKnowledge('柱形图 - Column Chart.md');

const examples = [
  // {
  //   question:
  //     '用柱形图可视化我的数据 [{ "title": "第一产业","industrial": 7200.0 },{ "title": "第二产业", "industrial": 36600.0 },{ "title": "第三产业" ,"industrial": 41000.0 }]',
  //   answer: {
  //     type: 'column',
  //     data: [
  //       { category: '第一产业', value: 7200.0 },
  //       { category: '第二产业', value: 36600.0 },
  //       { category: '第三产业', value: 41000.0 },
  //     ],
  //     axisXTitle: 'title',
  //     axisYTitle: 'industrial',
  //   },
  // },
  {
    question:
      "用堆叠柱形图可视化我不同城市的客户数量，数据如下：{ 'City A': { '2020': 1000, '2021': 1200 }, 'City B': { '2020': 1500, '2021': 1800 }, 'City C': { '2020': 2000, '2021': 2500 } }",
    answer: {
      type: 'column',
      data: [
        { category: '2020', value: 1000, group: 'City A' },
        { category: '2021', value: 1200, group: 'City A' },
        { category: '2020', value: 1500, group: 'City B' },
        { category: '2021', value: 1800, group: 'City B' },
        { category: '2020', value: 2000, group: 'City C' },
        { category: '2021', value: 2500, group: 'City C' },
      ],
      stack: true,
      axisXTitle: '年份',
      axisYTitle: '客户数量',
    },
  },
  {
    question:
      "用分组柱形图可视化我不同季度的销售数据，数据如下：{ 'Q1': { '2020': 10000, '2021': 12000 }, 'Q2': { '2020': 15000, '2021': 18000 }, 'Q3': { '2020': 20000, '2021': 25000 }, 'Q4': { '2020': 25000, '2021': 30000 } }",
    answer: {
      type: 'column',
      data: [
        { category: '2020', value: 10000, group: 'Q1' },
        { category: '2021', value: 12000, group: 'Q1' },
        { category: '2020', value: 15000, group: 'Q2' },
        { category: '2021', value: 18000, group: 'Q2' },
        { category: '2020', value: 20000, group: 'Q3' },
        { category: '2021', value: 25000, group: 'Q3' },
        { category: '2020', value: 25000, group: 'Q4' },
        { category: '2021', value: 30000, group: 'Q4' },
      ],
      group: true,
      axisXTitle: '年份',
      axisYTitle: '售量',
    },
  },
];

const prompt = getBasePrompt('柱形图', knowledge, examples, 5);

console.log('prompt: ', prompt);

await writeFile('prompts/column/data2chart.md', prompt, 'utf8');
