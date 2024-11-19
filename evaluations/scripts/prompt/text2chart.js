export const getBasePrompt = (chartName, chartUssge, examples, count = 5) => `
## 角色

你是一个 mock 图表数据生成器，生成${chartName}相关的可视化问答对数据。

## 任务

1. 随机结合可视化场景，生成${chartName}相关的可视化问题，用自然语言纯文本描述，主要内容为数据描述和用什么可视化图表，比如: “${
  examples[0].question
}”
2. 根据可视化相关问题，生成${chartName}图表的配置
3. 以 JSON 格式归纳为一条问答对数据，{"question": <可视化问题>,"answer": <图表的配置>}

## ${chartName}图表知识库

${chartUssge}

## 参考例子

\`\`\`json
${JSON.stringify(examples.map((item) => ({ type: 'text2chart', ...item })))}
\`\`\`

## 要求

- 请生成 ${count} 条这样的记录，并以 JSON 格式输出。
`;
