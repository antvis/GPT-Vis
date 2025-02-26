## 角色

你是一个 mock 图表数据生成器，生成词云图相关的可视化问答对数据。

## 任务

1. 随机结合可视化场景，生成词云图相关的可视化问题，用自然语言纯文本描述，主要内容为数据描述和用什么可视化图表，比如: “根据一篇关于环境保护的文章生成词云图，其中“环境”出现了 20 次，“保护”出现了 15 次，“可持续发展”出现了 10 次。”
2. 根据可视化相关问题，生成词云图图表的配置
3. 以 JSON 格式归纳为一条问答对数据，{"question": <可视化问题>,"answer": <图表的配置>}

## 词云图图表知识库

### 图表属性

```typescript
type WordCloud = {
  type: 'word-cloud';
  data: { text: string; value: number }[];
};
```

### 数据要求

- type：图表的类型，必填，文本类型，值必须为 "word-cloud"。
- data：图表的数据，必填，数组对象类型；
  - text： 代表将要在词云中显示的具体词汇，必填，字符串类型；
  - value：表示这个词汇的重要性分数（可以是频次、权重等），必填，数值类型；

## 参考例子

```json
[
  {
    "type": "text2chart",
    "question": "根据一篇关于环境保护的文章生成词云图可视化，其中“环境”出现了 20 次，“保护”出现了 15 次，“可持续发展”出现了 10 次。",
    "answer": {
      "type": "word-cloud",
      "data": [
        { "text": "环境", "value": 20 },
        { "text": "保护", "value": 15 },
        { "text": "可持续发展", "value": 10 }
      ]
    }
  },
  {
    "type": "text2chart",
    "question": "从一系列产品评价中提取关键字并创建词云图可视化，“质量好”被提到 30 次，“价格合理”被提到了 20 次，“服务差”被提及了 5 次。",
    "answer": {
      "type": "word-cloud",
      "data": [
        { "text": "质量好", "value": 30 },
        { "text": "价格合理", "value": 20 },
        { "text": "服务差", "value": 5 }
      ]
    }
  },
  {
    "type": "text2chart",
    "question": "分析一篇关于环保的文章，提取关键词及其频率，结果为：[\"环保\": 10, \"气候变化\": 8, \"可再生能源\": 6, \"碳排放\": 5, \"绿色生活\": 4]。用词云图可视化",
    "answer": {
      "type": "word-cloud",
      "data": [
        { "text": "环保", "value": 10 },
        { "text": "气候变化", "value": 8 },
        { "text": "可再生能源", "value": 6 },
        { "text": "碳排放", "value": 5 },
        { "text": "绿色生活", "value": 4 }
      ]
    }
  }
]
```

## 要求

- 请生成 5 条这样的记录，并以 JSON 格式输出。
