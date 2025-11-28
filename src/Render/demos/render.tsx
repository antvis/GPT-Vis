import { render, type Spec } from '@antv/gpt-vis';
import React, { useEffect } from 'react';

export default () => {
  const spec = {
    type: 'area',
    data: [
      { time: '2018', value: 91.9 },
      { time: '2019', value: 99.1 },
      { time: '2020', value: 101.6 },
      { time: '2021', value: 114.4 },
      { time: '2022', value: 121 },
    ],
  };
  useEffect(() => {
    render('#chart', spec as Spec);
  }, [spec]);

  return <div id="chart"></div>;
};
