---
order: 1
group:
  order: 10
  title: Others
toc: content
demo: { cols: 2 }
---

# GPTVis Protocol Renderer

GPTVis protocol Markdown renderer, based on Markdown syntax extension `vis-chart` syntax blocks, supports custom rendering components.

## Basic Usage

`GPTVis` component includes [default charts](https://github.com/antvis/GPT-Vis/tree/main/src/export.ts#L76), making integration simple

<code src="./demos/default"></code>

## Relationship Chart Rendering

<code src="./demos/relation"></code>

## Custom Tag Rendering

<code src="./demos/tag"></code>

## Custom Code Rendering Blocks

Custom code block rendering, `GPTVisLite` does not include chart components by default, chart components need to be registered.

<code src="./demos/code"></code>

## vis chart Error Rendering

When vis chart data format is incorrect, chart rendering fails, it will display the original data by default

<code src="./demos/errorRender"></code>

## Container Component Communication

Through publish-subscribe component events and Context data transfer, used for child components to communicate with container components.

<code src="./demos/event">Subscribe to component events</code>
<code src="./demos/context-provider">Context data transfer</code>

## API

Inherits all properties of [react-markdown](https://github.com/remarkjs/react-markdown#options) component.
