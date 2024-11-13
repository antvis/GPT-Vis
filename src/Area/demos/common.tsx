import { Area } from '@antv/gpt-vis';
import React from 'react';

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

export default () => {
  return (
    <Area data={data} axisXTitle="year" axisYTitle="growth" containerStyle={{ height: 300 }} />
  );
};
