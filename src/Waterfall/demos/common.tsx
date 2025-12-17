import { Waterfall } from '@antv/gpt-vis';
import { ColorPicker, Form, Select } from 'antd';
import React, { useState } from 'react';

const data = [
  { category: '第一季度', value: 120000000 },
  { category: '第二季度', value: 569000000 },
  { category: '第三季度', value: 231000000 },
  { category: '前三季度总计', isIntermediateTotal: true },
  { category: '第四季度', value: -342000000 },
  { category: '第五季度', value: -232000000 },
  { category: '四五季度总计', isIntermediateTotal: true },
  { category: '总计', isTotal: true },
];

const themes = ['default', 'academy', 'dark'] as const;

const DEFAULT_POSITIVE_COLOR = '#F56E53';
const DEFAULT_NEGATIVE_COLOR = '#3CC27F';
const DEFAULT_TOTAL_COLOR = '#1783FF';

export default () => {
  const [theme, setTheme] = useState<'default' | 'academy' | 'dark'>('default');
  const [backgroundColor, setBackgroundColor] = useState<string>('');
  const [positiveColor, setPositiveColor] = useState<string>(DEFAULT_POSITIVE_COLOR);
  const [negativeColor, setNegativeColor] = useState<string>(DEFAULT_NEGATIVE_COLOR);
  const [totalColor, setTotalColor] = useState<string>(DEFAULT_TOTAL_COLOR);

  const onValuesChange = (changedValues: any) => {
    if (changedValues.theme) {
      setTheme(changedValues.theme);
    }
    if (changedValues.backgroundColor !== undefined) {
      const color = changedValues.backgroundColor;
      if (color === null) {
        setBackgroundColor('#ffffff');
      } else {
        setBackgroundColor(typeof color === 'string' ? color : color.toHexString?.() || '#ffffff');
      }
    }
    if (changedValues.positiveColor !== undefined) {
      const color = changedValues.positiveColor;
      setPositiveColor(
        typeof color === 'string' ? color : color.toHexString?.() || DEFAULT_POSITIVE_COLOR,
      );
    }
    if (changedValues.negativeColor !== undefined) {
      const color = changedValues.negativeColor;
      setNegativeColor(
        typeof color === 'string' ? color : color.toHexString?.() || DEFAULT_NEGATIVE_COLOR,
      );
    }
    if (changedValues.totalColor !== undefined) {
      const color = changedValues.totalColor;
      setTotalColor(
        typeof color === 'string' ? color : color.toHexString?.() || DEFAULT_TOTAL_COLOR,
      );
    }
  };

  return (
    <div>
      <Form
        layout="inline"
        style={{ marginBottom: 12 }}
        initialValues={{
          theme,
          backgroundColor,
          positiveColor,
          negativeColor,
          totalColor,
        }}
        key={theme}
        onValuesChange={onValuesChange}
      >
        <Form.Item label="主题" name="theme" style={{ marginBottom: 6 }}>
          <Select style={{ width: 120 }} options={themes.map((t) => ({ label: t, value: t }))} />
        </Form.Item>
        <Form.Item label="背景颜色" name="backgroundColor" style={{ marginBottom: 6 }}>
          <ColorPicker showText allowClear />
        </Form.Item>
        <Form.Item label="正值颜色" name="positiveColor" style={{ marginBottom: 6 }}>
          <ColorPicker showText />
        </Form.Item>
        <Form.Item label="负值颜色" name="negativeColor" style={{ marginBottom: 6 }}>
          <ColorPicker showText />
        </Form.Item>
        <Form.Item label="总计颜色" name="totalColor" style={{ marginBottom: 6 }}>
          <ColorPicker showText />
        </Form.Item>
      </Form>
      <Waterfall
        data={data}
        axisXTitle="季度"
        axisYTitle="金额"
        containerStyle={{ height: 300 }}
        theme={theme}
        style={{
          backgroundColor: backgroundColor,
          palette: {
            positiveColor,
            negativeColor,
            totalColor,
          },
        }}
      />
    </div>
  );
};
