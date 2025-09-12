## 图表属性

- 名称：小提琴图
- 别名：Violin Chart
- 形状：对称分布曲线，类似小提琴
- 图表类别：统计分布图表
- 图表功能：分布、密度、极值展示

## 基础概念

小提琴图是一种用于展示数据分布和概率密度的统计图表。通过对称的密度曲线展示数据的分布形态，同时可结合箱线图元素显示中位数和四分位数。适合直观比较不同组数据的分布和密度特征。

## 适用场景

用于展示一组或多组数据的分布和密度情况，如成绩分布、实验结果、金融数据等。适合突出数据的分布形态、集中趋势及异常值。

## 不适用场景

1. 不适合展示单一数值或简单占比。
2. 不适合用于展示时间序列趋势。
3. 当需要展示类别占比或结构时，建议使用饼图或条形图。

## 图表用法

### 图表属性

```typescript
type ViolinChart = {
  type: 'violin';
  data: {
    category: string;
    value: number;
    group?: string;
  }[];
  categories?: string[];
  title?: string;
  theme?: 'default' | 'dark' | 'academy';
  style?: {
    backgroundColor?: string;
    plette?: string[];
  };
};
```

### 数据要求

- type：图表类型，必填，文本类型，值为 "violin"。
- data：小提琴图数据，必填，数组类型。
  - category：数据分类名称，必填，文本类型。
  - value：数据分类值，必填，数值类型。
  - group：数据分组名称，选填，文本类型，用于多组数据对比。
- title：图表标题，选填，文本类型。
- theme：图表主题，选填，文本类型，可选值为 "default" | "dark" | "academy"，默认值为 "default"。
- style：图表样式，选填，对象类型；
  - plette：颜色映射，选填，数组类型，合法颜色值数组。
  - backgroundColor：背景颜色，选填，文本类型，合法颜色值。

## 使用示例

1. 展示一组成绩分布。

```json
{
  "type": "violin",
  "data": [
    { "category": "班级A", "value": 15 },
    { "category": "班级A", "value": 18 },
    { "category": "班级A", "value": 22 },
    { "category": "班级A", "value": 27 },
    { "category": "班级A", "value": 35 },
    { "category": "班级B", "value": 10 },
    { "category": "班级B", "value": 14 },
    { "category": "班级B", "value": 19 },
    { "category": "班级B", "value": 23 },
    { "category": "班级B", "value": 30 }
  ],
  "title": "成绩分布"
}
```

2. 展示三组实验数据分布，主题为 dark。

```json
{
  "type": "violin",
  "data": [
    { "category": "实验组1", "value": 12 },
    { "category": "实验组1", "value": 15 },
    { "category": "实验组1", "value": 20 },
    { "category": "实验组1", "value": 25 },
    { "category": "实验组1", "value": 30 },
    { "category": "实验组2", "value": 18 },
    { "category": "实验组2", "value": 22 },
    { "category": "实验组2", "value": 28 },
    { "category": "实验组2", "value": 35 },
    { "category": "实验组2", "value": 40 },
    { "category": "实验组3", "value": 14 },
    { "category": "实验组3", "value": 19 },
    { "category": "实验组3", "value": 24 },
    { "category": "实验组3", "value": 29 },
    { "category": "实验组3", "value": 34 }
  ],
  "title": "实验数据分布",
  "theme": "dark"
}
```

3. 展示金融数据分布，使用自定义调色板和背景色。

```json
{
  "type": "violin",
  "data": [
    { "category": "股票A", "value": 50 },
    { "category": "股票A", "value": 55 },
    { "category": "股票A", "value": 60 },
    { "category": "股票A", "value": 65 },
    { "category": "股票A", "value": 70 },
    { "category": "股票B", "value": 45 },
    { "category": "股票B", "value": 50 },
    { "category": "股票B", "value": 55 },
    { "category": "股票B", "value": 60 },
    { "category": "股票B", "value": 65 }
  ],
  "title": "金融数据分布",
  "style": {
    "palette": ["#FF9800", "#2196F3", "#F5F5F5"],
    "backgroundColor": "#333333"
  }
}
```
