# Bar

条形图（Bar Chart），用于展示不同类别之间的数据对比，以水平方向的条形长度表示各类别的数值大小。支持基础条形图、分组条形图和堆叠条形图三种形式，适合类别名称较长或类别数量较多的场景。

## 适用场景

1. 类别数量较多时，横向条形排列可有效避免标签拥挤，提升可读性。
2. 类别名称较长时，横向布局使标签自然展开，避免旋转或截断。
3. 需要展示排名或按数值大小排序的场景，如榜单、Top N 对比。
4. 通过分组或堆叠方式对比多维度数据，如不同地区、不同时期的多指标横向比较。

## 不适用场景

1. 不适合展示时间序列或连续趋势数据，建议使用折线图。
2. 不适合展示占比或比例关系，建议使用饼图。
3. 当类别数量极多且差异细微时，图表会变得难以阅读。

## 配置

| 属性                  | 类型          | 是否必填 | 默认值    | 说明                                                |
| --------------------- | ------------- | -------- | --------- | --------------------------------------------------- |
| type                  | string        | 必填     | -         | 图表类型，值为 "bar"                                |
| data                  | BarDataItem[] | 必填     | -         | 条形图数据                                          |
| data[n].category      | string        | 必填     | -         | 类别名称                                            |
| data[n].value         | number        | 必填     | -         | 数据数值                                            |
| data[n].group         | string        | 选填     | -         | 分组名称，用于分组或堆叠条形图                      |
| group                 | boolean       | 选填     | false     | 是否启用分组模式，需要数据包含 group 字段           |
| stack                 | boolean       | 选填     | false     | 是否启用堆叠模式，需要数据包含 group 字段           |
| title                 | string        | 选填     | -         | 图表标题                                            |
| axisXTitle            | string        | 选填     | -         | X 轴标题                                            |
| axisYTitle            | string        | 选填     | -         | Y 轴标题                                            |
| theme                 | string        | 选填     | "default" | 图表主题，可选值为 "default" \| "academy" \| "dark" |
| style                 | object        | 选填     | -         | 图表样式                                            |
| style.backgroundColor | string        | 选填     | -         | 背景颜色，合法颜色值                                |
| style.palette         | string[]      | 选填     | -         | 颜色映射，合法颜色值数组                            |

## 示例

### 展示各产业产值对比

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

const visSyntax = `
vis bar
data
  - category 第一产业
    value 7200
  - category 第二产业
    value 36600
  - category 第三产业
    value 41000
title 各产业产值对比
`;

gptVis.render(visSyntax);
```

### 展示分组条形图

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

const visSyntax = `
vis bar
group true
data
  - category 北京
    value 825.6
    group 油车
  - category 北京
    value 60.2
    group 新能源汽车
  - category 上海
    value 450
    group 油车
  - category 上海
    value 95
    group 新能源汽车
title 油车与新能源汽车售卖量
`;

gptVis.render(visSyntax);
```

### 展示堆叠条形图

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

const visSyntax = `
vis bar
stack true
data
  - category 北京
    value 825.6
    group 油车
  - category 北京
    value 60.2
    group 新能源汽车
  - category 上海
    value 450
    group 油车
  - category 上海
    value 95
    group 新能源汽车
title 油车与新能源汽车售卖量
`;

gptVis.render(visSyntax);
```

### 使用 academy 主题展示收入数据

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

const visSyntax = `
vis bar
data
  - category 2015年
    value 80
  - category 2016年
    value 140
  - category 2017年
    value 220
title 海底捞公司外卖收入
theme academy
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
vis bar
data
  - category 2015年
    value 80
  - category 2016年
    value 140
  - category 2017年
    value 220
title 海底捞公司外卖收入
style
  palette #FF6B6B #4ECDC4 #45B7D1
  backgroundColor #F5F5F5
`;

gptVis.render(visSyntax);
```
