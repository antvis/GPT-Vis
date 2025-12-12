---
order: 14
group:
  order: 1
  title: 统计图
demo: { cols: 2 }
toc: content
nav: { title: '组件', order: 1 }
---

# Sankey 桑基图

## 代码演示

<code src="./demos/common">单独使用</code>

<code src="./demos/markdown">使用 Markdown 协议</code>

## Spec

```json
{
  "type": "sankey",
  "data": [
    { "source": "A", "target": "B", "value": 10 },
    { "source": "A", "target": "C", "value": 20 },
    { "source": "B", "target": "D", "value": 30 },
    { "source": "C", "target": "D", "value": 40 }
  ]
}
```

## API

### SankeyProps

| 属性      | 类型                                                   | 是否必传 | 默认值    | 说明         |
| --------- | ------------------------------------------------------ | -------- | --------- | ------------ |
| data      | SankeyDataItem[]                                       | 是       | -         | 数据         |
| nodeAlign | "left" &#124; "center" &#124; "right" &#124; "justify" | 否       | "center"  | 节点对齐方式 |
| title     | string                                                 | 否       | -         | 图表的标题   |
| theme     | "default" &#124; "dark" &#124; "academy"               | 否       | "default" | 图表主题     |
| style     | IStyle                                                 | 否       | -         | 图表样式     |

### SankeyDataItem

| 属性   | 类型   | 是否必传 | 默认值 | 说明         |
| ------ | ------ | -------- | ------ | ------------ |
| source | string | 是       | -      | 源节点名称   |
| target | string | 是       | -      | 目标节点名称 |
| value  | number | 是       | -      | 流量值       |

### IStyle

| 属性            | 类型     | 是否必传 | 默认值 | 说明     |
| --------------- | -------- | -------- | ------ | -------- |
| backgroundColor | string   | 否       | -      | 背景颜色 |
| palette         | string[] | 否       | -      | 颜色映射 |
