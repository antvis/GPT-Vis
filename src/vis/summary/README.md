# Summary

叙述文本可视化组件（Summary），用于将数据洞察以自然语言叙述的形式呈现，支持在段落文本中嵌入带语义标注的数据实体。基于 AntV T8 构建，适合生成数据解读报告和摘要。

## 适用场景

1. AI 生成数据报告：适合在 AIGC 场景中，由大语言模型自动生成数据分析报告，以自然语言叙述形式呈现数据结论。
2. 业务洞察文字呈现：用于展示业务摘要、经营分析等需要以段落叙述传达复杂洞察的场景。
3. 数据结论配语义标注：在叙述文本中嵌入带语义标注的数据实体（如指标名称、数值、趋势描述），增强数据表达的可读性与视觉层次。
4. KPI 达成情况文字解读：适合对关键绩效指标的完成情况进行文字解读，配合正负向评估标注直观呈现达成趋势。

## 不适用场景

1. 不适合展示需要直观对比多个数据系列的场景，建议使用柱状图或折线图。
2. 不适合用于展示数据分布或趋势走势，建议使用面积图或散点图。
3. 当数据量大且需要排序、过滤时，建议使用表格组件。

## 配置

| 属性  | 类型                               | 是否必填 | 默认值      | 说明                                          |
| ----- | ---------------------------------- | -------- | ----------- | --------------------------------------------- |
| theme | `'default' \| 'academy' \| 'dark'` | 选填     | `'default'` | 图表主题，`'default'` 和 `'academy'` 均为亮色 |

## 语法

使用 T8 语法（类 Markdown + 语义标注）直接书写。

### 语义标注语法

```
[显示文本](实体类型)
[显示文本](实体类型, key=value)
```

### 实体类型

| 类型                 | 说明                           | 支持属性               | 示例                                                                             |
| -------------------- | ------------------------------ | ---------------------- | -------------------------------------------------------------------------------- |
| `metric_name`        | 指标名称                       | —                      | `[日活跃用户数](metric_name)`                                                    |
| `metric_value`       | 指标数值，支持格式化和原始数据 | `origin`, `unit`       | `[¥1,234,567](metric_value, origin=1234567)`                                     |
| `other_metric_value` | 次要/辅助指标值                | —                      | `[平均订单价值](other_metric_value)`                                             |
| `delta_value`        | 绝对变化值，带正负评估         | `origin`, `assessment` | `[¥180,000](delta_value, origin=180000, assessment=positive)`                    |
| `ratio_value`        | 百分比变化/增长率              | `origin`, `assessment` | `[15%](ratio_value, origin=0.15, assessment=positive)`                           |
| `contribute_ratio`   | 部分对整体的贡献占比           | `origin`, `assessment` | `[64.8%](contribute_ratio, origin=0.648, assessment=positive)`                   |
| `proportion`         | 部分与整体的比率               | `origin`               | `[四分之三](proportion, origin=0.75)`                                            |
| `trend_desc`         | 趋势的定性描述                 | `assessment`           | `[强劲增长](trend_desc, assessment=positive)`                                    |
| `dim_value`          | 维度值（类别、地区、产品等）   | —                      | `[亚太地区](dim_value)`                                                          |
| `time_desc`          | 时间引用和时间段描述           | —                      | `[2024年Q4](time_desc)`                                                          |
| `rank`               | 排名位置                       | `detail`               | `[排名第一](rank, detail=[320, 180, 90, 65, 45])`                                |
| `difference`         | 值之间的差距或差异             | `detail`               | `[1.4亿台的差距](difference, detail=[200, 180, 160, 140])`                       |
| `anomaly`            | 数据中的异常模式或离群值       | `detail`               | `[异常集中](anomaly, detail=[15, 18, 20, 65, 22])`                               |
| `association`        | 变量之间的相关性或关系         | `detail`               | `[强相关性](association, detail=[{"x":100,"y":105},{"x":120,"y":128}])`          |
| `distribution`       | 数据分布                       | `detail`               | `[分布](distribution, detail=[15, 25, 35, 15, 10])`                              |
| `seasonality`        | 周期性/季节性模式              | `detail`               | `[明显季节性](seasonality, detail={"data":[80, 90, 95, 135], "range":[0, 150]})` |

属性字段：`origin`（原始数值）、`assessment`（`positive` / `negative` / `equal`）、`unit`（单位）、`detail`（用于高级分析实体的数据）

## 示例

### 销售报告

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({ container: '#container' });

const visSyntax = `
# Q4 销售报告

## 概述

在 [2024年Q4](time_desc)，[总收入](metric_name)达到
[¥520万](metric_value, origin=5200000)，相比Q3增长了
[¥80万](delta_value, origin=800000, assessment=positive)，
增长率为 [18%](ratio_value, origin=0.18, assessment=positive)。
[客单价](other_metric_value)为 [¥328](metric_value, origin=328)。

## 各地区表现

[北美地区](dim_value)以 [¥210万](metric_value, origin=2100000)领先，
占总收入的 [40%](contribute_ratio, origin=0.40, assessment=positive)。
该地区在所有市场中[排名第一](rank, detail=[2100000, 1800000, 1300000])。
`;

gptVis.render(visSyntax);
```

### 深色主题

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({ container: '#container', theme: 'dark' });

const visSyntax = `
# 销售表现

营收达到 [¥250 万](metric_value, origin=2500000)，
同比 [增长 18%](ratio_value, origin=0.18, assessment=positive)。
`;

gptVis.render(visSyntax);
```
