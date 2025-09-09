---
order: 6
group:
  order: 1
  title: Statistical Charts
demo: { cols: 2 }
toc: content
---

# Scatter Chart

## Code Demo

<code src="./demos/common">Standalone usage</code>

<code src="./demos/markdown">Using Markdown protocol</code>

<code src="./demos/group">Grouped scatter chart</code>

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

| Property   | Type                                     | Required | Default   | Description  |
| ---------- | ---------------------------------------- | -------- | --------- | ------------ |
| data       | ScatterDataItem[]                        | Yes      | -         | Data         |
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

### ScatterDataItem

| Property | Type   | Required | Default | Description                |
| -------- | ------ | -------- | ------- | -------------------------- |
| x        | number | Yes      | -       | Numeric variable on X-axis |
| y        | number | Yes      | -       | Numeric variable on Y-axis |
| group    | number | No       | -       | Data grouping name         |
