---
order: 1
group:
  order: 2
  title: 地图
demo: { cols: 2 }
toc: content
---

# PinMap 点标注地图

点标注地图，用于可视化展示 POI 点位数据。

## 代码演示

<code src='./demos/default.tsx'>默认地图</code>
<code src='./demos/marker.tsx'>自定义样式</code>

<code src='./demos/markdown.tsx'>使用 Markdown 协议</code>

## Spec

```js
{
  "type": "pin-map",
   "data": [
    { label: '杨梅岭', longitude: 120.118362, latitude: 30.217175 },
    { label: '理安寺', longitude: 120.112958, latitude: 30.207319 },
    { label: '九溪烟树', longitude: 120.11335, latitude: 30.202395 },
    { label: '飞来峰', longitude: 120.100549, latitude: 30.236875 },
    { label: '灵隐寺', longitude: 120.101406, latitude: 30.240826 },
    { label: '天竺三寺', longitude: 120.105337, latitude: 30.236818 },
    { label: '杭州植物园', longitude: 120.116979, latitude: 30.252876 },
    { label: '杭州花圃', longitude: 120.127654, latitude: 30.245663 },
    { label: '苏堤', longitude: 120.135764, latitude: 30.251448 },
    { label: '虎跑公园', longitude: 120.130095, latitude: 30.207505 },
    { label: '玉皇飞云', longitude: 120.145323, latitude: 30.214993 },
    { label: '长桥公园', longitude: 120.155057, latitude: 30.232985 },
  ]
}

```

## API

### PinMapProps

| 属性        | 类型         | 是否必传 | 默认值 | 说明       |
| ----------- | ------------ | -------- | ------ | ---------- |
| data        | MarkerData[] | 是       | -      | 数据       |
| markerStyle | Marker       | 否       | -      | 标记点样式 |

### MarkerData

| 属性      | 类型   | 是否必传 | 默认值 | 说明     |
| --------- | ------ | -------- | ------ | -------- |
| longitude | number | 是       | -      | 经度     |
| latitude  | number | 是       | -      | 纬度     |
| label     | number | 是       | -      | 文字标注 |
