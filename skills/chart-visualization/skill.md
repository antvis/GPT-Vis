# Chart Visualization Skill

## 介绍

本技能为数据可视化专用的 Claude Skill，帮助 AI 根据数据和用户需求推荐并生成合适的可视化图表。本技能涵盖统计图表、关系图表、地图图表等多种类型，支持 20+ 种图表，能够满足各种数据可视化场景的需求。

### 技能范围

- **统计图表**：折线图、柱形图、条形图、饼图、面积图、散点图、双轴图、直方图、箱线图、雷达图、漏斗图、瀑布图、水波图、词云图、小提琴图、韦恩图、矩阵树图
- **关系图表**：思维导图、流程图、网络图、桑基图、组织架构图、鱼骨图
- **地图图表**：点标注地图、热力地图
- **其他**：表格、总结摘要

### 使用场景

当用户需要可视化数据、选择合适图表类型、或生成数据可视化配置时，使用本技能。

## 图表分类

### 按结构分类

1. **统计图表**：用来表示数据的统计或聚合结果的经典图表
2. **关系图**：图论概念中的图，由点线关系组成
3. **地图**：展示地理信息专用的图表

### 按功能分类

- **对比类**：柱形图、条形图、雷达图
- **趋势类**：折线图、面积图
- **分布类**：散点图、直方图、箱线图、小提琴图
- **排名类**：柱形图、条形图
- **占比类**：饼图、韦恩图
- **组成类**：饼图、瀑布图、矩阵树图
- **关系类**：网络图、流程图、桑基图
- **层级类**：思维导图、组织架构图、矩阵树图
- **流向类**：桑基图、流程图
- **空间类**：点标注地图、热力地图

### 按形状分类

- **线形**：折线图、面积图
- **条形**：柱形图、条形图
- **圆形**：饼图
- **方形**：矩阵树图
- **面形**：面积图
- **散点形**：散点图
- **对称形**：雷达图、鱼骨图
- **网络形**：网络图、思维导图、流程图
- **地图**：点标注地图、热力地图

## 图表推荐逻辑

### 1. 理解用户需求

- 分析用户的问题和数据
- 识别可视化意图（对比、趋势、分布、占比等）
- 提取数据特征（类型、维度、字段）

### 2. 选择图表类型

根据以下规则选择：

#### 时间序列数据
- **折线图**：显示随时间变化的趋势
- **面积图**：强调数据总量和趋势

#### 分类数据比较
- **柱形图**：垂直比较，适合短标签
- **条形图**：水平比较，适合长标签

#### 占比分析
- **饼图/环图**：显示部分占整体的比例（分类不超过 5 个）

#### 多维数据
- **散点图**：显示两个变量的关系
- **雷达图**：多维度对比

#### 关系和流程
- **思维导图**：层级关系，中心主题展开
- **流程图**：步骤流程，有向关系
- **网络图**：复杂网络关系
- **桑基图**：流量和流向关系

#### 地理数据
- **点标注地图**：显示具体地点
- **热力地图**：显示密度分布

#### 其他场景
- **表格**：展示详细数据明细
- **总结摘要**：文本总结内容

### 3. 生成图表配置

使用 GPT-Vis 的语法生成配置，格式为：

```
vis [图表类型]
data
  - [字段名] [值]
    [字段名] [值]
[可选属性] [值]
```

## 支持的图表类型及最简示例

### 1. 折线图 (line)

**适用场景**：时间序列数据，展示趋势变化

**最简示例**：
```
vis line
data
  - time 2020
    value 100
  - time 2021
    value 120
  - time 2022
    value 150
```

### 2. 柱形图 (column)

**适用场景**：分类数据比较

**最简示例**：
```
vis column
data
  - category A
    value 30
  - category B
    value 50
  - category C
    value 20
```

### 3. 条形图 (bar)

**适用场景**：分类比较，标签较长或分类较多

**最简示例**：
```
vis bar
data
  - category 产品A
    value 30
  - category 产品B
    value 50
  - category 产品C
    value 20
```

### 4. 饼图 (pie)

**适用场景**：显示部分占整体的比例

**最简示例**：
```
vis pie
data
  - category A
    value 30
  - category B
    value 50
  - category C
    value 20
```

### 5. 面积图 (area)

**适用场景**：显示随时间变化的趋势和总量

**最简示例**：
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

### 6. 散点图 (scatter)

**适用场景**：显示两个变量之间的关系

**最简示例**：
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

### 7. 双轴图 (dual-axes)

**适用场景**：同时展示两个不同数量级的数据

**最简示例**：
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

### 8. 直方图 (histogram)

**适用场景**：显示数据分布

**最简示例**：
```
vis histogram
data
  - value 10
  - value 12
  - value 15
  - value 18
  - value 20
```

### 9. 箱线图 (boxplot)

**适用场景**：显示数据分布和异常值

**最简示例**：
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

### 10. 雷达图 (radar)

**适用场景**：多维度数据对比

**最简示例**：
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

### 11. 漏斗图 (funnel)

**适用场景**：展示流程中的转化率

**最简示例**：
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

### 12. 瀑布图 (waterfall)

**适用场景**：显示累计效应

**最简示例**：
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

### 13. 水波图 (liquid)

**适用场景**：显示百分比或进度

**最简示例**：
```
vis liquid
data
  - value 0.65
```

### 14. 词云图 (word-cloud)

**适用场景**：展示文本词频

**最简示例**：
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

### 15. 小提琴图 (violin)

**适用场景**：显示数据分布的密度

**最简示例**：
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

### 16. 韦恩图 (venn)

**适用场景**：显示集合之间的关系

**最简示例**：
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

### 17. 矩阵树图 (treemap)

**适用场景**：显示层级数据的占比

**最简示例**：
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

### 18. 思维导图 (mind-map)

**适用场景**：展示层级关系，中心主题展开

**最简示例**：
```
vis mind-map
data
  - source 中心主题
    target 分支1
  - source 中心主题
    target 分支2
  - source 分支1
    target 子分支1
```

### 19. 流程图 (flow-diagram)

**适用场景**：展示步骤流程

**最简示例**：
```
vis flow-diagram
data
  - source 开始
    target 步骤1
  - source 步骤1
    target 步骤2
  - source 步骤2
    target 结束
```

### 20. 网络图 (network-graph)

**适用场景**：展示复杂网络关系

**最简示例**：
```
vis network-graph
data
  - source 节点A
    target 节点B
  - source 节点B
    target 节点C
  - source 节点A
    target 节点C
```

### 21. 桑基图 (sankey)

**适用场景**：展示流量流向

**最简示例**：
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

### 22. 组织架构图 (organization-chart)

**适用场景**：展示组织层级结构

**最简示例**：
```
vis organization-chart
data
  - id 1
    name CEO
  - id 2
    name 经理A
    parent 1
  - id 3
    name 经理B
    parent 1
```

### 23. 鱼骨图 (fishbone-diagram)

**适用场景**：因果分析

**最简示例**：
```
vis fishbone-diagram
data
  - category 原因1
    factor 因素A
  - category 原因1
    factor 因素B
  - category 原因2
    factor 因素C
```

### 24. 点标注地图 (pin-map)

**适用场景**：显示地理位置点

**最简示例**：
```
vis pin-map
data
  - lat 39.9042
    lng 116.4074
    label 北京
  - lat 31.2304
    lng 121.4737
    label 上海
```

### 25. 热力地图 (heat-map)

**适用场景**：显示地理密度分布

**最简示例**：
```
vis heat-map
data
  - lat 39.9042
    lng 116.4074
    value 100
  - lat 31.2304
    lng 121.4737
    value 80
```

### 26. 表格 (table)

**适用场景**：展示详细数据明细

**最简示例**：
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

### 27. 总结摘要 (summary)

**适用场景**：文本总结

**最简示例**：
```
vis summary
data
  - content 这是一段总结内容
```

## 工作流程

1. **分析需求**：理解用户问题和可视化目标
2. **检查数据**：识别数据类型、字段、维度
3. **选择图表**：根据推荐逻辑选择合适的图表类型
4. **生成配置**：使用 GPT-Vis 语法生成图表配置
5. **优化呈现**：添加标题、轴标签等提升可读性

## 注意事项

1. **图表选择**：
   - 时间序列优先使用折线图或面积图
   - 分类比较优先使用柱形图或条形图
   - 占比分析使用饼图（分类不超过 5 个）
   - 关系网络使用网络图或思维导图
   - 地理数据使用地图类图表

2. **数据要求**：
   - 确保数据字段与图表类型匹配
   - 数值字段必须是数字类型
   - 分类字段必须是文本类型
   - 地理数据需要经纬度

3. **避免误用**：
   - 不要用饼图展示趋势
   - 不要用折线图展示无序分类
   - 不要在数据量过大时使用饼图
   - 不要在无关系数据中使用网络图

## 参考资料

详细的图表知识、使用方法、数据要求和更多示例，请参考 `references/` 目录中的各图表文档：

- 统计图表：折线图、柱形图、条形图、饼图、面积图、散点图、双轴图、直方图、箱线图、雷达图、漏斗图、瀑布图、水波图、词云图、小提琴图、韦恩图、矩阵树图
- 关系图表：思维导图、流程图、网络图、桑基图、组织架构图、鱼骨图
- 地图图表：点标注地图、热力地图
- 其他：表格、总结摘要

每个图表文档包含：
- 图表属性和基础概念
- 适用和不适用场景
- 详细的图表用法和数据要求
- 多个实际使用示例
