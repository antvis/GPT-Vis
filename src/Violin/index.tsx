import { Chart } from '@antv/g2';
import React, { useEffect, useRef } from 'react';
import { THEME_MAP } from '../theme';
import type { BasePlotProps, Style, Theme } from '../types';

type ViolinDatum = {
  category: string;
  value: number;
  group?: string;
};
export type ViolinProps = BasePlotProps<ViolinDatum> & Theme & Style & { startOnZero?: boolean };

const defaultConfig = (props: ViolinProps) => {
  const {
    data,
    title,
    axisYTitle,
    axisXTitle,
    theme = 'default',
    style = {},
    startOnZero = false,
  } = props;
  const { backgroundColor, palette } = style;
  const hasGroupField = (data || [])[0]?.group !== undefined;
  let encode = {};
  let children = [];

  if (hasGroupField) {
    encode = {
      x: 'category',
      y: 'y',
      color: 'group',
      series: 'group',
      size: 'size',
    };
    children = [
      {
        type: 'density',
        data: {
          transform: [{ type: 'kde', field: 'value', groupBy: ['category', 'group'] }],
        },
        encode: encode,
        scale: {
          y: {
            nice: true,
            zero: startOnZero,
          },
          ...(palette?.[0]
            ? {
                color: {
                  range: palette,
                },
              }
            : {}),
        },
        ...(backgroundColor ? { viewStyle: { viewFill: backgroundColor } } : {}),
      },
      {
        type: 'boxplot',
        encode: {
          x: 'category',
          y: 'value',
          series: 'group',
          color: 'group',
          shape: 'violin',
        },
        style: { opacity: 0.5, strokeOpacity: 0.5, point: false },
        ...(backgroundColor ? { viewStyle: { viewFill: backgroundColor } } : {}),
        scale: {
          y: {
            nice: true,
            zero: startOnZero,
          },
          ...(palette?.[0]
            ? {
                color: {
                  range: palette,
                },
              }
            : {}),
        },
      },
    ];
  } else {
    encode = {
      x: 'category',
      y: 'y',
      color: 'category',
      size: 'size',
    };
    children = [
      {
        type: 'density',
        data: {
          transform: [{ type: 'kde', field: 'value', groupBy: ['category'], size: 20 }],
        },
        encode: encode,
        scale: {
          y: {
            nice: true,
            zero: startOnZero,
          },
        },
        ...(backgroundColor ? { viewStyle: { viewFill: backgroundColor } } : {}),
        tooltip: false,
      },
      {
        type: 'boxplot',
        encode: {
          x: 'category',
          y: 'value',
          color: 'category',
          shape: 'violin',
        },
        style: { opacity: 0.5, strokeOpacity: 0.5, point: false },
        ...(backgroundColor ? { viewStyle: { viewFill: backgroundColor } } : {}),
        scale: {
          y: {
            nice: true,
            zero: startOnZero,
          },
          ...(palette?.[0]
            ? {
                color: {
                  range: palette,
                },
              }
            : {}),
        },
      },
    ];
  }

  return {
    type: 'view',
    theme: THEME_MAP[theme],
    title: title,
    autoFit: true,
    data,
    axis: {
      y: {
        title: axisYTitle || false,
      },
      x: {
        title: axisXTitle || false,
      },
    },
    children: children,
    scale: {
      y: {
        nice: true,
        zero: startOnZero,
      },
    },
    ...(backgroundColor ? { viewStyle: { viewFill: backgroundColor } } : {}),
  };
};

const Violin = (props: ViolinProps) => {
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

export default Violin;
