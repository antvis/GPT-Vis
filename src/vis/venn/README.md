# Venn

韦恩图（Venn Chart），用于展示多个集合之间的关系、交集与并集的图表。通过重叠的圆形区域直观表现各集合的共同元素与独有元素，适合分析不同群体或类别之间的相似性与差异性。

## 适用场景

1. 集合关系展示：直观呈现两个或多个集合之间的交集、并集、包含或互斥关系。
2. 用户群体重叠分析：分析不同用户群体（如不同渠道、不同标签）之间的重叠与差异。
3. 功能或需求集合对比：对比多个产品、方案或需求之间共有与独有的特性。
4. 标签共现分析：展示多个标签或类别在数据集中同时出现的频率与关联程度。

## 不适用场景

1. 不适合展示超过三个集合的复杂交叉关系，可读性会显著下降。
2. 不适合用于时间序列或趋势分析。
3. 当需要精确展示数值大小对比时，建议使用柱状图或条形图。

## 配置

| 属性                  | 类型               | 是否必填 | 默认值    | 说明                                                                             |
| --------------------- | ------------------ | -------- | --------- | -------------------------------------------------------------------------------- |
| type                  | string             | 必填     | -         | 图表类型，值为 "venn"                                                            |
| data                  | VennDataItem[]     | 必填     | -         | 韦恩图数据，数组类型                                                             |
| data[n].sets          | string[] \| string | 必填     | -         | 集合标识，数组类型或逗号分隔的文本类型，单集合传入单元素数组，交集传入多元素数组 |
| data[n].value         | number             | 必填     | -         | 集合或交集的大小数值                                                             |
| data[n].label         | string             | 选填     | -         | 集合或交集的显示标签                                                             |
| title                 | string             | 选填     | -         | 图表标题                                                                         |
| theme                 | string             | 选填     | "default" | 图表主题，可选值为 "default" \| "academy" \| "dark"                              |
| style                 | object             | 选填     | -         | 图表样式                                                                         |
| style.backgroundColor | string             | 选填     | -         | 背景颜色，合法颜色值                                                             |
| style.palette         | string[]           | 选填     | -         | 颜色映射，合法颜色值数组                                                         |

## 示例

### 展示两个集合的交集关系

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

const visSyntax = `
vis venn
data
  - sets A
    value 20
    label 集合A
  - sets B
    value 15
    label 集合B
  - sets A,B
    value 5
    label 交集AB
title 集合交集示例
`;

gptVis.render(visSyntax);
```

### 展示三集合交集关系

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

const visSyntax = `
vis venn
data
  - sets A
    value 10
    label 集合A
  - sets B
    value 8
    label 集合B
  - sets C
    value 6
    label 集合C
  - sets A B
    value 4
  - sets A C
    value 2
  - sets B C
    value 1
  - sets A B C
    value 1
title 三集合关系
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
vis venn
data
  - sets A
    value 10
    label 集合A
  - sets B
    value 8
    label 集合B
  - sets C
    value 6
    label 集合C
  - sets A B
    value 4
  - sets A C
    value 2
  - sets B C
    value 1
  - sets A B C
    value 1
title 三集合关系
theme academy
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
vis venn
data
  - sets A
    value 10
    label 集合A
  - sets B
    value 8
    label 集合B
  - sets C
    value 6
    label 集合C
  - sets A B
    value 4
  - sets A C
    value 2
  - sets B C
    value 1
  - sets A B C
    value 1
title 三集合关系
theme dark
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
vis venn
data
  - sets A
    value 30
    label 购买手机
  - sets B
    value 25
    label 购买耳机
  - sets A B
    value 10
title 标签交集
style
  palette #FFB6C1 #87CEFA
  backgroundColor #F8F8FF
`;

gptVis.render(visSyntax);
```
