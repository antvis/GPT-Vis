<img src="https://gw.alipayobjects.com/zos/antfincdn/R8sN%24GNdh6/language.svg" width="18"> English | [简体中文](./README.zh-CN.md)

<h1 align="center">GPT-Vis, Visualization for AI Friendly!</h1>

<div align="center">
<img src="https://github.com/eosphoros-ai/GPT-Vis/assets/17919400/c8804ffb-d3d6-45d3-846f-cf217681ab05" height="70">

AI-Native Visualization Components for the LLM Era. Framework-agnostic visualization library designed for AI-powered applications.

[![npm version](https://img.shields.io/npm/v/@antv/gpt-vis.svg)](https://www.npmjs.com/package/@antv/gpt-vis)
[![npm downloads](https://img.shields.io/npm/dm/@antv/gpt-vis.svg)](https://www.npmjs.com/package/@antv/gpt-vis)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

<p align="center">
  <a href="https://gpt-vis.antv.vision" target="_blank">📖 Documentation</a> •
  <a href="/skills/chart-visualization" target="_blank">🤖 Chart Skill</a> •
  <a href="/knowledges" target="_blank">🧠 Knowledge Base</a> •
  <a href="https://www.tbox.cn/share/202504APmv6c00373739?platform=WebService" target="_blank">🎮 Try Demo</a> •
  <a href="https://github.com/antvis/mcp-server-chart" target="_blank">🔌 MCP Server</a>
</p>

</div>

<div align="center">
  <video src="https://github.com/user-attachments/assets/24b0d820-ebf8-4351-bc5b-4fa607a76e17" />
</div>

<br/>

> **📢 Version 1.0 Preview**: Reimagined architecture optimized for AI. Stable release expected **March 21, 2026**.

## ✨ Features

- **🚀 Framework Agnostic**: Works with vanilla JavaScript, React, Vue, Angular, or any framework
- **✍️ Natural Syntax**: Simple, markdown-like syntax that LLMs can generate effortlessly
- **🌊 Streaming Support**: Built-in support for streaming output from AI models
- **🛡️ Fault Tolerant**: Gracefully handles incomplete or malformed data
- **📊 20+ Chart Types**: Statistical, relationship, and advanced visualization charts
- **🧠 Intelligent Defaults**: Automatic data detection, smart color schemes, adaptive layouts

## 🚀 Quick Start

### Installation

```bash
npm install @antv/gpt-vis
```

### Basic Usage

```javascript
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: 'container', //After @antv/g2 v5, the container query can only be a DOM element or an ID. Other selector forms are not supported.
  width: 600,
  height: 400,
});

// Render with markdown-like syntax
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

### Streaming Support

```javascript
import { GPTVis, isVisSyntax } from '@antv/gpt-vis';

const gptVis = new GPTVis({ container: '#container', width: 600, height: 400 });
let buffer = '';

function onToken(token) {
  buffer += token;
  if (isVisSyntax(buffer)) {
    gptVis.render(buffer);
  }
}
```

## 📚 Syntax Guide

### Basic Structure

```
vis [chart-type]
[property] [value]
data
  - [key] [value]
```

### Examples

**Simple chart:**

```
vis pie
data
  - category Sales
    value 30
  - category Marketing
    value 25
innerRadius 0.6
```

**With style:**

```
vis line
data
  - time 2020
    value 100
  - time 2021
    value 120
style
  lineWidth 3
  palette #5B8FF9 #5AD8A6
```

**Hierarchical data:**

```
vis mind-map
data
  - name Project
    children
      - name Phase 1
      - name Phase 2
```

## 🔧 Framework Integration

<details>
<summary><strong>Vanilla JavaScript</strong></summary>

```javascript
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({ container: '#chart', width: 600, height: 400 });
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
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { GPTVis } from '@antv/gpt-vis';

const props = defineProps(['visSyntax']);
const chartRef = ref(null);
let gptVis = null;

onMounted(() => {
  gptVis = new GPTVis({ container: chartRef.value, width: 600, height: 400 });
  gptVis.render(props.visSyntax);
});

watch(
  () => props.visSyntax,
  (newSyntax) => {
    if (gptVis) {
      gptVis.render(newSyntax);
    }
  },
);

onUnmounted(() => gptVis?.destroy());
</script>
```

</details>

## 🧠 Knowledge Base

GPT-Vis includes a comprehensive [knowledge base](https://github.com/antvis/GPT-Vis/tree/main/knowledges) to help LLMs understand when to use each chart type and how to structure data. Evaluated on 200+ scenarios with 90%+ accuracy.

## 🤝 Contributing

> **⚠️ AI-Generated Code Policy**: This project only merges AI-generated code.

To contribute:

1. Submit an Issue describing the problem or feature
2. Tag @copilot to generate the implementation
3. Submit PR with AI-generated code

## 📄 License

[MIT](./LICENSE) © [AntV](https://antv.antgroup.com/)
