# Scatter

A scatter chart component for visualizing the relationship between two numerical variables, built with G2 5.0.

## Usage

```ts
import { Scatter } from '@antv/gpt-vis/ai';

const scatter = Scatter({
  container: '#container',
  width: 600,
  height: 400,
});

scatter.render({
  data: [
    { x: 10, y: 15 },
    { x: 20, y: 25 },
    { x: 30, y: 35 },
    { x: 40, y: 45 },
  ],
});

scatter.destroy();
```

## Configuration

### Constructor Options (ScatterOptions)

| Property  | Type                  | Default | Description                   |
| --------- | --------------------- | ------- | ----------------------------- |
| container | string \| HTMLElement | -       | Container element or selector |
| width     | number                | 640     | Chart width in pixels         |
| height    | number                | 480     | Chart height in pixels        |

### Render Config (ScatterConfig)

| Property | Type   | Default   | Description               |
| -------- | ------ | --------- | ------------------------- |
| type     | string | 'scatter' | Chart type                |
| data     | Array  | -         | Chart data array          |
| theme    | string | 'default' | Color theme               |
| title    | string | -         | Chart title               |
| style    | object | -         | Chart style configuration |

### Data Structure

```ts
type ScatterDataItem = {
  x: number; // X-axis value
  y: number; // Y-axis value
  group?: string; // Optional: group for multiple series
};
```

### Style Options

```ts
style?: {
  backgroundColor?: string; // Background color
  palette?: string[]; // Color palette for groups
}
```

## Examples

### Basic Scatter Chart

```ts
scatter.render({
  data: [
    { x: 10, y: 15 },
    { x: 20, y: 25 },
    { x: 30, y: 35 },
    { x: 40, y: 45 },
  ],
});
```

### With Title

```ts
scatter.render({
  data: [
    { x: 10, y: 15 },
    { x: 20, y: 25 },
    { x: 30, y: 35 },
    { x: 40, y: 45 },
  ],
  title: 'Advertisement vs Sales',
});
```

### With Groups

```ts
scatter.render({
  data: [
    { x: 25, y: 5000, group: 'A' },
    { x: 35, y: 7000, group: 'A' },
    { x: 45, y: 10000, group: 'A' },
    { x: 30, y: 6000, group: 'B' },
    { x: 40, y: 8000, group: 'B' },
    { x: 50, y: 11000, group: 'B' },
  ],
});
```

### With Academy Theme

```ts
scatter.render({
  data: [
    { x: 10, y: 15 },
    { x: 20, y: 25 },
    { x: 30, y: 35 },
    { x: 40, y: 45 },
  ],
  theme: 'academy',
});
```

### With Custom Styles

```ts
scatter.render({
  data: [
    { x: 10, y: 15, group: 'Group A' },
    { x: 20, y: 25, group: 'Group A' },
    { x: 30, y: 35, group: 'Group B' },
    { x: 40, y: 45, group: 'Group B' },
  ],
  style: {
    palette: ['#FF6B6B', '#4ECDC4', '#45B7D1'],
    backgroundColor: '#F8F9FA',
  },
});
```

## Methods

- `render(config: ScatterConfig): void` - Render or update the chart
- `destroy(): void` - Destroy the chart instance and clean up resources
