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

| 属性                  | 类型          | 是否必填 | 默认值    | 说明                                                |
| --------------------- | ------------- | -------- | --------- | --------------------------------------------------- |
| type                  | string        | 必填     | -         | 图表类型，值为 "pie"                                |
| data                  | PieDataItem[] | 必填     | -         | 饼图数据，数组类型                                  |
| data[n].category      | string        | 必填     | -         | 数据名称                                            |
| data[n].value         | number        | 必填     | -         | 数据数值                                            |
| innerRadius           | number        | 选填     | 0         | 内半径比例，取值范围 0~1，设置后呈现为环形图        |
| title                 | string        | 选填     | -         | 图表标题                                            |
| theme                 | string        | 选填     | "default" | 图表主题，可选值为 "default" \| "academy" \| "dark" |
| style.backgroundColor | string        | 选填     | -         | 背景颜色，合法颜色值                                |
| style.palette         | string[]      | 选填     | -         | 颜色映射，合法颜色值数组                            |

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
