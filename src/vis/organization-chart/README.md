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

| 属性                  | 类型     | 是否必填 | 默认值    | 说明                                                |
| --------------------- | -------- | -------- | --------- | --------------------------------------------------- |
| type                  | string   | 必填     | -         | 图表类型，值为 "organization-chart"                 |
| data                  | object   | 必填     | -         | 组织架构图数据，树形节点结构，详见下方 data 说明    |
| title                 | string   | 选填     | -         | 图表标题                                            |
| theme                 | string   | 选填     | "default" | 图表主题，可选值为 "default" \| "academy" \| "dark" |
| style.backgroundColor | string   | 选填     | -         | 背景颜色，合法颜色值                                |
| style.palette         | string[] | 选填     | -         | 颜色映射，合法颜色值数组                            |

**data 树形节点结构**（递归结构，每个节点包含以下字段）：

| 属性        | 类型     | 是否必填 | 默认值 | 说明                                     |
| ----------- | -------- | -------- | ------ | ---------------------------------------- |
| name        | string   | 必填     | -      | 节点名称                                 |
| description | string   | 选填     | -      | 节点描述（如职位、职能）                 |
| children    | object[] | 选填     | -      | 子节点列表，每项结构与父节点相同（递归） |

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
