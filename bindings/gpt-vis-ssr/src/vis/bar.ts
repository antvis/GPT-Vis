import { createChart } from '@antv/g2-ssr';
import { type ColumnProps } from '@antv/gpt-vis/dist/esm/Column';
import { BACKGROUND_STYLE } from '../constant';
import { CommonOptions } from './types';

export type ColumnOptions = CommonOptions & ColumnProps;

export async function Bar(options: ColumnOptions) {
  const {
    data,
    title,
    width,
    height,
    axisYTitle,
    axisXTitle,
    group,
    stack,
    theme = 'classic',
  } = options;

  const curTheme = theme === 'default' ? 'classic' : theme;
  const hasGroupField = (data || [])[0]?.group !== undefined;

  let transforms: any = [];
  let radiusStyle = {
    radiusTopLeft: 10,
    radiusTopRight: 10,
  };
  let encode = {};

  if (group) {
    transforms = [
      {
        type: 'dodgeX',
      },
    ];
    radiusStyle = {
      radiusTopLeft: 24,
      radiusTopRight: 24,
    };
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
    theme: curTheme,
    width,
    height,
    title,
    data,
    type: 'interval',
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
