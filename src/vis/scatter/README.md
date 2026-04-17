# Scatter

散点图（Scatter Chart），用于展示两个数值变量之间的关系或分布规律。以坐标系中的点来表示数据，横轴和纵轴分别对应两个数值维度，直观呈现变量间的相关性、聚集性或离散性。支持通过分组字段区分不同类别的数据点。

## 适用场景

1. 两变量相关性分析：分析两个连续变量之间的相关关系，如身高与体重、广告投入与销售额、年龄与收入等，判断变量间是否存在正相关、负相关或无相关。
2. 数据分布与聚集规律发现：直观呈现数据点在坐标系中的分布形态，识别数据的集中区域、离散程度以及整体分布规律。
3. 异常值识别：通过观察远离主体数据点的孤立点，快速发现数据中的异常值或离群点，辅助数据清洗与质量检验。
4. 分组数据规律探索：支持通过分组字段区分不同类别的数据点，比较多组数据在二维空间中的分布差异与聚集趋势。

## 不适用场景

1. 不适合展示时间序列趋势，建议使用折线图。
2. 不适合数据量极少（少于 5 个点）时的关系分析，结论可信度低。
3. 当需要展示单一维度的分布时，建议使用直方图或箱线图。

## 配置

| 属性                  | 类型              | 是否必填 | 默认值    | 说明                                                |
| --------------------- | ----------------- | -------- | --------- | --------------------------------------------------- |
| type                  | string            | 必填     | -         | 图表类型，值为 "scatter"                            |
| data                  | ScatterDataItem[] | 必填     | -         | 散点图数据                                          |
| data[n].x             | number            | 必填     | -         | 横轴数值                                            |
| data[n].y             | number            | 必填     | -         | 纵轴数值                                            |
| data[n].group         | string            | 选填     | -         | 分组名称，用于区分多组数据                          |
| title                 | string            | 选填     | -         | 图表标题                                            |
| theme                 | string            | 选填     | "default" | 图表主题，可选值为 "default" \| "academy" \| "dark" |
| style.backgroundColor | string            | 选填     | -         | 背景颜色，合法颜色值                                |
| style.palette         | string[]          | 选填     | -         | 颜色映射，合法颜色值数组                            |

## 示例

### 展示广告投入与销售额的相关关系

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

const visSyntax = `
vis scatter
data
  - x 10
    y 15
  - x 20
    y 25
  - x 30
    y 35
  - x 40
    y 45
title 广告投入与销售额关系
`;

gptVis.render(visSyntax);
```

### 带标题的散点图

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

const visSyntax = `
vis scatter
data
  - x 10
    y 15
  - x 20
    y 25
  - x 30
    y 35
  - x 40
    y 45
title 广告投入与销售额关系
`;

gptVis.render(visSyntax);
```

### 展示分组散点图

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

const visSyntax = `
vis scatter
data
  - x 25
    y 5000
    group A
  - x 35
    y 7000
    group A
  - x 45
    y 10000
    group A
  - x 30
    y 6000
    group B
  - x 40
    y 8000
    group B
  - x 50
    y 11000
    group B
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
vis scatter
data
  - x 10
    y 15
  - x 20
    y 25
  - x 30
    y 35
  - x 40
    y 45
theme academy
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
vis scatter
data
  - x 10
    y 15
    group 分组A
  - x 20
    y 25
    group 分组A
  - x 30
    y 35
    group 分组B
  - x 40
    y 45
    group 分组B
style
  palette
    - #FF6B6B
    - #4ECDC4
    - #45B7D1
  backgroundColor #F8F9FA
`;

gptVis.render(visSyntax);
```
