import { Radar } from '@antv/gpt-vis';
import { Form, Input, Select } from 'antd';
import React, { useState } from 'react';

const data = [
  { name: '沟通能力', value: 2 },
  { name: '协作能力', value: 3 },
  { name: '领导能力', value: 2 },
  { name: '学习能力', value: 5 },
  { name: '创新能力', value: 6 },
  { name: '技术能力', value: 9 },
];

const themes = ['default', 'academy', 'dark'] as const;
export const PALETTE_1 = ['#8459fc', '#ff89bd', '#1677ff', '#00c2ff', '#ff9a00'];
export const PALETTE_2 = ['#1B9E77', '#D95F02', '#7570B3', '#E7298A', '#66A61E'];
export const PALETTE_3 = ['#7593ed', '#95e3b0', '#6c7893', '#e7c450', '#7460eb'];

export default () => {
  const [theme, setTheme] = useState<'default' | 'academy' | 'dark'>('default');
  const [lineWidth, setLineWidth] = useState<number>(2);
  const [backgroundColor, setBackgroundColor] = useState<string>('');
  const [palette, setPalette] = useState<string[]>([]);

  const onValuesChange = (changedValues: {
    theme: 'default' | 'academy' | 'dark';
    lineWidth: number;
    backgroundColor: string;
    palette: string[];
  }) => {
    if (changedValues.theme) {
      setTheme(changedValues.theme);
      setPalette([]);
    }
    if (changedValues.lineWidth) setLineWidth(Number(changedValues.lineWidth));
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
        initialValues={{ theme, lineWidth, backgroundColor, palette }}
        key={theme}
        onValuesChange={onValuesChange}
      >
        <Form.Item label="Theme" name="theme" style={{ marginBottom: 6 }}>
          <Select style={{ width: 120 }} options={themes.map((t) => ({ label: t, value: t }))} />
        </Form.Item>
        <Form.Item label="Line Width" name="lineWidth" style={{ marginBottom: 6 }}>
          <Input type="number" min={1} max={10} style={{ width: 80 }} />
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
      <Radar
        data={data}
        containerStyle={{ height: 300 }}
        theme={theme}
        style={{ backgroundColor, palette, lineWidth }}
      />
    </div>
  );
};
