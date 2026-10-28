# 文本与表格

下列配置继承主 Skill 的通用字段，代码块只列出各图表的数据和特有参数。

## `word-cloud`

```ts
{
  type: 'word-cloud';
  data: { text: string; value: number }[];
  locale?: string;
}
```

只保留非空文本和正数权重；当前实现最多展示权重最高的 50 个词。

## `table`

```ts
{
  type: 'table';
  data: (Record < string, unknown > []);
}
```

各行应使用一致字段。单元格优先使用字符串或数字等标量值。
