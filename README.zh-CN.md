<img src="https://gw.alipayobjects.com/zos/antfincdn/R8sN%24GNdh6/language.svg" width="18"> [English](./README.md) | 简体中文

<div align="center">
  <img src="https://github.com/eosphoros-ai/GPT-Vis/assets/17919400/c8804ffb-d3d6-45d3-846f-cf217681ab05" height="70" />
</div>

<h1 align="center">GPT-Vis</h1>

<div align="center">

面向 LLM 时代的 AI 原生可视化库，框架无关，开箱即用。

[![npm version](https://img.shields.io/npm/v/@antv/gpt-vis.svg)](https://www.npmjs.com/package/@antv/gpt-vis)
[![npm downloads](https://img.shields.io/npm/dm/@antv/gpt-vis.svg)](https://www.npmjs.com/package/@antv/gpt-vis)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

<p align="center">
  <a href="https://gpt-vis.antv.vision" target="_blank">文档</a> ·
  <a href="https://gpt-vis.antv.vision/examples" target="_blank">图表示例</a> ·
  <a href="https://github.com/antvis/mcp-server-chart" target="_blank">MCP 服务</a> ·
  <a href="/skills/chart-visualization" target="_blank">图表技能</a>
</p>

</div>

<div align="center">
  <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*k21VQY6NgAwAAAAAWAAAAAgAemJ7AQ/fmt.avif" width="100%" />
</div>

<br/>

## 特性

- **框架无关** — 原生 JavaScript、React、Vue、Angular，任何框架均可使用
- **类 Markdown 语法** — LLM 可以直接生成的简洁语法，易学易用
- **流式渲染** — 原生支持 AI 模型流式输出，边生成边渲染
- **高容错** — 优雅处理不完整、格式异常的数据，适配 AI 生成内容的不确定性
- **26 种图表** — 统计图表、关系图表、文本可视化，覆盖主流场景
- **主题系统** — 内置亮色、暗色、学术三套主题，支持自定义配色

## 快速开始

### 安装

```bash
npm install @antv/gpt-vis
```

### 基础用法

```javascript
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: 'container',
  width: 600,
  height: 400,
});

// 类 Markdown 的可视化语法
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

gptVis.render(visSyntax);
```

### 流式渲染

AI 模型边生成、图表边渲染，无需等待完整响应：

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*tcdxSrYo6RwAAAAAZNAAAAgAemJ7AQ/original" width="100%" />

```javascript
import { GPTVis, isVisSyntax } from '@antv/gpt-vis';

const gptVis = new GPTVis({ container: 'container', width: 600, height: 400 });
let buffer = '';

function onToken(token) {
  buffer += token;
  if (isVisSyntax(buffer)) {
    gptVis.render(buffer);
  }
}
```

## 语法指南

`render()` 支持两种输入格式：vis 语法（适合 LLM 流式生成）和 JSON 对象（适合程序化调用）。

### Vis 语法

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

内置三套主题，通过 `theme` 属性切换：

| 主题         | 标识      | 背景色 | 色板                                                  |
| ------------ | --------- | ------ | ----------------------------------------------------- |
| 默认（亮色） | `default` | `#FFF` | `#1783FF` `#F08F56` `#D580FF` `#00C9C9` `#7863FF` ... |
| 暗色         | `dark`    | `#000` | `#1783FF` `#F08F56` `#D580FF` `#00C9C9` `#7863FF` ... |
| 学术         | `academy` | `#FFF` | `#4e79a7` `#f28e2c` `#e15759` `#76b7b2` `#59a14f` ... |

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

### JSON 对象

也支持直接传入 JSON 对象，适合程序化调用：

```javascript
gptVis.render({
  type: 'pie',
  data: [
    { category: 'Android', value: 72 },
    { category: 'iOS', value: 28 },
  ],
});
```

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
| 树图     | `treemap`    |
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

查看全部示例 → [图表示例](https://gpt-vis.antv.vision/examples)

## 框架集成

<details>
<summary><strong>原生 JavaScript</strong></summary>

```javascript
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({ container: 'chart', width: 600, height: 400 });
gptVis.render(visSyntaxString);
```

</details>

<details>
<summary><strong>React</strong></summary>

```jsx
import { GPTVis } from '@antv/gpt-vis';
import { useEffect, useRef } from 'react';

function ChartComponent({ visSyntax }) {
  const containerRef = useRef();
  const gptVisRef = useRef();

  useEffect(() => {
    gptVisRef.current = new GPTVis({ container: containerRef.current, width: 600, height: 400 });
    return () => gptVisRef.current?.destroy();
  }, []);

  useEffect(() => {
    if (gptVisRef.current && visSyntax) {
      gptVisRef.current.render(visSyntax);
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
import { ref, watch, onUnmounted } from 'vue';
import { GPTVis } from '@antv/gpt-vis';

const props = defineProps(['visSyntax']);
const chartRef = ref(null);
let gptVis = null;

watch(
  () => props.visSyntax,
  (syntax) => {
    if (!gptVis) {
      gptVis = new GPTVis({ container: chartRef.value, width: 600, height: 400 });
    }
    gptVis.render(syntax);
  },
  { immediate: true },
);

onUnmounted(() => gptVis?.destroy());
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
          return `<gpt-vis data-syntax="${syntax}" style="min-height:300px"></gpt-vis>`;
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

document.getElementById('content').innerHTML = marked.parse(markdown);
```

</details>

## AI 生态

GPT-Vis 提供完整的 AI 集成方案：

- **[MCP 服务](https://github.com/antvis/mcp-server-chart)** — 通过 Model Context Protocol 让 AI 模型直接调用可视化能力
- **[图表技能](https://github.com/antvis/GPT-Vis/tree/main/skills/chart-visualization)** — 为 AI 助手提供图表推荐与生成能力，支持语法模式和代码模式两种输出

## 贡献

> **AI 生成代码策略**：本项目仅合并 AI 生成的代码。

1. 提交 Issue 描述问题或需求
2. 标记 @copilot 生成实现方案
3. 提交包含 AI 生成代码的 PR

## 开源协议

[MIT](./LICENSE) © [AntV](https://antv.antgroup.com/)
