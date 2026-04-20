---
name: chart-visualization
description: 推荐并生成合适的数据可视化图表，使用 GPT-Vis 库。支持两种输出模式：（1）语法模式——生成 Syntax 或 JSON 配置；（2）代码模式——生成完整的运行代码。支持 26 种图表类型。
---

# 图表可视化技能

## 步骤

1. **意图识别**：根据用户意图和数据特征选择图表类型
2. **确定输出模式**：根据上下文选择语法模式或代码模式
3. **生成输出**：按所选模式生成内容

## 支持的图表类型

| type 值            | 适用场景           |
| ------------------ | ------------------ |
| line               | 时间序列趋势       |
| area               | 时间序列趋势+总量  |
| column             | 分类数据对比       |
| bar                | 分类对比（标签长） |
| pie                | 部分占整体比例     |
| scatter            | 两变量关系         |
| dual-axes          | 不同量级数据对比   |
| histogram          | 连续数值频次分布   |
| boxplot            | 数据分布与异常值   |
| violin             | 数据分布密度       |
| radar              | 多维度对比         |
| funnel             | 流程转化率         |
| waterfall          | 累计增减变化       |
| liquid             | 百分比/进度        |
| word-cloud         | 词频展示           |
| venn               | 集合交并关系       |
| treemap            | 层级数据占比       |
| sankey             | 流量流向           |
| flow-diagram       | 流程步骤           |
| mindmap            | 层级知识梳理       |
| indented-tree      | 树节点层级/目录    |
| network-graph      | 实体间关联关系     |
| organization-chart | 组织层级           |
| fishbone-diagram   | 根因分析           |
| table              | 表格数据展示       |
| summary            | 内容总结           |

## 输出模式

### 模式一：语法模式（Syntax / JSON）

用于 LLM 应用集成场景，生成图表配置供 `GPTVis.render()` 消费。支持两种格式：

- **Syntax 格式**：类 Markdown 缩进语法，适合流式输出（LLM 逐 token 生成时可实时渲染）
- **JSON 格式**：标准 JSON 对象，适合结构化 API 调用

两种格式等价，`GPTVis.render()` 均可直接接受。

### 模式二：代码模式

用于用户需要可直接运行的完整代码场景。生成包含安装说明和完整代码的输出。

## GPTVis API

`GPTVis` 是库的统一入口类，负责创建、渲染和销毁图表。

### 构造函数

```typescript
new GPTVis(options: VisualizationOptions)
```

**VisualizationOptions：**

| 参数        | 类型                                          | 必填 | 默认值    | 说明                                           |
| ----------- | --------------------------------------------- | ---- | --------- | ---------------------------------------------- |
| `container` | `string \| HTMLElement`                       | 是   | —         | CSS 选择器或 DOM 元素                          |
| `width`     | `number`                                      | 否   | —         | 图表宽度（px）                                 |
| `height`    | `number`                                      | 否   | —         | 图表高度（px）                                 |
| `theme`     | `'default' \| 'light' \| 'dark' \| 'academy'` | 否   | `'light'` | 主题                                           |
| `wrapper`   | `boolean`                                     | 否   | `false`   | 是否显示外层 UI 容器（含标签页、下载、复制等） |
| `locale`    | `string`                                      | 否   | `'zh-CN'` | wrapper 内文案语言                             |

### 方法

#### `render(config: string | object): void`

渲染图表。接受两种输入：

- **Syntax 字符串**：以 `vis [type]` 开头的文本，自动解析为配置对象
- **JSON 配置对象**：包含 `type` 字段的对象
- **纯文本**：不以 `vis ` 开头的字符串会被当作 summary 类型渲染

多次调用 `render()` 会自动销毁前一个图表再渲染新图表。

#### `destroy(): void`

销毁当前图表实例，释放资源。

## 语法模式：JSON 格式

直接输出符合图表 TypeScript 类型的 JSON 对象，`GPTVis.render()` 可直接消费。

### JSON 示例

```json
{
  "type": "column",
  "data": [
    { "category": "A产品", "value": 30, "group": "线上" },
    { "category": "B产品", "value": 50, "group": "线上" }
  ],
  "title": "产品销量对比",
  "axisXTitle": "产品",
  "axisYTitle": "销量（万）",
  "stack": true,
  "theme": "academy",
  "style": {
    "palette": ["#5B8FF9", "#61DDAA"]
  }
}
```

## 语法模式：Syntax 格式

类 Markdown 缩进语法，支持流式渲染。第一行必须是 `vis [type]`。

### 语法规则

**基本属性** — `key value`，每行一个：

```
title 年度趋势
theme dark
```

**对象数组** — `data` 下每项用 `- ` 开头，子字段缩进：

```
{ data: { time: string; value: number; }[]; }
```

对应：

```
data
  - time 2020
    value 100
  - time 2021
    value 120
```

**纯值数组** — 每项用 `- ` 开头：

```
{ data: number[] }
```

对应：

```
data
  - 10
  - 20
```

**嵌套对象** — 对象名占一行，子属性缩进：

```
{ style?: { backgroundColor?: string; palette?: string[] } }
```

对应：

```
style
  backgroundColor #f0f2f5
  palette
    - #5B8FF9
    - #61DDAA
```

**递归树形** — `children` 数组用 `- ` 缩进：

```
type TreeData = { name: string; children?: TreeData[] };
{ data: TreeData; }
```

对应：

```
data
  name 根节点
  children
    - name 子节点A
      children
        - name 孙节点
    - name 子节点B
```

### Syntax 完整示例

```
vis column
data
  - category A产品
    value 30
    group 线上
  - category B产品
    value 50
    group 线上
title 产品销量对比
axisXTitle 产品
axisYTitle 销量（万）
stack true
theme academy
style
  palette
    - #5B8FF9
    - #61DDAA
```

## 代码模式

根据目标框架生成完整可运行代码。

### 安装方式

**NPM：**

```bash
npm install @antv/gpt-vis
```

```javascript
import { GPTVis } from '@antv/gpt-vis';
```

**CDN：**

```html
<script src="https://unpkg.com/@antv/gpt-vis/dist/umd/index.min.js"></script>
```

CDN 引入后通过 `GPTVis.GPTVis` 访问主类。

### HTML 完整示例

```html
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

      gptVis.render(`
vis line
data
  - time 2020
    value 100
  - time 2021
    value 120
title 年度趋势
`);
    </script>
  </body>
</html>
```

## 图表类型配置

### 通用配置

所有图表均包含以下字段，后续各图表类型定义中省略这些字段。各小节标题即为 `type` 值（如 `line`、`column`），对应上方图表类型表中的 type 列。

```
{ type: string; title?: string; theme?: 'default' | 'light' | 'dark' | 'academy'; style?: { backgroundColor?: string; palette?: string[] } }
```

### line / area

```
{ data: { time: string | number; value: number; group?: string }[]; axisXTitle?: string; axisYTitle?: string; stack?: boolean; style?: { lineWidth?: number } }
```

`stack` 仅 area 支持。

### column / bar

```
{ data: { category: string; value: number; group?: string }[]; axisXTitle?: string; axisYTitle?: string; stack?: boolean; group?: boolean }
```

### pie

value 不可使用百分比数字。

```
{ data: { category: string; value: number }[]; innerRadius?: number }
```

`innerRadius` 设为 0.6 变为环图。

### scatter

```
{ data: { x: number; y: number; group?: string }[] }
```

### dual-axes

```
{ categories: string[]; series: { type: 'line' | 'column'; data: number[]; axisYTitle?: string }[]; axisXTitle?: string; style?: { startAtZero?: boolean } }
```

### histogram

```
{ data: number[]; binNumber?: number; axisXTitle?: string; axisYTitle?: string }
```

### boxplot / violin

同一 category 需多条数据以展示分布。

```
{ data: { category: string; value: number; group?: string }[]; axisXTitle?: string; axisYTitle?: string; style?: { startAtZero?: boolean } }
```

### radar

```
{ data: { name: string; value: number; group?: string }[] }
```

### funnel

```
{ data: { category: string; value: number; }[]; }
```

### waterfall

value 可为负数表示减少。palette 为色板数组，顺序为 [正值色, 负值色, 汇总色]。

```
{ data: { category: string; value: number }[]; axisXTitle?: string; axisYTitle?: string; style?: { palette?: string[] } }
```

### liquid

`percent` 范围 0~1。

```
{ percent: number; shape?: 'rect' | 'circle' | 'pin' | 'triangle' }
```

### word-cloud

```
{ data: { text: string; value: number; }[]; }
```

### venn

交集用逗号分隔集合标识：`sets: "A,B"`。`label` 用于显示图表上对应集合的名称

```
{ data: { sets: string | string[]; value: number; label?: string }[] }
```

### treemap

```
type TreeNode = { name: string; value: number; children?: TreeNode[] };
{ data: TreeNode[] }
```

### sankey

```
{ data: { source: string; target: string; value: number }[]; nodeAlign?: 'left' | 'center' | 'right' | 'justify' }
```

### flow-diagram / network-graph

`source`/`target` 引用节点的 `name`。

```
type GraphData = { nodes: { name: string }[]; edges: { source: string; target: string; name?: string }[] };

// flow-diagram
{ data: GraphData }

// network-graph
{ data: GraphData; layout?: 'force' | 'circular' | 'grid' | 'radial' | 'concentric' | 'dagre' }
```

### mindmap / indented-tree / organization-chart

```
type TreeData = { name: string; children?: TreeData[] };

// mindmap
{ data: TreeData; direction?: 'H' | 'LR' | 'RL' }

// indented-tree
{ data: TreeData; direction?: 'LR' | 'RL' | 'H' }

// organization-chart
type OrganizationChartData = {
  name: string;
  description?: string;
  children?: OrganizationChartData[];
};

{ data: OrganizationChartData }
```

mindmap 默认 `'H'`，indented-tree 默认 `'LR'`。

### fishbone-diagram

```
type FishboneNode = { name: string; children?: FishboneNode[] };
{ data: FishboneNode; style?: { texture?: 'rough' | 'default' } }
```

`texture: 'rough'` 为手绘风格。

### table

```
{ data: Record<string, string | number>[]; }
```

### summary

详见 [references/summary.md](references/summary.md)。

> **summary 是唯一不使用 `vis` 前缀的类型。** 直接以 Markdown 内容开头，不要写 `vis summary`。JSON 模式下使用 `{ "type": "summary", "content": "..." }` 无效，summary 必须以纯文本传入 `GPTVis.render()`。

## 最佳实践

1. 饼图分类不超过 5 个，超过建议合并为"其它"或改用条形图
2. 不要用饼图展示趋势，不要用折线图展示无序分类
3. 数值字段必须是数字类型，分类字段必须是文本类型
4. 连续数值的分布（如薪资、成绩、年龄）必须用直方图（histogram）
5. 多维数据字段映射：有两个分类维度时，x 轴维度写 `time`/`category`，另一个写 `group`
6. 语法模式优先用 Syntax 格式（流式友好）
7. 代码模式默认生成 HTML + CDN 方案（零安装），用户指定框架时再用 npm 方案
