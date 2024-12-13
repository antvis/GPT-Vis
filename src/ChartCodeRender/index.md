---
order: 2
toc: content
group:
  order: 10
  title: 其他
---

# withChartCode 拓展代码块渲染

自定义拓展 Markdown 代码块渲染，将代码块自定义可视化。

:::warning
这是一条警告信息
`withChartCode`、`withDefaultChartCode` 方法不要直接放入函数内部，避免重复渲染造成抖动问题！！！如需放入函数内部，用 `useMemo` 缓存一下。
:::

## 使用 withChartCode

<code src="./demos/common"></code>

## 使用 withDefaultChartCode

`withDefaultChartCode`包含了[默认的图表](https://github.com/antvis/GPT-Vis/tree/main/src/export.ts#L76)，接入简单

<code src="./demos/default"></code>

## 在流式输出中使用

<code src="./demos/stream"></code>

## 拓展其他 code 的自定义渲染

<code src="./demos/extra"></code>

## API

### WithChartCodeOptions

| 属性              | 类型                  | 是否必传 | 默认值  | 说明                                   |
| ----------------- | --------------------- | -------- | ------- | -------------------------------------- |
| components        | `ChartComponents`     | 否       | -       | 要额外加载的图表组件                   |
| languageRenderers | `LanguageRenderers`   | 否       | -       | 自定义其它语言代码块渲染器             |
| defaultRenderer   | `CodeRenderer`        | 否       | -       | 默认的代码渲染器                       |
| debug             | `boolean`             | 否       | `false` | 打开调试日志                           |
| loadingTimeout    | `number`              | 否       | -       | 设置 loading 动画的超时时间，默认为 5s |
| style             | `React.CSSProperties` | 否       | -       | 图表样式，配置容器样式                 |
