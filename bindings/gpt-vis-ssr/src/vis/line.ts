import { createChart } from '@antv/g2-ssr';
import { type LineProps } from '@antv/gpt-vis/dist/esm/Line';
import { THEME_MAP } from '../theme';
import { FontFamily } from '../types';
import { getTitle } from '../util';
import { CommonOptions } from './types';

export type LineOptions = CommonOptions & LineProps;

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
    texture = 'default',
  } = options;

  const hasGroupField = (data || [])[0]?.group !== undefined;

  let encode = {};
  if (hasGroupField) {
    encode = { x: 'time', y: 'value', color: 'group' };
  } else {
    encode = { x: 'time', y: 'value' };
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
          lineWidth: 2,
        },
        labels: [
          {
            text: 'value',
            style: { textAlign: 'center', dy: -12 },
            transform: [{ type: 'overlapDodgeY' }],
            ...(texture === 'rough' ? { fontFamily: FontFamily.ROUGH } : {}),
          },
        ],
      },
      {
        type: 'point',
        encode: { shape: 'point' },
        style: { fill: 'white', lineWidth: 1 },
      },
    ],
    scale: {
      y: {
        nice: true,
      },
    },
    renderPlugins,
  });
}
