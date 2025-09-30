---
order: 2
group:
  order: 3
  title: 文本
toc: content
---

# Table 表格

## 代码演示

<code src="./demos/common">单独使用</code>

<code src="./demos/markdown">使用 Markdown 协议</code>

## Spec

```json
{
  "type": "table",
  "title": "用户信息表",
  "data": [
    { "Name": "胡彦斌", "Age": 32, "Address": "西湖区湖底公园1号" },
    { "Name": "吴彦祖", "Age": 42, "Address": "西湖区湖底公园1号" }
  ]
}
```

## API

### VisTableProps

| 属性  | 类型               | 是否必传 | 默认值 | 说明       |
| ----- | ------------------ | -------- | ------ | ---------- |
| data  | VisTableDataItem[] | 是       | -      | 数据       |
| title | string             | 否       | -      | 图表的标题 |

### VisTableDataItem

| 属性     | 类型 | 是否必传 | 默认值 | 说明                                                                  |
| -------- | ---- | -------- | ------ | --------------------------------------------------------------------- |
| 任意字段 | any  | 是       | -      | 列名作为 key，单元格值作为 value；一行内所有 key 必须与表头保持一致。 |
