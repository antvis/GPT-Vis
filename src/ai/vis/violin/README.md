# Violin

A violin plot component for displaying statistical distribution and probability density, built with G2 5.0.

## Usage

```ts
import { Violin } from '@antv/gpt-vis/ai';

const violin = Violin({
  container: '#container',
  width: 600,
  height: 400,
});

violin.render({
  data: [
    { category: '班级A', value: 15 },
    { category: '班级A', value: 18 },
    { category: '班级A', value: 22 },
    { category: '班级A', value: 27 },
    { category: '班级A', value: 35 },
    { category: '班级B', value: 10 },
    { category: '班级B', value: 14 },
    { category: '班级B', value: 19 },
    { category: '班级B', value: 23 },
    { category: '班级B', value: 30 },
  ],
});

violin.destroy();
```

## Configuration

### Constructor Options (ViolinOptions)

| Property  | Type                  | Default | Description                   |
| --------- | --------------------- | ------- | ----------------------------- |
| container | string \| HTMLElement | -       | Container element or selector |
| width     | number                | 640     | Chart width in pixels         |
| height    | number                | 480     | Chart height in pixels        |

### Render Config (ViolinConfig)

| Property    | Type   | Default   | Description                          |
| ----------- | ------ | --------- | ------------------------------------ |
| data        | Array  | -         | Chart data array                     |
| theme       | string | 'default' | Color theme                          |
| title       | string | -         | Chart title                          |
| axisXTitle  | string | -         | X-axis title                         |
| axisYTitle  | string | -         | Y-axis title                         |
| style       | object | -         | Chart style configuration            |

### Data Structure

```ts
type ViolinDataItem = {
  category: string;  // Category name (required)
  value: number;     // Data value (required)
  group?: string;    // Group name for grouped violin plots (optional)
};
```

### Style Options

```ts
style?: {
  backgroundColor?: string;  // Background color
  palette?: string[];        // Color palette
  startAtZero?: boolean;     // Whether Y-axis starts at zero
}
```

## Examples

### Basic Example

```ts
violin.render({
  data: [
    { category: '班级A', value: 15 },
    { category: '班级A', value: 18 },
    { category: '班级A', value: 22 },
    { category: '班级A', value: 27 },
    { category: '班级A', value: 35 },
    { category: '班级B', value: 10 },
    { category: '班级B', value: 14 },
    { category: '班级B', value: 19 },
    { category: '班级B', value: 23 },
    { category: '班级B', value: 30 },
  ],
  title: '成绩分布',
});
```

### With Theme

```ts
violin.render({
  data: [
    { category: '实验组1', value: 12 },
    { category: '实验组1', value: 15 },
    { category: '实验组1', value: 20 },
    { category: '实验组1', value: 25 },
    { category: '实验组1', value: 30 },
  ],
  theme: 'academy',
  title: '实验数据分布',
});
```

### With Custom Styles

```ts
violin.render({
  data: [
    { category: '股票A', value: 50 },
    { category: '股票A', value: 55 },
    { category: '股票A', value: 60 },
    { category: '股票A', value: 65 },
    { category: '股票A', value: 70 },
  ],
  title: '金融数据分布',
  style: {
    palette: ['#FF9800', '#2196F3', '#F5F5F5'],
    backgroundColor: '#333333',
  },
});
```

### Grouped Violin Plot

```ts
violin.render({
  data: [
    { group: 'I. setosa', category: 'PetalWidth', value: 0.2 },
    { group: 'I. setosa', category: 'PetalLength', value: 1.4 },
    { group: 'I. setosa', category: 'SepalWidth', value: 3.5 },
    { group: 'I. setosa', category: 'SepalLength', value: 5.1 },
    { group: 'I. versicolor', category: 'PetalWidth', value: 1.4 },
    { group: 'I. versicolor', category: 'PetalLength', value: 4.7 },
    { group: 'I. versicolor', category: 'SepalWidth', value: 3.2 },
    { group: 'I. versicolor', category: 'SepalLength', value: 7.0 },
  ],
  title: '不同品种的鸢尾花特征分布',
});
```

### Start at Zero

```ts
violin.render({
  data: [
    { category: '班级A', value: 15 },
    { category: '班级A', value: 18 },
    { category: '班级A', value: 22 },
  ],
  style: {
    startAtZero: true,
  },
});
```

## Methods

- `render(config: ViolinConfig): void` - Render or update the chart
- `destroy(): void` - Destroy the chart instance and clean up resources
