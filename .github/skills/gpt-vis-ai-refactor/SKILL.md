---
name: gpt-vis-ai-refactor
description:
  A skill for refactoring and upgrading GPT-Vis built-in components to version 1.0 using functional
  API pattern
---

# gpt-vis-ai-refactor

A GitHub Copilot skill for refactoring and upgrading GPT-Vis built-in components to version 1.0.

## Purpose

This skill guides developers through the process of migrating existing GPT-Vis components to the new
functional API pattern, focusing on creating clean, maintainable code in the `src/ai` directory.

## Target Branch

**IMPORTANT**: Always work on the `ai` branch for this refactoring work. If you're not on the `ai`
branch, please notify the user.

## Workflow

Follow these steps to migrate a component (e.g., Bar, Line, Radar, etc.):

### Step 1: Create Component Code in src/ai/vis/

Create a new functional component in `src/ai/vis/<component-name>/index.ts` following this pattern:

```typescript
import { Chart } from '@antv/g2';
import { /* required utilities */ } from 'lodash';
import { ACADEMY_COLOR_PALETTE, DEFAULT_COLOR_PALETTE } from '../../utils/palette';

/**
 * Component data item type
 */
type ComponentDataItem = {
  // Define data structure based on component needs
};

/**
 * Component initialization options
 */
export interface ComponentOptions {
  container: string | HTMLElement;
  width?: number;
  height?: number;
}

/**
 * Component configuration for rendering
 */
export interface ComponentConfig {
  type?: 'component-type';
  data: ComponentDataItem[];
  // Add component-specific options based on knowledges/<component>.md
  theme?: 'default' | 'academy' | 'dark';
  title?: string;
  style?: {
    backgroundColor?: string;
    palette?: string[];
  };
}

/**
 * Component instance with render and destroy methods
 */
export interface ComponentInstance {
  render: (config: ComponentConfig) => void;
  destroy: () => void;
}

/**
 * Component chart using G2 5.0.
 *
 * @example
 * ```ts
 * const component = Component({
 *   container: '#container',
 *   width: 600,
 *   height: 400,
 * });
 *
 * component.render({
 *   type: 'component-type',
 *   data: [...],
 * });
 *
 * component.destroy();
 * ```
 */
export const Component = (options: ComponentOptions): ComponentInstance => {
  const container = options.container;
  const width = options.width || 640;
  const height = options.height || 480;
  let chart: Chart | null = null;

  const render = (config: ComponentConfig): void => {
    const { data = [], theme = 'default', title, style = {} } = config;

    // Clean up previous chart if exists
    if (chart) {
      chart.destroy();
    }

    // Get colors and styles
    const colors = style.palette || getThemeColors(theme);
    const backgroundColor = style.backgroundColor || getBackgroundColor(theme);

    // Create and configure chart
    chart = new Chart({
      container,
      width,
      height,
      autoFit: true,
    });

    // Configure chart options based on component type
    const chartOptions: any = {
      // Component-specific configuration
      theme: getTheme(theme),
    };

    chart.options(chartOptions);
    chart.render();
  };

  const destroy = (): void => {
    if (chart) {
      chart.destroy();
      chart = null;
    }
  };

  return {
    render,
    destroy,
  };
};
```

**Key Requirements:**

1. **Use Functional Pattern**: Create a factory function that returns an instance with `render()`
   and `destroy()` methods
2. **Follow Naming Conventions**: Use PascalCase for the component function (e.g., `Pie`, `Bar`,
   `Line`)
3. **Configuration Alignment**: Match the configuration exactly as defined in
   `knowledges/<component>.md`
4. **Theme Support**: Include support for 'default', 'academy', and 'dark' themes
5. **Type Safety**: Define clear TypeScript interfaces for Options, Config, and Instance
6. **Clean Code**: Keep code concise - only include necessary configuration and logic

### Step 2: Create Component README

Create `src/ai/vis/<component-name>/README.md` to document the component:

```markdown
# ComponentName

A [component description] component for [use case], built with G2 5.0.

## Usage

\`\`\`ts
import { ComponentName } from '@antv/gpt-vis/ai';

const component = ComponentName({
  container: '#container',
  width: 600,
  height: 400,
});

component.render({
  data: [
    // Sample data
  ],
});

component.destroy();
\`\`\`

## Configuration

### Constructor Options (ComponentOptions)

| Property  | Type                  | Default | Description                   |
| --------- | --------------------- | ------- | ----------------------------- |
| container | string \| HTMLElement | -       | Container element or selector |
| width     | number                | 640     | Chart width in pixels         |
| height    | number                | 480     | Chart height in pixels        |

### Render Config (ComponentConfig)

| Property | Type   | Default   | Description           |
| -------- | ------ | --------- | --------------------- |
| data     | Array  | -         | Chart data array      |
| theme    | string | 'default' | Color theme           |
| title    | string | -         | Chart title           |
| style    | object | -         | Chart style configuration |

[Add component-specific configuration options]

### Data Structure

\`\`\`ts
type ComponentDataItem = {
  // Define structure
};
\`\`\`

### Style Options

\`\`\`ts
style?: {
  backgroundColor?: string;  // Background color
  palette?: string[];        // Color palette
}
\`\`\`

## Examples

### Basic Example

\`\`\`ts
component.render({
  data: [...],
});
\`\`\`

### With Theme

\`\`\`ts
component.render({
  data: [...],
  theme: 'academy',
});
\`\`\`

### With Custom Styles

\`\`\`ts
component.render({
  data: [...],
  style: {
    palette: ['#FF6B6B', '#4ECDC4', '#45B7D1'],
  },
});
\`\`\`

## Methods

- `render(config: ComponentConfig): void` - Render or update the chart
- `destroy(): void` - Destroy the chart instance and clean up resources
```

**Key Requirements:**

1. **AI-Friendly**: Documentation will be used for AI code generation
2. **Complete Examples**: Provide practical, runnable examples
3. **Clear Configuration**: Document all options with types and defaults
4. **Usage Patterns**: Show common use cases and patterns

### Step 3: Add Playground Demos

Update `src/ai/playground/` to include examples for the new component:

1. **Update main.ts**: Import and create multiple examples showcasing different configurations

```typescript
import { ComponentName } from '../vis/<component-name>/index';

// Example 1: Basic
const componentBasic = ComponentName({
  container: document.getElementById('component-basic')!,
  width: 500,
  height: 400,
});

componentBasic.render({
  data: [...],
});

// Example 2: With Theme
const componentTheme = ComponentName({
  container: document.getElementById('component-theme')!,
  width: 500,
  height: 400,
});

componentTheme.render({
  data: [...],
  theme: 'academy',
});

// Add more examples for each major configuration option
```

2. **Update index.html**: Add corresponding container elements

```html
<div class="card">
  <h2>Basic ComponentName</h2>
  <div id="component-basic" class="chart-container"></div>
</div>

<div class="card">
  <h2>ComponentName with Academy Theme</h2>
  <div id="component-theme" class="chart-container"></div>
</div>
```

**Key Requirements:**

1. **One Demo Per Config**: Create a separate demo for each major configuration option
2. **Visual Variety**: Show different themes, styles, and data variations
3. **Organized Layout**: Group related components by type (statistical, relational, etc.)

## Reference Materials

### Successful Migration Example

See PR #277 for the Pie chart migration - this is the gold standard pattern to follow:
- https://github.com/antvis/GPT-Vis/pull/277

### Knowledge Base

Component specifications are in the `knowledges/` directory:
- https://github.com/antvis/GPT-Vis/tree/main/knowledges

Each markdown file contains:
- Chart properties and attributes
- Basic concepts and use cases
- Configuration schema (use this EXACTLY)
- Usage examples with real data

## Best Practices

### Do's ✅

- Keep all new code in `src/ai/` directory
- Follow the functional pattern from the Pie example
- Match configuration schema exactly from knowledges
- Include comprehensive TypeScript types
- Write clean, concise code without unnecessary complexity
- Add multiple playground examples showing different features
- Document everything for AI code generation

### Don'ts ❌

- Don't modify code outside `src/ai/` (it will be deleted after refactoring)
- Don't add unnecessary dependencies or utilities
- Don't deviate from the configuration schema in knowledges
- Don't create complex abstractions or over-engineer
- Don't forget to test in the playground

## Component Checklist

When migrating a component, ensure:

- [ ] Component code created in `src/ai/vis/<name>/index.ts`
- [ ] Follows functional factory pattern with render/destroy methods
- [ ] Configuration matches `knowledges/<name>.md` exactly
- [ ] TypeScript types defined for Options, Config, Instance, and DataItem
- [ ] Theme support (default, academy, dark) implemented
- [ ] README.md created in component directory
- [ ] README includes usage, configuration, examples, and methods
- [ ] Playground demos added to `src/ai/playground/main.ts`
- [ ] HTML containers added to `src/ai/playground/index.html`
- [ ] Multiple examples showing different configurations
- [ ] Code is clean, concise, and well-documented
- [ ] Verified working on `ai` branch

## Getting Started

To use this skill:

1. Choose a component from the knowledges directory
2. Review the knowledge file for that component
3. Follow the three-step workflow above
4. Reference the Pie chart PR #277 as needed
5. Test your changes in the playground
6. Verify you're on the `ai` branch

## Notes

- This is part of the GPT-Vis 1.0 refactoring effort
- All refactored components will eventually replace the old ones
- Focus on quality over speed - each component should be production-ready
- The playground serves as both documentation and testing
