import { Funnel } from '@antv/gpt-vis';
import React from 'react';

const data = [
  { type: '浏览网站', value: 50000 },
  { type: '放入购物车', value: 35000 },
  { type: '生成订单', value: 25000 },
  { type: '支付订单', value: 15000 },
  { type: '完成交易', value: 8000 },
];

export default () => {
  return <Funnel data={data} containerStyle={{ height: 600 }} />;
};
