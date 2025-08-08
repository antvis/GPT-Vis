---
order: 1
group:
  order: 3
  title: Relationship Graphs
toc: content
---

# MindMap

Mind map, intuitively displaying hierarchical structure and relationships of information.

## Code Demo

### Standalone Usage

<code src="./demos/common"></code>

### Using Markdown Protocol

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

| Property | Type          | Required | Default | Description |
| -------- | ------------- | -------- | ------- | ----------- |
| data     | `MindMapData` | Yes      | -       | Data        |

### MindMapData

| Property | Type            | Required | Default | Description                                                                                                                                                                                                     |
| -------- | --------------- | -------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name     | `string`        | Yes      | -       | Node name, displayed on the mind map node                                                                                                                                                                       |
| children | `MindMapData[]` | No       | -       | Current node's child node collection. If current node has no children, this field can be omitted. Each child node is also a `MindMapData` object, allowing recursive construction of multi-level tree structure |
