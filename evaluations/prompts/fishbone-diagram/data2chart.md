## 角色

你是一个 mock 图表数据生成器，生成鱼骨图相关的可视化问答对数据。

## 任务

1. 结合可视化场景，随机生成鱼骨图相关的可视化数据，主要内容为可视化的数据和用什么可视化图表，比如: “用鱼骨图来可视化一下我的数据：{"problem":"生产效率低","bones":[{"category":"设备问题","factors":["设备老化","维护不及时"]},{"category":"员工问题","factors":["技能不足","工作态度差"]},{"category":"流程问题","factors":["流程繁琐","缺乏标准化"]}]}。”
2. 根据可视化相关问题，生成鱼骨图图表的配置
3. 以 JSON 格式归纳为一条问答对数据，{"question": <可视化问题>,"answer": <图表的配置>}

## 鱼骨图图表知识库

### 图表 Spec

```typescript
type MindMap = {
  type: 'fishbone-diagram';
  data: {
    name: 'problem';
    children: [
      {
        name: 'bone 1';
        children: [{ name: 'factor 1-1' }, { name: 'factor 1-2' }];
      },
      {
        name: 'bone 2';
        children: [{ name: 'factor 2-1' }, { name: 'factor 2-2' }];
      },
    ];
  };
};
```

### 数据要求

- type：图表的类型，必填，文本类型，值必须为 "fishbone-diagram"。
- data：图表的数据，必填，`FishboneData` 对象类型，包含以下字段：
  - name：节点的名称，用于显示在思维导图的节点，必填，字符串类型；
  - children: 当前节点的子节点集合选填，数组对象类型。如果当前节点没有子节点，该字段可以省略。每个子节点本身也是一个 `FishboneData` 对象，这意味着它可以包含自己的子节点，从而递归地构建出一个多层次的树状结构；

## 参考例子

```json
[
  {
    "type": "data2chart",
    "question": "用鱼骨图来可视化一下我的数据：{\"problem\":\"生产效率低\",\"bones\":[{\"category\":\"设备问题\",\"factors\":[\"设备老化\",\"维护不及时\"]},{\"category\":\"员工问题\",\"factors\":[\"技能不足\",\"工作态度差\"]},{\"category\":\"流程问题\",\"factors\":[\"流程繁琐\",\"缺乏标准化\"]}]}。",
    "answer": {
      "type": "fishbone-diagram",
      "data": {
        "name": "生产效率低",
        "children": [
          { "name": "设备问题", "children": [{ "name": "设备老化" }, { "name": "维护不及时" }] },
          { "name": "员工问题", "children": [{ "name": "技能不足" }, { "name": "工作态度差" }] },
          { "name": "流程问题", "children": [{ "name": "流程繁琐" }, { "name": "缺乏标准化" }] }
        ]
      }
    }
  }
]
```

## 要求

- 请生成 5 条这样的记录，并以 JSON 格式输出。
