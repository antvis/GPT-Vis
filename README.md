<img src="https://gw.alipayobjects.com/zos/antfincdn/R8sN%24GNdh6/language.svg" width="18"> English | [简体中文](./README.zh-CN.md)

<div align="center">
  <img src="https://github.com/eosphoros-ai/GPT-Vis/assets/17919400/c8804ffb-d3d6-45d3-846f-cf217681ab05" height="70" />
</div>

<h1 align="center">GPT-Vis</h1>

<div align="center">

AI-native visualization library for the LLM era. Framework-agnostic, ready to use.

[![npm version](https://img.shields.io/npm/v/@antv/gpt-vis.svg)](https://www.npmjs.com/package/@antv/gpt-vis)
[![npm downloads](https://img.shields.io/npm/dm/@antv/gpt-vis.svg)](https://www.npmjs.com/package/@antv/gpt-vis)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

<p align="center">
  <a href="https://gpt-vis.antv.vision" target="_blank">Documentation</a> ·
  <a href="https://gpt-vis.antv.vision/examples" target="_blank">Examples</a> ·
  <a href="https://github.com/antvis/mcp-server-chart" target="_blank">MCP Server</a> ·
  <a href="/skills/chart-visualization" target="_blank">Chart Skill</a>
</p>

</div>

<div align="center">
  <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*k21VQY6NgAwAAAAAWAAAAAgAemJ7AQ/fmt.avif" width="100%" />
</div>

<br/>

## ✨ Features

- 🚀 **Framework Agnostic** — Works with vanilla JavaScript, React, Vue, Angular, or any framework
- ✍️ **Markdown-like Syntax** — Simple syntax that LLMs can generate directly, easy to learn and use
- 🌊 **Streaming Rendering** — Native support for AI model streaming output, renders as it generates
- 🛡️ **Fault Tolerant** — Gracefully handles incomplete or malformed data, adapts to the uncertainty of AI-generated content
- 📊 **26 Chart Types** — Statistical charts, relationship graphs, and text visualizations covering mainstream scenarios
- 🎨 **Theme System** — Built-in light, dark, and academy themes with customizable color palettes

## 🚀 Quick Start

### Installation

```bash
npm install @antv/gpt-vis
```

### Basic Usage

```javascript
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: 'container',
  width: 600,
  height: 400,
});

// Markdown-like visualization syntax
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

### Streaming Rendering

Charts render as the AI model generates, no need to wait for the full response:

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*_xY7Q6QyuZ4AAAAAWeAAAAgAemJ7AQ/original" width="100%" />

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

## 📚 Syntax Guide

`render()` supports two input formats: vis syntax (ideal for LLM streaming) and JSON objects (ideal for programmatic use).

### Vis Syntax

Declarative markdown-like syntax that LLMs can generate without learning complex APIs:

```
vis [chart-type]
[property] [value]
data
  - [field] [value]
```

**Pie chart:**

```
vis pie
data
  - category Sales
    value 30
  - category Marketing
    value 25
innerRadius 0.6
```

**Themes:**

Three built-in themes, switchable via the `theme` property:

| Theme           | Identifier | Background | Palette                                               |
| --------------- | ---------- | ---------- | ----------------------------------------------------- |
| Default (Light) | `default`  | `#FFF`     | `#1783FF` `#F08F56` `#D580FF` `#00C9C9` `#7863FF` ... |
| Dark            | `dark`     | `#000`     | `#1783FF` `#F08F56` `#D580FF` `#00C9C9` `#7863FF` ... |
| Academy         | `academy`  | `#FFF`     | `#4e79a7` `#f28e2c` `#e15759` `#76b7b2` `#59a14f` ... |

```
vis line
data
  - time 2020
    value 100
  - time 2021
    value 120
theme dark
```

**Custom Styles:**

Use `style` to set line width, custom palettes, and more:

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

**Quoted string values (for values with spaces):**

```
vis pie
data
  - category "Q1 Sales"
    value 30
  - category "Q2 Sales"
    value 25
```

**Hierarchical data:**

```
vis mindmap
data
  - name Project Plan
    children
      - name Phase 1
      - name Phase 2
```

### JSON Objects

Also supports passing JSON objects directly, ideal for programmatic use:

```javascript
gptVis.render({
  type: 'pie',
  data: [
    { category: 'Android', value: 72 },
    { category: 'iOS', value: 28 },
  ],
});
```

## 📊 Chart Types

26 chart types covering statistical analysis, relationship networks, and text visualization.

### Statistical Charts (18)

| Chart      | Type Identifier |
| ---------- | --------------- |
| Line       | `line`          |
| Area       | `area`          |
| Column     | `column`        |
| Bar        | `bar`           |
| Pie        | `pie`           |
| Scatter    | `scatter`       |
| Radar      | `radar`         |
| Funnel     | `funnel`        |
| Waterfall  | `waterfall`     |
| Dual Axes  | `dual-axes`     |
| Histogram  | `histogram`     |
| Boxplot    | `boxplot`       |
| Violin     | `violin`        |
| Venn       | `venn`          |
| Sankey     | `sankey`        |
| Treemap    | `treemap`       |
| Word Cloud | `word-cloud`    |
| Liquid     | `liquid`        |

### Relationship Charts (6)

| Chart              | Type Identifier      |
| ------------------ | -------------------- |
| Flow Diagram       | `flow-diagram`       |
| Network Graph      | `network-graph`      |
| Mindmap            | `mindmap`            |
| Indented Tree      | `indented-tree`      |
| Organization Chart | `organization-chart` |
| Fishbone Diagram   | `fishbone-diagram`   |

### Text Visualization (2)

| Chart   | Type Identifier |
| ------- | --------------- |
| Table   | `table`         |
| Summary | `summary`       |

Explore all examples → [Examples Gallery](https://gpt-vis.antv.vision/examples)

## 🔧 Framework Integration

<details>
<summary><strong>Vanilla JavaScript</strong></summary>

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
<summary><strong>Markdown Renderer (marked)</strong></summary>

GPT-Vis syntax naturally works with Markdown code fences and integrates with any Markdown renderer. The following example uses `marked` + `marked-highlight` — normal code blocks get syntax highlighting, while `vis` code blocks are rendered as interactive charts.

**Install dependencies:**

```bash
npm install @antv/gpt-vis marked marked-highlight highlight.js
```

**Complete example:**

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

## 🤖 AI Ecosystem

GPT-Vis provides a complete AI integration solution:

- **[MCP Server](https://github.com/antvis/mcp-server-chart)** — Enable AI models to directly invoke visualization capabilities via Model Context Protocol
- **[Chart Skill](https://github.com/antvis/GPT-Vis/tree/main/skills/chart-visualization)** — Provide AI assistants with chart recommendation and generation capabilities, supporting both syntax mode and code mode output

## 🤝 Contributing

> **AI-Generated Code Policy**: This project only merges AI-generated code.

1. Submit an Issue describing the problem or feature request
2. Tag @copilot to generate the implementation
3. Submit a PR with AI-generated code

## 📄 License

[MIT](./LICENSE) © [AntV](https://antv.antgroup.com/)
