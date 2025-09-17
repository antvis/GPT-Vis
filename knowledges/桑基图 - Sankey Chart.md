## 图表属性

- 名称：桑基图
- 别名：桑基流图，英文名：Sankey Chart
- 形状：流向带状图，节点与流动线条
- 图表类别：流向关系图表
- 图表功能：展示流量、能量、资金等在各节点间的流动和分布

## 基础概念

桑基图是一种用于可视化流量、能量、资金等在不同节点间流动关系的图表。通过带宽表示流量大小，节点和流向线条直观展示各部分的流向和分布，常用于能量流、资金流、用户路径等分析场景。

## 适用场景

适合展示各类流量分布和流向关系，如能源流动、资金流转、用户行为路径、供应链流动等。突出流量的分布结构和流向路径。

## 不适用场景

1. 不适合仅有单一节点或无流向关系的数据。
2. 不适合展示时间序列趋势，建议使用折线图或面积图。
3. 不适合强调类别占比或组成结构，建议使用饼图、条形图等。
4. 当关注的是具体数值而非流向关系时，桑基图并非最佳选择。
5. 节点过多或流向过于复杂时，桑基图可能难以阅读。

## 图表用法

### 图表属性

```typescript
type SankeyChart = {
  type: 'sankey';
  data: {
    source: string;
    target: string;
    value: number;
  }[];
  nodeAlign?: 'left' | 'center' | 'right' | 'justify';
  title?: string;
  theme?: 'default' | 'dark' | 'academy';
  style?: {
    backgroundColor?: string;
    palette?: string[];
  };
};
```

### 数据要求

- type：图表类型，必填，文本类型，值为 "sankey"。
- data：桑基图数据，必填，数组类型。
  - source：源节点名称，必填，文本类型。
  - target：目标节点名称，必填，文本类型。
  - value：流量值，必填，数值类型。
- nodeAlign：节点对齐方式，选填，文本类型，可选值为 "left" | "center" | "right" | "justify"，默认值为 "center"。
- title：图表标题，选填，文本类型。
- theme：图表主题，选填，文本类型，可选值为 "default" | "dark" | "academy"，默认值为 "default"。
- style：图表样式，选填，对象类型；
  - palette：颜色映射，选填，数组类型，合法颜色值数组。
  - backgroundColor：背景颜色，选填，文本类型，合法颜色值。

## 使用示例

1. 展示能源流动关系。

```json
{
  "type": "sankey",
  "data": [
    { "source": "煤炭", "target": "发电厂", "value": 120 },
    { "source": "天然气", "target": "发电厂", "value": 80 },
    { "source": "发电厂", "target": "工业", "value": 100 },
    { "source": "发电厂", "target": "居民", "value": 60 },
    { "source": "发电厂", "target": "商业", "value": 40 }
  ],
  "nodeAlign": "justify",
  "title": "能源流动关系"
}
```

2. 展示资金流转路径, 主题为 dark。

```json
{
  "type": "sankey",
  "data": [
    { "source": "投资人", "target": "创业公司", "value": 200 },
    { "source": "创业公司", "target": "市场营销", "value": 80 },
    { "source": "创业公司", "target": "研发", "value": 120 },
    { "source": "市场营销", "target": "客户", "value": 70 },
    { "source": "研发", "target": "客户", "value": 50 }
  ],
  "nodeAlign": "center",
  "title": "资金流转路径",
  "theme": "dark"
}
```

3. 展示用户行为路径, 自定义配色。

```json
{
  "type": "sankey",
  "data": [
    { "source": "首页", "target": "产品页", "value": 300 },
    { "source": "产品页", "target": "购物车", "value": 150 },
    { "source": "购物车", "target": "结算页", "value": 100 },
    { "source": "结算页", "target": "支付成功", "value": 80 },
    { "source": "结算页", "target": "支付失败", "value": 20 }
  ],
  "nodeAlign": "left",
  "title": "用户行为路径",
  "style": {
    "palette": ["#5B8FF9", "#61DDAA", "#65789B", "#F6BD16", "#7262FD"],
    "backgroundColor": "#f0f2f5"
  }
}
```
