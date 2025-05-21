import { createChart } from '@antv/g2-ssr';
import { type ColumnProps } from '@antv/gpt-vis/dist/esm/Column';
import { BACKGROUND_STYLE } from '../constant';
import { CommonOptions } from './types';

export type ColumnOptions = CommonOptions & ColumnProps;

export async function Column(options: ColumnOptions) {
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
    theme,
    width,
    height,
    title,
    data,
    type: 'interval',
    encode: encode,
    transform: transforms,
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
