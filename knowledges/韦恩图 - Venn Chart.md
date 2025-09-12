## 图表属性

- 名称：韦恩图
- 别名：维恩图、英文名 Venn Chart
- 形状：圆形（多个圆交叠）
- 图表类别：集合关系图表
- 图表功能：集合交集、并集、补集展示

## 基础概念

韦恩图是一种用多个交叠圆形表示集合关系的图表。每个圆代表一个集合，圆之间的重叠区域表示集合的交集，非重叠部分表示集合的独有元素。韦恩图直观展示集合之间的交集、并集和补集，常用于集合运算、分类分析等场景。

## 适用场景

用于展示集合之间的关系，如数据分类、属性重叠、用户群体交集等。适合分析集合的交集、并集、补集等关系，常见于数学、统计、市场分析等领域。

## 不适用场景

1. 不适合展示大量集合或复杂集合关系（超过 3~4 个集合时可读性下降）。
2. 不适合用于展示数值型数据的趋势或分布。
3. 当需要精确展示集合元素数量时，建议使用矩阵图或柱状图。

## 图表用法

### 图表属性

```typescript
type Venn = {
  type: 'venn';
  data: {
    sets: string[];
    value: number;
    label?: string;
  }[];
  title?: string;
  theme?: 'default' | 'dark' | 'academy';
  style?: {
    backgroundColor?: string;
    palette?: string[];
  };
};
```

### 数据要求

- type：图表类型，必填，文本类型，值为 "venn"。
- data: 数据，必填，数组类型，包含 sets、value 以及 label 三个字段；
  - sets：集合标识，必填，字符串数组类型，表示该数据项所属的集合，可以是单个集合或多个集合的组合。
  - value：集合大小，必填，数值类型，表示该集合或集合交集的大小。
  - label：集合标签，选填，文本类型，表示该集合或集合交集的名称。
- title：图表标题，选填，文本类型。
- theme：图表主题，选填，文本类型，可选值为 "default" | "dark" | "academy"，默认值为 "default"。
- style：图表样式，选填，对象类型；
  - backgroundColor：背景颜色，选填，文本类型，合法颜色值。
  - palette：颜色映射，选填，数组类型，合法颜色值数组。

## 使用示例

1. 展示两个集合的交集关系。

```json
{
  "type": "venn",
  "data": [
    { "sets": ["A"], "value": 20, "label": "集合A" },
    { "sets": ["B"], "value": 15, "label": "集合B" },
    { "sets": ["A", "B"], "value": 5, "label": "交集AB" }
  ],
  "title": "集合交集示例"
}
```

2. 展示三个集合的交集和并集关系，主题为 dark。

```json
{
  "type": "venn",
  "data": [
    { "sets": ["A"], "value": 10, "label": "集合A" },
    { "sets": ["B"], "value": 8, "label": "集合B" },
    { "sets": ["C"], "value": 6, "label": "集合C" },
    { "sets": ["A", "B"], "value": 4 },
    { "sets": ["A", "C"], "value": 2 },
    { "sets": ["B", "C"], "value": 1 },
    { "sets": ["A", "B", "C"], "value": 1 }
  ],
  "title": "三集合关系",
  "theme": "dark"
}
```

3. 展示集合关系并自定义颜色和背景色。

```json
{
  "type": "venn",
  "data": [
    { "sets": ["A"], "value": 30, "label": "购买手机" },
    { "sets": ["B"], "value": 25, "label": "购买耳机" },
    { "sets": ["A", "B"], "value": 10 }
  ],
  "title": "标签交集",
  "style": {
    "palette": ["#FFB6C1", "#87CEFA"],
    "backgroundColor": "#F8F8FF"
  }
}
```
