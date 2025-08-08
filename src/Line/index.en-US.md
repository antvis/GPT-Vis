---
order: 1
group:
  order: 1
  title: Statistical Charts
toc: content
demo: { cols: 2 }
---

# Line Chart

## Code Examples

<code src="./demos/common">Basic Usage</code>

<code src="./demos/markdown">Markdown Protocol</code>
<code src="./demos/category" description="Pass the group field in data">Multi-Line Chart</code>

## Spec

```json
{
  "type": "line",
  "data": [
    { "time": 2018, "value": 91.9 },
    { "time": 2019, "value": 99.1 },
    { "time": 2020, "value": 101.6 },
    { "time": 2021, "value": 114.4 },
    { "time": 2022, "value": 121 }
  ]
}
```

## API

### LineProps

| Property   | Type           | Required | Default | Description                                                                                             |
| ---------- | -------------- | -------- | ------- | ------------------------------------------------------------------------------------------------------- |
| data       | LineDataItem[] | Yes      | -       | Data                                                                                                    |
| title      | string         | No       | -       | Chart title                                                                                             |
| axisXTitle | string         | No       | -       | X-axis title                                                                                            |
| axisYTitle | string         | No       | -       | Y-axis title                                                                                            |
| ...        | -              | -        | -       | More properties, see [Ant Design Charts](https://ant-design-charts.antgroup.com/options/plots/overview) |

### LineDataItem

| Property | Type   | Required | Default | Description        |
| -------- | ------ | -------- | ------- | ------------------ |
| time     | string | Yes      | -       | Time sequence name |
| value    | number | Yes      | -       | Value              |
| group    | string | No       | -       | Group name         |
