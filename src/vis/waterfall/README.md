# Waterfall

瀑布图（Waterfall Chart），用于展示数据在多个阶段中的累计变化过程。通过连续的柱状块表现每一步骤的增减量及累计值，直观反映正负变化对整体结果的影响。适合分析财务数据、预算执行、利润构成等场景。

## 适用场景

1. 财务利润/亏损分析：展示收入、成本、税费等各项因素对最终利润的正负贡献，直观呈现盈亏构成。
2. 预算执行差异分析：对比预算与实际执行之间的偏差，逐项拆解超支或节余的来源。
3. 各因素对总量的增减贡献：分析多个驱动因素（如销量、价格、成本）对总体指标变化的影响幅度与方向。
4. 多阶段累积变化过程展示：以连续步骤的形式呈现从起始值到终止值的逐步演变，适合展示资金流动、库存变化等过程。

## 不适用场景

1. 不适合展示无顺序关系或无累计逻辑的类别数据。
2. 不适合用于时间序列趋势分析。
3. 当数据项过多时，图表可能显得拥挤，建议适当精简数据或使用其他图表类型。

## 配置

| 属性                        | 类型                | 是否必填 | 默认值    | 说明                                                                                  |
| --------------------------- | ------------------- | -------- | --------- | ------------------------------------------------------------------------------------- |
| type                        | string              | 必填     | -         | 图表类型，值为 "waterfall"                                                            |
| data                        | WaterfallDataItem[] | 必填     | -         | 瀑布图数据                                                                            |
| data[n].category            | string              | 必填     | -         | 数据名称                                                                              |
| data[n].value               | number              | 选填     | -         | 数据数值，正数表示增加，负数表示减少                                                  |
| data[n].isIntermediateTotal | boolean             | 选填     | false     | 是否为中间汇总项                                                                      |
| data[n].isTotal             | boolean             | 选填     | false     | 是否为最终汇总项                                                                      |
| title                       | string              | 选填     | -         | 图表标题                                                                              |
| theme                       | string              | 选填     | "default" | 图表主题，可选值为 "default" \| "academy" \| "dark"                                   |
| axisXTitle                  | string              | 选填     | -         | X 轴标题                                                                              |
| axisYTitle                  | string              | 选填     | -         | Y 轴标题                                                                              |
| style.backgroundColor       | string              | 选填     | -         | 背景颜色，合法颜色值                                                                  |
| style.palette               | string[]            | 选填     | -         | 色板数组，顺序为 [正值色, 负值色, 汇总色]，默认值为 ['#FF4D4F', '#2EBB59', '#1783FF'] |

## 示例

### 展示企业利润构成瀑布图

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

const visSyntax = `
vis waterfall
data
  - category 期初利润
    value 100
  - category 销售收入
    value 80
  - category 运营成本
    value -50
  - category 税费
    value -20
  - category 总计
    isTotal true
title 企业利润构成
`;

gptVis.render(visSyntax);
```

### 使用 dark 主题展示预算执行

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

const visSyntax = `
vis waterfall
data
  - category 基础预算
    value 500
  - category 市场投入
    value 120
  - category 采购优化
    value -60
  - category 运营效率
    value -30
  - category 总利润
    isTotal true
title 预算执行情况
theme dark
`;

gptVis.render(visSyntax);
```

### 自定义正负总计颜色

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

const visSyntax = `
vis waterfall
data
  - category Q1收入
    value 1000
  - category Q2收入
    value 1200
  - category 成本
    value -800
  - category 净利润
    isTotal true
title 季度财务报告
style
  palette
    - #52c41a
    - #f5222d
    - #1890ff
`;

gptVis.render(visSyntax);
```

### 展示含中间小计的瀑布图

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

const visSyntax = `
vis waterfall
data
  - category 基础预算
    value 500
  - category 市场投入
    value 120
  - category 总投入
    isIntermediateTotal true
  - category 采购优化
    value -60
  - category 运营效率
    value -30
  - category 总利润
    isTotal true
title 预算分析
`;

gptVis.render(visSyntax);
```

### 设置坐标轴标题

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

const visSyntax = `
vis waterfall
data
  - category 期初
    value 100
  - category 收入
    value 80
  - category 支出
    value -50
  - category 期末
    isTotal true
title 财务流水
axisXTitle 项目
axisYTitle 金额（万元）
`;

gptVis.render(visSyntax);
```

### 自定义背景颜色

```js
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

const visSyntax = `
vis waterfall
data
  - category 初始
    value 50
  - category 增长
    value 30
  - category 减少
    value -10
  - category 最终
    isTotal true
style
  backgroundColor #f0f2f5
`;

gptVis.render(visSyntax);
```
