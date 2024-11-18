---
order: 1
group:
  order: 10
  title: 其他
---

# GPTVis 协议渲染器

GPTVis 协议的 Markdown 渲染器，基于 Markdown 语法扩展 `vis-chart` 语法块，支持自定义渲染组件。

## 基础使用

`GPTVis` 组件内置了[默认的图表](https://github.com/antvis/GPT-Vis/tree/main/src/export.ts#L76)，接入简单

<code src="./demos/default"></code>

## 自定义标签渲染

<code src="./demos/tag"></code>

## 自定义 code 渲染块

自定义代码块渲染，`GPTVisLite` 不内置图表组件，使用图表组件需要注册。

<code src="./demos/code"></code>

## API

继承 [react-markdown](https://github.com/remarkjs/react-markdown#options) 组件全部属性。
