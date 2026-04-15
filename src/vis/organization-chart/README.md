# Organization Chart

组织架构图（Organization Chart），用于展示层级结构关系的图表。通过节点和连线直观呈现组织内部的汇报关系、职能划分和人员层级，适合展示公司部门、团队角色及管理架构等场景。基于 G6 构建。

## 适用场景

1. 公司或部门组织结构展示，清晰呈现各部门的划分与从属关系。
2. 汇报层级关系展示，直观反映管理链条和上下级关系。
3. 项目团队结构展示，明确项目成员的角色分工与协作关系。
4. 职能分工展示，帮助理解各岗位职责及其在组织中的位置。

## 不适用场景

1. 不适合展示非层级型的网状关系，建议使用网络图。
2. 不适合用于时间序列或趋势分析。
3. 当节点数量极多且层级很深时，布局可能拥挤，建议考虑缩进树或思维导图。

## 配置

- type：图表类型，必填，文本类型，值为 "organization-chart"。
- data：组织架构图数据，必填，对象类型，树形节点结构，每个节点包含以下字段：
  - name：节点名称，必填，文本类型。
  - description：节点描述（如职位、职能），选填，文本类型。
  - children：子节点列表，选填，数组类型，每项结构与父节点相同。
- title：图表标题，选填，文本类型。
- theme：图表主题，选填，文本类型，可选值为 "default" | "academy" | "dark"，默认值为 "default"。
- style：图表样式，选填，对象类型，包含以下字段：
  - backgroundColor：背景颜色，选填，文本类型，合法颜色值。
  - palette：颜色映射，选填，数组类型，合法颜色值数组。

## 示例

### 展示技术部门组织架构

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

const visSyntax = `
vis organization-chart
data
  - name Alice Johnson
    description Chief Technology Officer
    children
      - name Bob Smith
        description Senior Software Engineer
      - name Eve Black
        description IT Support Department Head
title 技术部门架构
`;

gptVis.render(visSyntax);
```

### 使用暗色主题展示企业集团架构

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 800,
  height: 500,
  theme: 'dark',
});

const visSyntax = `
vis organization-chart
data
  - name 总部
    description 母公司
    children
      - name 科技子公司
        description 持股 80%
        children
          - name 研发中心
            description 研究与开发
          - name 产品中心
            description 产品研发
      - name 金融子公司
        description 持股 100%
        children
          - name 资产管理
            description 投资管理
          - name 风险管控
            description 风险管理
title 集团公司架构
`;

gptVis.render(visSyntax);
```
