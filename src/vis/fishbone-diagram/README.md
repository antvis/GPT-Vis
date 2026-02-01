# FishboneDiagram

A fishbone diagram (Ishikawa diagram) for cause-and-effect analysis, built with @ant-design/graphs.

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
    name: 'Problem',
    children: [
      {
        name: 'Cause 1',
        children: [{ name: 'Sub-cause 1.1' }, { name: 'Sub-cause 1.2' }],
      },
      { name: 'Cause 2' },
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

| Property | Type                | Default            | Description                          |
| -------- | ------------------- | ------------------ | ------------------------------------ |
| type     | string              | 'fishbone-diagram' | Component type identifier            |
| data     | FishboneDiagramData | -                  | Fishbone diagram data                |
| theme    | string              | 'default'          | Color theme ('default' or 'academy') |

### Data Structure

```ts
type FishboneDiagramData = {
  name: string;
  children?: FishboneDiagramData[];
};
```

## Examples

### Basic Fishbone Diagram

```ts
fishbone.render({
  type: 'fishbone-diagram',
  data: {
    name: 'Product Defect',
    children: [
      {
        name: 'Materials',
        children: [{ name: 'Poor Quality' }, { name: 'Wrong Specifications' }],
      },
      {
        name: 'Methods',
        children: [{ name: 'Inadequate Training' }, { name: 'Unclear Procedures' }],
      },
      {
        name: 'Machines',
        children: [{ name: 'Outdated Equipment' }, { name: 'Lack of Maintenance' }],
      },
      {
        name: 'Manpower',
        children: [{ name: 'Insufficient Staff' }, { name: 'Low Motivation' }],
      },
    ],
  },
});
```

### With Academy Theme

```ts
fishbone.render({
  type: 'fishbone-diagram',
  data: {
    name: 'Problem',
    children: [{ name: 'Cause 1' }, { name: 'Cause 2' }],
  },
  theme: 'academy',
});
```

## Methods

- `render(config: FishboneDiagramConfig): void` - Render or update the fishbone diagram
- `destroy(): void` - Destroy the fishbone diagram instance and clean up resources
