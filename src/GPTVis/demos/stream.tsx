import { XStream } from '@ant-design/x';
import { GPTVis } from '@antv/gpt-vis';
import { Button, Card } from 'antd';
import React, { useMemo, useState } from 'react';

/* ---------- 1. 模拟 SSE 流 ---------- */
const raw = [
  { time: 2013, value: 59.3 },
  { time: 2014, value: 64.4 },
  { time: 2015, value: 68.9 },
  { time: 2016, value: 74.4 },
  { time: 2017, value: 82.7 },
  { time: 2018, value: 91.9 },
  { time: 2019, value: 99.1 },
  { time: 2020, value: 101.6 },
  { time: 2021, value: 114.4 },
  { time: 2022, value: 121 },
];

function mockSSEStream() {
  const encoder = new TextEncoder();
  const chunks = raw.map((o) => `event:chart\ndata:${JSON.stringify(o)}\n\n`);
  return new ReadableStream<Uint8Array>({
    async start(ctrl) {
      for (const c of chunks) {
        await new Promise((r) => setTimeout(r, 200)); // 200 ms 一条
        ctrl.enqueue(encoder.encode(c));
      }
      ctrl.close();
    },
  });
}

/* ---------- 2. React 组件 ---------- */
export default function App() {
  const [list, setList] = useState<Array<{ time: number; value: number }>>([]);

  /* 点击按钮开始消费流 */
  const startStream = async () => {
    setList([]); // 清空旧数据
    for await (const msg of XStream({ readableStream: mockSSEStream() })) {
      if (msg.event === 'chart') {
        const row = JSON.parse(msg.data);
        setList((prev) => [...prev, row]);
      }
    }
  };

  /* 组装 GPT-Vis 需要的 spec */
  const spec = useMemo(
    () => ({
      type: 'line',
      data: list,
    }),
    [list],
  );

  return (
    <div style={{ padding: 48 }}>
      <Card
        title="XStream + GPT-Vis 实时线图"
        extra={
          <Button type="primary" onClick={startStream}>
            开始流式渲染
          </Button>
        }
      >
        {/* GPTVis 会自动识别 spec 并绘图 */}
        <GPTVis>{`\`\`\`vis-chart\n${JSON.stringify(spec)}\n\`\`\``}</GPTVis>
      </Card>
    </div>
  );
}
