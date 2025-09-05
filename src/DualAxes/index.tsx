import type { DualAxesConfig } from '@ant-design/plots';
import { DualAxes as ADCDualAxes } from '@ant-design/plots';
import React, { useMemo } from 'react';
import { usePlotConfig } from '../ConfigProvider/hooks';
import { THEME_MAP } from '../theme';
import { transform } from './util';

export type DualAxesProps = Partial<DualAxesConfig> & {
  categories: string[];
  axisXTitle?: string;
  series: DualAxesSeriesItem[];
  legendTypeList?: string[];
};

export type DualAxesSeriesItem = {
  type: string;
  data: number[];
  axisYTitle?: string;
};

const defaultConfig = (props: DualAxesProps): DualAxesConfig => {
  const { xField = 'category', axisXTitle, legendTypeList, style = {} } = props;
  const { palette, backgroundColor } = style;
  const hasPalette = !!palette?.[0];
  let paletteConfig: any = { color: undefined };

  if (hasPalette) {
    paletteConfig = {
      color: {
        range: palette,
      },
    };
  }

  return {
    xField,
    axis: {
      x: {
        title: axisXTitle,
      },
    },
    legend: {
      color: {
        itemMarker: (v: string, i: number) => {
          return legendTypeList?.[i];
        },
      },
    },
    scale: {
      ...paletteConfig,
    },
    ...(backgroundColor ? { viewStyle: { viewFill: backgroundColor } } : { viewStyle: undefined }),
  };
};

const DualAxes = (props: DualAxesProps) => {
  const { categories, series, theme = 'default', ...others } = props;
  const themeConfig = THEME_MAP[theme];
  const transformData = useMemo(() => transform(series, categories), [props]);
  const config = usePlotConfig<any>('DualAxes', defaultConfig, {
    ...others,
    ...transformData,
    theme: themeConfig,
  }) as DualAxesConfig;

  return <ADCDualAxes {...config} />;
};

export default DualAxes;
