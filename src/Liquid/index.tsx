import type { LiquidConfig } from '@ant-design/plots';
import { Liquid as ADCLiquid } from '@ant-design/plots';
import React, { useEffect, useRef, useState } from 'react';
import { usePlotConfig } from '../ConfigProvider/hooks';
import { THEME_MAP } from '../theme';
import type { Style, Theme } from '../types';

export type LiquidProps = Theme &
  Style & {
    percent: number;
    shape?: 'rect' | 'circle' | 'pin' | 'triangle';
    title?: string;
    width?: number;
    height?: number;
  };

const defaultConfig = (props: LiquidProps): LiquidConfig => {
  const { percent, shape = 'circle', style = {}, width = 600, height = 400 } = props;
  const { backgroundColor, palette } = style;
  const inferFontSize = Math.min(width, height) / 10;
  const fontSize = Math.min(Math.max(inferFontSize, 24), 64);

  return {
    percent,
    style: {
      shape: shape,
      contentFontSize: fontSize,
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  const config = usePlotConfig<any>('Liquid', defaultConfig, {
    ...props,
    theme: themeConfig,
    width: size.width,
    height: size.height,
  }) as LiquidConfig;

  useEffect(() => {
    if (containerRef.current) {
      const { offsetWidth, offsetHeight } = containerRef.current;
      setSize({ width: offsetWidth, height: offsetHeight });
    }
  }, []);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      <ADCLiquid {...config} />
    </div>
  );
};

export default Liquid;
