import { GPTVis } from '../gpt-vis';

// Sample data for different chart types
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

const columnData = [
  { category: 'Q1', value: 100 },
  { category: 'Q2', value: 150 },
  { category: 'Q3', value: 200 },
  { category: 'Q4', value: 180 },
];

const areaData = [
  { time: '2015', value: 3 },
  { time: '2016', value: 4 },
  { time: '2017', value: 3.5 },
  { time: '2018', value: 5 },
  { time: '2019', value: 4.9 },
];

// Example 1: Basic Pie Chart
const g1 = new GPTVis({
  container: document.getElementById('example-pie')!,
  width: 500,
  height: 400,
  theme: 'academy',
});

g1.render('pie', {
  data: pieData,
  innerRadius: 0.6,
  title: '销售占比',
});

// Example 2: Basic Bar Chart
const g2 = new GPTVis({
  container: document.getElementById('example-bar')!,
  width: 500,
  height: 400,
  theme: 'default',
});

g2.render('bar', {
  data: barData,
  title: '海底捞公司外卖收入',
  axisXTitle: '年份',
  axisYTitle: '金额 （百万元）',
});

// Example 3: Basic Line Chart
const g3 = new GPTVis({
  container: document.getElementById('example-line')!,
  width: 500,
  height: 400,
  theme: 'default',
});

g3.render('line', {
  data: lineData,
  title: '出生人口变化',
  axisXTitle: '年份',
  axisYTitle: '出生人口（万人）',
});

// Example 4: Basic Column Chart
const g4 = new GPTVis({
  container: document.getElementById('example-column')!,
  width: 500,
  height: 400,
  theme: 'academy',
});

g4.render('column', {
  data: columnData,
  title: '季度销售额',
  axisXTitle: '季度',
  axisYTitle: '销售额（万元）',
});

// Example 5: Dynamic Chart Switching
const dynamicVis = new GPTVis({
  container: document.getElementById('dynamic-chart')!,
  width: 500,
  height: 400,
});

// Initial render
dynamicVis.render('pie', {
  data: pieData,
  innerRadius: 0.6,
  title: 'Pie Chart',
});

// Global functions for button clicks
(window as any).renderPie = () => {
  dynamicVis.render('pie', {
    data: pieData,
    innerRadius: 0.6,
    title: 'Pie Chart',
  });
};

(window as any).renderBar = () => {
  dynamicVis.render('bar', {
    data: barData,
    title: 'Bar Chart',
    axisXTitle: '年份',
    axisYTitle: '金额',
  });
};

(window as any).renderLine = () => {
  dynamicVis.render('line', {
    data: lineData,
    title: 'Line Chart',
    axisXTitle: '年份',
    axisYTitle: '数量',
  });
};

(window as any).renderColumn = () => {
  dynamicVis.render('column', {
    data: columnData,
    title: 'Column Chart',
    axisXTitle: '季度',
    axisYTitle: '销售额',
  });
};

(window as any).renderArea = () => {
  dynamicVis.render('area', {
    data: areaData,
    title: 'Area Chart',
    axisXTitle: '年份',
    axisYTitle: '数值',
  });
};

// Example 6: Theme Switching
const themeVis = new GPTVis({
  container: document.getElementById('theme-chart')!,
  width: 500,
  height: 400,
  theme: 'default',
});

// Initial render
themeVis.render('pie', {
  data: pieData,
  innerRadius: 0.6,
  title: 'Default Theme',
});

(window as any).renderTheme = (theme: 'default' | 'academy' | 'dark') => {
  // Note: Theme switching requires recreating the GPTVis instance with new theme
  const newThemeVis = new GPTVis({
    container: document.getElementById('theme-chart')!,
    width: 500,
    height: 400,
    theme,
  });
  newThemeVis.render('pie', {
    data: pieData,
    innerRadius: 0.6,
    title: `${theme.charAt(0).toUpperCase() + theme.slice(1)} Theme`,
  });
};

// Example 7: Mind Map
const g7 = new GPTVis({
  container: document.getElementById('example-mindmap')!,
  width: 500,
  height: 400,
  theme: 'default',
});

g7.render('mind-map', {
  data: {
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
  },
  title: '项目管理流程',
});

// Example 8: Network Graph
const g8 = new GPTVis({
  container: document.getElementById('example-network')!,
  width: 500,
  height: 400,
  theme: 'default',
});

g8.render('network-graph', {
  data: {
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
  },
  title: '网络关系图',
});

// Example 9: Sankey Diagram
const g9 = new GPTVis({
  container: document.getElementById('example-sankey')!,
  width: 500,
  height: 400,
  theme: 'default',
});

g9.render('sankey', {
  data: [
    { source: '访问', target: '注册', value: 100 },
    { source: '注册', target: '付费', value: 60 },
    { source: '注册', target: '流失', value: 40 },
    { source: '付费', target: '续费', value: 45 },
    { source: '付费', target: '流失', value: 15 },
  ],
  title: '用户转化流程',
});

// Example 10: Word Cloud
const g10 = new GPTVis({
  container: document.getElementById('example-wordcloud')!,
  width: 500,
  height: 400,
  theme: 'academy',
});

g10.render('word-cloud', {
  data: [
    { word: 'JavaScript', weight: 100 },
    { word: 'TypeScript', weight: 90 },
    { word: 'React', weight: 85 },
    { word: 'Vue', weight: 80 },
    { word: 'Angular', weight: 75 },
    { word: 'Node.js', weight: 70 },
    { word: 'Python', weight: 65 },
    { word: 'Java', weight: 60 },
    { word: 'Go', weight: 55 },
    { word: 'Rust', weight: 50 },
    { word: 'C++', weight: 45 },
    { word: 'Swift', weight: 40 },
  ],
  title: '编程语言热度',
});
