# Column

A vertical column chart component for comparing categorical data, built with G2 5.0.

## Usage

```ts
import { Column } from '@antv/gpt-vis/ai';

const column = Column({
  container: '#container',
  width: 600,
  height: 400,
});

column.render({
  data: [
    { category: '2015 年', value: 80 },
    { category: '2016 年', value: 140 },
    { category: '2017 年', value: 220 },
  ],
  title: '海底捞公司外卖收入',
  axisXTitle: '年份',
  axisYTitle: '金额 （百万元）',
});

column.destroy();
```

## Configuration

### Constructor Options (ColumnOptions)

| Property  | Type                  | Default | Description                   |
| --------- | --------------------- | ------- | ----------------------------- |
| container | string \| HTMLElement | -       | Container element or selector |
| width     | number                | 640     | Chart width in pixels         |
| height    | number                | 480     | Chart height in pixels        |

### Render Config (ColumnConfig)

| Property   | Type    | Default   | Description                            |
| ---------- | ------- | --------- | -------------------------------------- |
| data       | Array   | -         | Chart data array                       |
| type       | string  | 'column'  | Chart type identifier                  |
| group      | boolean | false     | Enable grouping (requires group field) |
| stack      | boolean | false     | Enable stacking (requires group field) |
| title      | string  | -         | Chart title                            |
| axisXTitle | string  | -         | X-axis title                           |
| axisYTitle | string  | -         | Y-axis title                           |
| theme      | string  | 'default' | Color theme                            |
| style      | object  | -         | Chart style configuration              |

### Data Structure

```ts
type ColumnDataItem = {
  category: string; // Category name
  value: number; // Numeric value
  group?: string; // Optional group name for grouped or stacked charts
};
```

### Style Options

| Property        | Type     | Default | Description                                 |
| --------------- | -------- | ------- | ------------------------------------------- |
| backgroundColor | string   | -       | Background color of the chart               |
| palette         | string[] | -       | Array of colors for the chart color palette |

## Examples

### Basic Column Chart

```ts
column.render({
  data: [
    { category: '第一产业', value: 7200.0 },
    { category: '第二产业', value: 36600.0 },
    { category: '第三产业', value: 41000.0 },
  ],
  axisXTitle: 'title',
  axisYTitle: 'industrial',
});
```

### Grouped Column Chart

```ts
column.render({
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

### Stacked Column Chart

```ts
column.render({
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
column.render({
  data: [
    { category: '2015 年', value: 80 },
    { category: '2016 年', value: 140 },
    { category: '2017 年', value: 220 },
  ],
  theme: 'dark',
  title: '海底捞公司外卖收入',
});
```

### With Custom Styles

```ts
column.render({
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

- `render(config: ColumnConfig): void` - Render or update the chart
- `destroy(): void` - Destroy the chart instance and clean up resources
