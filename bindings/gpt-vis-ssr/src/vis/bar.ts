import { createChart } from '@antv/g2-ssr';
import { type BarProps } from '@antv/gpt-vis/dist/esm/Bar';
import { THEME_MAP } from '../theme';
import { FontFamily } from '../types';
import { getTitle } from '../util';
import { CommonOptions } from './types';

export type BarOptions = CommonOptions & BarProps;

export async function Bar(options: BarOptions) {
  const {
    data,
    title,
    width = 600,
    height = 400,
    axisYTitle,
    axisXTitle,
    group,
    stack,
    theme = 'default',
    renderPlugins,
    texture = 'default',
  } = options;

  const hasGroupField = (data || [])[0]?.group !== undefined;
  let transforms: any = [];
  let radiusStyle = {};
  let encode = {};

  if (theme === 'default') {
    radiusStyle = { radiusTopLeft: 4, radiusTopRight: 4 };
  }

  if (texture === 'rough') {
    radiusStyle = {
      lineWidth: 1,
      ...radiusStyle,
    };
  }

  if (group) {
    transforms = [
      {
        type: 'dodgeX',
      },
    ];
  }

  if (stack) {
    transforms = [
      {
        type: 'stackY',
      },
    ];
  }

  if (hasGroupField) {
    encode = {
      x: 'category',
      y: 'value',
      color: 'group',
    };
  } else {
    encode = {
      x: 'category',
      y: 'value',
      color: 'category',
    };
  }

  return await createChart({
    devicePixelRatio: 3,
    type: 'interval',
    theme: THEME_MAP[theme],
    width,
    height,
    title: getTitle(title, texture),
    data,
    encode: encode,
    transform: transforms,
    coordinate: { transform: [{ type: 'transpose' }] },
    insetRight: 12,
    style: {
      ...radiusStyle,
      columnWidthRatio: 0.8,
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
    legend: {
      color: {
        ...(texture === 'rough' ? { itemLabelFontFamily: FontFamily.ROUGH } : {}),
      },
    },
    renderPlugins,
  });
}
