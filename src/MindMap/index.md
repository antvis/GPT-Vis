---
order: 1
group:
  order: 3
  title: 关系图
toc: content
---

# MindMap 思维导图

思维导图，直观地展示信息的层次结构和关联关系。

## 代码演示

### 单独使用

<code src="./demos/common"></code>

### 使用 Markdown 协议

<code src="./demos/markdown"></code>

## Spec

```json
{
  "type": "mind-map",
  "data": {
    "name": "main topic",
    "children": [
      { "name": "topic 1", "children": [{ "name": "sub topic 1-1" }] },
      { "name": "topic 2" },
      { "name": "topic 3" }
    ]
  }
}
```

## API

### MindMapProps

| 属性 | 类型          | 是否必传 | 默认值 | 说明 |
| ---- | ------------- | -------- | ------ | ---- |
| data | `MindMapData` | 是       | -      | 数据 |

### MindMapData

| 属性     | 类型            | 是否必传 | 默认值 | 说明                                                                                                                                                                          |
| -------- | --------------- | -------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name     | `string`        | 是       | -      | 节点的名称，用于显示在思维导图的节点上                                                                                                                                        |
| children | `MindMapData[]` | 否       | -      | 当前节点的子节点集合。如果当前节点没有子节点，该字段可以省略。每个子节点本身也是一个 `MindMapData` 对象，这意味着它可以包含自己的子节点，从而递归地构建出一个多层次的树状结构 |
