# Violin

小提琴图（Violin Chart），用于展示数据的统计分布和概率密度的图表。以对称的小提琴形状呈现各类别的数据分布，结合密度曲线与箱线图，直观反映数据的集中趋势、离散程度和分布形态。适合分析不同类别之间的分布差异。

## 适用场景

1. 需要展示数据的概率密度分布形态时，如成绩分布、实验数据分布等，相比箱线图能呈现更丰富的分布细节。
2. 需要对比多个类别或分组之间的数值分布差异时，如不同班级的成绩分布、不同实验组的测量结果对比。
3. 需要识别数据中的多峰分布、偏态分布等复杂分布形态时，密度曲线能直观反映这些特征。
4. 需要同时观察数据的分布形态与统计摘要（中位数、四分位数等）时，适合金融数据分析、生物统计等场景。

## 不适用场景

1. 不适合展示数据量极少的场景，密度估计需要足够的样本量才有意义。
2. 不适合用于展示类别型数据或无数值分布的数据。
3. 当只需展示简单统计摘要时，建议使用箱线图；当需要展示趋势变化时，建议使用折线图。

## 配置

| 属性                  | 类型             | 是否必填 | 默认值    | 说明                                                |
| --------------------- | ---------------- | -------- | --------- | --------------------------------------------------- |
| type                  | string           | 必填     | -         | 图表类型，值为 "violin"                             |
| data                  | ViolinDataItem[] | 必填     | -         | 小提琴图数据                                        |
| data[n].category      | string           | 必填     | -         | 数据类别名称                                        |
| data[n].value         | number           | 必填     | -         | 数据数值                                            |
| data[n].group         | string           | 选填     | -         | 分组名称，用于分组小提琴图                          |
| title                 | string           | 选填     | -         | 图表标题                                            |
| theme                 | string           | 选填     | "default" | 图表主题，可选值为 "default" \| "academy" \| "dark" |
| axisXTitle            | string           | 选填     | -         | X 轴标题                                            |
| axisYTitle            | string           | 选填     | -         | Y 轴标题                                            |
| style                 | object           | 选填     | -         | 图表样式                                            |
| style.backgroundColor | string           | 选填     | -         | 背景颜色，合法颜色值                                |
| style.palette         | string[]         | 选填     | -         | 颜色映射，合法颜色值数组                            |
| style.startAtZero     | boolean          | 选填     | false     | Y 轴是否从零开始                                    |

## 示例

### 展示各班级成绩分布

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

const visSyntax = `
vis violin
data
  - category 班级A
    value 15
  - category 班级A
    value 18
  - category 班级A
    value 22
  - category 班级A
    value 27
  - category 班级A
    value 35
  - category 班级B
    value 10
  - category 班级B
    value 14
  - category 班级B
    value 19
  - category 班级B
    value 23
  - category 班级B
    value 30
title 成绩分布
`;

gptVis.render(visSyntax);
```

### 使用 academy 主题展示实验数据

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

const visSyntax = `
vis violin
data
  - category 实验组1
    value 12
  - category 实验组1
    value 15
  - category 实验组1
    value 20
  - category 实验组1
    value 25
  - category 实验组1
    value 30
theme academy
title 实验数据分布
`;

gptVis.render(visSyntax);
```

### 自定义颜色样式展示

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

const visSyntax = `
vis violin
data
  - category 股票A
    value 50
  - category 股票A
    value 55
  - category 股票A
    value 60
  - category 股票A
    value 65
  - category 股票A
    value 70
title 金融数据分布
style
  palette #FF9800 #2196F3 #F5F5F5
  backgroundColor #333333
`;

gptVis.render(visSyntax);
```

### 展示分组小提琴图

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

const visSyntax = `
vis violin
data
  - group I.setosa
    category PetalWidth
    value 0.2
  - group I.setosa
    category PetalLength
    value 1.4
  - group I.setosa
    category SepalWidth
    value 3.5
  - group I.setosa
    category SepalLength
    value 5.1
  - group I.versicolor
    category PetalWidth
    value 1.4
  - group I.versicolor
    category PetalLength
    value 4.7
  - group I.versicolor
    category SepalWidth
    value 3.2
  - group I.versicolor
    category SepalLength
    value 7.0
title 不同品种鸢尾花特征分布
`;

gptVis.render(visSyntax);
```

### Y 轴从零开始

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

const visSyntax = `
vis violin
data
  - category 班级A
    value 15
  - category 班级A
    value 18
  - category 班级A
    value 22
style
  startAtZero true
`;

gptVis.render(visSyntax);
```
