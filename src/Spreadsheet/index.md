---
order: 3
group:
  order: 3
  title: 文本
toc: content
---

# Spreadsheet 透视表

基于 `@antv/s2` 的多维表格组件，支持透视表和明细表两种模式。

## 代码演示

<code src="./demos/common">明细表</code>

<code src="./demos/pivot">透视表</code>

<code src="./demos/markdown">使用 Markdown 协议</code>

## Spec

### 明细表

```json
{
  "type": "spreadsheet",
  "data": [
    { "省份": "浙江", "城市": "杭州", "类型": "笔", "价格": 1 },
    { "省份": "浙江", "城市": "杭州", "类型": "纸张", "价格": 2 }
  ]
}
```

### 透视表

```json
{
  "type": "spreadsheet",
  "data": [
    { "省份": "浙江", "城市": "杭州", "类型": "笔", "价格": 1 },
    { "省份": "浙江", "城市": "杭州", "类型": "纸张", "价格": 2 }
  ],
  "rows": ["省份", "城市"],
  "columns": ["类型"],
  "values": ["价格"]
}
```

## API

### SpreadsheetProps

| 属性    | 类型                  | 是否必传 | 默认值    | 说明                           |
| ------- | --------------------- | -------- | --------- | ------------------------------ |
| data    | Record<string, any>[] | 是       | -         | 表格数据                       |
| rows    | string[]              | 否       | -         | 行头字段（存在时渲染为透视表） |
| columns | string[]              | 否       | -         | 列头字段/列顺序                |
| values  | string[]              | 否       | -         | 数值字段（存在时渲染为透视表） |
| theme   | 'default' \| 'dark'   | 否       | 'default' | 主题                           |
| title   | string                | 否       | -         | 表格标题                       |
| width   | number                | 否       | 600       | 宽度                           |
| height  | number                | 否       | 400       | 高度                           |
| autoFit | boolean               | 否       | true      | 自动裁剪空白区域               |
