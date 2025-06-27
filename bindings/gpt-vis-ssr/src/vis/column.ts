import { createChart } from '@antv/g2-ssr';
import { type ColumnProps } from '@antv/gpt-vis/dist/esm/Column';
import { THEME_MAP } from '../theme';
import { CommonOptions } from './types';

export type ColumnOptions = CommonOptions & ColumnProps & { showLabel?: boolean };

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
    showLabel = false,
  } = options;

  const hasGroupField = (data || [])[0]?.group !== undefined;
  // 排序降序 若 x 轴为连续表示则排序意义不大
  // let transforms: any = [{ type: 'sortX', by: 'y', reverse: true }];
  let transforms: any = [];
  let radiusStyle = {};
  let encode = {};

  let labels: any = showLabel
    ? [
        {
          text: 'value',
          style: { dy: 4 },
          transform: [{ type: 'overlapDodgeY' }, { type: 'contrastReverse' }],
          fontSize: 10,
        },
      ]
    : [];

  if (theme === 'default') {
    radiusStyle = { radiusTopLeft: 4, radiusTopRight: 4 };
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
    labels = showLabel
      ? [
          {
            text: 'value',
            position: 'inside',
            transform: [{ type: 'overlapDodgeY' }, { type: 'contrastReverse' }],
            fontSize: 10,
          },
        ]
      : [];
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
    title,
    data,
    type: 'interval',
    encode: encode,
    transform: transforms,
    insetRight: 12,
    style: {
      ...radiusStyle,
      columnWidthRatio: 0.8,
    },
    axis: {
      x: {
        title: axisXTitle,
      },
      y: {
        title: axisYTitle,
      },
    },
    labels: labels,
    scale: {
      y: {
        nice: true,
      },
      x: {
        nice: true,
      },
    },
  });
}
