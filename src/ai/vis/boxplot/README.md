# Boxplot

A boxplot (box-and-whisker plot) component for displaying statistical distribution data, built with G2 5.0.

## Usage

```ts
import { Boxplot } from '@antv/gpt-vis/ai';

const boxplot = Boxplot({
  container: '#container',
  width: 600,
  height: 400,
});

boxplot.render({
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

boxplot.destroy();
```

## Configuration

### Constructor Options (BoxplotOptions)

| Property  | Type                  | Default | Description                   |
| --------- | --------------------- | ------- | ----------------------------- |
| container | string \| HTMLElement | -       | Container element or selector |
| width     | number                | 640     | Chart width in pixels         |
| height    | number                | 480     | Chart height in pixels        |

### Render Config (BoxplotConfig)

| Property   | Type   | Default   | Description               |
| ---------- | ------ | --------- | ------------------------- |
| data       | Array  | -         | Chart data array          |
| theme      | string | 'default' | Color theme               |
| title      | string | -         | Chart title               |
| axisXTitle | string | -         | X-axis title              |
| axisYTitle | string | -         | Y-axis title              |
| style      | object | -         | Chart style configuration |

### Data Structure

```ts
type BoxplotDataItem = {
  category: string; // Category name (required)
  value: number; // Data value (required)
  group?: string; // Group name for grouped boxplots (optional)
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
boxplot.render({
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
boxplot.render({
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
boxplot.render({
  data: [
    { category: '股票A', value: 50 },
    { category: '股票A', value: 55 },
    { category: '股票A', value: 60 },
    { category: '股票A', value: 65 },
    { category: '股票A', value: 70 },
  ],
  title: '金融数据分布',
  style: {
    palette: ['#FF9800', '#2196F3'],
    backgroundColor: '#F5F5F5',
  },
});
```

### Grouped Boxplot

```ts
boxplot.render({
  data: [
    { category: 'Adelie', group: 'MALE', value: 181 },
    { category: 'Adelie', group: 'FEMALE', value: 186 },
    { category: 'Adelie', group: 'MALE', value: 190 },
    { category: 'Adelie', group: 'FEMALE', value: 181 },
    { category: 'Adelie', group: 'MALE', value: 191 },
    { category: 'Chinstrap', group: 'MALE', value: 195 },
    { category: 'Chinstrap', group: 'FEMALE', value: 191 },
    { category: 'Chinstrap', group: 'MALE', value: 198 },
  ],
  title: '帕尔默企鹅身高性别差异',
});
```

### Start at Zero

```ts
boxplot.render({
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

- `render(config: BoxplotConfig): void` - Render or update the chart
- `destroy(): void` - Destroy the chart instance and clean up resources
