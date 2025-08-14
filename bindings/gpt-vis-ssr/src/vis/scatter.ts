import { createChart } from '@antv/g2-ssr';
import { type ScatterProps } from '@antv/gpt-vis/dist/esm/Scatter';
import { THEME_MAP } from '../theme';
import { FontFamily } from '../types';
import { ACADEMY_COLOR_PALETTE, DEFAULT_COLOR_PALETTE, getTitle } from '../util';
import { CommonOptions } from './types';

type ScatterStyle = {
  backgroundColor?: string;
  palette?: string[];
  texture?: 'rough' | 'default';
};

export type ScatterOptions = CommonOptions &
  ScatterProps & {
    group?: boolean;
    style?: ScatterStyle;
  };

export async function Scatter(options: ScatterOptions) {
  const {
    data,
    title,
    width = 600,
    height = 400,
    axisYTitle,
    axisXTitle,
    group,
    theme = 'default',
    renderPlugins,
    style = {},
  } = options;
  const { texture = 'default', backgroundColor, palette } = style;
  const hasGroupField = (data || [])[0]?.group !== undefined;

  return await createChart({
    devicePixelRatio: 3,
    type: 'point',
    theme: THEME_MAP[theme],
    data,
    width,
    height,
    title: getTitle(title, texture),
    encode: {
      x: 'x',
      y: 'y',
      ...(group && hasGroupField && palette ? { color: 'group' } : {}), // 当group为true且数据有group字段且有palette时启用颜色编码
      // shape: 'point',
    },
    axis: {
      x: {
        title: axisXTitle,
        ...(texture === 'rough'
          ? { titleFontFamily: FontFamily.ROUGH, labelFontFamily: FontFamily.ROUGH }
          : {}),
      },
      y: {
        title: axisYTitle,
        ...(texture === 'rough'
          ? { titleFontFamily: FontFamily.ROUGH, labelFontFamily: FontFamily.ROUGH }
          : {}),
      },
    },
    style: {
      lineWidth: 1,
      ...(group && hasGroupField && palette
        ? {}
        : {
            fill: theme === 'academy' ? ACADEMY_COLOR_PALETTE[0] : DEFAULT_COLOR_PALETTE[0], // 仅在没有颜色编码时设置默认填充颜色
          }),
    },
    legend: {
      size: false,
      color: group && hasGroupField && palette ? true : false, // 当group为true且数据有group字段且有palette时启用颜色图例
    },
    animate: false,
    tooltip: false,
    scale: {
      y: {
        nice: true,
      },
      // color配置仅在有颜色编码时生效
      ...(group && hasGroupField && palette ? { color: { range: palette } } : {}),
    },
    ...(backgroundColor ? { viewStyle: { viewFill: backgroundColor } } : {}),
    renderPlugins,
  });
}
