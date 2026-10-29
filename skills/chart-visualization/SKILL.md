---
name: chart-visualization
description: 根据数据和分析目标选择 GPT-Vis 图表，生成 JSON、流式 Syntax 或可运行的集成代码；支持根据品牌规范、网站、图片等参考创建或调整可复用的 ThemeSpec 自定义主题。
---

# GPT-Vis 图表与主题生成

## 工作流程

1. 判断任务：选择图表、生成配置或代码，还是创建、调整自定义主题。
2. 图表任务根据分析目标和数据结构选择类型，再直接读取下表中对应的参考；仅推荐类型时无需读取配置参考。
3. 默认输出严格 JSON；用户要求流式输出或 Syntax 时使用缩进语法；要求网页或项目代码时提供完整集成代码。
4. 创建、调整 ThemeSpec 时读取 [Theme Creator](references/theme-creator.md)，按其中的完整配置表生成主题。只生成主题时无需读取图表数据配置。

只读取当前任务需要的参考；一次生成多种图表时读取涉及的类别。

## 按分析意图选择图表

| 分析意图   | 图表与适用场景                                                                                                                                                                                     | 配置参考                                          |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| 趋势与比较 | `line` 时间趋势；`area` 趋势与总量；`column` 分类比较；`bar` 长标签或较多分类；`dual-axes` 共享分类轴的不同量纲序列                                                                                | [趋势与比较](references/trend-comparison.md)      |
| 占比与阶段 | `pie` 少量类别的整体占比；`funnel` 阶段转化；`waterfall` 累计增减；`liquid` 单个比例或进度                                                                                                         | [占比与阶段](references/composition-stage.md)     |
| 分布与关系 | `scatter` 两个数值变量关系；`histogram` 连续样本频次；`boxplot` 分组分布与异常值；`violin` 分布密度；`radar` 多维比较；`venn` 集合交集                                                             | [分布与关系](references/distribution-relation.md) |
| 层级与流向 | `treemap` 层级占比；`sankey` 带权流向；`flow-diagram` 流程依赖；`network-graph` 实体关联；`mindmap` 知识结构；`indented-tree` 目录层级；`organization-chart` 组织层级；`fishbone-diagram` 根因分析 | [层级与流向](references/hierarchy-flow.md)        |
| 文本与表格 | `word-cloud` 词频概览；`table` 精确数据查阅                                                                                                                                                        | [文本与表格](references/text-table.md)            |
| 数据叙事   | `summary` 带语义标注与行内可视化的文字摘要                                                                                                                                                         | [T8 Summary](references/summary.md)               |

当前支持以上 26 种类型。无法准确表达时说明限制，选择合适的替代方案，不编造 `type`。

- 无序分类比较用 `column` / `bar`，时间趋势用 `line` / `area`。
- `pie` 用于同一整体的构成，通常不超过 5 类；类别多时考虑 `bar` 或 `treemap`。
- 连续原始样本的分布用 `histogram`，多组分布比较用 `boxplot` / `violin`。
- 有权重的流向用 `sankey`，步骤与依赖用 `flow-diagram`。
- 精确查阅用 `table`，指标解读与自然语言洞察用 `summary`。

## 通用 API 与配置

通过 `import { GPTVis } from '@antv/gpt-vis'` 使用统一入口：

```ts
const chart = new GPTVis(options);
chart.render(config);
chart.destroy();
```

构造参数 `options`：

| 字段               | 类型                    | 默认值 / 用途                                               |
| ------------------ | ----------------------- | ----------------------------------------------------------- |
| `container`        | `string \| HTMLElement` | 必填，CSS 选择器或 DOM 元素                                 |
| `width` / `height` | `number`                | 可选，像素尺寸；确保容器有可计算的宽高                      |
| `theme`            | `VisualizationTheme`    | `'default'`，内置名称或完整 ThemeSpec 对象                  |
| `wrapper`          | `boolean`               | `false`，开启外层工具栏与标签页等 UI                        |
| `locale`           | `string`                | `'en-US'`，wrapper 与支持本地化的图表文案；中文用 `'zh-CN'` |

除 Summary 外，配置都包含 `type`，并支持以下通用字段；各参考只列出图表数据和特有参数：

```ts
type VisualizationTheme = 'default' | 'light' | 'dark' | 'academy' | ThemeSpec;

type CommonConfig = {
  type: ChartType;
  title?: string;
  subtitle?: string;
  theme?: VisualizationTheme;
  style?: ThemeStyle;
};
```

`ChartType` 是上表的类型集合。`ThemeStyle` 提供 `backgroundColor`、`palette`、`title`、`axis`、`legend`、`label`、`mark`、`node`、`edge`、`table`、`summary`、`texture` 等命名空间，各图表只消费支持的字段。需要精确样式字段时查看 [Theme Creator 的配置表](references/theme-creator.md#style-namespaces-style-and-chartstypestyle)。

`render()` 接收 JSON 配置对象、以 `vis <type>` 开头的 Syntax 字符串，或 Summary 的 T8 文本。同类型重复渲染复用图表实例，切换类型时销毁旧图表。页面或组件卸载时调用 `destroy()`。

### 可复用主题与单图样式

`default` 与 `light` 都使用默认浅色主题，另有 `dark`、`academy`。自定义主题直接传完整 ThemeSpec 对象：

```json
{
  "id": "product-report",
  "label": "产品报告",
  "baseTheme": "default",
  "tokens": {
    "colorDefault": "#2563eb",
    "category10": ["#2563eb", "#0e8175", "#b45309"],
    "radius": 8
  }
}
```

ThemeSpec 必需字段只有 `id`、`label`；可选 `description`、`baseTheme`、`tokens`、全局 `style`、`charts`。`id` 是元数据，不注册名称；不能用 `theme: 'product-report'` 代替对象。创建或微调主题前读取 [Theme Creator](references/theme-creator.md)，其中完整列出了支持字段、用途和设计建议，无需再查库源码。

优先级：**单图 config > 自定义 ThemeSpec > GPT-Vis 内置主题**。具体顺序为 **内置默认值 < Tokens < 全局 style < charts[type].style < 单图 style**。嵌套对象合并，数组整体替换，`0` / `false` 不因其值而被跳过。单图显式 `theme` 替换构造函数选择的主题，不合并两份 ThemeSpec。

主题只控制外观，不改变数据、编码、布局、交互或 Mark 显隐。精确颜色使用实际 CSS 颜色值，不能把 `"colorText"` 等 Token 名当成颜色引用；未知样式字段会被忽略。单图的布局选项不能放进 ThemeSpec。

Summary 通过构造函数接收主题，渲染输入保持 T8 文本，没有单次渲染的 `style` 对象入口。

**兼容说明：ThemeSpec 需要 GPT-Vis `1.1.0` 及以上版本。**

## 输出约定

### JSON 配置（默认）

输出可直接传给 `GPTVis.render()` 的严格 JSON，不包含注释、函数、尾随逗号或 `undefined`。将用户字段映射为所选图表需要的实际数据结构，不只交付抽象的字段映射。

```json
{
  "type": "column",
  "title": "区域销售额对比",
  "data": [
    { "category": "华东", "value": 120, "group": "2025" },
    { "category": "华东", "value": 148, "group": "2026" },
    { "category": "华南", "value": 98, "group": "2025" },
    { "category": "华南", "value": 131, "group": "2026" }
  ],
  "group": true,
  "axisXTitle": "区域",
  "axisYTitle": "销售额（万元）"
}
```

### Syntax 与 Markdown

直接传给 `render()` 的 Syntax 首行必须是 `vis <type>`：

```text
vis column
data
  - category "North America"
    value 120
  - category Europe
    value 98
title 区域销售额
axisYTitle 销售额（万元）
style
  palette
    - #2563eb
    - #0e8175
```

- 属性写作 `key value`，每行一个；用缩进表达嵌套对象。
- 数组项写作 `- value`；对象数组后续字段与首字段对齐，树形数据通过 `children` 递归缩进。
- 含空格的字符串加引号；数值、布尔值保持对应类型。
- 需要复杂 ThemeSpec 时优先使用 JSON 或在构造函数中传入主题对象。

按照 README 的 Markdown 集成方式，代码块标记为 `vis <type>`，正文省略该首行；宿主将语言标记与正文拼接后调用 `render()`：

````markdown
```vis line
data
  - time 2025
    value 100
  - time 2026
    value 120
```
````

**Summary 使用 T8 文本，不生成 JSON 图表配置，也不加 `vis summary` 前缀。** 生成前读取 [Summary 参考](references/summary.md)。

### 集成代码

使用 npm 安装：

```bash
npm install @antv/gpt-vis
```

```js
import { GPTVis } from '@antv/gpt-vis';
```

独立 HTML 默认使用 CDN：

```html
<script src="https://unpkg.com/@antv/gpt-vis/dist/umd/index.min.js"></script>
```

CDN 全局类为 `GPTVis.GPTVis`。输出完整 HTML 文档，包含容器、可计算的宽高、实际配置与渲染调用。用户指定 React、Vue 或其他环境时遵循对应的挂载和卸载流程；需要监听尺寸变化时清理相应监听或 `ResizeObserver`。将数据嵌入 HTML 时使用可靠的序列化并处理脚本上下文转义，不直接拼接用户文本。

## 交付检查

- 图表类型符合分析目标，数据已转换为对应结构；不编造缺失数据、单位或关系。
- 数值字段为有限数字，分类和名称为字符串；不把 `"35%"`、`"1,200"` 当成数字。
- `column` / `bar` 多系列明确选择 `group: true` 或 `stack: true`，不同时开启；各系列记录都提供 `group`。
- 检查双轴序列长度、图的节点引用、分布图的原始样本和比例范围，遵循各类别参考。
- ThemeSpec 与单图配置边界正确；主题 JSON 使用受支持字段，保持既有图表能力。
- JSON 可解析、Syntax 可渲染；Summary 使用 T8；代码输出包含尺寸与资源清理。
