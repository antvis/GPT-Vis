---
order: 1
group:
  order: 1
  title: 统计图
toc: content
demo: { cols: 2 }
---

# Line 折线图

## 代码演示

<code src="./demos/common">单独使用</code>

<code src="./demos/markdown">使用 Markdown 协议</code>
<code src="./demos/category" description="在 data 中传入 group 字段">多折线图</code>

## Spec

```json
{
  "type": "line",
  "data": [
    { "time": "2018", "value": 91.9 },
    { "time": "2019", "value": 99.1 },
    { "time": "2020", "value": 101.6 },
    { "time": "2021", "value": 114.4 },
    { "time": "2022", "value": 121 }
  ]
}
```

## API

### LineProps

| 属性       | 类型                                     | 是否必传 | 默认值    | 说明       |
| ---------- | ---------------------------------------- | -------- | --------- | ---------- |
| data       | LineDataItem[]                           | 是       | -         | 数据       |
| title      | string                                   | 否       | -         | 图表的标题 |
| axisXTitle | string                                   | 否       | -         | x 轴的标题 |
| axisYTitle | string                                   | 否       | -         | y 轴的标题 |
| theme      | "default" &#124; "dark" &#124; "academy" | 否       | "default" | 图表主题   |
| style      | IStyle                                   | 否       | -         | 图表样式   |

### IStyle

| 属性            | 类型     | 是否必传 | 默认值 | 说明           |
| --------------- | -------- | -------- | ------ | -------------- |
| backgroundColor | string   | 否       | -      | 背景颜色       |
| palette         | string[] | 否       | -      | 颜色映射       |
| lineWidth       | number   | 否       | -      | 图形描边的宽度 |

### LineDataItem

| 属性  | 类型   | 是否必传 | 默认值 | 说明           |
| ----- | ------ | -------- | ------ | -------------- |
| time  | string | 是       | -      | 数据的时序名称 |
| value | number | 是       | -      | 数据的值       |
| group | string | 否       | -      | 数据分组名称   |
