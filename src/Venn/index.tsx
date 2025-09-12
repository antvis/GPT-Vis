import type { VennConfig } from '@ant-design/plots';
import { Venn as ADCVenn } from '@ant-design/plots';
import React from 'react';
import { usePlotConfig } from '../ConfigProvider/hooks';
import { THEME_MAP } from '../theme';
import type { BasePlotProps, Style, Theme } from '../types';

type VennDatum = {
  /**
   * Label for the venn chart segment.
   * This should be a string that describes the segment.
   * For example, "A", "B", or "A ∩ B" for intersections.
   * It is used to identify the segment in the chart.
   */
  label?: string;
  /**
   * Value for the venn chart segment.
   * This should be a number that represents the size or count of the segment.
   * For example, if the segment represents a set of items, this could be the number of items in that set.
   * It is used to determine the size of the segment in the chart.
   * For intersections, this value should represent the count of items that belong to the intersection of sets.
   * For example, if "A ∩ B" represents the intersection of sets A and B, this value should be the count of items that are in both sets.
   */
  value: number;
  /**
   * Sets that the segment belongs to.
   * This should be an array of strings representing the sets that the segment is part of.
   * For example, if the segment represents items that belong to both set A and set B, this could be ['A', 'B'].
   * It is used to determine how the segment is displayed in the venn chart.
   * For intersections, this array should include the sets that contribute to the intersection.
   * For example, if "A ∩ B" represents the intersection of sets A and B, this array should be ['A', 'B'].
   */
  sets: string[] | number[];
};

export type VennProps = BasePlotProps<VennDatum> & Theme & Style;

const defaultConfig = (props: VennProps) => {
  const { data, style = {} } = props;
  const { backgroundColor, palette } = style;
  let paletteConfig: any = { color: undefined };
  const hasPalette = !!palette?.[0];

  if (hasPalette) {
    paletteConfig = {
      color: {
        range: palette,
      },
    };
  }

  return {
    data,
    sizeField: 'value',
    ...(backgroundColor ? { viewStyle: { viewFill: backgroundColor } } : {}),
    labels: [
      {
        position: 'inside',
        text: (d: VennDatum) => d.label || '',
        transform: [{ type: 'contrastReverse' }],
        fill: '#000',
        fillOpacity: 0.85,
        fontSize: 10,
      },
    ],
    scale: {
      ...paletteConfig,
    },
    tooltip: {
      title: false,
      items: [
        (d: any) => {
          return { name: d.key, value: d.size };
        },
      ],
    },
  };
};

const Venn = (props: VennProps) => {
  const themeConfig = THEME_MAP[props.theme ?? 'default'];
  const config = usePlotConfig<any>('Venn', defaultConfig, {
    ...props,
    theme: themeConfig,
  }) as VennConfig;

  return <ADCVenn {...config} />;
};

export default Venn;
