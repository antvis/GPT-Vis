---
order: 2
group:
  order: 3
  title: Text
toc: content
---

# Table

## Code Examples

<code src="./demos/common">Basic Usage</code>

<code src="./demos/markdown">Using Markdown Protocol</code>

## Spec

```json
{
  "type": "table",
  "title": "User Information Table",
  "data": [
    { "Name": "Hu Yanbin", "Age": 32, "Address": "No. 1, Hudigongyuan, Xihu District" },
    { "Name": "Wu Yanzu", "Age": 42, "Address": "No. 1, Hudigongyuan, Xihu District" }
  ]
}
```

## API

### TableProps

| Property | Type            | Required | Default | Description |
| -------- | --------------- | -------- | ------- | ----------- |
| data     | TableDataItem[] | Yes      | -       | Table data  |
| title    | string          | No       | -       | Table title |

### TableDataItem

| Property  | Type | Required | Default | Description                                                                                                         |
| --------- | ---- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------- |
| Any field | any  | Yes      | -       | The column name is used as the key, and the cell value as the value; all keys in a row must match the table header. |
