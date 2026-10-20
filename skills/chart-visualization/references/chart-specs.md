# GPT-Vis 图表配置规范

本规范对应 `@antv/gpt-vis@1.0.2`。配置通过统一入口调用：

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

`container` 是唯一必填的构造参数；`theme` 默认 `default`（按浅色渲染），`wrapper` 默认 `false`，`locale` 默认 `en-US`。主题优先在构造函数中统一设置，避免不同图表配置类型对配置级主题的约束不一致。

## 按类别读取

只读取当前任务涉及的类别；一次生成多个类别的图表时，再读取对应的多个文件。

| 类别       | 图表类型                                                                                                                   | 规范                                         |
| ---------- | -------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| 趋势与比较 | `line`、`area`、`column`、`bar`、`dual-axes`                                                                               | [趋势与比较](specs/trend-comparison.md)      |
| 占比与阶段 | `pie`、`funnel`、`waterfall`、`liquid`                                                                                     | [占比与阶段](specs/composition-stage.md)     |
| 分布与关系 | `scatter`、`histogram`、`boxplot`、`violin`、`radar`、`venn`                                                               | [分布与关系](specs/distribution-relation.md) |
| 层级与流向 | `treemap`、`sankey`、`flow-diagram`、`network-graph`、`mindmap`、`indented-tree`、`organization-chart`、`fishbone-diagram` | [层级与流向](specs/hierarchy-flow.md)        |
| 文本与表格 | `word-cloud`、`table`                                                                                                      | [文本与表格](specs/text-table.md)            |

`summary` 接收 T8 文本而不是 JSON 对象，不属于上述 JSON spec；选择它时直接读取 [Summary 规范](summary.md)。
