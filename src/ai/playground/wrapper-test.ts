import { GPTVis } from '../gpt-vis';

// Sample data
const pieData = [
  { category: '分类一', value: 27 },
  { category: '分类二', value: 25 },
  { category: '分类三', value: 18 },
  { category: '分类四', value: 15 },
  { category: '分类五', value: 10 },
  { category: '其他', value: 5 },
];

const barData = [
  { category: '2015 年', value: 80 },
  { category: '2016 年', value: 140 },
  { category: '2017 年', value: 220 },
  { category: '2018 年', value: 280 },
  { category: '2019 年', value: 350 },
];

const lineData = [
  { time: '2015 年', value: 1700 },
  { time: '2016 年', value: 1500 },
  { time: '2017 年', value: 1200 },
  { time: '2018 年', value: 1000 },
  { time: '2019 年', value: 900 },
];

const mindMapData = {
  name: '项目管理',
  children: [
    {
      name: '计划阶段',
      children: [{ name: '需求分析' }, { name: '资源规划' }],
    },
    {
      name: '执行阶段',
      children: [{ name: '任务分配' }, { name: '进度跟踪' }],
    },
    {
      name: '监控阶段',
      children: [{ name: '风险管理' }, { name: '质量控制' }],
    },
  ],
};

const networkData = {
  nodes: [
    { name: 'Node A' },
    { name: 'Node B' },
    { name: 'Node C' },
    { name: 'Node D' },
    { name: 'Node E' },
  ],
  edges: [
    { source: 'Node A', target: 'Node B' },
    { source: 'Node A', target: 'Node C' },
    { source: 'Node B', target: 'Node D' },
    { source: 'Node C', target: 'Node D' },
    { source: 'Node D', target: 'Node E' },
  ],
};

// Example 1: Pie Chart with wrapper
const g1 = new GPTVis({
  container: document.getElementById('pie-with-wrapper')!,
  width: 500,
  height: 400,
  wrapper: true,
});

g1.render({
  type: 'pie',
  data: pieData,
  innerRadius: 0.6,
  theme: 'academy',
  title: '销售占比',
});

// Example 2: Pie Chart without wrapper
const g2 = new GPTVis({
  container: document.getElementById('pie-without-wrapper')!,
  width: 500,
  height: 400,
  wrapper: false,
});

g2.render({
  type: 'pie',
  data: pieData,
  innerRadius: 0.6,
  theme: 'academy',
  title: '销售占比',
});

// Example 3: Mind Map with wrapper (G6 chart with zoom)
const g3 = new GPTVis({
  container: document.getElementById('mindmap-with-wrapper')!,
  width: 500,
  height: 400,
  wrapper: true,
});

g3.render({
  type: 'mind-map',
  data: mindMapData,
  title: '项目管理流程',
  theme: 'default',
});

// Example 4: Network Graph with wrapper
const g4 = new GPTVis({
  container: document.getElementById('network-with-wrapper')!,
  width: 500,
  height: 400,
  wrapper: true,
});

g4.render({
  type: 'network-graph',
  data: networkData,
  title: '网络关系图',
  theme: 'default',
});

// Example 5: Bar Chart with wrapper
const g5 = new GPTVis({
  container: document.getElementById('bar-with-wrapper')!,
  width: 500,
  height: 400,
  wrapper: true,
});

g5.render({
  type: 'bar',
  data: barData,
  title: '海底捞公司外卖收入',
  axisXTitle: '年份',
  axisYTitle: '金额 （百万元）',
  theme: 'default',
});

// Example 6: Line Chart with wrapper
const g6 = new GPTVis({
  container: document.getElementById('line-with-wrapper')!,
  width: 500,
  height: 400,
  wrapper: true,
});

g6.render({
  type: 'line',
  data: lineData,
  title: '出生人口变化',
  axisXTitle: '年份',
  axisYTitle: '出生人口（万人）',
  theme: 'default',
});
