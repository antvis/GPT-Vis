# Treemap

矩阵树图（Treemap Chart），用于展示层级结构数据的图表。通过将数据以嵌套矩形的形式呈现，每个矩形的面积代表对应的数值大小，颜色区分不同类别，直观展示各层级的占比关系。适合分析具有层级结构的数据分布情况。

## 适用场景

1. 展示具有父子层级关系的数据，通过嵌套矩形直观呈现各层级的结构与面积占比关系。
2. 磁盘空间、预算分配、资源占用等分析场景，快速定位占比较大的类别。
3. 产品分类销售额、组织架构人员规模等多层级数据的对比展示。
4. 同时需要呈现层级结构与数量大小关系时，矩形面积与颜色双重编码使信息一目了然。

## 不适用场景

1. 不适合展示时间序列或趋势变化数据。
2. 不适合用于精确数值对比，矩形面积难以精确读取数值。
3. 当数据层级过深或类别过多时，矩形会过于细碎，建议改用其他图表。

## 配置

- type：图表类型，必填，文本类型，值为 "treemap"。
- data：矩阵树图数据，必填，数组类型，每项包含以下字段：
  - name：数据名称，必填，文本类型。
  - value：数据数值，必填，数值类型。
  - children：子节点数据，选填，数组类型，结构与父节点相同，支持多级嵌套。
- title：图表标题，选填，文本类型。
- theme：图表主题，选填，文本类型，可选值为 "default" | "academy" | "dark"，默认值为 "default"。
- style：图表样式，选填，对象类型，包含以下字段：
  - backgroundColor：背景颜色，选填，文本类型，合法颜色值。
  - palette：颜色映射，选填，数组类型，合法颜色值数组。

## 示例

### 展示产品分类销售额占比

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

const visSyntax = `
vis treemap
data
  - name 苹果
    value 800
    children
      - name 红富士
        value 400
      - name 黄元帅
        value 400
  - name 橙子
    value 600
  - name 香蕉
    value 500
title 水果销售量
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
vis treemap
data
  - name A
    value 100
    children
      - name A1
        value 40
      - name A2
        value 30
      - name A3
        value 30
theme academy
`;

gptVis.render(visSyntax);
```

### 带标题展示水果销售量

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

const visSyntax = `
vis treemap
data
  - name 苹果
    value 800
    children
      - name 红富士
        value 400
      - name 黄元帅
        value 400
  - name 橙子
    value 600
  - name 香蕉
    value 500
title 水果销售量
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
vis treemap
data
  - name A
    value 100
  - name B
    value 80
  - name C
    value 60
style
  palette #FF6B6B #4ECDC4 #45B7D1
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
vis treemap
data
  - name A
    value 100
    children
      - name A1
        value 40
      - name A2
        value 30
      - name A3
        value 30
theme dark
`;

gptVis.render(visSyntax);
```

### 展示多层级数据

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

const visSyntax = `
vis treemap
data
  - name 部门A
    value 200
    children
      - name 组A1
        value 100
        children
          - name 成员1
            value 50
          - name 成员2
            value 50
      - name 组A2
        value 100
`;

gptVis.render(visSyntax);
```
