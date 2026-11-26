<div align="center">

[English](./README.md) · [简体中文](./README.zh-CN.md)

<a href="https://gpt-vis.antv.vision/">
  <img src="https://github.com/eosphoros-ai/GPT-Vis/assets/17919400/c8804ffb-d3d6-45d3-846f-cf217681ab05" width="169" height="70" alt="GPT-Vis logo" />
</a>

# GPT-Vis: [Turn AI answers into charts.](https://gpt-vis.antv.vision/) ✨

An open-source visualization library for AI agents and applications.<br />
Render charts from JSON or Syntax, add analysis annotations, and reuse your theme everywhere.

[![npm version](https://img.shields.io/npm/v/@antv/gpt-vis.svg?style=flat-square)](https://www.npmjs.com/package/@antv/gpt-vis)
[![npm downloads](https://img.shields.io/npm/dm/@antv/gpt-vis.svg?style=flat-square)](https://www.npmjs.com/package/@antv/gpt-vis)
[![License](https://img.shields.io/badge/license-MIT-6950a1.svg?style=flat-square)](./LICENSE)

[Website](https://gpt-vis.antv.vision/) · [Documentation](https://gpt-vis.antv.vision/docs) · [Examples](https://gpt-vis.antv.vision/examples) · [Theme Studio](https://gpt-vis.antv.vision/themes) · [Agent Skill](https://gpt-vis.antv.vision/docs/agent-skill)

<a href="https://gpt-vis.antv.vision/">
  <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*VNswTozYmrAAAAAAcvAAAAgAemJ7AQ/original" width="100%" alt="GPT-Vis: turn AI answers into charts with 26 visualizations, analysis annotations, reusable themes, and Agent Skill. Visit the English website." />
</a>

</div>

## Features

- 🚀 **Framework Agnostic** — Works with vanilla JavaScript, React, Vue, Angular, or any framework
- ✍️ **Markdown-like Syntax** — Simple syntax that LLMs can generate directly, easy to learn and use
- 🌊 **Streaming Rendering** — Native support for AI model streaming output, renders as it generates
- 🛡️ **Fault Tolerant** — Gracefully handles incomplete or malformed data, adapts to the uncertainty of AI-generated content
- 📊 **26 Chart Types** — Statistical charts, relationship graphs, and text visualizations covering mainstream scenarios
- 🎨 **Reusable Themes** — Share one ThemeSpec across all chart types; preview and refine it in Theme Studio, or create it with an AI skill
- **28 Analysis Capabilities** — Mark extremes, ranks, means, targets, regions, and crossings, with statistical references computed by the SDK
- **Agent Skill** — Give AI assistants guidance for chart selection, configuration, framework integration, and theme creation

Built on [G2](https://github.com/antvis/G2), [G6](https://github.com/antvis/G6), and [T8](https://github.com/antvis/T8). Works with vanilla JavaScript, React, Vue, and other browser frameworks.

## Quick Start

### Use with your agent

Run this command from your project directory and choose a compatible assistant:

```bash
npx skills add https://github.com/antvis/GPT-Vis/tree/ai --skill chart-visualization
```

Then ask your agent to create its first report:

> Use the GPT-Vis Skill to create an H1 revenue report: Jan 84, Feb 96, Mar 91, Apr 118, May 126, Jun 148, in USD 10k. Include a line chart, a table, and a short summary. Use a shared theme and save a report.html that I can open in a browser.

The Skill includes chart selection guidance, runnable configuration patterns, and a Theme Creator reference. [Read the Skill source](./skills/chart-visualization/SKILL.md).

### Build with the SDK

```bash
npm install @antv/gpt-vis
```

Add a container and run the following after it mounts:

```html
<div id="chart" style="width: 100%; height: 360px;"></div>
```

```typescript
import { GPTVis } from '@antv/gpt-vis';

const chart = new GPTVis({ container: '#chart', height: 360, theme: 'product' });
const data = [
  { time: 'Jan', value: 84 },
  { time: 'Feb', value: 96 },
  { time: 'Mar', value: 91 },
  { time: 'Apr', value: 118 },
  { time: 'May', value: 126 },
  { time: 'Jun', value: 148 },
];

chart.render({
  type: 'line',
  title: 'Monthly revenue (USD 10k)',
  data,
});

// When the view unmounts:
// chart.destroy();
```

<details>
<summary>Prefer text? Render the same chart with Syntax</summary>

The same `render()` method accepts this text:

```typescript
chart.render(`vis line
title Monthly revenue (USD 10k)
data
  - time Jan
    value 84
  - time Feb
    value 96
  - time Mar
    value 91
  - time Apr
    value 118
  - time May
    value 126
  - time Jun
    value 148`);
```

</details>

[Quickstart](https://gpt-vis.antv.vision/docs/quickstart) · [Syntax guide](https://gpt-vis.antv.vision/docs/syntax) · [API reference](https://gpt-vis.antv.vision/docs/reference/api)

## Render as your model responds

Pass the accumulated output to `render()` on each update. GPT-Vis supports partial input so charts can appear before the response is complete.

<a href="https://gpt-vis.antv.vision/docs/streaming">
  <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*_xY7Q6QyuZ4AAAAAWeAAAAgAemJ7AQ/original" width="100%" loading="lazy" alt="A GPT-Vis chart rendering progressively as model output arrives. Open the streaming guide." />
</a>

```javascript
import { GPTVis, isVisSyntax } from '@antv/gpt-vis';

const chart = new GPTVis({ container: '#chart', width: 600, height: 400 });
let buffer = '';

function onToken(token) {
  buffer += token;
  if (isVisSyntax(buffer)) {
    chart.render(buffer);
  }
}
```

[Streaming guide →](https://gpt-vis.antv.vision/docs/streaming)

## 28 ways to explain a finding

Use `annotations` to put means, targets, rankings, and outliers directly on the chart.

<a href="https://gpt-vis.antv.vision/examples/annotations">
  <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*EyCDSqhgboEAAAAASCAAAAgAemJ7AQ/original" width="100%" loading="lazy" alt="GPT-Vis annotation comparison: revenue mean and target, response-time reference band and IQR outlier." />
</a>

Reuse the quickstart data and add a mean reference and a revenue target of 140:

```typescript
chart.render({
  type: 'line',
  data,
  annotations: [{ type: 'mean' }, { type: 'thresholdY', threshold: 140, label: 'Target 140' }],
});
```

The mean is **110.5** and June's revenue of **148** exceeds the target, in USD 10k. The SDK computes the mean; your configuration supplies the target.

<details>
<summary>See all 28 analysis capabilities</summary>

| Intent                          | Capabilities                                                                 | `type` identifiers                                                |
| ------------------------------- | ---------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| **Extremes & observations · 8** | X/Y maximum and minimum, first and last observation, local peaks and valleys | `maxX`, `minX`, `maxY`, `minY`, `first`, `last`, `peak`, `valley` |
| **Ranking & contribution · 4**  | Top N, Bottom N, series emphasis, contribution                               | `topN`, `bottomN`, `group`, `contribution`                        |
| **Statistical references · 5**  | Mean, median, quantile, IQR outliers, scatter center or weighted center      | `mean`, `median`, `quantile`, `outlier`, `centroid`               |
| **Thresholds & targets · 4**    | X/Y threshold lines, target or baseline, threshold emphasis                  | `thresholdX`, `thresholdY`, `target`, `thresholdHighlight`        |
| **Ranges & regions · 5**        | X/Y intervals, inside/outside range, quadrants                               | `rangeX`, `rangeY`, `rangeInside`, `rangeOutside`, `quadrant`     |
| **Events & crossings · 2**      | Event markers, threshold crossings or two-series intersections               | `event`, `crossing`                                               |

</details>

[Explore all 28 capabilities](https://gpt-vis.antv.vision/examples/annotations) · [Supported charts, selectors, and calculation rules](https://gpt-vis.antv.vision/docs/annotations)

These capabilities describe the current source. Check that your chosen SDK release includes the annotations you need; installing the Skill does not upgrade the rendering library.

## Syntax Guide

`render()` supports two input formats: JSON objects (ideal for programmatic use) and DSL syntax (ideal for LLM streaming).

### Object Config

Pass JSON objects directly for programmatic chart creation:

**Line chart:**

```javascript
chart.render({
  type: 'line',
  data: [
    { time: '2020', value: 100 },
    { time: '2021', value: 120 },
    { time: '2022', value: 150 },
  ],
});
```

**Pie chart:**

```javascript
chart.render({
  type: 'pie',
  data: [
    { category: 'Android', value: 72 },
    { category: 'iOS', value: 28 },
  ],
  innerRadius: 0.6,
});
```

For theme names, custom ThemeSpec objects, and style overrides, see [Themes and styles](#themes-and-styles).

**Custom Styles:**

```javascript
chart.render({
  type: 'line',
  data: [
    { time: '2020', value: 100 },
    { time: '2021', value: 120 },
  ],
  style: { mark: { line: { lineWidth: 3 } }, palette: ['#5B8FF9', '#5AD8A6'] },
});
```

### DSL Syntax

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
  mark
    line
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

**Render DSL syntax:**

```javascript
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

chart.render(visSyntax);
```

## Themes and styles

Share colors, typography, and styles across charts and tables. Choose from 10 gallery presets, including `gpt-vis`, `midnight`, `paper`, and `pop`, alongside the three original base themes:

<a href="https://gpt-vis.antv.vision/themes">
  <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*MjRURK8Ob4IAAAAATvAAAAgAemJ7AQ/original" width="100%" loading="lazy" alt="The same line chart and table rendered in GPT-Vis, Midnight, Paper, and Pop themes." />
</a>

### Built-in themes

Built-in themes are switchable via the `theme` property. The original base themes keep their existing appearance:

| Theme           | Identifier | Background | Palette                                               |
| --------------- | ---------- | ---------- | ----------------------------------------------------- |
| Default (Light) | `default`  | `#FFF`     | `#5B6CFF` `#2DAF9E` `#F2B84B` `#EF6A6A` `#55A6D9` ... |
| Dark            | `dark`     | `#141414`  | `#5B6CFF` `#2DAF9E` `#F2B84B` `#EF6A6A` `#55A6D9` ... |
| Academy         | `academy`  | `#FFF`     | `#4e79a7` `#f28e2c` `#e15759` `#76b7b2` `#59a14f` ... |

The website's 10 gallery styles are also built in:

| Theme                                           | Identifier     |
| ----------------------------------------------- | -------------- |
| GPT-Vis                                         | `gpt-vis`      |
| Midnight                                        | `midnight`     |
| Paper                                           | `paper`        |
| Product                                         | `product`      |
| Neon Circuit                                    | `neon-circuit` |
| Terra Print                                     | `terra-print`  |
| Mono Signal                                     | `mono-signal`  |
| Candy Pop                                       | `candy-pop`    |
| [Pop](https://github.com/microsoft/flint-chart) | `pop`          |
| Bauhaus                                         | `bauhaus`      |

The branded `gpt-vis` preset is separate from the SDK's `default`.

```typescript
const themedChart = new GPTVis({ container: '#chart', theme: 'pop' });
```

Names work in the constructor, chart JSON, and Syntax (`theme pop`). Summary receives its theme through the constructor. The supported name type is `BuiltinThemeName`.

```javascript
chart.render({
  type: 'line',
  data: [
    { time: '2020', value: 100 },
    { time: '2021', value: 120 },
  ],
  theme: 'dark',
});
```

### Reusable custom themes

Pass a `ThemeSpec` object to the constructor's `theme` option to share colors, typography, spacing, and mark styles across all 26 chart types, including graphs, Table, and Summary:

```typescript
import { GPTVis, type ThemeSpec } from '@antv/gpt-vis';

const theme: ThemeSpec = {
  id: 'my-report',
  label: 'My report',
  tokens: { colorDefault: '#7047eb', fontFamily: 'Arial, sans-serif', radius: 6 },
};
const chart = new GPTVis({ container: '#chart', theme });
```

Precedence: **single-chart config > custom ThemeSpec > GPT-Vis built-in theme**. Within this hierarchy: built-in defaults < tokens < global `style` < `charts[type].style` < local `style`. Nested objects merge; arrays replace. A chart-level `theme` replaces the constructor's theme selection. Summary uses a constructor theme and T8 text, without a per-render style object.

Explore [Theme Studio](https://gpt-vis.antv.vision/themes), read the [theme documentation](https://gpt-vis.antv.vision/docs/themes), or use the [theme creation guide](./skills/chart-visualization/references/theme-creator.md) to generate a ThemeSpec from your brand references.

Unchanged Studio presets can be used by their built-in names. After customization, pass the full object as `theme`; a custom `id` is metadata and does not register a new name.

Use a chart’s `style` to override theme colors and mark styles, as shown in the object configuration and Syntax examples above.

## Chart Types

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

## Framework Integration

| Integration                            | Starting point                                                                                                              |
| -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **React & Vue**                        | [Framework lifecycle examples](https://gpt-vis.antv.vision/docs/integrations/frameworks)                                    |
| **Markdown**                           | [Render visualization blocks in model responses](https://gpt-vis.antv.vision/docs/integrations/markdown)                    |
| **shadcn/ui**                          | [Copy universal or chart-specific React components into your project](https://gpt-vis.antv.vision/docs/integrations/shadcn) |
| **MCP**                                | [MCP Server Chart](https://github.com/antvis/mcp-server-chart)                                                              |
| **Server rendering, Streamlit & Dify** | [Explore the ecosystem](https://gpt-vis.antv.vision/docs/integrations/ecosystem)                                            |

<details>
<summary><strong>Vanilla JavaScript</strong></summary>

```javascript
import { GPTVis } from '@antv/gpt-vis';

const chart = new GPTVis({ container: '#chart', width: 600, height: 400 });
chart.render({
  type: 'line',
  data: [
    { time: '2020', value: 100 },
    { time: '2021', value: 120 },
    { time: '2022', value: 150 },
  ],
});

// Call chart.destroy() when the view unmounts.
```

</details>

<details>
<summary><strong>React</strong></summary>

```jsx
import { GPTVis } from '@antv/gpt-vis';
import { useEffect, useRef } from 'react';

function ChartComponent({ visSyntax }) {
  const containerRef = useRef();
  const chartRef = useRef();

  useEffect(() => {
    chartRef.current = new GPTVis({ container: containerRef.current, width: 600, height: 400 });
    return () => chartRef.current?.destroy();
  }, []);

  useEffect(() => {
    if (chartRef.current && visSyntax) {
      chartRef.current.render(visSyntax);
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
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { GPTVis } from '@antv/gpt-vis';

const props = defineProps(['visSyntax']);
const chartRef = ref(null);
let chart = null;

onMounted(() => {
  chart = new GPTVis({ container: chartRef.value, width: 600, height: 400 });
  if (props.visSyntax) chart.render(props.visSyntax);
});

watch(
  () => props.visSyntax,
  (syntax) => {
    if (chart && syntax) chart.render(syntax);
  },
);

onUnmounted(() => chart?.destroy());
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
          return `<gpt-vis data-syntax="${syntax}" style="display:block;min-height:300px"></gpt-vis>`;
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

// Add <div id="content"></div> to your page.
document.getElementById('content').innerHTML = marked.parse(markdown);
```

</details>

## Shadcn/ui

Copy GPT-Vis React components directly into your project via shadcn CLI — full source control, fully customizable.

### Base Component

The universal `GPTVis` component accepts vis syntax strings or config objects for all 26 chart types:

```bash
npx shadcn@latest add @gpt-vis/gpt-vis
```

```tsx
import { GPTVis } from '@/components/ui/gpt-vis';

<GPTVis
  content={`vis line
data
  - time 2020
    value 100
  - time 2021
    value 120
  - time 2022
    value 150
title Sales Trend`}
  theme="academy"
/>;
```

### Typed Chart Components

Each chart type has its own component with a typed `config` prop — JSON only, chart-specific TypeScript validation:

```bash
npx shadcn@latest add @gpt-vis/line
```

```tsx
import { Line } from '@/components/ui/line';

<Line
  config={{
    data: [
      { time: '2020', value: 100 },
      { time: '2021', value: 120 },
      { time: '2022', value: 150 },
    ],
    title: 'Sales Trend',
    axisXTitle: 'Year',
  }}
  height={400}
/>;
```

All 26 chart types are available. Install any by name:

```bash
npx shadcn@latest add @gpt-vis/pie
npx shadcn@latest add @gpt-vis/bar
npx shadcn@latest add @gpt-vis/mindmap
# ...and more
```

Each typed component automatically bundles the base `GPTVis` component as a dependency. Props like `width`, `height`, `theme`, `wrapper`, `locale`, `className`, and `containerStyle` are the same across all components.

## AI Ecosystem

GPT-Vis provides a complete AI integration solution:

- **[MCP Server](https://github.com/antvis/mcp-server-chart)** — Enable AI models to directly invoke visualization capabilities via Model Context Protocol
- **[Chart Skill](./skills/chart-visualization/SKILL.md)** — Help AI assistants choose charts, generate JSON, Syntax or integration code, and create reusable themes with the bundled Theme Creator reference

- **[Server rendering and community integrations](https://gpt-vis.antv.vision/docs/integrations/ecosystem)** — Explore server-side chart rendering, Streamlit, and Dify integrations

## Contributing

> **AI-Generated Code Policy**: This project only merges AI-generated code.

1. Submit an Issue describing the problem or feature request
2. Tag @copilot to generate the implementation
3. Submit a PR with AI-generated code

[Report an issue](https://github.com/antvis/GPT-Vis/issues)

## License

[MIT](./LICENSE) © [AntV](https://antv.antgroup.com/)
