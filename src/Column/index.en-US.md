---
order: 2
toc: content
group:
  order: 1
  title: Statistical Charts
demo: { cols: 2 }
---

# Column Chart

## Code Examples

<code src="./demos/common">Basic Usage</code>

<code src="./demos/markdown">Markdown Protocol</code>

<code src="./demos/group" description="Pass an extra field in data and set group to true">Grouped Column Chart</code>
<code src="./demos/stack" description="Pass an extra field in data and set stack to true">Stacked Column Chart</code>

## Spec

```json
{
  "type": "column",
  "data": [
    { "category": "Category 1", "value": 91.9 },
    { "category": "Category 2", "value": 99.1 },
    { "category": "Category 3", "value": 101.6 }
  ]
}
```

## API

### ColumnProps

| Property   | Type             | Required | Default | Description                                                                                             |
| ---------- | ---------------- | -------- | ------- | ------------------------------------------------------------------------------------------------------- |
| data       | ColumnDataItem[] | Yes      | -       | Data                                                                                                    |
| group      | boolean          | No       | -       | Enable grouping. Grouped column chart requires the group field in data                                  |
| stack      | boolean          | No       | -       | Enable stacking. Stacked column chart requires the group field in data                                  |
| title      | string           | No       | -       | Chart title                                                                                             |
| axisXTitle | string           | No       | -       | X-axis title                                                                                            |
| axisYTitle | string           | No       | -       | Y-axis title                                                                                            |
| ...        | -                | -        | -       | More properties, see [Ant Design Charts](https://ant-design-charts.antgroup.com/options/plots/overview) |

### ColumnDataItem

| Property | Type   | Required | Default | Description    |
| -------- | ------ | -------- | ------- | -------------- |
| category | string | Yes      | -       | Category name  |
| value    | number | Yes      | -       | Category value |
| group    | string | No       | -       | Group name     |
