import { Chart } from '@antv/g2';
import React, { useEffect, useRef } from 'react';
import { THEME_MAP } from '../theme';
import type { BasePlotProps, Theme } from '../types';

type WaterfallDataItem = {
  category: string;
  value?: number;
  isTotal?: boolean;
  isIntermediateTotal?: boolean;
  [key: string]: string | number | boolean | undefined;
};

type WaterfallPalette = {
  positiveColor?: string;
  negativeColor?: string;
  totalColor?: string;
};

type WaterfallStyle = {
  backgroundColor?: string;
  palette?: WaterfallPalette;
};

const DEFAULT_POSITIVE_COLOR = '#FF4D4F';
const DEFAULT_NEGATIVE_COLOR = '#2EBB59';
const DEFAULT_TOTAL_COLOR = '#1783FF';

export type WaterfallProps = BasePlotProps<WaterfallDataItem> &
  Theme & {
    style?: WaterfallStyle;
    axisXTitle?: string;
    axisYTitle?: string;
  };

/**
 * Transform waterfall data to add __start__ and __end__ fields
 * for proper rendering of stacked intervals
 */
function transformWaterfallData(data: WaterfallDataItem[]) {
  let cumulative = 0; // 累计值（包含普通值）
  let lastIntermediateTotalEnd = 0; // 上一个中间小计的 end 值
  let totalSum = 0; // 总计值（不包含 isIntermediateTotal 的项）

  return data.map((item) => {
    const value = item.value || 0;
    let start: number;
    let end: number;

    if (item.isTotal) {
      // 总计：
      // start 为 0，end 为所有非 isIntermediateTotal 项的累计值
      start = 0;
      end = totalSum;
    } else if (item.isIntermediateTotal) {
      // 中间小计：
      // start 为上一个 isIntermediateTotal 的 end（若不存在则为 0）
      // end 为从上一个 isIntermediateTotal 后到当前位置的累计值
      start = lastIntermediateTotalEnd;
      end = cumulative;
      // 更新上一个中间小计的 end 值
      lastIntermediateTotalEnd = end;
    } else {
      start = cumulative;
      end = cumulative + value;
      cumulative = end;
      totalSum += value;
    }

    return {
      ...item,
      __start__: start,
      __end__: end,
      __value__: item.isTotal ? totalSum : item.isIntermediateTotal ? end - start : value,
    };
  });
}

/**
 * Generate link data for connecting waterfall bars
 */
function generateLinkData(data: any[]) {
  return data.reduce((result: any[], current: any, index: number) => {
    if (index > 0) {
      const previous = data[index - 1];
      result.push({
        x: [previous.category, current.category],
        y: current.isTotal || current.isIntermediateTotal ? current.__end__ : current.__start__,
      });
    }
    return result;
  }, []);
}

const defaultConfig = (props: WaterfallProps) => {
  const { data = [], title, style = {}, axisXTitle, axisYTitle, theme = 'default' } = props;

  const { backgroundColor, palette = {} } = style;
  const positiveColor = palette.positiveColor || DEFAULT_POSITIVE_COLOR;
  const negativeColor = palette.negativeColor || DEFAULT_NEGATIVE_COLOR;
  const totalColor = palette.totalColor || DEFAULT_TOTAL_COLOR;

  const transformedData = transformWaterfallData(data);
  const linkData = generateLinkData(transformedData);

  return {
    type: 'view',
    theme: THEME_MAP[theme],
    title: title,
    data: transformedData,
    axis: {
      y: {
        labelFormatter: '~s',
        title: axisYTitle || false,
      },
      x: {
        title: axisXTitle || false,
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
            return d.isTotal || d.isIntermediateTotal
              ? totalColor
              : d.__value__ > 0
                ? positiveColor
                : negativeColor;
          },
        },
        labels: [
          {
            text: '__value__',
            position: 'inside',
            fontSize: 10,
            transform: [{ type: 'overflowHide' }],
            formatter: '~s',
            fill: '#000',
            fontWeight: 600,
            stroke: '#fff',
          },
        ],
        tooltip: (d: Record<string, string | number>) => {
          const tooltipName = axisYTitle || d['category'];
          return {
            name: tooltipName,
            value: d['__value__'],
          };
        },
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
    scale: {
      y: {
        nice: true,
      },
    },
    legend: false,
    ...(backgroundColor ? { viewStyle: { viewFill: backgroundColor } } : {}),
  };
};

const Waterfall = (props: WaterfallProps) => {
  const containerRef = useRef(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const chart = new Chart({
      container: containerRef.current,
      autoFit: true,
      padding: 'auto',
    });

    const config = defaultConfig(props);
    chart.options(config as any);
    chart.render();
    chartRef.current = chart;

    return () => {
      chart.destroy();
      chartRef.current = null;
    };
  }, [props]);

  return <div ref={containerRef} />;
};

export default Waterfall;
