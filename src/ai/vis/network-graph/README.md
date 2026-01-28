# NetworkGraph

A network graph for visualizing relationships and connections between nodes, built with G6.

## Usage

```ts
import { NetworkGraph } from '@antv/gpt-vis/ai';

const networkGraph = NetworkGraph({
  container: '#container',
  width: 600,
  height: 400,
});

networkGraph.render({
  type: 'network-graph',
  data: {
    nodes: [{ name: 'Node A' }, { name: 'Node B' }, { name: 'Node C' }],
    edges: [
      { source: 'Node A', target: 'Node B' },
      { source: 'Node B', target: 'Node C' },
    ],
  },
});

networkGraph.destroy();
```

## Configuration

### Constructor Options (NetworkGraphOptions)

| Property  | Type                  | Default | Description                   |
| --------- | --------------------- | ------- | ----------------------------- |
| container | string \| HTMLElement | -       | Container element or selector |
| width     | number                | 640     | Chart width in pixels         |
| height    | number                | 480     | Chart height in pixels        |

### Render Config (NetworkGraphConfig)

| Property | Type             | Default         | Description               |
| -------- | ---------------- | --------------- | ------------------------- |
| type     | string           | 'network-graph' | Component type identifier |
| data     | NetworkGraphData | -               | Network graph data        |

### Data Structure

```ts
type NetworkGraphData = {
  nodes: { name: string }[];
  edges: { source: string; target: string; name?: string }[];
};
```

## Examples

### Basic Network Graph

```ts
networkGraph.render({
  type: 'network-graph',
  data: {
    nodes: [{ name: 'Alice' }, { name: 'Bob' }, { name: 'Charlie' }, { name: 'David' }],
    edges: [
      { source: 'Alice', target: 'Bob', name: 'knows' },
      { source: 'Bob', target: 'Charlie', name: 'works with' },
      { source: 'Charlie', target: 'David', name: 'manages' },
    ],
  },
});
```

## Methods

- `render(config: NetworkGraphConfig): void` - Render or update the network graph
- `destroy(): void` - Destroy the network graph instance and clean up resources
