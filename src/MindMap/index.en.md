---
order: 1
group:
  order: 3
  title: Relationship Graphs
toc: content
---

# Mind Map

A mind map visually presents the hierarchical structure of information and their relationships.

## Code Examples

### Basic Usage

<code src="./demos/common"></code>

### Markdown Protocol

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

| Property | Type            | Required | Default | Description                                                                                                                                      |
| -------- | --------------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| name     | `string`        | Yes      | -       | Node name                                                                                                                                        |
| children | `MindMapData[]` | No       | -       | Child nodes; if absent, it is a leaf. Each child is a `MindMapData` and can recursively contain its own children to form a multi-level structure |
