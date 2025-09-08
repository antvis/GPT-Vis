import type { DualAxesProps } from '@antv/gpt-vis';
import { DualAxes } from '@antv/gpt-vis';
import { Form, Input, Select } from 'antd';
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
export const PALETTE = [
  '#8459fc',
  '#ff89bd',
  '#1677ff',
  '#00c2ff',
  '#ff9a00',
  '#f2cc2e',
  '#7587dc',
  '#bd80fa',
];

export const DEFAULT_COLOR_PALETTE = [
  '#1783FF',
  '#F08F56',
  '#D580FF',
  '#00C9C9',
  '#7863FF',
  '#DB9D0D',
  '#60C42D',
  '#FF80CA',
  '#2491B3',
  '#17C76F',
];

export const ACADEMY_COLOR_PALETTE = [
  '#4e79a7',
  '#f28e2c',
  '#e15759',
  '#76b7b2',
  '#59a14f',
  '#edc949',
  '#af7aa1',
  '#ff9da7',
  '#9c755f',
  '#bab0ab',
];

export default () => {
  const [theme, setTheme] = useState<'default' | 'academy' | 'dark'>('default');
  const [backgroundColor, setBackgroundColor] = useState<string>('');
  const [palette, setPalette] = useState<string[]>([]);

  const onValuesChange = (changedValues: {
    theme: 'default' | 'academy' | 'dark';
    lineWidth: number;
    backgroundColor: string;
    palette: string[];
  }) => {
    if (changedValues.theme) setTheme(changedValues.theme);
    if (changedValues.backgroundColor !== undefined)
      setBackgroundColor(changedValues.backgroundColor);
    if (changedValues.palette !== undefined) {
      let newPalette = changedValues.palette;
      if (typeof newPalette === 'string') {
        try {
          newPalette = JSON.parse(newPalette);
        } catch {
          newPalette = [];
        }
      }
      setPalette(Array.isArray(newPalette) ? newPalette : []);
    } else {
      setPalette([]);
    }
  };

  return (
    <div>
      <Form
        layout="inline"
        style={{ marginBottom: 12 }}
        initialValues={{ theme, backgroundColor, palette }}
        onValuesChange={onValuesChange}
      >
        <Form.Item label="Theme" name="theme" style={{ marginBottom: 6 }}>
          <Select style={{ width: 120 }} options={themes.map((t) => ({ label: t, value: t }))} />
        </Form.Item>
        <Form.Item
          label="Background"
          name="backgroundColor"
          rules={[
            {
              pattern: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
              message: '请输入有效的色值编码，例如 #fff 或 #ffffff',
            },
          ]}
          style={{ marginBottom: 6 }}
        >
          <Input placeholder="#ffffff" style={{ width: 120 }} />
        </Form.Item>
        <Form.Item label="Palette" name="palette" style={{ marginBottom: 6 }}>
          <Select
            placeholder="选择调色板"
            style={{ width: 200 }}
            options={[
              {
                label: `默认调色板: ${DEFAULT_COLOR_PALETTE.join(', ')}`,
                value: JSON.stringify(DEFAULT_COLOR_PALETTE),
              },
              {
                label: `学术风格调色板: ${ACADEMY_COLOR_PALETTE.join(', ')}`,
                value: JSON.stringify(ACADEMY_COLOR_PALETTE),
              },
              { label: `内置调色板: ${PALETTE.join(', ')}`, value: JSON.stringify(PALETTE) },
            ]}
            allowClear
          />
        </Form.Item>
      </Form>
      <DualAxes
        {...config}
        theme={theme}
        style={{
          backgroundColor,
          palette,
        }}
      />
    </div>
  );
};
