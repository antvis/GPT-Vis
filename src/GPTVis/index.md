---
order: 1
group:
  order: 10
  title: 其他
toc: content
demo: { cols: 2 }
---

# GPTVis 协议渲染器

GPTVis 协议的 Markdown 渲染器，基于 Markdown 语法扩展 `vis-chart` 语法块，支持自定义渲染组件。

## 基础使用

`GPTVis` 组件内置了[默认的图表](https://github.com/antvis/GPT-Vis/tree/main/src/export.ts#L76)，接入简单

<code src="./demos/default"></code>

## 关系类图表渲染

<code src="./demos/relation"></code>

## 自定义标签渲染

<code src="./demos/tag"></code>

## 自定义 code 渲染块

自定义代码块渲染，`GPTVisLite` 不内置图表组件，使用图表组件需要注册。

<code src="./demos/code"></code>

## vis chart 图表错误渲染

vis chart 数据格式错误, 图表渲染失败，默认展示其原始数据

<code src="./demos/errorRender"></code>

## 容器组件通信

通过发布订阅组件事件与 Context 传递数据，来用于子组件与容器组件通信。

<code src="./demos/event">订阅组件事件</code>
<code src="./demos/context-provider">Context 传递数据</code>

## API

继承 [react-markdown](https://github.com/remarkjs/react-markdown#options) 组件全部属性。
