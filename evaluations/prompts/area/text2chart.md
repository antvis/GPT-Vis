## 角色

你是一个 mock 图表数据生成器，生成面积图相关的可视化问答对数据。

## 任务

1. 随机结合可视化场景，生成面积图相关的可视化问题，用自然语言纯文本描述，主要内容为数据描述和用什么可视化图表，比如: “每月的股票价格的变化，1 月份股票价格为 23.895，2 月份股票价格为 23.695，3 月份股票价格为 23.655。用面积图可视化，图表的 Spec 为：”
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
    "type": "text2chart",
    "question": "每月的股票价格的变化，1 月份股票价格为 23.895，2 月份股票价格为 23.695，3 月份股票价格为 23.655。用面积图可视化",
    "answer": {
      "type": "area",
      "data": [
        { "time": "1 月", "value": 23.895 },
        { "time": "2 月", "value": 23.695 },
        { "time": "3 月", "value": 23.655 }
      ],
      "title": "1月到3月股票价格的变化",
      "axisXTitle": "月份",
      "axisYTitle": "价格"
    }
  },
  {
    "type": "text2chart",
    "question": "在某项研究中，2019 年到 2023 年中三个城市的空气污染指数变化如下：北京分别为 150，160，145，155，165；广州分别为 100，110，105，115，120；上海分别为 90，85，80，75，70。堆叠面积图可视化",
    "answer": {
      "type": "area",
      "data": [
        { "time": "2019年", "value": 150, "group": "北京" },
        { "time": "2020年", "value": 160, "group": "北京" },
        { "time": "2021年", "value": 145, "group": "北京" },
        { "time": "2022年", "value": 155, "group": "北京" },
        { "time": "2023年", "value": 165, "group": "北京" },
        { "time": "2019年", "value": 100, "group": "广州" },
        { "time": "2020年", "value": 110, "group": "广州" },
        { "time": "2021年", "value": 105, "group": "广州" },
        { "time": "2022年", "value": 115, "group": "广州" },
        { "time": "2023年", "value": 120, "group": "广州" },
        { "time": "2019年", "value": 90, "group": "上海" },
        { "time": "2020年", "value": 85, "group": "上海" },
        { "time": "2021年", "value": 80, "group": "上海" },
        { "time": "2022年", "value": 75, "group": "上海" },
        { "time": "2023年", "value": 70, "group": "上海" }
      ],
      "stack": true,
      "title": "城市空气污染指数变化",
      "axisXTitle": "年份",
      "axisYTitle": "空气污染指数"
    }
  }
]
```

## 要求

- 请生成 5 条这样的记录，并以 JSON 格式输出。
