import { GPTVis } from '../src/gpt-vis';

// Example 1: Pie Chart with Syntax
const pieSyntax = `
vis pie
data
  - category 分类一
    value 27
  - category 分类二
    value 25
  - category 分类三
    value 18
  - category 其他
    value 30
innerRadius: 0.6
`;

const pieVis = new GPTVis({
  container: document.getElementById('syntax-pie')!,
  width: 500,
  height: 400,
  theme: 'academy',
});

pieVis.render(pieSyntax);

// Example 2: Line Chart with Syntax
const lineSyntax = `
vis line
data
  - time 2015年
    value 1700
  - time 2016年
    value 1500
  - time 2017年
    value 1200
  - time 2018年
    value 1000
title 出生人口变化
axisXTitle 年份
axisYTitle 出生人口（万人）
`;

const lineVis = new GPTVis({
  container: document.getElementById('syntax-line')!,
  width: 500,
  height: 400,
  theme: 'default',
});

lineVis.render(lineSyntax);

// Example 3: Bar Chart with Syntax
const barSyntax = `
vis bar
data
  - category 2015年
    value 80
  - category 2016年
    value 140
  - category 2017年
    value 220
  - category 2018年
    value 280
title 外卖收入
`;

const barVis = new GPTVis({
  container: document.getElementById('syntax-bar')!,
  width: 500,
  height: 400,
  theme: 'default',
});

barVis.render(barSyntax);

// Example 4: Pie with Custom Style
const pieSyntaxWithStyle = `
vis pie
data
  - category TypeScript
    value 45
  - category JavaScript
    value 30
  - category Python
    value 15
  - category Other
    value 10
innerRadius: 0.5
style
  palette #3178c6 #f7df1e #3776ab #666666
`;

const pieStyleVis = new GPTVis({
  container: document.getElementById('syntax-pie-style')!,
  width: 500,
  height: 400,
  theme: 'default',
});

pieStyleVis.render(pieSyntaxWithStyle);
