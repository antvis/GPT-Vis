# Area

An area chart component for visualizing trends and total changes over time, built with G2 5.0.

## Usage

```ts
import { Area } from '@antv/gpt-vis/ai';

const area = Area({
  container: '#container',
  width: 600,
  height: 400,
});

area.render({
  data: [
    { time: '1 月', value: 23.895 },
    { time: '2 月', value: 23.695 },
    { time: '3 月', value: 23.655 },
  ],
  title: '1月到3月股票价格的变化',
  axisXTitle: '月份',
  axisYTitle: '价格',
});

area.destroy();
```

## Configuration

### Constructor Options (AreaOptions)

| Property  | Type                  | Default | Description                   |
| --------- | --------------------- | ------- | ----------------------------- |
| container | string \| HTMLElement | -       | Container element or selector |
| width     | number                | 640     | Chart width in pixels         |
| height    | number                | 480     | Chart height in pixels        |

### Render Config (AreaConfig)

| Property   | Type    | Default   | Description                            |
| ---------- | ------- | --------- | -------------------------------------- |
| data       | Array   | -         | Chart data array                       |
| type       | string  | 'area'    | Chart type identifier                  |
| stack      | boolean | false     | Enable stacking (requires group field) |
| title      | string  | -         | Chart title                            |
| axisXTitle | string  | -         | X-axis title                           |
| axisYTitle | string  | -         | Y-axis title                           |
| theme      | string  | 'default' | Color theme                            |
| style      | object  | -         | Chart style configuration              |

### Data Structure

```ts
type AreaDataItem = {
  time: string | number; // Time or category value
  value: number; // Numeric value
  group?: string; // Optional group name for multi-area or stacked charts
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

### Basic Area Chart

```ts
area.render({
  data: [
    { time: 2015, value: 7200.0 },
    { time: 2016, value: 3660.0 },
    { time: 2017, value: 4100.0 },
  ],
  axisXTitle: 'year',
  axisYTitle: 'value',
});
```

### Stacked Area Chart

```ts
area.render({
  data: [
    { time: '2019年', value: 150, group: '北京' },
    { time: '2020年', value: 160, group: '北京' },
    { time: '2021年', value: 145, group: '北京' },
    { time: '2019年', value: 100, group: '广州' },
    { time: '2020年', value: 110, group: '广州' },
    { time: '2021年', value: 105, group: '广州' },
    { time: '2019年', value: 90, group: '上海' },
    { time: '2020年', value: 85, group: '上海' },
    { time: '2021年', value: 80, group: '上海' },
  ],
  stack: true,
  title: '城市空气污染指数变化',
  axisXTitle: '年份',
  axisYTitle: '空气污染指数',
});
```

### With Theme

```ts
area.render({
  data: [
    { time: '1 月', value: 23.895 },
    { time: '2 月', value: 23.695 },
    { time: '3 月', value: 23.655 },
  ],
  theme: 'dark',
  title: '股票价格变化',
});
```

### With Custom Styles

```ts
area.render({
  data: [
    { time: '1 月', value: 23.895 },
    { time: '2 月', value: 23.695 },
    { time: '3 月', value: 23.655 },
  ],
  style: {
    palette: ['#FF6B6B', '#4ECDC4', '#45B7D1'],
    lineWidth: 3,
    backgroundColor: '#F5F5F5',
  },
});
```

## Methods

- `render(config: AreaConfig): void` - Render or update the chart
- `destroy(): void` - Destroy the chart instance and clean up resources
