# Table

表格（Table），用于以行列结构展示结构化数据的组件。支持自动计算列宽、悬停高亮交互以及深色主题，适合展示报表、列表、统计数据等场景。

## 适用场景

1. 多字段结构化数据展示，如报表、清单、统计汇总等需要行列对齐呈现的场景。
2. 多条目精确数值对比，需要逐行查看并比较各项具体数值时。
3. 需要同时查看多个属性的场景，每条数据包含多个维度字段，适合用表格一览全貌。
4. 统计报表与清单呈现，如数据汇总、指标统计、明细列表等结构固定的表格型内容。

## 不适用场景

1. 不适合展示具有层级或网络关系的数据，建议使用树图或关系图。
2. 不适合用于强调数据分布、趋势或占比，建议使用柱状图、折线图或饼图。
3. 当数据量极大且字段繁多时，建议配合分页或分组处理，避免单表呈现。

## 配置

- type：图表类型，必填，文本类型，值为 "table"。
- data：表格数据，必填，数组类型，每项为一个对象，对象的键名将作为列标题，值为对应单元格内容。
- title：图表标题，选填，文本类型。
- theme：图表主题，选填，文本类型，可选值为 "default" | "dark"，默认值为 "default"。

## 示例

### 展示餐饮业营收额数据

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

const visSyntax = `
vis table
data
  - 类别 火锅
    营收额占比(%) 22
  - 类别 自助餐
    营收额占比(%) 12
  - 类别 小吃快餐
    营收额占比(%) 8
  - 类别 西餐
    营收额占比(%) 6
  - 类别 其它
    营收额占比(%) 44
title 餐饮业营收额数据表
`;

gptVis.render(visSyntax);
```

### 带标题的餐饮业数据表

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

const visSyntax = `
vis table
data
  - 类别 火锅
    营收额占比(%) 22
  - 类别 自助餐
    营收额占比(%) 12
  - 类别 小吃快餐
    营收额占比(%) 8
  - 类别 西餐
    营收额占比(%) 6
  - 类别 其它
    营收额占比(%) 44
title 餐饮业营收额数据表
`;

gptVis.render(visSyntax);
```

### 展示全国人口分布数据

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

const visSyntax = `
vis table
data
  - 人口类型 城镇人口
    数量(万人) 63.89
  - 人口类型 乡村人口
    数量(万人) 36.11
title 全国人口居住分布
`;

gptVis.render(visSyntax);
```

### 展示产业结构数据

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

const visSyntax = `
vis table
data
  - 产业类型 第一产业
    产值(亿元) 7200.0
  - 产业类型 第二产业
    产值(亿元) 36600.0
  - 产业类型 第三产业
    产值(亿元) 41000.0
`;

gptVis.render(visSyntax);
```

### 展示地震统计数据

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

const visSyntax = `
vis table
data
  - Indicator 经度(°)
    Mean 104.15°
    Std ±0.64°
    Range 103.19-105.28
    Q1Q3 103.62-104.68°
  - Indicator 纬度(°)
    Mean 31.60°
    Std ±0.48°
    Range 30.89-32.45°
    Q1Q3 31.21-32.00°
  - Indicator 深度(km)
    Mean 11.82
    Std ±5.67
    Range 3.0-34.8
    Q1Q3 10.0-10.0
  - Indicator 震级(mag)
    Mean 5.29
    Std ±0.49
    Range 5.0-7.9
    Q1Q3 5.0-5.4
title 地震数据统计表
`;

gptVis.render(visSyntax);
```
