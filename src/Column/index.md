---
order: 2
group:
  order: 1
  title: 统计图
demo: { cols: 2 }
---

# Column 柱形图

## 代码演示

<code src="./demos/common">单独使用</code>

<code src="./demos/markdown">使用 Markdown 协议</code>

<code src="./demos/group" description="在 data 中传入额外的字段，并且设置 group 为 true">分组柱形图</code>
<code src="./demos/stack" description="在 data 中传入额外的字段，并且设置 stack 为 true">堆叠柱形图 </code>

## Spec

```json
{
  "type": "column",
  "data": [
    { "category": "分类一", "value": 91.9 },
    { "category": "分类二", "value": 99.1 },
    { "category": "分类三", "value": 101.6 }
  ]
}
```

## API

### ColumnProps

| 属性       | 类型             | 是否必传 | 默认值 | 说明                                                                                               |
| ---------- | ---------------- | -------- | ------ | -------------------------------------------------------------------------------------------------- |
| data       | ColumnDataItem[] | 是       | -      | 数据                                                                                               |
| group      | boolean          | 否       | -      | 是否开启分组，开启分组柱形图需数据中含有 group 字段                                                |
| stack      | boolean          | 否       | -      | 是否开启堆叠，开启堆叠柱形图需数据中含有 group 字段                                                |
| title      | string           | 否       | -      | 图表的标题                                                                                         |
| axisXTitle | string           | 否       | -      | x 轴的标题                                                                                         |
| axisYTitle | string           | 否       | -      | y 轴的标题                                                                                         |
| ...        | -                | -        | -      | 更多属性，详见 [Ant Design Charts ](https://ant-design-charts.antgroup.com/options/plots/overview) |

### ColumnDataItem

| 属性     | 类型   | 是否必传 | 默认值 | 说明         |
| -------- | ------ | -------- | ------ | ------------ |
| category | string | 是       | -      | 数据分类名称 |
| value    | number | 是       | -      | 数据分类值   |
| group    | number | 否       | -      | 数据分组名称 |
