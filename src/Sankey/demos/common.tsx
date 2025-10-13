import { Sankey } from '@antv/gpt-vis';
import { Form, Input, Select } from 'antd';
import React, { useState } from 'react';

const data = [
  { source: "Agricultural 'waste'", target: 'Bio-conversion', value: 124.729 },
  { source: 'Bio-conversion', target: 'Liquid', value: 0.597 },
  { source: 'Bio-conversion', target: 'Losses', value: 26.862 },
  { source: 'Bio-conversion', target: 'Solid', value: 280.322 },
  { source: 'Bio-conversion', target: 'Gas', value: 81.144 },
  { source: 'Biofuel imports', target: 'Liquid', value: 35 },
  { source: 'Biomass imports', target: 'Solid', value: 35 },
  { source: 'Coal imports', target: 'Coal', value: 11.606 },
  { source: 'Coal reserves', target: 'Coal', value: 63.965 },
  { source: 'Coal', target: 'Solid', value: 75.571 },
  { source: 'District heating', target: 'Industry', value: 10.639 },
  { source: 'District heating', target: 'Heating and cooling - commercial', value: 22.505 },
  { source: 'District heating', target: 'Heating and cooling - homes', value: 46.184 },
  { source: 'Electricity grid', target: 'Over generation / exports', value: 104.453 },
  { source: 'Electricity grid', target: 'Heating and cooling - homes', value: 113.726 },
  { source: 'Electricity grid', target: 'H2 conversion', value: 27.14 },
  { source: 'Electricity grid', target: 'Industry', value: 342.165 },
  { source: 'Electricity grid', target: 'Road transport', value: 37.797 },
  { source: 'Electricity grid', target: 'Agriculture', value: 4.412 },
  { source: 'Electricity grid', target: 'Heating and cooling - commercial', value: 40.858 },
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
    lineWidth: number;
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
      <Sankey
        data={data}
        title="Sankey Chart Example"
        theme={theme}
        style={{ backgroundColor, palette }}
      />
    </div>
  );
};
