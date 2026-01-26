import { Pie } from '../pie/index.ts';

// Sample data
const data = [
  { category: '分类一', value: 27 },
  { category: '分类二', value: 25 },
  { category: '分类三', value: 18 },
  { category: '分类四', value: 15 },
  { category: '分类五', value: 10 },
  { category: '其他', value: 5 },
];

// Example 1: Basic Pie Chart
const pieBasic = new Pie({
  container: document.getElementById('pie-basic'),
  width: 500,
  height: 400,
});

pieBasic.render({
  data,
});

// Example 2: Donut Chart with Academy Theme
const pieDonut = new Pie({
  container: document.getElementById('pie-donut'),
  width: 500,
  height: 400,
});

pieDonut.render({
  data,
  innerRadius: 0.6,
  theme: 'academy',
});

// Example 3: Dark Theme
const pieDark = new Pie({
  container: document.getElementById('pie-dark'),
  width: 500,
  height: 400,
});

pieDark.render({
  data,
  theme: 'dark',
});

// Example 4: With Title
const pieTitle = new Pie({
  container: document.getElementById('pie-title'),
  width: 500,
  height: 400,
});

pieTitle.render({
  data: [
    { category: '火锅', value: 22 },
    { category: '自助餐', value: 12 },
    { category: '川菜', value: 8 },
    { category: '小吃快餐', value: 8 },
    { category: '西餐', value: 6 },
    { category: '其它', value: 44 },
  ],
  title: '餐饮业营收额占比',
});

// Example 5: Custom Colors
const pieCustom = new Pie({
  container: document.getElementById('pie-custom'),
  width: 500,
  height: 400,
});

pieCustom.render({
  data,
  style: {
    palette: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#96CEB4', '#FFEAA7'],
  },
});
