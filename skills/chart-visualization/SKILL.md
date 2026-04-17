---
name: chart-visualization
description: 推荐并生成合适的数据可视化图表，使用 GPT-Vis 语法。支持 26 种图表：统计图表（折线、柱形、条形、饼图、面积、散点、双轴、直方图、箱线、雷达、漏斗、瀑布、水波、词云、小提琴、韦恩、矩阵树图）、流向图（桑基）、关系图（流程图、思维导图、缩进树、网络图、组织架构图、鱼骨图）、数据展示（表格、总结摘要）。
---

# 图表可视化技能

## 工作流程

1. **意图识别与图表选择**：根据用户意图和数据特征选择图表
2. **语法生成**：基于选定图表类型和数据生成 GPT-Vis 语法
3. **代码生成**：生成目标框架（HTML/React/Vue）的可渲染代码

### 支持的图表类型

| 名称       | 别名             | 英文名             | 适用场景                       | 分析意图           |
| ---------- | ---------------- | ------------------ | ------------------------------ | ------------------ |
| 折线图     | 线图             | Line Chart         | 时间序列数据，展示趋势变化     | 趋势分析、对比     |
| 柱形图     | 柱状图           | Column Chart       | 离散分类数据比较（各类别独立） | 对比、排名         |
| 条形图     | 横向柱状图       | Bar Chart          | 离散分类数据比较，标签较长     | 对比、排名         |
| 饼图       | 饼状图           | Pie Chart          | 显示部分占整体的比例           | 占比、成分         |
| 面积图     | 区域图           | Area Chart         | 时间序列，强调趋势和总量       | 趋势分析、对比     |
| 散点图     | -                | Scatter Chart      | 显示两个变量的关系             | 相关性分析、分布   |
| 双轴图     | 组合图           | Dual-Axes Chart    | 同时展示两个不同量级的数据     | 多维对比、趋势分析 |
| 直方图     | -                | Histogram          | 连续数值型数据的频次/频率分布  | 分布分析           |
| 箱线图     | 盒须图           | Boxplot            | 显示数据分布和异常值           | 分布分析、异常检测 |
| 雷达图     | 蜘蛛图           | Radar Chart        | 多维度数据对比                 | 多维对比           |
| 漏斗图     | -                | Funnel Chart       | 展示流程转化率                 | 流程分析、转化分析 |
| 瀑布图     | -                | Waterfall Chart    | 显示累计效应                   | 增减变化分析       |
| 水波图     | 进度球           | Liquid Chart       | 显示百分比或进度               | 进度展示、占比     |
| 词云图     | 词云             | Word Cloud         | 展示文本词频                   | 词频分析、热点展示 |
| 小提琴图   | -                | Violin Chart       | 显示数据分布密度               | 分布分析           |
| 韦恩图     | 文氏图           | Venn Chart         | 显示集合关系                   | 集合交并关系       |
| 矩阵树图   | 树状图           | Treemap            | 显示层级数据占比               | 层级占比、结构分析 |
| 桑基图     | -                | Sankey Chart       | 展示流量流向                   | 流向分析           |
| 流程图     | Dagre 图         | Flow Diagram       | 展示流程步骤和决策点           | 流程分析、决策展示 |
| 思维导图   | 脑图             | Mindmap            | 核心主题层级展开               | 层级分析、知识梳理 |
| 缩进树     | 层级树、目录树   | Indented Tree      | 展示树节点层级和目录结构       | 层级分析、目录展示 |
| 网络图     | 关系图、力导向图 | Network Graph      | 展示实体间复杂关联关系         | 关系分析、网络分析 |
| 组织架构图 | 组织结构图       | Organization Chart | 展示组织层级和部门关系         | 层级分析、组织展示 |
| 鱼骨图     | 因果图、石川图   | Fishbone Diagram   | 分析问题根本原因               | 根因分析、归因分析 |
| 表格       | 数据表           | Table              | 展示详细数据明细               | 数据展示、查找     |
| 总结摘要   | -                | Summary            | 文本总结内容                   | 内容总结           |

## GPT-Vis 语法

类 Markdown 缩进语法，支持流式渲染。

### TypeScript 类型到 Syntax 的转换规则

图表配置使用 TypeScript 类型定义，生成语法时按以下规则转换：

**1. 顶层属性** — `key value`，每行一个：

```typescript
{ title?: string; theme?: string }
```

```
title 年度趋势
theme dark
```

**2. 对象数组** — `data` 下每项用 `- ` 开头，子字段缩进：

```typescript
{
  data: {
    time: string;
    value: number;
  }
  [];
}
```

```
data
  - time 2020
    value 100
  - time 2021
    value 120
```

**3. 纯值数组** — 每项用 `- ` 开头，直接写值：

```typescript
{ data: number[] }
```

```
data
  - 10
  - 20
  - 30
```

**4. 字符串数组** — 同上：

```typescript
{ categories: string[] }
```

```
categories
  - 2020
  - 2021
```

**注意字符串数组中的字符串不要带有空格**：
✅

```
data
  - 1月
  - 2月
  - 3月
```

❌

```
data
  - 1 月
  - 2 月
  - 3 月
```

**5. 嵌套对象** — 对象名占一行，子属性缩进：

```typescript
{ style?: { backgroundColor?: string; positiveColor?: string } }
```

```
style
  backgroundColor #f0f2f5
  positiveColor #5B8FF9
```

```typescript
{ series: { data: number[]; axisYTitle?: string }[] }
```

```
series
  - axisYTitle 销售额
    data
      - 91.9
      - 99.1
  - axisYTitle 利润率
    data
      - 0.055
      - 0.06
```

**注意：当 `style.palette` 是颜色数组时，需要特殊处理，其他的数组情况严格按照通用规则**：在 syntax 中用空格分隔写在同一行。

```typescript
{ style?: { palette?: string[]; } }
```

```
style
  palette #5B8FF9 #61DDAA #65789B
```

**6. 递归树形结构** — 根节点属性直接写，`children` 数组用 `- ` 缩进：

```typescript
type TreeData = { name: string; children?: TreeData[] };
{
  data: TreeData;
}
```

```
data
  name 根节点
  children
    - name 子节点A
      children
        - name 孙节点
    - name 子节点B
```

**7. `vis` 前缀** — 语法第一行必须是 `vis [type]`：

```
vis line
data
  ...
title 标题
```

> ⚠️ **唯一例外：`summary` 类型禁止使用 `vis` 前缀。** summary 直接以 Markdown 内容开头，`GPTVis.render()` 通过"不以 `vis ` 开头"来识别并走 T8 渲染路径。若写了 `vis summary`，引擎会错误地用 key-value 解析器处理 Markdown，导致渲染失败。详见下方 summary 小节。

### 完整转换示例

以下展示如何将一个柱形图的 TypeScript 配置转换为 GPT-Vis 语法：

**TypeScript 配置：**

```typescript
const config: Column = {
  type: 'column',
  data: [
    { category: 'A产品', value: 30, group: '线上' },
    { category: 'A产品', value: 20, group: '线下' },
    { category: 'B产品', value: 50, group: '线上' },
    { category: 'B产品', value: 35, group: '线下' },
  ],
  title: '产品销量对比',
  axisXTitle: '产品',
  axisYTitle: '销量（万）',
  stack: true,
  theme: 'academy',
  style: {
    palette: ['#5B8FF9', '#61DDAA'],
    backgroundColor: '#fafafa',
  },
};
```

**转换后的 GPT-Vis 语法：**

```
vis column
data
  - category A产品
    value 30
    group 线上
  - category A产品
    value 20
    group 线下
  - category B产品
    value 50
    group 线上
  - category B产品
    value 35
    group 线下
title 产品销量对比
axisXTitle 产品
axisYTitle 销量（万）
stack true
theme academy
style
  palette #5B8FF9 #61DDAA
  backgroundColor #fafafa
```

## 框架集成

### HTML

```html
<html>
  <head>
    <script src="https://unpkg.com/@antv/gpt-vis/dist/umd/index.min.js"></script>
  </head>
  <body>
    <div id="container"></div>
    <script>
      const gptVis = new GPTVis.GPTVis({
        container: '#container',
        width: 600,
        height: 400,
      });

      const visSyntax = `
vis line
data
  - time 2020
    value 100
  - time 2021
    value 120
  - time 2022
    value 150
title 年度趋势
`;

      gptVis.render(visSyntax);
    </script>
  </body>
</html>
```

### React

```jsx
import { GPTVis } from '@antv/gpt-vis';
import { useEffect, useRef } from 'react';

function ChartComponent({ visSyntax }) {
  const containerRef = useRef(null);
  const gptVisRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && !gptVisRef.current) {
      gptVisRef.current = new GPTVis({
        container: containerRef.current,
        width: 600,
        height: 400,
      });
    }
  }, []);

  useEffect(() => {
    if (gptVisRef.current && visSyntax) {
      gptVisRef.current.render(visSyntax);
    }
  }, [visSyntax]);

  return <div ref={containerRef}></div>;
}

// 使用示例
const visSyntax = `
vis column
data
  - category A产品
    value 30
  - category B产品
    value 50
title 产品销量
`;

<ChartComponent visSyntax={visSyntax} />;
```

### Vue

```vue
<template>
  <div ref="containerRef"></div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { GPTVis } from '@antv/gpt-vis';

const props = defineProps({
  visSyntax: String,
});

const containerRef = ref(null);
let gptVis = null;

onMounted(() => {
  gptVis = new GPTVis({
    container: containerRef.value,
    width: 600,
    height: 400,
  });

  if (props.visSyntax) {
    gptVis.render(props.visSyntax);
  }
});

watch(
  () => props.visSyntax,
  (newSyntax) => {
    if (gptVis && newSyntax) {
      gptVis.render(newSyntax);
    }
  },
);
</script>

<!-- 使用示例 -->
<ChartComponent :vis-syntax="visSyntax" />
```

### 流式渲染

```javascript
import { GPTVis, isVisSyntax } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

let buffer = '';

// 当 AI 流式输出 token 时
function onToken(token) {
  buffer += token;
  if (isVisSyntax(buffer)) {
    gptVis.render(buffer);
  }
}
```

## 图表类型配置

### 折线图(line) / 面积图(area)

数据结构相同，type 分别为 `line` 和 `area`。

```typescript
type Line = {
  type: 'line' | 'area';
  data: { time: string | number; value: number; group?: string }[];
  title?: string;
  axisXTitle?: string;
  axisYTitle?: string;
  stack?: boolean; // 仅面积图支持
  theme?: 'default' | 'dark' | 'academy';
  style?: {
    backgroundColor?: string;
    palette?: string[];
    lineWidth?: number;
  };
};
```

### 柱形图(column) / 条形图(bar)

数据结构相同，type 分别为 `column` 和 `bar`。条形图适合标签较长的场景。

```typescript
type Column = {
  type: 'column' | 'bar';
  data: { category: string; value: number; group?: string }[];
  title?: string;
  axisXTitle?: string;
  axisYTitle?: string;
  stack?: boolean;
  group?: boolean;
  theme?: 'default' | 'dark' | 'academy';
  style?: {
    backgroundColor?: string;
    palette?: string[];
  };
};
```

### 饼图(pie)

```typescript
type Pie = {
  type: 'pie';
  data: { category: string; value: number }[];
  innerRadius?: number; // 设为 0.6 变为环图
  title?: string;
  theme?: 'default' | 'dark' | 'academy';
  style?: {
    backgroundColor?: string;
    palette?: string[];
  };
};
```

注意：value 不可使用百分比数字。

### 散点图(scatter)

```typescript
type Scatter = {
  type: 'scatter';
  data: { x: number; y: number; group?: string }[];
  title?: string;
  theme?: 'default' | 'dark' | 'academy';
  style?: {
    backgroundColor?: string;
    palette?: string[];
  };
};
```

### 双轴图(dual-axes)

组合柱状图与折线图，适合展示不同量级数据。

```typescript
type DualAxes = {
  type: 'dual-axes';
  categories: string[];
  series: { type: 'line' | 'column'; data: number[]; axisYTitle?: string }[];
  title?: string;
  axisXTitle?: string;
  theme?: 'default' | 'dark' | 'academy';
  style?: {
    backgroundColor?: string;
    palette?: string[];
    startAtZero?: boolean;
  };
};
```

### 直方图(histogram)

```typescript
type Histogram = {
  type: 'histogram';
  data: number[];
  binNumber?: number;
  title?: string;
  axisXTitle?: string;
  axisYTitle?: string;
  theme?: 'default' | 'dark' | 'academy';
  style?: {
    backgroundColor?: string;
    palette?: string[];
  };
};
```

### 箱线图(boxplot) / 小提琴图(violin)

数据结构相同，需要同一 category 有多条数据以展示分布。支持按 `group` 字段分组展示。

```typescript
type Boxplot = {
  type: 'boxplot' | 'violin';
  data: { category: string; value: number; group?: string }[];
  title?: string;
  axisXTitle?: string;
  axisYTitle?: string;
  theme?: 'default' | 'dark' | 'academy';
  style?: {
    backgroundColor?: string;
    palette?: string[];
    startAtZero?: boolean;
  };
};
```

### 雷达图(radar)

```typescript
type Radar = {
  type: 'radar';
  data: { name: string; value: number; group?: string }[];
  title?: string;
  theme?: 'default' | 'dark' | 'academy';
  style?: {
    backgroundColor?: string;
    palette?: string[];
  };
};
```

### 漏斗图(funnel)

```typescript
type Funnel = {
  type: 'funnel';
  data: { category: string; value: number }[];
  title?: string;
  theme?: 'default' | 'dark' | 'academy';
  style?: {
    backgroundColor?: string;
    palette?: string[];
  };
};
```

### 瀑布图(waterfall)

value 可为负数表示减少。

```typescript
type Waterfall = {
  type: 'waterfall';
  data: { category: string; value: number }[];
  title?: string;
  axisXTitle?: string;
  axisYTitle?: string;
  theme?: 'default' | 'dark' | 'academy';
  style?: {
    palette?: {
      positiveColor?: string;
      negativeColor?: string;
      totalColor?: string;
    };
  };
};
```

### 水波图(liquid)

不使用 data 字段，使用 `percent`。

```typescript
type Liquid = {
  type: 'liquid';
  percent: number; // 0~1
  shape?: 'rect' | 'circle' | 'pin' | 'triangle';
  title?: string;
  theme?: 'default' | 'dark' | 'academy';
  style?: {
    backgroundColor?: string;
    palette?: string[];
  };
};
```

### 词云图(word-cloud)

```typescript
type WordCloud = {
  type: 'word-cloud';
  data: { text: string; value: number }[];
  title?: string;
  theme?: 'default' | 'dark' | 'academy';
  style?: {
    backgroundColor?: string;
    palette?: string[];
  };
};
```

### 韦恩图(venn)

交集用逗号分隔集合标识：`sets A,B`。

```typescript
type Venn = {
  type: 'venn';
  data: {
    sets: string | string[]; // 交集用逗号分隔，如 "A,B"
    value: number;
    label?: string; // 集合的显示名称，用于显示图表上对应集合的名称
  }[];
  title?: string;
  theme?: 'default' | 'dark' | 'academy';
  style?: {
    backgroundColor?: string;
    palette?: string[];
  };
};
```

### 矩阵树图(treemap)

```typescript
type TreeNode = { name: string; value: number; children?: TreeNode[] };

type Treemap = {
  type: 'treemap';
  data: TreeNode[];
  title?: string;
  theme?: 'default' | 'dark' | 'academy';
  style?: {
    backgroundColor?: string;
    palette?: string[];
  };
};
```

### 桑基图(sankey)

```typescript
type Sankey = {
  type: 'sankey';
  data: { source: string; target: string; value: number }[];
  nodeAlign?: 'left' | 'center' | 'right' | 'justify';
  title?: string;
  theme?: 'default' | 'dark' | 'academy';
  style?: {
    backgroundColor?: string;
    palette?: string[];
  };
};
```

### 流程图(flow-diagram) / 网络图(network-graph)

数据结构相同，均由 nodes 和 edges 组成。`source`/`target` 引用节点的 `name`，`edges.name` 用于标识关系或分支条件（仅需要时添加）。

```typescript
type FlowDiagram = {
  type: 'flow-diagram';
  data: {
    nodes: { name: string }[];
    edges: { source: string; target: string; name?: string }[];
  };
  title?: string;
  theme?: 'default' | 'dark' | 'academy';
  style?: {
    backgroundColor?: string;
    palette?: string[];
  };
};

type NetworkGraph = {
  type: 'network-graph';
  data: {
    nodes: { name: string }[];
    edges: { source: string; target: string; name?: string }[];
  };
  layout?: 'force' | 'circular' | 'grid' | 'radial' | 'concentric' | 'dagre';
  title?: string;
  theme?: 'default' | 'dark' | 'academy';
  style?: {
    backgroundColor?: string;
    palette?: string[];
  };
};
```

### 思维导图(mindmap) / 缩进树(indented-tree) / 组织架构图(organization-chart)

数据均为递归树形结构。

```typescript
type MindmapData = { name: string; children?: MindmapData[] };

type Mindmap = {
  type: 'mindmap';
  data: MindmapData;
  direction?: 'H' | 'LR' | 'RL'; // 默认 'H'（水平双向）
  title?: string;
  theme?: 'default' | 'dark' | 'academy';
  style?: {
    backgroundColor?: string;
    palette?: string[];
  };
};

type IndentedTreeData = { name: string; children?: IndentedTreeData[] };

type IndentedTree = {
  type: 'indented-tree';
  data: IndentedTreeData;
  direction?: 'LR' | 'RL' | 'H'; // 默认 'LR'
  title?: string;
  theme?: 'default' | 'dark' | 'academy';
  style?: {
    backgroundColor?: string;
    palette?: string[];
  };
};

type OrganizationChartData = {
  name: string;
  description?: string; // 节点描述，如职位、部门简介
  children?: OrganizationChartData[];
};

type OrganizationChart = {
  type: 'organization-chart';
  data: OrganizationChartData;
  title?: string;
  theme?: 'default' | 'dark' | 'academy';
  style?: {
    backgroundColor?: string;
    palette?: string[];
  };
};
```

### 鱼骨图(fishbone-diagram)

用于系统化分析问题的根本原因，以鱼骨形状展示问题与各类原因的层级关系。

```typescript
type FishboneNode = { name: string; children?: FishboneNode[] };

type FishboneDiagram = {
  type: 'fishbone-diagram';
  data: FishboneNode;
  title?: string;
  theme?: 'default' | 'dark' | 'academy';
  style?: {
    backgroundColor?: string;
    palette?: string[];
    texture?: 'rough' | 'default'; // 'rough' 为手绘风格
  };
};
```

### 表格(table)

```typescript
type Table = {
  type: 'table';
  data: Record<string, string | number>[];
  title?: string;
  theme?: 'default' | 'dark' | 'academy';
  style?: {
    backgroundColor?: string;
    palette?: string[];
  };
};
```

### 总结摘要(summary)

> ⚠️ **禁止以 `vis summary` 开头。** summary 是唯一不使用 `vis` 前缀的图表类型。
>
> **原因**：`GPTVis.render()` 通过检测字符串是否以 `vis ` 开头来决定渲染路径——以 `vis ` 开头走 key-value 解析器，否则走 T8 文本渲染器。summary 的内容是 Markdown + 语义标注，必须走 T8 路径，所以**内容必须直接以 `#` 标题或正文开头**。

✅ 正确写法（直接以 Markdown 内容开头）：

```
# Q4 销售报告

[总收入](metric_name)达到 [¥520万](metric_value, origin=5200000)。
```

❌ 错误写法（加了 `vis summary` 前缀，会导致渲染失败）：

```
vis summary
# Q4 销售报告

[总收入](metric_name)达到 [¥520万](metric_value, origin=5200000)。
```

使用 T8 语法（类 Markdown + 语义标注）直接书写。

#### 语义标注语法

```
[显示文本](实体类型)
[显示文本](实体类型, key=value)
```

#### 实体类型

| 类型                 | 说明                           | 支持属性               | 示例                                                                             |
| -------------------- | ------------------------------ | ---------------------- | -------------------------------------------------------------------------------- |
| `metric_name`        | 指标名称                       | —                      | `[日活跃用户数](metric_name)`                                                    |
| `metric_value`       | 指标数值，支持格式化和原始数据 | `origin`, `unit`       | `[¥1,234,567](metric_value, origin=1234567)`                                     |
| `other_metric_value` | 次要/辅助指标值                | —                      | `[平均订单价值](other_metric_value)`                                             |
| `delta_value`        | 绝对变化值，带正负评估         | `origin`, `assessment` | `[¥180,000](delta_value, origin=180000, assessment="positive")`                  |
| `ratio_value`        | 百分比变化/增长率              | `origin`, `assessment` | `[15%](ratio_value, origin=0.15, assessment="positive")`                         |
| `contribute_ratio`   | 部分对整体的贡献占比           | `origin`, `assessment` | `[64.8%](contribute_ratio, origin=0.648, assessment="positive")`                 |
| `proportion`         | 部分与整体的比率               | `origin`               | `[四分之三](proportion, origin=0.75)`                                            |
| `trend_desc`         | 趋势的定性描述                 | `assessment`           | `[强劲增长](trend_desc, assessment="positive")`                                  |
| `dim_value`          | 维度值（类别、地区、产品等）   | —                      | `[亚太地区](dim_value)`                                                          |
| `time_desc`          | 时间引用和时间段描述           | —                      | `[2024年Q4](time_desc)`                                                          |
| `rank`               | 排名位置                       | `detail`               | `[排名第一](rank, detail=[320, 180, 90, 65, 45])`                                |
| `difference`         | 值之间的差距或差异             | `detail`               | `[1.4亿台的差距](difference, detail=[200, 180, 160, 140])`                       |
| `anomaly`            | 数据中的异常模式或离群值       | `detail`               | `[异常集中](anomaly, detail=[15, 18, 20, 65, 22])`                               |
| `association`        | 变量之间的相关性或关系         | `detail`               | `[强相关性](association, detail=[{"x":100,"y":105},{"x":120,"y":128}])`          |
| `distribution`       | 数据分布                       | `detail`               | `[分布](distribution, detail=[15, 25, 35, 15, 10])`                              |
| `seasonality`        | 周期性/季节性模式              | `detail`               | `[明显季节性](seasonality, detail={"data":[80, 90, 95, 135], "range":[0, 150]})` |

属性字段：`origin`（原始数值）、`assessment`（`"positive"` / `"negative"` / `"equal"`）、`unit`（单位）、`detail`（用于高级分析实体的数据）

**示例一：销售报告**

```
# Q4 销售报告

## 概述

在 [2024年Q4](time_desc)，[总收入](metric_name)达到
[¥520万](metric_value, origin=5200000)，相比Q3增长了
[¥80万](delta_value, origin=800000, assessment="positive")，
增长率为 [18%](ratio_value, origin=0.18, assessment="positive")。
[客单价](other_metric_value)为 [¥328](metric_value, origin=328)。

## 各地区表现

[北美地区](dim_value)以 [¥210万](metric_value, origin=2100000)领先，
占总收入的 [40%](contribute_ratio, origin=0.40, assessment="positive")。
该地区在所有市场中[排名第一](rank, detail=[2100000, 1800000, 1300000])。

[欧洲](dim_value)呈现[强劲势头](trend_desc, assessment="positive")，
[近一半](proportion, origin=0.48)的销售额来自新客户。
与北美的[90万差距](difference, detail=[210, 195, 180, 170])正在逐季缩小。
```

**示例二：数据分析报告**

```
# 用户行为分析报告

## 流量趋势

[2024年](time_desc)，[月活跃用户](metric_name)达到
[1,200万](metric_value, origin=12000000)，同比增长
[22%](ratio_value, origin=0.22, assessment="positive")，整体呈现
[持续上升](trend_desc, assessment="positive")趋势。

## 用户分布

用户年龄[分布](distribution, detail=[5, 15, 35, 30, 15])集中在25-35岁区间。
[一线城市](dim_value)用户呈现[明显季节性](seasonality, detail={"data":[80, 95, 110, 150], "range":[0, 200]})，
每年Q4达到峰值。

## 异常与关联

[华南地区](dim_value)出现[异常流量集中](anomaly, detail=[12, 15, 14, 58, 16])，
需进一步排查。分析发现用户活跃度与推送频次之间存在
[强正相关](association, detail=[{"x":1,"y":20},{"x":3,"y":55},{"x":5,"y":90}])。
```

## 最佳实践

1. 时间序列优先折线图/面积图，分类比较优先柱形图/条形图
2. 饼图分类不超过 5 个，超过建议合并为"其它"或改用条形图
3. 不要用饼图展示趋势，不要用折线图展示无序分类
4. 数值字段必须是数字类型，分类字段必须是文本类型
5. **连续数值的分布（如薪资、成绩、年龄）必须用直方图（histogram），不能用柱形图替代**——柱形图的 X 轴是离散类别，直方图的 X 轴是连续区间，两者语义不同
6. **多维数据字段映射**：有两个分类维度时，x 轴维度写 `time` / `category`，另一个写 `group`，**禁止将两个维度拼接写入同一字段**（拼接后每行坐标轴值唯一，分组失效）
