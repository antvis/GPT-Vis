---
name: chart-visualization
description: Recommend and generate appropriate data visualizations using GPT-Vis syntax. Supports 20 chart types including statistical charts (line, column, bar, pie, area, scatter, dual-axes, histogram, boxplot, radar, funnel, waterfall, liquid, word-cloud, violin, venn, treemap), flow charts (sankey), and data display (table, summary). Provides workflow from intent recognition to chart selection, syntax generation, and code generation for HTML, React, or Vue.
---

# Chart Visualization Skill

## Workflow

This skill helps AI assistants recommend and generate appropriate data visualizations. The workflow consists of three main steps:

1. **Intent Recognition & Chart Selection**: Analyze the user's intent and data characteristics to select the most suitable chart type
   - Time-series data → Line, Area charts
   - Categorical comparison → Column, Bar charts
   - Proportion analysis → Pie chart
   - Distribution analysis → Histogram, Boxplot, Violin charts
   - Relationship/Flow → Sankey chart
   - Multi-dimensional comparison → Radar chart
   - Other specific needs → Funnel, Waterfall, Liquid, WordCloud, Treemap, Venn, etc.

2. **Syntax Generation**: Generate GPT-Vis syntax based on the selected chart type and provided data

3. **Code Generation**: Generate renderable code for the target framework (HTML, React, or Vue)

## Supported Chart Types

| 名称     | 别名       | 英文名          | 适用场景                   | 分析意图           |
| -------- | ---------- | --------------- | -------------------------- | ------------------ |
| 折线图   | 线图       | Line Chart      | 时间序列数据，展示趋势变化 | 趋势分析、对比     |
| 柱形图   | 柱状图     | Column Chart    | 分类数据比较               | 对比、分布、排名   |
| 条形图   | 横向柱状图 | Bar Chart       | 分类数据比较，标签较长     | 对比、分布、排名   |
| 饼图     | 饼状图     | Pie Chart       | 显示部分占整体的比例       | 占比、成分         |
| 面积图   | 区域图     | Area Chart      | 时间序列，强调趋势和总量   | 趋势分析、对比     |
| 散点图   | -          | Scatter Chart   | 显示两个变量的关系         | 相关性分析、分布   |
| 双轴图   | 组合图     | Dual-Axes Chart | 同时展示两个不同量级的数据 | 多维对比、趋势分析 |
| 直方图   | -          | Histogram       | 显示数据分布               | 分布分析           |
| 箱线图   | 盒须图     | Boxplot         | 显示数据分布和异常值       | 分布分析、异常检测 |
| 雷达图   | 蜘蛛图     | Radar Chart     | 多维度数据对比             | 多维对比           |
| 漏斗图   | -          | Funnel Chart    | 展示流程转化率             | 流程分析、转化分析 |
| 瀑布图   | -          | Waterfall Chart | 显示累计效应               | 增减变化分析       |
| 水波图   | 进度球     | Liquid Chart    | 显示百分比或进度           | 进度展示、占比     |
| 词云图   | 词云       | Word Cloud      | 展示文本词频               | 词频分析、热点展示 |
| 小提琴图 | -          | Violin Chart    | 显示数据分布密度           | 分布分析           |
| 韦恩图   | 文氏图     | Venn Chart      | 显示集合关系               | 集合交并关系       |
| 矩阵树图 | 树状图     | Treemap         | 显示层级数据占比           | 层级占比、结构分析 |
| 桑基图   | -          | Sankey Chart    | 展示流量流向               | 流向分析           |
| 表格     | 数据表     | Table           | 展示详细数据明细           | 数据展示、查找     |
| 总结摘要 | -          | Summary         | 文本总结内容               | 内容总结           |

## GPT-Vis Syntax

GPT-Vis 使用简洁的类 Markdown 语法来描述图表配置，使 AI 更容易生成。基本结构如下：

```
vis [chart-type]
data
  - [field1] [value1]
    [field2] [value2]
[optional-property] [value]
```

### Syntax 特点

- **简洁易读**: 类 Markdown 的缩进语法，易于 AI 生成
- **流式友好**: 支持逐 token 渲染，适合流式输出
- **容错性强**: 能优雅处理不完整数据
- **类型安全**: 每个图表有明确的数据结构

## Framework Integration

GPT-Vis 支持在 HTML、React 和 Vue 中使用，提供统一的 API 来渲染 Syntax。

### HTML / Vanilla JavaScript

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

### 流式渲染支持

GPT-Vis 天然支持流式渲染，可以逐步接收 AI 生成的 Syntax：

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

## Syntax Examples

### Line Chart (折线图)

**适用场景**: 时间序列数据，展示趋势变化

**Syntax 示例**:

```
vis line
data
  - time 2020
    value 100
  - time 2021
    value 120
  - time 2022
    value 150
title 年度数据趋势
```

详细用法参考: [references/line.md](references/line.md)

### Column Chart (柱形图)

**适用场景**: 分类数据比较

**Syntax 示例**:

```
vis column
data
  - category A产品
    value 30
  - category B产品
    value 50
  - category C产品
    value 20
title 产品销量对比
```

详细用法参考: [references/column.md](references/column.md)

### Bar Chart (条形图)

**适用场景**: 分类数据比较，标签较长

**Syntax 示例**:

```
vis bar
data
  - category 产品类别A
    value 30
  - category 产品类别B
    value 50
  - category 产品类别C
    value 20
```

详细用法参考: [references/bar.md](references/bar.md)

### Pie Chart (饼图)

**适用场景**: 显示部分占整体的比例

**Syntax 示例**:

```
vis pie
data
  - category 类别A
    value 30
  - category 类别B
    value 50
  - category 类别C
    value 20
```

详细用法参考: [references/pie.md](references/pie.md)

### Area Chart (面积图)

**适用场景**: 时间序列，强调趋势和总量

**Syntax 示例**:

```
vis area
data
  - time 2020
    value 100
  - time 2021
    value 120
  - time 2022
    value 150
```

详细用法参考: [references/area.md](references/area.md)

### Scatter Chart (散点图)

**适用场景**: 显示两个变量的关系

**Syntax 示例**:

```
vis scatter
data
  - x 1
    y 2
  - x 2
    y 4
  - x 3
    y 3
```

详细用法参考: [references/scatter.md](references/scatter.md)

### Dual-Axes Chart (双轴图)

**适用场景**: 同时展示两个不同量级的数据

**Syntax 示例**:

```
vis dual-axes
data
  - category 1月
    value 100
    count 10
  - category 2月
    value 120
    count 15
  - category 3月
    value 150
    count 12
```

详细用法参考: [references/dual-axes.md](references/dual-axes.md)

### Histogram (直方图)

**适用场景**: 显示数据分布

**Syntax 示例**:

```
vis histogram
data
  - value 10
  - value 12
  - value 15
  - value 18
  - value 20
```

详细用法参考: [references/histogram.md](references/histogram.md)

### Boxplot (箱线图)

**适用场景**: 显示数据分布和异常值

**Syntax 示例**:

```
vis boxplot
data
  - category A
    value 10
  - category A
    value 15
  - category A
    value 20
  - category B
    value 12
  - category B
    value 18
```

详细用法参考: [references/boxplot.md](references/boxplot.md)

### Radar Chart (雷达图)

**适用场景**: 多维度数据对比

**Syntax 示例**:

```
vis radar
data
  - dimension 维度1
    value 80
  - dimension 维度2
    value 90
  - dimension 维度3
    value 70
```

详细用法参考: [references/radar.md](references/radar.md)

### Funnel Chart (漏斗图)

**适用场景**: 展示流程转化率

**Syntax 示例**:

```
vis funnel
data
  - stage 访问
    value 1000
  - stage 注册
    value 500
  - stage 购买
    value 100
```

详细用法参考: [references/funnel.md](references/funnel.md)

### Waterfall Chart (瀑布图)

**适用场景**: 显示累计效应

**Syntax 示例**:

```
vis waterfall
data
  - category 初始
    value 100
  - category 增加
    value 50
  - category 减少
    value -30
```

详细用法参考: [references/waterfall.md](references/waterfall.md)

### Liquid Chart (水波图)

**适用场景**: 显示百分比或进度

**Syntax 示例**:

```
vis liquid
data
  - value 0.65
```

详细用法参考: [references/liquid.md](references/liquid.md)

### Word Cloud (词云图)

**适用场景**: 展示文本词频

**Syntax 示例**:

```
vis word-cloud
data
  - word 数据
    value 100
  - word 可视化
    value 80
  - word 图表
    value 60
```

详细用法参考: [references/word-cloud.md](references/word-cloud.md)

### Violin Chart (小提琴图)

**适用场景**: 显示数据分布密度

**Syntax 示例**:

```
vis violin
data
  - category A
    value 10
  - category A
    value 15
  - category A
    value 20
```

详细用法参考: [references/violin.md](references/violin.md)

### Venn Chart (韦恩图)

**适用场景**: 显示集合关系

**Syntax 示例**:

```
vis venn
data
  - sets A
    size 10
  - sets B
    size 8
  - sets A,B
    size 3
```

详细用法参考: [references/venn.md](references/venn.md)

### Treemap (矩阵树图)

**适用场景**: 显示层级数据占比

**Syntax 示例**:

```
vis treemap
data
  - category 分类A
    value 30
  - category 分类B
    value 50
  - category 分类C
    value 20
```

详细用法参考: [references/treemap.md](references/treemap.md)

### Sankey Chart (桑基图)

**适用场景**: 展示流量流向

**Syntax 示例**:

```
vis sankey
data
  - source A
    target B
    value 10
  - source B
    target C
    value 5
  - source A
    target C
    value 5
```

详细用法参考: [references/sankey.md](references/sankey.md)

### Table (表格)

**适用场景**: 展示详细数据明细

**Syntax 示例**:

```
vis table
data
  - 姓名 张三
    年龄 25
    城市 北京
  - 姓名 李四
    年龄 30
    城市 上海
```

详细用法参考: [references/table.md](references/table.md)

### Summary (总结摘要)

**适用场景**: 数据报告生成、洞察结论呈现、叙事性数据展示

**Syntax 示例**:

```
# Q4 销售分析报告

## 核心指标
[2024 年 Q4](time_desc)，公司[销售额](metric_name)达到[¥523 万](metric_value, origin=5230000)，
较上季度[增长 15.2%](ratio_value, origin=0.152, assessment="positive")。

## 关键发现
- [新客户数](metric_name)：[1,234](metric_value, origin=1234)，环比增长[8.3%](ratio_value, origin=0.083)
- [客户留存率](metric_name)：[89.5%](ratio_value, origin=0.895)
- [平均订单金额](metric_name)：[¥4,567](metric_value, origin=4567)

其中，[线上渠道](dim_value)贡献了[68%](contribute_ratio, origin=0.68)的销售额。
```

详细用法参考: [references/summary.md](references/summary.md)

## Best Practices

1. **选择合适的图表类型**
   - 时间序列优先使用折线图或面积图
   - 分类比较优先使用柱形图或条形图
   - 占比分析使用饼图（分类不超过 5 个）
   - 多维对比使用雷达图

2. **数据要求**
   - 确保数据字段与图表类型匹配
   - 数值字段必须是数字类型
   - 分类字段必须是文本类型

3. **避免误用**
   - 不要用饼图展示趋势
   - 不要用折线图展示无序分类
   - 不要在数据量过大时使用饼图

## References

详细的图表知识、使用方法、数据要求和更多示例，请参考 `references/` 目录中的各图表文档。每个文档包含：

- 图表属性和基础概念
- 适用和不适用场景
- 详细的数据要求和类型定义
- 多个实际使用示例
