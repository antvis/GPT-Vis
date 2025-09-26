---
order: 2
group:
  order: 3
  title: Text
toc: content
---

# VisTable

## Code Examples

<code src="./demos/common">Basic Usage</code>

<code src="./demos/markdown">Using Markdown Protocol</code>

## Spec

```json
{
  "type": "vis-table",
  "title": "User Information Table",
  "data": [
    { "Name": "Hu Yanbin", "Age": 32, "Address": "No. 1, Hudigongyuan, Xihu District" },
    { "Name": "Wu Yanzu", "Age": 42, "Address": "No. 1, Hudigongyuan, Xihu District" }
  ]
}
```

## API

### VisTableProps

| Property | Type               | Required | Default | Description |
| -------- | ------------------ | -------- | ------- | ----------- |
| data     | VisTableDataItem[] | Yes      | -       | Table data  |
| title    | string             | No       | -       | Table title |

### VisTableDataItem

| Property  | Type | Required | Default | Description                                                                                                         |
| --------- | ---- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------- |
| Any field | any  | Yes      | -       | The column name is used as the key, and the cell value as the value; all keys in a row must match the table header. |
