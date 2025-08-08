---
order: 5
group:
  order: 3
  title: Relationship Graphs
demo: { cols: 2 }
toc: content
---

# Indented Tree

An indented tree visually displays hierarchical structures and parent-child relationships.

## Code Examples

<code src="./demos/common">Basic Usage</code>
<code src="./demos/markdown">Markdown Protocol</code>

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

| Property | Type               | Required | Default | Description |
| -------- | ------------------ | -------- | ------- | ----------- |
| data     | `IndentedTreeData` | Yes      | -       | Data        |

### IndentedTreeData

| Property | Type                 | Required | Default | Description                                                                                                                                            |
| -------- | -------------------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| name     | `string`             | Yes      | -       | Node name                                                                                                                                              |
| children | `IndentedTreeData[]` | No       | -       | Child nodes; if absent, it is a leaf. Each child is an `IndentedTreeData` and can recursively contain its own children to form a multi-level structure |
