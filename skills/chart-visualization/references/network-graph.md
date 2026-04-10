## 图表属性

- 名称：网络图
- 别名：关系网络图、关系图、力导向图，英文名：Network Graph、Force Graph
- 形状：网络形
- 图表类别：关系图
- 图表功能：展示实体之间的关系和连接

## 基础概念

网络图（Network Graph）是一种展示实体（节点）之间的关系（边）的图。通过节点和边的连接，直观地表示复杂的网络结构。每个节点代表一个实体，而每条边则表示两个节点之间的关系或连接。

网络图的关键就是展示"谁跟谁有联系"。比如，节点代表人，连线代表某两个人之间是否认识。支持多种布局方式：力导向（force）、环形（circular）、网格（grid）、辐射（radial）、同心圆（concentric）、层次（dagre）。

## 适用场景

- 展示实体之间的关系，例如社交网络中的人际关系。
- 分析复杂网络结构中的模式和特性，例如通信网络中的节点连接情况。
- 展示数据之间的关联性和依赖关系，例如知识图谱中的概念关联。

## 不适用场景

1. 线性流程：需要展示线性流程或步骤的场景，用流程图更合适。
2. 独立数据点：数据点之间没有明显关系或连接，用散点图更为合适。
3. 层次结构：需要展示明确上下级层次结构的场景，用组织架构图或思维导图更合适。
4. 连续叙事：当具有明确的顺序关系或变化趋势时，用折线图或面积图更为适合。

## 图表用法

### 图表属性

```typescript
type NetworkGraphNode = {
  name: string;
};

type NetworkGraphEdge = {
  source: string;
  target: string;
  name?: string;
};

type NetworkGraph = {
  type: 'network-graph';
   {
    nodes: NetworkGraphNode[];
    edges: NetworkGraphEdge[];
  };
  layout?: 'force' | 'circular' | 'grid' | 'radial' | 'concentric' | 'dagre';
  title?: string;
  theme?: 'default' | 'dark' | 'academy';
  style?: {
    backgroundColor?: string;
    palette?: string[];
  };
};
```

### 数据要求

- type：图表的类型，必填，文本类型，值必须为 "network-graph"。
- data：图表的数据，必填，对象类型，包含以下字段：
  - nodes：网络图中的节点数组，每个节点表示一个实体，必填，数组对象类型；
    - name：节点的名称，必须唯一，用于标识节点，必填，文本类型；
  - edges：网络图中的边数组，每条边表示两个节点之间的关系，必填，数组对象类型；
    - source：边的起始节点名称，指向节点的 `name` 属性，必填，文本类型；
    - target：边的目标节点名称，指向节点的 `name` 属性，必填，文本类型；
    - name：边的名称，用于标识关系类型，选填，文本类型；
- layout：布局方式，选填，文本类型，可选值为 "force"（力导向，默认）| "circular"（环形）| "grid"（网格）| "radial"（辐射）| "concentric"（同心圆）| "dagre"（层次）。
- title：图表标题，选填，文本类型。
- theme：图表主题，选填，文本类型，可选值为 "default" | "dark" | "academy"，默认值为 "default"。
- style：图表样式，选填，对象类型；
  - palette：颜色映射，选填，数组类型，合法颜色值数组。
  - backgroundColor：背景颜色，选填，文本类型，合法颜色值。

## 使用示例

1. 《哈利波特》主要人物关系，展示哈利·波特与伙伴及对手之间的关系。

```
vis network-graph
data
  nodes
    - name 哈利·波特
    - name 赫敏·格兰杰
    - name 罗恩·韦斯莱
    - name 伏地魔
  edges
    - source 哈利·波特
      target 赫敏·格兰杰
      name 朋友
    - source 哈利·波特
      target 罗恩·韦斯莱
      name 朋友
    - source 哈利·波特
      target 伏地魔
      name 敌人
    - source 伏地魔
      target 哈利·波特
      name 试图杀死
title 哈利波特人物关系
```

2. 微服务系统的服务依赖关系，使用层次布局，academy 主题。

```
vis network-graph
data
  nodes
    - name API 网关
    - name 用户服务
    - name 订单服务
    - name 商品服务
    - name 支付服务
    - name 消息队列
    - name 数据库
  edges
    - source API 网关
      target 用户服务
      name 请求转发
    - source API 网关
      target 订单服务
      name 请求转发
    - source API 网关
      target 商品服务
      name 请求转发
    - source 订单服务
      target 支付服务
      name 调用
    - source 订单服务
      target 消息队列
      name 发布消息
    - source 用户服务
      target 数据库
      name 读写
    - source 订单服务
      target 数据库
      name 读写
layout dagre
theme academy
title 微服务依赖关系
```

3. 知识图谱概念关联，环形布局，dark 主题，自定义配色。

```
vis network-graph
data
  nodes
    - name 机器学习
    - name 深度学习
    - name 神经网络
    - name 自然语言处理
    - name 计算机视觉
    - name 强化学习
  edges
    - source 机器学习
      target 深度学习
      name 包含
    - source 深度学习
      target 神经网络
      name 基于
    - source 深度学习
      target 自然语言处理
      name 应用于
    - source 深度学习
      target 计算机视觉
      name 应用于
    - source 机器学习
      target 强化学习
      name 包含
layout circular
theme dark
style
  palette #5B8FF9 #61DDAA #65789B #F6BD16 #7262FD
title AI 知识图谱
```
