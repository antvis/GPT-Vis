---
order: 13
group:
  order: 1
  title: Statistical Charts
demo: { cols: 2 }
toc: content
---

# Funnel Chart

## Code Demo

<code src="./demos/common">Basic Usage</code>

<code src="./demos/markdown">Markdown Protocol</code>

## Spec

```json
{
  "type": "funnel",
  "data": [
    { "category": "Visit Website", "value": 50000 },
    { "category": "Add to Cart", "value": 35000 },
    { "category": "Create Order", "value": 25000 },
    { "category": "Pay Order", "value": 15000 },
    { "category": "Complete Transaction", "value": 8000 }
  ]
}
```

## API

### FunnelProps

| Property | Type                                     | Required | Default   | Description |
| -------- | ---------------------------------------- | -------- | --------- | ----------- |
| data     | FunnelDataItem[]                         | Yes      | -         | Data        |
| title    | string                                   | No       | -         | Chart title |
| theme    | "default" &#124; "dark" &#124; "academy" | No       | "default" | Chart theme |
| style    | IStyle                                   | No       | -         | Chart style |

### IStyle

| Property        | Type     | Required | Default | Description      |
| --------------- | -------- | -------- | ------- | ---------------- |
| backgroundColor | string   | No       | -       | Background color |
| palette         | string[] | No       | -       | Color mapping    |

### FunnelDataItem

| Property | Type   | Required | Default | Description        |
| -------- | ------ | -------- | ------- | ------------------ |
| category | string | Yes      | -       | Data category name |
| value    | number | Yes      | -       | Data value         |
