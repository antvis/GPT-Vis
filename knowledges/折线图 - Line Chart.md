## 图表属性

- 名称：折线图
- 别名：线图，英文名 Line Chart
- 形状：折线
- 图表类别：统计图表
- 图表功能：比较、趋势

## 基础概念

折线图是是一个由笛卡尔坐标系（直角坐标系），一些点和线组成的统计图表，常用来表示数值随连续时间间隔或有序类别的变化。在折线图中，x 轴通常用作连续时间间隔或有序类别。y 轴用于量化的数据，如果为负值则绘制于 y 轴下方。连线用于连接两个相邻的数据点。

折线图用于分析事物随时间或有序类别而变化的趋势。从数据上来说，折线图需要一个连续时间字段或一个分类字段和至少一个连续数据字段。

## 适用场景

同一变量随时间或有序类别的变化，比如 2000 到 2016 年苹果电脑销售额在苹果利润的占比的变化趋势。

## 不适用场景

变量数值大多情况下为 0

## 图表用法

### 图表属性

```typescript
type Line = {
  type: 'line';
  data: { time: string | number; value: number; group?: string }[];
  title?: string;
  axisXTitle?: string;
  axisYTitle?: string;
};
```

### 数据要求

- type：图表的类型，必填，文本类型，值必须为 "line"。
- data：图表的数据，必填，数组对象类型；
  - time：数据的时序名称 ，必填，文本或数值类型；
  - value：数据的值，必填，数值类型；
  - group：数据分组名称，选填，文本类型；
- title: 图表的标题，选填，文本类型。
- axisXTitle：x 轴的标题，选填，文本类型。
- axisYTitle：y 轴的标题，选填，文本类型。

## 使用示例

1. 我国出生人口，2015 年出生人口 1700 万人，2016 年出生人口 1500 万人，2017 年出生人口 1200 万人。用折线图可视化。

```json
{
  "type": "line",
  "data": [
    { "time": "2015 年", "value": 1700 },
    { "time": "2016 年", "value": 1500 },
    { "time": "2017 年", "value": 1200 }
  ],
  "title": "出生人口变化",
  "axisXTitle": "年份",
  "axisYTitle": "出生人口（万人）"
}
```

2. 我国出生人口与死亡人口，2015 年分别是 1700 万人与 965 万人，2016 年分别是出生人口 1500 万人与 846 万人，2017 年分别是出生人口 1200 万人与 782 万人。用多折线图可视化。

```json
{
  "type": "line",
  "data": [
    { "time": "2015 年", "value": 1700, "group": "出生人口" },
    { "time": "2015 年", "value": 965, "group": "死亡人口" },
    { "time": "2016 年", "value": 1500, "group": "出生人口" },
    { "time": "2016 年", "value": 846, "group": "死亡人口" },
    { "time": "2017 年", "value": 1200, "group": "出生人口" },
    { "time": "2017 年", "value": 782, "group": "死亡人口" }
  ],
  "title": "出生人口与死亡人口变化",
  "axisXTitle": "年份",
  "axisYTitle": "人口（万人）"
}
```

3. 用折线图可视化我的数据 [{ "year": 2015,"industrial": 7200.0 },{ "year": 2016, "industrial": 3660.0 },{ "year": 2017 ,"industrial": 4100.0 }]。

```json
{
  "type": "line",
  "data": [
    { "time": 2015, "value": 7200.0 },
    { "time": 2016, "value": 3660.0 },
    { "time": 2017, "value": 4100.0 }
  ],
  "axisXTitle": "year",
  "axisYTitle": "industrial"
}
```

4. 用折线图可视化我的数据 [{"quarter":"Q1","sales":1540,"product":"家具"},{"quarter":"Q1","sales":2540,"product":"电子产品"},{"quarter":"Q1","sales":500,"product":"办公用品"},{"quarter":"Q2","sales":2000,"product":"家具"},{"quarter":"Q2","sales":3000,"product":"电子产品"},{"quarter":"Q2","sales":1000,"product":"办公用品"},{"quarter":"Q3","sales":4500,"product":"家具"},{"quarter":"Q3","sales":6500,"product":"电子产品"},{"quarter":"Q3","sales":2500,"product":"办公用品"}]。

```json
{
  "type": "line",
  "data": [
    { "time": "Q1", "value": 1540.0, "group": "家具" },
    { "time": "Q1", "value": 2540.0, "group": "电子产品" },
    { "time": "Q1", "value": 500.0, "group": "办公用品" },
    { "time": "Q2", "value": 2000.0, "group": "家具" },
    { "time": "Q2", "value": 3000.0, "group": "电子产品" },
    { "time": "Q2", "value": 1000.0, "group": "办公用品" },
    { "time": "Q3", "value": 4500.0, "group": "家具" },
    { "time": "Q3", "value": 6500.0, "group": "电子产品" },
    { "time": "Q3", "value": 2500.0, "group": "办公用品" }
  ],
  "axisXTitle": "quarter",
  "axisYTitle": "sales"
}
```
