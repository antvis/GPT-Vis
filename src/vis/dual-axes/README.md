# DualAxes

双轴图（Dual-Axes Chart），将柱形图与折线图组合在同一坐标系中，左右各设一条独立 Y 轴，用于同时展示两个量纲不同的数据系列。常见于对比绝对量与比率、收入与增长率等场景，能清晰呈现两类指标的关联趋势。

## 适用场景

1. 同时展示两个量纲或单位不同的指标，如销售额（元）与利润率（%）、访问量与转化率等，避免单轴刻度失真。
2. 分析两类指标之间的相关性与变化趋势，直观观察它们在同一时间轴上的联动关系。
3. 以柱线组合形式对比绝对值与比率，如用柱形展示营收规模、用折线展示同比增长率。
4. 在同一类别或时间序列下进行多指标横向对比，帮助发现潜在的业务规律。

## 不适用场景

1. 不适合展示超过两个系列的数据，过多系列会导致图表难以阅读。
2. 不适合两组数据量纲相近的场景，此时普通折线图或柱状图更合适。
3. 当数据无时间或类别顺序时，不适合使用双轴图。

## 配置

| 属性                  | 类型                   | 是否必填 | 默认值      | 说明                                                      |
| --------------------- | ---------------------- | -------- | ----------- | --------------------------------------------------------- |
| type                  | string                 | 选填     | -           | 图表类型，值为 "dual-axes"                                |
| categories            | string[]               | 必填     | -           | X 轴类目数据                                              |
| series                | DualAxesSeriesItem[]   | 必填     | -           | 系列数据，每项定义一个数据系列                            |
| series[n].type        | `"line"` \| `"column"` | 必填     | -           | 系列类型                                                  |
| series[n].data        | number[]               | 必填     | -           | 系列数值数组                                              |
| series[n].axisYTitle  | string                 | 选填     | -           | Y 轴标题，同时作为图例名称                                |
| title                 | string                 | 选填     | -           | 图表标题                                                  |
| axisXTitle            | string                 | 选填     | -           | X 轴标题                                                  |
| theme                 | string                 | 选填     | `"default"` | 图表主题，可选值为 `"default"` \| `"academy"` \| `"dark"` |
| style.backgroundColor | string                 | 选填     | -           | 背景颜色，合法颜色值                                      |
| style.palette         | string[]               | 选填     | -           | 颜色映射，合法颜色值数组                                  |
| style.startAtZero     | boolean                | 选填     | `false`     | Y 轴是否从零开始                                          |

## 示例

### 展示销售额与利润率双轴对比

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

const visSyntax = `
vis dual-axes
categories
  - 2018
  - 2019
  - 2020
  - 2021
  - 2022
series
  - type column
    axisYTitle 销售额
    data
      - 91.9
      - 99.1
      - 101.6
      - 114.4
      - 121
  - type line
    axisYTitle 利润率
    data
      - 0.055
      - 0.06
      - 0.062
      - 0.07
      - 0.075
title 2018-2022 年销售额与利润率
`;

gptVis.render(visSyntax);
```

### 带标题和 X 轴标签的双轴图

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

const visSyntax = `
vis dual-axes
categories
  - 2018
  - 2019
  - 2020
  - 2021
  - 2022
title 2018-2022 销售额与利润率
axisXTitle 年份
series
  - type column
    axisYTitle 销售额
    data
      - 91.9
      - 99.1
      - 101.6
      - 114.4
      - 121
  - type line
    axisYTitle 利润率
    data
      - 0.055
      - 0.06
      - 0.062
      - 0.07
      - 0.075
`;

gptVis.render(visSyntax);
```

### 使用 academy 主题

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

const visSyntax = `
vis dual-axes
categories
  - 2020
  - 2021
  - 2022
theme academy
series
  - type column
    axisYTitle 营收
    data
      - 500
      - 600
      - 700
  - type line
    axisYTitle 增长率
    data
      - 10
      - 12
      - 15
`;

gptVis.render(visSyntax);
```

### 自定义颜色样式

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

const visSyntax = `
vis dual-axes
categories
  - 一月
  - 二月
  - 三月
  - 四月
  - 五月
series
  - type column
    axisYTitle 销售额
    data
      - 120
      - 150
      - 180
      - 210
      - 240
  - type line
    axisYTitle 增长
    data
      - 8
      - 10
      - 12
      - 15
      - 18
style
  palette #5B8FF9 #61DDAA
  backgroundColor #F8F9FA
  startAtZero true
`;

gptVis.render(visSyntax);
```

### 使用 dark 主题

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

const visSyntax = `
vis dual-axes
categories
  - Q1
  - Q2
  - Q3
  - Q4
theme dark
series
  - type column
    axisYTitle 营收
    data
      - 100
      - 120
      - 140
      - 160
  - type line
    axisYTitle 利润
    data
      - 5
      - 6
      - 7
      - 8
`;

gptVis.render(visSyntax);
```
