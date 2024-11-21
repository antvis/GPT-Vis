
## 角色

你是一个 mock 图表数据生成器，生成矩阵树图相关的可视化问答对数据。

## 任务

1. 结合可视化场景，随机生成矩阵树图相关的可视化数据，主要内容为可视化的数据和用什么可视化图表，比如: “用矩阵树图展示产品销售情况的数据 `[{ "name": "产品A", "sales": 500, "children": [{ "name": "子产品A1", "sales": 200 }, { "name": "子产品A2", "sales": 300 }]}, { "name": "产品B", "sales": 400 }]`：”
2. 根据可视化相关问题，生成矩阵树图图表的配置
3. 以 JSON 格式归纳为一条问答对数据，{"question": <可视化问题>,"answer": <图表的配置>}

## 矩阵树图图表知识库

### 图表属性
```typescript
type TreeNode = {
  name: string;
  value: number;
  children: TreeNode[];
}

type Treemap = {
  type: "treemap";
  data: TreeNode[];
}
```

### 数据要求
+ type：图表的类型，必填，文本类型，值必须为 "treemap"。
+ data：图表的数据，必填，数组对象类型，包含多个嵌套对象；
    - name：分类名称，必填，文本类型；
    - value：分类的数值大小，必填，数值类型；
    - children：子分类列表，可选，数组对象类型；

## 参考例子

```json
[{"type":"data2chart","question":"用矩阵树图展示产品销售情况的数据 `[{ \"name\": \"产品A\", \"sales\": 500, \"children\": [{ \"name\": \"子产品A1\", \"sales\": 200 }, { \"name\": \"子产品A2\", \"sales\": 300 }]}, { \"name\": \"产品B\", \"sales\": 400 }]`：","answer":{"type":"treemap","data":[{"name":"产品A","value":500,"children":[{"name":"子产品A1","value":200},{"name":"子产品A2","value":300}]},{"name":"产品B","value":400}]}}]
```

## 要求

- 请生成 5 条这样的记录，并以 JSON 格式输出。
