---
order: 4
group:
  order: 1
  title: Statistical Charts
toc: content
demo: { cols: 2 }
---

# Bar Chart

## Code Examples

<code src="./demos/common">Basic Usage</code>

<code src="./demos/markdown">Markdown Protocol</code>

<code src="./demos/group" description="Pass an extra field in data and set group to true">Grouped Bar Chart</code>
<code src="./demos/stack" description="Pass an extra field in data and set stack to true">Stacked Bar Chart</code>

## Spec

```json
{
  "type": "bar",
  "data": [
    { "category": "<Category 1>", "value": 10 },
    { "category": "<Category 2>", "value": 20 },
    { "category": "<Category 3>", "value": 30 }
  ]
}
```

## API

### BarProps

| Property   | Type                                     | Required | Default   | Description  |
| ---------- | ---------------------------------------- | -------- | --------- | ------------ |
| data       | BarDataItem[]                            | Yes      | -         | Data         |
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

### BarDataItem

| Property | Type   | Required | Default | Description    |
| -------- | ------ | -------- | ------- | -------------- |
| category | string | Yes      | -       | Category name  |
| value    | number | Yes      | -       | Category value |
| group    | string | No       | -       | Group name     |
