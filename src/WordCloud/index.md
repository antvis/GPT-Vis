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

```jsx
import React from 'react';
import { WordCloud } from '@antv/gpt-vis';

const data = [
  { value: 11.3865516372, text: '物质' },
  { value: 7.75434839431, text: '万物' },
  { value: 9.29550746599, text: '感官' },
  { value: 6.89126871927, text: '事物' },
  { value: 11.739204307083542, text: '会变' },
  { value: 9.29550746599, text: '感官' },
  { value: 8.70772080109, text: '认知' },
  { value: 13.68728134056, text: '元素' },
  { value: 8.29487558568, text: '世间' },
  { value: 8.77077893705, text: '肉眼' },
  { value: 8.10461990121, text: '大自然' },
  { value: 7.69410172525, text: '粒子' },
  { value: 7.65457088649, text: '分割' },
  { value: 21.6192703972, text: '积木' },
  { value: 10.7226238216, text: '永恒不变' },
  { value: 7.14957618304, text: '原子' },
  { value: 7.95787827685, text: '尺度' },
  { value: 7.36109169636, text: '衡量' },
  { value: 11.7034530746, text: '明辨是非' },
  { value: 9.14102377386, text: '存在' },
  { value: 6.90950076485, text: '理性' },
  { value: 12.06102341102, text: '模式' },
  { value: 11.739204307083542, text: '理型' },
  { value: 11.3865516372, text: '物质' },
  { value: 9.54656840164, text: '东西' },
  { value: 8.73505881114, text: '世界' },
  { value: 34.45634359635, text: '事物' },
  { value: 27.886522397969998, text: '感官' },
  { value: 6.47412857958, text: '痛苦' },
  { value: 6.06866347147, text: '避免' },
  { value: 5.02315619812, text: '形式' },
  { value: 4.80149232937, text: '方式' },
  { value: 21.209681572, text: '万事万物' },
  { value: 7.48068272383, text: '上帝' },
  { value: 7.37711534583, text: '一体' },
  { value: 7.36834335975, text: '宇宙' },
  { value: 9.17328983326, text: '赦免' },
  { value: 8.04274449749, text: '拯救' },
  { value: 7.48068272383, text: '上帝' },
  { value: 14.96136544766, text: '上帝' },
  { value: 7.95787827685, text: '世人' },
  { value: 14.96136544766, text: '上帝' },
  { value: 11.67082488616, text: '创造' },
  { value: 9.80633308975, text: '虚空' },
  { value: 8.73505881114, text: '世界' },
  { value: 16.57509909118, text: '启示' },
  { value: 14.51638170122, text: '信仰' },
  { value: 13.8190015297, text: '理性' },
  { value: 10.5684731418, text: '观感' },
  { value: 12.57964972316, text: '地球' },
  { value: 12.45583951066, text: '太阳' },
  { value: 11.39201164604, text: '运行' },
  { value: 14.35128801962, text: '物体' },
  { value: 11.18052531558, text: '状态' },
  { value: 10.0505300503, text: '轴心' },
  { value: 9.56994431169, text: '星球' },
  { value: 9.29550746599, text: '感官' },
  { value: 21.52693202943, text: '物体' },
  { value: 7.36834335975, text: '宇宙' },
  { value: 22.44204817149, text: '上帝' },
  { value: 12.1089181827, text: '主宰世界' },
  { value: 10.8096351986, text: '牵线' },
  { value: 10.6818018271, text: '自然法则' },
  { value: 18.59101493198, text: '感官' },
  { value: 15.51728049278, text: '心灵' },
  { value: 10.1394775363, text: '任何事物' },
  { value: 14.95161725614, text: '哲学家' },
  { value: 13.78796485028, text: '感受' },
  { value: 10.3743171274, text: '天主' },
  { value: 10.2117981979, text: '质料' },
  { value: 9.14102377386, text: '存在' },
  { value: 14.96136544766, text: '上帝' },
  { value: 14.35850390238, text: '头顶' },
  { value: 12.5143832909, text: '因果律' },
  { value: 11.0674643079, text: '根植' },
  { value: 16.20923980242, text: '大自然' },
  { value: 13.10258821671, text: '世界' },
  { value: 11.3865516372, text: '物质' },
  { value: 10.1164880181, text: '无休止' },
  { value: 13.10258821671, text: '世界' },
  { value: 11.23942650284, text: '精神' },
  { value: 10.1394775363, text: '脚踏实地' },
  { value: 26.6063055869, text: '阶段' },
  { value: 13.0408437271, text: '真实' },
  { value: 10.48883682488, text: '是否' },
  { value: 17.0798274558, text: '物质' },
  { value: 11.739204307083542, text: '新的' },
  { value: 11.23942650284, text: '精神' },
  { value: 10.4471578861, text: '改变' },
  { value: 10.21443458184, text: '造成' },
  { value: 16.20923980242, text: '一艘' },
  { value: 15.07529909688, text: '航行' },
  { value: 11.739204307083542, text: '人则' },
  { value: 11.7034530746, text: '物竞天择' },
  { value: 10.5684731418, text: '适者生存' },
  { value: 19.89886786678, text: '潜意识' },
  { value: 12.76848869812, text: '意识' },
];
export default () => <WordCloud data={data} containerStyle={{ height: 300 }} />;
```

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

| 属性  | 类型                | 是否必传 | 默认值 | 说明       |
| ----- | ------------------- | -------- | ------ | ---------- |
| data  | WordCloudDataItem[] | 是       | -      | 数据       |
| title | string              | 否       | -      | 图表的标题 |

### WordCloudDataItem

| 属性  | 类型   | 是否必传 | 默认值 | 说明 |
| ----- | ------ | -------- | ------ | ---- |
| text  | string | 是       | -      | 文本 |
| value | number | 是       | -      | 词频 |
