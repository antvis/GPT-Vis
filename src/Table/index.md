---
order: 2
group:
  order: 3
  title: 文本
toc: content
---

# VisTable 表格

## 代码演示

<code src="./demos/common">单独使用</code>

<code src="./demos/markdown">使用 Markdown 协议</code>

## Spec

```json
{
  "type": "vis-table",
  "title": "用户信息表",
  "columns": [
    { "title": "姓名", "key": "name" },
    { "title": "年龄", "key": "age" },
    { "title": "住址", "key": "address" }
  ],
  "data": [
    { "name": "胡彦斌", "age": 32, "address": "西湖区湖底公园1号" },
    { "name": "吴彦祖", "age": 42, "address": "西湖区湖底公园1号" }
  ]
}
```

## API

### VisTableProps

| 属性    | 类型                             | 是否必传 | 默认值 | 说明       |
| ------- | -------------------------------- | -------- | ------ | ---------- |
| data    | VisTableDataItem[]               | 是       | -      | 数据       |
| columns | { title: string; key: string }[] | 是       | -      | 表头配置   |
| title   | string                           | 否       | -      | 图表的标题 |

### VisTableDataItem

| 属性     | 类型 | 是否必传 | 默认值 | 说明                                   |
| -------- | ---- | -------- | ------ | -------------------------------------- |
| 其他字段 | any  | 否       | -      | 其他数据字段和 columns 中的 key 相对应 |
