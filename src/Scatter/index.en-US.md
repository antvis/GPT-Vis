---
order: 6
group:
  order: 1
  title: Statistical Charts
demo: { cols: 2 }
toc: content
---

# Scatter Plot

## Code Examples

<code src="./demos/common">Basic Usage</code>

<code src="./demos/markdown">Markdown Protocol</code>

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

| Property   | Type              | Required | Default | Description                                                                                             |
| ---------- | ----------------- | -------- | ------- | ------------------------------------------------------------------------------------------------------- |
| data       | ScatterDataItem[] | Yes      | -       | Data                                                                                                    |
| title      | string            | No       | -       | Chart title                                                                                             |
| axisXTitle | string            | No       | -       | X-axis title                                                                                            |
| axisYTitle | string            | No       | -       | Y-axis title                                                                                            |
| ...        | -                 | -        | -       | More properties, see [Ant Design Charts](https://ant-design-charts.antgroup.com/options/plots/overview) |

### ScatterDataItem

| Property | Type   | Required | Default | Description                |
| -------- | ------ | -------- | ------- | -------------------------- |
| x        | number | Yes      | -       | Numeric variable on X-axis |
| y        | number | Yes      | -       | Numeric variable on Y-axis |
