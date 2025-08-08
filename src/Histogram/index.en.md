---
order: 5
group:
  order: 1
  title: Statistical Charts
demo: { cols: 2 }
toc: content
---

# Histogram

## Code Examples

<code src="./demos/common">Basic Usage</code>

<code src="./demos/markdown">Markdown Protocol</code>

## Spec

```json
{
  "type": "histogram",
  "data": [78, 88, 60, 100, 95],
  "binNumber": 4
}
```

## API

### HistogramProps

| Property   | Type     | Required | Default | Description                                                                                             |
| ---------- | -------- | -------- | ------- | ------------------------------------------------------------------------------------------------------- |
| data       | number[] | Yes      | -       | Data                                                                                                    |
| binNumber  | number   | No       | -       | Number of bins; defines the number of intervals in the histogram                                        |
| title      | string   | No       | -       | Chart title                                                                                             |
| axisXTitle | string   | No       | -       | X-axis title                                                                                            |
| axisYTitle | string   | No       | -       | Y-axis title                                                                                            |
| ...        | -        | -        | -       | More properties, see [Ant Design Charts](https://ant-design-charts.antgroup.com/options/plots/overview) |
