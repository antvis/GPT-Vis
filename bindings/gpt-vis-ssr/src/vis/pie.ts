import { createChart } from '@antv/g2-ssr';
import { type PieProps } from '@antv/gpt-vis/dist/esm/Pie';
import { THEME_MAP } from '../theme';
import { FontFamily } from '../types';
import { getTitle } from '../util';
import { CommonOptions } from './types';

type PieStyle = {
  backgroundColor?: string;
  palette?: string[];
  texture?: 'rough' | 'default';
};

export type PieOptions = CommonOptions &
  PieProps & {
    style?: PieStyle;
  };

export async function Pie(options: PieOptions) {
  const {
    data,
    title,
    width = 600,
    height = 400,
    innerRadius,
    theme = 'default',
    renderPlugins,
    style = {},
  } = options;
  const { backgroundColor, palette, texture = 'default' } = style;

  return await createChart({
    devicePixelRatio: 3,
    type: 'interval',
    theme: THEME_MAP[theme],
    title: getTitle(title, texture),
    width,
    height,
    data,
    encode: { y: 'value', color: 'category' },
    transform: [{ type: 'stackY' }],
    coordinate: {
      type: 'theta',
      outerRadius: 0.95,
      innerRadius,
    },
    style: {
      radius: 4,
      stroke: '#fff',
      lineWidth: 1,
    },
    ...(backgroundColor ? { viewStyle: { viewFill: backgroundColor } } : {}),
    ...(palette?.[0] ? { scale: { color: { range: palette } } } : {}),
    labels: [
      {
        text: (data: any) => `${data.category}: ${data.value}`,
        position: 'outside',
        radius: 0.85,
        fontSize: 12,
        transform: [{ type: 'overlapHide' }],
        ...(texture === 'rough' ? { fontFamily: FontFamily.ROUGH } : {}),
      },
    ],
    legend: {
      color: {
        position: 'bottom',
        layout: { justifyContent: 'center' },
        ...(texture === 'rough' ? { itemLabelFontFamily: FontFamily.ROUGH } : {}),
      },
    },
    animate: false,
    axis: false,
    renderPlugins,
  });
}
