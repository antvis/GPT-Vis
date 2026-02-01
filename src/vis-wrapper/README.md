# GPT-Vis Wrapper Feature

## Overview

The wrapper feature adds an outer container to GPTVis charts with built-in UI controls for enhanced user interaction. When enabled, charts are displayed with tabs, buttons, and additional functionality.

## Features

### Chart Tab

- **Download Chart**: Export the chart as a PNG image
- **Zoom Controls** (for G6 charts only):
  - Zoom in/out buttons for charts like mind-map, network-graph, flow-diagram, organization-chart, indented-tree, and fishbone-diagram

### Code Tab

- **View Configuration**: Switch to code view to see the JSON configuration of the chart
- **Copy Code**: Copy the chart configuration to clipboard with one click

## Usage

### Basic Example

```typescript
import { GPTVis } from '@antv/gpt-vis';

// Create a GPTVis instance with wrapper enabled
const g = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
  wrapper: true, // Enable the wrapper (default: false)
});

// Render a chart
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

// Clean up when done
g.destroy();
```

### Without Wrapper (Default)

```typescript
const g = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
  wrapper: false, // Or omit this option (default is false)
});
```

### With G6 Charts (Zoom Controls)

For G6-based charts (mind-map, network-graph, flow-diagram, etc.), the wrapper automatically displays zoom in/out buttons:

```typescript
const g = new GPTVis({
  container: '#container',
  width: 600,
  height: 400,
  wrapper: true,
});

g.render({
  type: 'mind-map',
  data: {
    name: '项目管理',
    children: [
      {
        name: '计划阶段',
        children: [{ name: '需求分析' }, { name: '资源规划' }],
      },
      {
        name: '执行阶段',
        children: [{ name: '任务分配' }, { name: '进度跟踪' }],
      },
    ],
  },
  theme: 'default',
});
```

## Implementation Details

### Architecture

1. **VisualizationOptions Interface**: Added `wrapper?: boolean` option (default: false)
2. **createVisWrapper Function**: Creates the wrapper HTML structure with tabs and controls
3. **GPTVis Integration**: When `wrapper: true`, the GPTVis class creates a wrapper container and renders the chart inside it

### Wrapper Components

- **Tab Header**: Contains chart/code tabs and action buttons
- **Tab Content**: Displays either the chart or the JSON configuration
- **Chart Container**: The actual chart rendering area
- **Code Container**: Shows formatted JSON with syntax highlighting

### Styling

The wrapper uses inline styles injected via a `<style>` tag to ensure no conflicts with existing styles. The design follows the reference from the original React component.

## Supported Chart Types with Zoom

The following chart types support zoom controls when wrapper is enabled:

- mind-map (思维导图)
- fishbone-diagram (鱼骨图)
- flow-diagram (流程图)
- organization-chart (组织架构图)
- network-graph (网络图)
- indented-tree (缩进树)

## Browser Compatibility

The wrapper feature requires:

- Modern browser with ES6+ support
- `navigator.clipboard` API for copy functionality
- `snapdom` library for chart image export

## Examples

See `src/ai/playground/wrapper-test.html` and `src/ai/playground/wrapper-test.ts` for complete working examples.

## API Reference

### VisualizationOptions

```typescript
interface VisualizationOptions {
  container: string | HTMLElement; // Container selector or element
  width?: number; // Chart width
  height?: number; // Chart height
  wrapper?: boolean; // Enable wrapper (default: false)
}
```

### GPTVis Methods

```typescript
class GPTVis {
  constructor(options: VisualizationOptions);
  render(config: GPTVisConfig): void;
  destroy(): void;
}
```

## Notes

- The wrapper is disabled by default (`wrapper: false`) to maintain backward compatibility
- Only affects the `GPTVis` unified API, not individual chart components
- Wrapper styles are automatically injected when the wrapper is first created
- Multiple GPTVis instances can use wrappers independently
