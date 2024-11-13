import { ConfigProvider, GPTVis } from '@antv/gpt-vis';
import React from 'react';

const content = `
 ~~~vis-chart
{
  "type": "pie",
  "data": [
    { "category": "分类一", "value": 27 },
    { "category": "分类二", "value": 25 },
    { "category": "分类三", "value": 18 },
    { "category": "分类四", "value": 15 },
    { "category": "分类五", "value": 10 },
    { "category": "其他", "value": 5 }
  ]
}
~~~`;

const pieConfig = {
  legend: false,
  innerRadius: 0.6,
  style: {
    stroke: '#fff',
    inset: 1,
    radius: 10,
  },
};

export default () => (
  <ConfigProvider
    components={{
      Pie: pieConfig,
    }}
  >
    <GPTVis>{content}</GPTVis>
  </ConfigProvider>
);
