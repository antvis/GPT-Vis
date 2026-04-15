# Column

柱状图（Column Chart），用于对比不同类别的数据大小，以垂直方向的矩形柱体直观呈现各类别数值高低。支持基础柱状图、分组柱状图和堆叠柱状图三种形式，适合展示各类别之间的数量差异与对比关系。

## 适用场景

1. 离散类别对比：展示不同类别之间的数值大小差异，例如不同城市的销售量、不同产品的营收对比。
2. 时间段对比：对比有限数量的时间节点数据，例如各年度收入、各季度利润变化。
3. 分组多维对比：通过分组柱状图同时比较多个维度的数据，例如不同城市各车型的销售量对比。
4. 堆叠展示构成关系：通过堆叠柱状图展示各类别的总量及其内部组成结构，例如各地区不同产品线的销售占比。

## 不适用场景

1. 不适合展示时间序列的连续趋势变化，建议使用折线图或面积图。
2. 当类别数量过多时，柱状图会显得拥挤，建议筛选关键类别或改用条形图。
3. 不适合展示比例或占比关系，建议使用饼图或环形图。

## 配置

| 属性                  | 类型             | 是否必填 | 默认值    | 说明                                                |
| --------------------- | ---------------- | -------- | --------- | --------------------------------------------------- |
| type                  | string           | 必填     | -         | 图表类型，值为 "column"                             |
| data                  | ColumnDataItem[] | 必填     | -         | 柱状图数据                                          |
| data[n].category      | string           | 必填     | -         | 类别名称                                            |
| data[n].value         | number           | 必填     | -         | 数据数值                                            |
| data[n].group         | string           | 选填     | -         | 分组名称，用于分组或堆叠柱状图                      |
| group                 | boolean          | 选填     | false     | 是否启用分组模式，需配合数据中的 group 字段使用     |
| stack                 | boolean          | 选填     | false     | 是否启用堆叠模式，需配合数据中的 group 字段使用     |
| title                 | string           | 选填     | -         | 图表标题                                            |
| axisXTitle            | string           | 选填     | -         | X 轴标题                                            |
| axisYTitle            | string           | 选填     | -         | Y 轴标题                                            |
| theme                 | string           | 选填     | "default" | 图表主题，可选值为 "default" \| "academy" \| "dark" |
| style                 | object           | 选填     | -         | 图表样式                                            |
| style.backgroundColor | string           | 选填     | -         | 背景颜色，合法颜色值                                |
| style.palette         | string[]         | 选填     | -         | 颜色映射，合法颜色值数组                            |

## 示例

### 展示各产业产值对比

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

const visSyntax = `
vis column
data
  - category 第一产业
    value 7200
  - category 第二产业
    value 36600
  - category 第三产业
    value 41000
title 各产业产值对比
axisXTitle 产业
axisYTitle 产值（亿元）
`;

gptVis.render(visSyntax);
```

### 展示分组柱状图

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

const visSyntax = `
vis column
data
  - category 北京
    value 825.6
    group 油车
  - category 北京
    value 60.2
    group 新能源汽车
  - category 上海
    value 450
    group 油车
  - category 上海
    value 95
    group 新能源汽车
group true
title 油车与新能源汽车售卖量
axisXTitle 城市
axisYTitle 售卖量（万辆）
`;

gptVis.render(visSyntax);
```

### 展示堆叠柱状图

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

const visSyntax = `
vis column
data
  - category 北京
    value 825.6
    group 油车
  - category 北京
    value 60.2
    group 新能源汽车
  - category 上海
    value 450
    group 油车
  - category 上海
    value 95
    group 新能源汽车
stack true
title 油车与新能源汽车售卖量
axisXTitle 城市
axisYTitle 售卖量（万辆）
`;

gptVis.render(visSyntax);
```

### 使用 dark 主题展示收入数据

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

const visSyntax = `
vis column
data
  - category 2015 年
    value 80
  - category 2016 年
    value 140
  - category 2017 年
    value 220
theme dark
title 海底捞公司外卖收入
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
vis column
data
  - category 2015 年
    value 80
  - category 2016 年
    value 140
  - category 2017 年
    value 220
title 海底捞公司外卖收入
style
  palette #FF6B6B #4ECDC4 #45B7D1
  backgroundColor #F5F5F5
`;

gptVis.render(visSyntax);
```
