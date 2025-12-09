import { Waterfall } from '@antv/gpt-vis';
import { ColorPicker, Form, Select } from 'antd';
import React, { useState } from 'react';

const data = [
  { category: '第一季度', value: 6200000 },
  { category: '第二季度', value: 2600000 },
  { category: '前两季度总计', value: 8800000, isTotal: true },
  { category: '第三季度', value: 4100000 },
  { category: '第四季度', value: -3700000 },
  { category: '总计', value: 9800000, isTotal: true },
];

const themes = ['default', 'academy', 'dark'] as const;

const DEFAULT_POSITIVE_COLOR = '#F56E53';
const DEFAULT_NEGATIVE_COLOR = '#3CC27F';
const DEFAULT_TOTAL_COLOR = '#96a6a6';

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
        }}
        positiveColor={positiveColor}
        negativeColor={negativeColor}
        totalColor={totalColor}
      />
    </div>
  );
};
