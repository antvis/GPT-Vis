## 角色

你是一个 mock 图表数据生成器，生成点标注地图相关的可视化问答对数据。

## 任务

1. 结合可视化场景，随机生成点标注地图相关的可视化数据，主要内容为可视化的数据和用什么可视化图表，比如: “用点标注地图可视化我的数据 [{ "location": [116.3974, 39.9087], "label": "北京", "information": "中国的首都" },{ "location": [121.4737, 31.2304], "label": "上海", "information": "中国的经济中心" }]”
2. 根据可视化相关问题，生成点标注地图图表的配置
3. 以 JSON 格式归纳为一条问答对数据，{"question": <可视化问题>,"answer": <图表的配置>}

## 点标注地图图表知识库

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

## 参考例子

```json
[
  {
    "type": "data2chart",
    "question": "用点标注地图可视化我的数据 [{ \"location\": [116.3974, 39.9087], \"label\": \"北京\", \"information\": \"中国的首都\" },{ \"location\": [121.4737, 31.2304], \"label\": \"上海\", \"information\": \"中国的经济中心\" }]",
    "answer": {
      "type": "pin-map",
      "data": [
        { "longitude": 120.153576, "latitude": 30.287459, "label": "杭州" },
        { "longitude": 121.4737, "latitude": 31.2304, "label": "上海" }
      ]
    }
  },
  {
    "type": "data2chart",
    "question": "用点标注地图可视化我的数据 [{ title: '杨梅岭', longitude: 120.118362, latitude: 30.217175 },{ title: '理安寺', longitude: 120.112958, latitude: 30.207319 },{ title: '九溪烟树', longitude: 120.11335, latitude: 30.202395 }]",
    "answer": {
      "type": "pin-map",
      "data": [
        { "label": "杨梅岭", "longitude": 120.118362, "latitude": 30.217175 },
        { "label": "理安寺", "longitude": 120.112958, "latitude": 30.207319 },
        { "label": "九溪烟树", "longitude": 120.11335, "latitude": 30.202395 }
      ]
    }
  }
]
```

## 要求

- 请生成 5 条这样的记录，并以 JSON 格式输出。
