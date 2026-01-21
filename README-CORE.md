# GPT-Vis Core API (v1.0)

> **🎨 Visualization for AI, Friendly!** Framework-agnostic visualization library with AI-friendly syntax.

## Overview

GPT-Vis 1.0 introduces a new framework-agnostic core API that makes it easy to create visualizations using either AI-friendly text syntax or traditional JSON configuration. Unlike the React-based API, the core API works with any JavaScript environment.

## Installation

```bash
npm install @antv/gpt-vis
# or
pnpm add @antv/gpt-vis
```

## Quick Start

### Text Syntax (AI-Friendly)

```javascript
import { GPTVis } from '@antv/gpt-vis';

const vis = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
});

// Render using AI-friendly syntax
await vis.render(`
vis pie
data
  - category 分类一
    value 27
  - category 分类二
    value 25
  - category 分类三
    value 18
theme academy
innerRadius 0.6
`);
```

### JSON Format

```javascript
// Or use traditional JSON format
await vis.render({
  type: 'pie',
  data: [
    { category: '分类一', value: 27 },
    { category: '分类二', value: 25 },
    { category: '分类三', value: 18 },
  ],
  innerRadius: 0.6,
  theme: 'academy',
});
```

## Features

- ✅ **Framework Agnostic**: Pure JavaScript, no React/Vue/Angular required
- ✅ **AI-Friendly Syntax**: Simple text-based format perfect for LLM output
- ✅ **Multiple Formats**: Support both text syntax and JSON
- ✅ **Streaming Ready**: Designed for incremental rendering from streaming APIs
- ✅ **Extensible**: Easy to add new chart types and rendering engines
- ✅ **Type Safe**: Full TypeScript support

## Syntax Reference

### Chart Types

Currently supported chart types:

- `pie` - Pie/Donut charts
- `line` - Line charts
- `bar` - Horizontal bar charts
- `column` - Vertical column charts
- `area` - Area charts
- `scatter` - Scatter plots

More chart types coming soon!

### Data Format

```
data
  - key1 value1
    key2 value2
  - key1 value3
    key2 value4
```

Example:

```
data
  - category Product A
    value 120
  - category Product B
    value 95
  - category Product C
    value 145
```

### Configuration Options

```
# Chart type (required)
vis <chart-type>

# Theme
theme academy|default|dark

# Pie/Donut specific
innerRadius 0.0-1.0

# Line/Bar/Column/Area specific
xField <field-name>
yField <field-name>
seriesField <field-name>

# Scatter specific
sizeField <field-name>
```

## API Reference

### Constructor

```typescript
new GPTVis(options: GPTVisOptions)
```

**Options:**

```typescript
interface GPTVisOptions {
  container: string | HTMLElement; // Container element or selector
  width?: number; // Chart width (default: 600)
  height?: number; // Chart height (default: 400)
  withContainer?: boolean; // Apply dimensions to container (default: true)
  engine?: any; // Custom rendering engine (optional)
}
```

### Methods

#### `render(input: string | ChartConfig): Promise<void>`

Render a visualization from syntax or config object.

```javascript
// Text syntax
await vis.render(`vis pie\ndata\n  - category A\n    value 10`);

// JSON config
await vis.render({
  type: 'pie',
  data: [{ category: 'A', value: 10 }],
});
```

#### `update(data: any[]): Promise<void>`

Update chart data without recreating the chart.

```javascript
await vis.update([
  { category: 'A', value: 20 },
  { category: 'B', value: 30 },
]);
```

#### `destroy(): void`

Destroy the chart and cleanup resources.

```javascript
vis.destroy();
```

#### `getChart(): Chart | null`

Get the underlying G2 Chart instance.

```javascript
const chart = vis.getChart();
```

## Examples

### Line Chart

```javascript
await vis.render(`
vis line
data
  - x Jan
    y 30
  - x Feb
    y 45
  - x Mar
    y 40
  - x Apr
    y 55
  - x May
    y 60
xField x
yField y
`);
```

### Column Chart with Series

```javascript
await vis.render({
  type: 'column',
  data: [
    { quarter: 'Q1', product: 'A', sales: 100 },
    { quarter: 'Q1', product: 'B', sales: 80 },
    { quarter: 'Q2', product: 'A', sales: 120 },
    { quarter: 'Q2', product: 'B', sales: 95 },
  ],
  xField: 'quarter',
  yField: 'sales',
  seriesField: 'product',
});
```

### Scatter Plot

```javascript
await vis.render(`
vis scatter
data
  - x 10
    y 20
    size 5
  - x 20
    y 30
    size 10
  - x 30
    y 15
    size 8
xField x
yField y
sizeField size
`);
```

## Comparison with React API

### Core API (New)

```javascript
import { GPTVis } from '@antv/gpt-vis';

const vis = new GPTVis({ container: '#app' });
await vis.render(`vis pie\ndata\n  - category A\n    value 10`);
```

**Pros:**

- Framework agnostic
- Smaller bundle size
- AI-friendly syntax
- Works in any JavaScript environment

### React API (Existing)

```jsx
import { GPTVisReact, Pie } from '@antv/gpt-vis';

<GPTVisReact>
  {`# Pie Chart
\`\`\`vis-pie
{
  "data": [{"category": "A", "value": 10}]
}
\`\`\`
`}
</GPTVisReact>;
```

**Pros:**

- Full React integration
- Component-based
- More chart types available (20+)

Both APIs are supported and can be used based on your needs.

## Roadmap

- [ ] Add remaining chart types (histogram, radar, treemap, etc.)
- [ ] Streaming syntax parser
- [ ] Engine registration system (G6, S2, L7)
- [ ] Custom engine adapters
- [ ] Improved error handling
- [ ] Performance optimizations

## License

MIT

## Contributing

Contributions are welcome! Please read our contributing guide and submit pull requests to our repository.
