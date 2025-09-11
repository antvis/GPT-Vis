## 图表属性

- 名称：水波图
- 别名：液体填充图，英文名 Liquid Chart
- 形状：圆形或椭圆形
- 图表类别：进度/占比图表
- 图表功能：占比、进度、状态展示

## 基础概念

水波图是一种用液体填充效果表现数值占比的图表。通常以圆形容器为载体，通过液面高度和波动动态，直观展示某个指标的当前进度或占比。液体的高度代表数值的百分比，波动效果增强视觉表现力，适合展示单一指标的完成度或状态。

## 适用场景

用于展示某项指标的进度、占比，如任务完成度、资源使用率、KPI达成率等。适合突出单一数值的当前状态。

## 不适用场景

1. 不适合展示多个类别或复杂数据对比。
2. 不适合用于趋势分析或时间序列数据。
3. 当需要精确比较多个数据时，建议使用柱状图或折线图。

## 图表用法

### 图表属性

```typescript
type Liquid = {
  type: 'liquid';
  percent: number; // 填充百分比，0~1
  shape?: 'rect' | 'circle' | 'pin' | 'triangle';
  title?: string;
  theme?: 'default' | 'dark' | 'academy';
  style?: {
    backgroundColor?: string;
    palette?: string[];
  };
};
```

### 数据要求

- type：图表类型，必填，文本类型，值为 "liquid"。
- percent：填充百分比，必填，数值类型，取值范围 0~1。
- shape：图表形状，选填，文本类型，可选值为 "rect" | "circle" | "pin" | "triangle"，默认值为 "circle"。
- title：图表标题，选填，文本类型。
- theme：图表主题，选填，文本类型，可选值为 "default" | "dark" | "academy"，默认值为 "default"。
- style：图表样式，选填，对象类型；
  - backgroundColor：背景颜色，选填，文本类型，合法颜色值。
  - palette：颜色映射，选填，数组类型，合法颜色值数组。

## 使用示例

1. 展示某任务完成度为 75%。

```json
{
  "type": "liquid",
  "percent": 0.75,
  "title": "任务完成度"
}
```

2. 展示服务器资源使用率为 60%，主题为 dark。

```json
{
  "type": "liquid",
  "percent": 0.6,
  "title": "资源使用率",
  "theme": "dark"
}
```

3. 展示 KPI 达成率为 92%，自定义液体和边框颜色。

```json
{
  "type": "liquid",
  "percent": 0.92,
  "title": "KPI 达成率",
  "style": {
    "palette": ["#00BFFF"],
    "backgroundColor": "#F0F0F0"
  }
}
```
