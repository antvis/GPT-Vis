<img src="https://gw.alipayobjects.com/zos/antfincdn/R8sN%24GNdh6/language.svg" width="18"> [English](./README.md) | 简体中文 | [日本語](./README.ja-JP.md)

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

> **📢 Version 1.0 预览版**: 这是 GPT-Vis 1.0 的预览版本，采用全新架构，专为 AI 优化。正式版预计 **2026 年 3 月 21 日**发布。

## 🌟 1.0 版本新特性

GPT-Vis 1.0 代表了可视化与 AI 协作方式的根本性转变:

- **🚀 框架无关**: 不再局限于 React。支持原生 JavaScript、Vue、Angular 或任何框架
- **✍️ 自然语法**: 简单的类 Markdown 语法，LLM 可以轻松生成
- **🌊 流式支持**: 内置支持 AI 模型的流式输出
- **🛡️ 容错性**: 优雅处理流式传输中的不完整或格式错误数据
- **🎯 AI 优化**: 从底层为 AI 交互模式设计

## ✨ 核心特性

### 📝 **AI 友好的 Markdown 语法**

简单直观的语法，LLM 无需复杂 JSON 结构即可自然生成：

````markdown
```vis
vis pie
data
  - category 销售
    value 30
  - category 市场
    value 25
  - category 工程
    value 45
innerRadius 0.6
```
````

**为什么采用这种语法？**
- ✅ LLM 自然生成
- ✅ 人类可读，易于调试
- ✅ 支持流式（逐行解析）
- ✅ 容错性强（部分渲染也能工作）

### 🎨 **20+ 图表类型**

全面的图表库，针对 AI 生成优化：

- **统计图表**: 折线图、柱状图、条形图、饼图、面积图、散点图、直方图、热力图
- **关系图表**: 网络图、思维导图、组织架构图、流程图、桑基图
- **高级图表**: 双轴图、雷达图、箱线图、小提琴图、漏斗图、瀑布图、矩形树图
- **特殊图表**: 词云、水波图、韦恩图

### 🧠 **智能默认值**

智能默认配置减少 LLM 需要生成的配置量：

- 自动数据类型检测
- 智能配色方案
- 自适应布局
- 响应式尺寸

### 🌐 **通用兼容性**

在各种环境中无缝工作：

- **前端**: 原生 JS、React、Vue、Angular、Svelte
- **后端**: Node.js（支持 SSR）
- **Python**: 通过 [streamlit-gpt-vis](https://github.com/antvis/GPT-Vis/tree/main/bindings/streamlit-gpt-vis) 集成 Streamlit
- **AI 平台**: 通过 [MCP](https://github.com/antvis/mcp-server-chart) 支持 ChatGPT、Claude 等

## 🚀 快速开始

### 安装

```bash
npm install @antv/gpt-vis
```

### 基础用法

新语法专为 LLM 流式生成而设计：

````markdown
```vis
vis line
data
  - time 2020
    value 100
  - time 2021
    value 120
  - time 2022
    value 150
  - time 2023
    value 180
```
````

### 解析与渲染

```javascript
import { parse, Line } from '@antv/gpt-vis';

// 解析类 Markdown 语法
const markdownText = `
vis line
data
  - time 2020
    value 100
  - time 2021
    value 120
`;

const config = parse(markdownText);
// 结果: { type: 'line', data: [{ time: 2020, value: 100 }, { time: 2021, value: 120 }] }

// 渲染图表
const chart = Line(config, document.getElementById('container'));
```

### 流式支持

非常适合 AI 响应的增量图表生成：

```javascript
import { parse, isVisSyntax } from '@antv/gpt-vis';

let buffer = '';

// 当 LLM 的 token 到达时
function onToken(token) {
  buffer += token;
  
  // 检查是否有完整的 vis 语法
  if (isVisSyntax(buffer)) {
    try {
      const config = parse(buffer);
      // 渲染或更新图表
      renderChart(config);
    } catch (e) {
      // 数据不完整 - 等待更多 token
    }
  }
}
```

## 📚 语法指南

### 基本结构

```
vis [图表类型]
[属性] [值]
[节名称]
  - [项属性] [值]
```

### 常见模式

**简单键值对:**
```
vis pie
title 销售分布
innerRadius 0.6
```

**数据数组:**
```
vis bar
data
  - category Q1
    value 30
  - category Q2
    value 45
```

**样式自定义:**
```
vis line
style
  lineWidth 3
  palette #5B8FF9 #5AD8A6 #5D7092
```

**层次数据:**
```
vis mind-map
data
  - name 项目
    children
      - name 阶段一
        children
          - name 任务 A
          - name 任务 B
      - name 阶段二
```

## 🎯 为什么选择 GPT-Vis 1.0？

### 传统方法的问题

传统可视化库需要：
- 复杂的 JSON 配置
- 框架特定的组件
- 深入了解图表 API
- 预先完美的数据结构

### GPT-Vis 的解决方案

GPT-Vis 1.0 专为 AI 实际工作方式设计：
- **简单语法** LLM 可以自然生成
- **流式兼容** 实现实时图表生成
- **容错性强** 处理不完整或不完美的数据
- **框架无关** 可在任何地方工作

### 完美适配 AI 工作流

```
用户: "显示各地区销售情况"
  ↓
LLM 生成简单语法
  ↓
GPT-Vis 渲染图表
  ↓
用户即时看到可视化
```

## 🔧 高级用法

### 框架集成

<details>
<summary><strong>原生 JavaScript</strong></summary>

```javascript
import { parse, Pie } from '@antv/gpt-vis';

const container = document.getElementById('chart');
const config = parse(visSyntaxString);
Pie(config, container);
```
</details>

<details>
<summary><strong>React</strong></summary>

```jsx
import { parse, Pie } from '@antv/gpt-vis';
import { useEffect, useRef } from 'react';

function ChartComponent({ visSyntax }) {
  const ref = useRef();
  
  useEffect(() => {
    const config = parse(visSyntax);
    Pie(config, ref.current);
  }, [visSyntax]);
  
  return <div ref={ref} />;
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
import { ref, onMounted } from 'vue';
import { parse, Pie } from '@antv/gpt-vis';

const props = defineProps(['visSyntax']);
const chartRef = ref(null);

onMounted(() => {
  const config = parse(props.visSyntax);
  Pie(config, chartRef.value);
});
</script>
```
</details>

## 🧠 知识库

GPT-Vis 包含全面的[知识库](https://github.com/antvis/GPT-Vis/tree/main/knowledges)，帮助 LLM 理解：

- 何时使用每种图表类型
- 如何为不同可视化构建数据结构
- 有效数据呈现的最佳实践

我们的评估在 200+ 真实场景中显示出**超过 90% 的准确率**。

## 🤝 贡献

> **⚠️ AI 生成代码策略**: 本项目**仅合并 AI 生成的代码**。

贡献方式：
1. **提交 Issue**: 描述问题或功能需求
2. **标记 @copilot**: 让 AI 生成实现
3. **提交 PR**: 在 pull request 中包含 AI 生成的代码

这确保了与我们 AI 优先理念的一致性。

## 📄 开源协议

[MIT](./LICENSE) © [AntV](https://antv.antgroup.com/)

---

<div align="center">

**AntV 通往 AI 驱动可视化的门户**

为人工智能时代而生

[AntV](https://antv.antgroup.com/) | [GitHub](https://github.com/antvis) | [Twitter](https://twitter.com/AntV_Alipay)

</div>
