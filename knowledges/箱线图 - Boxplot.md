## 图表属性

- 名称：箱线图
- 别名：盒须图，英文名 Boxplot
- 形状：矩形盒体，带上下须
- 图表类别：统计分布图表
- 图表功能：分布、离群值、极值展示

## 基础概念

箱线图是一种用于展示数据分布、集中趋势及离群值的统计图表。通过盒体表示数据的四分位数区间，上下须表示数据的极值范围，异常点以单独标记。适合直观比较不同组数据的分布特征。

## 适用场景

用于展示一组或多组数据的分布情况，如成绩分布、实验结果、金融数据等。适合突出数据的中位数、分布范围及异常值。

## 不适用场景

- 不适合仅有单一数值或数据量极少的场景，无法体现分布特征。
- 不适合展示时间序列的变化趋势，建议使用折线图或面积图。
- 不适合强调类别占比或结构组成，建议使用饼图、条形图等。
- 当关注的是数据的具体数值而非分布特性时，箱线图并非最佳选择。

## 图表用法

### 图表属性

```typescript
type Boxplot = {
  type: 'boxplot';
  data: {
    category: string;
    value: number;
    group?: string;
  }[];
  title?: string;
  theme?: 'default' | 'dark' | 'academy';
  style?: {
    backgroundColor?: string;
    plette?: string[];
  };
};
```

### 数据要求

- type：图表类型，必填，文本类型，值为 "boxplot"。
- data：箱线数据，必填，数组类型。
  - category：数据分类名称，必填，文本类型。
  - value：数据分类值，必填，数值类型。
  - group：数据分组名称，选填，文本类型，用于多组数据对比。
- title：图表标题，选填，文本类型。
- theme：图表主题，选填，文本类型，可选值为 "default" | "dark" | "academy"，默认值为 "default"。
- style：图表样式，选填，对象类型；
  - boxColor：盒体颜色，选填，文本类型，合法颜色值。
  - whiskerColor：须线颜色，选填，文本类型，合法颜色值。
  - outlierColor：异常值颜色，选填，文本类型，合法颜色值。
  - backgroundColor：背景颜色，选填，文本类型，合法颜色值。

## 使用示例

1. 展示一组成绩分布。

```json
{
  "type": "boxplot",
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
  "type": "boxplot",
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

3. 展示金融数据分布，自定义盒体和须线颜色。

```json
{
  "type": "boxplot",
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
    "boxColor": "#FF9800",
    "whiskerColor": "#2196F3",
    "backgroundColor": "#F5F5F5"
  }
}
```

4. 多组数据对比，帕尔默企鹅三种群体身高性别差异。

```json
{
  "type": "boxplot",
  "data": [
    { "category": "Adelie", "group": "MALE", "value": 181 },
    { "category": "Adelie", "group": "FEMALE", "value": 186 },
    { "category": "Adelie", "group": "MALE", "value": 190 },
    { "category": "Adelie", "group": "FEMALE", "value": 181 },
    { "category": "Adelie", "group": "MALE", "value": 191 },
    { "category": "Adelie", "group": "MALE", "value": 198 },
    { "category": "Adelie", "group": "FEMALE", "value": 185 },
    { "category": "Adelie", "group": "MALE", "value": 194 },
    { "category": "Adelie", "group": "FEMALE", "value": 174 },
    { "category": "Adelie", "group": "MALE", "value": 180 },
    { "category": "Adelie", "group": "FEMALE", "value": 189 },
    { "category": "Adelie", "group": "MALE", "value": 185 },
    { "category": "Adelie", "group": "FEMALE", "value": 187 },
    { "category": "Adelie", "group": "MALE", "value": 183 },
    { "category": "Adelie", "group": "FEMALE", "value": 172 },
    { "category": "Adelie", "group": "MALE", "value": 178 },
    { "category": "Adelie", "group": "FEMALE", "value": 188 },
    { "category": "Adelie", "group": "MALE", "value": 184 },
    { "category": "Adelie", "group": "FEMALE", "value": 195 },
    { "category": "Adelie", "group": "MALE", "value": 196 },
    { "category": "Adelie", "group": "FEMALE", "value": 180 },
    { "category": "Adelie", "group": "FEMALE", "value": 181 },
    { "category": "Adelie", "group": "MALE", "value": 184 },
    { "category": "Adelie", "group": "FEMALE", "value": 182 },
    { "category": "Adelie", "group": "MALE", "value": 195 },
    { "category": "Adelie", "group": "FEMALE", "value": 186 },
    { "category": "Adelie", "group": "MALE", "value": 196 },
    { "category": "Adelie", "group": "FEMALE", "value": 185 },
    { "category": "Adelie", "group": "MALE", "value": 190 },
    { "category": "Adelie", "group": "MALE", "value": 182 },
    { "category": "Adelie", "group": "FEMALE", "value": 190 }
  ],
  "title": "帕尔默企鹅三种群体身高性别差异"
}
```
