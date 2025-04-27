import { render } from '../src';
import './utils/matcher';

describe('SSR render', () => {
  it('radar', async () => {
    const vis = await render({
      width: 600,
      height: 400,
      type: 'radar',
      data: [
        { name: '沟通能力', value: 2 },
        { name: '协作能力', value: 3 },
        { name: '领导能力', value: 2 },
        { name: '学习能力', value: 5 },
        { name: '创新能力', value: 6 },
        { name: '技术能力', value: 9 },
      ],
    });

    expect(vis.toBuffer()).toImageEqual('__tests__/snapshot', 'radar');
  });

  it('radar-grouped', async () => {
    const vis = await render({
      width: 600,
      height: 400,
      type: 'radar',
      data: [
        { name: 'Design', group: 'a', value: 70 },
        { name: 'Design', group: 'b', value: 30 },
        { name: 'Development', group: 'a', value: 60 },
        { name: 'Development', group: 'b', value: 70 },
        { name: 'Marketing', group: 'a', value: 50 },
        { name: 'Marketing', group: 'b', value: 60 },
        { name: 'Users', group: 'a', value: 40 },
        { name: 'Users', group: 'b', value: 50 },
        { name: 'Test', group: 'a', value: 60 },
        { name: 'Test', group: 'b', value: 70 },
        { name: 'Language', group: 'a', value: 70 },
        { name: 'Language', group: 'b', value: 50 },
        { name: 'Technology', group: 'a', value: 50 },
        { name: 'Technology', group: 'b', value: 40 },
        { name: 'Support', group: 'a', value: 30 },
        { name: 'Support', group: 'b', value: 40 },
        { name: 'Sales', group: 'a', value: 60 },
        { name: 'Sales', group: 'b', value: 40 },
        { name: 'UX', group: 'a', value: 50 },
        { name: 'UX', group: 'b', value: 60 },
      ],
      group: true,
    });

    expect(vis.toBuffer()).toImageEqual('__tests__/snapshot', 'radar-grouped');
  });
});
