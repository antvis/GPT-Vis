// @ts-nocheck
import { join } from 'path';
import { render } from '../src/ssr';

// 本地测试
describe('temp', () => {
  // 异步测试
  it('draw', async () => {
    const graph = await render({
      width: 600,
      height: 400,
      type: 'line',
      data: [
        {
          time: '1974',
          value: 107,
          group: 'Gas flaring',
        },
        {
          time: '1974',
          value: 208,
          group: 'Renewables',
        },
        {
          time: '1974',
          value: 356,
          group: 'Fossil fuels',
        },
        {
          time: '1975',
          value: 173,
          group: 'Gas flaring',
        },
        {
          time: '1975',
          value: 415,
          group: 'Renewables',
        },
        {
          time: '1975',
          value: 364,
          group: 'Fossil fuels',
        },
        {
          time: '1976',
          value: 117,
          group: 'Gas flaring',
        },
        {
          time: '1976',
          value: 220,
          group: 'Renewables',
        },
        {
          time: '1976',
          value: 373,
          group: 'Fossil fuels',
        },
        {
          time: '1977',
          value: 122,
          group: 'Gas flaring',
        },
        {
          time: '1977',
          value: 225,
          group: 'Renewables',
        },
        {
          time: '1977',
          value: 382,
          group: 'Fossil fuels',
        },
      ],
    });
    // @ts-ignore
    graph.exportToFile(join(__dirname, './assets/line'));
  });
});
