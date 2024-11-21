## 图表属性

- 名称：雷达图
- 别名：雷达图，英文名：Radar Chart
- 形状：圆形
- 图表类别：统计图表
- 图表功能：比较

## 基础概念

雷达图是一种显示多变量数据的图。通常从表同一中心点开始等角度间隔地射出三个以上的轴，每个轴代表一个定量变量，各轴上的点依次连接成线或几何图形。雷达图可以用来在变量间进行对比，或者查看变量中有没有异常值。另外，多幅雷达图之间或者雷达图的多层数据线之间，还可以进行总体数值情况的对比。

## 适用场景

- 某一数据对象由多个特征类别构成，比如食品的营养成分（糖、维生素、矿物质、脂肪、水）。
- 数据特征类别是有限的，并且都可以进行归一化或者能被离散化。

## 不适用场景

- 数据对象中的分类过多，或者不可在统一程度上标准化的情况。
- 雷达图中层叠的多边形过多的情况。

## 图表用法

### 图表属性

```typescript
type Radar = {
  type: 'radar';
  data: { name: number; value: number; group?: string }[];
};
```

### 数据要求

- type：图表的类型，必填，文本类型，值必须为 "radar"。
- data：图表的数据，必填，数组对象类型；
  - name：数据分类名称，必填，文本类型；
  - value：分类的数值大小，必填，数值类型；
  - group：数据分组名称，选填，文本类型；

## 使用示例

1. 小明对自己进行能力评估：沟通能力 2 分、协作能力 3 分、领导能力 2 分、学习能力 5 分、创新能力 6 分、技术能力 9 分，用雷达图可视化：

```json
{
  "type": "radar",
  "data": [
    { "name": "沟通能力", "value": 2 },
    { "name": "协作能力", "value": 3 },
    { "name": "领导能力", "value": 2 },
    { "name": "学习能力", "value": 5 },
    { "name": "创新能力", "value": 6 },
    { "name": "技术能力", "value": 9 }
  ]
}
```

2. 某中学进行了第一次模拟考，三年级中 3 个班级的平均成绩为，一班语文 95，数学 96，外语 85，物理 63，化学 91；二班语文 75，数学 93，外语 66，物理 85，化学 88；三班语文 86，数学 76，外语 96，物理 93，化学 67。要对这三个班级的整体成绩做出评估，为接下来的教学计划做出指导，用雷达图可视化：

```json
{
  "type": "radar",
  "data": [
    {
      "name": "语文",
      "value": 95,
      "group": "一班"
    },
    {
      "name": "数学",
      "value": 96,
      "group": "一班"
    },
    {
      "name": "外语",
      "value": 85,
      "group": "一班"
    },
    {
      "name": "物理",
      "value": 63,
      "group": "一班"
    },
    {
      "name": "化学",
      "value": 91,
      "group": "一班"
    },
    {
      "name": "语文",
      "value": 75,
      "group": "二班"
    },
    {
      "name": "数学",
      "value": 93,
      "group": "二班"
    },
    {
      "name": "外语",
      "value": 66,
      "group": "二班"
    },
    {
      "name": "物理",
      "value": 85,
      "group": "二班"
    },
    {
      "name": "化学",
      "value": 88,
      "group": "二班"
    },
    {
      "name": "语文",
      "value": 86,
      "group": "三班"
    },
    {
      "name": "数学",
      "value": 76,
      "group": "三班"
    },
    {
      "name": "外语",
      "value": 96,
      "group": "三班"
    },
    {
      "name": "物理",
      "value": 93,
      "group": "三班"
    },
    {
      "name": "化学",
      "value": 67,
      "group": "三班"
    }
  ]
}
```

3. 用雷达图可视化我的数据 `[ { "nutrient": "Vitamin C", "score": 7 }, { "nutrient": "Fiber", "score": 6 }, { "nutrient": "Sugar", "score": 5 }, { "nutrient": "Protein", "score": 4 }, { "nutrient": "Iron", "score": 3 }, { "nutrient": "Calcium", "score": 2 } ]`

```json
{
  "type": "radar",
  "data": [
    { "name": "Vitamin C", "value": 7 },
    { "name": "Fiber", "value": 6 },
    { "name": "Sugar", "value": 5 },
    { "name": "Protein", "value": 4 },
    { "name": "Iron", "value": 3 },
    { "name": "Calcium", "value": 2 }
  ]
}
```

4. 用雷达图可视化我的数据 `[ { "fruit": "Apple", "nutrient": "Vitamin C", "score": 5 }, { "fruit": "Apple", "nutrient": "Fiber", "score": 7 }, { "fruit": "Apple", "nutrient": "Sugar", "score": 6 }, { "fruit": "Apple", "nutrient": "Protein", "score": 2 }, { "fruit": "Apple", "nutrient": "Iron", "score": 3 }, { "fruit": "Apple", "nutrient": "Calcium", "score": 2 }, { "fruit": "Banana", "nutrient": "Vitamin C", "score": 4 }, { "fruit": "Banana", "nutrient": "Fiber", "score": 5 }, { "fruit": "Banana", "nutrient": "Sugar", "score": 7 }, { "fruit": "Banana", "nutrient": "Protein", "score": 3 }, { "fruit": "Banana", "nutrient": "Iron", "score": 2 }, { "fruit": "Banana", "nutrient": "Calcium", "score": 3 } ]`

```json
{
  "type": "radar",
  "data": [
    { "group": "Apple", "name": "Vitamin C", "value": 5 },
    { "group": "Apple", "name": "Fiber", "value": 7 },
    { "group": "Apple", "name": "Sugar", "value": 6 },
    { "group": "Apple", "name": "Protein", "value": 2 },
    { "group": "Apple", "name": "Iron", "value": 3 },
    { "group": "Apple", "name": "Calcium", "value": 2 },
    { "group": "Banana", "name": "Vitamin C", "value": 4 },
    { "group": "Banana", "name": "Fiber", "value": 5 },
    { "group": "Banana", "name": "Sugar", "value": 7 },
    { "group": "Banana", "name": "Protein", "value": 3 },
    { "group": "Banana", "name": "Iron", "value": 2 },
    { "group": "Banana", "name": "Calcium", "value": 3 }
  ]
}
```
