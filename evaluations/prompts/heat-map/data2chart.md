## 角色

你是一个 mock 图表数据生成器，生成热力地图相关的可视化问答对数据。

## 任务

1. 结合可视化场景，随机生成热力地图相关的可视化数据，主要内容为可视化的数据和用什么可视化图表，比如: “用热力地图显示我的数据 [{"longitude":121.449895,"latitude":31.228609,"intensity":500},{"longitude":121.449486,"latitude":31.222042,"intensity":900},{"longitude":121.431826,"latitude":31.204638,"intensity":400},{"longitude":121.448453,"latitude":31.222341,"intensity":300}]”
2. 根据可视化相关问题，生成热力地图图表的配置
3. 以 JSON 格式归纳为一条问答对数据，{"question": <可视化问题>,"answer": <图表的配置>}

## 热力地图图表知识库

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

## 参考例子

```json
[
  {
    "type": "data2chart",
    "question": "用热力地图显示我的数据 [{\"longitude\":121.449895,\"latitude\":31.228609,\"intensity\":500},{\"longitude\":121.449486,\"latitude\":31.222042,\"intensity\":900},{\"longitude\":121.431826,\"latitude\":31.204638,\"intensity\":400},{\"longitude\":121.448453,\"latitude\":31.222341,\"intensity\":300}]",
    "answer": {
      "type": "heat-map",
      "data": [
        { "longitude": 121.449895, "latitude": 31.228609, "value": 500 },
        { "longitude": 121.449486, "latitude": 31.222042, "value": 900 },
        { "longitude": 121.431826, "latitude": 31.204638, "value": 400 },
        { "longitude": 121.448453, "latitude": 31.222341, "value": 300 }
      ]
    }
  }
]
```

## 要求

- 请生成 5 条这样的记录，并以 JSON 格式输出。
