---
order: 8
group:
  order: 1
  title: 统计图
demo: { cols: 2 }
toc: content
---

# Treemap 矩阵树图

## 代码演示

<code src="./demos/common">单独使用</code>

<code src="./demos/markdown">使用 Markdown 协议</code>

## Spec

```json
{
  "type": "treemap",
  "data": [
    {
      "name": "<分类名称一>",
      "value": 1,
      "children": [
        { "name": "<子分类名称>", "value": 2 },
        { "name": "<子分类名称>", "value": 3 },
        { "name": "<子分类名称>", "value": 4 }
      ]
    },
    {
      "name": "<分类名称二>",
      "value": 5,
      "children": [
        { "name": "<子分类名称>", "value": 6 },
        { "name": "<子分类名称>", "value": 7 }
      ]
    }
  ]
}
```

## API

### TreemapProps

| 属性  | 类型                                     | 是否必传 | 默认值    | 说明       |
| ----- | ---------------------------------------- | -------- | --------- | ---------- |
| data  | TreemapDataItem[]                        | 是       | -         | 数据       |
| title | string                                   | 否       | -         | 图表的标题 |
| theme | "default" &#124; "dark" &#124; "academy" | 否       | "default" | 图表主题   |
| style | IStyle                                   | 否       | -         | 图表样式   |

### IStyle

| 属性            | 类型     | 是否必传 | 默认值 | 说明     |
| --------------- | -------- | -------- | ------ | -------- |
| backgroundColor | string   | 否       | -      | 背景颜色 |
| palette         | string[] | 否       | -      | 颜色映射 |

### TreeNode

| 属性     | 类型       | 是否必传 | 默认值 | 说明           |
| -------- | ---------- | -------- | ------ | -------------- |
| name     | string     | 是       | -      | 分类名称       |
| value    | number     | 是       | -      | 分类的数值大小 |
| children | TreeNode[] | 否       | -      | 子分类列表     |
