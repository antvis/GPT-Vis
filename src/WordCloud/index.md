---
order: 7
group:
  order: 1
  title: 统计图
toc: content
---

# WordCloud 词云图

词云图通过把文本中常出现的关键词放大，让用户更容易找到重要信息。

## 代码演示

### 单独使用

<code src="./demos/common">单独使用</code>

### 使用 Markdown 协议

```tsx
import { Bubble, type BubbleProps } from '@ant-design/x';
import { WordCloud, withChartCode, ChartType, GPTVisLite } from '@antv/gpt-vis';

const bgStyle = {
  display: 'grid',
  gridGap: '20px 0',
  background: '#f7f7f7',
  padding: 20,
  borderRadius: 8,
  overflow: 'auto',
};

const markdownContent = `
 ~~~vis-chart
  {
    "type": "word-cloud",
    "data": [
      { "value": 9, "text": "AntV" },
      { "value": 8, "text": "F2" },
      { "value": 8, "text": "G2" },
      { "value": 8, "text": "G6" },
      { "value": 8, "text": "DataSet" },
      { "value": 8, "text": "墨者学院" },
      { "value": 6, "text": "Analysis" },
      { "value": 6, "text": "Data Mining" },
      { "value": 6, "text": "Data Vis" },
      { "value": 6, "text": "Design" },
      { "value": 6, "text": "Grammar" },
      { "value": 6, "text": "Graphics" },
      { "value": 6, "text": "Graph" },
      { "value": 6, "text": "Hierarchy" },
      { "value": 6, "text": "Labeling" },
      { "value": 6, "text": "Layout" },
      { "value": 6, "text": "Quantitative" },
      { "value": 6, "text": "Relation" },
      { "value": 6, "text": "Statistics" },
      { "value": 6, "text": "可视化" },
      { "value": 6, "text": "数据" },
      { "value": 6, "text": "数据可视化" }
    ]
  }
~~~`;

const CodeComponent = withChartCode({
  components: { [ChartType.WordCloud]: WordCloud },
  style: { width: 400 },
});

const RenderMarkdown: BubbleProps['messageRender'] = (content) => (
  <GPTVisLite components={{ code: CodeComponent }}>{content}</GPTVisLite>
);

export default () => {
  return (
    <div style={bgStyle}>
      <Bubble
        placement="end"
        content="以词云图可视化我的数据"
        avatar={{
          src: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*2Q5LRJ3LFPUAAAAAAAAAAAAADmJ7AQ/fmt.webp',
        }}
        styles={{ content: { background: '#ebebeb' } }}
      />
      <Bubble
        content={markdownContent}
        messageRender={RenderMarkdown}
        avatar={{
          src: 'https://mdn.alipayobjects.com/huamei_je4oko/afts/img/A*6LRBT7rjOkQAAAAAAAAAAAAADsZ-AQ/original',
        }}
        variant="shadow"
        styles={{ content: { background: '#fff' } }}
      />
    </div>
  );
};
```

## Spec

```json
{
  "type": "word-cloud",
  "data": [
    { "value": 11.739204307083542, "text": "水是" },
    { "value": 9.23723855786, "text": "之源" },
    { "value": 7.75434839431, "text": "万物" },
    { "value": 11.3865516372, "text": "物质" },
    { "value": 7.75434839431, "text": "万物" },
    { "value": 5.83541244308, "text": "创造" },
    { "value": 4.27215339948, "text": "形成" }
  ]
}
```

## API

### WordCloudProps

| 属性  | 类型                                     | 是否必传 | 默认值    | 说明       |
| ----- | ---------------------------------------- | -------- | --------- | ---------- |
| data  | WordCloudDataItem[]                      | 是       | -         | 数据       |
| title | string                                   | 否       | -         | 图表的标题 |
| theme | "default" &#124; "dark" &#124; "academy" | 否       | "default" | 图表主题   |
| style | IStyle                                   | 否       | -         | 图表样式   |

### IStyle

| 属性            | 类型     | 是否必传 | 默认值 | 说明     |
| --------------- | -------- | -------- | ------ | -------- |
| backgroundColor | string   | 否       | -      | 背景颜色 |
| palette         | string[] | 否       | -      | 颜色映射 |

### WordCloudDataItem

| 属性  | 类型   | 是否必传 | 默认值 | 说明 |
| ----- | ------ | -------- | ------ | ---- |
| text  | string | 是       | -      | 文本 |
| value | number | 是       | -      | 词频 |
