---
order: 2
group:
  order: 3
  title: 关系图
toc: content
---

# FlowDiagram 流程图

流程图，用于直观地表示过程或系统的步骤和决策点。

## 代码演示

### 单独使用

<code src="./demos/common"></code>

### 使用 Markdown 协议

<code src="./demos/markdown"></code>

## Spec

```json
{
  "type": "flow-diagram",
  "data": {
    "nodes": [{ "name": "node1" }, { "name": "node2" }],
    "edges": [{ "source": "node1", "target": "node2", "name": "edge1" }]
  }
}
```

## API

### FlowDiagramProps

| 属性 | 类型              | 是否必传 | 默认值 | 说明 |
| ---- | ----------------- | -------- | ------ | ---- |
| data | `FlowDiagramData` | 是       | -      | 数据 |

### FlowDiagramData

| 属性  | 类型                | 是否必传 | 默认值 | 说明                                           |
| ----- | ------------------- | -------- | ------ | ---------------------------------------------- |
| nodes | `FlowDiagramNode[]` | 是       | -      | 网络图中的节点数组，每个节点表示一个实体       |
| edges | `FlowDiagramEdge[]` | 是       | -      | 网络图中的边数组，每条边表示两个节点之间的关系 |

### FlowDiagramNode

| 属性 | 类型     | 是否必传 | 默认值 | 说明                               |
| ---- | -------- | -------- | ------ | ---------------------------------- |
| name | `string` | 是       | -      | 节点的名称，必须唯一，用于标识节点 |

### FlowDiagramEdge

| 属性   | 类型     | 是否必传 | 默认值 | 说明                                                    |
| ------ | -------- | -------- | ------ | ------------------------------------------------------- |
| source | `string` | 是       | -      | 边的起始节点名称，指向 `FlowDiagramNode` 的 `name` 属性 |
| target | `string` | 是       | -      | 边的目标节点名称，指向 `FlowDiagramNode` 的 `name` 属性 |
| name   | `string` | 否       | -      | 边的名称，用于标识边                                    |
