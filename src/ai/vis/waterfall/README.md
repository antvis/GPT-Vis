# Waterfall

A waterfall chart component for displaying cumulative effects of sequential values, built with G2 5.0.

## Usage

```ts
import { Waterfall } from '@antv/gpt-vis/ai';

const waterfall = Waterfall({
  container: '#container',
  width: 600,
  height: 400,
});

waterfall.render({
  data: [
    { category: '期初利润', value: 100 },
    { category: '销售收入', value: 80 },
    { category: '运营成本', value: -50 },
    { category: '税费', value: -20 },
    { category: '总计', isTotal: true },
  ],
});

waterfall.destroy();
```

## Configuration

### Constructor Options (WaterfallOptions)

| Property  | Type                  | Default | Description                   |
| --------- | --------------------- | ------- | ----------------------------- |
| container | string \| HTMLElement | -       | Container element or selector |
| width     | number                | 640     | Chart width in pixels         |
| height    | number                | 480     | Chart height in pixels        |

### Render Config (WaterfallConfig)

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
type WaterfallDataItem = {
  category: string; // Step or category name (required)
  value?: number; // Increment or decrement value (optional)
  isIntermediateTotal?: boolean; // Whether it's an intermediate total (optional)
  isTotal?: boolean; // Whether it's the final total (optional)
};
```

### Style Options

```ts
style?: {
  backgroundColor?: string;  // Background color
  palette?: {
    positiveColor?: string;  // Color for positive values (default: '#FF4D4F')
    negativeColor?: string;  // Color for negative values (default: '#2EBB59')
    totalColor?: string;     // Color for total bars (default: '#1783FF')
  };
}
```

## Examples

### Basic Example

```ts
waterfall.render({
  data: [
    { category: '期初利润', value: 100 },
    { category: '销售收入', value: 80 },
    { category: '运营成本', value: -50 },
    { category: '税费', value: -20 },
    { category: '总计', isTotal: true },
  ],
});
```

### With Theme

```ts
waterfall.render({
  data: [
    { category: '基础预算', value: 500 },
    { category: '市场投入', value: 120 },
    { category: '采购优化', value: -60 },
    { category: '运营效率', value: -30 },
    { category: '总利润', isTotal: true },
  ],
  theme: 'dark',
  title: '预算执行情况',
});
```

### With Custom Colors

```ts
waterfall.render({
  data: [
    { category: 'Q1 收入', value: 1000 },
    { category: 'Q2 收入', value: 1200 },
    { category: '成本', value: -800 },
    { category: '净利润', isTotal: true },
  ],
  title: '季度财务报告',
  style: {
    palette: {
      positiveColor: '#52c41a',
      negativeColor: '#f5222d',
      totalColor: '#1890ff',
    },
  },
});
```

### With Intermediate Total

```ts
waterfall.render({
  data: [
    { category: '基础预算', value: 500 },
    { category: '市场投入', value: 120 },
    { category: '总投入', isIntermediateTotal: true },
    { category: '采购优化', value: -60 },
    { category: '运营效率', value: -30 },
    { category: '总利润', isTotal: true },
  ],
  title: '预算分析',
});
```

### With Axis Titles

```ts
waterfall.render({
  data: [
    { category: '期初', value: 100 },
    { category: '收入', value: 80 },
    { category: '支出', value: -50 },
    { category: '期末', isTotal: true },
  ],
  axisXTitle: '项目',
  axisYTitle: '金额（万元）',
  title: '财务流水',
});
```

### With Background Color

```ts
waterfall.render({
  data: [
    { category: '初始', value: 50 },
    { category: '增长', value: 30 },
    { category: '减少', value: -10 },
    { category: '最终', isTotal: true },
  ],
  style: {
    backgroundColor: '#f0f2f5',
  },
});
```

## Methods

- `render(config: WaterfallConfig): void` - Render or update the chart
- `destroy(): void` - Destroy the chart instance and clean up resources
