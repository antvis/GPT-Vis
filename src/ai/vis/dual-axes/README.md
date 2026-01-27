# DualAxes

A dual-axes chart component that combines column and line charts for visualizing two different data series with different scales, built with G2 5.0.

## Usage

```ts
import { DualAxes } from '@antv/gpt-vis/ai';

const dualAxes = DualAxes({
  container: '#container',
  width: 600,
  height: 400,
});

dualAxes.render({
  categories: ['2018', '2019', '2020', '2021', '2022'],
  series: [
    {
      type: 'column',
      data: [91.9, 99.1, 101.6, 114.4, 121],
      axisYTitle: 'Sales',
    },
    {
      type: 'line',
      data: [0.055, 0.06, 0.062, 0.07, 0.075],
      axisYTitle: 'Profit Rate',
    },
  ],
});

dualAxes.destroy();
```

## Configuration

### Constructor Options (DualAxesOptions)

| Property  | Type                  | Default | Description                   |
| --------- | --------------------- | ------- | ----------------------------- |
| container | string \| HTMLElement | -       | Container element or selector |
| width     | number                | 640     | Chart width in pixels         |
| height    | number                | 480     | Chart height in pixels        |

### Render Config (DualAxesConfig)

| Property   | Type   | Default      | Description                      |
| ---------- | ------ | ------------ | -------------------------------- |
| type       | string | 'dual-axes'  | Chart type                       |
| categories | Array  | -            | X-axis categories (required)     |
| series     | Array  | -            | Series data array (required)     |
| title      | string | -            | Chart title                      |
| axisXTitle | string | -            | X-axis title                     |
| theme      | string | 'default'    | Color theme                      |
| style      | object | -            | Chart style configuration        |

### Series Data Structure

```ts
type DualAxesSeriesItem = {
  type: 'line' | 'column'; // Series type
  data: number[]; // Data values
  axisYTitle?: string; // Y-axis title for this series
};
```

### Style Options

```ts
style?: {
  backgroundColor?: string; // Background color
  palette?: string[]; // Color palette
  startAtZero?: boolean; // Whether Y-axis starts at zero
}
```

## Examples

### Basic Dual-Axes Chart

```ts
dualAxes.render({
  categories: ['2018', '2019', '2020', '2021', '2022'],
  series: [
    {
      type: 'column',
      data: [91.9, 99.1, 101.6, 114.4, 121],
      axisYTitle: 'Sales',
    },
    {
      type: 'line',
      data: [0.055, 0.06, 0.062, 0.07, 0.075],
      axisYTitle: 'Profit Rate',
    },
  ],
});
```

### With Title and X-Axis Label

```ts
dualAxes.render({
  categories: ['2018', '2019', '2020', '2021', '2022'],
  title: '2018-2022 Sales and Profit Rate',
  axisXTitle: 'Year',
  series: [
    {
      type: 'column',
      data: [91.9, 99.1, 101.6, 114.4, 121],
      axisYTitle: 'Sales',
    },
    {
      type: 'line',
      data: [0.055, 0.06, 0.062, 0.07, 0.075],
      axisYTitle: 'Profit Rate',
    },
  ],
});
```

### With Academy Theme

```ts
dualAxes.render({
  categories: ['2020', '2021', '2022'],
  series: [
    {
      type: 'column',
      data: [500, 600, 700],
      axisYTitle: 'Revenue',
    },
    {
      type: 'line',
      data: [10, 12, 15],
      axisYTitle: 'Growth Rate',
    },
  ],
  theme: 'academy',
});
```

### With Custom Styles

```ts
dualAxes.render({
  categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
  series: [
    {
      type: 'column',
      data: [120, 150, 180, 210, 240],
      axisYTitle: 'Sales',
    },
    {
      type: 'line',
      data: [8, 10, 12, 15, 18],
      axisYTitle: 'Growth',
    },
  ],
  style: {
    palette: ['#5B8FF9', '#61DDAA'],
    backgroundColor: '#F8F9FA',
    startAtZero: true,
  },
});
```

### Dark Theme

```ts
dualAxes.render({
  categories: ['Q1', 'Q2', 'Q3', 'Q4'],
  series: [
    {
      type: 'column',
      data: [100, 120, 140, 160],
      axisYTitle: 'Revenue',
    },
    {
      type: 'line',
      data: [5, 6, 7, 8],
      axisYTitle: 'Profit',
    },
  ],
  theme: 'dark',
});
```

## Methods

- `render(config: DualAxesConfig): void` - Render or update the chart
- `destroy(): void` - Destroy the chart instance and clean up resources
