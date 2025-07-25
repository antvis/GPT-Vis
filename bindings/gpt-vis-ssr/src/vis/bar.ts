import { createChart } from '@antv/g2-ssr';
import { type BarProps } from '@antv/gpt-vis/dist/esm/Bar';
import { THEME_MAP } from '../theme';
import { FontFamily } from '../types';
import { getTitle } from '../util';
import { CommonOptions } from './types';

type BarStyle = {
  backgroundColor?: string;
  palette?: string[];
  texture?: 'rough' | 'default';
};

export type BarOptions = CommonOptions &
  BarProps & {
    style?: BarStyle;
  };

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
    style = {},
  } = options;

  const { backgroundColor, palette, texture = 'default' } = style;
  const hasGroupField = (data || [])[0]?.group !== undefined;
  let transforms: any = [];
  let radiusStyle = {};
  let encode = {};
  let labels: any = [
    {
      text: 'value',
      style: { dx: 2, ...(texture === 'rough' ? { fontFamily: FontFamily.ROUGH } : {}) },
      textAlign: 'start',
      transform: [{ type: 'overlapHide' }, { type: 'contrastReverse' }],
      fontSize: 10,
    },
  ];

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
    labels = [
      {
        text: 'value',
        position: 'inside',
        transform: [{ type: 'overlapHide' }, { type: 'contrastReverse' }],
        fontSize: 10,
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
    marginRight: 28,
    style: {
      ...radiusStyle,
      columnWidthRatio: 0.8,
    },
    ...(backgroundColor ? { viewStyle: { viewFill: backgroundColor } } : {}),
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
    labels: labels,
    scale: {
      y: {
        nice: true,
      },
      ...(palette?.[0]
        ? {
            color: {
              range: palette,
            },
          }
        : {}),
    },
    renderPlugins,
  });
}
