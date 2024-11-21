## 图表属性

- 名称：点标注地图
- 别名：标注地图，英文名：Pin Map、Scatter Map、 Dot Map、Point Annotation Map
- 图表类型：地图
- 图表功能：空间、分布

## 基础概念

点标注地图是一种将地理数据以点的形式标注在地图上的可视化图表。每个点代表一个特定的位置数据，并为其提供标签加以描述，如商店位置、事件发生地点、景点分布等。点标注地图便于用户直观地定位和查看与地点相关的数据。

从数据上来说，点标注地图至少需要地理位置的经度和纬度数据，一般还可以有标签字段对该点位进行描述。

## 适用场景

- 显示商店、餐厅、景点等地理位置数据。
- 可视化事件发生地点，如地震、火灾、交通事故等。
- 展示地理信息，如人口密集区、气候分布、地貌特征等。

## 不适用场景

- 城市或地区整体地理信息的呈现，应使用地图区域统计图表。
- 对地理范围内的数据分布进行精确分析时，应考虑使用热力图等更加细致的可视化图表。

## 图表用法

### 地图属性

```typescript
type PinMap = {
  type: 'pin-map';
  data: { longitude: number; latitude: number; label: string }[];
};
```

### 数据要求

- type：地图的类型，必填，文本类型，值必须为 "pin-map"
- data：地图点标注的数据，必填，数组对象类型；
  - longitude：地点的经度数值，必填，数值类型；
  - latitude：地点的纬度数值，必填，数值类型；
  - label：地点的标签，描述地点的信息，必填，文本类型；

## 使用示例

1. 在地图上标注我旅行地杭州和上海。

```json
{
  "type": "pin-map",
  "data": [
    { "longitude": 120.153576, "latitude": 30.287459, "label": "杭州" },
    { "longitude": 121.4737, "latitude": 31.2304, "label": "上海" }
  ]
}
```

2. 用点标注地图展示沿海城市的人口分布情况。

```json
{
  "type": "pin-map",
  "data": [
    {
      "longitude": 121.549792,
      "latitude": 29.868388,
      "label": "宁波人口：51 万"
    },
    { "longitude": 121.4737, "latitude": 31.2304, "label": "上海人口：151 万" },
    {
      "longitude": 120.672111,
      "latitude": 28.000575,
      "label": "温州人口：67 万"
    }
  ]
}
```

3. 用点标注地图可视化我的数据 [{ "location": [116.3974, 39.9087], "label": "北京", "information": "中国的首都" },{ "location": [121.4737, 31.2304], "label": "上海", "information": "中国的经济中心" }]

```json
{
  "type": "pin-map",
  "data": [
    { "longitude": 120.153576, "latitude": 30.287459, "label": "杭州" },
    { "longitude": 121.4737, "latitude": 31.2304, "label": "上海" }
  ]
}
```

4. 用点标注地图可视化我的数据 [{ title: '杨梅岭', longitude: 120.118362, latitude: 30.217175 },{ title: '理安寺', longitude: 120.112958, latitude: 30.207319 },{ title: '九溪烟树', longitude: 120.11335, latitude: 30.202395 }]

```json
{
  "type": "pin-map",
  "data": [
    { "label": "杨梅岭", "longitude": 120.118362, "latitude": 30.217175 },
    { "label": "理安寺", "longitude": 120.112958, "latitude": 30.207319 },
    { "label": "九溪烟树", "longitude": 120.11335, "latitude": 30.202395 }
  ]
}
```
