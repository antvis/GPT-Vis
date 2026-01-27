import { Pie } from '../pie/index';
import { Area } from '../vis/area/index';
import { Bar } from '../vis/bar/index';
import { Boxplot } from '../vis/boxplot/index';
import { Column } from '../vis/column/index';
import { DualAxes } from '../vis/dual-axes/index';
import { FishboneDiagram } from '../vis/fishbone-diagram/index';
import { FlowDiagram } from '../vis/flow-diagram/index';
import { Funnel } from '../vis/funnel/index';
import { Histogram } from '../vis/histogram/index';
import { IndentedTree } from '../vis/indented-tree/index';
import { Line } from '../vis/line/index';
import { Liquid } from '../vis/liquid/index';
import { MindMap } from '../vis/mind-map/index';
import { NetworkGraph } from '../vis/network-graph/index';
import { OrganizationChart } from '../vis/organization-chart/index';
import { Radar } from '../vis/radar/index';
import { Sankey } from '../vis/sankey/index';
import { Scatter } from '../vis/scatter/index';
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

// =====================
// Line Chart Examples
// =====================

// Example 1: Basic Line Chart
const lineBasic = Line({
  container: document.getElementById('line-basic')!,
  width: 500,
  height: 400,
});

lineBasic.render({
  data: [
    { time: '2015 年', value: 1700 },
    { time: '2016 年', value: 1500 },
    { time: '2017 年', value: 1200 },
    { time: '2018 年', value: 1400 },
    { time: '2019 年', value: 1600 },
  ],
});

// Example 2: With Title
const lineTitle = Line({
  container: document.getElementById('line-title')!,
  width: 500,
  height: 400,
});

lineTitle.render({
  data: [
    { time: 2015, value: 7200.0 },
    { time: 2016, value: 3660.0 },
    { time: 2017, value: 4100.0 },
    { time: 2018, value: 5200.0 },
  ],
  title: 'Industrial Output',
  axisXTitle: 'Year',
  axisYTitle: 'Value',
});

// Example 3: Multi-Line Chart
const lineMulti = Line({
  container: document.getElementById('line-multi')!,
  width: 500,
  height: 400,
});

lineMulti.render({
  data: [
    { time: 'Q1', value: 1540, group: '家具' },
    { time: 'Q1', value: 2540, group: '电子产品' },
    { time: 'Q1', value: 500, group: '办公用品' },
    { time: 'Q2', value: 2000, group: '家具' },
    { time: 'Q2', value: 3000, group: '电子产品' },
    { time: 'Q2', value: 1000, group: '办公用品' },
    { time: 'Q3', value: 4500, group: '家具' },
    { time: 'Q3', value: 6500, group: '电子产品' },
    { time: 'Q3', value: 2500, group: '办公用品' },
  ],
  title: 'Quarterly Sales by Product',
  axisXTitle: 'Quarter',
  axisYTitle: 'Sales',
});

// Example 4: Academy Theme
const lineAcademy = Line({
  container: document.getElementById('line-academy')!,
  width: 500,
  height: 400,
});

lineAcademy.render({
  data: [
    { time: '2015 年', value: 1700 },
    { time: '2016 年', value: 1500 },
    { time: '2017 年', value: 1200 },
    { time: '2018 年', value: 1400 },
  ],
  theme: 'academy',
  title: '出生人口变化',
});

// Example 5: Dark Theme
const lineDark = Line({
  container: document.getElementById('line-dark')!,
  width: 500,
  height: 400,
});

lineDark.render({
  data: [
    { time: '2015 年', value: 1700, group: '出生人口' },
    { time: '2015 年', value: 965, group: '死亡人口' },
    { time: '2016 年', value: 1500, group: '出生人口' },
    { time: '2016 年', value: 846, group: '死亡人口' },
    { time: '2017 年', value: 1200, group: '出生人口' },
    { time: '2017 年', value: 782, group: '死亡人口' },
  ],
  theme: 'dark',
  title: 'Population Change',
});

// Example 6: Custom Styles
const lineCustom = Line({
  container: document.getElementById('line-custom')!,
  width: 500,
  height: 400,
});

lineCustom.render({
  data: [
    { time: '2015 年', value: 1700 },
    { time: '2016 年', value: 1500 },
    { time: '2017 年', value: 1200 },
    { time: '2018 年', value: 1400 },
  ],
  style: {
    palette: ['#FF6B6B'],
    lineWidth: 3,
  },
});

// =====================
// Area Chart Examples
// =====================

// Example 1: Basic Area Chart
const areaBasic = Area({
  container: document.getElementById('area-basic')!,
  width: 500,
  height: 400,
});

areaBasic.render({
  data: [
    { time: '1 月', value: 23.895 },
    { time: '2 月', value: 23.695 },
    { time: '3 月', value: 23.655 },
    { time: '4 月', value: 24.105 },
    { time: '5 月', value: 24.895 },
  ],
});

// Example 2: With Title
const areaTitle = Area({
  container: document.getElementById('area-title')!,
  width: 500,
  height: 400,
});

areaTitle.render({
  data: [
    { time: 2015, value: 7200.0 },
    { time: 2016, value: 3660.0 },
    { time: 2017, value: 4100.0 },
    { time: 2018, value: 5200.0 },
  ],
  title: 'Stock Price Change',
  axisXTitle: 'Year',
  axisYTitle: 'Price',
});

// Example 3: Stacked Area Chart
const areaStacked = Area({
  container: document.getElementById('area-stacked')!,
  width: 500,
  height: 400,
});

areaStacked.render({
  data: [
    { time: '2019年', value: 150, group: '北京' },
    { time: '2020年', value: 160, group: '北京' },
    { time: '2021年', value: 145, group: '北京' },
    { time: '2022年', value: 155, group: '北京' },
    { time: '2019年', value: 100, group: '广州' },
    { time: '2020年', value: 110, group: '广州' },
    { time: '2021年', value: 105, group: '广州' },
    { time: '2022年', value: 115, group: '广州' },
    { time: '2019年', value: 90, group: '上海' },
    { time: '2020年', value: 85, group: '上海' },
    { time: '2021年', value: 80, group: '上海' },
    { time: '2022年', value: 75, group: '上海' },
  ],
  stack: true,
  title: '城市空气污染指数变化',
});

// Example 4: Multi-Area Chart
const areaMulti = Area({
  container: document.getElementById('area-multi')!,
  width: 500,
  height: 400,
});

areaMulti.render({
  data: [
    { time: 2018, value: 825.6, group: 'Asia' },
    { time: 2018, value: 60.2, group: 'Europe' },
    { time: 2019, value: 450, group: 'Asia' },
    { time: 2019, value: 95, group: 'Europe' },
    { time: 2020, value: 506, group: 'Asia' },
    { time: 2020, value: 76.7, group: 'Europe' },
    { time: 2021, value: 976.6, group: 'Asia' },
    { time: 2021, value: 97.2, group: 'Europe' },
  ],
  stack: false,
  title: 'Regional Data',
});

// Example 5: Academy Theme
const areaAcademy = Area({
  container: document.getElementById('area-academy')!,
  width: 500,
  height: 400,
});

areaAcademy.render({
  data: [
    { time: '1 月', value: 23.895 },
    { time: '2 月', value: 23.695 },
    { time: '3 月', value: 23.655 },
    { time: '4 月', value: 24.105 },
  ],
  theme: 'academy',
  title: 'Stock Price',
});

// Example 6: Dark Theme
const areaDark = Area({
  container: document.getElementById('area-dark')!,
  width: 500,
  height: 400,
});

areaDark.render({
  data: [
    { time: '1 月', value: 23.895 },
    { time: '2 月', value: 23.695 },
    { time: '3 月', value: 23.655 },
    { time: '4 月', value: 24.105 },
  ],
  theme: 'dark',
  title: 'Stock Price',
});

// =====================
// Bar Chart Examples
// =====================

// Example 1: Basic Bar Chart
const barBasic = Bar({
  container: document.getElementById('bar-basic')!,
  width: 500,
  height: 400,
});

barBasic.render({
  data: [
    { category: '2015 年', value: 80 },
    { category: '2016 年', value: 140 },
    { category: '2017 年', value: 220 },
    { category: '2018 年', value: 180 },
  ],
});

// Example 2: With Title
const barTitle = Bar({
  container: document.getElementById('bar-title')!,
  width: 500,
  height: 400,
});

barTitle.render({
  data: [
    { category: '第一产业', value: 7200.0 },
    { category: '第二产业', value: 36600.0 },
    { category: '第三产业', value: 41000.0 },
  ],
  title: '产业收入',
  axisXTitle: '产业',
  axisYTitle: '收入',
});

// Example 3: Grouped Bar Chart
const barGrouped = Bar({
  container: document.getElementById('bar-grouped')!,
  width: 500,
  height: 400,
});

barGrouped.render({
  data: [
    { category: '北京', value: 825.6, group: '油车' },
    { category: '北京', value: 60.2, group: '新能源汽车' },
    { category: '上海', value: 450, group: '油车' },
    { category: '上海', value: 95, group: '新能源汽车' },
    { category: '深圳', value: 506, group: '油车' },
    { category: '深圳', value: 76.7, group: '新能源汽车' },
  ],
  group: true,
  title: 'Vehicle Sales by City',
});

// Example 4: Stacked Bar Chart
const barStacked = Bar({
  container: document.getElementById('bar-stacked')!,
  width: 500,
  height: 400,
});

barStacked.render({
  data: [
    { category: '北京', value: 825.6, group: '油车' },
    { category: '北京', value: 60.2, group: '新能源汽车' },
    { category: '上海', value: 450, group: '油车' },
    { category: '上海', value: 95, group: '新能源汽车' },
    { category: '深圳', value: 506, group: '油车' },
    { category: '深圳', value: 76.7, group: '新能源汽车' },
  ],
  stack: true,
  title: 'Vehicle Sales (Stacked)',
});

// Example 5: Academy Theme
const barAcademy = Bar({
  container: document.getElementById('bar-academy')!,
  width: 500,
  height: 400,
});

barAcademy.render({
  data: [
    { category: '2015 年', value: 80 },
    { category: '2016 年', value: 140 },
    { category: '2017 年', value: 220 },
  ],
  theme: 'academy',
  title: '外卖收入',
});

// Example 6: Custom Styles
const barCustom = Bar({
  container: document.getElementById('bar-custom')!,
  width: 500,
  height: 400,
});

barCustom.render({
  data: [
    { category: '2015 年', value: 80 },
    { category: '2016 年', value: 140 },
    { category: '2017 年', value: 220 },
  ],
  style: {
    palette: ['#FF6B6B', '#4ECDC4', '#45B7D1'],
  },
});

// =====================
// Column Chart Examples
// =====================

// Example 1: Basic Column Chart
const columnBasic = Column({
  container: document.getElementById('column-basic')!,
  width: 500,
  height: 400,
});

columnBasic.render({
  data: [
    { category: '2015 年', value: 80 },
    { category: '2016 年', value: 140 },
    { category: '2017 年', value: 220 },
    { category: '2018 年', value: 180 },
  ],
});

// Example 2: With Title
const columnTitle = Column({
  container: document.getElementById('column-title')!,
  width: 500,
  height: 400,
});

columnTitle.render({
  data: [
    { category: '第一产业', value: 7200.0 },
    { category: '第二产业', value: 36600.0 },
    { category: '第三产业', value: 41000.0 },
  ],
  title: '产业产值',
  axisXTitle: '产业类型',
  axisYTitle: '产值',
});

// Example 3: Grouped Column Chart
const columnGrouped = Column({
  container: document.getElementById('column-grouped')!,
  width: 500,
  height: 400,
});

columnGrouped.render({
  data: [
    { category: '北京', value: 825.6, group: '油车' },
    { category: '北京', value: 60.2, group: '新能源汽车' },
    { category: '上海', value: 450, group: '油车' },
    { category: '上海', value: 95, group: '新能源汽车' },
    { category: '深圳', value: 506, group: '油车' },
    { category: '深圳', value: 76.7, group: '新能源汽车' },
  ],
  group: true,
  title: 'Vehicle Sales Comparison',
});

// Example 4: Stacked Column Chart
const columnStacked = Column({
  container: document.getElementById('column-stacked')!,
  width: 500,
  height: 400,
});

columnStacked.render({
  data: [
    { category: '北京', value: 825.6, group: '油车' },
    { category: '北京', value: 60.2, group: '新能源汽车' },
    { category: '上海', value: 450, group: '油车' },
    { category: '上海', value: 95, group: '新能源汽车' },
    { category: '深圳', value: 506, group: '油车' },
    { category: '深圳', value: 76.7, group: '新能源汽车' },
  ],
  stack: true,
  title: 'Total Vehicle Sales',
});

// Example 5: Dark Theme
const columnDark = Column({
  container: document.getElementById('column-dark')!,
  width: 500,
  height: 400,
});

columnDark.render({
  data: [
    { category: '2015 年', value: 80 },
    { category: '2016 年', value: 140 },
    { category: '2017 年', value: 220 },
  ],
  theme: 'dark',
  title: '收入变化',
});

// Example 6: Custom Styles
const columnCustom = Column({
  container: document.getElementById('column-custom')!,
  width: 500,
  height: 400,
});

columnCustom.render({
  data: [
    { category: '2015 年', value: 80 },
    { category: '2016 年', value: 140 },
    { category: '2017 年', value: 220 },
  ],
  style: {
    palette: ['#FF6B6B', '#4ECDC4', '#45B7D1'],
  },
});

// =====================
// Scatter Chart Examples
// =====================

// Example 1: Basic Scatter Chart
const scatterBasic = Scatter({
  container: document.getElementById('scatter-basic')!,
  width: 500,
  height: 400,
});

scatterBasic.render({
  data: [
    { x: 10, y: 15 },
    { x: 20, y: 25 },
    { x: 30, y: 35 },
    { x: 40, y: 45 },
  ],
});

// Example 2: With Title
const scatterTitle = Scatter({
  container: document.getElementById('scatter-title')!,
  width: 500,
  height: 400,
});

scatterTitle.render({
  data: [
    { x: 10, y: 15 },
    { x: 20, y: 25 },
    { x: 30, y: 35 },
    { x: 40, y: 45 },
  ],
  title: 'Advertisement vs Sales',
});

// Example 3: With Groups
const scatterGroups = Scatter({
  container: document.getElementById('scatter-groups')!,
  width: 500,
  height: 400,
});

scatterGroups.render({
  data: [
    { x: 25, y: 5000, group: 'A' },
    { x: 35, y: 7000, group: 'A' },
    { x: 45, y: 10000, group: 'A' },
    { x: 30, y: 6000, group: 'B' },
    { x: 40, y: 8000, group: 'B' },
    { x: 50, y: 11000, group: 'B' },
  ],
});

// Example 4: Academy Theme
const scatterAcademy = Scatter({
  container: document.getElementById('scatter-academy')!,
  width: 500,
  height: 400,
});

scatterAcademy.render({
  data: [
    { x: 10, y: 15 },
    { x: 20, y: 25 },
    { x: 30, y: 35 },
    { x: 40, y: 45 },
  ],
  theme: 'academy',
  title: 'Data Correlation',
});

// Example 5: Custom Styles
const scatterCustom = Scatter({
  container: document.getElementById('scatter-custom')!,
  width: 500,
  height: 400,
});

scatterCustom.render({
  data: [
    { x: 10, y: 15, group: 'Group A' },
    { x: 20, y: 25, group: 'Group A' },
    { x: 30, y: 35, group: 'Group B' },
    { x: 40, y: 45, group: 'Group B' },
  ],
  style: {
    palette: ['#FF6B6B', '#4ECDC4'],
    backgroundColor: '#F8F9FA',
  },
});

// =====================
// DualAxes Chart Examples
// =====================

// Example 1: Basic DualAxes Chart
const dualAxesBasic = DualAxes({
  container: document.getElementById('dual-axes-basic')!,
  width: 500,
  height: 400,
});

dualAxesBasic.render({
  categories: ['2018', '2019', '2020', '2021', '2022'],
  series: [
    {
      type: 'column',
      data: [91.9, 99.1, 101.6, 114.4, 121],
      axisYTitle: 'Sales',
    },
    {
      type: 'line',
      data: [0.055, 0.06, 0.062, 0.07, 0.075],
      axisYTitle: 'Profit Rate',
    },
  ],
});

// Example 2: With Title and X-Axis Label
const dualAxesTitle = DualAxes({
  container: document.getElementById('dual-axes-title')!,
  width: 500,
  height: 400,
});

dualAxesTitle.render({
  categories: ['2018', '2019', '2020', '2021', '2022'],
  title: '2018-2022 Sales and Profit Rate',
  axisXTitle: 'Year',
  series: [
    {
      type: 'column',
      data: [91.9, 99.1, 101.6, 114.4, 121],
      axisYTitle: 'Sales',
    },
    {
      type: 'line',
      data: [0.055, 0.06, 0.062, 0.07, 0.075],
      axisYTitle: 'Profit Rate',
    },
  ],
});

// Example 3: Academy Theme
const dualAxesAcademy = DualAxes({
  container: document.getElementById('dual-axes-academy')!,
  width: 500,
  height: 400,
});

dualAxesAcademy.render({
  categories: ['2020', '2021', '2022'],
  series: [
    {
      type: 'column',
      data: [500, 600, 700],
      axisYTitle: 'Revenue',
    },
    {
      type: 'line',
      data: [10, 12, 15],
      axisYTitle: 'Growth Rate',
    },
  ],
  theme: 'academy',
  title: 'Revenue and Growth',
});

// Example 4: Dark Theme
const dualAxesDark = DualAxes({
  container: document.getElementById('dual-axes-dark')!,
  width: 500,
  height: 400,
});

dualAxesDark.render({
  categories: ['Q1', 'Q2', 'Q3', 'Q4'],
  series: [
    {
      type: 'column',
      data: [100, 120, 140, 160],
      axisYTitle: 'Revenue',
    },
    {
      type: 'line',
      data: [5, 6, 7, 8],
      axisYTitle: 'Profit',
    },
  ],
  theme: 'dark',
  title: 'Quarterly Performance',
});

// Example 5: Custom Styles
const dualAxesCustom = DualAxes({
  container: document.getElementById('dual-axes-custom')!,
  width: 500,
  height: 400,
});

dualAxesCustom.render({
  categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
  series: [
    {
      type: 'column',
      data: [120, 150, 180, 210, 240],
      axisYTitle: 'Sales',
    },
    {
      type: 'line',
      data: [8, 10, 12, 15, 18],
      axisYTitle: 'Growth',
    },
  ],
  style: {
    palette: ['#5B8FF9', '#61DDAA'],
    backgroundColor: '#F8F9FA',
    startAtZero: true,
  },
});

// =====================
// Radar Chart Examples
// =====================

// Example 1: Basic Radar Chart
const radarBasic = Radar({
  container: document.getElementById('radar-basic')!,
  width: 500,
  height: 400,
});

radarBasic.render({
  data: [
    { name: '沟通能力', value: 2 },
    { name: '协作能力', value: 3 },
    { name: '领导能力', value: 2 },
    { name: '学习能力', value: 5 },
    { name: '创新能力', value: 6 },
    { name: '技术能力', value: 9 },
  ],
});

// Example 2: With Title
const radarTitle = Radar({
  container: document.getElementById('radar-title')!,
  width: 500,
  height: 400,
});

radarTitle.render({
  data: [
    { name: 'Vitamin C', value: 7 },
    { name: 'Fiber', value: 6 },
    { name: 'Sugar', value: 5 },
    { name: 'Protein', value: 4 },
    { name: 'Iron', value: 3 },
    { name: 'Calcium', value: 2 },
  ],
  title: 'Nutrition Analysis',
});

// Example 3: With Multiple Groups
const radarGroups = Radar({
  container: document.getElementById('radar-groups')!,
  width: 500,
  height: 400,
});

radarGroups.render({
  data: [
    { name: '语文', value: 95, group: '一班' },
    { name: '数学', value: 96, group: '一班' },
    { name: '外语', value: 85, group: '一班' },
    { name: '物理', value: 63, group: '一班' },
    { name: '化学', value: 91, group: '一班' },
    { name: '语文', value: 75, group: '二班' },
    { name: '数学', value: 93, group: '二班' },
    { name: '外语', value: 66, group: '二班' },
    { name: '物理', value: 85, group: '二班' },
    { name: '化学', value: 88, group: '二班' },
  ],
  title: 'Class Performance Comparison',
});

// Example 4: Academy Theme
const radarAcademy = Radar({
  container: document.getElementById('radar-academy')!,
  width: 500,
  height: 400,
});

radarAcademy.render({
  data: [
    { name: 'Attack', value: 85, group: 'Hero A' },
    { name: 'Defense', value: 70, group: 'Hero A' },
    { name: 'Speed', value: 90, group: 'Hero A' },
    { name: 'HP', value: 75, group: 'Hero A' },
    { name: 'MP', value: 60, group: 'Hero A' },
    { name: 'Attack', value: 65, group: 'Hero B' },
    { name: 'Defense', value: 90, group: 'Hero B' },
    { name: 'Speed', value: 70, group: 'Hero B' },
    { name: 'HP', value: 85, group: 'Hero B' },
    { name: 'MP', value: 80, group: 'Hero B' },
  ],
  theme: 'academy',
  title: 'Hero Stats',
});

// Example 5: Custom Styles
const radarCustom = Radar({
  container: document.getElementById('radar-custom')!,
  width: 500,
  height: 400,
});

radarCustom.render({
  data: [
    { name: 'Category A', value: 8, group: 'Product X' },
    { name: 'Category B', value: 7, group: 'Product X' },
    { name: 'Category C', value: 6, group: 'Product X' },
    { name: 'Category D', value: 5, group: 'Product X' },
    { name: 'Category E', value: 9, group: 'Product X' },
    { name: 'Category A', value: 6, group: 'Product Y' },
    { name: 'Category B', value: 9, group: 'Product Y' },
    { name: 'Category C', value: 8, group: 'Product Y' },
    { name: 'Category D', value: 7, group: 'Product Y' },
    { name: 'Category E', value: 5, group: 'Product Y' },
  ],
  style: {
    palette: ['#FF6B6B', '#4ECDC4'],
    backgroundColor: '#F8F9FA',
    lineWidth: 3,
  },
});

// MindMap Examples
// Example 1: Basic MindMap
const mindMapBasic = MindMap({
  container: document.getElementById('mind-map-basic')!,
  width: 800,
  height: 500,
});

mindMapBasic.render({
  type: 'mind-map',
  data: {
    name: '项目计划',
    children: [
      {
        name: '研究阶段',
        children: [{ name: '市场调研' }, { name: '技术可行性分析' }],
      },
      {
        name: '设计阶段',
        children: [{ name: '产品功能确定' }, { name: 'UI 设计' }],
      },
      {
        name: '开发阶段',
        children: [{ name: '编写代码' }, { name: '单元测试' }],
      },
      {
        name: '测试阶段',
        children: [{ name: '功能测试' }, { name: '性能测试' }],
      },
    ],
  },
});

// Example 2: MindMap with Academy Theme
const mindMapAcademy = MindMap({
  container: document.getElementById('mind-map-academy')!,
  width: 800,
  height: 500,
});

mindMapAcademy.render({
  type: 'mind-map',
  data: {
    name: '台风形成的因素',
    children: [
      {
        name: '气象条件',
        children: [
          { name: '温暖的海水' },
          { name: '气压分布' },
          { name: '湿度水平' },
          { name: '风的切变' },
        ],
      },
      {
        name: '地理环境',
        children: [
          { name: '大陆架的形状与深度' },
          { name: '海洋暖流的分布' },
          { name: '热带地区的气候特征' },
          { name: '岛屿的影响' },
        ],
      },
    ],
  },
  theme: 'academy',
});

// Example 3: MindMap - AI Applications
const mindMapAI = MindMap({
  container: document.getElementById('mind-map-ai')!,
  width: 800,
  height: 500,
});

mindMapAI.render({
  type: 'mind-map',
  data: {
    name: '人工智能应用',
    children: [
      { name: '智能家居' },
      { name: '自动驾驶' },
      {
        name: '医疗保健',
        children: [{ name: '精准医疗' }, { name: '诊断辅助' }],
      },
      { name: '金融服务' },
    ],
  },
});

// =====================
// NetworkGraph Examples
// =====================

// Example 1: Basic NetworkGraph
const networkGraphBasic = NetworkGraph({
  container: document.getElementById('network-graph-basic')!,
  width: 800,
  height: 500,
});

networkGraphBasic.render({
  type: 'network-graph',
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
      { source: 'Node B', target: 'Node C' },
      { source: 'Node C', target: 'Node D' },
      { source: 'Node D', target: 'Node E' },
      { source: 'Node E', target: 'Node A' },
    ],
  },
});

// Example 2: Social Network
const networkGraphSocial = NetworkGraph({
  container: document.getElementById('network-graph-social')!,
  width: 800,
  height: 500,
});

networkGraphSocial.render({
  type: 'network-graph',
  data: {
    nodes: [
      { name: 'Alice' },
      { name: 'Bob' },
      { name: 'Charlie' },
      { name: 'David' },
      { name: 'Eve' },
      { name: 'Frank' },
    ],
    edges: [
      { source: 'Alice', target: 'Bob', name: 'knows' },
      { source: 'Alice', target: 'Charlie', name: 'knows' },
      { source: 'Bob', target: 'David', name: 'works with' },
      { source: 'Charlie', target: 'Eve', name: 'manages' },
      { source: 'David', target: 'Frank', name: 'collaborates' },
    ],
  },
});

// =====================
// FlowDiagram Examples
// =====================

// Example 1: Basic FlowDiagram
const flowDiagramBasic = FlowDiagram({
  container: document.getElementById('flow-diagram-basic')!,
  width: 800,
  height: 500,
});

flowDiagramBasic.render({
  type: 'flow-diagram',
  data: {
    nodes: [
      { name: 'Start' },
      { name: 'Validate Input' },
      { name: 'Process Data' },
      { name: 'Save Results' },
      { name: 'End' },
    ],
    edges: [
      { source: 'Start', target: 'Validate Input' },
      { source: 'Validate Input', target: 'Process Data' },
      { source: 'Process Data', target: 'Save Results' },
      { source: 'Save Results', target: 'End' },
    ],
  },
});

// Example 2: Decision Flow
const flowDiagramDecision = FlowDiagram({
  container: document.getElementById('flow-diagram-decision')!,
  width: 800,
  height: 500,
});

flowDiagramDecision.render({
  type: 'flow-diagram',
  data: {
    nodes: [
      { name: 'Start' },
      { name: 'Check Condition' },
      { name: 'Path A' },
      { name: 'Path B' },
      { name: 'Merge' },
      { name: 'End' },
    ],
    edges: [
      { source: 'Start', target: 'Check Condition' },
      { source: 'Check Condition', target: 'Path A', name: 'Yes' },
      { source: 'Check Condition', target: 'Path B', name: 'No' },
      { source: 'Path A', target: 'Merge' },
      { source: 'Path B', target: 'Merge' },
      { source: 'Merge', target: 'End' },
    ],
  },
});

// =====================
// OrganizationChart Examples
// =====================

// Example 1: Basic OrganizationChart
const orgChartBasic = OrganizationChart({
  container: document.getElementById('org-chart-basic')!,
  width: 800,
  height: 500,
});

orgChartBasic.render({
  type: 'organization-chart',
  data: {
    name: 'CEO',
    description: 'Chief Executive Officer',
    children: [
      { name: 'CTO', description: 'Chief Technology Officer' },
      { name: 'CFO', description: 'Chief Financial Officer' },
      { name: 'CMO', description: 'Chief Marketing Officer' },
    ],
  },
});

// Example 2: Detailed Org Structure
const orgChartDetailed = OrganizationChart({
  container: document.getElementById('org-chart-detailed')!,
  width: 800,
  height: 500,
});

orgChartDetailed.render({
  type: 'organization-chart',
  data: {
    name: 'CEO',
    description: 'Chief Executive Officer',
    children: [
      {
        name: 'CTO',
        description: 'Chief Technology Officer',
        children: [
          { name: 'Dev Manager', description: 'Development Manager' },
          { name: 'QA Manager', description: 'Quality Assurance Manager' },
        ],
      },
      {
        name: 'CFO',
        description: 'Chief Financial Officer',
        children: [{ name: 'Accountant', description: 'Senior Accountant' }],
      },
    ],
  },
});

// =====================
// IndentedTree Examples
// =====================

// Example 1: Basic IndentedTree
const indentedTreeBasic = IndentedTree({
  container: document.getElementById('indented-tree-basic')!,
  width: 800,
  height: 500,
});

indentedTreeBasic.render({
  type: 'indented-tree',
  data: {
    name: 'Project',
    children: [
      {
        name: 'Frontend',
        children: [{ name: 'Components' }, { name: 'Styles' }, { name: 'Utils' }],
      },
      {
        name: 'Backend',
        children: [{ name: 'API' }, { name: 'Database' }, { name: 'Services' }],
      },
      { name: 'Documentation' },
    ],
  },
});

// Example 2: Academy Theme
const indentedTreeAcademy = IndentedTree({
  container: document.getElementById('indented-tree-academy')!,
  width: 800,
  height: 500,
});

indentedTreeAcademy.render({
  type: 'indented-tree',
  data: {
    name: '生物分类',
    children: [
      {
        name: '动物',
        children: [
          { name: '哺乳动物', children: [{ name: '猫科' }, { name: '犬科' }] },
          { name: '鸟类' },
        ],
      },
      { name: '植物', children: [{ name: '乔木' }, { name: '灌木' }] },
    ],
  },
  theme: 'academy',
});

// =====================
// FishboneDiagram Examples
// =====================

// Example 1: Basic FishboneDiagram
const fishboneBasic = FishboneDiagram({
  container: document.getElementById('fishbone-basic')!,
  width: 800,
  height: 500,
});

fishboneBasic.render({
  type: 'fishbone-diagram',
  data: {
    name: 'Product Defect',
    children: [
      {
        name: 'Materials',
        children: [{ name: 'Poor Quality' }, { name: 'Wrong Specifications' }],
      },
      {
        name: 'Methods',
        children: [{ name: 'Inadequate Training' }, { name: 'Unclear Procedures' }],
      },
      {
        name: 'Machines',
        children: [{ name: 'Outdated Equipment' }, { name: 'Lack of Maintenance' }],
      },
      {
        name: 'Manpower',
        children: [{ name: 'Insufficient Staff' }, { name: 'Low Motivation' }],
      },
    ],
  },
});

// Example 2: Academy Theme - Problem Analysis
const fishboneAcademy = FishboneDiagram({
  container: document.getElementById('fishbone-academy')!,
  width: 800,
  height: 500,
});

fishboneAcademy.render({
  type: 'fishbone-diagram',
  data: {
    name: '交通拥堵',
    children: [
      { name: '道路设计', children: [{ name: '车道不足' }, { name: '交叉口设计不合理' }] },
      { name: '车辆因素', children: [{ name: '车辆过多' }, { name: '大型车辆' }] },
      { name: '管理问题', children: [{ name: '信号灯不合理' }, { name: '执法不严' }] },
    ],
  },
  theme: 'academy',
});
