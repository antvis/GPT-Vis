# WordCloud

A word cloud chart component for visualizing word frequency or importance, built with G2 5.0.

## Usage

```ts
import { WordCloud } from '@antv/gpt-vis/ai';

const wordCloud = WordCloud({
  container: '#container',
  width: 600,
  height: 400,
});

wordCloud.render({
  data: [
    { text: '环境', value: 20 },
    { text: '保护', value: 15 },
    { text: '可持续发展', value: 10 },
  ],
});

wordCloud.destroy();
```

## Configuration

### Constructor Options (WordCloudOptions)

| Property  | Type                  | Default | Description                   |
| --------- | --------------------- | ------- | ----------------------------- |
| container | string \| HTMLElement | -       | Container element or selector |
| width     | number                | 640     | Chart width in pixels         |
| height    | number                | 480     | Chart height in pixels        |

### Render Config (WordCloudConfig)

| Property | Type   | Default   | Description               |
| -------- | ------ | --------- | ------------------------- |
| data     | Array  | -         | Chart data array          |
| theme    | string | 'default' | Color theme               |
| title    | string | -         | Chart title               |
| style    | object | -         | Chart style configuration |

### Data Structure

```ts
type WordCloudDataItem = {
  text: string; // The word to display
  value: number; // The importance/frequency score
};
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
wordCloud.render({
  data: [
    { text: '数据', value: 50 },
    { text: '分析', value: 40 },
    { text: '结果', value: 30 },
  ],
});
```

### With Theme

```ts
wordCloud.render({
  data: [
    { text: '环境', value: 20 },
    { text: '保护', value: 15 },
    { text: '可持续发展', value: 10 },
  ],
  theme: 'academy',
});
```

### With Custom Styles

```ts
wordCloud.render({
  data: [
    { text: '质量好', value: 30 },
    { text: '价格合理', value: 20 },
    { text: '服务差', value: 5 },
  ],
  style: {
    palette: ['#FF6B6B', '#4ECDC4', '#45B7D1'],
  },
});
```

### With Title

```ts
wordCloud.render({
  data: [
    { text: '环保', value: 10 },
    { text: '气候变化', value: 8 },
    { text: '可再生能源', value: 6 },
    { text: '碳排放', value: 5 },
    { text: '绿色生活', value: 4 },
  ],
  title: '环保关键词',
});
```

### Dark Theme

```ts
wordCloud.render({
  data: [
    { text: '环境', value: 20 },
    { text: '保护', value: 15 },
    { text: '可持续发展', value: 10 },
  ],
  theme: 'dark',
});
```

## Methods

- `render(config: WordCloudConfig): void` - Render or update the chart
- `destroy(): void` - Destroy the chart instance and clean up resources
