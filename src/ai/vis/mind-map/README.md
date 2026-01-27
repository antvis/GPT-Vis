# MindMap

A mind map visualization component for hierarchical data, built with G6 5.0.

## Usage

```ts
import { MindMap } from '@antv/gpt-vis/ai';

const mindMap = MindMap({
  container: '#container',
  width: 600,
  height: 400,
});

mindMap.render({
  type: 'mind-map',
  data: {
    name: '项目计划',
    children: [
      {
        name: '研究阶段',
        children: [{ name: '市场调研' }, { name: '技术可行性分析' }],
      },
      {
        name: '设计阶段',
        children: [{ name: '产品功能确定' }, { name: 'UI 设计' }],
      },
    ],
  },
});

mindMap.destroy();
```

## Configuration

### Constructor Options (MindMapOptions)

| Property  | Type                  | Default | Description                   |
| --------- | --------------------- | ------- | ----------------------------- |
| container | string \| HTMLElement | -       | Container element or selector |
| width     | number                | 640     | Chart width in pixels         |
| height    | number                | 480     | Chart height in pixels        |

### Render Config (MindMapConfig)

| Property | Type   | Default   | Description               |
| -------- | ------ | --------- | ------------------------- |
| data     | object | -         | Tree data structure       |
| theme    | string | 'default' | Color theme               |
| style    | object | -         | Chart style configuration |

### Data Structure

```ts
type MindMapDataItem = {
  name: string;
  description?: string;
  children?: MindMapDataItem[];
  [key: string]: any;
};
```

### Style Options

```ts
style?: {
  backgroundColor?: string; // Background color
}
```

## Examples

### Basic Example

```ts
mindMap.render({
  type: 'mind-map',
  data: {
    name: 'Root',
    children: [
      {
        name: 'Branch 1',
        children: [{ name: 'Leaf 1' }, { name: 'Leaf 2' }],
      },
      {
        name: 'Branch 2',
        children: [{ name: 'Leaf 3' }],
      },
    ],
  },
});
```

### With Theme

```ts
mindMap.render({
  type: 'mind-map',
  data: {
    name: 'Project Plan',
    children: [
      {
        name: 'Phase 1',
        children: [{ name: 'Task 1.1' }, { name: 'Task 1.2' }],
      },
    ],
  },
  theme: 'academy',
});
```

### With Custom Styles

```ts
mindMap.render({
  type: 'mind-map',
  data: {
    name: 'Root',
    children: [{ name: 'Child' }],
  },
  style: {
    backgroundColor: '#f0f0f0',
  },
});
```

## Methods

- `render(config: MindMapConfig): void` - Render or update the chart
- `destroy(): void` - Destroy the chart instance and clean up resources
