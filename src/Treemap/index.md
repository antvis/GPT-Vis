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
      "value": <数值>,
      "children": [
        { "name": "<子分类名称>", "value": <数值> },
        { "name": "<子分类名称>", "value": <数值> },
        { "name": "<子分类名称>", "value": <数值> }
      ]
    },
    {
      "name": "<分类名称二>",
      "value": <数值>,
      "children": [
        { "name": "<子分类名称>", "value": <数值> },
        { "name": "<子分类名称>", "value": <数值> }
      ]
    }
  ],
}
```

## API

### TreemapProps

| 属性  | 类型       | 是否必传 | 默认值 | 说明                                                                                               |
| ----- | ---------- | -------- | ------ | -------------------------------------------------------------------------------------------------- |
| data  | TreeNode[] | 是       | -      | 数据                                                                                               |
| title | string     | 否       | -      | 图表的标题                                                                                         |
| ...   | -          | -        | -      | 更多属性，详见 [Ant Design Charts ](https://ant-design-charts.antgroup.com/options/plots/overview) |

### TreeNode

| 属性     | 类型       | 是否必传 | 默认值 | 说明           |
| -------- | ---------- | -------- | ------ | -------------- |
| name     | string     | 是       | -      | 分类名称       |
| value    | number     | 是       | -      | 分类的数值大小 |
| children | TreeNode[] | 否       | -      | 子分类列表     |
