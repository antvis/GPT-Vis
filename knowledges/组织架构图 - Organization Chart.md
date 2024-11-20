## 图表属性

- 名称：组织架构图
- 别名：组织结构图、机构图、Dagre 图、英文名 Organizational Chart
- 形状：网络形
- 图表类别：关系图
- 图表功能：层级类

## 基础概念

组织架构图，用于直观地展示组织内部的层级结构和部门关系。它通过节点和边表示不同的职位、部门及其上下级关系。每个节点代表一个职位或部门，边则表示上下级或平级关系。以树状结构呈现，顶层为最高管理层，逐层向下展开，直至各个部门和职位。

## 适用场景

- 想要展示公司或团队的层级结构，明确各个职位和部门的上下级关系
- 展示员工的职位和部门分布
- 项目管理时，明确项目团队的成员和职责分工
- 用于股权穿透、投资上下游公司等依赖分析

## 不适用场景

- 展示具体的线性任务流程，更推荐使用流程图
- 没有明确上下级关系的扁平化组织

## 图表用法

### 图表属性

```typescript
type Data = {
  name: string;
  description?: string;
  children?: Data[];
};

type OrganizationChart = {
  type: 'organization-chart';
  data: Data;
};
```

### 数据要求

- type：图表的类型，必填，文本类型，值必须为 "organization-chart"
- data：图表的数据，必填，`OrganizationChartData`对象类型，包含以下字段：
  - name：节点的名称，表示职位或部门的名称，必须唯一，必填，字符串类型
  - description：节点的描述信息，可以包含职位职责或部门简介等，选填，字符串类型
  - children: 节点数组，表示下级职位或部门。如果当前节点没有子节点，该字段可以省略。每个子节点本身也是一个 `OrganizationChartData` 对象，这意味着它可以包含自己的子节点，从而递归地构建出一个多层次的树状结构，选填，数组对象类型

## 使用示例

1. Alice Johnson 是公司的首席技术官，她的团队包括资深软件工程师 Bob Smith 和 IT 支持部门负责人 Eve Black。Bob Smith 负责带领软件工程团队，团队成员包括软件工程师 Charlie Brown 和 Diana White。Eve Black 负责 IT 支持部门，团队成员包括 IT 支持专家 Frank Green 和 Grace Blue。

```json
{
  "type": "organization-chart",
  "data": {
    "name": "Alice Johnson",
    "description": "Chief Technology Officer",
    "children": [
      {
        "name": "Bob Smith",
        "description": "Senior Software Engineer",
        "children": [
          {
            "name": "Charlie Brown",
            "description": "Software Engineer"
          },
          {
            "name": "Diana White",
            "description": "Software Engineer"
          }
        ]
      },
      {
        "name": "Eve Black",
        "description": "IT Support Department Head",
        "children": [
          {
            "name": "Frank Green",
            "description": "IT Support Specialist"
          },
          {
            "name": "Grace Blue",
            "description": "IT Support Specialist"
          }
        ]
      }
    ]
  }
}
```

2. 用组织机构图来可视化以下数据 `{"name":"Eric Joplin","description":"Chief Executive Officer","children":[{"name":"Linda Newland","description":"Chief Executive Assistant"}]}`。

```json
{
  "type": "organization-chart",
  "data": {
    "name": "Eric Joplin",
    "description": "Chief Executive Officer",
    "children": [
      {
        "name": "Linda Newland",
        "description": "Chief Executive Assistant"
      }
    ]
  }
}
```
