# Flow Diagram

流程图（Flow Diagram），用于直观地表示过程或系统的步骤和决策点。展示从开始到结束的整个流程，每个节点代表特定步骤或决策点，边表示步骤之间的顺序和关系。只有在有分支表意的情况下，边才需要命名。

## 适用场景

1. 业务流程梳理：展示订单处理、用户注册、售后服务等完整业务流程，明确各环节的先后顺序与依赖关系。
2. 系统操作步骤：描述软件操作、系统配置、部署发布等需要按步骤执行的技术流程。
3. 决策分支路径：构建包含条件判断的决策树，清晰呈现不同输入或条件下对应的执行路径与结果。
4. 审批与用户行为路径：展示审批流转过程或用户在产品中的行为路径，帮助识别关键节点与潜在问题。

## 不适用场景

1. 需要展示层次结构时，用思维导图、组织架构图更合适。
2. 展示复杂网络结构和节点关系时，用网络图更合适。
3. 展示数据流量或流向大小时，桑基图更合适。

## 配置

- type：图表类型，必填，文本类型，值为 "flow-diagram"。
- data：流程图数据，必填，对象类型，包含以下字段：
  - nodes：节点数组，必填，数组类型，每项包含以下字段：
    - name：节点名称，必填，文本类型，在同一图表中必须唯一。
  - edges：边数组，必填，数组类型，每项包含以下字段：
    - source：起始节点名称，必填，文本类型。
    - target：目标节点名称，必填，文本类型。
    - name：边名称，选填，文本类型，仅在有分支需要区分时使用。
- title：图表标题，选填，文本类型。
- theme：图表主题，选填，文本类型，可选值为 "default" | "academy" | "dark"，默认值为 "default"。
- style：图表样式，选填，对象类型，包含以下字段：
  - backgroundColor：背景颜色，选填，文本类型，合法颜色值。
  - palette：颜色映射，选填，数组类型，合法颜色值数组。

## 示例

### 展示用户注册流程

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

const visSyntax = `
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
`;

gptVis.render(visSyntax);
```

### 展示订单配送流程（dark 主题）

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

const visSyntax = `
vis flow-diagram
title 订单配送流程
theme dark
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
`;

gptVis.render(visSyntax);
```

### 展示性能诊断流程（自定义配色）

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

const visSyntax = `
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
`;

gptVis.render(visSyntax);
```
