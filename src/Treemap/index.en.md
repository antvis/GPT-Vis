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
      "name": "Category 1",
      "value": 500,
      "children": [
        { "name": "Subcategory 1", "value": 100 },
        { "name": "Subcategory 2", "value": 200 },
        { "name": "Subcategory 3", "value": 200 }
      ]
    },
    {
      "name": "Category 2",
      "value": 1000,
      "children": [
        { "name": "Subcategory 4", "value": 500 },
        { "name": "Subcategory 5", "value": 500 }
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
