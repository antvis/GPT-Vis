import { createChart } from '@antv/g2-ssr';
import { type AreaProps } from '@antv/gpt-vis/dist/esm/Area';
import { THEME_MAP } from '../theme';
import { FontFamily } from '../types';
import { getTitle } from '../util';
import { CommonOptions } from './types';

export type AreaOptions = CommonOptions & AreaProps;

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
    texture = 'default',
  } = options;

  let encode = {};
  let transform: any = [];
  let children = [];

  if (stack) {
    encode = { x: 'time', y: 'value', color: 'group' };
    transform = [{ type: 'stackY' }];
    children = [
      {
        type: 'area',
        style: { fillOpacity: 0.6 },
      },
      {
        type: 'line',
        style: { lineWidth: 2, strokeOpacity: 0.6 },
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
        style: {
          fillOpacity: 0.6,
          ...(theme === 'academy'
            ? {}
            : texture === 'rough'
              ? {
                  // rough don't support linear-gradient
                  fill: '#3A95FF',
                  lineWidth: 1,
                }
              : {
                  fill: 'linear-gradient(-90deg, white 0%, #3A95FF 100%)',
                }),
        },
      },
      {
        type: 'line',
        style: { lineWidth: 2, strokeOpacity: 0.6 },
      },
      {
        type: 'point',
        encode: { shape: 'point' },
        style: { fill: 'white', lineWidth: 1 },
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
