## 图表属性

- 名称：条形图
- 别名：条形图，英文名：Bar Chart
- 形状：条形
- 图表类别：统计图表
- 图表功能：比较、分布、排名

## 基础概念

条形图是一种使用水平矩形条对不同类别进行数值比较的统计图表。与柱状图不同的是，条形图的矩形条是从左到右排列的，而不是从下到上。条形图同样需要一个分类变量和一个数值变量。在条形图上，分类变量的每个实体被表示为一个水平矩形条，而数值决定了矩形条的长度。

## 适用场景

条形图适合对分类数据进行比较，尤其是在分类名称较长，或当分类项数量较多的情况下，由于条形图的水平排列更便于显示这些类别。此外，条形图也更适合横向对比。

## 不适用场景

条形图不适合用于显示连续型变量之间的关系，且不适用于需要强调数值变化趋势时，因为条形图的重点在于分类间的比较。

## 图表用法

### 图表属性

```typescript
type Bar = {
  type: 'bar';
  data: { category: string; value: number; group?: string }[];
  group?: boolean;
  stack?: boolean;
  title?: string;
  axisXTitle?: string;
  axisYTitle?: string;
};
```

### 数据要求

- type：图表的类型，必填，文本类型，值必须为 "bar"。
- data：图表的数据，必填，数组对象类型；
  - category：数据分类名称，必填，文本或数值类型；
  - value：数据分类值，必填，数值类型；
  - group： 数据分组名称，选填，文本类型；
- group：是否开启分组，开启分组条形图需数据中含有 group 字段 ，选填，布尔类型。
- stack：是否开启堆叠，开启堆叠条形图需数据中含有 group 字段，选填，布尔类型。
- title: 图表的标题，选填，文本类型。
- axisXTitle：x 轴的标题，选填，文本类型。
- axisYTitle：y 轴的标题，选填，文本类型。

## 使用示例

1. 海底捞公司外卖收入的变化，2015 年收入金额 80 百万元，2016 年收入金额 140 百万元，2017 年收入金额 220 百万元。用条形图可视化。

```json
{
  "type": "bar",
  "data": [
    { "category": "2015 年", "value": 80 },
    { "category": "2016 年", "value": 140 },
    { "category": "2017 年", "value": 220 }
  ],
  "title": "海底捞公司外卖收入",
  "axisXTitle": "年份",
  "axisYTitle": "金额 （百万元）"
}
```

2. 用条形图可视化我的数据 [{ "name": "第一产业","industrial": 7200.0 },{ "name": "第二产业", "industrial": 36600.0 },{ "title": "第三产业" ,"industrial": 41000.0 }]。

```json
{
  "type": "bar",
  "data": [
    { "category": "第一产业", "value": 7200.0 },
    { "category": "第二产业", "value": 36600.0 },
    { "category": "第三产业", "value": 41000.0 }
  ],
  "axisXTitle": "name",
  "axisYTitle": "industrial"
}
```

3. 主要城市油车与新能源汽车的售卖量对比，北京分别是 825.6 万辆 与 60.2 万辆，上海分别是 450 万辆 与 95 万辆，深圳分别是 506 万辆 与 76.7 万辆，广州分别是 976.6 万辆 与 97.2 万辆，杭州分别是 651.2 万辆 与 62 万辆。用分组条形图可视化。

```json
{
  "type": "bar",
  "data": [
    { "category": "北京", "value": 825.6, "group": "油车" },
    { "category": "北京", "value": 60.2, "group": "新能源汽车" },
    { "category": "上海", "value": 450, "group": "油车" },
    { "category": "上海", "value": 95, "group": "新能源汽车" },
    { "category": "深圳", "value": 506, "group": "油车" },
    { "category": "深圳", "value": 76.7, "group": "新能源汽车" },
    { "category": "广州", "value": 976.6, "group": "油车" },
    { "category": "广州", "value": 97.2, "group": "新能源汽车" },
    { "category": "杭州", "value": 651.2, "group": "油车" },
    { "category": "杭州", "value": 62, "group": "新能源汽车" }
  ],
  "group": true,
  "title": "油车与新能源汽车售卖量",
  "axisXTitle": "城市",
  "axisYTitle": "售卖量 （万辆）"
}
```

4. 主要城市油车与新能源汽车的售卖量对比，北京分别是 825.6 万辆 与 60.2 万辆，上海分别是 450 万辆 与 95 万辆，深圳分别是 506 万辆 与 76.7 万辆，广州分别是 976.6 万辆 与 97.2 万辆，杭州分别是 651.2 万辆 与 62 万辆。用堆叠条形图可视化。

```json
{
  "type": "bar",
  "data": [
    { "category": "北京", "value": 825.6, "group": "油车" },
    { "category": "北京", "value": 60.2, "group": "新能源汽车" },
    { "category": "上海", "value": 450, "group": "油车" },
    { "category": "上海", "value": 95, "group": "新能源汽车" },
    { "category": "深圳", "value": 506, "group": "油车" },
    { "category": "深圳", "value": 76.7, "group": "新能源汽车" },
    { "category": "广州", "value": 976.6, "group": "油车" },
    { "category": "广州", "value": 97.2, "group": "新能源汽车" },
    { "category": "杭州", "value": 651.2, "group": "油车" },
    { "category": "杭州", "value": 62, "group": "新能源汽车" }
  ],
  "stack": true,
  "title": "油车与新能源汽车售卖量",
  "axisXTitle": "城市",
  "axisYTitle": "售卖量 （万辆）"
}
```

5. 用分组柱形图可视化我不同季度的销售数据，数据如下：{ 'Q1': { '2020': 10000, '2021': 12000 }, 'Q2': { '2020': 15000, '2021': 18000 }, 'Q3': { '2020': 20000, '2021': 25000 }, 'Q4': { '2020': 25000, '2021': 30000 } }。

```json
{
  "type": "bar",
  "data": [
    { "category": "2020", "value": 10000, "group": "Q1" },
    { "category": "2021", "value": 12000, "group": "Q1" },
    { "category": "2020", "value": 15000, "group": "Q2" },
    { "category": "2021", "value": 18000, "group": "Q2" },
    { "category": "2020", "value": 20000, "group": "Q3" },
    { "category": "2021", "value": 25000, "group": "Q3" },
    { "category": "2020", "value": 25000, "group": "Q4" },
    { "category": "2021", "value": 30000, "group": "Q4" }
  ],
  "group": true,
  "axisXTitle": "年份",
  "axisYTitle": "售量"
}
```
