import { render } from '../src';
import './utils/matcher';

describe('SSR render', () => {
  it('box', async () => {
    const vis = await render({
      width: 600,
      height: 400,
      type: 'box',
      data: [
        { category: 'Oceania', value: [1, 9, 16, 22, 24] },
        { category: 'East Europe', value: [1, 5, 8, 12, 16] },
        { category: 'Australia', value: [1, 8, 12, 19, 26] },
        { category: 'South America', value: [2, 8, 12, 21, 28] },
        { category: 'North Africa', value: [1, 8, 14, 18, 24] },
        { category: 'North America', value: [3, 10, 17, 28, 30] },
        { category: 'West Europe', value: [1, 7, 10, 17, 22] },
        { category: 'West Africa', value: [1, 6, 8, 13, 16] },
      ],
      axisXTitle: 'category',
      axisYTitle: 'value',
    });

    expect(vis.toBuffer()).toImageEqual('__tests__/snapshot', 'box');
  });

  it('box-required', async () => {
    const vis = await render({
      type: 'box',
      data: [
        { category: 'Oceania', value: [1, 9, 16, 22, 24] },
        { category: 'East Europe', value: [1, 5, 8, 12, 16] },
        { category: 'Australia', value: [1, 8, 12, 19, 26] },
        { category: 'South America', value: [2, 8, 12, 21, 28] },
        { category: 'North Africa', value: [1, 8, 14, 18, 24] },
        { category: 'North America', value: [3, 10, 17, 28, 30] },
        { category: 'West Europe', value: [1, 7, 10, 17, 22] },
        { category: 'West Africa', value: [1, 6, 8, 13, 16] },
      ],
    });

    expect(vis.toBuffer()).toImageEqual('__tests__/snapshot', 'box-required');
  });

  it('box-grouped', async () => {
    const vis = await render({
      width: 600,
      height: 400,
      type: 'box',
      data: [
        {
          group: 'I. setosa',
          category: 'SepalLength',
          value: [4.3, 4.8, 5, 5.2, 5.8],
        },
        {
          group: 'I. setosa',
          category: 'SepalWidth',
          value: [2.3, 3.2, 3.4, 3.7, 4.4],
        },
        {
          group: 'I. setosa',
          category: 'PetalLength',
          value: [1, 1.4, 1.5, 1.6, 1.9],
        },
        {
          group: 'I. setosa',
          category: 'PetalWidth',
          value: [0.1, 0.2, 0.2, 0.3, 0.6],
        },
        {
          group: 'I. versicolor',
          category: 'SepalLength',
          value: [4.9, 5.6, 5.9, 6.3, 7],
        },
        {
          group: 'I. versicolor',
          category: 'SepalWidth',
          value: [2, 2.5, 2.8, 3, 3.4],
        },
        {
          group: 'I. versicolor',
          category: 'PetalLength',
          value: [3, 4, 4.35, 4.6, 5.1],
        },
        {
          group: 'I. versicolor',
          category: 'PetalWidth',
          value: [1, 1.2, 1.3, 1.5, 1.8],
        },
        {
          group: 'I. virginica',
          category: 'SepalLength',
          value: [4.9, 6.2, 6.5, 6.9, 7.9],
        },
        {
          group: 'I. virginica',
          category: 'SepalWidth',
          value: [2.2, 2.8, 3, 3.2, 3.8],
        },
        {
          group: 'I. virginica',
          category: 'PetalLength',
          value: [4.5, 5.1, 5.55, 5.9, 6.9],
        },
        {
          group: 'I. virginica',
          category: 'PetalWidth',
          value: [1.4, 1.8, 2, 2.3, 2.5],
        },
      ],
      group: true,
      axisXTitle: 'x',
      axisYTitle: 'y',
    });

    expect(vis.toBuffer()).toImageEqual('__tests__/snapshot', 'box-grouped');
  });

  it('box-academy', async () => {
    const vis = await render({
      theme: 'academy',
      width: 600,
      height: 400,
      type: 'box',
      data: [
        { category: 'Oceania', value: [1, 9, 16, 22, 24] },
        { category: 'East Europe', value: [1, 5, 8, 12, 16] },
        { category: 'Australia', value: [1, 8, 12, 19, 26] },
        { category: 'South America', value: [2, 8, 12, 21, 28] },
        { category: 'North Africa', value: [1, 8, 14, 18, 24] },
        { category: 'North America', value: [3, 10, 17, 28, 30] },
        { category: 'West Europe', value: [1, 7, 10, 17, 22] },
        { category: 'West Africa', value: [1, 6, 8, 13, 16] },
      ],
      axisXTitle: 'category',
      axisYTitle: 'value',
    });

    expect(vis.toBuffer()).toImageEqual('__tests__/snapshot', 'box-academy');
  });
});
