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
  "columns": [
    { "title": "Name", "key": "name" },
    { "title": "Age", "key": "age" },
    { "title": "Address", "key": "address" }
  ],
  "data": [
    { "key": "1", "name": "Hu Yanbin", "age": 32, "address": "No. 1, Hudigongyuan, Xihu District" },
    { "key": "2", "name": "Wu Yanzu", "age": 42, "address": "No. 1, Hudigongyuan, Xihu District" }
  ]
}
```

## API

### VisTableProps

| Property | Type                             | Required | Default | Description         |
| -------- | -------------------------------- | -------- | ------- | ------------------- |
| data     | VisTableDataItem[]               | Yes      | -       | Table data          |
| columns  | { title: string; key: string }[] | Yes      | -       | Table header config |
| title    | string                           | No       | -       | Table title         |

### VisTableDataItem

| Property   | Type | Required | Default | Description                                            |
| ---------- | ---- | -------- | ------- | ------------------------------------------------------ |
| Other keys | any  | No       | -       | Other data fields corresponding to the keys in columns |
