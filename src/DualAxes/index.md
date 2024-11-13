---
order: 10
group:
  order: 1
  title: 统计图
demo: { cols: 2 }
---

# DualAxes 双轴图

## 代码演示

<code src="./demos/common">单独使用</code>

<code src="./demos/markdown">使用 Markdown 协议</code>
<code src="./demos/multiple" description="在children中传入多个图表">多轴图</code>

## Spec

```json
{
  "type": "dual-axes",
  "children": [
    {
      "type": "column",
      "data": [
        { "category": "2018", "value": 91.9 },
        { "category": "2019", "value": 99.1 },
        { "category": "2020", "value": 101.6 },
        { "category": "2021", "value": 114.4 },
        { "category": "2022", "value": 121 }
      ]
    },
    {
      "type": "line",
      "data": [
        { "time": "2018", "value": 0.055 },
        { "time": "2019", "value": 0.06 },
        { "time": "2020", "value": 0.062 },
        { "time": "2021", "value": 0.07 },
        { "time": "2022", "value": 0.075 }
      ]
    }
  ]
}
```

## API

### DualAxesProps

| 属性     | 类型                         | 是否必传 | 默认值 | 说明                                                                                               |
| -------- | ---------------------------- | -------- | ------ | -------------------------------------------------------------------------------------------------- |
| children | (ColumnProps \| LineProps)[] | 是       | -      | 图表详细组合，可以是不同图表的组合，需要确保 data 的 x 相同                                        |
| title    | string                       | 否       | -      | 图表的标题                                                                                         |
| ...      | -                            | -        | -      | 更多属性，详见 [Ant Design Charts ](https://ant-design-charts.antgroup.com/options/plots/overview) |
