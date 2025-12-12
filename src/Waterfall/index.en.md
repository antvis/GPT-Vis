---
order: 18
group:
  order: 1
  title: Statistical Charts
demo: { cols: 2 }
toc: content
nav: { title: 'Components', order: 1 }
---

# Waterfall Chart

## Code Examples

<code src="./demos/common">Basic Usage</code>

<code src="./demos/markdown">Markdown Protocol</code>

## Spec

```json
{
  "type": "waterfall",
  "data": [
    { "category": "Q1", "value": 6200000 },
    { "category": "Q2", "value": -2600000 },
    { "category": "Q3", "value": 4100000 },
    { "category": "Q4", "value": 3700000 },
    { "category": "Total", "value": 11400000, "isTotal": true }
  ]
}
```

## API

### WaterfallProps

| Property      | Type                                     | Required | Default   | Description             |
| ------------- | ---------------------------------------- | -------- | --------- | ----------------------- |
| data          | WaterfallDataItem[]                      | Yes      | -         | Data                    |
| title         | string                                   | No       | -         | Chart title             |
| axisXTitle    | string                                   | No       | -         | X-axis title            |
| axisYTitle    | string                                   | No       | -         | Y-axis title            |
| theme         | "default" &#124; "dark" &#124; "academy" | No       | "default" | Chart theme             |
| style         | IStyle                                   | No       | -         | Chart style             |
| positiveColor | string                                   | No       | "#FF4D4F" | Color for positive bars |
| negativeColor | string                                   | No       | "#2EBB59" | Color for negative bars |
| totalColor    | string                                   | No       | "#1783FF" | Color for total bars    |

### WaterfallDataItem

| Property            | Type    | Required | Default | Description                                                                                             |
| ------------------- | ------- | -------- | ------- | ------------------------------------------------------------------------------------------------------- |
| category            | string  | Yes      | -       | Category name (x-axis)                                                                                  |
| value               | number  | No       | -       | Value (y-axis), positive values indicate growth, negative values indicate decrease                      |
| isTotal             | boolean | No       | false   | Whether it is a total item, total items will be displayed in a special color                            |
| isIntermediateTotal | boolean | No       | false   | Whether it is an intermediate total item, intermediate total items will be displayed in a special color |

### IStyle

| Property        | Type   | Required | Default | Description      |
| --------------- | ------ | -------- | ------- | ---------------- |
| backgroundColor | string | No       | -       | Background color |
