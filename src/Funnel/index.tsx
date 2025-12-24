import { Chart } from '@antv/g2';
import React, { useEffect, useRef } from 'react';
import { THEME_MAP } from '../theme';
import type { BasePlotProps, Style, Theme } from '../types';
// TODO 转化率 --> CVR (Conversion Rate)

type FunnelDatum = {
  category: string;
  value: number;
  group?: string;
};

export type FunnelProps = BasePlotProps<FunnelDatum> &
  Theme &
  Style & { width?: number; height?: number };

const defaultConfig = (props: FunnelProps) => {
  const { data, title, theme = 'default', style = {} } = props;
  const { backgroundColor, palette = [] } = style;
  const r = (start: any, end: any) => `${((end / start) * 100).toFixed(2)} %`;
  // 动态识别最多两种分组，并进行对比渲染
  const groupValues: string[] = Array.from(
    new Set((data || []).map((d: any) => d.group).filter((g: any) => g !== undefined)),
  ) as string[];
  const isComparative = groupValues.length > 1;

  const hasPalette = !!palette?.[0];
  let paletteConfig: any = { color: undefined };

  if (hasPalette) {
    paletteConfig = {
      color: {
        range: palette,
      },
    };
  }

  const children = isComparative
    ? [
        {
          type: 'interval',
          data: {
            transform: [{ type: 'filter', callback: (d: any) => d.group === groupValues[0] }],
          },
          scale: {
            ...paletteConfig,
          },
          encode: { x: 'category', y: 'value', color: 'category', shape: 'funnel' },
          style: { stroke: '#FFF', strokeOpacity: 0.3, strokeLineWidth: 0.5 },
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
          type: 'interval',
          data: {
            transform: [{ type: 'filter', callback: (d: any) => d.group === groupValues[1] }],
          },
          scale: {
            ...paletteConfig,
          },
          encode: {
            x: 'category',
            y: (d: any) => -d.value,
            color: 'category',
            shape: 'funnel',
          },
          style: { stroke: '#FFF', strokeOpacity: 0.3, strokeLineWidth: 0.5 },
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
              position: 'top-left',
              fill: '#666',
              dx: -35,
              dy: -8,
            },
            {
              text: (d: any, i: any) => (i !== 0 ? '转化率' : ''),
              position: 'top-left',
              textAlign: 'left',
              textBaseline: 'middle',
              fill: '#666',
              dx: -80,
            },
            {
              text: (d: any, i: any, data: any) =>
                i !== 0 ? r(data[i - 1].value, data[i].value) : '',
              position: 'top-left',
              textAlign: 'left',
              textBaseline: 'middle',
              dx: -130,
            },
          ],
          ...(backgroundColor ? { viewStyle: { viewFill: backgroundColor } } : {}),
        },
      ]
    : [
        {
          type: 'interval',
          data,
          encode: { x: 'category', y: 'value', color: 'category', shape: 'funnel' },
          transform: [{ type: 'symmetryY' }],
          scale: {
            x: { padding: 0 },
            ...paletteConfig,
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
      ];

  return {
    type: 'view',
    data,
    theme: THEME_MAP[theme],
    title,
    paddingLeft: isComparative ? 68 : 40,
    paddingRight: 68,
    children: children,
    axis: false,
    animate: false,
    scale: { x: { padding: 0 } },
    coordinate: { transform: [{ type: 'transpose' }] },
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
