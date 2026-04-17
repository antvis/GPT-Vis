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

| 属性                  | 类型             | 是否必填 | 默认值    | 说明                                                |
| --------------------- | ---------------- | -------- | --------- | --------------------------------------------------- |
| type                  | string           | 必填     | -         | 图表类型，值为 "line"                               |
| data                  | LineDataItem[]   | 必填     | -         | 折线图数据                                          |
| data[n].time          | string \| number | 必填     | -         | 时间或类别值                                        |
| data[n].value         | number           | 必填     | -         | 数据数值                                            |
| data[n].group         | string           | 选填     | -         | 分组名称，用于多折线图                              |
| title                 | string           | 选填     | -         | 图表标题                                            |
| axisXTitle            | string           | 选填     | -         | X 轴标题                                            |
| axisYTitle            | string           | 选填     | -         | Y 轴标题                                            |
| theme                 | string           | 选填     | "default" | 图表主题，可选值为 "default" \| "academy" \| "dark" |
| style                 | object           | 选填     | -         | 图表样式                                            |
| style.backgroundColor | string           | 选填     | -         | 背景颜色，合法颜色值                                |
| style.palette         | string[]         | 选填     | -         | 颜色映射，合法颜色值数组                            |
| style.lineWidth       | number           | 选填     | 2         | 折线宽度                                            |

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
  palette
    - #FF6B6B
    - #4ECDC4
    - #45B7D1
  lineWidth 3
  backgroundColor #F5F5F5
`;

gptVis.render(visSyntax);
```
