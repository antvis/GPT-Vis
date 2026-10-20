# GPT-Vis 图表配置规范

本规范对应 `@antv/gpt-vis@1.0.2` 的 `ai` 分支。配置通过统一入口调用：

```ts
gptVis.render(config);
```

通过 `GPTVis.render()` 渲染时，除 `summary` 外都必须提供准确的 `type`。以下使用 TypeScript 形式描述 JSON 结构；实际输出必须是严格 JSON。

## 通用字段

```ts
type VisualizationTheme = 'default' | 'light' | 'dark' | 'academy';

type VisualizationOptions = {
  container: string | HTMLElement;
  width?: number;
  height?: number;
  theme?: VisualizationTheme;
  wrapper?: boolean;
  locale?: string;
};

type CommonStyle = {
  backgroundColor?: string;
  palette?: string[];
};

type CommonConfig = {
  type: string;
  title?: string;
  style?: CommonStyle;
};
```

`container` 是唯一必填的构造参数；`theme` 默认 `default`（按浅色渲染），`wrapper` 默认 `false`，`locale` 默认 `en-US`。主题优先在构造函数中统一设置，避免不同图表配置类型对配置级主题的约束不一致。`summary` 使用 T8 文本，不使用本页 JSON spec。

## 趋势与比较

### `line`

```ts
{
  type: 'line';
  data: { time: string | number; value: number; group?: string }[];
  axisXTitle?: string;
  axisYTitle?: string;
  style?: CommonStyle & { lineWidth?: number };
}
```

同一 `group` 形成一条线；没有系列维度时省略 `group`。

### `area`

```ts
{
  type: 'area';
  data: { time: string | number; value: number; group?: string }[];
  stack?: boolean;
  axisXTitle?: string;
  axisYTitle?: string;
  style?: CommonStyle & { lineWidth?: number };
}
```

多系列累计趋势设置 `stack: true`。

### `column` / `bar`

```ts
{
  type: 'column' | 'bar';
  data: { category: string; value: number; group?: string }[];
  group?: boolean;
  stack?: boolean;
  axisXTitle?: string;
  axisYTitle?: string;
}
```

- 多系列并排比较：每条数据包含 `group`，并设置 `group: true`。
- 多系列累计构成：每条数据包含 `group`，并设置 `stack: true`。
- 不要同时设置 `group: true` 和 `stack: true`。
- 只有 `group` 数据字段而没有布局参数时，各系列会占用同一位置并相互遮挡。

### `dual-axes`

```ts
{
  type: 'dual-axes';
  categories: string[];
  series: {
    type: 'line' | 'column';
    data: number[];
    axisYTitle?: string;
  }[];
  axisXTitle?: string;
  style?: CommonStyle & { startAtZero?: boolean };
}
```

每个 `series[].data.length` 必须等于 `categories.length`。适合不同量纲，不用于仅仅颜色不同的同量纲系列。

## 占比与阶段

### `pie`

```ts
{
  type: 'pie';
  data: { category: string; value: number }[];
  innerRadius?: number;
}
```

`value` 使用数值权重，不使用带 `%` 的字符串。设置 `innerRadius` 可生成环图，例如 `0.6`。

### `funnel`

```ts
{
  type: 'funnel';
  data: { category: string; value: number }[];
  conversionRateLabel?: string;
}
```

数据顺序就是流程顺序，通常应从上一步到下一步排列。

### `waterfall`

```ts
{
  type: 'waterfall';
  data: {
    category: string;
    value?: number;
    isIntermediateTotal?: boolean;
    isTotal?: boolean;
  }[];
  axisXTitle?: string;
  axisYTitle?: string;
  style?: CommonStyle & { palette?: string[] };
}
```

普通增减项通过正负 `value` 表示；汇总项设置 `isIntermediateTotal` 或 `isTotal`。瀑布图色板顺序为 `[正值色, 负值色, 汇总色]`。

### `liquid`

```ts
{
  type: 'liquid';
  percent: number;
  shape?: 'rect' | 'circle' | 'pin' | 'triangle';
}
```

`percent` 必须在 `0` 到 `1` 之间。

## 分布与关系

### `scatter`

```ts
{
  type: 'scatter';
  data: { x: number; y: number; group?: string }[];
  axisXTitle?: string;
  axisYTitle?: string;
}
```

`group` 用于区分点的类别系列。

### `histogram`

```ts
{
  type: 'histogram';
  data: number[];
  binNumber?: number;
  axisXTitle?: string;
  axisYTitle?: string;
}
```

传入原始连续样本，不要传入已经聚合的 `{区间, 频数}` 数据。

### `boxplot` / `violin`

```ts
{
  type: 'boxplot' | 'violin';
  data: { category: string; value: number; group?: string }[];
  axisXTitle?: string;
  axisYTitle?: string;
  style?: CommonStyle & { startAtZero?: boolean };
}
```

每个 `category` 应包含多条原始样本；`group` 用于同一分类下进一步分组。

### `radar`

```ts
{
  type: 'radar';
  data: { name: string; value: number; group?: string }[];
  align?: boolean;
  style?: CommonStyle & { lineWidth?: number };
}
```

同一 `group` 表示一个对比对象。`align: true` 让各维度共享同一最大值，适合比较绝对量级。

### `venn`

```ts
{
  type: 'venn';
  data: {
    sets: string | string[];
    value: number;
    label?: string;
  }[];
}
```

JSON 优先使用数组表达交集，例如 `"sets": ["A", "B"]`。

## 层级与流向

### `treemap`

```ts
type TreemapNode = {
  name: string;
  value: number;
  children?: TreemapNode[];
};

{ type: 'treemap'; data: TreemapNode[] }
```

父节点和叶节点均可提供 `value`；同一层级的值应使用一致单位。

### `sankey`

```ts
{
  type: 'sankey';
  data: { source: string; target: string; value: number }[];
  nodeAlign?: 'left' | 'center' | 'right' | 'justify';
}
```

每条边必须包含权重 `value`。

### `flow-diagram` / `network-graph`

```ts
type GraphData = {
  nodes: { name: string }[];
  edges: { source: string; target: string; name?: string }[];
};

{ type: 'flow-diagram'; data: GraphData }

{
  type: 'network-graph';
  data: GraphData;
  layout?: 'force' | 'circular' | 'grid' | 'radial' | 'concentric' | 'dagre';
}
```

`source` 和 `target` 必须引用 `nodes[].name`。流程依赖优先使用 `flow-diagram`；一般关系网络使用 `network-graph`。

### `mindmap`

```ts
type MindmapNode = {
  name: string;
  children?: MindmapNode[];
};

{
  type: 'mindmap';
  data: MindmapNode;
  direction?: 'H' | 'LR' | 'RL';
}
```

默认方向为 `H`。

### `indented-tree`

```ts
type IndentedTreeNode = {
  name: string;
  children?: IndentedTreeNode[];
};

{
  type: 'indented-tree';
  data: IndentedTreeNode;
  direction?: 'LR' | 'RL' | 'H';
}
```

默认方向为 `LR`。

### `organization-chart`

```ts
type OrganizationNode = {
  name: string;
  description?: string;
  children?: OrganizationNode[];
};

{
  type: 'organization-chart';
  data: OrganizationNode;
}
```

`description` 适合职位、部门或职责说明。

### `fishbone-diagram`

```ts
type FishboneNode = {
  name: string;
  children?: FishboneNode[];
};

{
  type: 'fishbone-diagram';
  data: FishboneNode;
  style?: CommonStyle & { texture?: 'rough' | 'default' };
}
```

根节点表示待分析的问题，一级子节点表示主要原因类别。

## 文本与表格

### `word-cloud`

```ts
{
  type: 'word-cloud';
  data: { text: string; value: number }[];
  locale?: string;
}
```

只保留非空文本和正数权重；当前实现最多展示权重最高的 50 个词。

### `table`

```ts
{
  type: 'table';
  data: Record<string, unknown>[];
  title?: string;
  theme?: 'default' | 'dark';
}
```

各行应使用一致字段。单元格优先使用字符串或数字等标量值。

### `summary`

`summary` 不接收上述 JSON 对象。直接向 `render()` 传入 T8 文本，并先读取 [Summary 规范](summary.md)。

## 样式扩展

仅使用当前 `ai` 分支已定义的扩展：

| 图表                             | 额外字段                                 |
| -------------------------------- | ---------------------------------------- |
| `line`、`area`、`radar`          | `style.lineWidth?: number`               |
| `dual-axes`、`boxplot`、`violin` | `style.startAtZero?: boolean`            |
| `fishbone-diagram`               | `style.texture?: 'rough' \| 'default'`   |
| `waterfall`                      | `style.palette` 依次表示正、负、汇总颜色 |

不要使用其他开发分支中新增但尚未进入 `ai` 分支的主题 token、组件样式或 mark 配置。
