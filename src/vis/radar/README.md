# Radar

雷达图（Radar Chart），用于展示多维度数据的综合评估图表。以多边形或蜘蛛网形状呈现各维度的数值大小，直观反映不同维度间的差异与均衡程度。适合对多个指标进行全面对比和综合评价。

## 适用场景

1. 多维度能力或指标评估，直观呈现各维度的强弱分布与整体均衡程度，如员工能力评估、产品性能评分。
2. 产品或方案的综合对比，将多个评价维度集中在同一图表中，便于全面横向比较。
3. 个人或团队能力画像，通过雷达图形状直观展示能力结构特征与短板所在。
4. 竞品多维对比分析，同时呈现多组数据，清晰揭示不同对象在各维度上的差异。

## 不适用场景

1. 不适合展示少于三个维度的数据。
2. 不适合用于时间序列或趋势分析。
3. 当维度之间含义差异较大或需要精确数值对比时，建议使用柱状图或条形图。

## 配置

| 属性                  | 类型            | 是否必填 | 默认值    | 说明                                                |
| --------------------- | --------------- | -------- | --------- | --------------------------------------------------- |
| type                  | string          | 必填     | -         | 图表类型，值为 "radar"                              |
| data                  | RadarDataItem[] | 必填     | -         | 雷达图数据                                          |
| data[n].name          | string          | 必填     | -         | 维度名称                                            |
| data[n].value         | number          | 必填     | -         | 维度数值                                            |
| data[n].group         | string          | 选填     | -         | 分组名称，用于多系列对比                            |
| title                 | string          | 选填     | -         | 图表标题                                            |
| theme                 | string          | 选填     | "default" | 图表主题，可选值为 "default" \| "academy" \| "dark" |
| style                 | object          | 选填     | -         | 图表样式                                            |
| style.backgroundColor | string          | 选填     | -         | 背景颜色，合法颜色值                                |
| style.palette         | string[]        | 选填     | -         | 颜色映射，合法颜色值数组                            |
| style.lineWidth       | number          | 选填     | 2         | 折线宽度                                            |

## 示例

### 展示个人能力多维度评估

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

const visSyntax = `
vis radar
data
  - name 沟通能力
    value 2
  - name 协作能力
    value 3
  - name 领导能力
    value 2
  - name 学习能力
    value 5
  - name 创新能力
    value 6
  - name 技术能力
    value 9
title 个人能力评估
`;

gptVis.render(visSyntax);
```

### 带标题的营养成分分析

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

const visSyntax = `
vis radar
data
  - name Vitamin C
    value 7
  - name Fiber
    value 6
  - name Sugar
    value 5
  - name Protein
    value 4
  - name Iron
    value 3
  - name Calcium
    value 2
title 营养成分分析
`;

gptVis.render(visSyntax);
```

### 多组数据对比

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

const visSyntax = `
vis radar
data
  - name 语文
    value 95
    group 一班
  - name 数学
    value 96
    group 一班
  - name 外语
    value 85
    group 一班
  - name 物理
    value 63
    group 一班
  - name 化学
    value 91
    group 一班
  - name 语文
    value 75
    group 二班
  - name 数学
    value 93
    group 二班
  - name 外语
    value 66
    group 二班
  - name 物理
    value 85
    group 二班
  - name 化学
    value 88
    group 二班
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
vis radar
data
  - name Attack
    value 85
    group 英雄A
  - name Defense
    value 70
    group 英雄A
  - name Speed
    value 90
    group 英雄A
  - name HP
    value 75
    group 英雄A
  - name MP
    value 60
    group 英雄A
  - name Attack
    value 65
    group 英雄B
  - name Defense
    value 90
    group 英雄B
  - name Speed
    value 70
    group 英雄B
  - name HP
    value 85
    group 英雄B
  - name MP
    value 80
    group 英雄B
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
vis radar
data
  - name 类别A
    value 8
    group 产品X
  - name 类别B
    value 7
    group 产品X
  - name 类别C
    value 6
    group 产品X
  - name 类别A
    value 6
    group 产品Y
  - name 类别B
    value 9
    group 产品Y
  - name 类别C
    value 8
    group 产品Y
style
  palette
    - #FF6B6B
    - #4ECDC4
  backgroundColor #F8F9FA
  lineWidth 3
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
vis radar
data
  - name 技能1
    value 90
  - name 技能2
    value 75
  - name 技能3
    value 85
  - name 技能4
    value 70
  - name 技能5
    value 95
theme dark
`;

gptVis.render(visSyntax);
```
