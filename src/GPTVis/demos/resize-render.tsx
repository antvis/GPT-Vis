import { GPTVis } from '@antv/gpt-vis';
import React, { useEffect, useState } from 'react';

const chartContent = `

以下是数据的可视化分析：

\`\`\`vis-chart
{
  "type": "flow-diagram",
  "data": {
    "nodes": [
      { "name": "客户下单" },
      { "name": "系统生成订单" },
      { "name": "仓库拣货" },
      { "name": "仓库打包" },
      { "name": "物流配送" },
      { "name": "客户收货" }
    ],
    "edges": [
      { "source": "客户下单", "target": "系统生成订单" },
      { "source": "系统生成订单", "target": "仓库拣货" },
      { "source": "仓库拣货", "target": "仓库打包" },
      { "source": "仓库打包", "target": "物流配送" },
      { "source": "物流配送", "target": "客户收货" }
    ]
  }
}
\`\`\`

\`\`\`vis-chart
{
  "type": "line",
  "title": "月度销售趋势",
  "data": [
    { "time": "1月", "value": 3000 },
    { "time": "2月", "value": 4500 },
    { "time": "3月", "value": 3800 },
    { "time": "4月", "value": 5200 },
    { "time": "5月", "value": 6100 }
  ]
}
\`\`\`

\`\`\`vis-chart
{
  "type": "pie",
  "title": "产品类型分布",
  "data": [
    { "category": "电子产品", "value": 45 },
    { "category": "服装", "value": 30 },
    { "category": "食品", "value": 15 },
    { "category": "其他", "value": 10 }
  ]
}
\`\`\`


`;

export default () => {
  const [containerReady, setContainerReady] = useState(false);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setContainerReady(true);
      setContainerSize({ width: 800, height: 600 });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>模拟场景：图表根据容器 resize 渲染</h2>

      <div
        style={{
          marginBottom: '20px',
          padding: '10px',
          background: '#fff3cd',
          borderRadius: '4px',
        }}
      >
        <strong>⚠️场景模拟：</strong>
        <ul style={{ margin: '10px 0', paddingLeft: '20px' }}>
          <li>图表宽度根据容器尺寸变化</li>
        </ul>
        <div style={{ marginTop: '10px' }}>
          容器状态: {containerReady ? '✅ 已就绪' : '⏳ 初始化中...'}
          {containerReady && ` (${containerSize.width}x${containerSize.height})`}
        </div>
        <div style={{ marginTop: '10px', display: 'flex', gap: 8 }}>
          <button
            onClick={() => setIsCollapsed(false)}
            style={{
              padding: '6px 10px',
              borderRadius: 4,
              border: '1px solid #d9d9d9',
              background: '#fff',
            }}
          >
            展开（100%）
          </button>
          <button
            onClick={() => setIsCollapsed(true)}
            style={{
              padding: '6px 10px',
              borderRadius: 4,
              border: '1px solid #d9d9d9',
              background: '#fff',
            }}
          >
            收起（50%）
          </button>
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <div
          style={{
            border: '2px dashed #ff4d4f',
            padding: '10px',
            minHeight: '200px',
            background: '#fff',
            width: containerReady
              ? `${Math.round(containerSize.width * (isCollapsed ? 0.5 : 1))}px`
              : 'auto',
            transition: 'width 0.3s',
          }}
        >
          <GPTVis>{chartContent}</GPTVis>
        </div>
      </div>
    </div>
  );
};
