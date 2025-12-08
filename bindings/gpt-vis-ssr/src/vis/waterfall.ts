import { createChart } from '@antv/g2-ssr';
import { THEME_MAP } from '../theme';
import { FontFamily } from '../types';
import { getTitle } from '../util';
import { CommonOptions } from './types';

type WaterfallStyle = {
  backgroundColor?: string;
  palette?: string[];
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
   * The field name for x-axis
   */
  xField?: string;
  /**
   * The field name for y-axis
   */
  yField?: string;
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
};

const DEFAULT_POSITIVE_COLOR = '#F56E53';
const DEFAULT_NEGATIVE_COLOR = '#3CC27F';
const DEFAULT_TOTAL_COLOR = '#96a6a6';

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
  } = options;

  const { backgroundColor, palette, texture = 'default' } = style;

  const positiveColor = palette?.[0] || DEFAULT_POSITIVE_COLOR;
  const negativeColor = palette?.[1] || DEFAULT_NEGATIVE_COLOR;
  const totalColor = palette?.[2] || DEFAULT_TOTAL_COLOR;

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
          stroke: '#ccc',
          lineWidth: 1,
          fill: (d: any) => {
            if (d.isTotal) return totalColor;
            return d.__value__ > 0 ? positiveColor : negativeColor;
          },
          ...(texture === 'rough' ? { lineWidth: 1 } : {}),
        },
        labels: [
          {
            text: '__value__',
            position: 'inside',
            fontSize: 10,
            transform: [{ type: 'contrastReverse' }],
            formatter: '~s',
            ...(texture === 'rough' ? { fontFamily: FontFamily.ROUGH } : {}),
          },
          {
            text: '__end__',
            formatter: '~s',
            position: (d: any) => (d.__value__ > 0 ? 'top' : 'bottom'),
            textBaseline: (d: any) => (d.__value__ > 0 ? 'bottom' : 'top'),
            fontSize: 10,
            dy: (d: any) => (d.__value__ > 0 ? -4 : 4),
            ...(texture === 'rough' ? { fontFamily: FontFamily.ROUGH } : {}),
            transform: [{ type: 'contrastReverse' }],
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
