---
order: 13
group:
  order: 1
  title: 统计图
demo: { cols: 2 }
toc: content
---

# Funnel 漏斗图

## 代码演示

<code src="./demos/common">单独使用</code>

<code src="./demos/markdown">使用 Markdown 协议</code>

## Spec

```json
{
  "type": "funnel",
  "data": [
    { "category": "浏览网站", "value": 50000 },
    { "category": "放入购物车", "value": 35000 },
    { "category": "生成订单", "value": 25000 },
    { "category": "支付订单", "value": 15000 },
    { "category": "完成交易", "value": 8000 }
  ]
}
```

## API

### FunnelProps

| 属性  | 类型                                     | 是否必传 | 默认值    | 说明       |
| ----- | ---------------------------------------- | -------- | --------- | ---------- |
| data  | FunnelDataItem[]                         | 是       | -         | 数据       |
| title | string                                   | 否       | -         | 图表的标题 |
| theme | "default" &#124; "dark" &#124; "academy" | 否       | "default" | 图表主题   |
| style | IStyle                                   | 否       | -         | 图表样式   |

### FunnelDataItem

| 属性     | 类型   | 是否必传 | 默认值 | 说明         |
| -------- | ------ | -------- | ------ | ------------ |
| category | string | 是       | -      | 数据分类名称 |
| value    | number | 是       | -      | 数据的值     |

### IStyle

| 属性            | 类型     | 是否必传 | 默认值 | 说明     |
| --------------- | -------- | -------- | ------ | -------- |
| backgroundColor | string   | 否       | -      | 背景颜色 |
| palette         | string[] | 否       | -      | 颜色映射 |
