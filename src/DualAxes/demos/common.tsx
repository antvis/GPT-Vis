import type { DualAxesProps } from '@antv/gpt-vis';
import { DualAxes } from '@antv/gpt-vis';
import { Select } from 'antd';
import React, { useState } from 'react';

const config: DualAxesProps = {
  categories: [
    '2020-08-20',
    '2020-08-21',
    '2020-08-22',
    '2020-08-23',
    '2020-08-24',
    '2020-08-25',
    '2020-08-26',
    '2020-08-27',
    '2020-08-28',
    '2020-08-29',
    '2020-08-30',
    '2020-08-31',
    '2020-09-01',
    '2020-09-02',
    '2020-09-03',
    '2020-09-04',
    '2020-09-05',
    '2020-09-06',
    '2020-09-07',
    '2020-09-08',
    '2020-09-09',
    '2020-09-10',
    '2020-09-11',
    '2020-09-12',
    '2020-09-13',
    '2020-09-14',
    '2020-09-15',
    '2020-09-16',
    '2020-09-17',
    '2020-09-18',
  ],
  series: [
    {
      type: 'column',
      data: [
        10868, 8786, 10824, 7860, 13253, 17015, 19298, 13937, 11541, 15244, 14247, 9402, 10440,
        9345, 18459, 9763, 11074, 11770, 12206, 11434, 16218, 11914, 16781, 10555, 10899, 10713, 0,
        0, 20357, 10424,
      ],
      axisYTitle: '消耗时间',
    },
    {
      type: 'line',
      data: [
        649.483, 1053.7, 679.817, 638.117, 843.3, 1092.983, 1036.317, 1031.9, 803.467, 830.733,
        709.867, 665.233, 696.367, 692.867, 936.017, 782.867, 653.8, 856.683, 777.15, 773.283,
        833.3, 793.517, 894.45, 725.55, 709.967, 787.6, 644.183, 1066.65, 932.45, 753.583,
      ],
      axisYTitle: '完成时间',
    },
  ],
};
const themes = ['default', 'academy', 'dark'] as const;

export default () => {
  const [theme, setTheme] = useState<'default' | 'academy' | 'dark'>('default');

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <label htmlFor="theme-select" style={{ marginRight: 8, fontSize: '14px' }}>
          Theme:
        </label>
        <Select
          id="theme-select"
          value={theme}
          onChange={(value) => setTheme(value)}
          style={{ width: 120 }}
          options={themes.map((t) => ({
            label: t,
            value: t,
          }))}
        />
      </div>
      <DualAxes {...config} theme={theme} />;
    </div>
  );
};
