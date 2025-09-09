---
order: 8
group:
  order: 1
  title: Statistical Charts
demo: { cols: 2 }
toc: content
---

# Treemap

## Code Examples

<code src="./demos/common">Basic Usage</code>

<code src="./demos/markdown">Markdown Protocol</code>

## Spec

```json
{
  "type": "treemap",
  "data": [
    {
      "name": "<Category 1>",
      "value": <number>,
      "children": [
        { "name": "<Subcategory>", "value": <number> },
        { "name": "<Subcategory>", "value": <number> },
        { "name": "<Subcategory>", "value": <number> }
      ]
    },
    {
      "name": "<Category 2>",
      "value": <number>,
      "children": [
        { "name": "<Subcategory>", "value": <number> },
        { "name": "<Subcategory>", "value": <number> }
      ]
    }
  ]
}
```

## API

### TreemapProps

| Property | Type                                     | Required | Default   | Description |
| -------- | ---------------------------------------- | -------- | --------- | ----------- |
| data     | TreemapDataItem[]                        | Yes      | -         | Data        |
| title    | string                                   | No       | -         | Chart title |
| theme    | "default" &#124; "dark" &#124; "academy" | No       | "default" | Chart theme |
| style    | IStyle                                   | No       | -         | Chart style |

### IStyle

| Property        | Type     | Required | Default | Description      |
| --------------- | -------- | -------- | ------- | ---------------- |
| backgroundColor | string   | No       | -       | Background color |
| palette         | string[] | No       | -       | Color mapping    |

### TreeNode

| Property | Type       | Required | Default | Description      |
| -------- | ---------- | -------- | ------- | ---------------- |
| name     | string     | Yes      | -       | Category name    |
| value    | number     | Yes      | -       | Category value   |
| children | TreeNode[] | No       | -       | Subcategory list |
