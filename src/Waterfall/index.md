---
order: 18
group:
  order: 1
  title: 统计图
demo: { cols: 2 }
toc: content
nav: { title: '组件', order: 1 }
---

# Waterfall 瀑布图

## 代码演示

<code src="./demos/common">单独使用</code>

<code src="./demos/markdown">使用 Markdown 协议</code>

## Spec

```json
{
  "type": "waterfall",
  "data": [
    { "category": "第一季度", "value": 6200000 },
    { "category": "第二季度", "value": -2600000 },
    { "category": "一二季度总计", "isIntermediateTotal": true },
    { "category": "第三季度", "value": 4100000 },
    { "category": "第四季度", "value": 3700000 },
    { "category": "总计", "isTotal": true }
  ]
}
```

## API

### WaterfallProps

| 属性       | 类型                                     | 是否必传 | 默认值    | 说明       |
| ---------- | ---------------------------------------- | -------- | --------- | ---------- |
| data       | WaterfallDataItem[]                      | 是       | -         | 数据       |
| title      | string                                   | 否       | -         | 图表的标题 |
| axisXTitle | string                                   | 否       | -         | x 轴的标题 |
| axisYTitle | string                                   | 否       | -         | y 轴的标题 |
| theme      | "default" &#124; "dark" &#124; "academy" | 否       | "default" | 图表主题   |
| style      | IStyle                                   | 否       | -         | 图表样式   |

### WaterfallDataItem

| 属性                | 类型    | 是否必传 | 默认值 | 说明                                           |
| ------------------- | ------- | -------- | ------ | ---------------------------------------------- |
| category            | string  | 是       | -      | 数据的类别名称（x 轴）                         |
| value               | number  | 否       | -      | 数据的值（y 轴），正值表示增长，负值表示减少   |
| isTotal             | boolean | 否       | false  | 是否为总计项，总计项会使用特殊颜色展示         |
| isIntermediateTotal | boolean | 否       | false  | 是否为中间小计项，中间小计项会使用特殊颜色展示 |

### IStyle

| 属性            | 类型             | 是否必传 | 默认值 | 说明     |
| --------------- | ---------------- | -------- | ------ | -------- |
| backgroundColor | string           | 否       | -      | 背景颜色 |
| palette         | WaterfallPalette | 否       | -      | 颜色配置 |

### WaterfallPalette

| 属性          | 类型   | 是否必传 | 默认值    | 说明           |
| ------------- | ------ | -------- | --------- | -------------- |
| positiveColor | string | 否       | "#FF4D4F" | 正值柱子的颜色 |
| negativeColor | string | 否       | "#2EBB59" | 负值柱子的颜色 |
| totalColor    | string | 否       | "#1783FF" | 总计柱子的颜色 |
