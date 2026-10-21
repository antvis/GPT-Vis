# 占比与阶段

## `pie`

```ts
{
  type: 'pie';
  data: { category: string; value: number }[];
  innerRadius?: number;
}
```

`value` 使用数值权重，不使用带 `%` 的字符串。设置 `innerRadius` 可生成环图，例如 `0.6`。

## `funnel`

```ts
{
  type: 'funnel';
  data: { category: string; value: number }[];
  conversionRateLabel?: string;
}
```

数据顺序就是流程顺序，通常应从上一步到下一步排列。

## `waterfall`

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

## `liquid`

```ts
{
  type: 'liquid';
  percent: number;
  shape?: 'rect' | 'circle' | 'pin' | 'triangle';
}
```

`percent` 必须在 `0` 到 `1` 之间。
