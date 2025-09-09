import { Chart } from '@antv/g2';
import React, { useEffect, useRef } from 'react';
import { THEME_MAP } from '../theme';
import type { BasePlotProps, Style, Theme } from '../types';
import { groupBy } from '../utils/plot';

export type RadarDataItem = {
  name: string;
  value: number;
  [key: string]: string | number;
};

export type RadarProps = BasePlotProps<RadarDataItem> &
  Theme &
  Style & { width?: number; height?: number };

function transformRadartoParallel(data: any[]) {
  if (!data || data.length === 0) {
    return [];
  }

  const groups = groupBy(data, (d) => d.group || '');

  return Object.entries(groups).map(([group, values]) => {
    const paralleValues = ((values || []) as any[]).reduce((acc, { name, value }) => {
      acc[name] = value;
      return acc;
    }, {});
    return {
      ...paralleValues,
      group,
    };
  });
}

const defaultConfig = (props: RadarProps) => {
  const { data, title, theme = 'default', style = {} } = props;
  const { backgroundColor, palette = [], lineWidth = 2 } = style;
  const parallelData = transformRadartoParallel(data);
  const position = Object.keys(parallelData[0] || {}).filter((key) => key !== 'group');

  return {
    title,
    autoFit: true,
    theme: THEME_MAP[theme],
    inset: 18,
    type: 'line',
    data: parallelData,
    coordinate: { type: 'radar' },
    encode: {
      position,
      color: 'group',
    },
    style: {
      lineWidth: lineWidth,
      lineCap: 'round',
      lineJoin: 'round',
    },
    ...(backgroundColor ? { viewStyle: { viewFill: backgroundColor } } : {}),
    legend: {
      color: parallelData.length > 1 ? { itemMarker: 'point' } : false,
    },
    scale: {
      ...Object.fromEntries(
        Array.from({ length: position.length }, (_, i) => [
          `position${i === 0 ? '' : i}`,
          {
            domainMin: 0,
            nice: true,
          },
        ]),
      ),
      ...(palette?.[0]
        ? {
            color: {
              range: palette,
            },
          }
        : {}),
    },
    axis: Object.fromEntries(
      Array.from({ length: position.length }, (_, i) => {
        return [
          `position${i === 0 ? '' : i}`,
          {
            zIndex: 1,
            titleFontSize: 10,
            titleSpacing: 8,
            label: true,
            labelFill: theme === 'dark' ? '#fff' : '#000',
            labelOpacity: 0.45,
            labelFontSize: 10,
            line: true,
            lineFill: '#000',
            lineStrokeOpacity: 0.25,
            tickFilter: (_: string, idx: number) => {
              return !(i !== 0 && idx === 0);
            },
            tickCount: 4,
            gridStrokeOpacity: 0.45,
            gridStroke: theme === 'dark' ? '#fff' : '#000',
            gridLineWidth: 1,
            gridLineDash: [4, 4],
          },
        ];
      }),
    ),
    interaction: {
      tooltip: {
        series: false,
      },
    },
  };
};

const Radar = (props: RadarProps) => {
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

export default Radar;
