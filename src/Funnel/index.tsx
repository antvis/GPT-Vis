import { Chart } from '@antv/g2';
import React, { useEffect, useRef } from 'react';
import { THEME_MAP } from '../theme';
import type { BasePlotProps, Style, Theme } from '../types';

type FunnelDatum = {
  category: string;
  value: number;
};

export type FunnelProps = BasePlotProps<FunnelDatum> &
  Theme &
  Style & { width?: number; height?: number };

const defaultConfig = (props: FunnelProps) => {
  const { data, title, theme = 'default', style = {} } = props;
  const { backgroundColor, palette = [] } = style;
  const r = (start: any, end: any) => `${((end / start) * 100).toFixed(2)} %`;

  return {
    type: 'view',
    data,
    theme: THEME_MAP[theme],
    title: title,
    padding: 40,
    insetRight: 28,
    children: [
      {
        type: 'interval',
        data,
        encode: { x: 'category', y: 'value', color: 'category', shape: 'funnel' },
        transform: [{ type: 'symmetryY' }],
        scale: {
          x: { padding: 0 },
          ...(palette?.[0]
            ? {
                color: {
                  range: palette,
                },
              }
            : {}),
        },
        coordinate: { transform: [{ type: 'transpose' }] },
        legend: {
          color: {
            position: 'top',
            layout: {
              justifyContent: 'center',
            },
          },
        },
        labels: [
          {
            text: (d: any) => `${d.category}\n${d.value}`,
            position: 'inside',
            transform: [{ type: 'contrastReverse' }],
          },
          {
            text: (d: any, i: any) => (i !== 0 ? '———' : ''),
            style: {
              'font-size': '1px',
              color: '#666',
              'letter-spacing': '0px',
            },
            position: 'top-right',
            fill: '#666',
            dx: 35,
            dy: -8,
          },
          {
            text: (d: any, i: any) => (i !== 0 ? '转化率' : ''),
            position: 'top-right',
            textAlign: 'left',
            textBaseline: 'middle',
            fill: '#666',
            dx: 40,
          },
          {
            text: (d: any, i: any, data: any) =>
              i !== 0 ? r(data[i - 1].value, data[i].value) : '',
            position: 'top-right',
            textAlign: 'left',
            textBaseline: 'middle',
            dx: 80,
          },
        ],
        ...(backgroundColor ? { viewStyle: { viewFill: backgroundColor } } : {}),
      },
      {
        type: 'connector',
        data: [
          {
            startX: data[0].category,
            startY: data[data.length - 1].category,
            endX: 0,
            endY: (data[0].value - data[data.length - 1].value) / 2,
          },
        ],
        encode: { x: 'startX', x1: 'startY', y: 'endX', y1: 'endY' },
        style: {
          stroke: '#666',
          markerEnd: false,
          connectLength1: -12,
          offset2: -20,
          connectorStroke: '#0649f2',
          lineDash: [12, 2],
        },
        labels: [
          {
            text: '转化率',
            position: 'left',
            textAlign: 'start',
            textBaseline: 'middle',
            fill: '#666',
            dx: 10,
          },
          {
            text: r(data[0].value, data[data.length - 1].value),
            position: 'left',
            textAlign: 'start',
            dx: 50,
            fill: '#000',
          },
        ],
      },
    ],
    axis: false,
    animate: false,
  };
};

const Funnel = (props: FunnelProps) => {
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

export default Funnel;
