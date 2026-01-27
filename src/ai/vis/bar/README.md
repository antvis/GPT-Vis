# Bar

A horizontal bar chart component for comparing categorical data, built with G2 5.0.

## Usage

```ts
import { Bar } from '@antv/gpt-vis/ai';

const bar = Bar({
  container: '#container',
  width: 600,
  height: 400,
});

bar.render({
  data: [
    { category: '2015 年', value: 80 },
    { category: '2016 年', value: 140 },
    { category: '2017 年', value: 220 },
  ],
  title: '海底捞公司外卖收入',
  axisXTitle: '年份',
  axisYTitle: '金额 （百万元）',
});

bar.destroy();
```

## Configuration

### Constructor Options (BarOptions)

| Property  | Type                  | Default | Description                   |
| --------- | --------------------- | ------- | ----------------------------- |
| container | string \| HTMLElement | -       | Container element or selector |
| width     | number                | 640     | Chart width in pixels         |
| height    | number                | 480     | Chart height in pixels        |

### Render Config (BarConfig)

| Property   | Type    | Default   | Description                            |
| ---------- | ------- | --------- | -------------------------------------- |
| data       | Array   | -         | Chart data array                       |
| type       | string  | 'bar'     | Chart type identifier                  |
| group      | boolean | false     | Enable grouping (requires group field) |
| stack      | boolean | false     | Enable stacking (requires group field) |
| title      | string  | -         | Chart title                            |
| axisXTitle | string  | -         | X-axis title                           |
| axisYTitle | string  | -         | Y-axis title                           |
| theme      | string  | 'default' | Color theme                            |
| style      | object  | -         | Chart style configuration              |

### Data Structure

```ts
type BarDataItem = {
  category: string; // Category name
  value: number; // Numeric value
  group?: string; // Optional group name for grouped or stacked charts
};
```

### Style Options

```ts
style?: {
  backgroundColor?: string; // Background color
  palette?: string[];       // Color palette
}
```

## Examples

### Basic Bar Chart

```ts
bar.render({
  data: [
    { category: '第一产业', value: 7200.0 },
    { category: '第二产业', value: 36600.0 },
    { category: '第三产业', value: 41000.0 },
  ],
  axisXTitle: 'name',
  axisYTitle: 'industrial',
});
```

### Grouped Bar Chart

```ts
bar.render({
  data: [
    { category: '北京', value: 825.6, group: '油车' },
    { category: '北京', value: 60.2, group: '新能源汽车' },
    { category: '上海', value: 450, group: '油车' },
    { category: '上海', value: 95, group: '新能源汽车' },
    { category: '深圳', value: 506, group: '油车' },
    { category: '深圳', value: 76.7, group: '新能源汽车' },
  ],
  group: true,
  title: '油车与新能源汽车售卖量',
  axisXTitle: '城市',
  axisYTitle: '售卖量 （万辆）',
});
```

### Stacked Bar Chart

```ts
bar.render({
  data: [
    { category: '北京', value: 825.6, group: '油车' },
    { category: '北京', value: 60.2, group: '新能源汽车' },
    { category: '上海', value: 450, group: '油车' },
    { category: '上海', value: 95, group: '新能源汽车' },
    { category: '深圳', value: 506, group: '油车' },
    { category: '深圳', value: 76.7, group: '新能源汽车' },
  ],
  stack: true,
  title: '油车与新能源汽车售卖量',
  axisXTitle: '城市',
  axisYTitle: '售卖量 （万辆）',
});
```

### With Theme

```ts
bar.render({
  data: [
    { category: '2015 年', value: 80 },
    { category: '2016 年', value: 140 },
    { category: '2017 年', value: 220 },
  ],
  theme: 'academy',
  title: '海底捞公司外卖收入',
});
```

### With Custom Styles

```ts
bar.render({
  data: [
    { category: '2015 年', value: 80 },
    { category: '2016 年', value: 140 },
    { category: '2017 年', value: 220 },
  ],
  style: {
    palette: ['#FF6B6B', '#4ECDC4', '#45B7D1'],
    backgroundColor: '#F5F5F5',
  },
});
```

## Methods

- `render(config: BarConfig): void` - Render or update the chart
- `destroy(): void` - Destroy the chart instance and clean up resources
