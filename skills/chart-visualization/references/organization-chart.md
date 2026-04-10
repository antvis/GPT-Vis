## 图表属性

- 名称：组织架构图
- 别名：组织结构图、机构图，英文名：Organization Chart、Organizational Chart
- 形状：树形（从上到下层次布局）
- 图表类别：关系图
- 图表功能：展示组织内部的层级结构和部门关系

## 基础概念

组织架构图用于直观地展示组织内部的层级结构和部门关系。它通过节点和边表示不同的职位、部门及其上下级关系。每个节点代表一个职位或部门，边则表示上下级或平级关系。以树状结构呈现，顶层为最高管理层，逐层向下展开，直至各个部门和职位。

支持为每个节点添加描述信息（如职位描述或部门简介），鼠标悬停时以 tooltip 形式展示详情。

## 适用场景

- 展示公司或团队的层级结构，明确各个职位和部门的上下级关系。
- 展示员工的职位和部门分布。
- 项目管理时，明确项目团队的成员和职责分工。
- 用于股权穿透、投资上下游公司等依赖分析。

## 不适用场景

1. 展示具体的线性任务流程，更推荐使用流程图。
2. 没有明确上下级关系的扁平化组织。
3. 展示节点间非层级的复杂关联，更推荐使用网络图。

## 图表用法

### 图表属性

```typescript
type OrganizationChartData = {
  name: string;
  description?: string;
  children?: OrganizationChartData[];
};

type OrganizationChart = {
  type: 'organization-chart';
   OrganizationChartData;
  title?: string;
  theme?: 'default' | 'dark' | 'academy';
  style?: {
    backgroundColor?: string;
    palette?: string[];
  };
};
```

### 数据要求

- type：图表的类型，必填，文本类型，值必须为 "organization-chart"。
- data：图表的数据，必填，`OrganizationChartData` 对象类型，包含以下字段：
  - name：节点的名称，表示职位或部门的名称，必须唯一，必填，字符串类型；
  - description：节点的描述信息，可以包含职位职责或部门简介等，选填，字符串类型；
  - children：子节点数组，表示下级职位或部门，选填，数组对象类型。如果当前节点没有子节点，该字段可以省略。每个子节点本身也是一个 `OrganizationChartData` 对象，可以递归构建多层次的树状结构；
- title：图表标题，选填，文本类型。
- theme：图表主题，选填，文本类型，可选值为 "default" | "dark" | "academy"，默认值为 "default"。
- style：图表样式，选填，对象类型；
  - palette：颜色映射，选填，数组类型，合法颜色值数组。
  - backgroundColor：背景颜色，选填，文本类型，合法颜色值。

## 使用示例

1. 技术团队组织架构，包含首席技术官及其下属的软件工程和 IT 支持两个部门。

```
vis organization-chart
data
  name Alice Johnson
  description Chief Technology Officer
  children
    - name Bob Smith
      description Senior Software Engineer
      children
        - name Charlie Brown
          description Software Engineer
        - name Diana White
          description Software Engineer
    - name Eve Black
      description IT Support Department Head
      children
        - name Frank Green
          description IT Support Specialist
        - name Grace Blue
          description IT Support Specialist
title 技术部组织架构
```

2. 公司高层管理架构，仅展示职位名称，不含描述，academy 主题。

```
vis organization-chart
data
  name 董事会
  children
    - name 首席执行官
      children
        - name 首席技术官
        - name 首席财务官
        - name 首席运营官
    - name 监事会
theme academy
title 公司治理结构
```

3. 投资控股穿透结构，dark 主题，自定义配色。

```
vis organization-chart
data
  name 集团控股
  description 母公司
  children
    - name 科技子公司
      description 持股 80%
      children
        - name 研发中心
          description 技术研发部门
        - name 产品中心
          description 产品开发部门
    - name 金融子公司
      description 持股 100%
      children
        - name 资产管理部
          description 投资管理
        - name 风控部
          description 风险控制
theme dark
style
  palette #5B8FF9 #61DDAA #65789B #F6BD16 #7262FD
title 集团投资控股结构
```
