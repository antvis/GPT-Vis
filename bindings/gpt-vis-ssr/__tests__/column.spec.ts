import { render } from '../src';
import { PALETTE } from './constant';
import './utils/matcher';

describe('SSR render', () => {
  it('column', async () => {
    const vis = await render({
      width: 600,
      height: 400,
      type: 'column',
      data: [
        { category: 'Sports', value: 275 },
        { category: 'Strategy', value: 115 },
        { category: 'Action', value: 120 },
        { category: 'Shooter', value: 350 },
        { category: 'Other', value: 150 },
      ],
      axisXTitle: 'Type',
      axisYTitle: 'Sold',
    });

    expect(vis.toBuffer()).toImageEqual('__tests__/snapshot', 'column');
    vis.destroy();
  });

  it('column-required', async () => {
    const vis = await render({
      type: 'column',
      data: [
        { category: 'Sports', value: 275 },
        { category: 'Strategy', value: 115 },
        { category: 'Action', value: 120 },
        { category: 'Shooter', value: 350 },
        { category: 'Other', value: 150 },
      ],
    });

    expect(vis.toBuffer()).toImageEqual('__tests__/snapshot', 'column-required');
    vis.destroy();
  });

  it('column-rough', async () => {
    const vis = await render({
      width: 600,
      height: 400,
      type: 'column',
      data: [
        { category: 'Sports', value: 275 },
        { category: 'Strategy', value: 115 },
        { category: 'Action', value: 120 },
        { category: 'Shooter', value: 350 },
        { category: 'Other', value: 150 },
      ],
      axisXTitle: 'Type',
      axisYTitle: 'Sold',
      style: {
        texture: 'rough',
      },
    });

    expect(vis.toBuffer()).toImageEqual('__tests__/snapshot', 'column-rough');
    vis.destroy();
  });

  it('column-grouped', async () => {
    const vis = await render({
      width: 600,
      height: 400,
      type: 'column',
      data: [
        { group: 'London', category: 'Jan.', value: 18.9 },
        { group: 'London', category: 'Feb.', value: 28.8 },
        { group: 'London', category: 'Mar.', value: 39.3 },
        { group: 'London', category: 'Apr.', value: 81.4 },
        { group: 'London', category: 'May', value: 47 },
        { group: 'London', category: 'Jun.', value: 20.3 },
        { group: 'London', category: 'Jul.', value: 24 },
        { group: 'London', category: 'Aug.', value: 35.6 },
        { group: 'Berlin', category: 'Jan.', value: 12.4 },
        { group: 'Berlin', category: 'Feb.', value: 23.2 },
        { group: 'Berlin', category: 'Mar.', value: 34.5 },
        { group: 'Berlin', category: 'Apr.', value: 99.7 },
        { group: 'Berlin', category: 'May', value: 52.6 },
        { group: 'Berlin', category: 'Jun.', value: 35.5 },
        { group: 'Berlin', category: 'Jul.', value: 37.4 },
        { group: 'Berlin', category: 'Aug.', value: 42.4 },
      ],
      group: true,
      axisXTitle: 'Month',
      axisYTitle: 'Temperature',
    });

    expect(vis.toBuffer()).toImageEqual('__tests__/snapshot', 'column-grouped');
    vis.destroy();
  });

  it('column-grouped-academy', async () => {
    const vis = await render({
      width: 600,
      height: 400,
      type: 'column',
      theme: 'academy',
      data: [
        { group: 'London', category: 'Jan.', value: 18.9 },
        { group: 'London', category: 'Feb.', value: 28.8 },
        { group: 'London', category: 'Mar.', value: 39.3 },
        { group: 'London', category: 'Apr.', value: 81.4 },
        { group: 'London', category: 'May', value: 47 },
        { group: 'London', category: 'Jun.', value: 20.3 },
        { group: 'London', category: 'Jul.', value: 24 },
        { group: 'London', category: 'Aug.', value: 35.6 },
        { group: 'Berlin', category: 'Jan.', value: 12.4 },
        { group: 'Berlin', category: 'Feb.', value: 23.2 },
        { group: 'Berlin', category: 'Mar.', value: 34.5 },
        { group: 'Berlin', category: 'Apr.', value: 99.7 },
        { group: 'Berlin', category: 'May', value: 52.6 },
        { group: 'Berlin', category: 'Jun.', value: 35.5 },
        { group: 'Berlin', category: 'Jul.', value: 37.4 },
        { group: 'Berlin', category: 'Aug.', value: 42.4 },
      ],
      group: true,
      axisXTitle: 'Month',
      axisYTitle: 'Temperature',
    });

    expect(vis.toBuffer()).toImageEqual('__tests__/snapshot', 'column-grouped-academy');
    vis.destroy();
  });

  it('column-stacked', async () => {
    const vis = await render({
      width: 600,
      height: 400,
      type: 'column',
      data: [
        { group: 'London', category: 'Jan.', value: 18.9 },
        { group: 'London', category: 'Feb.', value: 28.8 },
        { group: 'London', category: 'Mar.', value: 39.3 },
        { group: 'London', category: 'Apr.', value: 81.4 },
        { group: 'London', category: 'May', value: 47 },
        { group: 'London', category: 'Jun.', value: 20.3 },
        { group: 'London', category: 'Jul.', value: 24 },
        { group: 'London', category: 'Aug.', value: 35.6 },
        { group: 'Berlin', category: 'Jan.', value: 12.4 },
        { group: 'Berlin', category: 'Feb.', value: 23.2 },
        { group: 'Berlin', category: 'Mar.', value: 34.5 },
        { group: 'Berlin', category: 'Apr.', value: 99.7 },
        { group: 'Berlin', category: 'May', value: 52.6 },
        { group: 'Berlin', category: 'Jun.', value: 35.5 },
        { group: 'Berlin', category: 'Jul.', value: 37.4 },
        { group: 'Berlin', category: 'Aug.', value: 42.4 },
      ],
      stack: true,
      axisXTitle: 'Month',
      axisYTitle: 'Temperature',
    });

    expect(vis.toBuffer()).toImageEqual('__tests__/snapshot', 'column-stacked');
    vis.destroy();
  });

  it('column-stacked-label', async () => {
    const vis = await render({
      width: 600,
      height: 400,
      type: 'column',
      showLabel: true,
      data: [
        { group: 'London', category: 'Jan.', value: 18.9 },
        { group: 'London', category: 'Feb.', value: 28.8 },
        { group: 'London', category: 'Mar.', value: 39.3 },
        { group: 'London', category: 'Apr.', value: 81.4 },
        { group: 'London', category: 'May', value: 47 },
        { group: 'London', category: 'Jun.', value: 20.3 },
        { group: 'London', category: 'Jul.', value: 24 },
        { group: 'London', category: 'Aug.', value: 35.6 },
        { group: 'Berlin', category: 'Jan.', value: 12.4 },
        { group: 'Berlin', category: 'Feb.', value: 23.2 },
        { group: 'Berlin', category: 'Mar.', value: 34.5 },
        { group: 'Berlin', category: 'Apr.', value: 99.7 },
        { group: 'Berlin', category: 'May', value: 52.6 },
        { group: 'Berlin', category: 'Jun.', value: 35.5 },
        { group: 'Berlin', category: 'Jul.', value: 37.4 },
        { group: 'Berlin', category: 'Aug.', value: 42.4 },
      ],
      stack: true,
      axisXTitle: 'Month',
      axisYTitle: 'Temperature',
    });

    expect(vis.toBuffer()).toImageEqual('__tests__/snapshot', 'column-stacked-label');
    vis.destroy();
  });

  it('column-academy', async () => {
    const vis = await render({
      theme: 'academy',
      width: 600,
      height: 400,
      type: 'column',
      data: [
        { group: 'London', category: 'Jan.', value: 18.9 },
        { group: 'London', category: 'Feb.', value: 28.8 },
        { group: 'London', category: 'Mar.', value: 39.3 },
        { group: 'London', category: 'Apr.', value: 81.4 },
        { group: 'London', category: 'May', value: 47 },
        { group: 'London', category: 'Jun.', value: 20.3 },
        { group: 'London', category: 'Jul.', value: 24 },
        { group: 'London', category: 'Aug.', value: 35.6 },
        { group: 'Berlin', category: 'Jan.', value: 12.4 },
        { group: 'Berlin', category: 'Feb.', value: 23.2 },
        { group: 'Berlin', category: 'Mar.', value: 34.5 },
        { group: 'Berlin', category: 'Apr.', value: 99.7 },
        { group: 'Berlin', category: 'May', value: 52.6 },
        { group: 'Berlin', category: 'Jun.', value: 35.5 },
        { group: 'Berlin', category: 'Jul.', value: 37.4 },
        { group: 'Berlin', category: 'Aug.', value: 42.4 },
      ],
      stack: true,
      axisXTitle: 'Month',
      axisYTitle: 'Temperature',
    });

    expect(vis.toBuffer()).toImageEqual('__tests__/snapshot', 'column-stacked-academy');
    vis.destroy();
  });

  it('column-custom-style', async () => {
    const vis = await render({
      width: 600,
      height: 400,
      type: 'column',
      data: [
        { category: 'Sports', value: 275 },
        { category: 'Strategy', value: 115 },
        { category: 'Action', value: 120 },
        { category: 'Shooter', value: 350 },
        { category: 'Other', value: 150 },
      ],
      axisXTitle: 'Type',
      axisYTitle: 'Sold',
      style: {
        backgroundColor: '#aaa',
        palette: PALETTE,
      },
    });

    expect(vis.toBuffer()).toImageEqual('__tests__/snapshot', 'column-custom-style');
    vis.destroy();
  });

  it('column-grouped-custom-style', async () => {
    const vis = await render({
      width: 600,
      height: 400,
      type: 'column',
      data: [
        { group: 'London', category: 'Jan.', value: 18.9 },
        { group: 'London', category: 'Feb.', value: 28.8 },
        { group: 'London', category: 'Mar.', value: 39.3 },
        { group: 'London', category: 'Apr.', value: 81.4 },
        { group: 'London', category: 'May', value: 47 },
        { group: 'London', category: 'Jun.', value: 20.3 },
        { group: 'London', category: 'Jul.', value: 24 },
        { group: 'London', category: 'Aug.', value: 35.6 },
        { group: 'Berlin', category: 'Jan.', value: 12.4 },
        { group: 'Berlin', category: 'Feb.', value: 23.2 },
        { group: 'Berlin', category: 'Mar.', value: 34.5 },
        { group: 'Berlin', category: 'Apr.', value: 99.7 },
        { group: 'Berlin', category: 'May', value: 52.6 },
        { group: 'Berlin', category: 'Jun.', value: 35.5 },
        { group: 'Berlin', category: 'Jul.', value: 37.4 },
        { group: 'Berlin', category: 'Aug.', value: 42.4 },
      ],
      group: true,
      axisXTitle: 'Month',
      axisYTitle: 'Temperature',
      theme: 'dark',
      style: {
        backgroundColor: 'transparent',
        palette: PALETTE,
      },
    });

    expect(vis.toBuffer()).toImageEqual('__tests__/snapshot', 'column-grouped-custom-style');
    vis.destroy();
  });
  it('column-data-no-group-grouped', async () => {
    const vis = await render({
      width: 600,
      height: 400,
      type: 'column',
      data: [
        { category: 'Sports', value: 275 },
        { category: 'Strategy', value: 115 },
        { category: 'Action', value: 120 },
        { category: 'Shooter', value: 350 },
        { category: 'Other', value: 150 },
      ],
      axisXTitle: 'Type',
      axisYTitle: 'Sold',
      group: true,
    });

    expect(vis.toBuffer()).toImageEqual('__tests__/snapshot', 'column-data-no-group-grouped');
    vis.destroy();
  });

  it('column-data-no-group-stacked', async () => {
    const vis = await render({
      width: 600,
      height: 400,
      type: 'column',
      data: [
        { category: 'Sports', value: 275 },
        { category: 'Strategy', value: 115 },
        { category: 'Action', value: 120 },
        { category: 'Shooter', value: 350 },
        { category: 'Other', value: 150 },
      ],
      axisXTitle: 'Type',
      axisYTitle: 'Sold',
      group: true,
    });

    expect(vis.toBuffer()).toImageEqual('__tests__/snapshot', 'column-data-no-group-stacked');
    vis.destroy();
  });

  it('column-start-at-zero', async () => {
    const vis = await render({
      width: 600,
      height: 400,
      type: 'column',
      data: [
        { category: 'Sports', value: 275 },
        { category: 'Strategy', value: 215 },
        { category: 'Action', value: 220 },
        { category: 'Shooter', value: 350 },
        { category: 'Other', value: 250 },
      ],
      axisXTitle: 'Type',
      axisYTitle: 'Sold',
      style: {
        startAtZero: true,
      },
    });

    expect(vis.toBuffer()).toImageEqual('__tests__/snapshot', 'column-start-at-zero');
    vis.destroy();
  });
});
