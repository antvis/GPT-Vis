---
order: 11
group:
  order: 1
  title: Statistical Charts
demo: { cols: 2 }
toc: content
---

# Radar Chart

## Code Demo

<code src="./demos/common">Standalone usage</code>

<code src="./demos/markdown">Using Markdown protocol</code>
<code src="./demos/category" description="Pass group field in data">Grouped radar chart</code>

## Spec

```json
{
  "type": "radar",
  "data": [
    { "name": "Communication", "value": 2 },
    { "name": "Collaboration", "value": 3 },
    { "name": "Leadership", "value": 2 },
    { "name": "Learning", "value": 5 },
    { "name": "Innovation", "value": 6 },
    { "name": "Technical", "value": 9 }
  ]
}
```

## API

### RadarProps

| Property | Type            | Required | Default | Description                                                                                             |
| -------- | --------------- | -------- | ------- | ------------------------------------------------------------------------------------------------------- |
| data     | RadarDataItem[] | Yes      | -       | Data                                                                                                    |
| title    | string          | No       | -       | Chart title                                                                                             |
| ...      | -               | -        | -       | More properties, see [Ant Design Charts](https://ant-design-charts.antgroup.com/options/plots/overview) |

### RadarDataItem

| Property | Type   | Required | Default | Description        |
| -------- | ------ | -------- | ------- | ------------------ |
| name     | string | Yes      | -       | Data category name |
| value    | number | Yes      | -       | Data value         |
| group    | string | No       | -       | Data grouping name |
