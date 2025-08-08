---
order: 2
toc: content
group:
  order: 1
  title: Statistical Charts
demo: { cols: 2 }
---

# Column Chart

## Code Demo

<code src="./demos/common">Standalone usage</code>

<code src="./demos/markdown">Using Markdown protocol</code>

<code src="./demos/group" description="Pass additional fields in data and set group to true">Grouped column chart</code>
<code src="./demos/stack" description="Pass additional fields in data and set stack to true">Stacked column chart</code>

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
| group      | boolean          | No       | -       | Whether to enable grouping, grouped column chart requires group field in data                           |
| stack      | boolean          | No       | -       | Whether to enable stacking, stacked column chart requires group field in data                           |
| title      | string           | No       | -       | Chart title                                                                                             |
| axisXTitle | string           | No       | -       | X-axis title                                                                                            |
| axisYTitle | string           | No       | -       | Y-axis title                                                                                            |
| ...        | -                | -        | -       | More properties, see [Ant Design Charts](https://ant-design-charts.antgroup.com/options/plots/overview) |

### ColumnDataItem

| Property | Type   | Required | Default | Description         |
| -------- | ------ | -------- | ------- | ------------------- |
| category | string | Yes      | -       | Data category name  |
| value    | number | Yes      | -       | Data category value |
| group    | number | No       | -       | Data grouping name  |
