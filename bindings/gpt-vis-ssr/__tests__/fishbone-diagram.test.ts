import { render } from '../src';
import './utils/matcher';

describe('SSR render', () => {
  it('fishbone-diagram', async () => {
    const vis = await render({
      width: 600,
      height: 400,
      type: 'fishbone-diagram',
      data: {
        name: '生产效率低',
        children: [
          {
            name: '设备问题',
            children: [{ name: '设备老化' }, { name: '维护不及时' }],
          },
          {
            name: '员工问题',
            children: [{ name: '技能不足' }, { name: '工作态度差' }],
          },
          {
            name: '流程问题',
            children: [{ name: '流程繁琐' }, { name: '缺乏标准化' }],
          },
        ],
      },
    });

    expect(vis.toBuffer()).toImageEqual('__tests__/snapshot', 'fishbone-diagram');
  });
});
