---
order: 3
group:
  order: 3
  title: Text
toc: content
---

# Spreadsheet

A multi-dimensional table component based on `@antv/s2`, supporting both pivot table and table sheet modes.

## Code Examples

<code src="./demos/common">Table Sheet</code>

<code src="./demos/pivot">Pivot Table</code>

<code src="./demos/markdown">Using Markdown Protocol</code>

## Spec

### Table Sheet

```json
{
  "type": "spreadsheet",
  "data": [
    { "Province": "Zhejiang", "City": "Hangzhou", "Type": "Pen", "Price": 1 },
    { "Province": "Zhejiang", "City": "Hangzhou", "Type": "Paper", "Price": 2 }
  ]
}
```

### Pivot Table

```json
{
  "type": "spreadsheet",
  "data": [
    { "Province": "Zhejiang", "City": "Hangzhou", "Type": "Pen", "Price": 1 },
    { "Province": "Zhejiang", "City": "Hangzhou", "Type": "Paper", "Price": 2 }
  ],
  "rows": ["Province", "City"],
  "columns": ["Type"],
  "values": ["Price"]
}
```

## API

### SpreadsheetProps

| Property | Type                  | Required | Default   | Description                                      |
| -------- | --------------------- | -------- | --------- | ------------------------------------------------ |
| data     | Record<string, any>[] | Yes      | -         | Table data                                       |
| rows     | string[]              | No       | -         | Row fields (renders as pivot table if present)   |
| columns  | string[]              | No       | -         | Column fields/order                              |
| values   | string[]              | No       | -         | Value fields (renders as pivot table if present) |
| theme    | 'default' \| 'dark'   | No       | 'default' | Theme                                            |
| title    | string                | No       | -         | Table title                                      |
| width    | number                | No       | 600       | Width                                            |
| height   | number                | No       | 400       | Height                                           |
