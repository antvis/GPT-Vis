# Line

折线图（Line Chart），用于展示数据随时间或有序类别变化的趋势图表。通过连续的折线直观呈现数值的升降走势，支持多组数据对比，适合分析趋势变化和不同序列之间的关系。

## 适用场景

1. 时间序列趋势分析：展示数据随时间的变化趋势，如人口变化、销售走势、温度波动等。
2. 连续变化观察：呈现连续类别下的数值升降走势，直观反映变化的幅度与节奏。
3. 多指标趋势对比：通过多折线同时展示多个指标的变化规律，便于横向比较各序列之间的关系。
4. 预测走势展示：结合历史数据与预测数据，直观呈现未来趋势的走向与预期范围。

## 不适用场景

1. 不适合展示离散类别之间无连续关系的数据对比，建议使用柱状图或条形图。
2. 不适合用于展示各部分占比关系，建议使用饼图。
3. 当数据点极少（少于 3 个）时，折线图的趋势表现力有限，建议直接使用数值展示。

## 配置

- type：图表类型，必填，文本类型，值为 "line"。
- data：折线图数据，必填，数组类型，每项包含以下字段：
  - time：时间或类别值，必填，文本或数值类型。
  - value：数据数值，必填，数值类型。
  - group：分组名称，选填，文本类型，用于多折线图。
- title：图表标题，选填，文本类型。
- axisXTitle：X 轴标题，选填，文本类型。
- axisYTitle：Y 轴标题，选填，文本类型。
- theme：图表主题，选填，文本类型，可选值为 "default" | "academy" | "dark"，默认值为 "default"。
- style：图表样式，选填，对象类型，包含以下字段：
  - backgroundColor：背景颜色，选填，文本类型，合法颜色值。
  - palette：颜色映射，选填，数组类型，合法颜色值数组。
  - lineWidth：折线宽度，选填，数值类型，默认值为 2。

## 示例

### 展示出生人口变化趋势

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

const visSyntax = `
vis line
data
  - time 2015年
    value 1700
  - time 2016年
    value 1500
  - time 2017年
    value 1200
title 出生人口变化
`;

gptVis.render(visSyntax);
```

### 展示多折线对比数据

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

const visSyntax = `
vis line
data
  - time 2015年
    value 1700
    group 出生人口
  - time 2015年
    value 965
    group 死亡人口
  - time 2016年
    value 1500
    group 出生人口
  - time 2016年
    value 846
    group 死亡人口
title 出生人口与死亡人口变化
`;

gptVis.render(visSyntax);
```

### 使用 academy 主题展示人口变化

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

const visSyntax = `
vis line
data
  - time 2015年
    value 1700
  - time 2016年
    value 1500
  - time 2017年
    value 1200
title 出生人口变化
theme academy
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
vis line
data
  - time 2015年
    value 1700
  - time 2016年
    value 1500
  - time 2017年
    value 1200
title 出生人口变化
style
  palette #FF6B6B #4ECDC4 #45B7D1
  lineWidth 3
  backgroundColor #F5F5F5
`;

gptVis.render(visSyntax);
```
