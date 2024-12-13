---
order: 6
group:
  order: 4
  title: 关系图
toc: content
---

# FishboneDiagram 鱼骨图

鱼骨图，是一种以核心问题为鱼头，通过鱼骨分支的形式分析和展示问题原因或结果的图表。

## 代码演示

### 单独使用

<code src="./demos/common"></code>

### 使用 Markdown 协议

<code src="./demos/markdown"></code>

## Spec

```json
{
  "type": "fishbone-diagram",
  "data": {
    "name": "problem",
    "children": [
      {
        "name": "bone 1",
        "children": [{ "name": "factor 1-1" }, { "name": "factor 1-2" }]
      },
      {
        "name": "bone 2",
        "children": [{ "name": "factor 2-1" }, { "name": "factor 2-2" }]
      }
    ]
  }
}
```

## API

### FishboneProps

| 属性 | 类型           | 是否必传 | 默认值 | 说明 |
| ---- | -------------- | -------- | ------ | ---- |
| data | `FishboneData` | 是       | -      | 数据 |

### FishboneData

| 属性     | 类型             | 是否必传 | 默认值 | 说明                                                                                                                                                                           |
| -------- | ---------------- | -------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| name     | `string`         | 是       | -      | 节点的名称，用于显示在思维导图的节点上                                                                                                                                         |
| children | `FishboneData[]` | 否       | -      | 当前节点的子节点集合。如果当前节点没有子节点，该字段可以省略。每个子节点本身也是一个 `FishboneData` 对象，这意味着它可以包含自己的子节点，从而递归地构建出一个多层次的树状结构 |
