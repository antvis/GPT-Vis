---
order: 3
group:
  order: 1
  title: 统计图
toc: content
---

# Pie 饼图

## 代码演示

<code src="./demos/common">单独使用</code>
<code src="./demos/markdown" description="添加 innerRadius 属性修改饼图内半径，设置为环图">使用 Markdown 协议</code>

## Spec

```json
{
  "type": "pie",
  "data": [
    { "category": "分类一", "value": 27 },
    { "category": "分类二", "value": 25 },
    { "category": "分类三", "value": 18 },
    { "category": "分类四", "value": 15 },
    { "category": "分类五", "value": 10 },
    { "category": "其他", "value": 5 }
  ]
}
```

## API

### PieProps

| 属性  | 类型                                     | 是否必传 | 默认值    | 说明       |
| ----- | ---------------------------------------- | -------- | --------- | ---------- |
| data  | PieDataItem[]                            | 是       | -         | 数据       |
| title | string                                   | 否       | -         | 图表的标题 |
| theme | "default" &#124; "dark" &#124; "academy" | 否       | "default" | 图表主题   |
| style | IStyle                                   | 否       | -         | 图表样式   |

### IStyle

| 属性            | 类型     | 是否必传 | 默认值 | 说明           |
| --------------- | -------- | -------- | ------ | -------------- |
| backgroundColor | string   | 否       | -      | 背景颜色       |
| palette         | string[] | 否       | -      | 颜色映射       |
| lineWidth       | number   | 否       | -      | 图形描边的宽度 |

### PieDataItem

| 属性     | 类型   | 是否必传 | 默认值 | 说明           |
| -------- | ------ | -------- | ------ | -------------- |
| category | string | 是       | -      | 扇形区域的名称 |
| value    | number | 是       | -      | 扇形区域的值   |
