# Sankey

桑基图（Sankey Chart），用于展示节点之间的流量、能量或资金流转关系的图表。以有向带宽度的边连接各节点，边的宽度代表流量的大小，直观反映各路径的流量分配和比例关系。适合分析复杂流转网络中的主要路径和分布规律。

## 适用场景

1. 能源/物料流向分析：展示能源、物料在各生产环节或系统节点间的流转与损耗情况，直观呈现各路径的流量占比。
2. 资金流转路径：分析资金在投资、部门预算、收入来源等多个节点间的流向与分配，识别主要资金流向。
3. 用户转化路径：追踪用户在各页面、漏斗环节或行为步骤间的流转与流失，辅助优化产品体验与转化率。
4. 供应链流量分析：描述原材料、商品或信息在供应链各节点间的流动关系，帮助识别瓶颈与优化分配。

## 不适用场景

1. 不适合展示无流量关系或单一指标的数据。
2. 不适合用于时间序列或趋势分析。
3. 当节点数量极多、关系极为复杂时，建议对数据进行聚合或使用网络图。

## 配置

| 属性                  | 类型             | 是否必填 | 默认值    | 说明                                                              |
| --------------------- | ---------------- | -------- | --------- | ----------------------------------------------------------------- |
| type                  | string           | 必填     | -         | 图表类型，值为 "sankey"                                           |
| data                  | SankeyDataItem[] | 必填     | -         | 桑基图数据，数组类型                                              |
| data[n].source        | string           | 必填     | -         | 源节点名称                                                        |
| data[n].target        | string           | 必填     | -         | 目标节点名称                                                      |
| data[n].value         | number           | 必填     | -         | 流量数值                                                          |
| title                 | string           | 选填     | -         | 图表标题                                                          |
| nodeAlign             | string           | 选填     | "center"  | 节点对齐方式，可选值为 "left" \| "center" \| "right" \| "justify" |
| theme                 | string           | 选填     | "default" | 图表主题，可选值为 "default" \| "academy" \| "dark"               |
| style                 | object           | 选填     | -         | 图表样式                                                          |
| style.backgroundColor | string           | 选填     | -         | 背景颜色，合法颜色值                                              |
| style.palette         | string[]         | 选填     | -         | 颜色映射，合法颜色值数组                                          |

## 示例

### 展示能源流动关系

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

const visSyntax = `
vis sankey
data
  - source 煤炭
    target 发电厂
    value 120
  - source 天然气
    target 发电厂
    value 80
  - source 发电厂
    target 工业
    value 100
title 能源流动关系
`;

gptVis.render(visSyntax);
```

### 带标题和节点对齐方式

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

const visSyntax = `
vis sankey
data
  - source 煤炭
    target 发电厂
    value 120
  - source 天然气
    target 发电厂
    value 80
  - source 发电厂
    target 工业
    value 100
title 能源流动关系
nodeAlign justify
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
vis sankey
data
  - source 投资人
    target 创业公司
    value 200
  - source 创业公司
    target 市场营销
    value 80
  - source 创业公司
    target 研发
    value 120
title 资金流转路径
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
vis sankey
data
  - source 投资人
    target 创业公司
    value 200
  - source 创业公司
    target 市场营销
    value 80
  - source 创业公司
    target 研发
    value 120
title 资金流转路径
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
vis sankey
data
  - source 首页
    target 产品页
    value 300
  - source 产品页
    target 购物车
    value 150
  - source 购物车
    target 结算页
    value 100
title 用户行为路径
style
  palette #5B8FF9 #61DDAA #65789B #F6BD16 #7262FD
  backgroundColor #f0f2f5
`;

gptVis.render(visSyntax);
```
