# Histogram

A histogram chart component for visualizing data distribution, built with G2 5.0.

## Usage

```ts
import { Histogram } from '@antv/gpt-vis/ai';

const histogram = Histogram({
  container: '#container',
  width: 600,
  height: 400,
});

histogram.render({
  data: [78, 88, 60, 100, 95],
  binNumber: 5,
  title: '成绩分布',
});

histogram.destroy();
```

## Configuration

### Constructor Options (HistogramOptions)

| Property  | Type                  | Default | Description                   |
| --------- | --------------------- | ------- | ----------------------------- |
| container | string \| HTMLElement | -       | Container element or selector |
| width     | number                | 640     | Chart width in pixels         |
| height    | number                | 480     | Chart height in pixels        |

### Render Config (HistogramConfig)

| Property   | Type   | Default   | Description                     |
| ---------- | ------ | --------- | ------------------------------- |
| data       | Array  | -         | Numeric data array              |
| binNumber  | number | -         | Number of bins for distribution |
| title      | string | -         | Chart title                     |
| axisXTitle | string | -         | X-axis title                    |
| axisYTitle | string | -         | Y-axis title                    |
| theme      | string | 'default' | Color theme                     |
| style      | object | -         | Chart style configuration       |

### Data Structure

```ts
type HistogramData = number[]; // Array of numeric values
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
histogram.render({
  data: [20, 25, 30, 35],
});
```

### With Bin Number

```ts
histogram.render({
  data: [78, 88, 60, 100, 95],
  binNumber: 5,
  title: '成绩分布',
});
```

### With Axis Titles

```ts
histogram.render({
  data: [
    1.2, 3.4, 3.7, 4.3, 5.2, 5.8, 6.1, 6.5, 6.8, 7.1, 7.3, 7.7, 8.3, 8.6, 8.8, 9.1, 9.2, 9.4, 9.5,
    9.7, 10.5, 10.7, 10.8, 11, 11, 11.1, 11.2, 11.3, 11.4, 11.4, 11.7, 12, 12.9, 12.9, 13.3, 13.7,
    13.8, 13.9, 14, 14.2, 14.5, 15, 15.2, 15.6, 16, 16.3, 17.3, 17.5, 17.9, 18, 18, 20.6, 21, 23.4,
  ],
  axisXTitle: '花瓣大小分布',
  axisYTitle: '花瓣分布数量',
});
```

### With Theme

```ts
histogram.render({
  data: [78, 88, 60, 100, 95],
  binNumber: 5,
  theme: 'academy',
});
```

### With Custom Styles

```ts
histogram.render({
  data: [20, 25, 30, 35, 40, 45, 50],
  style: {
    palette: ['#FF6B6B'],
  },
});
```

### Dark Theme

```ts
histogram.render({
  data: [78, 88, 60, 100, 95],
  binNumber: 5,
  theme: 'dark',
});
```

## Methods

- `render(config: HistogramConfig): void` - Render or update the chart
- `destroy(): void` - Destroy the chart instance and clean up resources
