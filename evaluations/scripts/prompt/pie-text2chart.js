import { writeFile } from 'fs/promises';
import { readKnowledge } from '../helpers/read-knowledge.js';
import { getBasePrompt } from './text2chart.js';

const knowledge = await readKnowledge('饼图 - Pie Chart.md');

const examples = [
  {
    question:
      '根据预测，专家估计到 2030 年这些国家 GDP 将达到，美国 GDP 750 万亿，印度 GDP 420 万亿，英国 GDP 420 万亿，中国 GDP 700 万亿。用条形图可视化',
    answer: {
      type: 'pie',
      data: [
        { category: '美国', value: 750 },
        { category: '印度', value: 420 },
        { category: '英国', value: 900 },
        { category: '中国', value: 700 },
      ],
      title: '预计 2030 GDP',
    },
  },
  {
    question:
      '全国人口中居住在城镇的人口占比为 63.89%，居住在乡村的人口占比为 36.11%。用环图展示数据',
    answer: {
      type: 'pie',
      data: [
        { category: '城镇人口', value: 63.89 },
        { category: '乡村人口', value: 36.11 },
      ],
      innerRadius: 0.6,
      title: '全国人口居住对比',
    },
  },
];

const prompt = getBasePrompt('饼图', knowledge, examples, 5);

console.log('prompt: ', prompt);

await writeFile('prompts/pie/text2chart.md', prompt, 'utf8');
