import type { LiquidConfig } from '@ant-design/plots';
import { Liquid as ADCLiquid } from '@ant-design/plots';
import React from 'react';
import { usePlotConfig } from '../ConfigProvider/hooks';
import { THEME_MAP } from '../theme';
import type { Style, Theme } from '../types';

export type LiquidProps = Theme &
  Style & {
    percent: number;
    shape?: 'rect' | 'circle' | 'pin' | 'triangle';
    title?: string;
  };

const defaultConfig = (props: LiquidProps): LiquidConfig => {
  const { percent, shape = 'circle', style = {} } = props;
  const { backgroundColor, palette } = style;

  return {
    percent,
    style: {
      shape: shape,
      contentFontSize: 24,
      contentFill: '#000',
      contentStroke: '#fff',
      contentLineWidth: 2,
      outlineBorder: 4,
      outlineDistance: 4,
      waveLength: 128,
      ...(palette?.[0] ? { fill: palette[0] } : {}),
      ...(palette?.[0] ? { outlineStroke: palette[0] } : {}),
    },
    ...(backgroundColor ? { viewStyle: { viewFill: backgroundColor } } : {}),
  };
};

const Liquid = (props: LiquidProps) => {
  const themeConfig = THEME_MAP[props.theme ?? 'default'];
  const config = usePlotConfig<any>('Liquid', defaultConfig, {
    ...props,
    theme: themeConfig,
  }) as LiquidConfig;

  return <ADCLiquid {...config} />;
};

export default Liquid;
