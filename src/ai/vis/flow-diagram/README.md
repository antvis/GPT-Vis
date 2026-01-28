# FlowDiagram

A flow diagram for visualizing process flows and workflows, built with G6.

## Usage

```ts
import { FlowDiagram } from '@antv/gpt-vis/ai';

const flowDiagram = FlowDiagram({
  container: '#container',
  width: 600,
  height: 400,
});

flowDiagram.render({
  type: 'flow-diagram',
  data: {
    nodes: [{ name: 'Start' }, { name: 'Process' }, { name: 'End' }],
    edges: [
      { source: 'Start', target: 'Process' },
      { source: 'Process', target: 'End' },
    ],
  },
});

flowDiagram.destroy();
```

## Configuration

### Constructor Options (FlowDiagramOptions)

| Property  | Type                  | Default | Description                   |
| --------- | --------------------- | ------- | ----------------------------- |
| container | string \| HTMLElement | -       | Container element or selector |
| width     | number                | 640     | Chart width in pixels         |
| height    | number                | 480     | Chart height in pixels        |

### Render Config (FlowDiagramConfig)

| Property | Type            | Default        | Description               |
| -------- | --------------- | -------------- | ------------------------- |
| type     | string          | 'flow-diagram' | Component type identifier |
| data     | FlowDiagramData | -              | Flow diagram data         |

### Data Structure

```ts
type FlowDiagramData = {
  nodes: { name: string }[];
  edges: { source: string; target: string; name?: string }[];
};
```

## Examples

### Basic Flow Diagram

```ts
flowDiagram.render({
  type: 'flow-diagram',
  data: {
    nodes: [
      { name: 'Start' },
      { name: 'Validate Input' },
      { name: 'Process Data' },
      { name: 'Save Results' },
      { name: 'End' },
    ],
    edges: [
      { source: 'Start', target: 'Validate Input' },
      { source: 'Validate Input', target: 'Process Data' },
      { source: 'Process Data', target: 'Save Results' },
      { source: 'Save Results', target: 'End' },
    ],
  },
});
```

### Flow Diagram with Edge Labels

```ts
flowDiagram.render({
  type: 'flow-diagram',
  data: {
    nodes: [{ name: 'Decision' }, { name: 'Option A' }, { name: 'Option B' }],
    edges: [
      { source: 'Decision', target: 'Option A', name: 'Yes' },
      { source: 'Decision', target: 'Option B', name: 'No' },
    ],
  },
});
```

## Methods

- `render(config: FlowDiagramConfig): void` - Render or update the flow diagram
- `destroy(): void` - Destroy the flow diagram instance and clean up resources
