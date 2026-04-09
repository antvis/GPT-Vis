## 图表属性

- 名称：流程图
- 别名：Dagre 图，英文名：Flow Diagram、Flowchart、Process Flow Diagram
- 形状：网络形，有向无环图
- 图表类别：关系图
- 图表功能：展示流程步骤、决策点和路径关系

## 基础概念

流程图用于直观地表示过程或系统的步骤和决策点。它展示了从开始到结束的整个流程。每个节点代表一个特定的步骤或决策点，边则表示步骤之间的顺序和关系。只有在有分支表意的情况下，边才需要命名。

## 适用场景

- 适用于需要展示线性流程或步骤的场景。
- 规划和跟踪项目进度，明确任务的先后顺序和依赖关系。
- 构建决策树，展示不同决策点和路径的场景。

## 不适用场景

1. 需要展示层次结构的场景，用思维导图、组织架构图更为合适。
2. 展示复杂网络结构和节点关系的场景，例如社交网络分析或知识图谱，用网络图更合适。
3. 展示数据的流量或流向大小时，桑基图更合适。

## 图表用法

### 图表属性

```typescript
type FlowDiagram = {
  type: 'flow-diagram';
  data: {
    nodes: { name: string }[];
    edges: { source: string; target: string; name?: string }[];
  };
  title?: string;
  theme?: 'default' | 'dark' | 'academy';
  style?: {
    backgroundColor?: string;
    palette?: string[];
  };
};
```

### 数据要求

- type：图表的类型，必填，文本类型，值必须为 "flow-diagram"。
- data：图表的数据，必填，对象类型，包含以下字段：
  - nodes：流程图中的节点数组，每个节点表示一个步骤或决策点，必填，数组对象类型；
    - name：节点的名称，必须唯一，用于标识节点，必填，文本类型；
  - edges：流程图中的边数组，每条边表示两个步骤之间的顺序关系，必填，数组对象类型；
    - source：边的起始节点名称，指向节点的 `name` 属性，必填，文本类型；
    - target：边的目标节点名称，指向节点的 `name` 属性，必填，文本类型；
    - name：边的名称，用于标识分支条件，选填，文本类型；只有在有分支表意的情况下才需要命名。
- title：图表标题，选填，文本类型。
- theme：图表主题，选填，文本类型，可选值为 "default" | "dark" | "academy"，默认值为 "default"。
- style：图表样式，选填，对象类型；
  - palette：颜色映射，选填，数组类型，合法颜色值数组。
  - backgroundColor：背景颜色，选填，文本类型，合法颜色值。

## 使用示例

1. 用户注册流程，包含信息验证的分支判断。

```
vis flow-diagram
title 用户注册流程
data
  nodes
    - name 访问注册页面
    - name 填写并提交注册表单
    - name 验证用户信息
    - name 创建新用户账户
    - name 提示修改错误信息
    - name 发送验证邮件
    - name 点击验证链接
    - name 注册成功，跳转到登录页面
  edges
    - source 访问注册页面
      target 填写并提交注册表单
    - source 填写并提交注册表单
      target 验证用户信息
    - source 验证用户信息
      target 创建新用户账户
      name 信息无误
    - source 验证用户信息
      target 提示修改错误信息
      name 信息有误
    - source 创建新用户账户
      target 发送验证邮件
    - source 发送验证邮件
      target 点击验证链接
    - source 点击验证链接
      target 注册成功，跳转到登录页面
```

2. 订单配送流程，简单线性流程，dark 主题。

```
vis flow-diagram
title 订单配送流程
data
  nodes
    - name 客户下单
    - name 系统生成订单
    - name 仓库拣货
    - name 仓库打包
    - name 物流配送
    - name 客户收货
  edges
    - source 客户下单
      target 系统生成订单
    - source 系统生成订单
      target 仓库拣货
    - source 仓库拣货
      target 仓库打包
    - source 仓库打包
      target 物流配送
    - source 物流配送
      target 客户收货
theme dark
```

3. 性能诊断流程，包含多个分支判断，自定义配色。

```
vis flow-diagram
data
  nodes
    - name 发现性能问题
    - name 检查网络延迟
    - name 分析服务器负载
    - name 检查数据库性能
    - name 优化网络配置
    - name 扩展服务器资源
    - name 优化SQL查询
    - name 检查应用代码
    - name 代码性能优化
    - name 性能测试验证
  edges
    - source 发现性能问题
      target 检查网络延迟
    - source 发现性能问题
      target 分析服务器负载
    - source 发现性能问题
      target 检查数据库性能
    - source 检查网络延迟
      target 优化网络配置
      name 延迟过高
    - source 分析服务器负载
      target 扩展服务器资源
      name 负载过高
    - source 检查数据库性能
      target 优化SQL查询
      name 查询缓慢
    - source 检查数据库性能
      target 检查应用代码
      name 数据库正常
    - source 检查应用代码
      target 代码性能优化
    - source 优化网络配置
      target 性能测试验证
    - source 扩展服务器资源
      target 性能测试验证
    - source 优化SQL查询
      target 性能测试验证
    - source 代码性能优化
      target 性能测试验证
style
  palette #5B8FF9 #61DDAA #65789B #F6BD16 #7262FD
```
