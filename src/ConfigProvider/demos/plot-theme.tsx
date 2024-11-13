import { ConfigProvider, GPTVis } from '@antv/gpt-vis';
import React from 'react';

const content = `
 ~~~vis-chart
{
  "type": "line",
  "data": [
    { "time": "2015 年", "value": 1700, "group": "出生人口" },
    { "time": "2015 年", "value": 965, "group": "死亡人口" },
    { "time": "2016 年", "value": 1500, "group": "出生人口" },
    { "time": "2016 年", "value": 846, "group": "死亡人口" },
    { "time": "2017 年", "value": 1200, "group": "出生人口" },
    { "time": "2017 年", "value": 782, "group": "死亡人口" },
    { "time": "2018 年", "value": 1250, "group": "出生人口" },
    { "time": "2018 年", "value": 762, "group": "死亡人口" },
    { "time": "2019 年", "value": 1290, "group": "出生人口" },
    { "time": "2019 年", "value": 862, "group": "死亡人口" },
    { "time": "2020 年", "value": 1100, "group": "出生人口" },
    { "time": "2020 年", "value": 962, "group": "死亡人口" }
  ],
  "axisXTitle": "year",
  "axisYTitle": "count"
}
~~~`;

export default () => (
  <ConfigProvider plot={{ theme: { type: 'academy' } }}>
    <GPTVis>{content}</GPTVis>
  </ConfigProvider>
);
