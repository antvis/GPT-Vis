# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

GPT-Vis is an AI-native, framework-agnostic visualization library for LLM applications. It provides a markdown-like syntax that LLMs can generate to render 26 chart types. Built on @antv/g2 v5 (statistical charts) and @antv/g6 v5 (graph charts). Published as `@antv/gpt-vis` on npm.

## Commands

```bash
# Install dependencies
pnpm install

# Development build (ESM only, faster)
pnpm dev

# Production build (ESM, CJS, UMD outputs via father)
pnpm build

# Lint TypeScript
pnpm lint:ts

# Lint with auto-fix
pnpm lint:ts-fix

# Format code
pnpm format

# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run single test file
pnpm vitest run __tests__/line.test.ts

# Version management (changesets)
pnpm changeset           # Add changeset
pnpm publish-version     # Bump version
pnpm publish-package     # Publish to npm

# Documentation site
cd site && pnpm dev      # Start Next.js dev server
```

## Build System

Uses `father` (configured in `.fatherrc.ts`):

- **Dev mode** (`pnpm dev`): ESM output only → `dist/esm`
- **Production** (`pnpm build`): ESM + CJS (`dist/cjs`) + UMD (`dist/umd/index.min.js`)
- UMD global export name: `GPTVis`, targets Chrome 80+
- Size limits enforced: UMD max 3 MB uncompressed, 1 MB gzipped

## Architecture

### Core Structure

```
src/
├── index.ts           # Public exports (GPTVis class + all chart components)
├── gpt-vis/           # Unified GPTVis class - main API entry point
├── syntax/            # Parser for markdown-like vis syntax
├── types/             # Shared TypeScript interfaces
├── util/              # Theme utilities (3 themes: default/dark/academy)
├── vis/               # Individual chart components (26 types)
└── vis-wrapper/       # Optional UI wrapper with tabs/download/copy/zoom
```

### Key Patterns

**Chart Component Pattern**: Each chart in `src/vis/<type>/index.ts` follows this factory pattern:

```typescript
export interface XxxConfig {
  type?: 'xxx';           // Chart type identifier
   XxxDataItem[];    // Data structure
  title?: string;
  theme?: 'default' | 'academy' | 'dark';
  style?: { ... };
}

export interface XxxInstance {
  render: (config: XxxConfig) => void;
  destroy: () => void;
}

export const Xxx = (options: VisualizationOptions): XxxInstance => {
  // Creates G2 Chart instance
  // Returns render/destroy methods
};
```

**G6-based Chart Pattern**: Charts built on `@antv/g6` follow the same pattern but also expose zoom control methods in the returned instance:

```typescript
export const Xxx = (options: VisualizationOptions) => {
  // Creates G6 Graph instance
  return {
    render,
    destroy,
    zoomTo: (zoom: number) => graph?.zoomTo(zoom), // Set zoom level
    getZoom: () => graph?.getZoom() ?? 1, // Get current zoom level
  };
};
```

All G6-based charts must expose `zoomTo` and `getZoom` to allow callers to programmatically control zoom for a better user experience.

**GPTVis Unified API**: The `GPTVis` class (`src/gpt-vis/index.ts`) provides:

- Registry of all chart types
- `render(config)` accepts either config object or syntax string
- `destroy()` cleanup

**Syntax Parser**: `src/syntax/parser.ts` converts markdown-like syntax to config objects:

```
vis line
data
  - time 2020
    value 100
title My Chart
```

→ `{ type: 'line',  [{ time: '2020', value: 100 }], title: 'My Chart' }`

Parser details:

- **Special array sections**: `data`, `categories`, `series`, `children`, `nodes`, `edges` are parsed as arrays
- **Special object sections**: `style` is parsed as a nested object
- **Value coercion**: Values auto-coerce to number/boolean; use quotes (single or double) to preserve strings with spaces or prevent coercion
- **Hierarchical data**: `children` supports nesting for mind-map, treemap, etc.

**Streaming Support**: Use `isVisSyntax()` to detect if a string starts with `vis ` prefix, enabling real-time rendering of LLM output:

```typescript
import { GPTVis, isVisSyntax } from '@antv/gpt-vis';

let buffer = '';
function onToken(token) {
  buffer += token;
  if (isVisSyntax(buffer)) {
    gptVis.render(buffer); // Re-render as content streams in
  }
}
```

**Vis-Wrapper**: Optional UI container (`wrapper: true` in `VisualizationOptions`) that adds Chart/Code tabs, PNG download (via snapdom), copy code, and zoom controls for G6 charts. Supports `zh-CN` and `en-US` labels.

### Supported Chart Types

G2-based: `area`, `bar`, `boxplot`, `column`, `dual-axes`, `funnel`, `histogram`, `line`, `liquid`, `pie`, `radar`, `sankey`, `scatter`, `summary`, `table`, `treemap`, `venn`, `violin`, `waterfall`, `word-cloud`

G6-based (expose `zoomTo`/`getZoom` in addition to `render`/`destroy`): `fishbone-diagram`, `flow-diagram`, `indented-tree`, `mindmap`, `network-graph`, `organization-chart`

### Theme System

Three themes in `src/util/theme.ts`: `default` (light), `dark`, `academy`. Each provides color palettes (10 colors), background colors, and G2 theme configuration. `normalizePalette()` ensures palette is always an array, falling back to theme defaults.

### Dependencies

- `@antv/g2` v5.4+ - Core charting engine (G2-based charts)
- `@antv/g6` v5.1+ - Graph visualization engine (G6-based charts)
- `@antv/t8` - Additional visualization utilities
- `@zumer/snapdom` - DOM snapshot for chart download

## Testing

Tests are in `__tests__/` and use Vitest (Node environment, globals enabled). Each chart type has its own test file. Tests primarily verify the syntax parser's output.

```bash
pnpm test              # Run all tests
pnpm test:watch        # Watch mode
pnpm vitest run __tests__/parser.test.ts  # Single file
```

## Site (Documentation)

The `site/` directory is a separate Next.js 16 app (App Router) with its own `package.json`:

- React 19, Tailwind CSS 4, Shiki for syntax highlighting
- Consumes main package via `"@antv/gpt-vis": "file:.."`
- Deployed to GitHub Pages on pushes to the `ai` branch (via `.github/workflows/deploy.yml`)
- **Responsive**: Site supports mobile devices. All layout changes and new content must be compatible with both desktop and mobile viewports

## CI/CD

- **ci.yml**: Runs lint, format check, tests, and build on every push (Node 20, pnpm 9)
- **deploy.yml**: Deploys site to GitHub Pages on `ai` branch pushes
- **release.yml**: Uses changesets for versioning and npm publishing
- Pre-commit hooks (husky): `lint-staged` runs eslint + prettier on staged files; `commitlint` validates commit messages

## Knowledge Base

`knowledges/` contains Chinese markdown files documenting each chart type's use cases, data requirements, and best practices. Used to train/educate LLMs on proper chart selection.

## Skills

`skills/chart-visualization/` contains the chart-visualization skill for AI assistants.

## Contributing

This project only merges AI-generated code. Submit an Issue, tag @copilot, then submit PR with the generated code.

## Commit Convention

Uses conventional commits with commitlint (max header length: 100). Types: `build`, `chore`, `ci`, `docs`, `feat`, `fix`, `perf`, `refactor`, `revert`, `style`, `test`, `deps`, `wip`.

## Node/pnpm Requirements

- Node.js >= 20
- pnpm >= 8 (CI uses pnpm 9)
