import { createChart } from '@antv/g2-ssr';
import { type AreaProps } from '@antv/gpt-vis/dist/esm/Area';
import { THEME_MAP } from '../theme';
import { FontFamily } from '../types';
import { getTitle } from '../util';
import { CommonOptions } from './types';

type AreaStyle = {
  backgroundColor?: string;
  palette?: string[];
  texture?: 'rough' | 'default';
};

export type AreaOptions = CommonOptions &
  AreaProps & {
    style?: AreaStyle;
  };

const getLinearGradientColor = (color: string) =>
  `linear-gradient(-90deg, white 0%, ${color} 100%)`;

const DEFAULT_COLOR = '#3A95FF';

export async function Area(options: AreaOptions) {
  const {
    data,
    title,
    width = 600,
    height = 400,
    stack,
    axisYTitle,
    axisXTitle,
    theme = 'default',
    renderPlugins,
    style = {},
  } = options;
  const { backgroundColor, palette, texture = 'default' } = style;
  const hasPalette = !!palette?.[0];
  const paletteConfig = hasPalette
    ? {
        scale: {
          color: {
            range: palette,
          },
        },
      }
    : {};
  const viewStyleConfig = backgroundColor ? { viewStyle: { viewFill: backgroundColor } } : {};
  const strokeColorConfig = hasPalette
    ? {
        stroke: palette[0],
      }
    : {};
  const fillColor = getLinearGradientColor(palette?.[0] || DEFAULT_COLOR);

  let encode = {};
  let transform: any = [];
  let children = [];

  if (stack) {
    encode = { x: 'time', y: 'value', color: 'group' };
    transform = [{ type: 'stackY' }];
    children = [
      {
        type: 'area',
        ...paletteConfig,
        ...viewStyleConfig,
        style: { fillOpacity: 0.6 },
      },
      {
        type: 'line',
        style: { lineWidth: 2, strokeOpacity: 0.6 },
        ...paletteConfig,
      },
      {
        type: 'point',
        encode: { shape: 'point' },
        style: { fill: 'white', lineWidth: 1 },
      },
    ];
  } else {
    encode = { x: 'time', y: 'value' };
    children = [
      {
        type: 'area',
        ...viewStyleConfig,
        style: {
          fillOpacity: 0.6,
          ...(theme === 'academy'
            ? {
                fill: fillColor,
              }
            : texture === 'rough'
              ? {
                  // rough don't support linear-gradient
                  fill: palette?.[0] || DEFAULT_COLOR,
                  lineWidth: 1,
                }
              : {
                  fill: fillColor,
                }),
        },
      },
      {
        type: 'line',
        style: {
          lineWidth: 2,
          strokeOpacity: 0.6,
          ...strokeColorConfig,
        },
      },
      {
        type: 'point',
        encode: { shape: 'point' },
        style: {
          fill: 'white',
          lineWidth: 1,
          ...strokeColorConfig,
        },
      },
    ];
  }

  return await createChart({
    devicePixelRatio: 3,
    type: 'view',
    theme: THEME_MAP[theme],
    title: getTitle(title, texture),
    data,
    width,
    height,
    encode,
    transform,
    marginRight: 28,
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
    children: children,
    scale: {
      y: {
        nice: true,
      },
    },
    legend: {
      color: {
        ...(texture === 'rough' ? { itemLabelFontFamily: FontFamily.ROUGH } : {}),
      },
    },
    renderPlugins,
  });
}
