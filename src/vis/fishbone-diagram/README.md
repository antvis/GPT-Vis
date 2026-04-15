# Fishbone Diagram

鱼骨图（Fishbone Diagram），也称因果图或石川图，用于系统化分析问题的根本原因。以"鱼骨"形状展示问题与各类原因之间的层级关系，中心主干代表核心问题，分支代表主要原因类别，末梢代表具体原因。基于 G6 图引擎渲染，支持拖拽画布和缩放交互。

## 适用场景

1. 质量管理中分析产品缺陷或不良率上升的根本原因，如人员、设备、材料、方法、环境等维度。
2. 项目复盘时梳理问题发生的多层原因，帮助团队系统化归因。
3. 流程改进中识别效率瓶颈的各类影响因素，如生产效率低、响应缓慢等。
4. 战略分析中拆解目标未达成的多维度原因，如市场、渠道、产品、运营等方面。

## 不适用场景

1. 不适合展示时间序列或数据趋势，建议使用折线图。
2. 不适合展示数据占比或分布，建议使用饼图或柱形图。
3. 不适合展示流程步骤或决策路径，建议使用流程图。

## 配置

- type：图表类型，必填，文本类型，值为 "fishbone-diagram"。
- data：鱼骨图数据，必填，递归树形结构，包含以下字段：
  - name：节点名称，必填，文本类型。根节点为核心问题，一级子节点为主要原因类别，二级及更深子节点为具体原因。
  - children：子节点数组，选填，数组类型，每项结构与 data 相同。
- title：图表标题，选填，文本类型。
- theme：图表主题，选填，文本类型，可选值为 "default" | "academy" | "dark"，默认值为 "default"。
- style：图表样式，选填，对象类型，包含以下字段：
  - palette：颜色映射，选填，数组类型，合法颜色值数组，用于分支节点着色。
  - backgroundColor：背景颜色，选填，文本类型，合法颜色值。
  - texture：节点渲染风格，选填，文本类型，可选值为 "rough"（手绘风格）| "default"（平滑风格）。

## 示例

### 分析生产效率低的根本原因

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

const visSyntax = `
vis fishbone-diagram
title 生产效率低
data
  name 生产效率低
  children
    - name 设备问题
      children
        - name 设备老化
        - name 维护不及时
    - name 员工问题
      children
        - name 技能不足
        - name 工作态度差
    - name 流程问题
      children
        - name 流程繁琐
        - name 缺乏标准化
`;

gptVis.render(visSyntax);
```

### 分析产品盈利未达预期的多维原因

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 800,
  height: 500,
});

const visSyntax = `
vis fishbone-diagram
title 产品盈利未达到预期目标
data
  name 产品盈利未达到预期目标
  children
    - name 问题描述与分析
      children
        - name 品牌销量分析
        - name 市场容量评估
        - name 品牌的市场份额分析
    - name 品牌定位策略
      children
        - name 外包装设计
        - name 销售价格定位
        - name 产品规格定义
    - name 分销渠道管理
      children
        - name 地区分布
        - name 渠道选择
        - name 客户类型分类
    - name 市场知名度提升
      children
        - name 媒体组合策略
        - name 广告投入预算
        - name 品质意识提升
`;

gptVis.render(visSyntax);
```

### 使用 academy 主题和手绘风格

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

const visSyntax = `
vis fishbone-diagram
title 网站响应缓慢
data
  name 网站响应缓慢
  children
    - name 前端因素
      children
        - name 资源未压缩
        - name 第三方脚本过多
    - name 后端因素
      children
        - name 数据库查询未优化
        - name API响应慢
    - name 网络因素
      children
        - name CDN配置不当
        - name 带宽不足
theme academy
style
  texture rough
`;

gptVis.render(visSyntax);
```

### 自定义颜色样式展示

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

const visSyntax = `
vis fishbone-diagram
title 客户流失原因分析
data
  name 客户流失率上升
  children
    - name 产品因素
      children
        - name 功能不满足需求
        - name 用户体验差
    - name 服务因素
      children
        - name 响应速度慢
        - name 售后支持不足
    - name 价格因素
      children
        - name 竞品价格更低
        - name 性价比不高
style
  palette #FF6B6B #4ECDC4 #45B7D1
  backgroundColor #F5F5F5
`;

gptVis.render(visSyntax);
```
