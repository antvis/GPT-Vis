import { afterEach, describe, expect, it, vi } from 'vitest';
import { GPTVis } from '../src/gpt-vis';
import { MockChart } from './helpers/renderers';

vi.mock('@antv/g2', async () => ({ Chart: (await import('./helpers/renderers')).MockChart }));
vi.mock('@antv/t8', async () => ({ Text: (await import('./helpers/renderers')).MockText }));

afterEach(() => vi.restoreAllMocks());

describe('render completion', () => {
  it('waits for the renderer on both initial render and chart reuse', async () => {
    const vis = new GPTVis({ container: {} as HTMLElement, width: 600, height: 400 });
    const config = { type: 'column', data: [{ category: 'A', value: 10 }] };
    for (let i = 0; i < 2; i++) {
      let finish!: (chart: MockChart) => void;
      vi.spyOn(MockChart.prototype, 'render').mockImplementationOnce(
        () =>
          new Promise<MockChart>((resolve) => {
            finish = resolve;
          }),
      );
      let completed = false;
      const rendering = vis.render(config).then(() => {
        completed = true;
      });
      await Promise.resolve();
      expect(completed).toBe(false);
      finish(new MockChart());
      await rendering;
      expect(completed).toBe(true);
    }
    vis.destroy();
  });

  it('propagates an asynchronous renderer failure to the caller', async () => {
    vi.spyOn(MockChart.prototype, 'render').mockRejectedValueOnce(new Error('circular link'));
    const vis = new GPTVis({ container: {} as HTMLElement });
    await expect(
      vis.render({
        type: 'sankey',
        data: [
          { source: 'A', target: 'B', value: 10 },
          { source: 'B', target: 'A', value: 10 },
        ],
      }),
    ).rejects.toThrow('circular link');
    vis.destroy();
  });

  it('rejects invalid configuration through the same Promise contract', async () => {
    const vis = new GPTVis({ container: {} as HTMLElement });
    await expect(vis.render({ type: 'invalid' })).rejects.toThrow('Unsupported chart type');
  });
});
