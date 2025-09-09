import { Treemap } from '@antv/gpt-vis';
import { Form, Input, Select } from 'antd';
import React, { useState } from 'react';

const data = [
  { name: '分类 1', value: 560 },
  { name: '分类 2', value: 500 },
  { name: '分类 3', value: 150 },
  { name: '分类 4', value: 140 },
  { name: '分类 5', value: 115 },
  { name: '分类 6', value: 95 },
  { name: '分类 7', value: 90 },
  { name: '分类 8', value: 75 },
  { name: '分类 9', value: 98 },
  { name: '分类 10', value: 60 },
  { name: '分类 11', value: 45 },
  { name: '分类 12', value: 40 },
  { name: '分类 13', value: 40 },
  { name: '分类 14', value: 35 },
  { name: '分类 15', value: 40 },
  { name: '分类 16', value: 40 },
  { name: '分类 17', value: 40 },
  { name: '分类 18', value: 30 },
  { name: '分类 19', value: 28 },
  { name: '分类 20', value: 16 },
];

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
  const [form] = Form.useForm();
  const [theme, setTheme] = useState<'default' | 'academy' | 'dark'>('default');
  const [backgroundColor, setBackgroundColor] = useState<string>('');
  const [palette, setPalette] = useState<string[]>([]);

  const onValuesChange = (changedValues: {
    theme?: 'default' | 'academy' | 'dark';
    backgroundColor?: string;
    palette?: string[];
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
    }
  };

  return (
    <div>
      <Form
        form={form}
        layout="inline"
        initialValues={{ theme, backgroundColor, palette }}
        onValuesChange={(_, values) => onValuesChange(values)}
        style={{ marginBottom: 16 }}
      >
        <Form.Item label="Theme" name="theme" style={{ marginBottom: 6 }}>
          <Select
            style={{ width: 120 }}
            options={themes.map((t) => ({
              label: t,
              value: t,
            }))}
          />
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
      <Treemap
        data={data}
        theme={theme}
        style={{
          backgroundColor,
          palette,
        }}
      />
    </div>
  );
};
