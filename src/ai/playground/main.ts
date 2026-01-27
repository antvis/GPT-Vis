import { Pie } from '../pie/index';
import { Boxplot } from '../vis/boxplot/index';
import { Funnel } from '../vis/funnel/index';
import { Histogram } from '../vis/histogram/index';
import { Liquid } from '../vis/liquid/index';
import { Sankey } from '../vis/sankey/index';
import { Treemap } from '../vis/treemap/index';
import { Venn } from '../vis/venn/index';
import { Violin } from '../vis/violin/index';
import { Waterfall } from '../vis/waterfall/index';
import { WordCloud } from '../vis/word-cloud/index';

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

// Liquid Chart Examples

// Example 1: Basic Liquid Chart
const liquidBasic = Liquid({
  container: document.getElementById('liquid-basic')!,
  width: 500,
  height: 400,
});

liquidBasic.render({
  percent: 0.75,
});

// Example 2: With Title
const liquidTitle = Liquid({
  container: document.getElementById('liquid-title')!,
  width: 500,
  height: 400,
});

liquidTitle.render({
  percent: 0.6,
  title: '任务完成度',
});

// Example 3: Rectangle Shape
const liquidRect = Liquid({
  container: document.getElementById('liquid-rect')!,
  width: 500,
  height: 400,
});

liquidRect.render({
  percent: 0.85,
  shape: 'rect',
  title: '资源使用率',
});

// Example 4: Pin Shape (Water Drop)
const liquidPin = Liquid({
  container: document.getElementById('liquid-pin')!,
  width: 500,
  height: 400,
});

liquidPin.render({
  percent: 0.45,
  shape: 'pin',
  title: '存储空间占用',
});

// Example 5: Triangle Shape
const liquidTriangle = Liquid({
  container: document.getElementById('liquid-triangle')!,
  width: 500,
  height: 400,
});

liquidTriangle.render({
  percent: 0.92,
  shape: 'triangle',
  title: 'KPI 达成率',
});

// Example 6: Academy Theme
const liquidAcademy = Liquid({
  container: document.getElementById('liquid-academy')!,
  width: 500,
  height: 400,
});

liquidAcademy.render({
  percent: 0.68,
  theme: 'academy',
  title: '项目进度',
});

// Example 7: Dark Theme
const liquidDark = Liquid({
  container: document.getElementById('liquid-dark')!,
  width: 500,
  height: 400,
});

liquidDark.render({
  percent: 0.55,
  theme: 'dark',
  title: '完成率',
});

// Example 8: Custom Styles
const liquidCustom = Liquid({
  container: document.getElementById('liquid-custom')!,
  width: 500,
  height: 400,
});

liquidCustom.render({
  percent: 0.92,
  title: 'KPI 达成率',
  shape: 'triangle',
  style: {
    palette: ['#00BFFF'],
    backgroundColor: '#F0F0F0',
  },
});

// Sankey Chart Examples

// Example 1: Basic Sankey Chart
const sankeyBasic = Sankey({
  container: document.getElementById('sankey-basic')!,
  width: 500,
  height: 400,
});

sankeyBasic.render({
  data: [
    { source: '煤炭', target: '发电厂', value: 120 },
    { source: '天然气', target: '发电厂', value: 80 },
    { source: '发电厂', target: '工业', value: 100 },
    { source: '发电厂', target: '居民', value: 60 },
    { source: '发电厂', target: '商业', value: 40 },
  ],
});

// Example 2: With Title and Justify Alignment
const sankeyTitle = Sankey({
  container: document.getElementById('sankey-title')!,
  width: 500,
  height: 400,
});

sankeyTitle.render({
  data: [
    { source: '煤炭', target: '发电厂', value: 120 },
    { source: '天然气', target: '发电厂', value: 80 },
    { source: '发电厂', target: '工业', value: 100 },
    { source: '发电厂', target: '居民', value: 60 },
    { source: '发电厂', target: '商业', value: 40 },
  ],
  title: '能源流动关系',
  nodeAlign: 'justify',
});

// Example 3: Academy Theme
const sankeyAcademy = Sankey({
  container: document.getElementById('sankey-academy')!,
  width: 500,
  height: 400,
});

sankeyAcademy.render({
  data: [
    { source: '投资人', target: '创业公司', value: 200 },
    { source: '创业公司', target: '市场营销', value: 80 },
    { source: '创业公司', target: '研发', value: 120 },
    { source: '市场营销', target: '客户', value: 70 },
    { source: '研发', target: '客户', value: 50 },
  ],
  theme: 'academy',
  title: '资金流转路径',
  nodeAlign: 'center',
});

// Example 4: Dark Theme
const sankeyDark = Sankey({
  container: document.getElementById('sankey-dark')!,
  width: 500,
  height: 400,
});

sankeyDark.render({
  data: [
    { source: '投资人', target: '创业公司', value: 200 },
    { source: '创业公司', target: '市场营销', value: 80 },
    { source: '创业公司', target: '研发', value: 120 },
    { source: '市场营销', target: '客户', value: 70 },
    { source: '研发', target: '客户', value: 50 },
  ],
  theme: 'dark',
  title: '资金流转路径',
});

// Example 5: Custom Styles
const sankeyCustom = Sankey({
  container: document.getElementById('sankey-custom')!,
  width: 500,
  height: 400,
});

sankeyCustom.render({
  data: [
    { source: '首页', target: '产品页', value: 300 },
    { source: '产品页', target: '购物车', value: 150 },
    { source: '购物车', target: '结算页', value: 100 },
    { source: '结算页', target: '支付成功', value: 80 },
    { source: '结算页', target: '支付失败', value: 20 },
  ],
  title: '用户行为路径',
  nodeAlign: 'left',
  style: {
    palette: ['#5B8FF9', '#61DDAA', '#65789B', '#F6BD16', '#7262FD'],
    backgroundColor: '#f0f2f5',
  },
});

// Venn Chart Examples

// Example 1: Basic Venn Chart (Two Sets)
const vennBasic = Venn({
  container: document.getElementById('venn-basic')!,
  width: 500,
  height: 400,
});

vennBasic.render({
  data: [
    { sets: ['A'], value: 20, label: '集合A' },
    { sets: ['B'], value: 15, label: '集合B' },
    { sets: ['A', 'B'], value: 5, label: '交集AB' },
  ],
});

// Example 2: With Title
const vennTitle = Venn({
  container: document.getElementById('venn-title')!,
  width: 500,
  height: 400,
});

vennTitle.render({
  data: [
    { sets: ['A'], value: 20, label: '集合A' },
    { sets: ['B'], value: 15, label: '集合B' },
    { sets: ['A', 'B'], value: 5, label: '交集AB' },
  ],
  title: '集合交集示例',
});

// Example 3: Three Sets with Academy Theme
const vennAcademy = Venn({
  container: document.getElementById('venn-academy')!,
  width: 500,
  height: 400,
});

vennAcademy.render({
  data: [
    { sets: ['A'], value: 10, label: '集合A' },
    { sets: ['B'], value: 8, label: '集合B' },
    { sets: ['C'], value: 6, label: '集合C' },
    { sets: ['A', 'B'], value: 4 },
    { sets: ['A', 'C'], value: 2 },
    { sets: ['B', 'C'], value: 1 },
    { sets: ['A', 'B', 'C'], value: 1 },
  ],
  title: '三集合关系',
  theme: 'academy',
});

// Example 4: Dark Theme
const vennDark = Venn({
  container: document.getElementById('venn-dark')!,
  width: 500,
  height: 400,
});

vennDark.render({
  data: [
    { sets: ['A'], value: 10, label: '集合A' },
    { sets: ['B'], value: 8, label: '集合B' },
    { sets: ['C'], value: 6, label: '集合C' },
    { sets: ['A', 'B'], value: 4 },
    { sets: ['A', 'C'], value: 2 },
    { sets: ['B', 'C'], value: 1 },
    { sets: ['A', 'B', 'C'], value: 1 },
  ],
  title: '三集合关系',
  theme: 'dark',
});

// Example 5: Custom Styles
const vennCustom = Venn({
  container: document.getElementById('venn-custom')!,
  width: 500,
  height: 400,
});

vennCustom.render({
  data: [
    { sets: ['A'], value: 30, label: '购买手机' },
    { sets: ['B'], value: 25, label: '购买耳机' },
    { sets: ['A', 'B'], value: 10 },
  ],
  title: '标签交集',
  style: {
    palette: ['#FFB6C1', '#87CEFA'],
    backgroundColor: '#F8F8FF',
  },
});

// Boxplot Chart Examples

// Example 1: Basic Boxplot Chart
const boxplotBasic = Boxplot({
  container: document.getElementById('boxplot-basic')!,
  width: 500,
  height: 400,
});

boxplotBasic.render({
  data: [
    { category: '班级A', value: 15 },
    { category: '班级A', value: 18 },
    { category: '班级A', value: 22 },
    { category: '班级A', value: 27 },
    { category: '班级A', value: 35 },
    { category: '班级B', value: 10 },
    { category: '班级B', value: 14 },
    { category: '班级B', value: 19 },
    { category: '班级B', value: 23 },
    { category: '班级B', value: 30 },
  ],
});

// Example 2: With Title
const boxplotTitle = Boxplot({
  container: document.getElementById('boxplot-title')!,
  width: 500,
  height: 400,
});

boxplotTitle.render({
  data: [
    { category: '实验组1', value: 12 },
    { category: '实验组1', value: 15 },
    { category: '实验组1', value: 20 },
    { category: '实验组1', value: 25 },
    { category: '实验组1', value: 30 },
    { category: '实验组2', value: 18 },
    { category: '实验组2', value: 22 },
    { category: '实验组2', value: 28 },
    { category: '实验组2', value: 35 },
    { category: '实验组2', value: 40 },
  ],
  title: '实验数据分布',
});

// Example 3: Academy Theme
const boxplotAcademy = Boxplot({
  container: document.getElementById('boxplot-academy')!,
  width: 500,
  height: 400,
});

boxplotAcademy.render({
  data: [
    { category: '股票A', value: 50 },
    { category: '股票A', value: 55 },
    { category: '股票A', value: 60 },
    { category: '股票A', value: 65 },
    { category: '股票A', value: 70 },
    { category: '股票B', value: 45 },
    { category: '股票B', value: 50 },
    { category: '股票B', value: 55 },
    { category: '股票B', value: 60 },
    { category: '股票B', value: 65 },
  ],
  theme: 'academy',
  title: '金融数据分布',
});

// Example 4: Dark Theme
const boxplotDark = Boxplot({
  container: document.getElementById('boxplot-dark')!,
  width: 500,
  height: 400,
});

boxplotDark.render({
  data: [
    { category: '实验组1', value: 12 },
    { category: '实验组1', value: 15 },
    { category: '实验组1', value: 20 },
    { category: '实验组1', value: 25 },
    { category: '实验组1', value: 30 },
    { category: '实验组2', value: 18 },
    { category: '实验组2', value: 22 },
    { category: '实验组2', value: 28 },
    { category: '实验组2', value: 35 },
    { category: '实验组2', value: 40 },
  ],
  theme: 'dark',
  title: '实验数据分布 (Dark)',
});

// Example 5: Grouped Boxplot
const boxplotGrouped = Boxplot({
  container: document.getElementById('boxplot-grouped')!,
  width: 500,
  height: 400,
});

boxplotGrouped.render({
  data: [
    { category: 'Adelie', group: 'MALE', value: 181 },
    { category: 'Adelie', group: 'FEMALE', value: 186 },
    { category: 'Adelie', group: 'MALE', value: 190 },
    { category: 'Adelie', group: 'FEMALE', value: 181 },
    { category: 'Adelie', group: 'MALE', value: 191 },
    { category: 'Chinstrap', group: 'MALE', value: 195 },
    { category: 'Chinstrap', group: 'FEMALE', value: 191 },
    { category: 'Chinstrap', group: 'MALE', value: 198 },
    { category: 'Chinstrap', group: 'FEMALE', value: 192 },
  ],
  title: '帕尔默企鹅身高性别差异',
});

// Example 5: Custom Styles
const boxplotCustom = Boxplot({
  container: document.getElementById('boxplot-custom')!,
  width: 500,
  height: 400,
});

boxplotCustom.render({
  data: [
    { category: '班级A', value: 15 },
    { category: '班级A', value: 18 },
    { category: '班级A', value: 22 },
    { category: '班级A', value: 27 },
    { category: '班级A', value: 35 },
  ],
  title: '成绩分布',
  style: {
    palette: ['#FF9800'],
    backgroundColor: '#F5F5F5',
  },
});

// Violin Chart Examples

// Example 1: Basic Violin Chart
const violinBasic = Violin({
  container: document.getElementById('violin-basic')!,
  width: 500,
  height: 400,
});

violinBasic.render({
  data: [
    { category: '班级A', value: 15 },
    { category: '班级A', value: 18 },
    { category: '班级A', value: 22 },
    { category: '班级A', value: 27 },
    { category: '班级A', value: 35 },
    { category: '班级B', value: 10 },
    { category: '班级B', value: 14 },
    { category: '班级B', value: 19 },
    { category: '班级B', value: 23 },
    { category: '班级B', value: 30 },
  ],
});

// Example 2: With Title
const violinTitle = Violin({
  container: document.getElementById('violin-title')!,
  width: 500,
  height: 400,
});

violinTitle.render({
  data: [
    { category: '实验组1', value: 12 },
    { category: '实验组1', value: 15 },
    { category: '实验组1', value: 20 },
    { category: '实验组1', value: 25 },
    { category: '实验组1', value: 30 },
    { category: '实验组2', value: 18 },
    { category: '实验组2', value: 22 },
    { category: '实验组2', value: 28 },
    { category: '实验组2', value: 35 },
    { category: '实验组2', value: 40 },
  ],
  title: '实验数据分布',
});

// Example 3: Academy Theme
const violinAcademy = Violin({
  container: document.getElementById('violin-academy')!,
  width: 500,
  height: 400,
});

violinAcademy.render({
  data: [
    { category: '股票A', value: 50 },
    { category: '股票A', value: 55 },
    { category: '股票A', value: 60 },
    { category: '股票A', value: 65 },
    { category: '股票A', value: 70 },
    { category: '股票B', value: 45 },
    { category: '股票B', value: 50 },
    { category: '股票B', value: 55 },
    { category: '股票B', value: 60 },
    { category: '股票B', value: 65 },
  ],
  theme: 'academy',
  title: '金融数据分布',
});

// Example 4: Dark Theme
const violinDark = Violin({
  container: document.getElementById('violin-dark')!,
  width: 500,
  height: 400,
});

violinDark.render({
  data: [
    { category: '实验组1', value: 12 },
    { category: '实验组1', value: 15 },
    { category: '实验组1', value: 20 },
    { category: '实验组1', value: 25 },
    { category: '实验组1', value: 30 },
    { category: '实验组2', value: 18 },
    { category: '实验组2', value: 22 },
    { category: '实验组2', value: 28 },
    { category: '实验组2', value: 35 },
    { category: '实验组2', value: 40 },
  ],
  theme: 'dark',
  title: '实验数据分布 (Dark)',
});

// Example 5: Grouped Violin Plot
const violinGrouped = Violin({
  container: document.getElementById('violin-grouped')!,
  width: 500,
  height: 400,
});

violinGrouped.render({
  data: [
    { group: 'I. setosa', category: 'PetalWidth', value: 0.2 },
    { group: 'I. setosa', category: 'PetalWidth', value: 0.2 },
    { group: 'I. setosa', category: 'PetalWidth', value: 0.4 },
    { group: 'I. setosa', category: 'PetalLength', value: 1.4 },
    { group: 'I. setosa', category: 'PetalLength', value: 1.5 },
    { group: 'I. setosa', category: 'PetalLength', value: 1.7 },
    { group: 'I. versicolor', category: 'PetalWidth', value: 1.4 },
    { group: 'I. versicolor', category: 'PetalWidth', value: 1.5 },
    { group: 'I. versicolor', category: 'PetalWidth', value: 1.3 },
    { group: 'I. versicolor', category: 'PetalLength', value: 4.7 },
    { group: 'I. versicolor', category: 'PetalLength', value: 4.5 },
    { group: 'I. versicolor', category: 'PetalLength', value: 4.9 },
  ],
  title: '鸢尾花特征分布',
});

// Example 5: Custom Styles
const violinCustom = Violin({
  container: document.getElementById('violin-custom')!,
  width: 500,
  height: 400,
});

violinCustom.render({
  data: [
    { category: '股票A', value: 50 },
    { category: '股票A', value: 55 },
    { category: '股票A', value: 60 },
    { category: '股票A', value: 65 },
    { category: '股票A', value: 70 },
  ],
  title: '金融数据分布',
  style: {
    palette: ['#FF9800', '#2196F3'],
    backgroundColor: '#333333',
  },
});

// Waterfall Chart Examples

// Example 1: Basic Waterfall Chart
const waterfallBasic = Waterfall({
  container: document.getElementById('waterfall-basic')!,
  width: 500,
  height: 400,
});

waterfallBasic.render({
  data: [
    { category: '期初利润', value: 100 },
    { category: '销售收入', value: 80 },
    { category: '运营成本', value: -50 },
    { category: '税费', value: -20 },
    { category: '总计', isTotal: true },
  ],
});

// Example 2: With Title
const waterfallTitle = Waterfall({
  container: document.getElementById('waterfall-title')!,
  width: 500,
  height: 400,
});

waterfallTitle.render({
  data: [
    { category: '基础预算', value: 500 },
    { category: '市场投入', value: 120 },
    { category: '采购优化', value: -60 },
    { category: '运营效率', value: -30 },
    { category: '总利润', isTotal: true },
  ],
  title: '预算执行情况',
});

// Example 3: With Intermediate Total
const waterfallIntermediate = Waterfall({
  container: document.getElementById('waterfall-intermediate')!,
  width: 500,
  height: 400,
});

waterfallIntermediate.render({
  data: [
    { category: '基础预算', value: 500 },
    { category: '市场投入', value: 120 },
    { category: '总投入', isIntermediateTotal: true },
    { category: '采购优化', value: -60 },
    { category: '运营效率', value: -30 },
    { category: '总利润', isTotal: true },
  ],
  title: '预算分析（含中间总计）',
});

// Example 4: Dark Theme
const waterfallDark = Waterfall({
  container: document.getElementById('waterfall-dark')!,
  width: 500,
  height: 400,
});

waterfallDark.render({
  data: [
    { category: '期初利润', value: 100 },
    { category: '销售收入', value: 80 },
    { category: '运营成本', value: -50 },
    { category: '税费', value: -20 },
    { category: '总计', isTotal: true },
  ],
  theme: 'dark',
  title: '利润变化',
});

// Example 5: Custom Colors
const waterfallCustom = Waterfall({
  container: document.getElementById('waterfall-custom')!,
  width: 500,
  height: 400,
});

waterfallCustom.render({
  data: [
    { category: 'Q1 收入', value: 1000 },
    { category: 'Q2 收入', value: 1200 },
    { category: '成本', value: -800 },
    { category: '净利润', isTotal: true },
  ],
  title: '季度财务报告',
  style: {
    palette: {
      positiveColor: '#52c41a',
      negativeColor: '#f5222d',
      totalColor: '#1890ff',
    },
  },
});

// WordCloud Chart Examples

// Example 1: Basic WordCloud
const wordCloudBasic = WordCloud({
  container: document.getElementById('wordcloud-basic')!,
  width: 500,
  height: 400,
});

wordCloudBasic.render({
  data: [
    { text: '数据', value: 50 },
    { text: '分析', value: 40 },
    { text: '结果', value: 30 },
    { text: '可视化', value: 25 },
    { text: '图表', value: 20 },
  ],
});

// Example 2: With Title
const wordCloudTitle = WordCloud({
  container: document.getElementById('wordcloud-title')!,
  width: 500,
  height: 400,
});

wordCloudTitle.render({
  data: [
    { text: '环保', value: 10 },
    { text: '气候变化', value: 8 },
    { text: '可再生能源', value: 6 },
    { text: '碳排放', value: 5 },
    { text: '绿色生活', value: 4 },
  ],
  title: '环保关键词',
});

// Example 3: Academy Theme
const wordCloudAcademy = WordCloud({
  container: document.getElementById('wordcloud-academy')!,
  width: 500,
  height: 400,
});

wordCloudAcademy.render({
  data: [
    { text: '环境', value: 20 },
    { text: '保护', value: 15 },
    { text: '可持续发展', value: 10 },
    { text: '生态', value: 8 },
    { text: '自然', value: 6 },
  ],
  theme: 'academy',
});

// Example 4: Dark Theme
const wordCloudDark = WordCloud({
  container: document.getElementById('wordcloud-dark')!,
  width: 500,
  height: 400,
});

wordCloudDark.render({
  data: [
    { text: '质量好', value: 30 },
    { text: '价格合理', value: 20 },
    { text: '服务好', value: 15 },
    { text: '快速', value: 10 },
    { text: '可靠', value: 5 },
  ],
  theme: 'dark',
});

// Example 5: Custom Colors
const wordCloudCustom = WordCloud({
  container: document.getElementById('wordcloud-custom')!,
  width: 500,
  height: 400,
});

wordCloudCustom.render({
  data: [
    { text: '创新', value: 25 },
    { text: '技术', value: 22 },
    { text: '开发', value: 18 },
    { text: '协作', value: 15 },
    { text: '效率', value: 12 },
  ],
  style: {
    palette: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#96CEB4'],
  },
});

// Histogram Chart Examples

// Example 1: Basic Histogram
const histogramBasic = Histogram({
  container: document.getElementById('histogram-basic')!,
  width: 500,
  height: 400,
});

histogramBasic.render({
  data: [20, 25, 30, 35, 40, 45, 50, 55, 60],
});

// Example 2: With Title and Bin Number
const histogramTitle = Histogram({
  container: document.getElementById('histogram-title')!,
  width: 500,
  height: 400,
});

histogramTitle.render({
  data: [78, 88, 60, 100, 95, 85, 70, 92, 88, 75],
  binNumber: 5,
  title: '成绩分布',
});

// Example 3: With Axis Titles
const histogramAxis = Histogram({
  container: document.getElementById('histogram-axis')!,
  width: 500,
  height: 400,
});

histogramAxis.render({
  data: [
    1.2, 3.4, 3.7, 4.3, 5.2, 5.8, 6.1, 6.5, 6.8, 7.1, 7.3, 7.7, 8.3, 8.6, 8.8, 9.1, 9.2, 9.4, 9.5,
    9.7, 10.5, 10.7, 10.8, 11, 11, 11.1, 11.2, 11.3, 11.4, 11.4, 11.7, 12, 12.9, 12.9, 13.3, 13.7,
    13.8, 13.9, 14, 14.2, 14.5, 15, 15.2, 15.6, 16, 16.3, 17.3, 17.5, 17.9, 18, 18, 20.6, 21, 23.4,
  ],
  axisXTitle: '花瓣大小分布',
  axisYTitle: '花瓣分布数量',
});

// Example 4: Academy Theme
const histogramAcademy = Histogram({
  container: document.getElementById('histogram-academy')!,
  width: 500,
  height: 400,
});

histogramAcademy.render({
  data: [78, 88, 60, 100, 95, 85, 70, 92, 88, 75],
  binNumber: 5,
  theme: 'academy',
});

// Example 5: Dark Theme
const histogramDark = Histogram({
  container: document.getElementById('histogram-dark')!,
  width: 500,
  height: 400,
});

histogramDark.render({
  data: [78, 88, 60, 100, 95, 85, 70, 92, 88, 75],
  binNumber: 5,
  theme: 'dark',
});

// Treemap Chart Examples

// Example 1: Basic Treemap
const treemapBasic = Treemap({
  container: document.getElementById('treemap-basic')!,
  width: 500,
  height: 400,
});

treemapBasic.render({
  data: [
    { name: '产品A', value: 500 },
    { name: '产品B', value: 400 },
    { name: '产品C', value: 300 },
  ],
});

// Example 2: With Hierarchy
const treemapHierarchy = Treemap({
  container: document.getElementById('treemap-hierarchy')!,
  width: 500,
  height: 400,
});

treemapHierarchy.render({
  data: [
    {
      name: 'A',
      value: 100,
      children: [
        { name: 'A1', value: 40 },
        { name: 'A2', value: 30 },
        { name: 'A3', value: 30 },
      ],
    },
    {
      name: 'B',
      value: 80,
      children: [
        { name: 'B1', value: 50 },
        { name: 'B2', value: 30 },
      ],
    },
  ],
});

// Example 3: With Title
const treemapTitle = Treemap({
  container: document.getElementById('treemap-title')!,
  width: 500,
  height: 400,
});

treemapTitle.render({
  data: [
    {
      name: '苹果',
      value: 800,
      children: [
        { name: '红富士', value: 400 },
        { name: '黄元帅', value: 400 },
      ],
    },
    { name: '橙子', value: 600 },
    { name: '香蕉', value: 500 },
  ],
  title: '水果销售量',
});

// Example 4: Academy Theme
const treemapAcademy = Treemap({
  container: document.getElementById('treemap-academy')!,
  width: 500,
  height: 400,
});

treemapAcademy.render({
  data: [
    {
      name: 'A',
      value: 100,
      children: [
        { name: 'A1', value: 40 },
        { name: 'A2', value: 30 },
        { name: 'A3', value: 30 },
      ],
    },
  ],
  theme: 'academy',
});

// Example 5: Dark Theme
const treemapDark = Treemap({
  container: document.getElementById('treemap-dark')!,
  width: 500,
  height: 400,
});

treemapDark.render({
  data: [
    {
      name: 'A',
      value: 100,
      children: [
        { name: 'A1', value: 40 },
        { name: 'A2', value: 30 },
        { name: 'A3', value: 30 },
      ],
    },
  ],
  theme: 'dark',
});
