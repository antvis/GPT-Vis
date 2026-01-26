# Pie

A pie chart component for displaying categorical data as slices of a circle, built with G2 5.0.

## Usage

```ts
import { Pie } from '@antv/gpt-vis/ai';

const pie = new Pie({
  container: '#container',
  width: 600,
  height: 400,
});

pie.render({
  data: [
    { category: '分类一', value: 27 },
    { category: '分类二', value: 25 },
    { category: '分类三', value: 18 },
    { category: '分类四', value: 15 },
    { category: '分类五', value: 10 },
    { category: '其他', value: 5 },
  ],
});

pie.destroy();
```

## Configuration

### Constructor Options (PieOptions)

| Property  | Type                  | Default | Description                   |
| --------- | --------------------- | ------- | ----------------------------- |
| container | string \| HTMLElement | -       | Container element or selector |
| width     | number                | 640     | Chart width in pixels         |
| height    | number                | 480     | Chart height in pixels        |

### Render Config (PieConfig)

| Property    | Type                             | Default   | Description                        |
| ----------- | -------------------------------- | --------- | ---------------------------------- |
| data        | PieDataItem[]                    | -         | Chart data array                   |
| innerRadius | number                           | 0         | Inner radius for donut chart (0-1) |
| theme       | 'default' \| 'academy' \| 'dark' | 'default' | Color theme                        |
| title       | string                           | -         | Chart title                        |
| style       | object                           | -         | Chart style configuration          |

### PieDataItem

```ts
type PieDataItem = {
  category: string;
  value: number;
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

### Donut Chart

```ts
pie.render({
  data: [...],
  innerRadius: 0.6,
});
```

### With Title

```ts
pie.render({
  data: [...],
  title: '餐饮业营收额占比',
});
```

### Themes

```ts
// Academy theme
pie.render({
  data: [...],
  theme: 'academy',
});

// Dark theme
pie.render({
  data: [...],
  theme: 'dark',
});
```

### Custom Styles

```ts
// Custom colors
pie.render({
  data: [...],
  style: {
    palette: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A'],
  },
});

// Custom background
pie.render({
  data: [...],
  style: {
    backgroundColor: '#f5f5f5',
  },
});
```

## Methods

- `render(config: PieConfig): void` - Render or update the chart
- `destroy(): void` - Destroy the chart instance and clean up resources
