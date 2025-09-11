---
order: 14
group:
  order: 1
  title: Statistical Charts
demo: { cols: 2 }
toc: content
nav: { title: 'Components', order: 1 }
---

# Sankey Diagram

## Code Examples

<code src="./demos/common">Basic Usage</code>

<code src="./demos/markdown">Using Markdown Protocol</code>

## Spec

```json
{
  "type": "sankey",
  "data": [
    { "source": "A", "target": "B", "value": 10 },
    { "source": "A", "target": "C", "value": 20 },
    { "source": "B", "target": "D", "value": 30 },
    { "source": "C", "target": "D", "value": 40 }
  ]
}
```

## API

### SankeyProps

| Property  | Type                                                   | Required | Default   | Description    |
| --------- | ------------------------------------------------------ | -------- | --------- | -------------- |
| data      | SankeyDataItem[]                                       | Yes      | -         | Data           |
| nodeAlign | 'left' &#124; 'center' &#124; 'right' &#124; 'justify' | No       | 'center'  | Node alignment |
| title     | string                                                 | No       | -         | Chart title    |
| theme     | "default" &#124; "dark" &#124; "academy"               | No       | "default" | Chart theme    |
| style     | IStyle                                                 | No       | -         | Chart style    |

### IStyle

| Property        | Type     | Required | Default | Description      |
| --------------- | -------- | -------- | ------- | ---------------- |
| backgroundColor | string   | No       | -       | Background color |
| palette         | string[] | No       | -       | Color mapping    |

### SankeyDataItem

| Property | Type   | Required | Default | Description      |
| -------- | ------ | -------- | ------- | ---------------- |
| source   | string | Yes      | -       | Source node name |
| target   | string | Yes      | -       | Target node name |
| value    | number | Yes      | -       | Flow value       |
