import { Pie } from '../index';

// Example 1: Basic Pie Chart
const basicPie = new Pie({
  container: '#basic-pie',
  width: 600,
  height: 400,
});

basicPie.render({
  data: [
    { category: '分类一', value: 27 },
    { category: '分类二', value: 25 },
    { category: '分类三', value: 18 },
    { category: '分类四', value: 15 },
    { category: '分类五', value: 10 },
    { category: '其他', value: 5 },
  ],
});

// Example 2: Donut Chart with Academy Theme
const donutPie = new Pie({
  container: '#donut-pie',
  width: 600,
  height: 400,
});

donutPie.render({
  data: [
    { category: '分类一', value: 27 },
    { category: '分类二', value: 25 },
    { category: '分类三', value: 18 },
    { category: '分类四', value: 15 },
    { category: '分类五', value: 10 },
    { category: '其他', value: 5 },
  ],
  innerRadius: 0.6,
  theme: 'academy',
});

// Example 3: Dark Theme
const darkPie = new Pie({
  container: '#dark-pie',
  width: 600,
  height: 400,
});

darkPie.render({
  data: [
    { category: '分类一', value: 27 },
    { category: '分类二', value: 25 },
    { category: '分类三', value: 18 },
    { category: '分类四', value: 15 },
    { category: '分类五', value: 10 },
    { category: '其他', value: 5 },
  ],
  theme: 'dark',
});

// Clean up when done
// basicPie.destroy();
// donutPie.destroy();
// darkPie.destroy();
