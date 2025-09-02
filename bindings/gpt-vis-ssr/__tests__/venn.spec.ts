import { render } from '../src';
import { PALETTE } from './constant';
import './utils/matcher';

const DATA = [
  {
    sets: [0],
    label: 'Radiohead',
    value: 77348,
  },
  {
    sets: [1],
    label: 'Thom Yorke',
    value: 5621,
  },
  {
    sets: [2],
    label: 'John Lennon',
    value: 7773,
  },
  {
    sets: [3],
    label: 'Kanye West',
    value: 27053,
  },
  {
    sets: [4],
    label: 'Eminem',
    value: 19056,
  },
  {
    sets: [5],
    label: 'Elvis Presley',
    value: 15839,
  },
  {
    sets: [6],
    label: 'Explosions in the Sky',
    value: 10813,
  },
  {
    sets: [7],
    label: 'Bach',
    value: 9264,
  },
  {
    sets: [8],
    label: 'Mozart',
    value: 3959,
  },
  {
    sets: [9],
    label: 'Philip Glass',
    value: 4793,
  },
  {
    sets: [10],
    label: 'St. Germain',
    value: 4136,
  },
  {
    sets: [11],
    label: 'Morrissey',
    value: 10945,
  },
  {
    sets: [12],
    label: 'Outkast',
    value: 8444,
  },
  {
    sets: [0, 1],
    value: 4832,
  },
  {
    sets: [0, 2],
    value: 2602,
  },
  {
    sets: [0, 3],
    value: 6141,
  },
  {
    sets: [0, 4],
    value: 2723,
  },
  {
    sets: [0, 5],
    value: 3177,
  },
  {
    sets: [0, 6],
    value: 5384,
  },
  {
    sets: [0, 7],
    value: 2252,
  },
  {
    sets: [0, 8],
    value: 877,
  },
  {
    sets: [0, 9],
    value: 1663,
  },
  {
    sets: [0, 10],
    value: 899,
  },
  {
    sets: [0, 11],
    value: 4557,
  },
  {
    sets: [0, 12],
    value: 2332,
  },
  {
    sets: [1, 2],
    value: 162,
  },
  {
    sets: [1, 3],
    value: 396,
  },
  {
    sets: [1, 4],
    value: 133,
  },
  {
    sets: [1, 5],
    value: 135,
  },
  {
    sets: [1, 6],
    value: 511,
  },
  {
    sets: [1, 7],
    value: 159,
  },
  {
    sets: [1, 8],
    value: 47,
  },
  {
    sets: [1, 9],
    value: 168,
  },
  {
    sets: [1, 10],
    value: 68,
  },
  {
    sets: [1, 11],
    value: 336,
  },
  {
    sets: [1, 12],
    value: 172,
  },
  {
    sets: [2, 3],
    value: 406,
  },
  {
    sets: [2, 4],
    value: 350,
  },
  {
    sets: [2, 5],
    value: 1335,
  },
  {
    sets: [2, 6],
    value: 145,
  },
  {
    sets: [2, 7],
    value: 347,
  },
  {
    sets: [2, 8],
    value: 176,
  },
  {
    sets: [2, 9],
    value: 119,
  },
  {
    sets: [2, 10],
    value: 46,
  },
  {
    sets: [2, 11],
    value: 418,
  },
  {
    sets: [2, 12],
    value: 146,
  },
  {
    sets: [3, 4],
    value: 5465,
  },
  {
    sets: [3, 5],
    value: 849,
  },
  {
    sets: [3, 6],
    value: 724,
  },
  {
    sets: [3, 7],
    value: 273,
  },
  {
    sets: [3, 8],
    value: 143,
  },
  {
    sets: [3, 9],
    value: 180,
  },
  {
    sets: [3, 10],
    value: 218,
  },
  {
    sets: [3, 11],
    value: 599,
  },
  {
    sets: [3, 12],
    value: 3453,
  },
  {
    sets: [4, 5],
    value: 977,
  },
  {
    sets: [4, 6],
    value: 232,
  },
  {
    sets: [4, 7],
    value: 250,
  },
  {
    sets: [4, 8],
    value: 166,
  },
  {
    sets: [4, 9],
    value: 97,
  },
  {
    sets: [4, 10],
    value: 106,
  },
  {
    sets: [4, 11],
    value: 225,
  },
  {
    sets: [4, 12],
    value: 1807,
  },
  {
    sets: [5, 6],
    value: 196,
  },
  {
    sets: [5, 7],
    value: 642,
  },
  {
    sets: [5, 8],
    value: 336,
  },
  {
    sets: [5, 9],
    value: 165,
  },
  {
    sets: [5, 10],
    value: 143,
  },
  {
    sets: [5, 11],
    value: 782,
  },
  {
    sets: [5, 12],
    value: 332,
  },
  {
    sets: [6, 7],
    value: 262,
  },
  {
    sets: [6, 8],
    value: 85,
  },
  {
    sets: [6, 9],
    value: 284,
  },
  {
    sets: [6, 10],
    value: 68,
  },
  {
    sets: [6, 11],
    value: 363,
  },
  {
    sets: [6, 12],
    value: 218,
  },
  {
    sets: [7, 8],
    value: 1581,
  },
  {
    sets: [7, 9],
    value: 716,
  },
  {
    sets: [7, 10],
    value: 133,
  },
  {
    sets: [7, 11],
    value: 254,
  },
  {
    sets: [7, 12],
    value: 132,
  },
  {
    sets: [8, 9],
    value: 280,
  },
  {
    sets: [8, 10],
    value: 53,
  },
  {
    sets: [8, 11],
    value: 117,
  },
  {
    sets: [8, 12],
    value: 67,
  },
  {
    sets: [9, 10],
    value: 57,
  },
  {
    sets: [9, 11],
    value: 184,
  },
  {
    sets: [9, 12],
    value: 89,
  },
  {
    sets: [10, 11],
    value: 51,
  },
  {
    sets: [10, 12],
    value: 115,
  },
  {
    sets: [11, 12],
    value: 162,
  },
  {
    sets: [0, 1, 6],
    value: 480,
  },
  {
    sets: [0, 1, 9],
    value: 152,
  },
  {
    sets: [0, 2, 7],
    value: 112,
  },
  {
    sets: [0, 3, 4],
    value: 715,
  },
  {
    sets: [0, 3, 12],
    value: 822,
  },
  {
    sets: [0, 4, 5],
    value: 160,
  },
  {
    sets: [0, 5, 11],
    value: 292,
  },
  {
    sets: [0, 6, 12],
    value: 122,
  },
  {
    sets: [0, 7, 11],
    value: 118,
  },
  {
    sets: [0, 9, 10],
    value: 13,
  },
  {
    sets: [2, 7, 8],
    value: 72,
  },
];

describe('SSR render', () => {
  it('venn', async () => {
    const vis = await render({
      width: 600,
      height: 400,
      type: 'venn',
      data: DATA,
      title: 'Music Genres and Artists',
    });

    expect(vis.toBuffer()).toImageEqual('__tests__/snapshot', 'venn');
  });

  it('venn-rough', async () => {
    const vis = await render({
      width: 600,
      height: 400,
      type: 'venn',
      data: DATA,
      title: 'Music Genres and Artists',
      style: {
        texture: 'rough',
      },
    });

    expect(vis.toBuffer()).toImageEqual('__tests__/snapshot', 'venn-rough');
  });

  it('venn-academy', async () => {
    const vis = await render({
      width: 600,
      height: 400,
      type: 'venn',
      data: DATA,
      title: 'Music Genres and Artists',
      theme: 'academy',
    });

    expect(vis.toBuffer()).toImageEqual('__tests__/snapshot', 'venn-academy');
  });

  it('venn-style', async () => {
    const vis = await render({
      width: 600,
      height: 400,
      type: 'venn',
      data: DATA,
      title: 'Music Genres and Artists',
      style: {
        backgroundColor: '#f0f0f0',
        palette: PALETTE,
      },
    });

    expect(vis.toBuffer()).toImageEqual('__tests__/snapshot', 'venn-style');
  });
});
