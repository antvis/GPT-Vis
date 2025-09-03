import { Line } from '@antv/gpt-vis';
import { Form, Input, Select } from 'antd';
import React, { useState } from 'react';

const data = [
  { time: '1991', value: 3 },
  { time: '1992', value: 4 },
  { time: '1993', value: 3.5 },
  { time: '1994', value: 5 },
  { time: '1995', value: 4.9 },
  { time: '1996', value: 6 },
  { time: '1997', value: 7 },
  { time: '1998', value: 9 },
  { time: '1999', value: 13 },
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

export default () => {
  const [theme, setTheme] = useState<'default' | 'academy' | 'dark'>('default');
  const [lineWidth, setLineWidth] = useState<number>(2);
  const [backgroundColor, setBackgroundColor] = useState<string>('');
  const [palette, setPalette] = useState<string[]>([]);

  return (
    <div>
      <Form
        layout="inline"
        style={{ marginBottom: 16 }}
        onValuesChange={(changedValues) => {
          console.log('changed values', changedValues);
          if ('theme' in changedValues) setTheme(changedValues.theme);
          if ('lineWidth' in changedValues) setLineWidth(Number(changedValues.lineWidth));
          if ('backgroundColor' in changedValues) setBackgroundColor(changedValues.backgroundColor);
          if ('palette' in changedValues) {
            let newPalette = changedValues.palette?.[0];
            // 支持输入字符串形式的数组
            if (typeof newPalette === 'string') {
              try {
                newPalette = JSON.parse(newPalette);
              } catch {
                newPalette = [];
              }
            }
            setPalette(Array.isArray(newPalette) ? newPalette : []);
          }
        }}
        initialValues={{
          theme,
          lineWidth,
          backgroundColor,
          palette,
        }}
      >
        <Form.Item label="Theme" name="theme">
          <Select
            value={theme}
            onChange={setTheme}
            style={{ width: 120 }}
            options={themes.map((t) => ({
              label: t,
              value: t,
            }))}
          />
        </Form.Item>
        <Form.Item label="Line Width" name="lineWidth">
          <Input type="number" value={lineWidth} min={1} max={10} style={{ width: 80 }} />
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
        >
          <Input type="text" value={backgroundColor} placeholder="#ffffff" style={{ width: 120 }} />
        </Form.Item>
        <Form.Item label="Palette" name="palette">
          <Select
            mode="tags"
            value={palette}
            placeholder="选择或输入颜色"
            style={{ width: 200 }}
            options={[
              {
                label: `默认调色板: ${PALETTE.join(', ')}`,
                value: JSON.stringify(PALETTE),
              },
            ]}
            tokenSeparators={[',']}
          />
        </Form.Item>
      </Form>
      <Line
        data={data}
        axisXTitle="year"
        axisYTitle="growth"
        containerStyle={{ height: 300 }}
        theme={theme}
        style={{
          lineWidth,
          backgroundColor,
          palette,
        }}
      />
    </div>
  );
};
