# Boxplot

箱线图（Boxplot），又称箱形图或须状图，用于展示数据的统计分布特征，包括中位数、四分位数范围和异常值。通过箱体和须线直观呈现数据的集中趋势、离散程度和偏态情况。适合用于数据分布分析和多组数据比较。

## 适用场景

1. 展示数据分布特征：直观呈现数据的中位数、四分位数范围、最大最小值及离群值，适用于成绩分布、实验数据、金融行情等需要了解整体分布形态的场景。
2. 多组数据分布对比：并排展示多个类别或分组的数据分布，便于横向比较各组的集中趋势和离散程度，如不同班级成绩、不同实验组结果的对比分析。
3. 识别异常值：通过须线外的离群点快速定位异常数据，适用于质量检测、传感器数据监控、金融风控等需要发现异常的场景。
4. 质量控制与统计分析：在生产制造、医学研究、科学实验等领域，用于评估数据的稳定性和一致性，辅助统计推断和决策。

## 不适用场景

1. 不适合数据量极少（少于 5 个数据点）的场景，统计意义不足。
2. 不适合展示数据随时间变化的趋势，建议使用折线图。
3. 当需要精确展示每个数据点时，建议使用散点图。

## 配置

| 属性                  | 类型              | 是否必填 | 默认值    | 说明                                                |
| --------------------- | ----------------- | -------- | --------- | --------------------------------------------------- |
| type                  | string            | 必填     | -         | 图表类型，值为 "boxplot"                            |
| data                  | BoxplotDataItem[] | 必填     | -         | 箱线图数据                                          |
| data[n].category      | string            | 必填     | -         | 数据分类名称                                        |
| data[n].value         | number            | 必填     | -         | 数据数值                                            |
| data[n].group         | string            | 选填     | -         | 分组名称，用于分组箱线图                            |
| title                 | string            | 选填     | -         | 图表标题                                            |
| theme                 | string            | 选填     | "default" | 图表主题，可选值为 "default" \| "academy" \| "dark" |
| axisXTitle            | string            | 选填     | -         | X 轴标题                                            |
| axisYTitle            | string            | 选填     | -         | Y 轴标题                                            |
| style                 | object            | 选填     | -         | 图表样式                                            |
| style.backgroundColor | string            | 选填     | -         | 背景颜色，合法颜色值                                |
| style.palette         | string[]          | 选填     | -         | 颜色映射，合法颜色值数组                            |
| style.startAtZero     | boolean           | 选填     | false     | Y 轴是否从零开始                                    |

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
vis boxplot
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

### 使用 academy 主题展示实验数据分布

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

const visSyntax = `
vis boxplot
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
vis boxplot
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
  palette #FF9800 #2196F3
  backgroundColor #F5F5F5
`;

gptVis.render(visSyntax);
```

### 展示分组箱线图

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

const visSyntax = `
vis boxplot
data
  - category Adelie
    group MALE
    value 181
  - category Adelie
    group FEMALE
    value 186
  - category Adelie
    group MALE
    value 190
  - category Adelie
    group FEMALE
    value 181
  - category Adelie
    group MALE
    value 191
  - category Chinstrap
    group MALE
    value 195
  - category Chinstrap
    group FEMALE
    value 191
  - category Chinstrap
    group MALE
    value 198
title 帕尔默企鹅身高性别差异
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
vis boxplot
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
