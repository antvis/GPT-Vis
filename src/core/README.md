# GPT-Vis Core

Framework-agnostic core library for AI-friendly visualization.

## Features

- **AI-Friendly Syntax**: Simple text-based syntax for defining visualizations
- **Multiple Input Formats**: Support both text syntax and JSON
- **Framework Agnostic**: Pure JavaScript, no framework dependencies
- **Streaming Support**: Designed for streaming and incremental rendering
- **Extensible**: Support for multiple rendering engines (G2, S2, G6, X6, L7)

## Usage

### Text Syntax

```javascript
import { GPTVis } from '@antv/gpt-vis';

const g = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
  withContainer: true,
});

g.render(`
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
g.render({
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

## Syntax Reference

### Chart Types

- `pie` - Pie/Donut chart
- `line` - Line chart
- `bar` - Bar chart
- `column` - Column chart
- `area` - Area chart
- More coming soon...

### Data Format

```
data
  - key1 value1
    key2 value2
  - key1 value3
    key2 value4
```

### Configuration

```
theme academy|default|dark
innerRadius 0.0-1.0
xField fieldName
yField fieldName
seriesField fieldName
```

## API

### Constructor

```typescript
new GPTVis(options: GPTVisOptions)
```

**Options:**

- `container` (string | HTMLElement): Container element or selector
- `width` (number): Chart width (default: 600)
- `height` (number): Chart height (default: 400)
- `withContainer` (boolean): Apply dimensions to container (default: true)
- `engine` (any): Custom rendering engine (optional)

### Methods

#### render(input: string | ChartConfig): Promise<void>

Render a visualization from syntax or config object.

#### update(data: any[]): Promise<void>

Update chart data without recreating the chart.

#### destroy(): void

Destroy the chart and cleanup resources.

#### getChart(): Chart | null

Get the underlying chart instance.

## Architecture

The core module is designed to be:

1. **Framework Agnostic**: No React, Vue, or other framework dependencies
2. **Extensible**: Support for multiple rendering engines through adapter pattern
3. **Streaming-Friendly**: Can handle partial/incomplete syntax during streaming
4. **Error Tolerant**: Graceful handling of malformed input

## Roadmap

- [ ] Add support for all 20+ chart types
- [ ] Implement streaming syntax parser
- [ ] Add engine registration system
- [ ] Support for G6 (graphs)
- [ ] Support for S2 (pivot tables)
- [ ] Support for L7 (maps)
- [ ] Custom engine adapters (ECharts, D3, etc.)
