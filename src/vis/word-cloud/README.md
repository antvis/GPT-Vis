# WordCloud

词云图（Word Cloud Chart），用于以视觉化方式展示文本数据中词语的频率或重要性。词语的字体大小与其对应的数值成正比，数值越大字体越大，整体呈云状分布，直观反映词语的权重差异。适合用于关键词分析、用户反馈摘要、热点话题展示等场景。

## 适用场景

1. 关键词与词频可视化：通过字体大小直观反映词语出现频率或重要程度，适合对文章、文档进行关键词分析。
2. 用户评论热词展示：汇总用户反馈、评价或评论中的高频词汇，快速把握整体舆情或产品口碑。
3. 热点话题权重呈现：展示社交媒体、新闻资讯中各话题词的热度分布，直观感知当前舆论焦点。
4. 文本特征快速概览：对大批量文本数据做整体性概貌展示，帮助读者在不逐条阅读的情况下快速了解文本主题分布。

## 不适用场景

1. 不适合展示精确数值对比，词云图侧重视觉感知而非精确读数。
2. 不适合用于时间序列或趋势分析。
3. 当需要展示类别之间精确的数量差异时，建议使用柱状图或条形图。

## 配置

- type：图表类型，必填，文本类型，值为 "word-cloud"。
- data：词云图数据，必填，数组类型，每项包含以下字段：
  - text：词语文本，必填，文本类型。
  - value：词语权重或频率，必填，数值类型。
- title：图表标题，选填，文本类型。
- theme：图表主题，选填，文本类型，可选值为 "default" | "academy" | "dark"，默认值为 "default"。
- style：图表样式，选填，对象类型，包含以下字段：
  - backgroundColor：背景颜色，选填，文本类型，合法颜色值。
  - palette：颜色映射，选填，数组类型，合法颜色值数组。

## 示例

### 展示环保关键词频率分布

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

const visSyntax = `
vis word-cloud
data
  - text 环保
    value 10
  - text 气候变化
    value 8
  - text 可再生能源
    value 6
  - text 碳排放
    value 5
  - text 绿色生活
    value 4
title 环保关键词
`;

gptVis.render(visSyntax);
```

### 使用 academy 主题

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

const visSyntax = `
vis word-cloud
data
  - text 环境
    value 20
  - text 保护
    value 15
  - text 可持续发展
    value 10
theme academy
`;

gptVis.render(visSyntax);
```

### 自定义颜色样式

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

const visSyntax = `
vis word-cloud
data
  - text 质量好
    value 30
  - text 价格合理
    value 20
  - text 服务差
    value 5
style
  palette #FF6B6B #4ECDC4 #45B7D1
`;

gptVis.render(visSyntax);
```

### 带标题展示环保关键词

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

const visSyntax = `
vis word-cloud
data
  - text 环保
    value 10
  - text 气候变化
    value 8
  - text 可再生能源
    value 6
  - text 碳排放
    value 5
  - text 绿色生活
    value 4
title 环保关键词
`;

gptVis.render(visSyntax);
```

### 使用 dark 主题

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

const visSyntax = `
vis word-cloud
data
  - text 环境
    value 20
  - text 保护
    value 15
  - text 可持续发展
    value 10
theme dark
`;

gptVis.render(visSyntax);
```
