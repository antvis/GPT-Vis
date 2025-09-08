---
order: 11
group:
  order: 1
  title: 统计图
demo: { cols: 2 }
toc: content
---

# Radar 雷达图

## 代码演示

<code src="./demos/common">单独使用</code>

<code src="./demos/markdown">使用 Markdown 协议</code>
<code src="./demos/category" description="在 data 中传入 group 字段">分组雷达图</code>

## Spec

```json
{
  "type": "radar",
  "data": [
    { "name": "沟通能力", "value": 2 },
    { "name": "协作能力", "value": 3 },
    { "name": "领导能力", "value": 2 },
    { "name": "学习能力", "value": 5 },
    { "name": "创新能力", "value": 6 },
    { "name": "技术能力", "value": 9 }
  ]
}
```

## API

### RadarProps

| 属性  | 类型                                     | 是否必传 | 默认值    | 说明       |
| ----- | ---------------------------------------- | -------- | --------- | ---------- |
| data  | RadarDataItem[]                          | 是       | -         | 数据       |
| title | string                                   | 否       | -         | 图表的标题 |
| theme | "default" &#124; "dark" &#124; "academy" | 否       | "default" | 图表主题   |
| style | IStyle                                   | 否       | -         | 图表样式   |

### IStyle

| 属性            | 类型     | 是否必传 | 默认值 | 说明           |
| --------------- | -------- | -------- | ------ | -------------- |
| backgroundColor | string   | 否       | -      | 背景颜色       |
| palette         | string[] | 否       | -      | 颜色映射       |
| lineWidth       | number   | 否       | -      | 图形描边的宽度 |

### RadarDataItem

| 属性  | 类型   | 是否必传 | 默认值 | 说明         |
| ----- | ------ | -------- | ------ | ------------ |
| name  | string | 是       | -      | 数据分类名称 |
| value | number | 是       | -      | 数据的值     |
| group | string | 否       | -      | 数据分组名称 |
