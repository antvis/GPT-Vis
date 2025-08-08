---
order: 2
group:
  order: 3
  title: Relationship Graphs
toc: content
---

# Flow Diagram

A flow diagram is used to visually represent the steps of a process or system and its decision points.

## Code Examples

### Basic Usage

<code src="./demos/common"></code>

### Markdown Protocol

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

| Property | Type              | Required | Default | Description |
| -------- | ----------------- | -------- | ------- | ----------- |
| data     | `FlowDiagramData` | Yes      | -       | Data        |

### FlowDiagramData

| Property | Type                | Required | Default | Description                                                               |
| -------- | ------------------- | -------- | ------- | ------------------------------------------------------------------------- |
| nodes    | `FlowDiagramNode[]` | Yes      | -       | Nodes in the graph; each node represents an entity                        |
| edges    | `FlowDiagramEdge[]` | Yes      | -       | Edges in the graph; each edge represents a relationship between two nodes |

### FlowDiagramNode

| Property | Type     | Required | Default | Description                                  |
| -------- | -------- | -------- | ------- | -------------------------------------------- |
| name     | `string` | Yes      | -       | Node name; must be unique to identify a node |

### FlowDiagramEdge

| Property | Type     | Required | Default | Description                                                          |
| -------- | -------- | -------- | ------- | -------------------------------------------------------------------- |
| source   | `string` | Yes      | -       | Name of the source node; refers to the `name` of a `FlowDiagramNode` |
| target   | `string` | Yes      | -       | Name of the target node; refers to the `name` of a `FlowDiagramNode` |
| name     | `string` | No       | -       | Edge name for identification                                         |
