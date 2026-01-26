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

**Important**: For G2/G6 chart configuration options (transforms, coordinates, scales, etc.), refer
to the corresponding component file in `bindings/gpt-vis-ssr/src/vis/<component-name>.ts` for
real-world configuration examples.

```typescript
import { Chart } from '@antv/g2';
import { getBackgroundColor, getTheme, getThemeColors } from '../../util/theme';

/**
 * Component data item type
 */
export type ComponentDataItem = {
  // Define data structure based on component needs
  // IMPORTANT: Export this type for consumer use
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

    // Get colors and styles from shared theme utilities
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
    // Note: Using 'any' type due to G2's complex type system with transformations
    // This is consistent with how G2 5.0 is used elsewhere in the codebase
    const chartOptions: any = {
      // Component-specific configuration based on knowledges/<component>.md
      theme: getTheme(theme),
      viewStyle: {
        viewFill: backgroundColor,
      },
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
4. **Theme Support**: Include support for 'default', 'academy', and 'dark' themes using shared
   utilities from `src/ai/util/theme.ts`
5. **Type Safety**: Define clear TypeScript interfaces for Options, Config, Instance, and DataItem
6. **Export DataItem Type**: Always export the DataItem type for consumer use (e.g.,
   `export type FunnelDataItem`)
7. **Clean Code**: Keep code concise - only include necessary configuration and logic
8. **Document Complex Logic**: Add comments explaining non-obvious transformations or
   configurations

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

### G2/G6 Chart Configuration Examples

For G2 and G6 chart configuration options, refer to the existing component implementations in the
SSR bindings directory:

- https://github.com/antvis/GPT-Vis/tree/main/bindings/gpt-vis-ssr/src/vis

These files contain real G2 5.0 configuration examples for each chart type (Pie, Funnel, Bar, Line,
etc.). They show:

- Proper G2 chart options structure
- How to configure chart types, transforms, and coordinates
- Scale, legend, label, and style configurations
- Theme integration patterns
- Component-specific transformations (e.g., `symmetryY` for funnel, `theta` coordinate for pie)

Use these as reference when implementing chart-specific configurations in your component.

### Knowledge Base

Component specifications are in the `knowledges/` directory:

- https://github.com/antvis/GPT-Vis/tree/main/knowledges

Each markdown file contains:
- Chart properties and attributes
- Basic concepts and use cases
- Configuration schema (use this EXACTLY)
- Usage examples with real data

## Best Practices

### Shared Utilities

**Theme Utilities** (`src/ai/util/theme.ts`)

All components should use shared theme utilities instead of duplicating code:

```typescript
import { getBackgroundColor, getTheme, getThemeColors } from '../../util/theme';

// In your render function:
const colors = style.palette || getThemeColors(theme);
const backgroundColor = style.backgroundColor || getBackgroundColor(theme);

// In chart options:
theme: getTheme(theme),
viewStyle: {
  viewFill: backgroundColor,
}
```

These utilities provide:

- `getTheme(theme)`: Converts 'default' to 'light' for G2 compatibility
- `getThemeColors(theme)`: Returns appropriate color palette for the theme
- `getBackgroundColor(theme)`: Returns background color for the theme

### Exports

**Always update `src/ai/index.ts`** to export your component and types:

```typescript
export { ComponentName } from './vis/<component-name>';
export type { ComponentConfig, ComponentOptions, ComponentDataItem } from './vis/<component-name>';
```

This ensures consumers can import and use your types for better type safety.

### Do's ✅

- Keep all new code in `src/ai/` directory
- Follow the functional pattern from the Pie example
- Match configuration schema exactly from knowledges
- Include comprehensive TypeScript types
- **Export DataItem types** for consumer use
- **Use shared theme utilities** from `src/ai/util/theme.ts`
- Write clean, concise code without unnecessary complexity
- Add multiple playground examples showing different features
- Document everything for AI code generation
- **Update `src/ai/index.ts`** to export component and all types
- Add comments for complex transformations or logic

### Don'ts ❌

- Don't modify code outside `src/ai/` (it will be deleted after refactoring)
- Don't add unnecessary dependencies or utilities
- Don't deviate from the configuration schema in knowledges
- Don't create complex abstractions or over-engineer
- Don't forget to test in the playground
- **Don't duplicate theme utility functions** - use shared utilities instead
- Don't import palette constants directly - use theme utilities
- Don't forget to export DataItem types

## Component Checklist

When migrating a component, ensure:

- [ ] Component code created in `src/ai/vis/<name>/index.ts`
- [ ] Follows functional factory pattern with render/destroy methods
- [ ] Configuration matches `knowledges/<name>.md` exactly
- [ ] TypeScript types defined for Options, Config, Instance, and DataItem
- [ ] **DataItem type is exported** (e.g., `export type ComponentDataItem`)
- [ ] Theme support (default, academy, dark) implemented
- [ ] **Uses shared theme utilities** from `src/ai/util/theme.ts`
- [ ] README.md created in component directory
- [ ] README includes usage, configuration, examples, and methods
- [ ] Playground demos added to `src/ai/playground/main.ts`
- [ ] HTML containers added to `src/ai/playground/index.html`
- [ ] Multiple examples showing different configurations (basic, themes, custom styles)
- [ ] **Component and types exported** from `src/ai/index.ts`
- [ ] Code is clean, concise, and well-documented
- [ ] Complex logic has explanatory comments
- [ ] Verified working on `ai` branch
- [ ] Linting passes without errors

## Getting Started

To use this skill:

1. Choose a component from the knowledges directory
2. Review the knowledge file for that component
3. **Check the SSR binding reference** at
   `bindings/gpt-vis-ssr/src/vis/<component-name>.ts` for G2/G6 configuration examples
4. Follow the three-step workflow above
5. Reference the Pie chart PR #277 as needed
6. **Use shared theme utilities** - don't duplicate code
7. **Export all types** including DataItem
8. Test your changes in the playground
9. Verify you're on the `ai` branch

## Common Pitfalls to Avoid

1. **Forgetting to export DataItem type**: Always export with `export type` for consumer use
2. **Duplicating theme utilities**: Import from `src/ai/util/theme.ts` instead
3. **Importing palette constants directly**: Use theme utilities instead of importing
   `ACADEMY_COLOR_PALETTE` or `DEFAULT_COLOR_PALETTE`
4. **Missing playground examples**: Include at least 5 examples (basic, title, themes, custom
   styles)
5. **Not updating exports**: Always update `src/ai/index.ts` with new component and types
6. **Forgetting to document complex logic**: Add comments for non-obvious transformations
7. **Line length violations**: Keep lines under 100 characters for Prettier compliance

## CI Optimization

For PRs targeting the `ai` branch, the following checks are skipped to speed up review:

- size-test
- ssr-test
- unit-test
- Surge PR preview

Only linting and formatting checks run, ensuring code quality while minimizing CI time.

## Notes

- This is part of the GPT-Vis 1.0 refactoring effort
- All refactored components will eventually replace the old ones
- Focus on quality over speed - each component should be production-ready
- The playground serves as both documentation and testing
