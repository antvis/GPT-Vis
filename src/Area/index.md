---
order: 4
group:
  order: 1
  title: 统计图
demo: { cols: 2 }
toc: content
nav: { title: '组件', order: 1 }
---

# Area 面积图

## 代码演示

<code src="./demos/common">单独使用</code>

<code src="./demos/markdown">使用 Markdown 协议</code>
<code src="./demos/stack" description="在 data 中传入额外的字段，并且设置 stack 为 true">堆叠面积图</code>

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

| 属性       | 类型           | 是否必传 | 默认值 | 说明                                                                                               |
| ---------- | -------------- | -------- | ------ | -------------------------------------------------------------------------------------------------- |
| data       | AreaDataItem[] | 是       | -      | 数据                                                                                               |
| stack      | boolean        | 否       | -      | 是否开启堆叠，开启堆叠面积图需数据中含有 group 字段                                                |
| title      | string         | 否       | -      | 图表的标题                                                                                         |
| axisXTitle | string         | 否       | -      | x 轴的标题                                                                                         |
| axisYTitle | string         | 否       | -      | y 轴的标题                                                                                         |
| ...        | -              | -        | -      | 更多属性，详见 [Ant Design Charts ](https://ant-design-charts.antgroup.com/options/plots/overview) |

### AreaDataItem

| 属性  | 类型   | 是否必传 | 默认值 | 说明           |
| ----- | ------ | -------- | ------ | -------------- |
| time  | string | 是       | -      | 数据的时序名称 |
| value | number | 是       | -      | 数据的值       |
| group | string | 否       | -      | 数据分组名称   |
