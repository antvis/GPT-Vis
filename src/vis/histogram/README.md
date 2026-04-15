# Histogram

直方图（Histogram Chart），用于展示数值型数据的频率分布情况。将连续数据划分为若干区间（bins），以矩形的高度表示各区间内数据的频数，直观呈现数据的集中趋势与离散程度。适合分析数据的分布形态，如正态分布、偏态分布等。

## 适用场景

1. 连续数据分布可视化：展示连续数值型数据的频率分布，例如成绩分布、身高体重分布等，直观呈现数据的整体形态（如正态分布、偏态分布）。
2. 了解集中趋势与离散程度：帮助分析数据的均值区间、方差范围，快速判断数据是否集中或分散。
3. 质量控制中的偏差分析：用于生产或工程场景中检测产品尺寸、重量等指标的偏差分布，辅助识别异常值与规律性偏差。
4. 统计分析前的数据探索：在建模或深入分析前，通过直方图初步了解数据分布特征，为选择合适的统计方法提供依据。

## 不适用场景

1. 不适合展示分类数据或离散型数据的对比，建议使用柱状图。
2. 不适合用于趋势分析或时间序列数据，建议使用折线图。
3. 当数据量极少时，直方图的分布特征意义有限，不建议使用。

## 配置

- type：图表类型，必填，文本类型，值为 "histogram"。
- data：直方图数据，必填，数值数组类型，每项为一个数值。
- binNumber：分箱数量，选填，数值类型，控制将数据划分为多少个区间。
- title：图表标题，选填，文本类型。
- axisXTitle：X 轴标题，选填，文本类型。
- axisYTitle：Y 轴标题，选填，文本类型。
- theme：图表主题，选填，文本类型，可选值为 "default" | "academy" | "dark"，默认值为 "default"。
- style：图表样式，选填，对象类型，包含以下字段：
  - backgroundColor：背景颜色，选填，文本类型，合法颜色值。
  - palette：颜色映射，选填，数组类型，合法颜色值数组。

## 示例

### 展示成绩分布直方图

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

const visSyntax = `
vis histogram
data
  - 78
  - 88
  - 60
  - 100
  - 95
binNumber 5
title 成绩分布
`;

gptVis.render(visSyntax);
```

### 指定分箱数量展示成绩分布

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

const visSyntax = `
vis histogram
data 78 88 60 100 95
binNumber 5
title 成绩分布
`;

gptVis.render(visSyntax);
```

### 设置坐标轴标题

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

const visSyntax = `
vis histogram
data 1.2 3.4 3.7 4.3 5.2 5.8 6.1 6.5 6.8 7.1 7.3 7.7 8.3 8.6 8.8 9.1 9.2 9.4 9.5 9.7 10.5 10.7 10.8 11 11.1 11.2 11.3 11.4 11.7 12 12.9 13.3 13.7 13.8 13.9 14 14.2 14.5 15 15.2 15.6 16 16.3 17.3 17.5 17.9 18 20.6 21 23.4
axisXTitle 花瓣大小分布
axisYTitle 花瓣分布数量
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
vis histogram
data 78 88 60 100 95
binNumber 5
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
vis histogram
data 20 25 30 35 40 45 50
style
  palette #FF6B6B
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
vis histogram
data 78 88 60 100 95
binNumber 5
theme dark
`;

gptVis.render(visSyntax);
```
