import { writeFile } from 'fs/promises';
import { readKnowledge } from '../helpers/read-knowledge.js';
import { getBasePrompt } from './data2chart.js';

const knowledge = await readKnowledge('饼图 - Pie Chart.md');

const examples = [
  {
    question:
      '用饼图可视化我的数据 [{ "name": "第一产业","industrial": 7200.0 },{ "name": "第二产业", "industrial": 36600.0 },{ "name": "第三产业" ,"industrial": 41000.0 }]',
    answer: {
      type: 'bar',
      data: [
        { category: '第一产业', value: 7200.0 },
        { category: '第二产业', value: 36600.0 },
        { category: '第三产业', value: 41000.0 },
      ],
    },
  },
];

const prompt = getBasePrompt('饼图', knowledge, examples, 5);

console.log('prompt: ', prompt);

await writeFile('prompts/pie/data2chart.md', prompt, 'utf8');
