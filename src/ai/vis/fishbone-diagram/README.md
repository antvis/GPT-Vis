# FishboneDiagram

A fishbone diagram (Ishikawa diagram) visualization component for cause-and-effect analysis, built with G6 5.0.

## Usage

```ts
import { FishboneDiagram } from '@antv/gpt-vis/ai';

const fishbone = FishboneDiagram({
  container: '#container',
  width: 600,
  height: 400,
});

fishbone.render({
  type: 'fishbone-diagram',
  data: {
    name: '问题',
    children: [
      {
        name: '原因1',
        children: [{ name: '子原因1-1' }, { name: '子原因1-2' }],
      },
      {
        name: '原因2',
        children: [{ name: '子原因2-1' }],
      },
    ],
  },
});

fishbone.destroy();
```

## Configuration

### Constructor Options (FishboneDiagramOptions)

| Property  | Type                  | Default | Description                   |
| --------- | --------------------- | ------- | ----------------------------- |
| container | string \| HTMLElement | -       | Container element or selector |
| width     | number                | 640     | Chart width in pixels         |
| height    | number                | 480     | Chart height in pixels        |

### Render Config (FishboneDiagramConfig)

| Property | Type   | Default   | Description               |
| -------- | ------ | --------- | ------------------------- |
| data     | object | -         | Tree data structure       |
| theme    | string | 'default' | Color theme               |
| style    | object | -         | Chart style configuration |

### Data Structure

```ts
type FishboneDiagramDataItem = {
  name: string;
  description?: string;
  children?: FishboneDiagramDataItem[];
  [key: string]: any;
};
```

### Style Options

```ts
style?: {
  backgroundColor?: string; // Background color
}
```

## Examples

### Basic Example

```ts
fishbone.render({
  type: 'fishbone-diagram',
  data: {
    name: 'Effect/Problem',
    children: [
      {
        name: 'Cause Category 1',
        children: [{ name: 'Sub-cause 1.1' }, { name: 'Sub-cause 1.2' }],
      },
      {
        name: 'Cause Category 2',
        children: [{ name: 'Sub-cause 2.1' }],
      },
    ],
  },
});
```

### With Theme

```ts
fishbone.render({
  type: 'fishbone-diagram',
  data: {
    name: '质量问题',
    children: [
      {
        name: '人员',
        children: [{ name: '培训不足' }, { name: '经验缺乏' }],
      },
      {
        name: '方法',
        children: [{ name: '流程不清' }],
      },
      {
        name: '材料',
        children: [{ name: '质量差' }],
      },
    ],
  },
  theme: 'academy',
});
```

### With Custom Styles

```ts
fishbone.render({
  type: 'fishbone-diagram',
  data: {
    name: 'Problem',
    children: [{ name: 'Cause 1', children: [{ name: 'Sub-cause' }] }],
  },
  style: {
    backgroundColor: '#f0f0f0',
  },
});
```

## Methods

- `render(config: FishboneDiagramConfig): void` - Render or update the chart
- `destroy(): void` - Destroy the chart instance and clean up resources
