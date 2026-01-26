# GPT-Vis AI Components (G2 5.0 / G6 5.0)

This directory contains the refactored visualization components using G2 5.0 and G6 5.0 directly, instead of Ant Design Charts.

## Architecture

The components follow a class-based API design pattern:

```ts
const chart = new ChartClass({
  container: '#container',
  width: 600,
  height: 400,
});

chart.render({
  type: 'chartType',
  data: [...],
  // ... other options
});

chart.destroy();
```

## Available Components

### Pie

A pie chart component for displaying categorical data as slices of a circle.

#### Basic Usage

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

// Clean up when done
pie.destroy();
```

#### Donut Chart

```ts
pie.render({
  data: [...],
  innerRadius: 0.6,
});
```

#### Themes

Supported themes: `default`, `academy`, `dark`

```ts
pie.render({
  data: [...],
  theme: 'academy',
});
```

#### API

**Constructor Options (PieOptions)**

| Property  | Type                  | Default | Description                   |
| --------- | --------------------- | ------- | ----------------------------- |
| container | string \| HTMLElement | -       | Container element or selector |
| width     | number                | 640     | Chart width in pixels         |
| height    | number                | 480     | Chart height in pixels        |

**Render Configuration (PieConfig)**

| Property    | Type                             | Default    | Description                        |
| ----------- | -------------------------------- | ---------- | ---------------------------------- |
| data        | PieDataItem[]                    | -          | Chart data array                   |
| innerRadius | number                           | 0          | Inner radius for donut chart (0-1) |
| theme       | 'default' \| 'academy' \| 'dark' | 'default'  | Color theme                        |
| angleField  | string                           | 'value'    | Field name for angle values        |
| colorField  | string                           | 'category' | Field name for color categories    |

**PieDataItem Type**

```ts
type PieDataItem = {
  category: string;
  value: number;
  [key: string]: string | number;
};
```

**Methods**

- `render(config: PieConfig): void` - Render or update the chart
- `destroy(): void` - Destroy the chart instance and clean up resources

## Implementation Notes

- Uses G2 5.0 Chart API with `.options()` method
- Supports percentage labels calculated automatically
- Includes overlap hiding for labels
- Interactive with element selection support
- Properly handles cleanup to prevent memory leaks

## Development

The components are built with TypeScript and follow the existing code style of the project.

### Type Checking

```bash
npx tsc --noEmit --skipLibCheck src/ai/vis/pie.ts
```

### Linting

```bash
npx eslint src/ai/**/*.ts
```
