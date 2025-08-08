---
order: 11
group:
  order: 1
  title: Statistical Charts
demo: { cols: 2 }
toc: content
---

# Radar Chart

## Code Examples

<code src="./demos/common">Basic Usage</code>

<code src="./demos/markdown">Markdown Protocol</code>
<code src="./demos/category" description="Pass the group field in data">Grouped Radar Chart</code>

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

| Property | Type   | Required | Default | Description   |
| -------- | ------ | -------- | ------- | ------------- |
| name     | string | Yes      | -       | Category name |
| value    | number | Yes      | -       | Value         |
| group    | string | No       | -       | Group name    |
