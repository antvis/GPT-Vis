import { render } from '../src';
import { PALETTE } from './constant';
import './utils/matcher';

describe('SSR render', () => {
  it('line', async () => {
    const vis = await render({
      width: 600,
      height: 400,
      type: 'line',
      data: [
        { time: '1991', value: 3 },
        { time: '1992', value: 4 },
        { time: '1993', value: 3.5 },
        { time: '1994', value: 5 },
        { time: '1995', value: 4.9 },
        { time: '1996', value: 6 },
        { time: '1997', value: 7 },
        { time: '1998', value: 9 },
        { time: '1999', value: 13 },
      ],
      axisXTitle: 'Time',
      axisYTitle: 'Value',
    });

    expect(vis.toBuffer()).toImageEqual('__tests__/snapshot', 'line');
  });

  it('line-required', async () => {
    const vis = await render({
      type: 'line',
      data: [
        { time: '1991', value: 3 },
        { time: '1992', value: 4 },
        { time: '1993', value: 3.5 },
        { time: '1994', value: 5 },
        { time: '1995', value: 4.9 },
        { time: '1996', value: 6 },
        { time: '1997', value: 7 },
        { time: '1998', value: 9 },
        { time: '1999', value: 13 },
      ],
    });

    expect(vis.toBuffer()).toImageEqual('__tests__/snapshot', 'line-required');
  });

  it('line-rough', async () => {
    const vis = await render({
      width: 600,
      height: 400,
      type: 'line',
      texture: 'rough',
      data: [
        { time: '1991', value: 3 },
        { time: '1992', value: 4 },
        { time: '1993', value: 3.5 },
        { time: '1994', value: 5 },
        { time: '1995', value: 4.9 },
        { time: '1996', value: 6 },
        { time: '1997', value: 7 },
        { time: '1998', value: 9 },
        { time: '1999', value: 13 },
      ],
      axisXTitle: 'Time',
      axisYTitle: 'Value',
    });

    expect(vis.toBuffer()).toImageEqual('__tests__/snapshot', 'line-rough');
  });

  it('line-grouped', async () => {
    const vis = await render({
      width: 600,
      height: 400,
      type: 'line',
      data: [
        { time: 'Jan', group: 'Tokyo', value: 7 },
        { time: 'Jan', group: 'London', value: 3.9 },
        { time: 'Feb', group: 'Tokyo', value: 6.9 },
        { time: 'Feb', group: 'London', value: 4.2 },
        { time: 'Mar', group: 'Tokyo', value: 9.5 },
        { time: 'Mar', group: 'London', value: 5.7 },
        { time: 'Apr', group: 'Tokyo', value: 14.5 },
        { time: 'Apr', group: 'London', value: 8.5 },
        { time: 'May', group: 'Tokyo', value: 18.4 },
        { time: 'May', group: 'London', value: 11.9 },
        { time: 'Jun', group: 'Tokyo', value: 21.5 },
        { time: 'Jun', group: 'London', value: 15.2 },
        { time: 'Jul', group: 'Tokyo', value: 25.2 },
        { time: 'Jul', group: 'London', value: 17 },
        { time: 'Aug', group: 'Tokyo', value: 26.5 },
        { time: 'Aug', group: 'London', value: 16.6 },
        { time: 'Sep', group: 'Tokyo', value: 23.3 },
        { time: 'Sep', group: 'London', value: 14.2 },
        { time: 'Oct', group: 'Tokyo', value: 18.3 },
        { time: 'Oct', group: 'London', value: 10.3 },
        { time: 'Nov', group: 'Tokyo', value: 13.9 },
        { time: 'Nov', group: 'London', value: 6.6 },
        { time: 'Dec', group: 'Tokyo', value: 9.6 },
        { time: 'Dec', group: 'London', value: 4.8 },
      ],
      group: true,
      axisXTitle: 'Month',
      axisYTitle: 'Temperature',
      style: {
        backgroundColor: '#aaa',
        lineWidth: 4,
        palette: PALETTE,
      },
    });

    expect(vis.toBuffer()).toImageEqual('__tests__/snapshot', 'line-grouped');
  });

  it('line-grouped-academy', async () => {
    const vis = await render({
      width: 600,
      height: 400,
      type: 'line',
      theme: 'academy',
      data: [
        { time: 'Jan', group: 'Tokyo', value: 7 },
        { time: 'Jan', group: 'London', value: 3.9 },
        { time: 'Feb', group: 'Tokyo', value: 6.9 },
        { time: 'Feb', group: 'London', value: 4.2 },
        { time: 'Mar', group: 'Tokyo', value: 9.5 },
        { time: 'Mar', group: 'London', value: 5.7 },
        { time: 'Apr', group: 'Tokyo', value: 14.5 },
        { time: 'Apr', group: 'London', value: 8.5 },
        { time: 'May', group: 'Tokyo', value: 18.4 },
        { time: 'May', group: 'London', value: 11.9 },
        { time: 'Jun', group: 'Tokyo', value: 21.5 },
        { time: 'Jun', group: 'London', value: 15.2 },
        { time: 'Jul', group: 'Tokyo', value: 25.2 },
        { time: 'Jul', group: 'London', value: 17 },
        { time: 'Aug', group: 'Tokyo', value: 26.5 },
        { time: 'Aug', group: 'London', value: 16.6 },
        { time: 'Sep', group: 'Tokyo', value: 23.3 },
        { time: 'Sep', group: 'London', value: 14.2 },
        { time: 'Oct', group: 'Tokyo', value: 18.3 },
        { time: 'Oct', group: 'London', value: 10.3 },
        { time: 'Nov', group: 'Tokyo', value: 13.9 },
        { time: 'Nov', group: 'London', value: 6.6 },
        { time: 'Dec', group: 'Tokyo', value: 9.6 },
        { time: 'Dec', group: 'London', value: 4.8 },
      ],
      group: true,
      axisXTitle: 'Month',
      axisYTitle: 'Temperature',
    });

    expect(vis.toBuffer()).toImageEqual('__tests__/snapshot', 'line-academy');
  });

  it('line-custom-style', async () => {
    const vis = await render({
      width: 600,
      height: 400,
      type: 'line',
      data: [
        { time: '1991', value: 3 },
        { time: '1992', value: 4 },
        { time: '1993', value: 3.5 },
        { time: '1994', value: 5 },
        { time: '1995', value: 4.9 },
        { time: '1996', value: 6 },
        { time: '1997', value: 7 },
        { time: '1998', value: 9 },
        { time: '1999', value: 13 },
      ],
      axisXTitle: 'Time',
      axisYTitle: 'Value',
      style: {
        backgroundColor: '#aaa',
        lineWidth: 4,
        palette: PALETTE,
      },
    });

    expect(vis.toBuffer()).toImageEqual('__tests__/snapshot', 'line-custom-style');
  });

  it('line-grouped-custom-style', async () => {
    const vis = await render({
      width: 600,
      height: 400,
      type: 'line',
      data: [
        { time: 'Jan', group: 'Tokyo', value: 7 },
        { time: 'Jan', group: 'London', value: 3.9 },
        { time: 'Feb', group: 'Tokyo', value: 6.9 },
        { time: 'Feb', group: 'London', value: 4.2 },
        { time: 'Mar', group: 'Tokyo', value: 9.5 },
        { time: 'Mar', group: 'London', value: 5.7 },
        { time: 'Apr', group: 'Tokyo', value: 14.5 },
        { time: 'Apr', group: 'London', value: 8.5 },
        { time: 'May', group: 'Tokyo', value: 18.4 },
        { time: 'May', group: 'London', value: 11.9 },
        { time: 'Jun', group: 'Tokyo', value: 21.5 },
        { time: 'Jun', group: 'London', value: 15.2 },
        { time: 'Jul', group: 'Tokyo', value: 25.2 },
        { time: 'Jul', group: 'London', value: 17 },
        { time: 'Aug', group: 'Tokyo', value: 26.5 },
        { time: 'Aug', group: 'London', value: 16.6 },
        { time: 'Sep', group: 'Tokyo', value: 23.3 },
        { time: 'Sep', group: 'London', value: 14.2 },
        { time: 'Oct', group: 'Tokyo', value: 18.3 },
        { time: 'Oct', group: 'London', value: 10.3 },
        { time: 'Nov', group: 'Tokyo', value: 13.9 },
        { time: 'Nov', group: 'London', value: 6.6 },
        { time: 'Dec', group: 'Tokyo', value: 9.6 },
        { time: 'Dec', group: 'London', value: 4.8 },
      ],
      group: true,
      axisXTitle: 'Month',
      axisYTitle: 'Temperature',
      theme: 'dark',
      style: {
        backgroundColor: 'transparent',
        lineWidth: 4,
        palette: PALETTE,
      },
    });

    expect(vis.toBuffer()).toImageEqual('__tests__/snapshot', 'line-grouped-custom-style');
  });
});
