---
order: 15
group:
  order: 1
  title: 统计图
demo: { cols: 2 }
toc: content
nav: { title: '组件', order: 1 }
---

# Venn 韦恩图

## 代码演示

<code src="./demos/common">单独使用</code>

<code src="./demos/markdown">使用 Markdown 协议</code>

## Spec

```json
{
  "type": "venn",
  "data": [
    { "sets": ["A"], "value": 12 },
    { "sets": ["B"], "value": 12 },
    { "sets": ["C"], "value": 12 },
    { "sets": ["A", "B"], "value": 2 },
    { "sets": ["A", "C"], "value": 2 },
    { "sets": ["B", "C"], "value": 2 },
    { "sets": ["A", "B", "C"], "value": 1 }
  ]
}
```

## API

### LiquidProps

| 属性  | 类型                                     | 是否必传 | 默认值    | 说明       |
| ----- | ---------------------------------------- | -------- | --------- | ---------- |
| data  | VennDataItem[]                           | 是       | -         | 数据       |
| title | string                                   | 否       | -         | 图表的标题 |
| theme | "default" &#124; "dark" &#124; "academy" | 否       | "default" | 图表主题   |
| style | IStyle                                   | 否       | -         | 图表样式   |

### VennDataItem

| 属性  | 类型     | 是否必传 | 默认值 | 说明         |
| ----- | -------- | -------- | ------ | ------------ |
| sets  | string[] | 是       | -      | 维恩图的集合 |
| value | number   | 是       | -      | 维恩图的值   |
| label | string   | 否       | -      | 维恩图的标签 |

### IStyle

| 属性            | 类型     | 是否必传 | 默认值 | 说明     |
| --------------- | -------- | -------- | ------ | -------- |
| backgroundColor | string   | 否       | -      | 背景颜色 |
| palette         | string[] | 否       | -      | 颜色映射 |
