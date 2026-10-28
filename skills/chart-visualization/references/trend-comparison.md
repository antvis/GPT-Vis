# 趋势与比较

下列配置继承主 Skill 的通用字段，代码块只列出各图表的数据和特有参数。

## `line`

```ts
{
  type: 'line';
  data: { time: string | number; value: number; group?: string }[];
  axisXTitle?: string;
  axisYTitle?: string;
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
  label?: boolean;
  axisXTitle?: string;
  axisYTitle?: string;
}
```

- 多系列并排比较：每条数据包含 `group`，并设置 `group: true`。
- 多系列累计构成：每条数据包含 `group`，并设置 `stack: true`。
- 不要同时设置 `group: true` 和 `stack: true`。
- 数值标签默认显示；设置 `label: false` 可关闭，主题中的标签样式不会覆盖该选择。
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
  style?: ThemeStyle & { startAtZero?: boolean };
}
```

每个 `series[].data.length` 必须等于 `categories.length`。适合不同量纲，不用于仅仅颜色不同的同量纲系列。

`style.startAtZero` 仅用于上述支持它的图表的单图配置，控制数值轴是否从零开始；不属于 ThemeSpec 的视觉样式字段。
