import { render } from '../src';
import './utils/matcher';

describe('SSR render', () => {
  it('liquid', async () => {
    const vis = await render({
      width: 600,
      height: 400,
      type: 'liquid',
      data: 0.725,
    });

    expect(vis.toBuffer()).toImageEqual('__tests__/snapshot', 'liquid');
  });
});
