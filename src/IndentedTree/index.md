---
order: 5
group:
  order: 3
  title: 关系图
demo: { cols: 2 }
toc: content
---

# IndentedTree 缩进树

缩进树，用于直观地展示层级结构和父子关系。

## 代码演示

<code src="./demos/common">单独使用</code>
<code src="./demos/markdown">使用 Markdown 协议</code>

## Spec

```json
{
  "type": "indented-tree",
  "data": {
    "name": "node1",
    "children": [
      { "name": "node 1-1", "children": [{ "name": "node 1-1-1" }] },
      { "name": "node 1-2" },
      { "name": "node 1-3" }
    ]
  }
}
```

## API

### IndentedTreeProps

| 属性 | 类型               | 是否必传 | 默认值 | 说明 |
| ---- | ------------------ | -------- | ------ | ---- |
| data | `IndentedTreeData` | 是       | -      | 数据 |

### IndentedTreeData

| 属性     | 类型                 | 是否必传 | 默认值 | 说明                                                                                                                                                                               |
| -------- | -------------------- | -------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name     | `string`             | 是       | -      | 节点的名称，用于显示在思维导图的节点上                                                                                                                                             |
| children | `IndentedTreeData[]` | 否       | -      | 当前节点的子节点集合。如果当前节点没有子节点，该字段可以省略。每个子节点本身也是一个 `IndentedTreeData` 对象，这意味着它可以包含自己的子节点，从而递归地构建出一个多层次的树状结构 |
