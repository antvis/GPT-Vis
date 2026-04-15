# Network Graph

网络图（Network Graph），通过节点（实体）和边（关系）的连接，直观地表示复杂的网络结构。每个节点代表一个实体，每条边表示两个节点之间的关系或连接。支持多种布局方式：力导向（force）、环形（circular）、网格（grid）、辐射（radial）、同心圆（concentric）、层次（dagre）。

## 适用场景

1. 社交关系与人物关系网络：展示社交网络中人与人之间的关系，如朋友关系、合作关系、影响关系等。
2. 知识图谱与概念关联：展示知识领域中概念与概念之间的关联、包含、依赖等语义关系。
3. 系统服务依赖关系：分析微服务架构、软件模块或基础设施中组件之间的调用与依赖关系。
4. 复杂网络结构分析：识别和分析通信网络、交通网络等复杂网络中的节点连接模式与拓扑特性。

## 不适用场景

1. 线性流程：需要展示线性流程或步骤，用流程图更合适。
2. 独立数据点：数据点之间没有明显关系，用散点图更合适。
3. 层次结构：需要展示明确上下级层次，用组织架构图或思维导图更合适。
4. 连续叙事：具有明确顺序关系或变化趋势时，用折线图或面积图更合适。

## 配置

| 属性                  | 类型     | 是否必填 | 默认值    | 说明                                                                                      |
| --------------------- | -------- | -------- | --------- | ----------------------------------------------------------------------------------------- |
| type                  | string   | 必填     | -         | 图表类型，值为 "network-graph"                                                            |
| data                  | object   | 必填     | -         | 图表数据，包含 nodes 和 edges 字段                                                        |
| nodes[n].name         | string   | 必填     | -         | 节点名称，须保持唯一                                                                      |
| edges[n].source       | string   | 必填     | -         | 起始节点名称                                                                              |
| edges[n].target       | string   | 必填     | -         | 目标节点名称                                                                              |
| edges[n].name         | string   | 选填     | -         | 边名称，用于标识关系类型                                                                  |
| layout                | string   | 选填     | "force"   | 布局方式，可选值为 "force" \| "circular" \| "grid" \| "radial" \| "concentric" \| "dagre" |
| title                 | string   | 选填     | -         | 图表标题                                                                                  |
| theme                 | string   | 选填     | "default" | 图表主题，可选值为 "default" \| "academy" \| "dark"                                       |
| style.backgroundColor | string   | 选填     | -         | 背景颜色，合法颜色值                                                                      |
| style.palette         | string[] | 选填     | -         | 颜色映射，合法颜色值数组                                                                  |

## 示例

### 展示哈利波特人物关系

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

const visSyntax = `
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
`;

gptVis.render(visSyntax);
```

### 展示微服务依赖关系（层次布局，academy 主题）

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

const visSyntax = `
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
`;

gptVis.render(visSyntax);
```

### 展示 AI 知识图谱（环形布局，dark 主题，自定义配色）

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

const visSyntax = `
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
`;

gptVis.render(visSyntax);
```
