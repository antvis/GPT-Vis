---
order: 6
group:
  order: 4
  title: Relationship Graphs
toc: content
---

# Fishbone Diagram

A fishbone diagram displays the root cause analysis of a core problem using branches shaped like fish bones.

## Code Examples

### Basic Usage

<code src="./demos/common"></code>

### Markdown Protocol

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

| Property | Type           | Required | Default | Description |
| -------- | -------------- | -------- | ------- | ----------- |
| data     | `FishboneData` | Yes      | -       | Data        |

### FishboneData

| Property | Type             | Required | Default | Description                                                                                                                                       |
| -------- | ---------------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| name     | `string`         | Yes      | -       | Node name                                                                                                                                         |
| children | `FishboneData[]` | No       | -       | Child nodes; if absent, it is a leaf. Each child is a `FishboneData` and can recursively contain its own children to form a multi-level structure |
