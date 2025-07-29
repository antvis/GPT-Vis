import { createChart } from '@antv/g2-ssr';
import { type LineProps } from '@antv/gpt-vis/dist/esm/Line';
import { THEME_MAP } from '../theme';
import { FontFamily } from '../types';
import { getTitle } from '../util';
import { CommonOptions } from './types';

type LineStyle = {
  lineWidth?: number;
  backgroundColor?: string;
  palette?: string[];
  texture?: 'rough' | 'default';
};

export type LineOptions = CommonOptions &
  LineProps & {
    style?: LineStyle;
  };

export async function Line(options: LineOptions) {
  const {
    data,
    title,
    width = 600,
    height = 400,
    axisYTitle,
    axisXTitle,
    theme = 'default',
    renderPlugins,
    style = {},
  } = options;

  const hasGroupField = (data || [])[0]?.group !== undefined;
  const { lineWidth, backgroundColor, palette, texture = 'default' } = style;
  const hasPalette = !!palette?.[0];

  let encode = {};
  let strokeColor = {};
  let paletteConfig = {};
  if (hasGroupField) {
    encode = { x: 'time', y: 'value', color: 'group' };
    paletteConfig = hasPalette
      ? {
          color: {
            range: palette,
          },
        }
      : {};
  } else {
    encode = { x: 'time', y: 'value' };
    strokeColor = hasPalette ? { stroke: palette[0] } : {};
  }

  return await createChart({
    devicePixelRatio: 3,
    type: 'view',
    title: getTitle(title, texture),
    data,
    width,
    height,
    encode: encode,
    theme: THEME_MAP[theme],
    style: { minHeight: 1 },
    axis: {
      y: {
        title: axisYTitle || false,
        ...(texture === 'rough'
          ? { titleFontFamily: FontFamily.ROUGH, labelFontFamily: FontFamily.ROUGH }
          : {}),
      },
      x: {
        title: axisXTitle || false,
        ...(texture === 'rough'
          ? { titleFontFamily: FontFamily.ROUGH, labelFontFamily: FontFamily.ROUGH }
          : {}),
      },
    },
    children: [
      {
        type: 'line',
        style: {
          lineWidth: lineWidth || 2,
          ...strokeColor,
        },
        labels: [
          {
            text: 'value',
            style: { textAlign: 'center', dy: -12 },
            transform: [{ type: 'overlapDodgeY' }],
            ...(texture === 'rough' ? { fontFamily: FontFamily.ROUGH } : {}),
          },
        ],
        ...(backgroundColor ? { viewStyle: { viewFill: backgroundColor } } : {}),
      },
      {
        type: 'point',
        encode: {
          shape: 'point',
          ...(lineWidth ? { size: lineWidth * 1.2 } : {}),
        },
        style: {
          fill: 'white',
          lineWidth: 1,
          ...(hasPalette && !hasGroupField ? { stroke: palette[0] } : {}),
        },
      },
    ],
    scale: {
      y: {
        nice: true,
      },
      ...paletteConfig,
    },
    renderPlugins,
  });
}
