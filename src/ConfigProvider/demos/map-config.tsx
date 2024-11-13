import { ConfigProvider, GPTVis } from '@antv/gpt-vis';
import React from 'react';

const content = `
  ~~~vis-chart
  {
    "type": "pin-map",
    "data": [
      {
        "longitude": 120.210792,
        "latitude": 30.246026,
        "label": "杭州"
      },
      {
        "longitude": 121.473667,
        "latitude": 31.230525,
        "label": "上海"
      },
      {
        "longitude": 120.585294,
        "latitude": 31.299758,
        "label": "苏州"
      },
      {
        "longitude": 118.796624,
        "latitude": 32.059344,
        "label": "南京"
      }
    ]
  }
~~~`;

export default () => (
  <ConfigProvider
    map={{ style: 'dark', token: '你的地图token' }}
    components={{
      PinMap: {
        markerStyle: {
          iconPath:
            'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*oxcETa4MKgwAAAAAAAAAAAAADmJ7AQ/original',
        },
      },
    }}
  >
    <GPTVis>{content}</GPTVis>
  </ConfigProvider>
);
