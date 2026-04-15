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

| 属性      | 类型                                          | 是否必填 | 默认值    | 说明                                                    |
| --------- | --------------------------------------------- | -------- | --------- | ------------------------------------------------------- |
| container | `string \| HTMLElement`                       | 必填     | -         | 容器元素或 CSS 选择器                                   |
| theme     | `'default' \| 'light' \| 'dark' \| 'academy'` | 选填     | `'light'` | 图表主题，`"default"` 和 `"academy"` 均映射为 `"light"` |
| width     | `number`                                      | 选填     | -         | 容器宽度，单位为像素                                    |
| height    | `number`                                      | 选填     | -         | 容器高度，单位为像素                                    |
| wrapper   | `boolean`                                     | 选填     | `false`   | 是否显示外层包裹容器                                    |
| locale    | `string`                                      | 选填     | `'zh-CN'` | 包裹容器的语言设置                                      |

### render 方法

`render(syntax)` 方法接收一个 **T8 语法**字符串进行渲染。T8 语法是一种类 Markdown 的叙述文本语言，支持标题、段落、列表，以及带语义的数据实体标注。

#### 文本格式

- 标题：`# 一级标题`、`## 二级标题`、`### 三级标题`
- 段落：普通文本，段落之间用空行分隔
- 无序列表：`- 列表项`
- 有序列表：`1. 列表项`
- 加粗：`**文本**`
- 斜体：`*文本*`
- 下划线：`__文本__`

#### 实体标注语法

```
[显示文本](实体类型, 元数据键=元数据值)
```

常用实体类型：

- `metric_name`：指标名称
- `metric_value`：主要指标数值
- `ratio_value`：百分比变化值
- `delta_value`：绝对变化值
- `trend_desc`：趋势描述
- `dim_name`：维度名称
- `dim_value`：维度值
- `time_desc`：时间描述
- `contribute_ratio`：贡献占比

常用元数据字段：

- `origin`：数值类型，数据实体对应的原始数值，例如 `origin=1500000`
- `assessment`：文本类型，评估方向，可选值为 `"positive"` | `"negative"` | `"equal"` | `"neutral"`
- `unit`：文本类型，数值的计量单位

## 示例

### 展示季度销售摘要报告

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

const visSyntax = `
vis summary
# 季度销售报告

本季度 [营收](metric_name) 达到 [¥5,234,567](metric_value, origin=5234567)，
较上季度 [增长 15.2%](ratio_value, origin=0.152, assessment="positive")。

## 核心指标

- 新增客户：[1,234](metric_value, origin=1234) 人
- 留存率：[89.5%](ratio_value, origin=0.895)
- 平均订单金额：[¥4,567](metric_value, origin=4567)
`;

gptVis.render(visSyntax);
```

### 展示深色主题摘要

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
  theme: 'dark',
});

const visSyntax = `
vis summary
# 销售表现

营收达到 [¥250 万](metric_value, origin=2500000)，
同比 [增长 18%](ratio_value, origin=0.18, assessment="positive")。
`;

gptVis.render(visSyntax);
```
