---
order: 6
group:
  order: 1
  title: 统计图
demo: { cols: 2 }
toc: content
---

# Scatter 散点图

## 代码演示

<code src="./demos/common">单独使用</code>

<code src="./demos/markdown">使用 Markdown 协议</code>

## Spec

```json
{
  "type": "scatter",
  "data": [
    { "x": 10, "y": 15 },
    { "x": 20, "y": 25 },
    { "x": 30, "y": 35 },
    { "x": 40, "y": 45 }
  ]
}
```

## API

### ScatterProps

| 属性       | 类型              | 是否必传 | 默认值 | 说明                                                                                               |
| ---------- | ----------------- | -------- | ------ | -------------------------------------------------------------------------------------------------- |
| data       | ScatterDataItem[] | 是       | -      | 数据                                                                                               |
| title      | string            | 否       | -      | 图表的标题                                                                                         |
| axisXTitle | string            | 否       | -      | x 轴的标题                                                                                         |
| axisYTitle | string            | 否       | -      | y 轴的标题                                                                                         |
| ...        | -                 | -        | -      | 更多属性，详见 [Ant Design Charts ](https://ant-design-charts.antgroup.com/options/plots/overview) |

### ScatterDataItem

| 属性 | 类型   | 是否必传 | 默认值 | 说明             |
| ---- | ------ | -------- | ------ | ---------------- |
| x    | number | 是       | -      | X 轴上的数值变量 |
| y    | number | 是       | -      | Y 轴上的数值变量 |
