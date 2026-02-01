# Venn

A venn chart component for visualizing set relationships, intersections, and unions, built with G2 5.0.

## Usage

```ts
import { Venn } from '@antv/gpt-vis/ai';

const venn = Venn({
  container: '#container',
  width: 600,
  height: 400,
});

venn.render({
  data: [
    { sets: ['A'], value: 20, label: '集合A' },
    { sets: ['B'], value: 15, label: '集合B' },
    { sets: ['A', 'B'], value: 5, label: '交集AB' },
  ],
});

venn.destroy();
```

## Configuration

### Constructor Options (VennOptions)

| Property  | Type                  | Default | Description                   |
| --------- | --------------------- | ------- | ----------------------------- |
| container | string \| HTMLElement | -       | Container element or selector |
| width     | number                | 640     | Chart width in pixels         |
| height    | number                | 480     | Chart height in pixels        |

### Render Config (VennConfig)

| Property | Type   | Default   | Description                                   |
| -------- | ------ | --------- | --------------------------------------------- |
| data     | Array  | -         | Chart data array                              |
| theme    | string | 'default' | Color theme: 'default' \| 'academy' \| 'dark' |
| title    | string | -         | Chart title                                   |
| style    | object | -         | Chart style configuration                     |

### Data Structure

```ts
type VennDataItem = {
  sets: string[]; // Set identifiers (single set or intersection)
  value: number; // Set or intersection size
  label?: string; // Optional label for the set or intersection
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

### Basic Example (Two Sets)

```ts
venn.render({
  data: [
    { sets: ['A'], value: 20, label: '集合A' },
    { sets: ['B'], value: 15, label: '集合B' },
    { sets: ['A', 'B'], value: 5, label: '交集AB' },
  ],
  title: '集合交集示例',
});
```

### Three Sets with Intersections

```ts
venn.render({
  data: [
    { sets: ['A'], value: 10, label: '集合A' },
    { sets: ['B'], value: 8, label: '集合B' },
    { sets: ['C'], value: 6, label: '集合C' },
    { sets: ['A', 'B'], value: 4 },
    { sets: ['A', 'C'], value: 2 },
    { sets: ['B', 'C'], value: 1 },
    { sets: ['A', 'B', 'C'], value: 1 },
  ],
  title: '三集合关系',
});
```

### With Academy Theme

```ts
venn.render({
  data: [
    { sets: ['A'], value: 10, label: '集合A' },
    { sets: ['B'], value: 8, label: '集合B' },
    { sets: ['C'], value: 6, label: '集合C' },
    { sets: ['A', 'B'], value: 4 },
    { sets: ['A', 'C'], value: 2 },
    { sets: ['B', 'C'], value: 1 },
    { sets: ['A', 'B', 'C'], value: 1 },
  ],
  title: '三集合关系',
  theme: 'academy',
});
```

### With Dark Theme

```ts
venn.render({
  data: [
    { sets: ['A'], value: 10, label: '集合A' },
    { sets: ['B'], value: 8, label: '集合B' },
    { sets: ['C'], value: 6, label: '集合C' },
    { sets: ['A', 'B'], value: 4 },
    { sets: ['A', 'C'], value: 2 },
    { sets: ['B', 'C'], value: 1 },
    { sets: ['A', 'B', 'C'], value: 1 },
  ],
  title: '三集合关系',
  theme: 'dark',
});
```

### With Custom Styles

```ts
venn.render({
  data: [
    { sets: ['A'], value: 30, label: '购买手机' },
    { sets: ['B'], value: 25, label: '购买耳机' },
    { sets: ['A', 'B'], value: 10 },
  ],
  title: '标签交集',
  style: {
    palette: ['#FFB6C1', '#87CEFA'],
    backgroundColor: '#F8F8FF',
  },
});
```

## Methods

- `render(config: VennConfig): void` - Render or update the chart
- `destroy(): void` - Destroy the chart instance and clean up resources
