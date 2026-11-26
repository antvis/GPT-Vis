<div align="center">

[English](./README.md) · [简体中文](./README.zh-CN.md)

<a href="https://gpt-vis.antv.vision/zh/">
  <img src="https://github.com/eosphoros-ai/GPT-Vis/assets/17919400/c8804ffb-d3d6-45d3-846f-cf217681ab05" width="169" height="70" alt="GPT-Vis 标志" />
</a>

# GPT-Vis：[让 AI 的洞察跃然图上。](https://gpt-vis.antv.vision/zh/) ✨

面向 AI Agent 和应用的开源可视化库。<br />
用 JSON 或 Syntax 渲染图表，用分析标注解释发现，用同一份主题统一整个报告。

[![npm 版本](https://img.shields.io/npm/v/@antv/gpt-vis.svg?style=flat-square)](https://www.npmjs.com/package/@antv/gpt-vis)
[![npm 下载量](https://img.shields.io/npm/dm/@antv/gpt-vis.svg?style=flat-square)](https://www.npmjs.com/package/@antv/gpt-vis)
[![开源协议](https://img.shields.io/badge/license-MIT-6950a1.svg?style=flat-square)](./LICENSE)

[官网](https://gpt-vis.antv.vision/zh/) · [文档](https://gpt-vis.antv.vision/zh/docs) · [示例](https://gpt-vis.antv.vision/zh/examples) · [主题工作台](https://gpt-vis.antv.vision/zh/themes) · [Agent Skill](https://gpt-vis.antv.vision/zh/docs/agent-skill)

<a href="https://gpt-vis.antv.vision/zh/">
  <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*kvnpTJBzpr4AAAAAcdAAAAgAemJ7AQ/original" width="100%" alt="GPT-Vis：让 AI 的洞察跃然图上。26 种可视化、分析标注、主题定制与 Agent Skill。点击访问中文官网。" />
</a>

</div>

## 特性

- 🚀 **框架无关** — 原生 JavaScript、React、Vue、Angular，任何框架均可使用
- ✍️ **类 Markdown 语法** — LLM 可以直接生成的简洁语法，易学易用
- 🌊 **流式渲染** — 原生支持 AI 模型流式输出，边生成边渲染
- 🛡️ **高容错** — 优雅处理不完整、格式异常的数据，适配 AI 生成内容的不确定性
- 📊 **26 种图表** — 统计图表、关系图表、文本可视化，覆盖主流场景
- 🎨 **可复用主题** — 一份 ThemeSpec 应用于所有图表，在 Theme Studio 预览微调，也可通过 AI Skill 创建
- **28 种分析能力** — 在图表中标出极值、排名、均值、目标、区间和交点，由 SDK 计算统计参考
- **Agent Skill** — 为 AI 助手提供选图、配置生成、框架集成与主题创建指南

基于 [G2](https://github.com/antvis/G2)、[G6](https://github.com/antvis/G6) 与 [T8](https://github.com/antvis/T8) 构建，支持原生 JavaScript、React、Vue 等浏览器端框架。

## 快速开始

### 在 Agent 中使用

在项目目录运行以下命令，选择要使用的兼容助手：

```bash
npx skills add https://github.com/antvis/GPT-Vis/tree/ai --skill chart-visualization
```

安装后，让助手生成第一份报告：

> 使用 GPT-Vis Skill，根据上半年收入生成一份报告：1 月 84、2 月 96、3 月 91、4 月 118、5 月 126、6 月 148，单位为万元。包含折线图、表格和简短摘要，使用同一份主题，保存为可以在浏览器中打开的 report.html。

Skill 包含选图指南、可运行的配置模式和 Theme Creator 参考文档。[查看 Skill 源码](./skills/chart-visualization/SKILL.md)。

### 使用 SDK 开发

```bash
npm install @antv/gpt-vis
```

添加容器，在它挂载后运行以下代码：

```html
<div id="chart" style="width: 100%; height: 360px;"></div>
```

```typescript
import { GPTVis } from '@antv/gpt-vis';

const chart = new GPTVis({ container: '#chart', height: 360, theme: 'product' });
const data = [
  { time: '1月', value: 84 },
  { time: '2月', value: 96 },
  { time: '3月', value: 91 },
  { time: '4月', value: 118 },
  { time: '5月', value: 126 },
  { time: '6月', value: 148 },
];

chart.render({
  type: 'line',
  title: '月度收入（万元）',
  data,
});

// 视图卸载时销毁实例：
// chart.destroy();
```

<details>
<summary>也可以用 Syntax 文本渲染同一张图表</summary>

同一个 `render()` 方法接受以下文本：

```typescript
chart.render(`vis line
title 月度收入（万元）
data
  - time 1月
    value 84
  - time 2月
    value 96
  - time 3月
    value 91
  - time 4月
    value 118
  - time 5月
    value 126
  - time 6月
    value 148`);
```

</details>

[快速开始](https://gpt-vis.antv.vision/zh/docs/quickstart) · [Syntax 指南](https://gpt-vis.antv.vision/zh/docs/syntax) · [API 参考](https://gpt-vis.antv.vision/zh/docs/reference/api)

## 模型边生成，图表边呈现

每次收到新内容时，将累计输出传给 `render()`。GPT-Vis 支持不完整输入，让图表在响应完成前开始呈现。

<a href="https://gpt-vis.antv.vision/zh/docs/streaming">
  <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*_xY7Q6QyuZ4AAAAAWeAAAAgAemJ7AQ/original" width="100%" loading="lazy" alt="GPT-Vis 随模型输出逐步渲染图表。点击查看流式渲染指南。" />
</a>

```javascript
import { GPTVis, isVisSyntax } from '@antv/gpt-vis';

const chart = new GPTVis({ container: '#chart', width: 600, height: 400 });
let buffer = '';

function onToken(token) {
  buffer += token;
  if (isVisSyntax(buffer)) {
    chart.render(buffer);
  }
}
```

[流式渲染指南 →](https://gpt-vis.antv.vision/zh/docs/streaming)

## 28 种分析能力

通过 `annotations` 表达分析意图，让均值、目标、排名和异常值直接显示在图表中。

<a href="https://gpt-vis.antv.vision/zh/examples/annotations">
  <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*K7X8TK5NDl4AAAAASDAAAAgAemJ7AQ/original" width="100%" loading="lazy" alt="GPT-Vis 分析标注前后对比：收入均值与目标线、响应时间参考区间与 IQR 异常值。" />
</a>

复用快速开始中的数据，添加均值参考线和 140 万元目标线：

```typescript
chart.render({
  type: 'line',
  data,
  annotations: [{ type: 'mean' }, { type: 'thresholdY', threshold: 140, label: '目标 140' }],
});
```

均值为 **110.5 万元**，6 月收入 **148 万元**超过目标。统计参考由 SDK 计算，目标值由配置提供。

<details>
<summary>查看全部 28 种分析能力</summary>

| 分析用途           | 能力                                                 | `type` 配置值                                                     |
| ------------------ | ---------------------------------------------------- | ----------------------------------------------------------------- |
| **极值与观测 · 8** | X/Y 最大值与最小值、首尾观测、局部峰值与谷值         | `maxX`, `minX`, `maxY`, `minY`, `first`, `last`, `peak`, `valley` |
| **排名与贡献 · 4** | Top N、Bottom N、系列强调、贡献占比                  | `topN`, `bottomN`, `group`, `contribution`                        |
| **统计参考 · 5**   | 均值、中位数、分位数、IQR 异常值、散点中心或加权中心 | `mean`, `median`, `quantile`, `outlier`, `centroid`               |
| **阈值与目标 · 4** | X/Y 阈值线、目标或基线、阈值强调                     | `thresholdX`, `thresholdY`, `target`, `thresholdHighlight`        |
| **区间与区域 · 5** | X/Y 区间、区间内外强调、象限                         | `rangeX`, `rangeY`, `rangeInside`, `rangeOutside`, `quadrant`     |
| **事件与交点 · 2** | 事件标记、阈值穿越或双系列交点                       | `event`, `crossing`                                               |

</details>

[体验全部 28 种能力](https://gpt-vis.antv.vision/zh/examples/annotations) · [支持的图表、数据选择与计算规则](https://gpt-vis.antv.vision/zh/docs/annotations)

这些能力以当前源码为准。使用时请确认所选 SDK 版本包含需要的标注；安装 Skill 不会升级渲染库。

## 语法指南

`render()` 支持两种输入格式：对象配置（适合程序化调用）和 DSL 语法（适合 LLM 流式生成）。

### 对象配置

直接传入 JSON 对象，适合程序化图表创建：

**折线图：**

```javascript
chart.render({
  type: 'line',
  data: [
    { time: '2020', value: 100 },
    { time: '2021', value: 120 },
    { time: '2022', value: 150 },
  ],
});
```

**饼图：**

```javascript
chart.render({
  type: 'pie',
  data: [
    { category: 'Android', value: 72 },
    { category: 'iOS', value: 28 },
  ],
  innerRadius: 0.6,
});
```

主题名称、自定义 ThemeSpec 与样式覆盖见 [主题与样式](#主题与样式)。

**自定义样式：**

```javascript
chart.render({
  type: 'line',
  data: [
    { time: '2020', value: 100 },
    { time: '2021', value: 120 },
  ],
  style: { mark: { line: { lineWidth: 3 } }, palette: ['#5B8FF9', '#5AD8A6'] },
});
```

### DSL 语法

类 Markdown 的声明式语法，LLM 无需学习复杂 API 即可生成：

```
vis [图表类型]
[属性] [值]
data
  - [字段] [值]
```

**饼图：**

```
vis pie
data
  - category 销售
    value 30
  - category 市场
    value 25
innerRadius 0.6
```

**主题：**

```
vis line
data
  - time 2020
    value 100
  - time 2021
    value 120
theme dark
```

**自定义样式：**

通过 `style` 设置线宽、自定义配色等：

```
vis line
data
  - time 2020
    value 100
  - time 2021
    value 120
style
  mark
    line
      lineWidth 3
  palette
    - #5B8FF9
    - #5AD8A6
```

**包含空格的值用引号包裹：**

```
vis pie
data
  - category "Q1 销售额"
    value 30
  - category "Q2 销售额"
    value 25
```

**层级数据：**

```
vis mindmap
data
  - name 项目规划
    children
      - name 第一阶段
      - name 第二阶段
```

**使用 DSL 语法渲染：**

```javascript
const visSyntax = `
vis line
data
  - time 2020
    value 100
  - time 2021
    value 120
  - time 2022
    value 150
`;

chart.render(visSyntax);
```

## 主题与样式

同一份主题可以跨图表和表格复用，统一配色、字体与样式。除了原有的三套基础主题，还可选择 `gpt-vis`、`midnight`、`paper`、`pop` 等 10 套内置风格：

<a href="https://gpt-vis.antv.vision/zh/themes">
  <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*qtqnQqP2CLAAAAAATkAAAAgAemJ7AQ/original" width="100%" loading="lazy" alt="GPT-Vis、Midnight、Paper 与 Pop 主题下的相同折线图和表格。" />
</a>

### 内置主题

通过 `theme` 属性切换内置主题。原有的三套基础主题保持原来的外观：

| 主题         | 标识      | 背景色    | 色板                                                  |
| ------------ | --------- | --------- | ----------------------------------------------------- |
| 默认（亮色） | `default` | `#FFF`    | `#5B6CFF` `#2DAF9E` `#F2B84B` `#EF6A6A` `#55A6D9` ... |
| 暗色         | `dark`    | `#141414` | `#5B6CFF` `#2DAF9E` `#F2B84B` `#EF6A6A` `#55A6D9` ... |
| 学术         | `academy` | `#FFF`    | `#4e79a7` `#f28e2c` `#e15759` `#76b7b2` `#59a14f` ... |

官网主题工作台的 10 套风格也已内置：

| 主题                                            | 标识           |
| ----------------------------------------------- | -------------- |
| GPT-Vis                                         | `gpt-vis`      |
| Midnight                                        | `midnight`     |
| Paper                                           | `paper`        |
| Product                                         | `product`      |
| Neon Circuit                                    | `neon-circuit` |
| Terra Print                                     | `terra-print`  |
| Mono Signal                                     | `mono-signal`  |
| Candy Pop                                       | `candy-pop`    |
| [Pop](https://github.com/microsoft/flint-chart) | `pop`          |
| Bauhaus                                         | `bauhaus`      |

`gpt-vis` 是官网的品牌主题，与 SDK 的 `default` 不同。

```typescript
const themedChart = new GPTVis({ container: '#chart', theme: 'pop' });
```

主题名称可用于构造函数、图表 JSON 和 Syntax（`theme pop`）。Summary 通过构造函数接收主题，支持的名称类型为 `BuiltinThemeName`。

```javascript
chart.render({
  type: 'line',
  data: [
    { time: '2020', value: 100 },
    { time: '2021', value: 120 },
  ],
  theme: 'dark',
});
```

### 可复用的自定义主题

向构造函数的 `theme` 传入 `ThemeSpec` 对象，即可让全部 26 种图表共享颜色、字体、间距和 Mark 样式，包括关系图、Table 和 Summary：

```typescript
import { GPTVis, type ThemeSpec } from '@antv/gpt-vis';

const theme: ThemeSpec = {
  id: 'my-report',
  label: 'My report',
  tokens: { colorDefault: '#7047eb', fontFamily: 'Arial, sans-serif', radius: 6 },
};
const chart = new GPTVis({ container: '#chart', theme });
```

优先级：**单图 config > 自定义 ThemeSpec > GPT-Vis 内置主题**。具体合并顺序：内置默认值 < Tokens < 全局 `style` < `charts[type].style` < 单图 `style`。嵌套对象合并，数组整体替换。单图显式指定 `theme` 时，会替换构造函数选择的主题。Summary 通过构造函数接收主题，渲染输入仍为 T8 文本，没有单次渲染的 `style` 对象入口。

可在 [Theme Studio](https://gpt-vis.antv.vision/zh/themes) 预览和分享主题，阅读[主题文档](https://gpt-vis.antv.vision/zh/docs/themes)，或使用[主题创建指南](./skills/chart-visualization/references/theme-creator.md) 根据品牌参考资料生成 ThemeSpec。

未修改的工作台预设可直接使用内置名称。自定义后需要把完整对象传给 `theme`；自定义 `id` 只是元数据，不会注册新的主题名称。

单张图表仍可通过 `style` 覆盖主题中的配色和 Mark 样式，见上面的对象配置与 Syntax 示例。

## 图表类型

支持 26 种图表，覆盖统计分析、关系网络、文本可视化三大类。

### 统计图表（18 种）

| 图表     | 类型标识     |
| -------- | ------------ |
| 折线图   | `line`       |
| 面积图   | `area`       |
| 柱状图   | `column`     |
| 条形图   | `bar`        |
| 饼图     | `pie`        |
| 散点图   | `scatter`    |
| 雷达图   | `radar`      |
| 漏斗图   | `funnel`     |
| 瀑布图   | `waterfall`  |
| 双轴图   | `dual-axes`  |
| 直方图   | `histogram`  |
| 箱线图   | `boxplot`    |
| 小提琴图 | `violin`     |
| 韦恩图   | `venn`       |
| 桑基图   | `sankey`     |
| 矩形树图 | `treemap`    |
| 词云     | `word-cloud` |
| 水波图   | `liquid`     |

### 关系图表（6 种）

| 图表       | 类型标识             |
| ---------- | -------------------- |
| 流程图     | `flow-diagram`       |
| 网络图     | `network-graph`      |
| 思维导图   | `mindmap`            |
| 缩进树     | `indented-tree`      |
| 组织架构图 | `organization-chart` |
| 鱼骨图     | `fishbone-diagram`   |

### 文本可视化（2 种）

| 图表     | 类型标识  |
| -------- | --------- |
| 表格     | `table`   |
| 文本摘要 | `summary` |

查看全部示例 → [图表示例](https://gpt-vis.antv.vision/zh/examples)

## 框架集成

| 集成方式                          | 从这里开始                                                                                       |
| --------------------------------- | ------------------------------------------------------------------------------------------------ |
| **React 与 Vue**                  | [框架生命周期示例](https://gpt-vis.antv.vision/zh/docs/integrations/frameworks)                  |
| **Markdown**                      | [渲染模型响应中的可视化代码块](https://gpt-vis.antv.vision/zh/docs/integrations/markdown)        |
| **shadcn/ui**                     | [将通用或单图表 React 组件复制到项目中](https://gpt-vis.antv.vision/zh/docs/integrations/shadcn) |
| **MCP**                           | [MCP Server Chart](https://github.com/antvis/mcp-server-chart)                                   |
| **服务端渲染、Streamlit 与 Dify** | [了解生态集成](https://gpt-vis.antv.vision/zh/docs/integrations/ecosystem)                       |

<details>
<summary><strong>原生 JavaScript</strong></summary>

```javascript
import { GPTVis } from '@antv/gpt-vis';

const chart = new GPTVis({ container: '#chart', width: 600, height: 400 });
chart.render({
  type: 'line',
  data: [
    { time: '2020', value: 100 },
    { time: '2021', value: 120 },
    { time: '2022', value: 150 },
  ],
});

// 页面卸载时调用 chart.destroy()。
```

</details>

<details>
<summary><strong>React</strong></summary>

```jsx
import { GPTVis } from '@antv/gpt-vis';
import { useEffect, useRef } from 'react';

function ChartComponent({ visSyntax }) {
  const containerRef = useRef();
  const chartRef = useRef();

  useEffect(() => {
    chartRef.current = new GPTVis({ container: containerRef.current, width: 600, height: 400 });
    return () => chartRef.current?.destroy();
  }, []);

  useEffect(() => {
    if (chartRef.current && visSyntax) {
      chartRef.current.render(visSyntax);
    }
  }, [visSyntax]);

  return <div ref={containerRef} />;
}
```

</details>

<details>
<summary><strong>Vue</strong></summary>

```vue
<template>
  <div ref="chartRef"></div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { GPTVis } from '@antv/gpt-vis';

const props = defineProps(['visSyntax']);
const chartRef = ref(null);
let chart = null;

onMounted(() => {
  chart = new GPTVis({ container: chartRef.value, width: 600, height: 400 });
  if (props.visSyntax) chart.render(props.visSyntax);
});

watch(
  () => props.visSyntax,
  (syntax) => {
    if (chart && syntax) chart.render(syntax);
  },
);

onUnmounted(() => chart?.destroy());
</script>
```

</details>

<details>
<summary><strong>Markdown 渲染器（marked）</strong></summary>

GPT-Vis 的 vis 语法天然兼容 Markdown code fence，可以与任何 Markdown 渲染器集成。以下示例使用 `marked` + `marked-highlight`，普通代码块走语法高亮，`vis` 代码块自动渲染为交互式图表。

**安装依赖：**

```bash
npm install @antv/gpt-vis marked marked-highlight highlight.js
```

**完整示例：**

```javascript
import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';
import { GPTVis } from '@antv/gpt-vis';

class GPTVisElement extends HTMLElement {
  connectedCallback() {
    const syntax = decodeURIComponent(this.dataset.syntax);
    this._instance = new GPTVis({ container: this });
    this._instance.render(syntax);
  }
  disconnectedCallback() {
    this._instance?.destroy();
  }
}
if (!customElements.get('gpt-vis')) {
  customElements.define('gpt-vis', GPTVisElement);
}

const marked = new Marked(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      if (lang?.startsWith('vis')) return code;
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    },
  }),
  {
    renderer: {
      code({ text, lang }) {
        if (lang?.startsWith('vis')) {
          const syntax = encodeURIComponent(lang + '\n' + text);
          return `<gpt-vis data-syntax="${syntax}" style="display:block;min-height:300px"></gpt-vis>`;
        }
        return false;
      },
    },
  },
);

const markdown = `# My Report

\`\`\`vis bar
data
  - category Python
    value 28.1
  - category JavaScript
    value 18.5
  - category Java
    value 15.6
  - category "C/C++"
    value 12.3
title 2024 Programming Language Popularity
\`\`\`
`;

// 页面中需有 <div id="content"></div>。
document.getElementById('content').innerHTML = marked.parse(markdown);
```

</details>

## Shadcn/ui

通过 shadcn CLI 将 GPT-Vis React 组件直接复制到你的项目中 — 完全源代码控制，高度可定制。

### 基础组件

通用的 `GPTVis` 组件，支持全部 26 种图表类型的 vis 语法字符串或 JSON 配置对象：

```bash
npx shadcn@latest add @gpt-vis/gpt-vis
```

```tsx
import { GPTVis } from '@/components/ui/gpt-vis';

<GPTVis
  content={`vis line
data
  - time 2020
    value 100
  - time 2021
    value 120
  - time 2022
    value 150
title 销售趋势`}
  theme="academy"
/>;
```

### 类型化图表组件

每种图表类型都有独立的组件，提供类型安全的 `config` 属性 — 仅支持 JSON，带 TypeScript 类型校验：

```bash
npx shadcn@latest add @gpt-vis/line
```

```tsx
import { Line } from '@/components/ui/line';

<Line
  config={{
    data: [
      { time: '2020', value: 100 },
      { time: '2021', value: 120 },
      { time: '2022', value: 150 },
    ],
    title: '销售趋势',
    axisXTitle: '年份',
  }}
  height={400}
/>;
```

全部 26 种图表类型均可用，按名称安装即可：

```bash
npx shadcn@latest add @gpt-vis/pie
npx shadcn@latest add @gpt-vis/bar
npx shadcn@latest add @gpt-vis/mindmap
# ...等等
```

每个类型化组件自动将基础 `GPTVis` 组件作为依赖安装。`width`、`height`、`theme`、`wrapper`、`locale`、`className`、`containerStyle` 等属性在所有组件中保持一致。

## AI 生态

GPT-Vis 提供完整的 AI 集成方案：

- **[MCP 服务](https://github.com/antvis/mcp-server-chart)** — 通过 Model Context Protocol 让 AI 模型直接调用可视化能力
- **[图表技能](./skills/chart-visualization/SKILL.md)** — 为 AI 助手提供图表选择、JSON、Syntax 和集成代码生成能力，内含 Theme Creator 参考文档，可创建可复用的自定义主题

- **[服务端渲染与社区集成](https://gpt-vis.antv.vision/zh/docs/integrations/ecosystem)** — 了解服务端出图、Streamlit、Dify 等集成方式

## 贡献

> **AI 生成代码策略**：本项目仅合并 AI 生成的代码。

1. 提交 Issue 描述问题或需求
2. 标记 @copilot 生成实现方案
3. 提交包含 AI 生成代码的 PR

[反馈问题](https://github.com/antvis/GPT-Vis/issues)

## 开源协议

[MIT](./LICENSE) © [AntV](https://antv.antgroup.com/)
