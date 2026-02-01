# Radar

A radar chart component for visualizing multi-dimensional data, built with G2 5.0.

## Usage

```ts
import { Radar } from '@antv/gpt-vis/ai';

const radar = Radar({
  container: '#container',
  width: 600,
  height: 400,
});

radar.render({
  data: [
    { name: '沟通能力', value: 2 },
    { name: '协作能力', value: 3 },
    { name: '领导能力', value: 2 },
    { name: '学习能力', value: 5 },
    { name: '创新能力', value: 6 },
    { name: '技术能力', value: 9 },
  ],
});

radar.destroy();
```

## Configuration

### Constructor Options (RadarOptions)

| Property  | Type                  | Default | Description                   |
| --------- | --------------------- | ------- | ----------------------------- |
| container | string \| HTMLElement | -       | Container element or selector |
| width     | number                | 640     | Chart width in pixels         |
| height    | number                | 480     | Chart height in pixels        |

### Render Config (RadarConfig)

| Property | Type   | Default   | Description               |
| -------- | ------ | --------- | ------------------------- |
| type     | string | 'radar'   | Chart type                |
| data     | Array  | -         | Chart data array          |
| title    | string | -         | Chart title               |
| theme    | string | 'default' | Color theme               |
| style    | object | -         | Chart style configuration |

### Data Structure

```ts
type RadarDataItem = {
  name: string; // Category name (axis label)
  value: number; // Value for this category
  group?: string; // Optional: group for multiple series
};
```

### Style Options

```ts
style?: {
  backgroundColor?: string; // Background color
  palette?: string[]; // Color palette for groups
  lineWidth?: number; // Line width (default: 2)
}
```

## Examples

### Basic Radar Chart

```ts
radar.render({
  data: [
    { name: '沟通能力', value: 2 },
    { name: '协作能力', value: 3 },
    { name: '领导能力', value: 2 },
    { name: '学习能力', value: 5 },
    { name: '创新能力', value: 6 },
    { name: '技术能力', value: 9 },
  ],
});
```

### With Title

```ts
radar.render({
  data: [
    { name: 'Vitamin C', value: 7 },
    { name: 'Fiber', value: 6 },
    { name: 'Sugar', value: 5 },
    { name: 'Protein', value: 4 },
    { name: 'Iron', value: 3 },
    { name: 'Calcium', value: 2 },
  ],
  title: 'Nutrition Analysis',
});
```

### With Multiple Groups

```ts
radar.render({
  data: [
    { name: '语文', value: 95, group: '一班' },
    { name: '数学', value: 96, group: '一班' },
    { name: '外语', value: 85, group: '一班' },
    { name: '物理', value: 63, group: '一班' },
    { name: '化学', value: 91, group: '一班' },
    { name: '语文', value: 75, group: '二班' },
    { name: '数学', value: 93, group: '二班' },
    { name: '外语', value: 66, group: '二班' },
    { name: '物理', value: 85, group: '二班' },
    { name: '化学', value: 88, group: '二班' },
  ],
});
```

### With Academy Theme

```ts
radar.render({
  data: [
    { name: 'Attack', value: 85, group: 'Hero A' },
    { name: 'Defense', value: 70, group: 'Hero A' },
    { name: 'Speed', value: 90, group: 'Hero A' },
    { name: 'HP', value: 75, group: 'Hero A' },
    { name: 'MP', value: 60, group: 'Hero A' },
    { name: 'Attack', value: 65, group: 'Hero B' },
    { name: 'Defense', value: 90, group: 'Hero B' },
    { name: 'Speed', value: 70, group: 'Hero B' },
    { name: 'HP', value: 85, group: 'Hero B' },
    { name: 'MP', value: 80, group: 'Hero B' },
  ],
  theme: 'academy',
});
```

### With Custom Styles

```ts
radar.render({
  data: [
    { name: 'Category A', value: 8, group: 'Product X' },
    { name: 'Category B', value: 7, group: 'Product X' },
    { name: 'Category C', value: 6, group: 'Product X' },
    { name: 'Category D', value: 5, group: 'Product X' },
    { name: 'Category E', value: 9, group: 'Product X' },
    { name: 'Category A', value: 6, group: 'Product Y' },
    { name: 'Category B', value: 9, group: 'Product Y' },
    { name: 'Category C', value: 8, group: 'Product Y' },
    { name: 'Category D', value: 7, group: 'Product Y' },
    { name: 'Category E', value: 5, group: 'Product Y' },
  ],
  style: {
    palette: ['#FF6B6B', '#4ECDC4'],
    backgroundColor: '#F8F9FA',
    lineWidth: 3,
  },
});
```

### Dark Theme

```ts
radar.render({
  data: [
    { name: 'Skill 1', value: 90 },
    { name: 'Skill 2', value: 75 },
    { name: 'Skill 3', value: 85 },
    { name: 'Skill 4', value: 70 },
    { name: 'Skill 5', value: 95 },
  ],
  theme: 'dark',
});
```

## Methods

- `render(config: RadarConfig): void` - Render or update the chart
- `destroy(): void` - Destroy the chart instance and clean up resources
