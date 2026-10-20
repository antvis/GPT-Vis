# 分布与关系

## `scatter`

```ts
{
  type: 'scatter';
  data: { x: number; y: number; group?: string }[];
  axisXTitle?: string;
  axisYTitle?: string;
}
```

`group` 用于区分点的类别系列。

## `histogram`

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

## `boxplot` / `violin`

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

## `radar`

```ts
{
  type: 'radar';
  data: { name: string; value: number; group?: string }[];
  align?: boolean;
  style?: CommonStyle & { lineWidth?: number };
}
```

同一 `group` 表示一个对比对象。`align: true` 让各维度共享同一最大值，适合比较绝对量级。

## `venn`

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
