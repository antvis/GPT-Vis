## 图表属性

- 名称：双轴图
- 别名：组合图，英文名：DualAxes Chart
- 形状：柱形、折线
- 图表类别：组合图表
- 图表功能：多维度比较、趋势分析

## 基础概念

双轴图是一种结合两个不同图表类型的组合图表，通常是将柱状图与折线图结合起来显示。双轴图通过在一个图表中使用两个垂直 Y 轴（左侧和右侧），分别对应不同的数值维度。柱状图用于展示一组数据的大小或数量，而折线图则展示另一组数据的趋势。双轴图非常适合同时展示不同类型的数据变化趋势。

## 适用场景

- 同时展示两个具有不同数量级的数据，例如销售额和增长率。
- 比较两组变量的相对变化趋势，如同时观察某时间段内的销量和利润率。
- 数据维度不同且具有共同的 X 轴（例如时间、类别）。

## 不适用场景

- 数据类型相同且数量级相近时，单一类型图表（如折线图或柱状图）更简洁。
- 无法找到具有相关性的两个数据维度进行比较时，双轴图的价值会降低。

## 图表用法

### 图表属性

```typescript
type DualAxes = {
  type: 'dual-axes';
  categories: string[];
  title?: string;
  axisXTitle?: string;
  series: SeriesDataItem[];
};

type SeriesDataItem = {
  type: 'line' | 'column';
  data: number[];
  axisYTitle?: string;
};
```

### 数据要求

- type：图表的类型，必填，文本类型，值必须为 "dual-axes"。
- categories：图表的 X 轴的数组，必填，数组文本类型。
- title：图表的标题，选填，文本类型。
- axisXTitle：图表的 X 轴的标题，选填，文本类型。
- series：图表详细组合，必填，数组对象类型，每个对象代表一个基础图表，包含：
  - type：基础图表的类型，必填，"column"表示柱状图，"line"表示折线图；
  - data：基础图表的数据，必填，数组数值类型；
  - axisYTitle：基础图表的 Y 轴标题，选填，文本类型；

## 使用示例

1. 用双轴图展示某公司的年销售额与利润率，2018 年至 2022 年的销售额分别为 91.9 亿、99.1 亿、101.6 亿、114.4 亿、121 亿，利润率分别为 5.5%、6.0%、6.2%、7.0%、7.5%。

```json
{
  "type": "dual-axes",
  "categories": ["2018", "2019", "2020", "2021", "2022"],
  "title": "2018-2022销售额与利润率",
  "axisXTitle": "年份",
  "series": [
    {
      "type": "column",
      "data": [91.9, 99.1, 101.6, 114.4, 121],
      "axisYTitle": "销售额"
    },
    {
      "type": "line",
      "data": [0.055, 0.06, 0.062, 0.07, 0.075],
      "axisYTitle": "利润率"
    }
  ]
}
```

2. 用双轴图可视化我的数据 [{ "year": 2020, "revenue": 500, "growth_rate": 10 }, { "year": 2021, "revenue": 600, "growth_rate": 12 }, { "year": 2022, "revenue": 700, "growth_rate": 15 }]。

```json
{
  "type": "dual-axes",
  "categories": ["2020", "2021", "2022"],
  "title": "2020-2022 Income and Growth Rate",
  "axisXTitle": "Year",
  "series": [
    {
      "type": "column",
      "data": [500, 600, 700],
      "axisYTitle": "Income"
    },
    {
      "type": "line",
      "data": [10, 12, 15],
      "axisYTitle": "Growth Rate"
    }
  ]
}
```

3. 用组合图可视化我的数据 [{ "day": "20240501", "cnt": 1000, "growth_rate": 10 }, { "day": "20240502", "cnt": 1200, "growth_rate": 12 }, { "day": "20240503", "cnt": 1500, "growth_rate": 16 }]。

```json
{
  "type": "dual-axes",
  "categories": ["20240501", "20240502", "20240503"],
  "title": "五一期间景区人流量",
  "axisXTitle": "日期",
  "series": [
    {
      "type": "column",
      "data": [1000, 1200, 1500],
      "axisYTitle": "人数"
    },
    {
      "type": "line",
      "data": [10, 12, 16],
      "axisYTitle": "增长率"
    }
  ]
}
```
