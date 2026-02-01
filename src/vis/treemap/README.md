# Treemap

A treemap chart component for visualizing hierarchical data structures, built with G2 5.0.

## Usage

```ts
import { Treemap } from '@antv/gpt-vis/ai';

const treemap = Treemap({
  container: '#container',
  width: 600,
  height: 400,
});

treemap.render({
  data: [
    {
      name: 'A',
      value: 100,
      children: [
        { name: 'A1', value: 40 },
        { name: 'A2', value: 30 },
        { name: 'A3', value: 30 },
      ],
    },
    {
      name: 'B',
      value: 80,
      children: [
        { name: 'B1', value: 50 },
        { name: 'B2', value: 30 },
      ],
    },
  ],
});

treemap.destroy();
```

## Configuration

### Constructor Options (TreemapOptions)

| Property  | Type                  | Default | Description                   |
| --------- | --------------------- | ------- | ----------------------------- |
| container | string \| HTMLElement | -       | Container element or selector |
| width     | number                | 640     | Chart width in pixels         |
| height    | number                | 480     | Chart height in pixels        |

### Render Config (TreemapConfig)

| Property | Type   | Default   | Description               |
| -------- | ------ | --------- | ------------------------- |
| data     | Array  | -         | Hierarchical data array   |
| theme    | string | 'default' | Color theme               |
| title    | string | -         | Chart title               |
| style    | object | -         | Chart style configuration |

### Data Structure

```ts
type TreemapDataItem = {
  name: string; // Category name
  value: number; // Numeric value
  children?: TreemapDataItem[]; // Optional nested children
};
```

### Style Options

```ts
style?: {
  backgroundColor?: string;  // Background color
  palette?: string[];        // Color palette
}
```

## Examples

### Basic Example

```ts
treemap.render({
  data: [
    {
      name: '产品A',
      value: 500,
      children: [
        { name: '子产品A1', value: 200 },
        { name: '子产品A2', value: 300 },
      ],
    },
    { name: '产品B', value: 400 },
  ],
});
```

### With Theme

```ts
treemap.render({
  data: [
    {
      name: 'A',
      value: 100,
      children: [
        { name: 'A1', value: 40 },
        { name: 'A2', value: 30 },
        { name: 'A3', value: 30 },
      ],
    },
  ],
  theme: 'academy',
});
```

### With Title

```ts
treemap.render({
  data: [
    {
      name: '苹果',
      value: 800,
      children: [
        { name: '红富士', value: 400 },
        { name: '黄元帅', value: 400 },
      ],
    },
    { name: '橙子', value: 600 },
    { name: '香蕉', value: 500 },
  ],
  title: '水果销售量',
});
```

### With Custom Styles

```ts
treemap.render({
  data: [
    { name: 'A', value: 100 },
    { name: 'B', value: 80 },
    { name: 'C', value: 60 },
  ],
  style: {
    palette: ['#FF6B6B', '#4ECDC4', '#45B7D1'],
  },
});
```

### Dark Theme

```ts
treemap.render({
  data: [
    {
      name: 'A',
      value: 100,
      children: [
        { name: 'A1', value: 40 },
        { name: 'A2', value: 30 },
        { name: 'A3', value: 30 },
      ],
    },
  ],
  theme: 'dark',
});
```

### Multiple Levels

```ts
treemap.render({
  data: [
    {
      name: '部门A',
      value: 200,
      children: [
        {
          name: '组A1',
          value: 100,
          children: [
            { name: '成员1', value: 50 },
            { name: '成员2', value: 50 },
          ],
        },
        { name: '组A2', value: 100 },
      ],
    },
  ],
});
```

## Methods

- `render(config: TreemapConfig): void` - Render or update the chart
- `destroy(): void` - Destroy the chart instance and clean up resources
