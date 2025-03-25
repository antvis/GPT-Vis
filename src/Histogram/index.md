---
order: 5
group:
  order: 1
  title: 统计图
demo: { cols: 2 }
toc: content
---

# Histogram 直方图

## 代码演示

<code src="./demos/common">单独使用</code>

<code src="./demos/markdown">使用 Markdown 协议</code>

## Spec

```json
{
  "type": "histogram",
  "data": [78, 88, 60, 100, 95],
  "binNumber": 4
}
```

## API

### HistogramProps

| 属性       | 类型     | 是否必传 | 默认值 | 说明                                                                                               |
| ---------- | -------- | -------- | ------ | -------------------------------------------------------------------------------------------------- |
| data       | number[] | 是       | -      | 数据                                                                                               |
| binNumber  | number   | 否       | -      | 区间个数，用于定义直方图的区间数量                                                                 |
| title      | string   | 否       | -      | 图表的标题                                                                                         |
| axisXTitle | string   | 否       | -      | x 轴的标题                                                                                         |
| axisYTitle | string   | 否       | -      | y 轴的标题                                                                                         |
| ...        | -        | -        | -      | 更多属性，详见 [Ant Design Charts ](https://ant-design-charts.antgroup.com/options/plots/overview) |
