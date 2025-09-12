---
order: 15
group:
  order: 1
  title: Statistical Charts
demo: { cols: 2 }
toc: content
nav: { title: 'Components', order: 1 }
---

# Venn Diagram

## Code Examples

<code src="./demos/common">Basic Usage</code>

<code src="./demos/markdown">Using Markdown Protocol</code>

## Spec

```json
{
  "type": "venn",
  "data": [
    { "sets": ["A"], "value": 12 },
    { "sets": ["B"], "value": 12 },
    { "sets": ["C"], "value": 12 },
    { "sets": ["A", "B"], "value": 2 },
    { "sets": ["A", "C"], "value": 2 },
    { "sets": ["B", "C"], "value": 2 },
    { "sets": ["A", "B", "C"], "value": 1 }
  ]
}
```

## API

### LiquidProps

| Property | Type                                     | Required | Default   | Description |
| -------- | ---------------------------------------- | -------- | --------- | ----------- |
| data     | VennDataItem[]                           | Yes      | -         | Data        |
| title    | string                                   | No       | -         | Chart title |
| theme    | "default" &#124; "dark" &#124; "academy" | No       | "default" | Chart theme |
| style    | IStyle                                   | No       | -         | Chart style |

### VennDataItem

| Property | Type     | Required | Default | Description      |
| -------- | -------- | -------- | ------- | ---------------- |
| sets     | string[] | Yes      | -       | Venn chart sets  |
| value    | number   | Yes      | -       | Venn chart value |
| label    | string   | No       | -       | Venn chart label |

### IStyle

| Property        | Type     | Required | Default | Description      |
| --------------- | -------- | -------- | ------- | ---------------- |
| backgroundColor | string   | No       | -       | Background color |
| palette         | string[] | No       | -       | Color mapping    |
