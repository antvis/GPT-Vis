---
order: 10
group:
  order: 1
  title: 统计图
demo: { cols: 2 }
toc: content
---

# DualAxes 双轴图

## 代码演示

<code src="./demos/common">单独使用</code>

<code src="./demos/markdown">使用 Markdown 协议</code>
<code src="./demos/multiple">多轴图</code>

## Spec

```json
{
  "type": "dual-axes",
  "categories": ["2018", "2019", "2020", "2021", "2022"],
  "title": "2018-2022销售额与利润率",
  "axisXTitle": "年份",
  "series": [
    {
      "type": "column",
      "data": [91.9, 99.1, 101.6, 114.4, 121],
      "axisYTitle": "销售额"
    },
    {
      "type": "line",
      "data": [0.055, 0.06, 0.062, 0.07, 0.075],
      "axisYTitle": "利润率"
    }
  ]
}
```

## API

### DualAxesProps

| 属性       | 类型                                     | 是否必传 | 默认值    | 说明       |
| ---------- | ---------------------------------------- | -------- | --------- | ---------- |
| data       | DualAxesDataItem[]                       | 是       | -         | 数据       |
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
