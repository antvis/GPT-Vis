# Funnel

漏斗图（Funnel Chart），用于展示数据在多个阶段逐步流失或转化的图表。通常以漏斗形状表现各阶段的数据量，顶部宽底部窄，直观反映每个环节的数量变化和转化率。适合分析流程中的瓶颈和优化空间。

## 适用场景

1. 用户转化率分析：展示用户从注册、激活到付费等各环节的转化情况，识别流失瓶颈。
2. 销售漏斗管理：呈现销售流程中从线索、跟进、报价到成交各阶段的数量变化与转化效率。
3. 电商购物路径分析：追踪用户从浏览、加购、下单到支付的各步骤流失情况，优化购物体验。
4. 招聘与活动筛选流程：反映招聘各轮筛选或活动报名、签到、参与等多阶段的人数递减情况。

## 不适用场景

1. 不适合展示单一指标或无阶段的数据。
2. 不适合用于时间序列或趋势分析。
3. 当需要展示复杂类别对比时，建议使用柱状图或堆叠图。

## 配置

- type：图表类型，必填，文本类型，值为 "funnel"。
- data：漏斗图数据，必填，数组类型，每项包含以下字段：
  - category：数据名称，必填，文本类型。
  - value：数据数值，必填，数值类型。
- title：图表标题，选填，文本类型。
- theme：图表主题，选填，文本类型，可选值为 "default" | "academy" | "dark"，默认值为 "default"。
- style：图表样式，选填，对象类型，包含以下字段：
  - backgroundColor：背景颜色，选填，文本类型，合法颜色值。
  - palette：颜色映射，选填，数组类型，合法颜色值数组。

## 示例

### 展示销售漏斗各阶段数据

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

const visSyntax = `
vis funnel
data
  - category 访问
    value 1000
  - category 咨询
    value 600
  - category 下单
    value 300
  - category 成交
    value 120
title 销售漏斗
`;

gptVis.render(visSyntax);
```

### 展示用户转化流程，使用 dark 主题

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

const visSyntax = `
vis funnel
data
  - category 注册
    value 800
  - category 激活
    value 500
  - category 付费
    value 200
title 用户转化流程
theme dark
`;

gptVis.render(visSyntax);
```

### 展示活动参与漏斗，自定义颜色

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

const visSyntax = `
vis funnel
data
  - category 报名
    value 1500
  - category 签到
    value 900
  - category 参与
    value 700
title 活动参与漏斗
style
  palette #FF7F50 #87CEFA #32CD32
  backgroundColor #FFF8DC
`;

gptVis.render(visSyntax);
```
