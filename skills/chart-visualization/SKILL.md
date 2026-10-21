---
name: chart-visualization
description: 根据数据和分析目标推荐 GPT-Vis 可视化，并生成可供 GPTVis.render() 消费的 JSON 配置或可运行的集成代码。适用于图表选择、结构化推荐结果落地、交互式图表、HTML 报告以及 React、Vue、JavaScript 项目中的可视化生成。
---

# GPT-Vis 图表推荐与生成

本技能对应 `@antv/gpt-vis@1.0.2`，图表清单和配置字段以该版本的 `GPTVis.chartRegistry` 与公开类型为准。

## 工作流程

1. 根据分析目标、字段类型和数据规模选择一个主要图表类型。
2. 仅推荐图表类型时使用本页清单即可；生成配置时，先读取 [图表配置规范](references/chart-specs.md) 的通用字段和路由，再只读取所选图表所属类别的规范。
3. 默认输出严格 JSON 配置；只有用户明确要求流式渲染或 GPT-Vis Markdown 语法时才输出 Syntax。
4. 用户要求网页或项目代码时，生成完整、可运行的集成代码，并处理容器尺寸和实例销毁。
5. 检查 `type`、数据结构和布局参数，不编造缺失数据或未注册的图表类型。

`summary` 是例外：它接收 T8 文本而不是 JSON 图表配置。生成前必须读取 [Summary 规范](references/summary.md)。

## 图表清单

GPT-Vis 当前注册 26 种可视化：

| `type`               | 适用场景                                       |
| -------------------- | ---------------------------------------------- |
| `line`               | 时间趋势、多系列趋势                           |
| `area`               | 趋势与总量、堆叠趋势                           |
| `column`             | 分类比较；适合短标签                           |
| `bar`                | 分类比较；适合长标签或较多分类                 |
| `pie`                | 少量类别的整体占比、环图                       |
| `scatter`            | 两个数值变量的关系、聚类和异常点               |
| `dual-axes`          | 共享分类轴、量纲不同的折线与柱形序列           |
| `histogram`          | 单个连续数值字段的频次分布                     |
| `boxplot`            | 分组分布、中位数、离散程度和异常值             |
| `violin`             | 分组分布及密度形状                             |
| `radar`              | 少量对象的多维指标对比                         |
| `funnel`             | 有顺序的流程阶段及转化                         |
| `waterfall`          | 正负增减对累计结果的贡献                       |
| `liquid`             | 单个 0–1 比例或完成度                          |
| `word-cloud`         | 词语权重或频次概览                             |
| `venn`               | 集合及交集关系                                 |
| `treemap`            | 层级数据的面积占比                             |
| `sankey`             | 带权重的多阶段流向                             |
| `flow-diagram`       | 有向流程、步骤及依赖关系                       |
| `mindmap`            | 树状知识结构和主题发散                         |
| `indented-tree`      | 目录、分类法和可展开层级                       |
| `network-graph`      | 实体之间的网络关系                             |
| `organization-chart` | 组织或岗位层级，可附节点描述                   |
| `fishbone-diagram`   | 问题原因拆解和根因分析                         |
| `table`              | 需要保留精确值、字段较多的结构化数据           |
| `summary`            | 带语义标注和行内可视化的数据叙事，不是普通图表 |

只使用清单中的 `type`。无法用现有类型准确表达时，说明限制并选择信息损失最小的替代方案。

## 选择原则

- 时间变化优先使用 `line`；强调累计规模时使用 `area`。
- 无序分类比较使用 `column` 或 `bar`，不要使用折线图。
- `column` / `bar` 的多系列并排比较使用 `group: true`，累计构成使用 `stack: true`；不要同时开启两者。
- 占比只有在类别构成同一整体时使用 `pie`，类别通常不超过 5 个；更多类别使用 `bar` 或 `treemap`。
- 原始连续样本的分布使用 `histogram`；比较多组分布使用 `boxplot` 或 `violin`。
- 两个数值变量的关系使用 `scatter`；不要把两个独立量纲误画成分类柱状图。
- 有权重的流向使用 `sankey`，无权重的步骤关系使用 `flow-diagram`。
- 精确查阅优先使用 `table`；自然语言洞察与指标叙事使用 `summary`。

## 输出格式

### JSON 配置（默认）

输出可直接传给 `GPTVis.render(config)` 的严格 JSON。不要包含注释、尾随逗号、函数或 `undefined`。

```json
{
  "type": "column",
  "data": [
    { "category": "华东", "value": 120, "group": "2025" },
    { "category": "华东", "value": 148, "group": "2026" },
    { "category": "华南", "value": 98, "group": "2025" },
    { "category": "华南", "value": 131, "group": "2026" }
  ],
  "group": true,
  "title": "区域销售额对比",
  "axisXTitle": "区域",
  "axisYTitle": "销售额（万元）"
}
```

上游分析或推荐结果可能只包含抽象字段映射。交付 GPT-Vis 配置时，应按 [图表配置规范](references/chart-specs.md) 转换为对应图表的数据结构；不要把尚未转换的字段映射直接当作可渲染配置。

### Syntax（仅在明确要求时）

GPT-Vis 支持以 `vis <type>` 开头的缩进语法，适合逐 token 流式渲染。用户明确要求 Syntax 或 GPT-Vis Markdown 时再使用；普通结构化输出优先 JSON，以降低语法错误和上下文成本。

直接传给 `render()` 的 Syntax 首行必须是 `vis <type>`。按照仓库 README 的 Markdown 集成方式，fenced code block 的 info string 使用 `vis <type>`，宿主再将 info string 与内容拼接后传给 `render()`。

### 集成代码

用户要求代码时，根据目标环境输出完整 HTML、原生 JavaScript、React 或 Vue 代码。默认使用固定版本：

```bash
npm install @antv/gpt-vis@1.0.2
```

```javascript
import { GPTVis } from '@antv/gpt-vis';

const chart = new GPTVis({ container: '#chart' });
chart.render(config);
```

CDN 环境使用：

```html
<script src="https://unpkg.com/@antv/gpt-vis@1.0.2/dist/umd/index.min.js"></script>
```

CDN 全局类通过 `GPTVis.GPTVis` 访问。独立 HTML 必须满足：

- 输出完整文档，不只输出一个 `<div>`。
- 图表容器具有可计算的宽高；嵌入页面时由父容器提供高度。
- 容器尺寸会变化时使用 `ResizeObserver` 读取实际宽高，销毁旧实例并按新尺寸重新创建，不固定假设页面高度。
- 配置数据使用可靠的 JSON 序列化器写入，避免直接拼接用户字符串。
- 页面或组件卸载时调用 `destroy()`；若创建了 `ResizeObserver`，同时执行 `disconnect()`。

## 数据与配置约束

- 数值字段必须是有限数字，分类和名称字段使用字符串；不要把 `"35%"`、`"1,200"` 当作数值。
- 使用系列字段 `group` 时，每条数据都应提供非空 `group`，不要只给部分记录分组。
- 数据中出现 `group` 不等于自动分组：`column` / `bar` 还必须明确设置 `group: true` 或 `stack: true`。
- `dual-axes.categories` 的长度必须与每个 `series[].data` 一致。
- `histogram` 接收原始数字数组，而不是预先聚合的区间计数。
- `boxplot` 和 `violin` 的每个分类需要多条原始样本，不能只提供一个汇总值。
- `liquid.percent` 范围为 `0` 到 `1`。
- 图和树结构中的引用必须闭合：边的 `source`、`target` 应对应已有节点。
- 标题、坐标轴和 tooltip 所表达的单位应与数据一致。

## 交付检查

- `type` 来自当前 26 种注册类型，且符合分析目标。
- 配置满足对应 spec，字段名、数据类型和必填项正确。
- 多系列柱状图已明确选择并排或堆叠布局，没有柱体重叠。
- 没有编造数据、单位、分类或关系。
- JSON 可解析，并可直接传给 `GPTVis.render()`；`summary` 已按 T8 规范生成。
- 代码结果包含可计算尺寸、资源清理和必要的运行依赖。
