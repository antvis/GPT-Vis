# Liquid

A liquid fill chart component for displaying progress, completion rates, or percentage values with a dynamic wave effect, built with G2 5.0.

## Usage

```ts
import { Liquid } from '@antv/gpt-vis/ai';

const liquid = Liquid({
  container: '#container',
  width: 600,
  height: 400,
});

liquid.render({
  percent: 0.75,
});

liquid.destroy();
```

## Configuration

### Constructor Options (LiquidOptions)

| Property  | Type                  | Default | Description                   |
| --------- | --------------------- | ------- | ----------------------------- |
| container | string \| HTMLElement | -       | Container element or selector |
| width     | number                | 640     | Chart width in pixels         |
| height    | number                | 480     | Chart height in pixels        |

### Render Config (LiquidConfig)

| Property | Type   | Default   | Description                                      |
| -------- | ------ | --------- | ------------------------------------------------ |
| percent  | number | -         | Fill percentage (0-1), e.g., 0.75 for 75%        |
| shape    | string | 'circle'  | Chart shape: 'circle', 'rect', 'pin', 'triangle' |
| theme    | string | 'default' | Color theme: 'default', 'academy', 'dark'        |
| title    | string | -         | Chart title                                      |
| style    | object | -         | Chart style configuration                        |

### Style Options

```ts
style?: {
  backgroundColor?: string;  // Background color
  palette?: string[];        // Color palette (uses first color for liquid fill)
}
```

## Examples

### Basic Example

```ts
const liquid = Liquid({
  container: '#container',
});

liquid.render({
  percent: 0.75,
});
```

### With Title

```ts
liquid.render({
  percent: 0.6,
  title: 'Task Completion',
});
```

### Different Shapes

```ts
// Circle (default)
liquid.render({
  percent: 0.75,
  shape: 'circle',
});

// Rectangle
liquid.render({
  percent: 0.6,
  shape: 'rect',
});

// Pin (water drop)
liquid.render({
  percent: 0.85,
  shape: 'pin',
});

// Triangle
liquid.render({
  percent: 0.92,
  shape: 'triangle',
});
```

### With Themes

```ts
// Academy theme
liquid.render({
  percent: 0.75,
  theme: 'academy',
});

// Dark theme
liquid.render({
  percent: 0.6,
  theme: 'dark',
});
```

### With Custom Styles

```ts
liquid.render({
  percent: 0.92,
  title: 'KPI Achievement',
  shape: 'triangle',
  style: {
    palette: ['#00BFFF'],
    backgroundColor: '#F0F0F0',
  },
});
```

## Methods

- `render(config: LiquidConfig): void` - Render or update the chart with new configuration
- `destroy(): void` - Destroy the chart instance and clean up resources

## Use Cases

- Display task completion rates
- Show resource usage percentages
- Visualize KPI achievement levels
- Present single metric progress indicators

## Notes

- The `percent` value should be between 0 and 1 (e.g., 0.75 = 75%)
- Font size is automatically calculated based on chart dimensions
- The wave animation is disabled for consistent rendering
- Custom palette colors only use the first color in the array
