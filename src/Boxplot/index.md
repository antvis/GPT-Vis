---
order: 16
group:
  order: 1
  title: 统计图
demo: { cols: 2 }
toc: content
nav: { title: '组件', order: 1 }
---

# Boxplot 箱线图

## 代码演示

<code src="./demos/common">单独使用</code>

<code src="./demos/markdown">使用 Markdown 协议</code>

## Spec

```json
{
  "type": "boxplot",
  "data": [
    {
      "category": "A",
      "value": 10
    },
    {
      "category": "B",
      "value": 20
    }
  ]
}
```

## API

### BoxplotProps

| 属性       | 类型                                     | 是否必传 | 默认值    | 说明       |
| ---------- | ---------------------------------------- | -------- | --------- | ---------- |
| data       | BoxplotDataItem[]                        | 是       | -         | 数据       |
| title      | string                                   | 否       | -         | 图表的标题 |
| axisXTitle | string                                   | 否       | -         | x 轴的标题 |
| axisYTitle | string                                   | 否       | -         | y 轴的标题 |
| title      | string                                   | 否       | -         | 图表的标题 |
| theme      | "default" &#124; "dark" &#124; "academy" | 否       | "default" | 图表主题   |
| style      | IStyle                                   | 否       | -         | 图表样式   |

### BoxplotDataItem

| 属性     | 类型   | 是否必传 | 默认值 | 说明         |
| -------- | ------ | -------- | ------ | ------------ |
| category | string | 是       | -      | 数据分类名称 |
| value    | number | 是       | -      | 数据分类值   |
| group    | number | 否       | -      | 数据分组名称 |

### IStyle

| 属性            | 类型     | 是否必传 | 默认值 | 说明                  |
| --------------- | -------- | -------- | ------ | --------------------- |
| backgroundColor | string   | 否       | -      | 背景颜色              |
| palette         | string[] | 否       | -      | 颜色映射              |
| startAtZero     | boolean  | 否       | false  | Y 轴刻度是否从 0 开始 |
