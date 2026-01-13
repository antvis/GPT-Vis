import { Pie } from '@antv/gpt-vis';
import React, { useState } from 'react';

export default () => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          marginBottom: '16px',
          padding: '8px 16px',
          cursor: 'pointer',
          border: '1px solid #d9d9d9',
          borderRadius: '4px',
          backgroundColor: '#fff',
          fontSize: '14px',
        }}
      >
        {isExpanded ? '收起' : '展开'}
      </button>
      <div
        style={{
          width: isExpanded ? '100%' : '50%',
          transition: 'height 0.3s ease',
          border: '1px solid #e8e8e8',
          borderRadius: '4px',
          padding: '16px',
          boxSizing: 'border-box',
        }}
      >
        <pre>
          <div>
            <div>
              <Pie
                data={[
                  { category: '分类一', value: 27 },
                  { category: '分类二', value: 25 },
                  { category: '分类三', value: 18 },
                  { category: '分类四', value: 15 },
                  { category: '分类五', value: 10 },
                  { category: '其他', value: 5 },
                ]}
              ></Pie>
            </div>
          </div>
        </pre>
      </div>
      <p style={{ marginTop: '16px', color: '#666', fontSize: '13px' }}>
        点击按钮切换容器高度，图表会自动适应容器大小
      </p>
    </div>
  );
};
