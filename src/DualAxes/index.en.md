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

| Property   | Type                                     | Required | Default   | Description  |
| ---------- | ---------------------------------------- | -------- | --------- | ------------ |
| data       | DualAxesDataItem[]                       | Yes      | -         | Data         |
| title      | string                                   | No       | -         | Chart title  |
| axisXTitle | string                                   | No       | -         | X-axis title |
| axisYTitle | string                                   | No       | -         | Y-axis title |
| theme      | "default" &#124; "dark" &#124; "academy" | No       | "default" | Chart theme  |
| style      | IStyle                                   | No       | -         | Chart style  |

### IStyle

| Property        | Type     | Required | Default | Description      |
| --------------- | -------- | -------- | ------- | ---------------- |
| backgroundColor | string   | No       | -       | Background color |
| palette         | string[] | No       | -       | Color mapping    |
| lineWidth       | number   | No       | -       | Stroke width     |

### SeriesDataItem

| Property   | Type     | Required | Default | Description   |
| ---------- | -------- | -------- | ------- | ------------- |
| type       | string   | Yes      | -       | Subchart type |
| data       | number[] | Yes      | -       | Subchart data |
| axisYTitle | string   | No       | -       | Y-axis title  |
