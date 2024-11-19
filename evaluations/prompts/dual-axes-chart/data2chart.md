
## 角色

你是一个 mock 图表数据生成器，生成[WIP]双轴图相关的可视化问答对数据。

## 任务

1. 结合可视化场景，随机生成[WIP]双轴图相关的可视化数据，主要内容为可视化的数据和用什么可视化图表，比如: “用双轴图可视化我的数据 [{ "year": 2020, "revenue": 500, "growth_rate": 10 }, { "year": 2021, "revenue": 600, "growth_rate": 12 }, { "year": 2022, "revenue": 700, "growth_rate": 15 }]”
2. 根据可视化相关问题，生成[WIP]双轴图图表的配置
3. 以 JSON 格式归纳为一条问答对数据，{"question": <可视化问题>,"answer": <图表的配置>}

## [WIP]双轴图图表知识库

### 图表属性
```typescript
type DualAxes = {
  type: "dual-axes";
  categories: string[];
  title?: string;
  axisXTitle?: string;
  series: seriesDataItem[];
}

type seriesDataItem = {
  type: "line" | "column";
  data: number[];
  axisYTitle?: string;
}

```

### 数据要求
+ type：图表的类型，必填，文本类型，值必须为 "dual-axes"
+ categories：图表的X轴的数组，必填，数组文本类型
+ title：图表的标题，选填，文本类型
+ axisXTitle：图表的X轴的标题，选填，文本类型
+ series：图表详细组合，必填，数组对象类型，每个对象代表一个基础图表，包含：
    - type：基础图表的类型，必填，"column"表示柱状图，"line"表示折线图
    - data：基础图表的数据，必填，数组数值类型
    - axisYTitle：基础图表的Y轴标题，选填，文本类型

## 参考例子

```json
[{"type":"data2chart","question":"用双轴图可视化我的数据 [{ \"year\": 2020, \"revenue\": 500, \"growth_rate\": 10 }, { \"year\": 2021, \"revenue\": 600, \"growth_rate\": 12 }, { \"year\": 2022, \"revenue\": 700, \"growth_rate\": 15 }]","answer":{"type":"dual-axes","categories":["2020","2021","2022"],"title":"2020-2022 Income and Growth Rate","axisXTitle":"Year","series":[{"type":"column","data":[500,600,700],"axisYTitle":"Income"},{"type":"line","data":[10,12,15],"axisYTitle":"Growth Rate"}]}},{"type":"data2chart","question":"用组合图可视化我的数据 [{ \"day\": \"20240501\", \"cnt\": 1000, \"growth_rate\": 10 }, { \"day\": \"20240502\", \"cnt\": 1200, \"growth_rate\": 12 }, { \"day\": \"20240503\", \"cnt\": 1500, \"growth_rate\": 16 }]","answer":{"type":"dual-axes","categories":["20240501","20240502","20240503"],"title":"五一期间景区人流量","axisXTitle":"日期","series":[{"type":"column","data":[1000,1200,1500],"axisYTitle":"人数"},{"type":"line","data":[10,12,16],"axisYTitle":"增长率"}]}}]
```

## 要求

- 请生成 5 条这样的记录，并以 JSON 格式输出。
