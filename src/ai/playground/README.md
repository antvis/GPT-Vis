# GPT-Vis Playground

A simple Vite-based playground for developing and debugging GPT-Vis components.

## Getting Started

1. Install dependencies:

```bash
cd src/ai/playground
npm install
```

2. Start the development server:

```bash
npm run dev
```

The playground will open at `http://localhost:3000` with hot module replacement enabled.

## Structure

```
playground/
├── index.html       # Main HTML file with chart containers
├── main.ts          # Component examples and demo code (TypeScript)
├── vite.config.js   # Vite configuration
├── tsconfig.json    # TypeScript configuration
├── package.json     # Dependencies
└── README.md        # This file
```

## Adding New Examples

Edit `main.ts` to add new component examples:

```ts
import { Pie } from '../pie/index';

const myPie = Pie({
  container: document.getElementById('my-container')!,
  width: 500,
  height: 400,
});

myPie.render({
  data: [...],
  // your configuration
});
```

Add corresponding HTML containers in `index.html`:

```html
<div class="card">
  <h2>My Example</h2>
  <div id="my-container" class="chart-container"></div>
</div>
```

## Available Components

Currently includes examples for:

- **Pie**: Basic pie chart, donut chart, themes, custom colors

More components will be added as they are implemented.

## Development Tips

- Hot reload is enabled - changes to component code will automatically refresh the browser
- Check browser console for any errors
- All examples use real component code from `../pie/index.ts`
