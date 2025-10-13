import { Histogram } from '@antv/gpt-vis';
import { Form, Input, Select } from 'antd';
import React, { useState } from 'react';

const data = [
  1.2, 3.4, 3.7, 4.3, 5.2, 5.8, 6.1, 6.5, 6.8, 7.1, 7.3, 7.7, 8.3, 8.6, 8.8, 9.1, 9.2, 9.4, 9.5,
  9.7, 10.5, 10.7, 10.8, 11, 11, 11.1, 11.2, 11.3, 11.4, 11.4, 11.7, 12, 12.9, 12.9, 13.3, 13.7,
  13.8, 13.9, 14, 14.2, 14.5, 15, 15.2, 15.6, 16, 16.3, 17.3, 17.5, 17.9, 18, 18, 20.6, 21, 23.4,
];

const themes = ['default', 'academy', 'dark'] as const;
export const PALETTE_1 = ['#8459fc', '#ff89bd', '#1677ff', '#00c2ff', '#ff9a00'];
export const PALETTE_2 = ['#1B9E77', '#D95F02', '#7570B3', '#E7298A', '#66A61E'];
export const PALETTE_3 = ['#7593ed', '#95e3b0', '#6c7893', '#e7c450', '#7460eb'];

export default () => {
  const [theme, setTheme] = useState<'default' | 'academy' | 'dark'>('default');
  const [backgroundColor, setBackgroundColor] = useState<string>('');
  const [palette, setPalette] = useState<string[]>([]);

  const onValuesChange = (changedValues: {
    theme: 'default' | 'academy' | 'dark';
    backgroundColor: string;
    palette: string[];
  }) => {
    if (changedValues.theme) {
      setTheme(changedValues.theme);
      setPalette([]);
    }
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
        key={theme}
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
                label: `色板1: ${PALETTE_1.join(', ')}`,
                value: JSON.stringify(PALETTE_1),
              },
              {
                label: `色板2: ${PALETTE_2.join(', ')}`,
                value: JSON.stringify(PALETTE_2),
              },
              {
                label: `色板3: ${PALETTE_3.join(', ')}`,
                value: JSON.stringify(PALETTE_3),
              },
            ]}
            allowClear
          />
        </Form.Item>
      </Form>
      <Histogram
        title="一些列数据的直方图分布"
        data={data}
        binNumber={10}
        axisXTitle="range"
        axisYTitle="count"
        containerStyle={{ height: 300 }}
        theme={theme}
        style={{
          backgroundColor,
          palette,
        }}
      />
    </div>
  );
};
