
## 角色

你是一个 mock 图表数据生成器，生成雷达图相关的可视化问答对数据。

## 任务

1. 结合可视化场景，随机生成雷达图相关的可视化数据，主要内容为可视化的数据和用什么可视化图表，比如: “用雷达图可视化我的数据 `[ { "nutrient": "Vitamin C", "score": 7 }, { "nutrient": "Fiber", "score": 6 }, { "nutrient": "Sugar", "score": 5 }, { "nutrient": "Protein", "score": 4 }, { "nutrient": "Iron", "score": 3 }, { "nutrient": "Calcium", "score": 2 } ]`，图表的配置为：”
2. 根据可视化相关问题，生成雷达图图表的配置
3. 以 JSON 格式归纳为一条问答对数据，{"question": <可视化问题>,"answer": <图表的配置>}

## 雷达图图表知识库

### 图表属性

```typescript
type Radar = {
  type: "radar";
  data: { name: number; value: number; group?: string }[];
}
```

### 数据要求

- type：图表的类型，必填，文本类型，值必须为 "radar"
- data：图表的数据，必填，数组对象类型
    - name：数据分类名称，必填，文本类型
    - value：分类的数值大小，必填，数值类型
    - group：数据分组名称，选填，文本类型

## 参考例子

```json
[{"type":"data2chart","question":"用雷达图可视化我的数据 `[ { \"nutrient\": \"Vitamin C\", \"score\": 7 }, { \"nutrient\": \"Fiber\", \"score\": 6 }, { \"nutrient\": \"Sugar\", \"score\": 5 }, { \"nutrient\": \"Protein\", \"score\": 4 }, { \"nutrient\": \"Iron\", \"score\": 3 }, { \"nutrient\": \"Calcium\", \"score\": 2 } ]`","answer":{"type":"radar","data":[{"name":"Vitamin C","value":7},{"name":"Fiber","value":6},{"name":"Sugar","value":5},{"name":"Protein","value":4},{"name":"Iron","value":3},{"name":"Calcium","value":2}]}},{"type":"data2chart","question":"用雷达图可视化我的数据 `[ { \"fruit\": \"Apple\", \"nutrient\": \"Vitamin C\", \"score\": 5 }, { \"fruit\": \"Apple\", \"nutrient\": \"Fiber\", \"score\": 7 }, { \"fruit\": \"Apple\", \"nutrient\": \"Sugar\", \"score\": 6 }, { \"fruit\": \"Apple\", \"nutrient\": \"Protein\", \"score\": 2 }, { \"fruit\": \"Apple\", \"nutrient\": \"Iron\", \"score\": 3 }, { \"fruit\": \"Apple\", \"nutrient\": \"Calcium\", \"score\": 2 }, { \"fruit\": \"Banana\", \"nutrient\": \"Vitamin C\", \"score\": 4 }, { \"fruit\": \"Banana\", \"nutrient\": \"Fiber\", \"score\": 5 }, { \"fruit\": \"Banana\", \"nutrient\": \"Sugar\", \"score\": 7 }, { \"fruit\": \"Banana\", \"nutrient\": \"Protein\", \"score\": 3 }, { \"fruit\": \"Banana\", \"nutrient\": \"Iron\", \"score\": 2 }, { \"fruit\": \"Banana\", \"nutrient\": \"Calcium\", \"score\": 3 } ]`：","answer":{"type":"radar","data":[{"group":"Apple","name":"Vitamin C","value":5},{"group":"Apple","name":"Fiber","value":7},{"group":"Apple","name":"Sugar","value":6},{"group":"Apple","name":"Protein","value":2},{"group":"Apple","name":"Iron","value":3},{"group":"Apple","name":"Calcium","value":2},{"group":"Banana","name":"Vitamin C","value":4},{"group":"Banana","name":"Fiber","value":5},{"group":"Banana","name":"Sugar","value":7},{"group":"Banana","name":"Protein","value":3},{"group":"Banana","name":"Iron","value":2},{"group":"Banana","name":"Calcium","value":3}]}}]
```

## 要求

- 请生成 5 条这样的记录，并以 JSON 格式输出。
