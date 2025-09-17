# gpt-vis-ssr

`Render` [GPT-Vis](https://github.com/antvis/GPT-Vis) in Server-Side with NodeJS.

## Installation

```sh
npm install --save @antv/gpt-vis-ssr
```

## Usage

```js
import { render } from '@antv/gpt-vis-ssr';

const options = {
  type: 'line',
  data: [
    { time: 2018, value: 91.9 },
    { time: 2019, value: 99.1 },
    { time: 2020, value: 101.6 },
    { time: 2021, value: 114.4 },
    { time: 2022, value: 121 },
  ],
};

const vis = await render(options);

const buffer = vis.toBuffer();

// You need to destroy the SSRResult when you are done with it to free up resources.
vis.destroy();
```

## API

### `render(options: Options): SSRResult`

Render spec into image buffer in NodeJS.

```ts
type SSRResult = {
  toBuffer: (meta?: any) => Buffer;
  destroy: () => void;
};
```

## License

[MIT](./LICENSE)
