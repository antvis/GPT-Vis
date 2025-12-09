import { createChart } from '@antv/g2-ssr';
import { THEME_MAP } from '../theme';
import { FontFamily } from '../types';
import { getTitle } from '../util';
import { CommonOptions } from './types';

type WaterfallStyle = {
  backgroundColor?: string;
  texture?: 'rough' | 'default';
};

type WaterfallDataItem = {
  category: string;
  value: number;
  isTotal?: boolean;
  [key: string]: string | number | boolean | undefined;
};

export type WaterfallOptions = CommonOptions & {
  /**
   * Title of the waterfall chart.
   */
  title?: string;
  /**
   * Data for the waterfall chart.
   */
  data: WaterfallDataItem[];
  /**
   * The title for x-axis
   */
  axisXTitle?: string;
  /**
   * The title for y-axis
   */
  axisYTitle?: string;
  /**
   * The custom style for the waterfall chart.
   */
  style?: WaterfallStyle;
  positiveColor?: string;
  negativeColor?: string;
  totalColor?: string;
};

const DEFAULT_POSITIVE_COLOR = '#FF4D4F';
const DEFAULT_NEGATIVE_COLOR = '#2EBB59';
const DEFAULT_TOTAL_COLOR = '#1783FF';

/**
 * Transform waterfall data to add __start__ and __end__ fields
 * for proper rendering of stacked intervals
 */
function transformWaterfallData(data: WaterfallDataItem[]) {
  let cumulative = 0;
  return data.map((item, index) => {
    const value = item.value || 0;
    const isTotal = item.isTotal || false;

    let start: number;
    let end: number;

    if (isTotal) {
      start = 0;
      end = value;
    } else {
      start = cumulative;
      end = cumulative + value;
      cumulative = end;
    }

    return {
      ...item,
      __start__: start,
      __end__: end,
      __value__: value,
    };
  });
}

/**
 * Generate link data for connecting waterfall bars
 * Each link connects the end of the previous bar to the start of the current bar
 */
function generateLinkData(data: any[]) {
  return data.reduce((result: any[], current: any, index: number) => {
    if (index > 0) {
      const previous = data[index - 1];
      result.push({
        x: [previous.category, current.category],
        y: current.isTotal ? current.__end__ : current.__start__,
      });
    }
    return result;
  }, []);
}

export async function Waterfall(options: WaterfallOptions) {
  const {
    data,
    title,
    width = 600,
    height = 400,
    axisYTitle,
    axisXTitle,
    theme = 'default',
    renderPlugins,
    style = {},
    positiveColor: customPositiveColor,
    negativeColor: customNegativeColor,
    totalColor: customTotalColor,
  } = options;

  const { backgroundColor, texture = 'default' } = style;

  const positiveColor = customPositiveColor || DEFAULT_POSITIVE_COLOR;
  const negativeColor = customNegativeColor || DEFAULT_NEGATIVE_COLOR;
  const totalColor = customTotalColor || DEFAULT_TOTAL_COLOR;

  // Transform data to include __start__ and __end__ fields
  const transformedData = transformWaterfallData(data);

  // Generate link data for connecting lines
  const linkData = generateLinkData(transformedData);

  return await createChart({
    devicePixelRatio: 3,
    type: 'view',
    theme: THEME_MAP[theme],
    title: getTitle(title, texture),
    data: transformedData,
    width,
    height,
    marginRight: 28,
    ...(backgroundColor ? { viewStyle: { viewFill: backgroundColor } } : {}),
    axis: {
      y: {
        title: axisYTitle || false,
        labelFormatter: '~s',
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
    scale: {
      y: {
        nice: true,
      },
    },
    children: [
      {
        type: 'interval',
        data: transformedData,
        encode: { x: 'category', y: ['__start__', '__end__'], color: 'category' },
        style: {
          maxWidth: 60,
          stroke: '#666',
          radius: 4,
          fill: (d: any) => {
            return d.isTotal ? totalColor : d.value > 0 ? positiveColor : negativeColor;
          },
          ...(texture === 'rough' ? { lineWidth: 1 } : {}),
        },
        labels: [
          {
            text: 'value',
            position: 'inside',
            fontSize: 10,
            transform: [{ type: 'overflowHide' }],
            formatter: '~s',
            fill: '#000',
            fontWeight: 600,
            stroke: '#fff',
            ...(texture === 'rough' ? { fontFamily: FontFamily.ROUGH } : {}),
          },
        ],
      },
      {
        type: 'link',
        data: linkData,
        encode: {
          x: 'x',
          y: 'y',
        },
        zIndex: -1,
        style: {
          stroke: '#ccc',
          lineDash: [4, 2],
          lineWidth: 1,
        },
        tooltip: false,
      },
    ],
    legend: false,
    renderPlugins,
  });
}
