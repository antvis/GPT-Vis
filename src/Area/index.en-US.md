---
order: 4
group:
  order: 1
  title: Statistical Charts
demo: { cols: 2 }
toc: content
nav: { title: 'Components', order: 1 }
---

# Area Chart

## Code Examples

<code src="./demos/common">Basic Usage</code>

<code src="./demos/markdown">Markdown Protocol</code>
<code src="./demos/stack" description="Pass an extra field in data and set stack to true">Stacked Area Chart</code>

## Spec

```json
{
  "type": "area",
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

### AreaProps

| Property   | Type           | Required | Default | Description                                                                                             |
| ---------- | -------------- | -------- | ------- | ------------------------------------------------------------------------------------------------------- |
| data       | AreaDataItem[] | Yes      | -       | Data                                                                                                    |
| stack      | boolean        | No       | -       | Enable stacking. Stacked area chart requires the group field in data                                    |
| title      | string         | No       | -       | Chart title                                                                                             |
| axisXTitle | string         | No       | -       | X-axis title                                                                                            |
| axisYTitle | string         | No       | -       | Y-axis title                                                                                            |
| ...        | -              | -        | -       | More properties, see [Ant Design Charts](https://ant-design-charts.antgroup.com/options/plots/overview) |

### AreaDataItem

| Property | Type   | Required | Default | Description        |
| -------- | ------ | -------- | ------- | ------------------ |
| time     | string | Yes      | -       | Time sequence name |
| value    | number | Yes      | -       | Value              |
| group    | string | No       | -       | Group name         |
