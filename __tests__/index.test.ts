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
    // @ts-ignore
    graph.exportToFile(join(__dirname, './assets/fishbone-diagram'));
  });
});
