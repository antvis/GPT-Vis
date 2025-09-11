---
order: 12
group:
  order: 1
  title: 统计图
demo: { cols: 2 }
toc: content
nav: { title: '组件', order: 1 }
---

# Liquid 水波图

## 代码演示

<code src="./demos/common">单独使用</code>

<code src="./demos/markdown">使用 Markdown 协议</code>

## Spec

```json
{
  "type": "liquid",
  "percent": 0.65
}
```

## API

### LiquidProps

| 属性    | 类型                                                  | 是否必传 | 默认值    | 说明       |
| ------- | ----------------------------------------------------- | -------- | --------- | ---------- |
| percent | number                                                | 是       | -         | 百分比     |
| shape   | 'rect' &#124; 'circle' &#124; 'pin' &#124; 'triangle' | 否       | 'circle'  | 水波图形状 |
| title   | string                                                | 否       | -         | 图表的标题 |
| theme   | "default" &#124; "dark" &#124; "academy"              | 否       | "default" | 图表主题   |
| style   | IStyle                                                | 否       | -         | 图表样式   |

### IStyle

| 属性            | 类型     | 是否必传 | 默认值 | 说明     |
| --------------- | -------- | -------- | ------ | -------- |
| backgroundColor | string   | 否       | -      | 背景颜色 |
| palette         | string[] | 否       | -      | 颜色映射 |
