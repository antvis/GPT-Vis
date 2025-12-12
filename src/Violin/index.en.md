---
order: 17
group:
  order: 1
  title: Statistical Charts
demo: { cols: 2 }
toc: content
nav: { title: 'Component', order: 1 }
---

# Violin Chart

## Code Examples

<code src="./demos/common">Basic Usage</code>

<code src="./demos/markdown">Using Markdown Protocol</code>

## Spec

```json
{
  "type": "violin",
  "data": [
    {
      "category": "A",
      "value": 10
    },
    {
      "category": "B",
      "value": 20
    }
  ]
}
```

## API

### ViolinProps

| Property   | Type                                     | Required | Default   | Description  |
| ---------- | ---------------------------------------- | -------- | --------- | ------------ |
| data       | ViolinDataItem[]                         | Yes      | -         | Data         |
| title      | string                                   | No       | -         | Chart title  |
| axisXTitle | string                                   | No       | -         | X-axis title |
| axisYTitle | string                                   | No       | -         | Y-axis title |
| title      | string                                   | No       | -         | Chart title  |
| theme      | "default" &#124; "dark" &#124; "academy" | No       | "default" | Chart theme  |
| style      | IStyle                                   | No       | -         | Chart style  |

### ViolinDataItem

| Property | Type   | Required | Default | Description         |
| -------- | ------ | -------- | ------- | ------------------- |
| category | string | Yes      | -       | Data category name  |
| value    | number | Yes      | -       | Data category value |
| group    | number | No       | -       | Data group name     |

### IStyle

| Property        | Type     | Required | Default | Description        |
| --------------- | -------- | -------- | ------- | ------------------ |
| backgroundColor | string   | No       | -       | Background color   |
| palette         | string[] | No       | -       | Color mapping      |
| startAtZero     | boolean  | No       | false   | Y-axis starts at 0 |
