---
order: 1
group:
  order: 3
  title: Relationship Graphs
toc: content
---

# Network Graph

A network (force-directed) graph displays relationships (edges) among entities (nodes), visualizing complex networks.

## Code Examples

### Basic Usage

<code src="./demos/common"></code>

### Markdown Protocol

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

| Property | Type               | Required | Default | Description |
| -------- | ------------------ | -------- | ------- | ----------- |
| data     | `NetworkGraphData` | Yes      | -       | Data        |

### NetworkGraphData

| Property | Type                 | Required | Default | Description                                                               |
| -------- | -------------------- | -------- | ------- | ------------------------------------------------------------------------- |
| nodes    | `NetworkGraphNode[]` | Yes      | -       | Nodes in the graph; each node represents an entity                        |
| edges    | `NetworkGraphEdge[]` | Yes      | -       | Edges in the graph; each edge represents a relationship between two nodes |

### NetworkGraphNode

| Property | Type     | Required | Default | Description                                  |
| -------- | -------- | -------- | ------- | -------------------------------------------- |
| name     | `string` | Yes      | -       | Node name; must be unique to identify a node |

### NetworkGraphEdge

| Property | Type     | Required | Default | Description                                                           |
| -------- | -------- | -------- | ------- | --------------------------------------------------------------------- |
| source   | `string` | Yes      | -       | Name of the source node; refers to the `name` of a `NetworkGraphNode` |
| target   | `string` | Yes      | -       | Name of the target node; refers to the `name` of a `NetworkGraphNode` |
| name     | `string` | Yes      | -       | Edge name for identification                                          |
