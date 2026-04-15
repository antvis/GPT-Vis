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

| 名称       | 别名             | 英文名             | 适用场景                   | 分析意图           |
| ---------- | ---------------- | ------------------ | -------------------------- | ------------------ |
| 折线图     | 线图             | Line Chart         | 时间序列数据，展示趋势变化 | 趋势分析、对比     |
| 柱形图     | 柱状图           | Column Chart       | 分类数据比较               | 对比、分布、排名   |
| 条形图     | 横向柱状图       | Bar Chart          | 分类数据比较，标签较长     | 对比、分布、排名   |
| 饼图       | 饼状图           | Pie Chart          | 显示部分占整体的比例       | 占比、成分         |
| 面积图     | 区域图           | Area Chart         | 时间序列，强调趋势和总量   | 趋势分析、对比     |
| 散点图     | -                | Scatter Chart      | 显示两个变量的关系         | 相关性分析、分布   |
| 双轴图     | 组合图           | Dual-Axes Chart    | 同时展示两个不同量级的数据 | 多维对比、趋势分析 |
| 直方图     | -                | Histogram          | 显示数据分布               | 分布分析           |
| 箱线图     | 盒须图           | Boxplot            | 显示数据分布和异常值       | 分布分析、异常检测 |
| 雷达图     | 蜘蛛图           | Radar Chart        | 多维度数据对比             | 多维对比           |
| 漏斗图     | -                | Funnel Chart       | 展示流程转化率             | 流程分析、转化分析 |
| 瀑布图     | -                | Waterfall Chart    | 显示累计效应               | 增减变化分析       |
| 水波图     | 进度球           | Liquid Chart       | 显示百分比或进度           | 进度展示、占比     |
| 词云图     | 词云             | Word Cloud         | 展示文本词频               | 词频分析、热点展示 |
| 小提琴图   | -                | Violin Chart       | 显示数据分布密度           | 分布分析           |
| 韦恩图     | 文氏图           | Venn Chart         | 显示集合关系               | 集合交并关系       |
| 矩阵树图   | 树状图           | Treemap            | 显示层级数据占比           | 层级占比、结构分析 |
| 桑基图     | -                | Sankey Chart       | 展示流量流向               | 流向分析           |
| 流程图     | Dagre 图         | Flow Diagram       | 展示流程步骤和决策点       | 流程分析、决策展示 |
| 思维导图   | 脑图             | Mindmap            | 核心主题层级展开           | 层级分析、知识梳理 |
| 缩进树     | 层级树、目录树   | Indented Tree      | 展示树节点层级和目录结构   | 层级分析、目录展示 |
| 网络图     | 关系图、力导向图 | Network Graph      | 展示实体间复杂关联关系     | 关系分析、网络分析 |
| 组织架构图 | 组织结构图       | Organization Chart | 展示组织层级和部门关系     | 层级分析、组织展示 |
| 鱼骨图     | 因果图、石川图   | Fishbone Diagram   | 分析问题根本原因           | 根因分析、归因分析 |
| 表格       | 数据表           | Table              | 展示详细数据明细           | 数据展示、查找     |
| 总结摘要   | -                | Summary            | 文本总结内容               | 内容总结           |

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

**5. 嵌套对象** — 对象名占一行，子属性缩进：

```typescript
{ style?: { backgroundColor?: string; palette?: string[] } }
```

```
style
  backgroundColor #f0f2f5
  palette #5B8FF9 #61DDAA #65789B
```

注意：`palette` 是颜色数组，在 syntax 中用空格分隔写在同一行。

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

**7. 图数据（nodes + edges）** — 分别列出：

```typescript
{ data: { nodes: { name: string }[]; edges: { source: string; target: string; name?: string }[] } }
```

```
data
  nodes
    - name 节点A
    - name 节点B
  edges
    - source 节点A
      target 节点B
      name 关系
```

**8. 数值空格数组** — series 中的 `data: number[]` 用空格分隔写在同一行：

```typescript
{ series: { type: string; data: number[] }[] }
```

```
series
  - type column
    data 500 600 700
```

**9. `vis` 前缀** — 语法第一行必须是 `vis [type]`：

```
vis line
data
  ...
title 标题
```

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
  isStack: true,
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
<!DOCTYPE html>
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
  type: 'line';
  data: { time: string | number; value: number; group?: string }[];
  title?: string;
  axisXTitle?: string;
  axisYTitle?: string;
  theme?: 'default' | 'dark' | 'academy';
  style?: {
    backgroundColor?: string;
    palette?: string[];
    lineWidth?: number; // 仅折线图
  };
};
```

### 柱形图(column) / 条形图(bar)

数据结构相同，type 分别为 `column` 和 `bar`。条形图适合标签较长的场景。

```typescript
type Column = {
  type: 'column';
  data: { category: string; value: number; group?: string }[];
  title?: string;
  axisXTitle?: string;
  axisYTitle?: string;
  isStack?: boolean;
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

数据结构相同，需要同一 category 有多条数据以展示分布。

```typescript
type Boxplot = {
  type: 'boxplot';
  data: { category: string; value: number }[];
  title?: string;
  theme?: 'default' | 'dark' | 'academy';
  style?: {
    backgroundColor?: string;
    palette?: string[];
  };
};
```

### 雷达图(radar)

```typescript
type Radar = {
  type: 'radar';
  data: { dimension: string; value: number; group?: string }[];
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
  theme?: 'default' | 'dark' | 'academy';
  style?: {
    backgroundColor?: string;
    palette?: string[];
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
  data: { sets: string | string[]; value: number; label?: string }[];
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

使用 T8 语法（类 Markdown + 语义标注），不使用 `vis` 前缀，直接书写。

#### 语义标注语法

```
[显示文本](实体类型)
[显示文本](实体类型, key=value)
```

#### 实体类型

| 类型                 | 说明                            | 示例                                                      |
| -------------------- | ------------------------------- | --------------------------------------------------------- |
| `metric_name`        | 指标名称，通常是主语            | `[销售额](metric_name)`                                   |
| `metric_value`       | 指标值，表示具体数值            | `[¥150万](metric_value, origin=1500000)`                  |
| `other_metric_value` | 次要指标值                      | `[平均: ¥120](other_metric_value)`                        |
| `dim_name`           | 维度名称                        | `[省份](dim_name)`                                        |
| `dim_value`          | 维度值                          | `[北京](dim_value)`                                       |
| `time_desc`          | 时间描述                        | `[2024年Q3](time_desc)`                                   |
| `trend_desc`         | 趋势描述                        | `[上升](trend_desc)`                                      |
| `delta_value`        | 绝对变化值                      | `[+1200](delta_value)`                                    |
| `delta_value_pos`    | 正向绝对变化值（需 abs 处理）   | `[3000](delta_value_pos)`                                 |
| `delta_value_neg`    | 负向绝对变化值（需 abs 处理）   | `[500](delta_value_neg)`                                  |
| `ratio_value`        | 百分比变化值                    | `[+15%](ratio_value, origin=0.15, assessment="positive")` |
| `ratio_value_pos`    | 正向百分比变化值（需 abs 处理） | `[15.3%](ratio_value_pos, origin=0.153)`                  |
| `ratio_value_neg`    | 负向百分比变化值（需 abs 处理） | `[8.2%](ratio_value_neg, origin=0.082)`                   |
| `contribute_ratio`   | 贡献占比                        | `[45%](contribute_ratio, origin=0.45)`                    |
| `proportion`         | 比例占比                        | `[22%](proportion)`                                       |

元数据字段：`origin`（原始数值）、`assessment`（`"positive"` / `"negative"` / `"equal"`）、`unit`（单位）

```
# Q4 销售报告

[2024年Q4](time_desc)，[销售额](metric_name)达到[¥523万](metric_value, origin=5230000)，
较上季度[增长15.2%](ratio_value, origin=0.152, assessment="positive")。

## 关键指标
- [新客户数](metric_name)：[1,234](metric_value, origin=1234)
- [客户留存率](metric_name)：[89.5%](ratio_value, origin=0.895)
```

## 最佳实践

1. 时间序列优先折线图/面积图，分类比较优先柱形图/条形图
2. 饼图分类不超过 5 个，超过建议合并为"其它"或改用条形图
3. 不要用饼图展示趋势，不要用折线图展示无序分类
4. 数值字段必须是数字类型，分类字段必须是文本类型
