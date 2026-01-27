---
name: gpt-vis-ai-graph-refactor
description:
  A skill for refactoring and upgrading GPT-Vis graph/relationship components to version 1.0 using
  functional API pattern with @ant-design/graphs
---

# gpt-vis-ai-graph-refactor

A GitHub Copilot skill for refactoring and upgrading GPT-Vis graph/relationship components to
version 1.0.

> **⚠️ IMPORTANT**: Do not modify this skill description file without explicit request from the
> maintainer.

## Purpose

This skill guides developers through the process of migrating existing GPT-Vis graph/relationship
components (MindMap, FlowDiagram, OrganizationChart, IndentedTree, FishboneDiagram) to the new
functional API pattern using @ant-design/graphs library, focusing on creating clean, maintainable
code in the `src/ai` directory.

## Target Branch

**IMPORTANT**: Always work on the `ai` branch for this refactoring work. If you're not on the `ai`
branch, please notify the user.

## Target Components

This skill handles the following graph/relationship components:

1. **MindMap** (思维导图) - Mind map for hierarchical information organization
2. **FlowDiagram** (流程图) - Flow diagram for process visualization
3. **OrganizationChart** (组织架构图) - Organization chart for hierarchical structures
4. **IndentedTree** (缩进树) - Indented tree for hierarchical relationships
5. **FishboneDiagram** (鱼骨图) - Fishbone diagram for cause-and-effect analysis

## Workflow

Follow these steps to migrate a graph component:

### Step 1: Create Component Code in src/ai/vis/

Create a new functional component in `src/ai/vis/<component-name>/index.ts` following this pattern:

**Note**: Unlike G2-based chart components, graph components use @ant-design/graphs which provides
React components. We need to wrap them using preact for non-React environments.

#### Component Structure Template

````typescript
import type { <ComponentType>Options } from '@ant-design/graphs';
import { <ComponentType> as ADC<ComponentType> } from '@ant-design/graphs';
import { h, render as preactRender } from 'preact';
import { visTreeData2GraphData } from '../../util/graph'; // For tree-based graphs
// or
import { visGraphData2GraphData } from '../../util/graph'; // For network graphs

/**
 * Component data type (tree structure or graph structure)
 */
export type <Component>Data = {
  name: string;
  children?: <Component>Data[]; // For tree structures
  // OR
  nodes: { name: string }[];     // For graph structures
  edges: { source: string; target: string; name?: string }[];
};

/**
 * Component initialization options
 */
export interface <Component>Options {
  container: string | HTMLElement;
  width?: number;
  height?: number;
}

/**
 * Component configuration for rendering
 */
export interface <Component>Config {
  type?: '<component-type>';
  data: <Component>Data;
  theme?: 'default' | 'academy' | 'dark';
  // Add component-specific options based on knowledges/<component>.md
}

/**
 * Component instance with render and destroy methods
 */
export interface <Component>Instance {
  render: (config: <Component>Config) => void;
  destroy: () => void;
}

/**
 * <Component> using @ant-design/graphs.
 *
 * @example
 * ```ts
 * const component = <Component>({
 *   container: '#container',
 *   width: 600,
 *   height: 400,
 * });
 *
 * component.render({
 *   type: '<component-type>',
 *   data: {
 *     name: 'Root',
 *     children: [
 *       { name: 'Child 1' },
 *       { name: 'Child 2' }
 *     ]
 *   },
 * });
 *
 * component.destroy();
 * ```
 */
export const <Component> = (options: <Component>Options): <Component>Instance => {
  const container =
    typeof options.container === 'string'
      ? document.querySelector(options.container)
      : options.container;

  if (!container) {
    throw new Error('Container not found');
  }

  const width = options.width || 640;
  const height = options.height || 480;

  const render = (config: <Component>Config): void => {
    const { data, theme = 'default' } = config;

    // Transform data from vis format to G6 format
    const graphData = visTreeData2GraphData(data); // or visGraphData2GraphData(data)

    // Configure the graph component based on the existing React component
    // Reference: src/<Component>/index.tsx for default configuration
    const graphConfig: <ComponentType>Options = {
      data: graphData,
      width,
      height,
      autoFit: 'view',
      autoResize: true,
      zoomRange: [0.1, 5],
      zoom: 1,
      // Add component-specific configurations
      // See src/<Component>/index.tsx for reference
    };

    // Render using preact
    preactRender(
      h(ADC<ComponentType>, graphConfig),
      container as HTMLElement,
    );
  };

  const destroy = (): void => {
    // Clean up by rendering null
    preactRender(null, container as HTMLElement);
  };

  return {
    render,
    destroy,
  };
};
````

#### Key Requirements

1. **Use Functional Pattern**: Create a factory function that returns an instance with `render()`
   and `destroy()` methods
2. **Follow Naming Conventions**: Use PascalCase for the component function (e.g., `MindMap`,
   `FlowDiagram`)
3. **Configuration Alignment**: Match the configuration exactly as defined in
   `knowledges/<component>.md`
4. **Data Transformation**: Use utility functions from `src/ai/util/graph.ts` to transform vis data
   format to G6 format
5. **Reference Existing React Components**: Check `src/<Component>/index.tsx` for default
   configurations and behaviors
6. **Use Preact Wrapper**: Wrap @ant-design/graphs React components with preact for non-React
   environments
7. **Type Safety**: Define clear TypeScript interfaces for Options, Config, Instance, and Data
8. **Export Data Type**: Always export the Data type for consumer use
9. **Clean Code**: Keep code concise - only include necessary configuration and logic

#### Component-Specific Notes

**MindMap**:

- Uses tree data structure (`visTreeData2GraphData`)
- Configuration reference: `src/MindMap/index.tsx`
- Default type: `'boxed'`
- Supports theme: 'default' | 'academy'
- Includes collapse-expand functionality

**FlowDiagram**:

- Uses graph data structure with nodes and edges (`visGraphData2GraphData`)
- Configuration reference: `src/FlowDiagram/index.tsx`
- Uses TextNode component for node rendering
- Includes edge labels and hover behaviors

**OrganizationChart**:

- Uses tree data structure (`visTreeData2GraphData`)
- Configuration reference: `src/OrganizationChart/index.tsx`
- Uses OrganizationChartNode component
- Supports name and description fields
- Includes collapse-expand functionality

**IndentedTree**:

- Uses tree data structure (`visTreeData2GraphData`)
- Configuration reference: `src/IndentedTree/index.tsx`
- Default type: `'linear'`
- Supports theme: 'default' | 'academy'
- Includes collapse-expand functionality

**FishboneDiagram**:

- Uses tree data structure (`visTreeData2GraphData`)
- Configuration reference: `src/FishboneDiagram/index.tsx`
- Specialized layout for cause-and-effect analysis
- Supports theme: 'default' | 'academy'

### Step 2: Create Utility Functions (If Needed)

If utility functions for graph data transformation don't exist yet, create
`src/ai/util/graph.ts`:

```typescript
// Import G6 utilities from @ant-design/graphs
import { G6 } from '@ant-design/graphs';
import type { TreeGraphData, GraphData } from '../types';

const { treeToGraphData } = G6;

/**
 * Transform tree data from vis format to G6 format
 */
export function visTreeData2GraphData(data: TreeGraphData) {
  return treeToGraphData(data as unknown as G6.TreeData, {
    getNodeData: (datum, depth) => {
      datum.id = datum.name;
      datum.depth = depth;
      if (!datum.children) return datum as G6.NodeData;
      const { children, ...restDatum } = datum;
      return {
        ...restDatum,
        children: children.map((child) => child.name),
      } as G6.NodeData;
    },
    getEdgeData: (source, target) =>
      ({
        source: source.name,
        target: target.name,
      }) as G6.EdgeData,
  });
}

/**
 * Transform graph data from vis format to G6 format
 */
export function visGraphData2GraphData(data: GraphData) {
  return {
    nodes: data.nodes.map((node) => ({
      id: node.name,
      style: { labelText: node.name },
    })),
    edges: data.edges.map((edge) => ({
      source: edge.source,
      target: edge.target,
      style: { labelText: edge.name },
    })),
  };
}
```

Also define types in `src/ai/types/index.ts`:

```typescript
/**
 * Tree graph data structure
 */
export interface TreeGraphData {
  name: string;
  description?: string; // For OrganizationChart
  children?: TreeGraphData[];
}

/**
 * Network graph data structure
 */
export interface GraphData {
  nodes: { name: string }[];
  edges: { source: string; target: string; name?: string }[];
}
```

### Step 3: Create Component README

Create `src/ai/vis/<component-name>/README.md` to document the component:

````markdown
# ComponentName

A [component description] for [use case], built with @ant-design/graphs.

## Usage

```ts
import { ComponentName } from '@antv/gpt-vis/ai';

const component = ComponentName({
  container: '#container',
  width: 600,
  height: 400,
});

component.render({
  type: '<component-type>',
  data: {
    name: 'Root Node',
    children: [{ name: 'Child 1' }, { name: 'Child 2' }],
  },
});

component.destroy();
```

## Configuration

### Constructor Options (ComponentOptions)

| Property  | Type                  | Default | Description                   |
| --------- | --------------------- | ------- | ----------------------------- |
| container | string \| HTMLElement | -       | Container element or selector |
| width     | number                | 640     | Chart width in pixels         |
| height    | number                | 480     | Chart height in pixels        |

### Render Config (ComponentConfig)

| Property | Type   | Default   | Description               |
| -------- | ------ | --------- | ------------------------- |
| type     | string | -         | Component type identifier |
| data     | object | -         | Component data            |
| theme    | string | 'default' | Color theme               |

[Add component-specific configuration options]

### Data Structure

```ts
type ComponentData = {
  name: string;
  children?: ComponentData[]; // For tree structures
  // OR
  nodes: { name: string }[];
  edges: { source: string; target: string; name?: string }[];
};
```

## Examples

### Basic Example

```ts
component.render({
  type: '<component-type>',
  data: {
    name: 'Root',
    children: [{ name: 'Child 1' }, { name: 'Child 2' }],
  },
});
```

### With Theme

```ts
component.render({
  type: '<component-type>',
  data: {
    name: 'Root',
    children: [{ name: 'Child 1' }, { name: 'Child 2' }],
  },
  theme: 'academy',
});
```

## Methods

- `render(config: ComponentConfig): void` - Render or update the component
- `destroy(): void` - Destroy the component instance and clean up resources
````

### Step 4: Add Playground Demos

Update `src/ai/playground/` to include examples for the new component:

1. **Update main.ts**: Import and create multiple examples showcasing different configurations

```typescript
import { ComponentName } from '../vis/<component-name>/index';

// Example 1: Basic
const componentBasic = ComponentName({
  container: document.getElementById('component-basic')!,
  width: 600,
  height: 400,
});

componentBasic.render({
  type: '<component-type>',
  data: {
    // Sample data from knowledges
  },
});

// Example 2: With Theme
const componentTheme = ComponentName({
  container: document.getElementById('component-theme')!,
  width: 600,
  height: 400,
});

componentTheme.render({
  type: '<component-type>',
  data: {
    // Sample data
  },
  theme: 'academy',
});

// Add more examples for each major configuration option
```

2. **Update index.html**: Add corresponding container elements grouped by component category

```html
<!-- Graph/Relationship Components -->
<div class="card">
  <h2>Basic ComponentName</h2>
  <div id="component-basic" class="chart-container"></div>
</div>

<div class="card">
  <h2>ComponentName with Academy Theme</h2>
  <div id="component-theme" class="chart-container"></div>
</div>
```

### Step 5: Update Exports

Update `src/ai/index.ts` to export the component and types:

```typescript
// Graph Components
export { MindMap } from './vis/mind-map';
export type { MindMapConfig, MindMapOptions, MindMapData } from './vis/mind-map';
export { FlowDiagram } from './vis/flow-diagram';
export type { FlowDiagramConfig, FlowDiagramOptions, FlowDiagramData } from './vis/flow-diagram';
// ... other components
```

### Step 6: Format Code

After completing code updates, run the formatter to ensure code style consistency:

```bash
npm run format
```

This ensures that:

- All code follows the project's formatting standards
- CI lint checks will pass
- Code style is consistent across the codebase

**Important**: Always run `npm run format` before committing your changes to avoid lint failures in
CI.

### Step 7: Take Screenshots

1. Run the playground in development mode:

```bash
cd src/ai/playground
npm run dev
```

2. Open the playground in a browser
3. Take screenshots of each demo for the component
4. Include screenshots in the PR or issue comment for review

## Reference Materials

### Knowledge Base

Component specifications are in the `knowledges/` directory:

- https://github.com/antvis/GPT-Vis/tree/main/knowledges

For graph components, see:

- `思维导图 - Mind Map.md` - MindMap specification
- `流程图 - Flow Diagram.md` - FlowDiagram specification
- `组织架构图 - Organization Chart.md` - OrganizationChart specification
- `鱼骨图 - Fishbone Diagram.md` - FishboneDiagram specification

For IndentedTree, see the documentation in `src/IndentedTree/index.md`

Each markdown file contains:

- Chart properties and use cases
- Configuration schema (use this EXACTLY)
- Data requirements
- Usage examples with real data

### Existing React Components

For configuration reference, see the existing React components in `src/`:

- https://github.com/antvis/GPT-Vis/tree/main/src

Each component directory contains:

- `index.tsx` - React component implementation with default configurations
- `index.md` / `index.en.md` - Component documentation
- `demos/` - Example usage

**Important**: These React components show the correct @ant-design/graphs configuration patterns.
Use them as reference for:

- Graph options structure
- Node and edge styling
- Behaviors and interactions
- Theme configurations
- Transform functions

### @ant-design/graphs Documentation

For detailed API reference:

- https://github.com/antvis/G6
- @ant-design/graphs package documentation

## Best Practices

### Preact Wrapper Pattern

**Always use preact to wrap React components** from @ant-design/graphs:

```typescript
import { h, render as preactRender } from 'preact';
import { MindMap as ADCMindMap } from '@ant-design/graphs';

// Render
preactRender(h(ADCMindMap, config), container);

// Destroy
preactRender(null, container);
```

This allows us to use React components in a non-React environment.

### Data Transformation

**Always use utility functions** for data transformation:

- Use `visTreeData2GraphData()` for tree-based components (MindMap, OrganizationChart,
  IndentedTree, FishboneDiagram)
- Use `visGraphData2GraphData()` for network-based components (FlowDiagram)

### Configuration Reference

**Always reference existing React components** for default configurations:

1. Check `src/<Component>/index.tsx` for `defaultConfig`
2. Copy relevant configurations to your functional API implementation
3. Adapt theme support if the component has it
4. Ensure behaviors (drag-canvas, hover-activate, etc.) are included

### Exports

**Always update `src/ai/index.ts`** to export your component and all types:

```typescript
export { ComponentName } from './vis/<component-name>';
export type { ComponentConfig, ComponentOptions, ComponentData } from './vis/<component-name>';
```

### Do's ✅

- Keep all new code in `src/ai/` directory
- Follow the functional pattern with preact wrapper
- Match configuration schema exactly from knowledges
- Include comprehensive TypeScript types
- **Export Data types** for consumer use
- Use data transformation utilities from `src/ai/util/graph.ts`
- Write clean, concise code without unnecessary complexity
- Add multiple playground examples showing different features
- Document everything for AI code generation
- **Update `src/ai/index.ts`** to export component and all types
- Reference existing React components for configuration patterns
- Test in the playground before finalizing

### Don'ts ❌

- Don't modify code outside `src/ai/` (it will be deleted after refactoring)
- Don't add unnecessary dependencies or utilities
- Don't deviate from the configuration schema in knowledges
- Don't create complex abstractions or over-engineer
- Don't forget to test in the playground
- Don't forget to export Data types
- Don't directly copy React component code - adapt it to functional API pattern
- Don't skip the preact wrapper - it's essential for non-React environments
- Don't forget to add type definitions for graph data structures

## Component Checklist

When migrating a graph component, ensure:

- [ ] Component code created in `src/ai/vis/<name>/index.ts`
- [ ] Follows functional factory pattern with render/destroy methods
- [ ] Uses preact wrapper for @ant-design/graphs React components
- [ ] Configuration matches `knowledges/<name>.md` exactly
- [ ] TypeScript types defined for Options, Config, Instance, and Data
- [ ] **Data type is exported** (e.g., `export type MindMapData`)
- [ ] Theme support implemented (if component has theme support)
- [ ] Data transformation utilities used (visTreeData2GraphData or visGraphData2GraphData)
- [ ] References existing React component for default configuration
- [ ] README.md created in component directory
- [ ] README includes usage, configuration, examples, and methods
- [ ] Playground demos added to `src/ai/playground/main.ts`
- [ ] HTML containers added to `src/ai/playground/index.html`
- [ ] Multiple examples showing different configurations
- [ ] **Component and types exported** from `src/ai/index.ts`
- [ ] Code is clean, concise, and well-documented
- [ ] Verified working on `ai` branch
- [ ] **Code formatted with `npm run format`**
- [ ] Linting passes without errors
- [ ] Screenshots taken from playground for review

## Getting Started

To use this skill:

1. Choose a graph component to migrate: MindMap, FlowDiagram, OrganizationChart, IndentedTree, or
   FishboneDiagram
2. Review the knowledge file for that component in `knowledges/`
3. Check the existing React component in `src/<Component>/` for configuration reference
4. Ensure `src/ai/util/graph.ts` exists with data transformation utilities
5. Follow the workflow above step by step
6. Test your changes in the playground
7. Run `npm run format` to ensure code style
8. Take screenshots for review
9. Verify you're on the `ai` branch

## Common Pitfalls to Avoid

1. **Forgetting to export Data type**: Always export with `export type` for consumer use
2. **Missing preact wrapper**: Graph components MUST use preact to wrap React components
3. **Wrong data transformation**: Use `visTreeData2GraphData` for trees,
   `visGraphData2GraphData` for networks
4. **Incomplete configuration**: Reference existing React components for complete default configs
5. **Missing playground examples**: Include examples from knowledges and additional theme/config
   variations
6. **Not updating exports**: Always update `src/ai/index.ts` with new component and types
7. **Skipping utility creation**: Create `src/ai/util/graph.ts` if it doesn't exist
8. **Forgetting dependencies**: Ensure preact is installed (should be in package.json)
9. **Line length violations**: Keep lines under 100 characters for Prettier compliance

## Notes

- This is part of the GPT-Vis 1.0 refactoring effort for graph/relationship components
- Graph components require different handling than G2-based chart components due to React
  dependency
- All refactored components will eventually replace the old React-only ones
- The preact wrapper enables these React components to work in non-React environments
- Focus on quality over speed - each component should be production-ready
- The playground serves as both documentation and testing
