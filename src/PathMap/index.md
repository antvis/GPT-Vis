---
order: 2
group:
  order: 2
  title: 地图
demo: { cols: 2 }
toc: content
---

# PathMap 路径地图

路径地图，用于可视化路径线路数据。

## 代码演示

<code src='./demos/default.tsx'>默认地图</code>
<code src='./demos/line.tsx'>自定义样式</code>

<code src='./demos/markdown.tsx'>使用 Markdown 协议</code>

## Spec

```json
{
  "type": "path-map",
  "data": [
    {
      "path": {
        "points": [
          {
            "longitude": 120.130638,
            "latitude": 30.219835,
            "label": "石屋洞"
          },
          {
            "longitude": 120.128125,
            "latitude": 30.219386,
            "label": "满觉陇"
          },
          {
            "longitude": 120.118362,
            "latitude": 30.217175,
            "label": "杨梅岭"
          },
          {
            "longitude": 120.112958,
            "latitude": 30.207319,
            "label": "理安寺"
          },
          {
            "longitude": 120.11335,
            "latitude": 30.202395,
            "label": "九溪烟树"
          }
        ]
      },
      "markers": [
        {
          "longitude": 120.130638,
          "latitude": 30.219835,
          "label": "石屋洞"
        },
        {
          "longitude": 120.128125,
          "latitude": 30.219386,
          "label": "满觉陇"
        },
        {
          "longitude": 120.118362,
          "latitude": 30.217175,
          "label": "杨梅岭"
        },
        {
          "longitude": 120.112958,
          "latitude": 30.207319,
          "label": "理安寺"
        },
        {
          "longitude": 120.11335,
          "latitude": 30.202395,
          "label": "九溪烟树"
        }
      ]
    },
    {
      "path": {
        "points": [
          {
            "longitude": 120.100549,
            "latitude": 30.236875,
            "label": "飞来峰"
          },
          {
            "longitude": 120.101406,
            "latitude": 30.240826,
            "label": "灵隐寺"
          },
          {
            "longitude": 120.105337,
            "latitude": 30.236818,
            "label": "天竺三寺"
          }
        ]
      },
      "markers": [
        {
          "longitude": 120.100549,
          "latitude": 30.236875,
          "label": "飞来峰"
        },
        {
          "longitude": 120.101406,
          "latitude": 30.240826,
          "label": "灵隐寺"
        },
        {
          "longitude": 120.105337,
          "latitude": 30.236818,
          "label": "天竺三寺"
        }
      ]
    }
  ]
}
```

## API

### PathMapProps

| 属性        | 类型       | 是否必传 | 默认值 | 说明       |
| ----------- | ---------- | -------- | ------ | ---------- |
| data        | RoutData[] | 是       | -      | 数据       |
| markerStyle | Marker     | 否       | -      | 标记点样式 |
| pathStyle   | Polyline   | 否       | -      | 线样式     |

### RoutData

| 属性    | 类型         | 是否必传 | 默认值 | 说明     |
| ------- | ------------ | -------- | ------ | -------- |
| markers | MarkerData[] | 否       | -      | 路径标注 |
| path    | Polyline     | 是       | -      | 路径轨迹 |

### Polyline

| 属性       | 类型     | 是否必传 | 默认值 | 说明     |
| ---------- | -------- | -------- | ------ | -------- |
| points     | LngLat[] | 是       | -      | 路径标注 |
| width      | Polyline | 否       | 2      | 轨迹宽度 |
| color      | string   | 否       | #16f   | 颜色     |
| dottedLine | boolean  | 否       | false  | 是否虚线 |

### MarkerData

| 属性      | 类型   | 是否必传 | 默认值 | 说明     |
| --------- | ------ | -------- | ------ | -------- |
| longitude | number | 是       | -      | 经度     |
| latitude  | number | 是       | -      | 纬度     |
| label     | number | 是       | -      | 文字标注 |
