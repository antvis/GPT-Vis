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

| 名称 | 别名 | 英文名 | 适用场景 | 分析意图 |
|------|------|--------|----------|----------|
| 折线图 | 线图 | Line Chart | 时间序列数据，展示趋势变化 | 趋势分析、对比 |
| 柱形图 | 柱状图 | Column Chart | 分类数据比较 | 对比、分布、排名 |
| 条形图 | 横向柱状图 | Bar Chart | 分类数据比较，标签较长 | 对比、分布、排名 |
| 饼图 | 饼状图 | Pie Chart | 显示部分占整体的比例 | 占比、成分 |
| 面积图 | 区域图 | Area Chart | 时间序列，强调趋势和总量 | 趋势分析、对比 |
| 散点图 | - | Scatter Chart | 显示两个变量的关系 | 相关性分析、分布 |
| 双轴图 | 组合图 | Dual-Axes Chart | 同时展示两个不同量级的数据 | 多维对比、趋势分析 |
| 直方图 | - | Histogram | 显示数据分布 | 分布分析 |
| 箱线图 | 盒须图 | Boxplot | 显示数据分布和异常值 | 分布分析、异常检测 |
| 雷达图 | 蜘蛛图 | Radar Chart | 多维度数据对比 | 多维对比 |
| 漏斗图 | - | Funnel Chart | 展示流程转化率 | 流程分析、转化分析 |
| 瀑布图 | - | Waterfall Chart | 显示累计效应 | 增减变化分析 |
| 水波图 | 进度球 | Liquid Chart | 显示百分比或进度 | 进度展示、占比 |
| 词云图 | 词云 | Word Cloud | 展示文本词频 | 词频分析、热点展示 |
| 小提琴图 | - | Violin Chart | 显示数据分布密度 | 分布分析 |
| 韦恩图 | 文氏图 | Venn Chart | 显示集合关系 | 集合交并关系 |
| 矩阵树图 | 树状图 | Treemap | 显示层级数据占比 | 层级占比、结构分析 |
| 桑基图 | - | Sankey Chart | 展示流量流向 | 流向分析 |
| 表格 | 数据表 | Table | 展示详细数据明细 | 数据展示、查找 |
| 总结摘要 | - | Summary | 文本总结内容 | 内容总结 |

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

详细用法参考: [references/折线图 - Line Chart.md](references/折线图%20-%20Line%20Chart.md)

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

详细用法参考: [references/柱形图 - Column Chart.md](references/柱形图%20-%20Column%20Chart.md)

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

详细用法参考: [references/条形图 - Bar Chart.md](references/条形图%20-%20Bar%20Chart.md)

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

详细用法参考: [references/饼图 - Pie Chart.md](references/饼图%20-%20Pie%20Chart.md)

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

详细用法参考: [references/面积图 - Area Chart.md](references/面积图%20-%20Area%20Chart.md)

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

详细用法参考: [references/散点图 - Scatter Chart.md](references/散点图%20-%20Scatter%20Chart.md)

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

详细用法参考: [references/双轴图 - DualAxes Chart.md](references/双轴图%20-%20DualAxes%20Chart.md)

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

详细用法参考: [references/直方图 - Histogram Chart.md](references/直方图%20-%20Histogram%20Chart.md)

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

详细用法参考: [references/箱线图 - Boxplot.md](references/箱线图%20-%20Boxplot.md)

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

详细用法参考: [references/雷达图 - Radar Chart.md](references/雷达图%20-%20Radar%20Chart.md)

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

详细用法参考: [references/漏斗图 - Funnel Chart.md](references/漏斗图%20-%20Funnel%20Chart.md)

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

详细用法参考: [references/瀑布图 - Waterfall Chart.md](references/瀑布图%20-%20Waterfall%20Chart.md)

### Liquid Chart (水波图)

**适用场景**: 显示百分比或进度

**Syntax 示例**:
```
vis liquid
data
  - value 0.65
```

详细用法参考: [references/水波图 - Liquid Chart.md](references/水波图%20-%20Liquid%20Chart.md)

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

详细用法参考: [references/词云图 - Word Cloud Chart.md](references/词云图%20-%20Word%20Cloud%20Chart.md)

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

详细用法参考: [references/小提琴图 - Violin Chart.md](references/小提琴图%20-%20Violin%20Chart.md)

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

详细用法参考: [references/韦恩图 - Venn Chart.md](references/韦恩图%20-%20Venn%20Chart.md)

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

详细用法参考: [references/矩阵树图 - Treemap Chart.md](references/矩阵树图%20-%20Treemap%20Chart.md)

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

详细用法参考: [references/桑基图 - Sankey Chart.md](references/桑基图%20-%20Sankey%20Chart.md)

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

详细用法参考: [references/表格 - Table.md](references/表格%20-%20Table.md)

### Summary (总结摘要)

**适用场景**: 文本总结内容

**Syntax 示例**:
```
vis summary
data
  - content 这是一段总结内容，用于展示关键信息和要点。
```

详细用法参考: [references/总结摘要 - Summary.md](references/总结摘要%20-%20Summary.md)

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
