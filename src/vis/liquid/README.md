# Liquid

水波图（Liquid Chart），用于以动态水波填充效果展示进度、完成率或百分比数值的图表。通过圆形、矩形、水滴等形状中水位的高低直观表达当前数值水平，视觉冲击力强，适合单一指标的进度呈现。

## 适用场景

1. 单一百分比进度展示：以水位高低直观呈现某项指标的当前完成程度，视觉冲击力强。
2. KPI 达成率：展示关键绩效指标的实际达成情况，一眼判断是否达标。
3. 目标完成情况：如项目进度、销售目标、学习计划等，清晰反映与目标的差距。
4. 资源利用率：展示存储空间、内存占用、带宽使用等资源的消耗比例。

## 不适用场景

1. 不适合展示多个指标或多维度对比数据。
2. 不适合用于时间序列或趋势分析。
3. 当需要展示分类数据或数值分布时，建议使用柱状图或饼图。

## 配置

| 属性                  | 类型     | 是否必填 | 默认值    | 说明                                                         |
| --------------------- | -------- | -------- | --------- | ------------------------------------------------------------ |
| type                  | string   | 必填     | -         | 图表类型，值为 "liquid"                                      |
| percent               | number   | 必填     | -         | 水位百分比，取值范围为 0 到 1（如 0.75 表示 75%）            |
| shape                 | string   | 选填     | "circle"  | 图表形状，可选值为 "circle" \| "rect" \| "pin" \| "triangle" |
| title                 | string   | 选填     | -         | 图表标题                                                     |
| theme                 | string   | 选填     | "default" | 图表主题，可选值为 "default" \| "academy" \| "dark"          |
| style                 | object   | 选填     | -         | 图表样式                                                     |
| style.backgroundColor | string   | 选填     | -         | 背景颜色，合法颜色值                                         |
| style.palette         | string[] | 选填     | -         | 颜色映射，合法颜色值数组，仅使用第一个颜色作为水波填充色     |

## 示例

### 展示任务完成率

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

const visSyntax = `
vis liquid
percent 0.75
title 任务完成率
`;

gptVis.render(visSyntax);
```

### 带标题展示完成率

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

const visSyntax = `
vis liquid
percent 0.6
title 任务完成率
`;

gptVis.render(visSyntax);
```

### 展示不同形状

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

const visSyntax = `
vis liquid
percent 0.85
shape pin
`;

gptVis.render(visSyntax);
```

### 使用不同主题

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

const visSyntax = `
vis liquid
percent 0.75
theme academy
`;

gptVis.render(visSyntax);
```

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

const visSyntax = `
vis liquid
percent 0.6
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
vis liquid
percent 0.92
title KPI 达成率
shape triangle
style
  palette #00BFFF
  backgroundColor #F0F0F0
`;

gptVis.render(visSyntax);
```
