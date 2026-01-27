# Table

A table component for displaying structured data in rows and columns, built with pure JavaScript.

## Usage

```ts
import { Table } from '@antv/gpt-vis/ai';

const table = Table({
  container: '#container',
  width: 600,
  height: 400,
});

table.render({
  type: 'table',
  data: [
    {
      Indicator: '经度(°)',
      Mean: '104.15°',
      Std: '±0.64°',
      Range: '103.19-105.28',
      Q1Q3: '103.62-104.68°',
    },
    {
      Indicator: '纬度(°)',
      Mean: '31.60°',
      Std: '±0.48°',
      Range: '30.89-32.45°',
      Q1Q3: '31.21-32.00°',
    },
    { Indicator: '深度(km)', Mean: '11.82', Std: '±5.67', Range: '3.0-34.8', Q1Q3: '10.0-10.0' },
    { Indicator: '震级(mag)', Mean: '5.29', Std: '±0.49', Range: '5.0-7.9', Q1Q3: '5.0-5.4' },
  ],
  title: '一个文本标题',
});

table.destroy();
```

## Configuration

### Constructor Options (VisualizationOptions)

| Property  | Type                  | Default | Description                   |
| --------- | --------------------- | ------- | ----------------------------- |
| container | string \| HTMLElement | -       | Container element or selector |
| width     | number                | 640     | Chart width in pixels         |
| height    | number                | 480     | Chart height in pixels        |

### Render Config (TableConfig)

| Property | Type                  | Default | Description            |
| -------- | --------------------- | ------- | ---------------------- |
| data     | Record<string, any>[] | -       | Table data array       |
| type     | string                | 'table' | Chart type identifier  |
| title    | string                | -       | Table title (optional) |

### Data Structure

The `data` property should be an array of objects where each object represents a row in the table. The keys of the objects will be used as column headers.

```ts
type TableData = Record<string, any>[];
```

## Features

- **Pure JavaScript**: No React or other framework dependencies
- **Scoped CSS**: Dynamic CSS injection with automatic scoping to avoid style conflicts
- **Responsive**: Automatically adapts to container size
- **Hover Effects**: Interactive row highlighting on hover
- **Clean Styling**: Modern, minimalist design with proper spacing and borders

## Examples

### Basic Table

```ts
table.render({
  data: [
    { 类别: '火锅', '营收额占比(%)': 22 },
    { 类别: '自助餐', '营收额占比(%)': 12 },
    { 类别: '小吃快餐', '营收额占比(%)': 8 },
    { 类别: '西餐', '营收额占比(%)': 6 },
    { 类别: '其它', '营收额占比(%)': 44 },
  ],
});
```

### Table with Title

```ts
table.render({
  data: [
    { 类别: '火锅', '营收额占比(%)': 22 },
    { 类别: '自助餐', '营收额占比(%)': 12 },
    { 类别: '小吃快餐', '营收额占比(%)': 8 },
    { 类别: '西餐', '营收额占比(%)': 6 },
    { 类别: '其它', '营收额占比(%)': 44 },
  ],
  title: '餐饮业营收额数据表',
});
```

### Population Distribution Table

```ts
table.render({
  data: [
    { 人口类型: '城镇人口', '数量(万人)': 63.89 },
    { 人口类型: '乡村人口', '数量(万人)': 36.11 },
  ],
  title: '全国人口居住分布',
});
```

### Industrial Structure Table

```ts
table.render({
  data: [
    { 产业类型: '第一产业', '产值(亿元)': 7200.0 },
    { 产业类型: '第二产业', '产值(亿元)': 36600.0 },
    { 产业类型: '第三产业', '产值(亿元)': 41000.0 },
  ],
});
```

### Seismic Data Table

```ts
table.render({
  data: [
    {
      Indicator: '经度(°)',
      Mean: '104.15°',
      Std: '±0.64°',
      Range: '103.19-105.28',
      Q1Q3: '103.62-104.68°',
    },
    {
      Indicator: '纬度(°)',
      Mean: '31.60°',
      Std: '±0.48°',
      Range: '30.89-32.45°',
      Q1Q3: '31.21-32.00°',
    },
    { Indicator: '深度(km)', Mean: '11.82', Std: '±5.67', Range: '3.0-34.8', Q1Q3: '10.0-10.0' },
    { Indicator: '震级(mag)', Mean: '5.29', Std: '±0.49', Range: '5.0-7.9', Q1Q3: '5.0-5.4' },
  ],
  title: '地震数据统计表',
});
```

## Methods

- `render(config: TableConfig): void` - Render or update the table
- `destroy(): void` - Destroy the table instance and clean up resources (including injected styles)

## Use Cases

- Displaying structured data like reports, lists, and detail tables
- Comparing multiple data items with several attributes
- Presenting statistical data in a clear, organized format
- When data needs to be searchable, sortable, or filterable
- Financial statements, scorecards, product lists, etc.

## When Not to Use

- When data has hierarchical or network relationships (use tree or graph visualizations instead)
- When you need to emphasize data distribution, trends, or proportions (use charts like bar, line, or pie instead)
- When the dataset is extremely large with many fields (consider pagination or grouping)
