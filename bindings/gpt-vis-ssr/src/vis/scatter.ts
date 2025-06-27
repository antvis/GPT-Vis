import { createChart } from '@antv/g2-ssr';
import { type ScatterProps } from '@antv/gpt-vis/dist/esm/Scatter';
import { THEME_MAP } from '../theme';
import { CommonOptions } from './types';

export type ScatterOptions = CommonOptions &
  ScatterProps & {
    shape?:
      | 'hollow'
      | 'hollowDiamond'
      | 'hollowHexagon'
      | 'hollowSquare'
      | 'hollowTriangleDown'
      | 'hollowTriangle'
      | 'hollowBow'
      | 'point'
      | 'plus'
      | 'diamond'
      | 'square'
      | 'triangle'
      | 'triangleDown'
      | 'hexagon'
      | 'cross'
      | 'bowtie'
      | 'hyphen'
      | 'line'
      | 'tick'
      | 'circle';
  };

export async function Scatter(options: ScatterOptions) {
  const {
    data,
    title,
    width = 600,
    height = 400,
    axisYTitle,
    axisXTitle,
    theme = 'default',
    shape = 'hollow',
  } = options;

  const hasGroupField = (data || [])[0]?.group !== undefined;
  let encode = {};

  if (hasGroupField) {
    encode = {
      x: 'x',
      y: 'y',
      color: 'group',
      shape: shape,
    };
  } else {
    encode = {
      x: 'x',
      y: 'y',
      shape: shape,
    };
  }

  return await createChart({
    devicePixelRatio: 3,
    type: 'point',
    theme: THEME_MAP[theme],
    data,
    width,
    height,
    title,
    encode: encode,
    axis: {
      x: {
        title: axisXTitle,
      },
      y: {
        title: axisYTitle,
      },
    },
    insetRight: 4,
    style: { lineWidth: 1 },
    legend: { size: false },
    animate: false,
    tooltip: false,
    scale: {
      x: {
        nice: true,
      },
      y: {
        nice: true,
      },
    },
  });
}
