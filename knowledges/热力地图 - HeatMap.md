## 图表属性

- 名称：热力地图
- 别名：热力图，密度图，英文名：Heat Map、Density Map
- 图表类型：地图
- 图表功能：空间、分布、趋势、密度

## 基础概念

热力地图是一种通过颜色渐变来展示地理位置数据强度或密度的可视化图表。它利用颜色的深浅变化，帮助用户识别数据在地理空间上的分布和集中趋势。热力地图适用于显示大量数据点的分布模式，可以清晰地识别出热点区域和趋势。

从数据上来说，热力地图需要地理位置的经度和纬度数据，还需要一个字段强度值来表示不同地点的权重。

## 适用场景

- 可视化商店、餐馆、景点、交通流量等热门地理位置。
- 可视化人流、车流或其他移动对象的密集程度。

## 不适用场景

- 显示具体地点的位置信息时，点标注地图可能更适合。
- 在处理非常稀疏的数据集时，热力地图可能无法有效传达信息，因为大部分区域将显示为最低级别的颜色。
- 当需要查看行政区域热度，区域地图可能是更好的选择。

## 图表用法

### 地图属性

```typescript
type HeatMap = {
  type: 'heat-map';
  data: { longitude: number; latitude: number; value: number }[];
};
```

### 数据要求

- type：地图的类型，必填，文本类型，值必须为 "heat-map"
- data：热力地图的数据，必填，数组对象类型；
  - longitude：地点的经度数值，必填，数值类型；
  - latitude：地点的纬度数值，必填，数值类型；
  - value：数据的强度或密度，必填，数值类型；

## 使用示例

1. 用热力图在地图上显示杭州市交通事故频发次数。

```json
{
  "type": "heat-map",
  "data": [
    { "longitude": 116.3974, "latitude": 39.9087, "value": 5 },
    { "longitude": 121.4737, "latitude": 31.2304, "value": 3 }
  ]
}
```

2. 用热力图在地图显示上海市游客量较大的景点。

```json
{
  "type": "heat-map",
  "data": [
    { "longitude": 121.474856, "latitude": 31.249162, "value": 800 },
    { "longitude": 121.449895, "latitude": 31.228609, "value": 500 },
    { "longitude": 121.449486, "latitude": 31.222042, "value": 900 }
  ]
}
```

3. 用热力地图显示我的数据 [{"longitude":121.449895,"latitude":31.228609,"intensity":500},{"longitude":121.449486,"latitude":31.222042,"intensity":900},{"longitude":121.431826,"latitude":31.204638,"intensity":400},{"longitude":121.448453,"latitude":31.222341,"intensity":300}]

```json
{
  "type": "heat-map",
  "data": [
    { "longitude": 121.449895, "latitude": 31.228609, "value": 500 },
    { "longitude": 121.449486, "latitude": 31.222042, "value": 900 },
    { "longitude": 121.431826, "latitude": 31.204638, "value": 400 },
    { "longitude": 121.448453, "latitude": 31.222341, "value": 300 }
  ]
}
```
