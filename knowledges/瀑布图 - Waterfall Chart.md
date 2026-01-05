## 图表属性

- 名称：瀑布图
- 别名：桥接图、过渡图、梯形图、英文名 Waterfall Chart
- 形状：条形
- 图表类别：对比图
- 图表功能：变化分解

## 基础概念

瀑布图用于展示数值从起点到终点的逐步变化过程，清晰地分解增量和减量的贡献。通过起始值、多个正负变化值和最终结果，帮助分析各环节对总体的影响，常用于财务报表、预算对比和阶段性指标拆解。

## 适用场景

- 展示营收、成本等财务数据的逐步增减过程
- 对比预算与实际，分析各项差异的贡献
- 展示项目进度或关键指标的阶段性变化
- 分析渠道/地域/部门对总体指标的影响

## 不适用场景

- 展示严格的时间序列趋势，更推荐使用折线图
- 显示复杂层级关系，更推荐使用树图或关系图

## 图表用法

### 图表属性

```typescript
type Waterfall = {
  type: 'waterfall';
  data: { category: string; value?: number; isTotal?: boolean; isIntermediateTotal?: boolean }[];
  title?: string;
  axisXTitle?: string;
  axisYTitle?: string;
  theme?: 'default' | 'dark' | 'academy';
  style?: {
    backgroundColor?: string;
    palette?: {
      positiveColor?: string;
      negativeColor?: string;
      totalColor?: string;
    };
  };
};
```

### 数据要求

- type：图表的类型，必填，文本类型，值必须为 "waterfall"
- data：图表的数据，必填，数组类型，每个元素包含：
  - category：步骤名称或类别名称，必填，字符串类型
  - value：该步骤的增量或减量，选填，数值类型（正数表示增加，负数表示减少）
  - isIntermediateTotal：是否为中间总计栏，选填，布尔类型，默认为 false
  - isTotal：是否为总计栏，选填，布尔类型，默认为 false
- title: 图表的标题，选填，文本类型。
- axisXTitle：x 轴的标题，选填，文本类型。
- axisYTitle：y 轴的标题，选填，文本类型。
- theme：图表主题，选填，文本类型，可选值为 "default" | "dark" | "academy"，默认值为 "default"。
- style：图表样式，选填，对象类型；
  - backgroundColor：背景颜色，选填，文本类型，值为合法的颜色值。
  - palette：颜色映射，选填，对象类型。
    - positiveColor：正向颜色，选填，文本类型，合法颜色值。
    - negativeColor：负向颜色，选填，文本类型，合法颜色值。
    - totalColor：总计颜色，选填，文本类型，合法颜色值。

## 使用示例

1. 展示公司从期初到期末的利润变化：期初利润 100，销售收入增加 80，运营成本减少 -50，税费减少 -20，得到期末利润。

```json
{
  "type": "waterfall",
  "data": [
    { "category": "期初利润", "value": 100 },
    { "category": "销售收入", "value": 80 },
    { "category": "运营成本", "value": -50 },
    { "category": "税费", "value": -20 },
    { "category": "总计", "isTotal": true }
  ]
}
```

2. 展示预算执行情况：基础预算 500，市场投入增加 120，采购优化节省 -60，运营效率提升 -30，得到调整后预算。

```json
{
  "type": "waterfall",
  "data": [
    { "name": "基础预算", "value": 500 },
    { "name": "市场投入", "value": 120 },
    { "category": "总投入", "isIntermediateTotal": true }
    { "name": "采购优化", "value": -60 },
    { "name": "运营效率", "value": -30 },
    { "category": "总利润", "isTotal": true }
  ]
}
```
