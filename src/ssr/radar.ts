import { createChart } from '@antv/g2-ssr';
import { type RadarProps } from '../export';
import { type BaseChartConfig } from './type';

export type RadarOptions = BaseChartConfig & { type: 'radar' } & RadarProps;

export async function Radar(options: RadarOptions) {
  const { data, title, width, height } = options;
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
    width,
    data,
    height,
    children: [
      {
        axis: {
          x: {
            grid: true,
            line: true,
          },
          y: {
            zIndex: 1,
            title: false,
            line: true,
            nice: true,
          },
        },
        // @ts-ignore
        coordinateType: 'polar',
        scale: {
          x: {
            padding: 0.5,
            align: 0,
          },
          y: {
            nice: true,
          },
        },
        coordinate: {
          type: 'polar',
        },
        encode: encode,
        type: 'line',
      },
      {
        style: {
          fillOpacity: 0.5,
        },
        encode: encode,
        scale: {
          x: {
            padding: 0.5,
            align: 0,
          },
        },
        type: 'area',
      },
    ],
  });
}
