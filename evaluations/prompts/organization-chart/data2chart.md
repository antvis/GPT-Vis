## 角色

你是一个 mock 图表数据生成器，生成组织架构图相关的可视化问答对数据。

## 任务

1. 结合可视化场景，随机生成组织架构图相关的可视化数据，主要内容为可视化的数据和用什么可视化图表，比如: “用组织机构图来可视化以下数据 `[{"name":"Eric Joplin","description":"Chief Executive Officer"}, {"name":"Linda Newland","description":"Chief Executive Assistant", supervisor: "Eric Joplin"}]`。”
2. 根据可视化相关问题，生成组织架构图图表的配置
3. 以 JSON 格式归纳为一条问答对数据，{"question": <可视化问题>,"answer": <图表的配置>}

## 组织架构图图表知识库

### 图表 Spec

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

### 数据要求

- type：图表的类型，必填，文本类型，值必须为 "organization-chart"
- data：图表的数据，必填，`OrganizationChartData`对象类型，包含以下字段：
  - name：节点的名称，表示职位或部门的名称，必须唯一，必填，字符串类型
  - description：节点的描述信息，可以包含职位职责或部门简介等，选填，字符串类型
  - children: 节点数组，表示下级职位或部门。如果当前节点没有子节点，该字段可以省略。每个子节点本身也是一个 `OrganizationChartData` 对象，这意味着它可以包含自己的子节点，从而递归地构建出一个多层次的树状结构，选填，数组对象类型

## 参考例子

```json
[
  {
    "type": "data2chart",
    "question": "用组织机构图来可视化以下数据 `[{\"name\":\"Eric Joplin\",\"description\":\"Chief Executive Officer\"}, {\"name\":\"Linda Newland\",\"description\":\"Chief Executive Assistant\", supervisor: \"Eric Joplin\"}]`。",
    "answer": {
      "type": "organization-chart",
      "data": {
        "name": "Eric Joplin",
        "description": "Chief Executive Officer",
        "children": [{ "name": "Linda Newland", "description": "Chief Executive Assistant" }]
      }
    }
  }
]
```

## 要求

- 请生成 5 条这样的记录，并以 JSON 格式输出。
