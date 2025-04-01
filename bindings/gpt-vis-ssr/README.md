## SSR extension for gpt-vis

This extension package provides SSR support for gpt-vis, which supports canvas rendering in server side.

## Usage

### Install

```bash
npm install @antv/gpt-vis-ssr
```

```js
const graph = await generateChart({
  type: 'radar',
  title: '雷达图示例',
  width: 600,
  height: 400,
  data: [
    { group: 'Apple', name: 'Vitamin C', value: 5 },
    { group: 'Apple', name: 'Fiber', value: 7 },
    { group: 'Apple', name: 'Sugar', value: 6 },
    { group: 'Apple', name: 'Protein', value: 2 },
    { group: 'Apple', name: 'Iron', value: 3 },
    { group: 'Apple', name: 'Calcium', value: 2 },
    { group: 'Banana', name: 'Vitamin C', value: 4 },
    { group: 'Banana', name: 'Fiber', value: 5 },
    { group: 'Banana', name: 'Sugar', value: 7 },
    { group: 'Banana', name: 'Protein', value: 3 },
    { group: 'Banana', name: 'Iron', value: 2 },
    { group: 'Banana', name: 'Calcium', value: 3 },
  ],
});
graph.exportToFile('image');
```
