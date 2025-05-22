import { createChart } from '@antv/g2-ssr';
import { type RadarProps } from '@antv/gpt-vis/dist/esm/Radar';
import { THEME_MAP } from '../constant';
import { CommonOptions } from './types';

export type RadarOptions = CommonOptions & RadarProps;

export async function Radar(options: RadarOptions) {
  const { data, title, width, height, theme = 'default' } = options;
  const hasGroupField = (data || [])[0]?.group !== undefined;

  let encode = {};
  if (hasGroupField) {
    encode = { x: 'name', y: 'value', color: 'group' };
  } else {
    encode = { x: 'name', y: 'value' };
  }

  return await createChart({
    title,
    type: 'view',
    theme: THEME_MAP[theme],
    width,
    data,
    height,
    encode: encode,
    scale: {
      x: {
        padding: 0.5,
        align: 0,
      },
      y: {
        nice: true,
      },
    },
    coordinate: { type: 'polar' },
    axis: { x: { grid: true, line: true }, y: { zIndex: 0, title: false } },
    children: [
      {
        type: 'area',
        style: { fillOpacity: 0.4 },
      },
      {
        type: 'line',
        style: { lineWidth: 2 },
      },
      {
        type: 'point',
        encode: { shape: 'point' },
        style: { fill: 'white', lineWidth: 1 },
      },
    ],
  });
}
