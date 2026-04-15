# Area

面积图（Area Chart），用于展示数据随时间或类别的变化趋势及累计量的图表。以填充颜色的区域直观呈现数值的高低变化，支持多组数据的叠加或分组展示，便于对比不同组的走势与总量。

## 适用场景

1. 展示时间序列数据的趋势变化，如股价、气温、销售额等随时间的波动与走势。
2. 多组数据的堆叠或分组对比，直观呈现各组数据的占比关系与整体趋势。
3. 展示总量与各部分构成，通过堆叠面积图反映各分类在总量中的比重变化。
4. 连续数据变化的可视化，借助填充区域强调数值的累计效果与变化幅度。

## 不适用场景

1. 不适合展示离散类别数据的对比，建议使用柱状图或条形图。
2. 不适合展示单一时间点的数据分布，建议使用饼图或环形图。
3. 当数据组数过多、面积区域相互遮盖时，可读性会显著下降。

## 配置

- type：图表类型，必填，文本类型，值为 "area"。
- data：面积图数据，必填，数组类型，每项包含以下字段：
  - time：时间或类别值，必填，文本或数值类型。
  - value：数据数值，必填，数值类型。
  - group：分组名称，选填，文本类型，用于多面积或堆叠面积图。
- stack：是否开启堆叠模式，选填，布尔类型，需同时提供 group 字段，默认值为 false。
- title：图表标题，选填，文本类型。
- axisXTitle：X 轴标题，选填，文本类型。
- axisYTitle：Y 轴标题，选填，文本类型。
- theme：图表主题，选填，文本类型，可选值为 "default" | "academy" | "dark"，默认值为 "default"。
- style：图表样式，选填，对象类型，包含以下字段：
  - backgroundColor：背景颜色，选填，文本类型，合法颜色值。
  - palette：颜色映射，选填，数组类型，合法颜色值数组。
  - lineWidth：面积边框线宽，选填，数值类型，单位为像素，默认值为 2。

## 示例

### 展示股票价格月度变化趋势

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

const visSyntax = `
vis area
data
  - time 1月
    value 23.895
  - time 2月
    value 23.695
  - time 3月
    value 23.655
title 1月到3月股票价格的变化
axisXTitle 月份
axisYTitle 价格
`;

gptVis.render(visSyntax);
```

### 展示多城市空气污染指数堆叠面积图

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

const visSyntax = `
vis area
data
  - time 2019年
    value 150
    group 北京
  - time 2020年
    value 160
    group 北京
  - time 2021年
    value 145
    group 北京
  - time 2019年
    value 100
    group 广州
  - time 2020年
    value 110
    group 广州
  - time 2021年
    value 105
    group 广州
stack true
title 城市空气污染指数变化
axisXTitle 年份
axisYTitle 空气污染指数
`;

gptVis.render(visSyntax);
```

### 使用 dark 主题展示股票价格变化

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

const visSyntax = `
vis area
data
  - time 1月
    value 23.895
  - time 2月
    value 23.695
  - time 3月
    value 23.655
title 股票价格变化
theme dark
`;

gptVis.render(visSyntax);
```

### 自定义颜色样式展示

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

const visSyntax = `
vis area
data
  - time 1月
    value 23.895
  - time 2月
    value 23.695
  - time 3月
    value 23.655
style
  palette #FF6B6B #4ECDC4 #45B7D1
  lineWidth 3
  backgroundColor #F5F5F5
`;

gptVis.render(visSyntax);
```
