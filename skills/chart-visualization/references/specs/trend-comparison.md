# 趋势与比较

## `line`

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

## `area`

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

## `column` / `bar`

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

## `dual-axes`

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
