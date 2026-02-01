<img src="https://gw.alipayobjects.com/zos/antfincdn/R8sN%24GNdh6/language.svg" width="18"> [English](./README.md) | 简体中文

<div align="center">
  <img src="https://github.com/eosphoros-ai/GPT-Vis/assets/17919400/c8804ffb-d3d6-45d3-846f-cf217681ab05" height="70">
</div>

<h1 align="center">GPT-Vis</h1>

<div align="center">

**面向 LLM 时代的 AI 原生可视化组件**

为 AI 驱动应用设计的框架无关可视化库。

[![npm version](https://img.shields.io/npm/v/@antv/gpt-vis.svg)](https://www.npmjs.com/package/@antv/gpt-vis)
[![npm downloads](https://img.shields.io/npm/dm/@antv/gpt-vis.svg)](https://www.npmjs.com/package/@antv/gpt-vis)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

<p align="center">
  <a href="https://gpt-vis.antv.vision" target="_blank">📖 文档</a> •
  <a href="/knowledges" target="_blank">🧠 知识库</a> •
  <a href="https://www.tbox.cn/share/202504APmv6c00373739?platform=WebService" target="_blank">🎮 在线体验</a> •
  <a href="https://github.com/antvis/mcp-server-chart" target="_blank">🔌 MCP 服务器</a>
</p>

</div>

<div align="center">
  <video src="https://github.com/user-attachments/assets/b8eb4a89-b0ed-4a39-8fab-316161949446" />
</div>

<br/>

> **📢 Version 1.0 预览版**: 为 AI 优化的全新架构。正式版预计 **2026 年 3 月 21 日**发布。

## ✨ 核心特性

- **🚀 框架无关**: 支持原生 JavaScript、React、Vue、Angular 或任何框架
- **✍️ 自然语法**: 简单的类 Markdown 语法，LLM 可以轻松生成
- **🌊 流式支持**: 内置支持 AI 模型的流式输出
- **🛡️ 容错性**: 优雅处理不完整或格式错误数据
- **📊 20+ 图表类型**: 统计图表、关系图表和高级可视化图表
- **🧠 智能默认值**: 自动数据检测、智能配色方案、自适应布局

## 🚀 快速开始

### 安装

```bash
npm install @antv/gpt-vis
```

### 基础用法

```javascript
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

// 使用类 Markdown 语法渲染
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

gptVis.render('line', visSyntax);
```

### 流式支持

```javascript
import { GPTVis, isVisSyntax } from '@antv/gpt-vis';

const gptVis = new GPTVis({ container: '#container', width: 600, height: 400 });
let buffer = '';

function onToken(token) {
  buffer += token;
  if (isVisSyntax(buffer)) {
    const type = buffer.match(/vis\s+(\S+)/)?.[1];
    if (type) gptVis.render(type, buffer);
  }
}
```

## 📚 语法指南

### 基本结构

```
vis [图表类型]
[属性] [值]
data
  - [键] [值]
```

### 示例

**简单图表:**
```
vis pie
data
  - category 销售
    value 30
  - category 市场
    value 25
innerRadius 0.6
```

**带样式:**
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

**层次数据:**
```
vis mind-map
data
  - name 项目
    children
      - name 阶段一
      - name 阶段二
```

## 🔧 框架集成

<details>
<summary><strong>原生 JavaScript</strong></summary>

```javascript
import { GPTVis } from '@antv/gpt-vis';

const gptVis = new GPTVis({ container: '#chart', width: 600, height: 400 });
gptVis.render('pie', visSyntaxString);
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
      const type = visSyntax.match(/vis\s+(\S+)/)?.[1] || 'pie';
      gptVisRef.current.render(type, visSyntax);
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
  const type = props.visSyntax.match(/vis\s+(\S+)/)?.[1] || 'pie';
  gptVis.render(type, props.visSyntax);
});

watch(() => props.visSyntax, (newSyntax) => {
  if (gptVis) {
    const type = newSyntax.match(/vis\s+(\S+)/)?.[1] || 'pie';
    gptVis.render(type, newSyntax);
  }
});

onUnmounted(() => gptVis?.destroy());
</script>
```
</details>

## 🧠 知识库

GPT-Vis 包含全面的[知识库](https://github.com/antvis/GPT-Vis/tree/main/knowledges)，帮助 LLM 理解何时使用每种图表类型以及如何构建数据结构。在 200+ 场景中评估，准确率超过 90%。

## 🤝 贡献

> **⚠️ AI 生成代码策略**: 本项目仅合并 AI 生成的代码。

贡献方式：
1. 提交 Issue 描述问题或功能
2. 标记 @copilot 生成实现
3. 提交包含 AI 生成代码的 PR

## 📄 开源协议

[MIT](./LICENSE) © [AntV](https://antv.antgroup.com/)
