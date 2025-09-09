import { Bar } from '@antv/gpt-vis';
import { Form, Input, Select } from 'antd';
import React, { useState } from 'react';

const data = [
  {
    城市: '七台河',
    销售额: 52827.32,
  },
  {
    城市: '万县',
    销售额: 16921.576,
  },
  {
    城市: '三亚',
    销售额: 22698.396,
  },
  {
    城市: '三岔子',
    销售额: 3262.98,
  },
  {
    城市: '上海',
    销售额: 182450.567,
  },
  {
    城市: '上虞',
    销售额: 10672.872,
  },
  {
    城市: '东丰',
    销售额: 1785.84,
  },
  {
    城市: '东台',
    销售额: 2789.892,
  },
  {
    城市: '东宁',
    销售额: 2706.2,
  },
  {
    城市: '东村',
    销售额: 13692.14,
  },
  {
    城市: '东海',
    销售额: 4508.28,
  },
  {
    城市: '东胜',
    销售额: 12766.068,
  },
  {
    城市: '东莞',
    销售额: 10165.89,
  },
  {
    城市: '东营',
    销售额: 17153.92,
  },
  {
    城市: '中枢',
    销售额: 1050.42,
  },
  {
    城市: '丰县',
    销售额: 10309.516,
  },
  {
    城市: '丰镇',
    销售额: 3507.336,
  },
  {
    城市: '临水',
    销售额: 21443.1,
  },
  {
    城市: '临江',
    销售额: 36496.74,
  },
  {
    城市: '临汾',
    销售额: 26205.48,
  },
  {
    城市: '临沂',
    销售额: 97200.74,
  },
  {
    城市: '临海',
    销售额: 7071.456,
  },
  {
    城市: '临清',
    销售额: 38676.12,
  },
  {
    城市: '丹东',
    销售额: 45447.612,
  },
  {
    城市: '丹江口',
    销售额: 4879.616,
  },
  {
    城市: '丽水',
    销售额: 3983.616,
  },
  {
    城市: '义乌',
    销售额: 34511.624,
  },
  {
    城市: '义马',
    销售额: 1144.024,
  },
  {
    城市: '乌海',
    销售额: 16096.64,
  },
  {
    城市: '乌达',
    销售额: 3474.66,
  },
  {
    城市: '乐城',
    销售额: 3241,
  },
  {
    城市: '乐山',
    销售额: 12561.892,
  },
  {
    城市: '九台',
    销售额: 32535.944,
  },
  {
    城市: '九江',
    销售额: 29890.7,
  },
  {
    城市: '二道江',
    销售额: 4461.24,
  },
  {
    城市: '云浮',
    销售额: 6351.212,
  },
  {
    城市: '云阳',
    销售额: 24699.64,
  },
  {
    城市: '五常',
    销售额: 3771.46,
  },
  {
    城市: '亳州',
    销售额: 16961.14,
  },
  {
    城市: '仙居',
    销售额: 6868.512,
  },
  {
    城市: '仙桃',
    销售额: 16600.164,
  },
  {
    城市: '仪征',
    销售额: 8566.628,
  },
  {
    城市: '任丘',
    销售额: 12106.78,
  },
  {
    城市: '余下',
    销售额: 103.04,
  },
  {
    城市: '余姚',
    销售额: 12621.84,
  },
  {
    城市: '佛山',
    销售额: 7500.388,
  },
  {
    城市: '佳木斯',
    销售额: 63263.34,
  },
  {
    城市: '依兰',
    销售额: 26874.82,
  },
  {
    城市: '保定',
    销售额: 124133.1,
  },
  {
    城市: '信宜',
    销售额: 4771.06,
  },
  {
    城市: '信阳',
    销售额: 38849.412,
  },
  {
    城市: '兖州',
    销售额: 28648.2,
  },
  {
    城市: '公主岭',
    销售额: 21210.756,
  },
  {
    城市: '六合',
    销售额: 5775.98,
  },
  {
    城市: '兰州',
    销售额: 42543.144,
  },
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
  const [theme, setTheme] = useState<'default' | 'academy' | 'dark'>('default');
  const [backgroundColor, setBackgroundColor] = useState<string>('');
  const [palette, setPalette] = useState<string[]>([]);

  const onValuesChange = (changedValues: {
    theme: 'default' | 'academy' | 'dark';
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
      {/* @ts-ignore */}
      <Bar
        data={data}
        xField="城市"
        yField="销售额"
        axisXTitle="城市"
        axisYTitle="销售额"
        theme={theme}
        style={{
          backgroundColor,
          palette,
        }}
      />
    </div>
  );
};
