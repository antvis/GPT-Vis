import { Radar } from '@antv/gpt-vis';
import React from 'react';

const data = [
  { name: '沟通能力', value: 2 },
  { name: '协作能力', value: 3 },
  { name: '领导能力', value: 2 },
  { name: '学习能力', value: 5 },
  { name: '创新能力', value: 6 },
  { name: '技术能力', value: 9 },
];

export default () => {
  return <Radar data={data} containerStyle={{ height: 300 }} />;
};
