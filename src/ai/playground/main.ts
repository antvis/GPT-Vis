import { Pie } from '../pie/index';
import { Funnel } from '../vis/funnel/index';

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
const pieBasic = Pie({
  container: document.getElementById('pie-basic')!,
  width: 500,
  height: 400,
});

pieBasic.render({
  data,
});

// Example 2: Donut Chart with Academy Theme
const pieDonut = Pie({
  container: document.getElementById('pie-donut')!,
  width: 500,
  height: 400,
});

pieDonut.render({
  data,
  innerRadius: 0.6,
  theme: 'academy',
});

// Example 3: Dark Theme
const pieDark = Pie({
  container: document.getElementById('pie-dark')!,
  width: 500,
  height: 400,
});

pieDark.render({
  data,
  theme: 'dark',
});

// Example 4: With Title
const pieTitle = Pie({
  container: document.getElementById('pie-title')!,
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
const pieCustom = Pie({
  container: document.getElementById('pie-custom')!,
  width: 500,
  height: 400,
});

pieCustom.render({
  data,
  style: {
    palette: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#96CEB4', '#FFEAA7'],
  },
});

// Funnel Chart Examples

// Example 1: Basic Funnel Chart
const funnelBasic = Funnel({
  container: document.getElementById('funnel-basic')!,
  width: 500,
  height: 400,
});

funnelBasic.render({
  data: [
    { category: '访问', value: 1000 },
    { category: '咨询', value: 600 },
    { category: '下单', value: 300 },
    { category: '成交', value: 120 },
  ],
});

// Example 2: With Title
const funnelTitle = Funnel({
  container: document.getElementById('funnel-title')!,
  width: 500,
  height: 400,
});

funnelTitle.render({
  data: [
    { category: '访问', value: 1000 },
    { category: '咨询', value: 600 },
    { category: '下单', value: 300 },
    { category: '成交', value: 120 },
  ],
  title: '销售漏斗',
});

// Example 3: Academy Theme
const funnelAcademy = Funnel({
  container: document.getElementById('funnel-academy')!,
  width: 500,
  height: 400,
});

funnelAcademy.render({
  data: [
    { category: '注册', value: 800 },
    { category: '激活', value: 500 },
    { category: '付费', value: 200 },
  ],
  theme: 'academy',
  title: '用户转化流程',
});

// Example 4: Dark Theme
const funnelDark = Funnel({
  container: document.getElementById('funnel-dark')!,
  width: 500,
  height: 400,
});

funnelDark.render({
  data: [
    { category: '访问', value: 1000 },
    { category: '咨询', value: 600 },
    { category: '下单', value: 300 },
    { category: '成交', value: 120 },
  ],
  theme: 'dark',
});

// Example 5: Custom Styles
const funnelCustom = Funnel({
  container: document.getElementById('funnel-custom')!,
  width: 500,
  height: 400,
});

funnelCustom.render({
  data: [
    { category: '报名', value: 1500 },
    { category: '签到', value: 900 },
    { category: '参与', value: 700 },
  ],
  title: '活动参与漏斗',
  style: {
    palette: ['#FF7F50', '#87CEFA', '#32CD32'],
    backgroundColor: '#FFF8DC',
  },
});
