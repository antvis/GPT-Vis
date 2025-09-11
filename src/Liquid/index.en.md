---
order: 12
group:
  order: 1
  title: Statistical Chart
demo: { cols: 2 }
toc: content
nav: { title: 'Component', order: 1 }
---

# Liquid Chart

## Code Examples

<code src="./demos/common">Basic Usage</code>

<code src="./demos/markdown">Using Markdown Protocol</code>

## Spec

```json
{
  "type": "liquid",
  "percent": 0.65
}
```

## API

### LiquidProps

| Property | Type                                                  | Required | Default   | Description        |
| -------- | ----------------------------------------------------- | -------- | --------- | ------------------ |
| percent  | number                                                | Yes      | -         | Percentage         |
| shape    | 'rect' &#124; 'circle' &#124; 'pin' &#124; 'triangle' | No       | 'circle'  | Shape of the chart |
| title    | string                                                | No       | -         | Chart title        |
| theme    | "default" &#124; "dark" &#124; "academy"              | No       | "default" | Chart theme        |
| style    | IStyle                                                | No       | -         | Chart style        |

### IStyle

| Property        | Type     | Required | Default | Description      |
| --------------- | -------- | -------- | ------- | ---------------- |
| backgroundColor | string   | No       | -       | Background color |
| palette         | string[] | No       | -       | Color mapping    |
| lineWidth       | number   | No       | -       | Stroke width     |
