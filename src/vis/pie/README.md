# Pie

饼图（Pie Chart），用于展示各分类数据在整体中所占比例的图表。以圆形划分为若干扇形区域，每个扇形的面积代表对应分类的占比大小，直观反映各类别的构成关系。支持环形图（Donut Chart）展示形式。

## 适用场景

1. 整体构成比例展示：直观呈现各分类在整体中所占的份额，适合用户构成、品类占比等场景。
2. 市场份额分析：对比不同品牌、产品或企业在市场中的占有率，清晰展示竞争格局。
3. 预算与资源分配：展示各项目或部门的预算分配情况，帮助决策者快速了解资源投入结构。
4. 类别占比直观对比：适合分类数量较少（建议不超过 6 个）且各类别差异明显的场景，扇形面积差异一目了然。

## 不适用场景

1. 不适合展示时间序列或趋势变化数据。
2. 不适合分类数量过多的场景，类别过多会导致扇形过小，难以辨识。
3. 当需要精确比较各分类数值大小时，建议使用柱状图或条形图。

## 配置

- type：图表类型，必填，文本类型，值为 "pie"。
- data：饼图数据，必填，数组类型，每项包含以下字段：
  - category：数据名称，必填，文本类型。
  - value：数据数值，必填，数值类型。
- innerRadius：内半径比例，选填，数值类型，取值范围 0~1，设置后呈现为环形图，默认值为 0。
- title：图表标题，选填，文本类型。
- theme：图表主题，选填，文本类型，可选值为 "default" | "academy" | "dark"，默认值为 "default"。
- style：图表样式，选填，对象类型，包含以下字段：
  - backgroundColor：背景颜色，选填，文本类型，合法颜色值。
  - palette：颜色映射，选填，数组类型，合法颜色值数组。

## 示例

### 展示各分类占比数据

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

const visSyntax = `
vis pie
data
  - category 分类一
    value 27
  - category 分类二
    value 25
title 餐饮业营收额占比
`;

gptVis.render(visSyntax);
```

### 展示环形图

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

const visSyntax = `
vis pie
data
  - category 分类一
    value 27
  - category 分类二
    value 25
innerRadius 0.6
title 环形图示例
`;

gptVis.render(visSyntax);
```

### 使用 academy 主题展示

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

const visSyntax = `
vis pie
data
  - category 分类一
    value 27
  - category 分类二
    value 25
  - category 分类三
    value 18
  - category 分类四
    value 15
  - category 分类五
    value 10
  - category 其他
    value 5
theme academy
title 使用 academy 主题
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
vis pie
data
  - category 分类一
    value 27
  - category 分类二
    value 25
  - category 分类三
    value 18
  - category 分类四
    value 15
  - category 分类五
    value 10
  - category 其他
    value 5
style
  palette #FF6B6B #4ECDC4 #45B7D1 #FFA07A
title 自定义颜色饼图
`;

gptVis.render(visSyntax);
```
