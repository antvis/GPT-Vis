import { Chart } from '@antv/g2';
import React, { useEffect, useRef } from 'react';
import { THEME_MAP } from '../theme';
import type { BasePlotProps, Style, Theme } from '../types';

type SankeyDatum = {
  source: string;
  target: string;
  value: number;
};

export type SankeyProps = BasePlotProps<SankeyDatum> &
  Theme &
  Style & {
    nodeAlign?: 'left' | 'center' | 'right' | 'justify';
  };

const defaultConfig = (props: SankeyProps) => {
  const { title, data, theme = 'default', nodeAlign = 'center', style = {} } = props;
  const { backgroundColor, palette } = style;
  const hasPalette = !!palette?.[0];
  let paletteConfig: any = {};
  if (hasPalette) {
    paletteConfig = {
      color: {
        range: palette,
      },
    };
  }
  return {
    title: title,
    type: 'sankey',
    theme: THEME_MAP[theme],
    layout: {
      nodeAlign,
      nodePadding: 0.01,
    },
    data: {
      type: 'inline',
      value: data,
      transform: [
        {
          type: 'custom',
          callback: (data: SankeyDatum[]) => ({
            links: data,
          }),
        },
      ],
    },
    scale: {
      ...paletteConfig,
    },
    style: {
      labelSpacing: 2,
      nodeLineWidth: 1,
      linkFillOpacity: 0.3,
    },
    viewStyle: {
      viewFill: 'red',
    },
    ...(backgroundColor ? { viewStyle: { viewFill: backgroundColor } } : {}),
  };
};

const Sankey = (props: SankeyProps) => {
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

export default Sankey;
