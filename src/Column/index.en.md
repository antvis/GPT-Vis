---
order: 2
toc: content
group:
  order: 1
  title: Statistical Charts
demo: { cols: 2 }
---

# Column Chart

## Code Demo

<code src="./demos/common">Standalone usage</code>

<code src="./demos/markdown">Using Markdown protocol</code>

<code src="./demos/group" description="Pass additional fields in data and set group to true">Grouped column chart</code>
<code src="./demos/stack" description="Pass additional fields in data and set stack to true">Stacked column chart</code>

## Spec

```json
{
  "type": "column",
  "data": [
    { "category": "Category 1", "value": 91.9 },
    { "category": "Category 2", "value": 99.1 },
    { "category": "Category 3", "value": 101.6 }
  ]
}
```

## API

### ColumnProps

| Property   | Type                                     | Required | Default   | Description  |
| ---------- | ---------------------------------------- | -------- | --------- | ------------ |
| data       | ColumnDataItem[]                         | Yes      | -         | Data         |
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

### ColumnDataItem

| Property | Type   | Required | Default | Description         |
| -------- | ------ | -------- | ------- | ------------------- |
| category | string | Yes      | -       | Data category name  |
| value    | number | Yes      | -       | Data category value |
| group    | number | No       | -       | Data grouping name  |
