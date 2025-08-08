---
order: 10
group:
  order: 1
  title: Statistical Charts
demo: { cols: 2 }
toc: content
---

# Dual Axes Chart

## Code Examples

<code src="./demos/common">Basic Usage</code>

<code src="./demos/markdown">Markdown Protocol</code>
<code src="./demos/multiple">Multiple Axes</code>

## Spec

```json
{
  "type": "dual-axes",
  "categories": ["2018", "2019", "2020", "2021", "2022"],
  "title": "2018-2022 Sales and Profit Margin",
  "axisXTitle": "Year",
  "series": [
    {
      "type": "column",
      "data": [91.9, 99.1, 101.6, 114.4, 121],
      "axisYTitle": "Sales"
    },
    {
      "type": "line",
      "data": [0.055, 0.06, 0.062, 0.07, 0.075],
      "axisYTitle": "Profit Margin"
    }
  ]
}
```

## API

### DualAxesProps

| Property   | Type             | Required | Default | Description                                                                                             |
| ---------- | ---------------- | -------- | ------- | ------------------------------------------------------------------------------------------------------- |
| categories | string[]         | Yes      | -       | Data corresponding to the X-axis                                                                        |
| series     | SeriesDataItem[] | Yes      | -       | Data for subcharts                                                                                      |
| title      | string           | No       | -       | Chart title                                                                                             |
| axisXTitle | string           | No       | -       | X-axis title                                                                                            |
| ...        | -                | -        | -       | More properties, see [Ant Design Charts](https://ant-design-charts.antgroup.com/options/plots/overview) |

### SeriesDataItem

| Property   | Type     | Required | Default | Description   |
| ---------- | -------- | -------- | ------- | ------------- |
| type       | string   | Yes      | -       | Subchart type |
| data       | number[] | Yes      | -       | Subchart data |
| axisYTitle | string   | No       | -       | Y-axis title  |
