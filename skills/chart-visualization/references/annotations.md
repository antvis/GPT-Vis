# 图形标注与分析标注

当前源码提供 **28 种分析标注**和 6 种基础标注。使用 npm/CDN 前确认所选版本包含需要的能力；不要假定安装 Skill 会升级 SDK，也不要编造最低支持版本。旧版未包含时，使用已支持的发布版本或包含实现的源码构建。

## 配置职责

图表配置的 `annotations` 是标注数组。公共类型入口为 `Annotation<T>`；`T` 是原始业务数据。各视图只接受适合自己的能力和数据目标。

- `type` 选择标注能力。
- `data` 描述作用的数据、位置或字段映射。使用原始字段，不传 G2/G6 内部 ID、坐标映射函数或绘制配置。
- `n`、`threshold`、`range`、`minProminence`、`minDistance` 等专有参数放外层。
- `label` 是完整文字；`style` 控制外观。省略分析标注的 label 使用默认说明，显式字符串替换说明，空字符串隐藏说明。本期不支持 `{rank}`、`{value}` 等模板变量。
- 默认视觉跟随主题；只在有明确表达要求时覆盖样式。不要给 point/highlight 添加 shape、halo 等未开放配置。
- 同一图表推荐只选择一种主分析强调，例如 topN、group 或 thresholdHighlight；可搭配 path、range、point、text 提供参照和说明。本期不保证不同分析强调同时修改同一图形时的样式优先级。

统计图中的选择器按所有给定字段等值匹配；对象数组选择并集，保留原始观测顺序，重复目标不重复计数。需要定位单个对象时提供足以唯一匹配的字段。选择目标不会替换图表数据。

```json
{
  "type": "column",
  "data": [
    { "category": "A", "value": 30 },
    { "category": "B", "value": 50 },
    { "category": "C", "value": 20 }
  ],
  "annotations": [
    { "type": "topN", "n": 2 },
    { "type": "path", "data": { "value": 40 }, "label": "参考值" }
  ]
}
```

Syntax 与 JSON 使用同样的配置层级：

```text
vis line
data
  - time 1
    value 20
  - time 2
    value 50
  - time 3
    value 30
annotations
  - type mean
  - type thresholdY
    threshold 40
```

## 基础标注

| type      | data                                   | 专有配置与限制                                                                                       |
| --------- | -------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| path      | 单个轴值对象，或按顺序排列的锚点数组   | 单轴值绘制贯穿线；数组绘制路径；关系图只接受锚点数组                                                 |
| range     | 原始轴字段到两个边界值的映射           | 省略的轴覆盖绘图区；统计图支持，关系图不支持                                                         |
| connector | 恰好两个锚点的数组                     | shape：line、curve、dimension、bracket；orientation：horizontal、vertical，仅 dimension/bracket 使用 |
| point     | 一个位置或多个位置的数组               | 数组绘制多个独立标记；pulse 默认动画，false 保持静态；形状跟随主题                                   |
| text      | 一个位置                               | label 必填，是文字正文                                                                               |
| highlight | 原始数据选择器、表格行列目标或摘要文本 | 强调已有内容；多个标注共同选择并集并统一弱化其他内容                                                 |

path、range、connector、point、text 当前接入 line、area、column、bar、scatter；关系图 network-graph 接入除 range 外的基础标注。pie 当前仅支持 highlight 和下表列出的分析能力。表格和摘要仅使用自身支持的强调及分析能力。

```json
[
  { "type": "path", "data": { "value": 40 }, "label": "参考值" },
  { "type": "range", "data": { "time": ["2026-01-01", "2026-01-07"] } },
  { "type": "point", "data": { "time": "2026-01-03", "value": 50 }, "pulse": false },
  {
    "type": "connector",
    "data": [{ "time": "2026-01-01" }, { "time": "2026-01-03" }],
    "label": "上升"
  }
]
```

## 选择与强调（16 种分析标注）

| type                       | 专有参数                                  | 支持的图表                                                |
| -------------------------- | ----------------------------------------- | --------------------------------------------------------- |
| maxX / minX                | 无                                        | line、area、column、bar、scatter；x 必须是数值或 ISO 日期 |
| maxY / minY                | 无                                        | line、area、column、bar、scatter                          |
| first / last               | 无                                        | line、area、column、bar、scatter；输入必须有业务顺序      |
| peak / valley              | minProminence、minDistance                | line、area                                                |
| topN / bottomN             | n 必填                                    | line、area、column、bar、scatter、pie、table              |
| thresholdHighlight         | threshold 必填，direction、inclusive 可选 | line、area、column、bar、scatter、table                   |
| rangeInside / rangeOutside | range 必填                                | line、area、column、bar、scatter、table                   |
| outlier                    | factor 可选，默认 1.5                     | line、area、column、bar、scatter、table                   |
| group                      | 无；data 必填                             | line、area、column、bar、scatter                          |
| contribution               | 无；data 必填                             | line、area、column、bar、scatter、pie、table              |

highlight 另支持 summary。尚未接入的图表类型不能因为底层同样使用 G2/G6 就视为已支持。

### 极值、首尾与排名

- maxX/minX、maxY/minY 选择并列极值的所有观测。X/Y 表示数据映射的逻辑轴，不是图表转置后的屏幕方向。
- first/last 按筛选后的原始业务顺序选首尾，不按坐标排序，也不按选择器数组顺序重排。当前多系列取整体首尾。
- topN/bottomN 在候选数据中按图表已有数值映射排名：散点为 y，其他已接入统计图为 value。不要额外传 data.field 覆盖统计图映射。
- n 是正整数，最多选择 n 项；同值保持输入顺序。当前多系列整体排名，不自动逐系列排名。
- 每项默认展示 Top 1、Top 2 或 Bottom 1 等名次；自定义 label 对每项完整覆盖。饼图排名文字位于扇区内部。

```json
{ "type": "topN", "n": 3, "data": { "group": "North" } }
```

### 自动峰谷

- 仅适用于 line/area 的有序序列，按各系列原始数值检测局部峰谷；不对散点、无序分类或堆叠后的累计轮廓做峰谷识别。
- minProminence 是最小显著度，使用原始数值单位，默认 0，必须是非负有限数值；显著度基于周围基线，而不是只看相邻差值。
- minDistance 是同一系列两个结果之间的最小观测位置间距，默认 1，必须是正整数；不是像素、天数或横轴数值距离。距离冲突时保留更高的峰或更深的谷，同值保留原顺序。
- 连续相等的平台取中间位置，偶数长度取靠前的中间位置。缺失和非有限值断开序列，端点不作为峰谷。
- 先在完整系列中识别，再用 data 筛选结果；不能先删除中间观测再把原本不相邻的点连起来检测。

```json
{ "type": "peak", "minProminence": 10, "minDistance": 3 }
```

### 阈值与区间

- threshold 是有限数值，direction 默认 above，也可为 below；inclusive 默认 false，表示严格大于或小于阈值。
- thresholdHighlight 自动组合虚线阈值参考线和强调效果。折线改变越界线段颜色；面积、柱条改变越界部分填充；散点、表格强调符合条件的对象。
- thresholdHighlight 的 style 支持 fill、stroke、lineWidth、labelFill、labelFontSize，不提供 fillOpacity、dimOpacity；强调保留图表主题的填充效果，不额外配置透明度。
- 折线和面积的阈值 data 只能选择完整系列，不能选择一个系列的零散观测来改变整条路径。
- range 是两个有序有限数值 `[下界, 上界]`。rangeInside 包含端点，rangeOutside 只选择严格在区间外的观测；不增加另一套 inside/outside 配置。
- rangeInside / rangeOutside 在统计图中自动绘制原始区间背景作为参照，并强调符合条件的观测；表格只强调对应行或单元格。
- 统计图使用已有数值映射，表格通过 data.field 指定比较字段。

```json
[
  { "type": "thresholdHighlight", "threshold": 80, "direction": "below", "inclusive": true },
  { "type": "rangeOutside", "range": [20, 80] }
]
```

### 自动异常值检测

- outlier 使用 IQR（四分位距）法：`IQR = Q3 - Q1`，严格小于 `Q1 - factor × IQR` 或大于 `Q3 + factor × IQR` 的观测被标记。分位数采用 R-7 线性插值，与 G2 箱线图一致。
- factor 默认 1.5，必须为正有限数值；越大越严格。本期仅提供这一种算法，不增加 method 选项。
- data 限定参与计算的候选数据；省略时分析全部输入。统计图按原始数值、逐系列独立检测，表格用 data.field 指定计算字段，data.row 可限定候选行。
- 每组少于 4 个有限数值时不标记；缺失、NaN 和 Infinity 不参与计算。IQR 为零时边界收缩到 Q1/Q3，严格在边界之外的值仍会标记，全等数据不会标记。
- 散点只检测 y 值异常，不进行二维空间离群检测；时序数据不进行趋势、季节性或上下文异常识别。
- 每个结果分别生成说明；label 覆盖完整文字，空字符串隐藏。业务已判定的异常观测直接使用 highlight。

```json
{ "type": "outlier", "factor": 1.5 }
```

### 系列强调与显式目标

- group 仅接受 `data: { "group": "本期" }` 或多个系列目标组成的数组，强调完整系列；不接受 time、category 等观测条件，也不执行聚类。
- 省略 label 时逐个显示系列名称和色块；自定义 label 时显示一条共用说明，label: "" 隐藏说明。
- 折线、面积、散点必须已有系列映射；柱、条还必须设置 group: true 或 stack: true。说明使用对应系列色块加文字，优先放在绘图区右上方并参与避让；没有引线，不指向具体观测。所选系列全部隐藏或没有有效位置时不显示说明。
- 饼图、表格的多项选择，以及网络图已选节点、边或路径，都使用 highlight；额外连接说明使用 connector。不自动寻路或补齐节点、边。

```json
{ "type": "group", "data": [{ "group": "本期" }, { "group": "预算" }], "label": "重点系列" }
```

### 自动贡献占比

`contribution = 所选观测的数值之和 / 当前图表全部输入观测的数值之和`。

- data 选择贡献项；多个目标去重后合计为一个占比，筛选目标不缩小分母范围。
- 统计图复用已有数值映射，表格明确指定计算字段；只对非负、可加总的数值使用此分析。
- 总和为 0 时不生成占比标注。不要传 total/share，也不需要预先计算百分比。
- 默认文字包含计算后的百分比；自定义 label 覆盖完整说明。饼图单个贡献项优先复用可见的原生百分比，避免重复；原生文字不可见时保留标注说明。
- 贡献说明使用汇总括线，合计比例只展示一次。柱、折线、面积、散点使用上方括线，条图和表格使用右侧括线，从第一个可见选中项括到最后一个，不逐项连接。统计图未选中项默认使用原透明度的 16%，style.dimOpacity 可覆盖；多个强调标注保留所选目标并集的原透明度，说明共同避让。
- 饼图贡献使用外侧弧形括线，连续选中扇区合并，不连续选中扇区分段括起、共用说明，不包含未选中扇区。highlight 保留原色和原边框，不额外增加默认描边；显式 style.stroke、style.lineWidth 仍生效。数据标签文字描边独立保留。

```json
{ "type": "contribution", "data": [{ "category": "A" }, { "category": "B" }] }
```

## 统计参考与空间分析（12 种分析标注）

| type       | 最简配置                                    | 支持图表                         |
| ---------- | ------------------------------------------- | -------------------------------- |
| mean       | `{"type":"mean"}`                           | line、area、column、bar、scatter |
| median     | `{"type":"median"}`                         | line、area、column、bar、scatter |
| quantile   | `{"type":"quantile","p":0.9}`               | line、area、column、bar、scatter |
| thresholdX | `{"type":"thresholdX","threshold":3}`       | line、area、column、bar、scatter |
| thresholdY | `{"type":"thresholdY","threshold":40}`      | line、area、column、bar、scatter |
| target     | `{"type":"target","target":60}`             | line、area、column、bar、scatter |
| event      | `{"type":"event","data":{"time":3}}`        | line、area、column、bar          |
| rangeX     | `{"type":"rangeX","range":[2,4]}`           | line、area、column、bar、scatter |
| rangeY     | `{"type":"rangeY","range":[20,60]}`         | line、area、column、bar、scatter |
| quadrant   | `{"type":"quadrant","data":{"x":3,"y":40}}` | scatter                          |
| centroid   | `{"type":"centroid"}`                       | scatter                          |
| crossing   | `{"type":"crossing","threshold":40}`        | line、area                       |

### 统计参考、阈值线、目标与事件

`mean/median/quantile` 计算 `axis` 上的有限数值，默认 `"y"`；`data` 可限定候选数据。空集不绘制。quantile 必须提供 [0, 1] 内的 `p`，使用 R-7 插值。轴向参考线默认虚线并跟随主题文字色，显式 `style.stroke` 优先。

`target` 可以提供有限的固定 `target` 值（`axis` 默认 `"y"`），或至少两个完整位置组成的 `data` 变化基准路径，两者不能同时提供。

`event` 默认 `axis: "x"`，接受一个／多个轴位置，也可使用能唯一定位数据行的选择器。它绘制事件线和说明，不检测变化点。

thresholdX 接受数值、时间或分类位置，thresholdY 接受有限数值；两者只绘制参考线，越界部分变色用 thresholdHighlight。

rangeX/rangeY 只绘制逻辑轴区间，另一轴覆盖绘图区；边界须同类型，数值有限且有序，字符串对应分类或时间。rangeInside/rangeOutside 则按数值选中观测并绘制参考背景。

### 象限与中心

`quadrant` 的 `data` 必须包含两个数值轴的分界值。`labels` 分别覆盖 `topRight`、`topLeft`、`bottomLeft`、`bottomRight`，单个名称设为 `""` 隐藏该名称。`label` 控制两条分界线说明，`label: ""` 隐藏全部文字。

`centroid` 对有效数值坐标对计算普通中心。`weight` 指定原始数据中的权重字段，权重须有限、非负且总和大于零。中心是计算位置，默认用十字标记、无光晕；`pulse: true` 可开启。

```json
[
  {
    "type": "quadrant",
    "data": {
      "x": 3,
      "y": 40
    },
    "labels": {
      "topRight": "High return",
      "bottomLeft": "Low return"
    }
  },
  {
    "type": "centroid",
    "weight": "weight"
  }
]
```

### 自动求交与阈值穿越

阈值穿越提供有限的 `threshold`，可用 `data` 选择一个系列。双系列求交省略 `threshold`，在 `data.series` 提供恰好两个不重叠的系列选择器。方向以第一个系列相对于第二个系列判断：`"up"`、`"down"` 或默认的 `"both"`。

只支持未堆叠的折线／面积。原生曲线形状支持 `line`／`linear`、`smooth`、`hv`、`vh`、`hvh`，其他形状会被拒绝。每个系列的 X 必须唯一，数值 X 须单调。数值系列只在共同定义域内求交，不外推；分类 X 使用穿越后的实际观测，不伪造中间分类。缺失值断开路径；接触后返回原侧不记为穿越，等值平台换侧时取首个等值位置。

三角形保留绿色／红色的固定方向语义，并针对深色背景调整。面积图不会在原有面积上叠加另一层方向色填充。

```json
[
  {
    "type": "crossing",
    "threshold": 40,
    "direction": "down"
  },
  {
    "type": "crossing",
    "data": {
      "series": [
        {
          "group": "Actual"
        },
        {
          "group": "Budget"
        }
      ]
    }
  }
]
```

## 表格与摘要的数据目标

表格 highlight 用 row 选择原始行，column 指定强调列；可仅给 column 强调整列。多个目标使用数组。outlier 属于计算标注，使用下述 field/row/column 映射。

表格计算标注通过 data.field 指定计算字段，data.row 可限制候选行，data.column 可指定强调列；省略 column 强调整行。contribution 必须提供 row 选择贡献项，分母仍为全部输入行的对应字段之和。field 和 column 分别是计算来源与强调位置，不可混淆。

```json
[
  { "type": "highlight", "data": { "row": { "product": "Pro" }, "column": "revenue" } },
  { "type": "topN", "n": 3, "data": { "field": "revenue", "column": "revenue" } },
  { "type": "outlier", "data": { "field": "revenue", "column": "revenue" } },
  { "type": "contribution", "data": { "field": "revenue", "row": { "product": "Pro" } } }
]
```

摘要 highlight 用 data.text 精确选择可见文字，可跨 T8 行内片段；目标文字必须非空且能唯一匹配。

```json
{
  "type": "summary",
  "text": "收入达到 [240](metric_value)。",
  "annotations": [{ "type": "highlight", "data": { "text": "240" }, "label": "收入" }]
}
```

## 样式字段

- 所有标注支持 `style.labelFill`、`style.labelFontSize`。
- path、connector 及其统计参考派生支持 `stroke`、`lineWidth`、`lineDash`。
- range、rangeX/rangeY、quadrant 另支持 `fill`、`fillOpacity`；象限填充用于区域，线样式用于分界线。
- point、centroid、crossing 支持 `fill`、`stroke`、`lineWidth`、`size`。
- highlight 及选择类分析强调支持 `fill`、`fillOpacity`、`stroke`、`lineWidth`、`dimOpacity`；thresholdHighlight 不提供透明度选项。
- 默认不硬编码外观；只有 crossing 的向上／向下箭头保留绿／红方向语义。
