# Line

A line chart component for visualizing trends over time or ordered categories, built with G2 5.0.

## Usage

```ts
import { Line } from '@antv/gpt-vis/ai';

const line = Line({
  container: '#container',
  width: 600,
  height: 400,
});

line.render({
  data: [
    { time: '2015 年', value: 1700 },
    { time: '2016 年', value: 1500 },
    { time: '2017 年', value: 1200 },
  ],
  title: '出生人口变化',
  axisXTitle: '年份',
  axisYTitle: '出生人口（万人）',
});

line.destroy();
```

## Configuration

### Constructor Options (LineOptions)

| Property  | Type                  | Default | Description                   |
| --------- | --------------------- | ------- | ----------------------------- |
| container | string \| HTMLElement | -       | Container element or selector |
| width     | number                | 640     | Chart width in pixels         |
| height    | number                | 480     | Chart height in pixels        |

### Render Config (LineConfig)

| Property   | Type   | Default   | Description               |
| ---------- | ------ | --------- | ------------------------- |
| data       | Array  | -         | Chart data array          |
| type       | string | 'line'    | Chart type identifier     |
| title      | string | -         | Chart title               |
| axisXTitle | string | -         | X-axis title              |
| axisYTitle | string | -         | Y-axis title              |
| theme      | string | 'default' | Color theme               |
| style      | object | -         | Chart style configuration |

### Data Structure

```ts
type LineDataItem = {
  time: string | number; // Time or category value
  value: number; // Numeric value
  group?: string; // Optional group name for multi-line charts
};
```

### Style Options

```ts
style?: {
  backgroundColor?: string; // Background color
  palette?: string[];       // Color palette
  lineWidth?: number;       // Line width (default: 2)
}
```

## Examples

### Basic Line Chart

```ts
line.render({
  data: [
    { time: 2015, value: 7200.0 },
    { time: 2016, value: 3660.0 },
    { time: 2017, value: 4100.0 },
  ],
  axisXTitle: 'year',
  axisYTitle: 'industrial',
});
```

### Multi-Line Chart with Groups

```ts
line.render({
  data: [
    { time: '2015 年', value: 1700, group: '出生人口' },
    { time: '2015 年', value: 965, group: '死亡人口' },
    { time: '2016 年', value: 1500, group: '出生人口' },
    { time: '2016 年', value: 846, group: '死亡人口' },
    { time: '2017 年', value: 1200, group: '出生人口' },
    { time: '2017 年', value: 782, group: '死亡人口' },
  ],
  title: '出生人口与死亡人口变化',
  axisXTitle: '年份',
  axisYTitle: '人口（万人）',
});
```

### With Theme

```ts
line.render({
  data: [
    { time: '2015 年', value: 1700 },
    { time: '2016 年', value: 1500 },
    { time: '2017 年', value: 1200 },
  ],
  theme: 'academy',
  title: '出生人口变化',
});
```

### With Custom Styles

```ts
line.render({
  data: [
    { time: '2015 年', value: 1700 },
    { time: '2016 年', value: 1500 },
    { time: '2017 年', value: 1200 },
  ],
  style: {
    palette: ['#FF6B6B', '#4ECDC4', '#45B7D1'],
    lineWidth: 3,
    backgroundColor: '#F5F5F5',
  },
});
```

## Methods

- `render(config: LineConfig): void` - Render or update the chart
- `destroy(): void` - Destroy the chart instance and clean up resources
