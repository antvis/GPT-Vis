### 总结摘要(summary)

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

#### 最佳实践

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
