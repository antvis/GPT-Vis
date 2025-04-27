import { toImageEqual, toImageEqualOptions } from './toImageEqual';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      toImageEqual(dir: string, name: string, options?: toImageEqualOptions): R;
    }
  }
}

expect.extend({
  toImageEqual,
});
