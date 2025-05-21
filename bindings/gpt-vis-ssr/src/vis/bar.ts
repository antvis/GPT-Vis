import { createChart } from '@antv/g2-ssr';
import { type BarProps } from '@antv/gpt-vis/dist/esm/Bar';
import { BACKGROUND_STYLE } from '../constant';
import { CommonOptions } from './types';

export type BarOptions = CommonOptions & BarProps;

export async function Bar(options: BarOptions) {
  const {
    data,
    title,
    width,
    height,
    axisYTitle,
    axisXTitle,
    group,
    stack,
    theme = 'light',
  } = options;

  const hasGroupField = (data || [])[0]?.group !== undefined;
  let transforms: any = [];
  let radiusStyle = {
    radiusTopLeft: 4,
    radiusTopRight: 4,
  };
  let encode = {};

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
    type: 'interval',
    theme,
    width,
    height,
    title,
    data,
    encode: encode,
    transform: transforms,
    coordinate: { transform: [{ type: 'transpose' }] },
    style: {
      ...radiusStyle,
      maxWidth: 40,
    },
    viewStyle: {
      ...BACKGROUND_STYLE,
    },
    axis: {
      x: {
        title: axisXTitle,
      },
      y: {
        title: axisYTitle,
      },
    },
  });
}
