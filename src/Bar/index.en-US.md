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
    { "category": "<Category 1>", "value": <number> },
    { "category": "<Category 2>", "value": <number> },
    { "category": "<Category 3>", "value": <number> }
  ]
}
```

## API

### BarProps

| Property   | Type          | Required | Default | Description                                                                                             |
| ---------- | ------------- | -------- | ------- | ------------------------------------------------------------------------------------------------------- |
| data       | BarDataItem[] | Yes      | -       | Data                                                                                                    |
| title      | string        | No       | -       | Chart title                                                                                             |
| group      | boolean       | No       | -       | Enable grouping. Grouped bar chart requires the group field in data                                     |
| stack      | boolean       | No       | -       | Enable stacking. Stacked bar chart requires the group field in data                                     |
| axisXTitle | string        | No       | -       | X-axis title                                                                                            |
| axisYTitle | string        | No       | -       | Y-axis title                                                                                            |
| ...        | -             | -        | -       | More properties, see [Ant Design Charts](https://ant-design-charts.antgroup.com/options/plots/overview) |

### BarDataItem

| Property | Type   | Required | Default | Description    |
| -------- | ------ | -------- | ------- | -------------- |
| category | string | Yes      | -       | Category name  |
| value    | number | Yes      | -       | Category value |
| group    | string | No       | -       | Group name     |
