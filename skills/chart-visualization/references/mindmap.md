## 图表属性

- 名称：思维导图
- 别名：脑图，英文名：Mind Map
- 形状：网络形，树形层级
- 图表类别：关系图
- 图表功能：展示以中心主题为核心的层级分支关系

## 基础概念

思维导图，是一种以中心主题为核心，通过层级分支的形式组织和展示信息的图表。使用中心点两侧分布，合理利用空间，并能清晰呈现主干与分支的所属分层关系。

它以节点为单位，逐层展开，以便将概念、任务或想法分类。当文本内容复杂时，思维导图可以帮助提取并结构化关键信息，明确主要主题与子主题之间的关系。

## 适用场景

- 内容围绕一个核心主题展开，可以按照逻辑层次进行分解。
- 知识体系的分类梳理与结构化展示。
- 项目计划、任务分解等需要层级展示的场景。
- 头脑风暴结果的整理和可视化。

## 不适用场景

1. 连续的叙事或故事情节，用流程图更合适。
2. 纯数值数据或统计信息，用统计图表（折线图、柱形图等）更合适。
3. 信息杂乱、无明确主题层级关系的内容。
4. 精确的操作步骤或指令，用流程图更合适。
5. 展示流量或流向大小时，桑基图更合适。

## 图表用法

### 图表属性

```typescript
type MindmapData = {
  name: string;
  children?: MindmapData[];
};

type Mindmap = {
  type: 'mindmap';
  data: MindmapData;
  direction?: 'H' | 'LR' | 'RL';
  title?: string;
  theme?: 'default' | 'dark' | 'academy';
  style?: {
    backgroundColor?: string;
    palette?: string[];
  };
};
```

### 数据要求

- type：图表的类型，必填，文本类型，值必须为 "mindmap"。
- data：图表的数据，必填，`MindmapData` 对象类型，包含以下字段：
  - name：节点的名称，用于显示在思维导图的节点上，必填，字符串类型；
  - children：当前节点的子节点集合，选填，数组对象类型。如果当前节点没有子节点，该字段可以省略。每个子节点本身也是一个 `MindmapData` 对象，可以递归构建多层次的树状结构；
- direction：布局方向，选填，文本类型，可选值为 "H"（水平双向）、"LR"（从左到右）、"RL"（从右到左），默认值为 "H"。
- title：图表标题，选填，文本类型。
- theme：图表主题，选填，文本类型，可选值为 "default" | "dark" | "academy"，默认值为 "default"。
- style：图表样式，选填，对象类型；
  - palette：颜色映射，选填，数组类型，合法颜色值数组。
  - backgroundColor：背景颜色，选填，文本类型，合法颜色值。

## 使用示例

1. 项目计划思维导图，分为研究、设计、开发和测试阶段。

```
vis mindmap
data
  name 项目计划
  children
    - name 研究阶段
      children
        - name 市场调研
        - name 技术可行性分析
    - name 设计阶段
      children
        - name 产品功能确定
        - name UI 设计
    - name 开发阶段
      children
        - name 编写代码
        - name 单元测试
    - name 测试阶段
      children
        - name 功能测试
        - name 性能测试
title 项目计划
```

2. 人工智能应用领域的层级展示，从左到右方向。

```
vis mindmap
data
  name 人工智能应用
  children
    - name 智能家居
    - name 自动驾驶
    - name 医疗保健
      children
        - name 精准医疗
        - name 诊断辅助
    - name 金融服务
direction LR
```

3. 台风形成因素分析，dark 主题，自定义配色。

```
vis mindmap
data
  name 台风形成的因素
  children
    - name 气象条件
      children
        - name 温暖的海水
        - name 气压分布
        - name 湿度水平
        - name 风的切变
    - name 地理环境
      children
        - name 大陆架的形状与深度
        - name 海洋暖流的分布
        - name 热带地区的气候特征
        - name 岛屿的影响
theme dark
style
  palette #5B8FF9 #61DDAA #65789B #F6BD16 #7262FD
```
