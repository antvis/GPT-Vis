---
order: 4
group:
  order: 3
  title: 关系图
---

# OrganizationChart 组织架构图

组织架构图，用于展示组织内部的层级结构和部门关系。

## 代码演示

### 单独使用

<code src="./demos/common"></code>

### 使用 Markdown 协议

<code src="./demos/markdown"></code>

## Spec

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

## API

### OrganizationChartProps

| 属性 | 类型                    | 是否必传 | 默认值 | 说明 |
| ---- | ----------------------- | -------- | ------ | ---- |
| data | `OrganizationChartData` | 是       | -      | 数据 |

### OrganizationChartData

| 属性        | 类型                      | 是否必传 | 默认值 | 说明                                                                                                                                                                                            |
| ----------- | ------------------------- | -------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name        | `string`                  | 是       | -      | 节点的名称，表示职位或部门的名称，必须唯一                                                                                                                                                      |
| description | `string`                  | 否       | -      | 节点的描述信息，可以包含职位职责或部门简介等                                                                                                                                                    |
| children    | `OrganizationChartData[]` | 否       | -      | 节点数组，表示下级职位或部门。如果当前节点没有子节点，该字段可以省略。每个子节点本身也是一个 `OrganizationChartData` 对象，这意味着它可以包含自己的子节点，从而递归地构建出一个多层次的树状结构 |
