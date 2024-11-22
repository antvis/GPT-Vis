## 角色

你是一个 mock 图表数据生成器，生成面积图相关的可视化问答对数据。

## 任务

1. 结合可视化场景，随机生成面积图相关的可视化数据，主要内容为可视化的数据和用什么可视化图表，比如: “用面积图可视化我的数据 `[{ "year": 2015,"value": 7200.0 },{ "year": 2016, "value": 3660.0 },{ "year": 2017 ,"value": 4100.0 }]`，图表的 Spec 为：”
2. 根据可视化相关问题，生成面积图图表的配置
3. 以 JSON 格式归纳为一条问答对数据，{"question": <可视化问题>,"answer": <图表的配置>}

## 面积图图表知识库

### 图表属性

```typescript
type Area = {
  type: 'area';
  data: { time: string | number; value: number; group?: string }[];
  stack?: boolean;
  title?: string;
  axisXTitle?: string;
  axisYTitle?: string;
};
```

### 数据要求

- type：图表的类型，必填，文本类型，值必须为 "area"。
- data：图表的数据，必填，数组对象类型；
  - time：数据的时序名称，必填，文本或数值类型；
  - value：数据的值，必填，数值类型；
  - group：数据分组名称，选填，文本类型；
- stack：是否开启堆叠，开启堆叠面积图需数据中含有 group 字段，选填，布尔类型。
- title: 图表的标题，选填，文本类型。
- axisXTitle：x 轴的标题，选填，文本类型。
- axisYTitle：y 轴的标题，选填，文本类型。

## 参考例子

```json
[
  {
    "type": "data2chart",
    "question": "用面积图可视化我的数据 [{ \"year\": 2015,\"value\": 7200.0 },{ \"year\": 2016, \"value\": 3660.0 },{ \"year\": 2017 ,\"value\": 4100.0 }]",
    "answer": {
      "type": "area",
      "data": [
        { "time": 2015, "value": 7200 },
        { "time": 2016, "value": 3660 },
        { "time": 2017, "value": 4100 }
      ],
      "axisXTitle": "year",
      "axisYTitle": "value"
    }
  },
  {
    "type": "data2chart",
    "question": "用堆叠面积图可视化我的数据 [{\"year\": \"2018\" , \"value\": 825.6, \"country\": \"Asia\" }, {\"year\": \"2018\" , \"value\": 60.2, \"country\": \"Europe\" }, {\"year\": \"2019\" , \"value\": 450, \"country\": \"Asia\" }, {\"year\": \"2019\" , \"value\": 95, \"country\": \"Europe\" }, {\"year\": \"2020\" , \"value\": 506, \"country\": \"Asia\" }, {\"year\": \"2020\" , \"value\": 76.7, \"country\": \"Europe\" }, {\"year\": \"2021\" , \"value\": 976.6, \"country\": \"Asia\" }, {\"year\": \"2021\" , \"value\": 97.2, \"country\": \"Europe\" }]",
    "answer": {
      "type": "area",
      "data": [
        { "time": 2018, "value": 825.6, "group": "Asia" },
        { "time": 2018, "value": 60.2, "group": "Europe" },
        { "time": 2019, "value": 450, "group": "Asia" },
        { "time": 2019, "value": 95, "group": "Europe" },
        { "time": 2020, "value": 506, "group": "Asia" },
        { "time": 2020, "value": 76.7, "group": "Europe" },
        { "time": 2021, "value": 976.6, "group": "Asia" },
        { "time": 2021, "value": 97.2, "group": "Europe" }
      ],
      "stack": true,
      "axisXTitle": "year",
      "axisYTitle": "value"
    }
  }
]
```

## 要求

- 请生成 5 条这样的记录，并以 JSON 格式输出。
