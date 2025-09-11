## 图表属性

- 名称：漏斗图
- 别名：Funnel Chart
- 形状：漏斗形
- 图表类别：流程/转化图表
- 图表功能：流程分布、转化率分析、阶段流失

## 基础概念

漏斗图是一种用于展示数据在多个阶段逐步流失或转化的图表。通常以漏斗形状表现各阶段的数据量，顶部宽底部窄，直观反映每个环节的数量变化和转化率。适合分析流程中的瓶颈和优化空间。

## 适用场景

用于展示销售流程、用户转化、活动参与等多阶段数据流失或转化情况。适合突出各阶段的数量分布和转化效率。

## 不适用场景

1. 不适合展示单一指标或无阶段的数据。
2. 不适合用于时间序列或趋势分析。
3. 当需要展示复杂类别对比时，建议使用柱状图或堆叠图。

## 图表用法

### 图表属性

```typescript
type Funnel = {
  type: 'funnel';
  data: Array<{
    category: string;
    value: number;
  }>;
  title?: string;
  theme?: 'default' | 'dark' | 'academy';
  style?: {
    backgroundColor?: string;
    palette?: string[];
  };
};
```

### 数据要求

- type：图表类型，必填，文本类型，值为 "funnel"。
- data：漏斗图数据，必填，数组类型，每项包含 category（名称）和 value（数值）。
  - category：数据名称，必填，文本类型。
  - value：数据数值，必填，数值类型。
- title：图表标题，选填，文本类型。
- theme：图表主题，选填，文本类型，可选值为 "default" | "dark" | "academy"，默认值为 "default"。
- style：图表样式，选填，对象类型；
  - backgroundColor：背景颜色，选填，文本类型，合法颜色值。
  - palette：颜色映射，选填，数组类型，合法颜色值数组。

## 使用示例

1. 展示销售漏斗各阶段数据。

```json
{
  "type": "funnel",
  "data": [
    { "category": "访问", "value": 1000 },
    { "category": "咨询", "value": 600 },
    { "category": "下单", "value": 300 },
    { "category": "成交", "value": 120 }
  ],
  "title": "销售漏斗"
}
```

2. 展示用户转化流程，主题为 dark。

```json
{
  "type": "funnel",
  "data": [
    { "category": "注册", "value": 800 },
    { "category": "激活", "value": 500 },
    { "category": "付费", "value": 200 }
  ],
  "title": "用户转化流程",
  "theme": "dark"
}
```

3. 展示活动参与漏斗，自定义颜色。

```json
{
  "type": "funnel",
  "data": [
    { "category": "报名", "value": 1500 },
    { "category": "签到", "value": 900 },
    { "category": "参与", "value": 700 }
  ],
  "title": "活动参与漏斗",
  "style": {
    "palette": ["#FF7F50", "#87CEFA", "#32CD32"],
    "backgroundColor": "#FFF8DC"
  }
}
```
