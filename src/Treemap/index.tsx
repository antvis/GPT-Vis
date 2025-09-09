import type { TreemapConfig } from '@ant-design/plots';
import { Treemap as ADCTreemap } from '@ant-design/plots';
import React, { useMemo } from 'react';
import { usePlotConfig } from '../ConfigProvider/hooks';
import { THEME_MAP } from '../theme';
import type { BasePlotProps, Style, Theme } from '../types';

type TreeNode = {
  name: string;
  value: number;
  children?: TreeNode[];
};
// binNumber和binWidth为互斥属性，选其一即可
type ADCTreemapConfig = TreemapConfig & {
  valueField: string;
};
export type TreemapProps = BasePlotProps<TreeNode> & Theme & Style;

const defaultConfig = (props: ADCTreemapConfig): TreemapConfig => {
  const { valueField = 'value', style = {} } = props;
  const { backgroundColor, palette } = style;
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
    legend: false,
    layout: {
      tile: 'treemapBinary',
      paddingInner: 3,
    },
    valueField,
    tooltip: {
      items: [
        (d) => {
          return {
            name: d.data?.name,
            value: d[valueField],
          };
        },
      ],
    },
    style: { fillOpacity: 0.8, labelFontSize: 12 },
    ...(backgroundColor ? { viewStyle: { viewFill: backgroundColor } } : { viewStyle: undefined }),
    scale: {
      ...paletteConfig,
    },
  };
};
const transform = (data: TreeNode[]) => {
  return {
    name: 'root',
    children: data,
  };
};

const Treemap = (props: TreemapProps) => {
  const themeConfig = THEME_MAP[props.theme ?? 'default'];
  const config = usePlotConfig<any>('Treemap', defaultConfig, {
    ...props,
    theme: themeConfig,
  }) as TreemapConfig;
  const { data, ...others } = config;
  const transformData = useMemo(() => transform(data), [data]);

  return <ADCTreemap {...others} data={transformData} />;
};

export default Treemap;
