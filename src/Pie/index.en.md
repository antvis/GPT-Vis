---
order: 3
group:
  order: 1
  title: Statistical Charts
toc: content
---

# Pie Chart

## Code Examples

<code src="./demos/common">Basic Usage</code>
<code src="./demos/markdown" description="Add innerRadius to change inner radius; set to donut chart">Markdown Protocol</code>

## Spec

```json
{
  "type": "pie",
  "data": [
    { "category": "Category 1", "value": 27 },
    { "category": "Category 2", "value": 25 },
    { "category": "Category 3", "value": 18 },
    { "category": "Category 4", "value": 15 },
    { "category": "Category 5", "value": 10 },
    { "category": "Others", "value": 5 }
  ]
}
```

## API

### PieProps

| Property    | Type                             | Required | Default   | Description                               |
| ----------- | -------------------------------- | -------- | --------- | ----------------------------------------- |
| data        | PieDataItem[]                    | Yes      | -         | Pie chart data                            |
| title       | string                           | No       | -         | Chart title                               |
| innerRadius | number                           | No       | -         | Inner radius; set to create a donut chart |
| theme       | 'default' \| 'dark' \| 'academy' | No       | "default" | Chart theme                               |
| style       | IStyle                           | No       | -         | Chart style                               |

### IStyle

| Property        | Type     | Required | Default | Description      |
| --------------- | -------- | -------- | ------- | ---------------- |
| backgroundColor | string   | No       | -       | Background color |
| palette         | string[] | No       | -       | Color mapping    |
| lineWidth       | number   | No       | -       | Stroke width     |

### PieDataItem

| Property | Type   | Required | Default | Description |
| -------- | ------ | -------- | ------- | ----------- |
| category | string | Yes      | -       | Slice name  |
| value    | number | Yes      | -       | Slice value |
