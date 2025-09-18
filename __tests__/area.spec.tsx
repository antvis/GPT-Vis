import { Area } from '@antv/gpt-vis';
import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';
import { Buffer } from 'buffer';
import React from 'react';
import './utils/matcher';

describe('Area 图片回归', () => {
  it('生成快照并与基准图比对', async () => {
    const data = [
      { time: '1991', value: 3 },
      { time: '1992', value: 4 },
      { time: '1993', value: 3.5 },
      { time: '1994', value: 5 },
      { time: '1995', value: 4.9 },
      { time: '1996', value: 6 },
      { time: '1997', value: 7 },
      { time: '1998', value: 9 },
      { time: '1999', value: 13 },
    ];

    const { container } = render(<Area data={data} width={600} height={400} />);

    // 等 G2 渲染完成（G2 4.x 内部异步）
    await waitFor(() => {
      const canvas = container.querySelector('canvas') as HTMLCanvasElement;
      expect(canvas).not.toBeNull();
      expect(canvas).toBeInTheDocument();
      expect(canvas.width).toBe(600);
    });

    const canvas = container.querySelector('canvas') as HTMLCanvasElement;
    // 生成 base64
    const dataURL = canvas.toDataURL('image/png'); // "data:image/png;base64,..."
    const imgBuffer = Buffer.from(dataURL.split(',')[1], 'base64');

    // 核心：与基准图比对
    expect(imgBuffer).toImageEqual('__tests__/snapshot', 'area');
  });
});
