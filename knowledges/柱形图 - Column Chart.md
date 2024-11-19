## 图表属性

- 名称：柱形图
- 别名：柱状图，英文名：Column Chart
- 形状：柱形
- 图表类别：统计图表
- 图表功能：比较、分布、排名

## 基础概念

柱状图，是一种使用柱形条，对不同类别进行数值比较的统计图表。最基础的柱形图，需要一个分类变量和一个数值变量。在柱状图上，分类变量的每个实体都被表示为一个矩形（通俗讲即为“柱子”），而数值则决定了柱子的高度。

## 适用场景

柱状图最适合对分类的数据进行比较。尤其是当数值比较接近时，由于人眼对于高度的感知优于其他视觉元素（如面积、角度等），因此，使用柱状图更加合适。

## 不适用场景

柱状图要求至少一个分类变量，它们之间是离散的，不能是连续型变量。

## 图表用法

### 图表属性

```typescript
type Column = {
  type: 'column';
  data: { category: string; value: number; group?: string }[];
  group?: boolean;
  stack?: boolean;
  title?: string;
  axisXTitle?: string;
  axisYTitle?: string;
};
```

### 数据要求

- type：图表的类型，必填，文本类型，值必须为 "column"。
- data：图表的数据，必填，数组对象类型；
  - category：数据分类名称，必填，文本类型；
  - value：数据分类值，必填，数值类型；
  - group： 数据分组名称，选填，文本类型；
- group：是否开启分组，开启分组柱形图需数据中含有 group 字段 ，选填，布尔类型。
- stack：是否开启堆叠，开启堆叠柱形图需数据中含有 group 字段，选填，布尔类型。
- title: 图表的标题，选填，文本类型。
- axisXTitle：x 轴的标题，选填，文本类型。
- axisYTitle：y 轴的标题，选填，文本类型。

## 使用示例

1. 海底捞公司外卖收入的变化，2015 年收入金额 80 百万元，2016 年收入金额 140 百万元，2017 年收入金额 220 百万元。用柱形图可视化。

```json
{
  "type": "column",
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

2. 用柱形图可视化我的数据 [{ "title": "第一产业","industrial": 7200.0 },{ "title": "第二产业", "industrial": 36600.0 },{ "title": "第三产业" ,"industrial": 41000.0 }]。

```json
{
  "type": "column",
  "data": [
    { "category": "第一产业", "value": 7200.0 },
    { "category": "第二产业", "value": 36600.0 },
    { "category": "第三产业", "value": 41000.0 }
  ],
  "axisXTitle": "title",
  "axisYTitle": "industrial"
}
```

3. 主要城市油车与新能源汽车的售卖量对比，北京分别是 825.6 万辆 与 60.2 万辆，上海分别是 450 万辆 与 95 万辆，深圳分别是 506 万辆 与 76.7 万辆，广州分别是 976.6 万辆 与 97.2 万辆，杭州分别是 651.2 万辆 与 62 万辆。用分组柱形图可视化。

```json
{
  "type": "column",
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

4. 主要城市油车与新能源汽车的售卖量对比，北京分别是 825.6 万辆 与 60.2 万辆，上海分别是 450 万辆 与 95 万辆，深圳分别是 506 万辆 与 76.7 万辆，广州分别是 976.6 万辆 与 97.2 万辆，杭州分别是 651.2 万辆 与 62 万辆。用堆叠柱形图可视化。

```json
{
  "type": "column",
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
  "title": "油车与新能源汽的售卖量",
  "axisXTitle": "城市",
  "axisYTitle": "售卖量 （万辆）"
}
```
