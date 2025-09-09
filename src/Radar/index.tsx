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

// 计算角度差的辅助函数
function angleDifference(a1: number, a2: number) {
  let diff = Math.abs(a1 - a2);
  if (diff > Math.PI) {
    diff = 2 * Math.PI - diff;
  }
  return diff;
}

function getColors(palette: string | any[], theme: string) {
  if (palette && palette.length > 0) {
    return palette;
  }
  if (theme === 'dark') {
    return ['#5B8FF9', '#61DDAA'];
  }
  if (theme === 'academy') {
    return ['#4e79a7', '#f28e2c'];
  }
  if (theme === 'default') {
    return ['#5B8FF9', '#61DDAA'];
  }
}

// 获取最靠近鼠标位置的轴和对应的数据
function getClosestAxisData(
  event: { offsetX: any; offsetY: any },
  coordinate: { getCenter: () => any },
  data: any[],
  position: string[],
  palette: string[],
  theme: string,
) {
  const { offsetX, offsetY } = event;
  const colors = getColors(palette, theme);

  // 获取雷达图中心点
  const center = coordinate.getCenter();
  const [cx, cy] = center;

  // 计算鼠标相对于中心的角度
  const mouseAngle = Math.atan2(offsetY - cy, offsetX - cx);

  // 雷达图的轴角度（从右侧开始，逆时针）
  const axisCount = position.length;
  const angleStep = (2 * Math.PI) / axisCount;

  // 找到最靠近的轴
  let closestAxisIndex = 0;
  let minAngleDiff = Infinity;

  for (let i = 0; i < axisCount; i++) {
    // 雷达图通常从顶部开始，所以需要调整角度
    const axisAngle = -Math.PI / 2 + i * angleStep;
    const angleDiff = angleDifference(mouseAngle, axisAngle);

    if (angleDiff < minAngleDiff) {
      minAngleDiff = angleDiff;
      closestAxisIndex = i;
    }
  }

  const closestAxisName = position[closestAxisIndex];

  // 获取该轴上所有系列的数据
  const axisData = data.map((item: { [x: string]: any; name: string }) => {
    return {
      name: item.group || closestAxisName,
      axis: closestAxisName,
      value: item[closestAxisName],
      color: colors?.[data.findIndex((d) => d.group === item.group)],
    };
  });

  return {
    axisName: closestAxisName,
    axisIndex: closestAxisIndex,
    data: axisData,
    angle: mouseAngle,
    closestAxisAngle: -Math.PI / 2 + closestAxisIndex * angleStep,
  };
}

const defaultConfig = (props: RadarProps, chart: any) => {
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
        markerType: 'hollow',
        crosshairsX: true,
        crosshairsY: true,
        render: (event: any) => {
          const coordinate = chart?.getCoordinate();
          const closestAxisInfo = getClosestAxisData(
            event,
            coordinate,
            parallelData,
            position,
            palette,
            theme,
          );
          const customTooltipData = {
            title: closestAxisInfo.axisName,
            items: closestAxisInfo.data.map(
              (item: { name: string; value: number; color: string }) => ({
                name: item.name ?? '',
                value: item.value,
                color: item.color,
              }),
            ),
          };
          const textColor = theme === 'dark' ? '#666' : '#000';
          return `<div
              style="border-radius: 4px; display: flex; flex-direction: column; color: ${textColor};"
            >
              <div style="font-weight: bold; margin-bottom: 4px;">${customTooltipData.title}</div>
              ${customTooltipData.items
                .map(
                  (item) => `
            <div
            key="${item.name}"
            style="display: flex; align-items: center; margin-bottom: 2px;"
            >
            <span
              style="
              width: 6px;
              height: 6px;
              background: ${item.color};
              border-radius: 50%;
              display: inline-block;
              margin-right: 6px;
              "
            ></span>
            <span style="margin-right: 8px;">${item.name}:</span>
            <span>${item.value}</span>
            </div>
              `,
                )
                .join('')}
            </div>`;
        },
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
    const config = defaultConfig(props, chart);

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
