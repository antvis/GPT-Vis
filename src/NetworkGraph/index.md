---
order: 1
group:
  order: 3
  title: 关系图
---

# NetworkGraph 网络图

网络图，又名力导向图，用于展示节点（实体）之间的关系（边），直观地表示复杂的网络结构。

## 代码演示

### 单独使用

<code src="./demos/common"></code>

### 使用 Markdown 协议

<code src="./demos/markdown"></code>

## Spec

```json
{
  "type": "network-graph",
  "data": {
    "nodes": [{ "name": "node1" }, { "name": "node2" }],
    "edges": [{ "source": "node1", "target": "node2", "name": "edge1" }]
  }
}
```

## API

### NetworkGraphProps

| 属性 | 类型               | 是否必传 | 默认值 | 说明 |
| ---- | ------------------ | -------- | ------ | ---- |
| data | `NetworkGraphData` | 是       | -      | 数据 |

### NetworkGraphData

| 属性  | 类型                 | 是否必传 | 默认值 | 说明                                           |
| ----- | -------------------- | -------- | ------ | ---------------------------------------------- |
| nodes | `NetworkGraphNode[]` | 是       | -      | 网络图中的节点数组，每个节点表示一个实体       |
| edges | `NetworkGraphEdge[]` | 是       | -      | 网络图中的边数组，每条边表示两个节点之间的关系 |

### NetworkGraphNode

| 属性 | 类型     | 是否必传 | 默认值 | 说明                               |
| ---- | -------- | -------- | ------ | ---------------------------------- |
| name | `string` | 是       | -      | 节点的名称，必须唯一，用于标识节点 |

### NetworkGraphEdge

| 属性   | 类型     | 是否必传 | 默认值 | 说明                                                     |
| ------ | -------- | -------- | ------ | -------------------------------------------------------- |
| source | `string` | 是       | -      | 边的起始节点名称，指向 `NetworkGraphNode` 的 `name` 属性 |
| target | `string` | 是       | -      | 边的目标节点名称，指向 `NetworkGraphNode` 的 `name` 属性 |
| name   | `string` | 是       | -      | 边的名称，用于标识边                                     |
