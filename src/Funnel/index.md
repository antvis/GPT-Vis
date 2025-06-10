---
order: 4
group:
  order: 1
  title: 统计图
demo: { cols: 2 }
toc: content
nav: { title: '组件', order: 1 }
---

# Funnel 漏斗图

## 代码演示

<code src="./demos/common">单独使用</code>

## Spec

```json
{
  "type": "funnel",
  "data": [
    { "type": "浏览网站", "value": 50000 },
    { "type": "放入购物车", "value": 35000 },
    { "type": "生成订单", "value": 25000 },
    { "type": "支付订单", "value": 15000 },
    { "type": "完成交易", "value": 8000 }
  ]
}
```

## API

### FunnelProps

| 属性  | 类型             | 是否必传 | 默认值 | 说明                                                                                               |
| ----- | ---------------- | -------- | ------ | -------------------------------------------------------------------------------------------------- |
| data  | FunnelDataItem[] | 是       | -      | 数据                                                                                               |
| stack | boolean          | 否       | -      | 是否开启堆叠，开启堆叠面积图需数据中含有 group 字段                                                |
| title | string           | 否       | -      | 图表的标题                                                                                         |
| ...   | -                | -        | -      | 更多属性，详见 [Ant Design Charts ](https://ant-design-charts.antgroup.com/options/plots/overview) |

### FunnelDataItem

| 属性  | 类型   | 是否必传 | 默认值 | 说明           |
| ----- | ------ | -------- | ------ | -------------- |
| type  | string | 是       | -      | 数据的时序名称 |
| value | number | 是       | -      | 数据的值       |
