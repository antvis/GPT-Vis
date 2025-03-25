import { Histogram } from '@antv/gpt-vis';
import React from 'react';

const data = [
  1.2, 3.4, 3.7, 4.3, 5.2, 5.8, 6.1, 6.5, 6.8, 7.1, 7.3, 7.7, 8.3, 8.6, 8.8, 9.1, 9.2, 9.4, 9.5,
  9.7, 10.5, 10.7, 10.8, 11, 11, 11.1, 11.2, 11.3, 11.4, 11.4, 11.7, 12, 12.9, 12.9, 13.3, 13.7,
  13.8, 13.9, 14, 14.2, 14.5, 15, 15.2, 15.6, 16, 16.3, 17.3, 17.5, 17.9, 18, 18, 20.6, 21, 23.4,
];

export default () => {
  return (
    <Histogram
      title="一些列数据的直方图分布"
      data={data}
      binNumber={10}
      axisXTitle="range"
      axisYTitle="count"
      containerStyle={{ height: 300 }}
    />
  );
};
