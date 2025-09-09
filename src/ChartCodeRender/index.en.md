---
order: 2
toc: content
group:
  order: 10
  title: Others
---

# withChartCode Extended Code Block Rendering

Custom extended Markdown code block rendering, allowing custom visualization of code blocks.

:::warning
This is a warning message
`withChartCode` and `withDefaultChartCode` methods should not be placed directly inside functions to avoid jitter issues caused by repeated rendering!! If you need to place them inside functions, use `useMemo` for caching.
:::

## Using withChartCode

<code src="./demos/common"></code>

## Using withDefaultChartCode

`withDefaultChartCode` includes [default charts](https://github.com/antvis/GPT-Vis/tree/main/src/export.ts#L76), making integration simple

<code src="./demos/default"></code>

## Internationalization

Through the `locale` property, you can set the internationalization language. Currently, it supports `zh-CN` and `en-US`, with the default being `zh-CN`.
<code src="./demos/internationalization"></code>

## Using in Stream Output

<code src="./demos/stream"></code>

## Custom Error Rendering

Through `errorRender` and `componentErrorRender` properties, you can customize error rendering, allowing users to get complete error information for personalized error handling.

<code src="./demos/errorRender"></code>

## Extending Custom Rendering for Other Code

<code src="./demos/extra"></code>

## API

### WithChartCodeOptions

| Property          | Type                  | Required | Default | Description                                     |
| ----------------- | --------------------- | -------- | ------- | ----------------------------------------------- |
| components        | `ChartComponents`     | No       | -       | Additional chart components to load             |
| languageRenderers | `LanguageRenderers`   | No       | -       | Custom renderers for other language code blocks |
| defaultRenderer   | `CodeRenderer`        | No       | -       | Default code renderer                           |
| errorRender       | `ErrorRender`         | No       | -       | Custom error rendering function                 |
| debug             | `boolean`             | No       | `false` | Enable debug logging                            |
| loadingTimeout    | `number`              | No       | -       | Set loading animation timeout, default 5s       |
| style             | `React.CSSProperties` | No       | -       | Chart styles, configure container styles        |
