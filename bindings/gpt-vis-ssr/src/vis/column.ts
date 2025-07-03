import { createChart } from '@antv/g2-ssr';
import { type ColumnProps } from '@antv/gpt-vis/dist/esm/Column';
import { THEME_MAP } from '../theme';
import { FontFamily } from '../types';
import { getTitle } from '../util';
import { CommonOptions } from './types';

export type ColumnOptions = CommonOptions & ColumnProps;

export async function Column(options: ColumnOptions) {
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

  let labels: any = [
    {
      text: 'value',
      style: { dy: -12, ...(texture === 'rough' ? { fontFamily: FontFamily.ROUGH } : {}) },
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
    theme: THEME_MAP[theme],
    width,
    height,
    title: getTitle(title, texture),
    data,
    type: 'interval',
    encode: encode,
    transform: transforms,
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
    labels: labels,
    scale: {
      y: {
        nice: true,
      },
    },
    renderPlugins,
  });
}
