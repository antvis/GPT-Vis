import { Column } from '@antv/gpt-vis';
import React from 'react';

const data = [
  { type: '1-3秒', value: 0.16 },
  { type: '4-10秒', value: 0.125 },
  { type: '11-30秒', value: 0.24 },
  { type: '31-60秒', value: 0.19 },
  { type: '1-3分', value: 0.22 },
  { type: '3-10分', value: 0.05 },
  { type: '10-30分', value: 0.01 },
  { type: '30+分', value: 0.015 },
];

export default () => {
  return (
    <Column
      data={data}
      xField="type"
      yField="value"
      axisXTitle="type"
      axisYTitle="value"
      containerStyle={{ height: 300 }}
    />
  );
};
