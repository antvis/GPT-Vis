import { writeFile } from 'fs/promises';
import { readKnowledge } from '../helpers/read-knowledge.js';
import { getBasePrompt } from './data2chart.js';

const knowledge = await readKnowledge('折线图 - Line Chart.md');

const examples = [
  // {
  //   question:
  //     '用折线图可视化我的数据 [{ "year": 2015,"industrial": 7200.0 },{ "year": 2016, "industrial": 3660.0 },{ "year": 2017 ,"industrial": 4100.0 }]',
  //   answer: {
  //     type: 'line',
  //     data: [
  //       { time: 2015, value: 7200.0 },
  //       { time: 2016, value: 3660.0 },
  //       { time: 2017, value: 4100.0 },
  //     ],
  //     axisXTitle: 'year',
  //     axisYTitle: 'industrial',
  //   },
  // },
  {
    question:
      '用折线图可视化我的数据 [{"quarter":"Q1","sales":1540,"product":"家具"},{"quarter":"Q1","sales":2540,"product":"电子产品"},{"quarter":"Q1","sales":500,"product":"办公用品"},{"quarter":"Q2","sales":2000,"product":"家具"},{"quarter":"Q2","sales":3000,"product":"电子产品"},{"quarter":"Q2","sales":1000,"product":"办公用品"},{"quarter":"Q3","sales":4500,"product":"家具"},{"quarter":"Q3","sales":6500,"product":"电子产品"},{"quarter":"Q3","sales":2500,"product":"办公用品"}]',
    answer: {
      type: 'line',
      data: [
        { time: 'Q1', value: 1540.0, group: '家具' },
        { time: 'Q1', value: 2540.0, group: '电子产品' },
        { time: 'Q1', value: 500.0, group: '办公用品' },
        { time: 'Q2', value: 2000.0, group: '家具' },
        { time: 'Q2', value: 3000.0, group: '电子产品' },
        { time: 'Q2', value: 1000.0, group: '办公用品' },
        { time: 'Q3', value: 4500.0, group: '家具' },
        { time: 'Q3', value: 6500.0, group: '电子产品' },
        { time: 'Q3', value: 2500.0, group: '办公用品' },
      ],
      axisXTitle: 'quarter',
      axisYTitle: 'sales',
    },
  },
];

const linePrompt = getBasePrompt('折线图', knowledge, examples, 10);

console.log('linePrompt: ', linePrompt);

await writeFile('prompts/line/data2chart.md', linePrompt, 'utf8');
