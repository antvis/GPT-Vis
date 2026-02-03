## 图表属性

- 名称：总结摘要
- 别名：数据解读文本、叙事文本，英文名 Summary
- 图表类别：文本可视化
- 图表功能：数据解读、洞察结论、叙事表达

## 基础概念

Summary 是一种将数据转化为结构化叙事文本的可视化组件，使用 T8 语法（一种声明式的类 Markdown 语言）来创建数据叙事。与传统图表不同，Summary 通过自然语言呈现洞察，并对数据实体进行语义标注。

在数据分析全流程展示上，除了可视化图表外，通过文本描述数据现象、给出洞察结论辅助分析，也十分重要。Summary 组件通过语义标注和内嵌可视化，使数据文本更具可读性和交互性。

## 适用场景

1. **数据报告生成**：自动生成格式规范、内容清晰的数据分析报告，适合 LLM 生成的内容；
2. **洞察结论呈现**：通过语义标注突出关键指标、趋势和对比，帮助用户快速识别重要信息；
3. **多维度数据解读**：支持指标名称、指标值、维度值、时间描述、趋势描述等多种语义类型；
4. **专业报告输出**：提供一致的专业级样式，支持明暗主题；
5. **叙事性数据展示**：当需要用自然语言讲述数据故事，而不仅仅是展示图表时。

## 不适用场景

1. 需要精确数值对比的场合，建议使用统计图表；
2. 需要展示大量原始数据的场景，建议使用表格；
3. 需要交互式探索数据的场景，建议使用交互式图表。

## 图表用法

### T8 语法结构

T8 语法是一种类 Markdown 的语言，用于创建带有语义实体标注的叙事文本。

#### 基本语法

```markdown
[显示文本](实体类型)
```

#### 带元数据的语法

```markdown
[显示文本](实体类型, key1=value1, key2=value2)
```

### 实体类型

- **metric_name**：指标名称，通常是句子的主语，如"销售额"、"DAU"、"转化率"等；
- **metric_value**：主要指标值，表示具体的数值，如"¥150 万"、"1,234 人"等；
- **other_metric_value**：次要指标值，用于辅助指标；
- **delta_value**：绝对变化值，表示增减的数值，如"+1,200"、"-500"等；
- **ratio_value**：百分比变化值，表示增长率或下降率，如"+15.3%"、"-8.2%"等；
- **contribute_ratio**：贡献占比，表示某部分占总体的比例；
- **trend_desc**：趋势描述，如"上升"、"下降"、"平稳"等；
- **dim_value**：维度值或类别，如"北京"、"女性"、"支付宝"等；
- **time_desc**：时间描述，如"2024 年 Q3"、"本月"等；
- **proportion**：比例或占比，如"3/5"、"60%"等。

### 元数据字段

- **origin**：原始数值，用于存储显示文本背后的原始数值；
- **assessment**：评估，表示变化是积极还是消极，可选值："positive"、"negative"、"equal"、"neutral"；
- **unit**：单位，表示数值的计量单位。

## 使用示例

1. 季度销售报告：展示销售额、增长率和关键指标。

```
vis summary

# Q4 销售报告

## 概览
本季度[销售额](metric_name)达到[¥523 万](metric_value, origin=5230000)，
较上季度[增长 15.2%](ratio_value, origin=0.152, assessment="positive")。

## 关键指标
- 新客户数：[1,234](metric_value, origin=1234)
- 留存率：[89.5%](ratio_value, origin=0.895)
- 平均订单额：[¥4,567](metric_value, origin=4567)
```

2. 市场分析报告：多维度展示市场数据和区域表现。

```
vis summary

# 市场分析报告

## 执行摘要
[2024 年](time_desc)，[全球智能手机出货量](metric_name)达到[12 亿台](metric_value, origin=1200000000)，
[同比下降 2.1%](ratio_value, origin=-0.021, assessment="negative")。

## 区域表现

### 亚太地区
[亚太地区](dim_value)仍是最大市场，出货量为[6.8 亿台](metric_value, origin=680000000)，
占全球销量的[56.7%](contribute_ratio, origin=0.567)。

### 北美地区
[北美地区](dim_value)表现[稳定增长](trend_desc, assessment="positive")，
出货量为[2.2 亿台](metric_value, origin=220000000)。
```

3. 简单的数据洞察：展示单一指标的变化趋势。

```
vis summary

[2024 年 1 月](time_desc)，[网站流量](metric_name)达到[150 万次访问](metric_value, origin=1500000)，
环比[增长 23.5%](ratio_value, origin=0.235, assessment="positive")，
其中[移动端](dim_value)占比[68%](contribute_ratio, origin=0.68)。
```

4. 用 Summary 可视化我的数据分析结论：2023 年公司收入为 1000 万元，2024 年收入为 1500 万元，增长率为 50%，其中线上渠道贡献了 60% 的收入。

```
vis summary

# 年度收入分析

[2024 年](time_desc)，公司[总收入](metric_name)达到[1500 万元](metric_value, origin=15000000)，
较[2023 年](time_desc)的[1000 万元](metric_value, origin=10000000)
[增长了 50%](ratio_value, origin=0.5, assessment="positive")。

其中，[线上渠道](dim_value)贡献了[60%](contribute_ratio, origin=0.6)的收入，
成为主要增长动力。
```
