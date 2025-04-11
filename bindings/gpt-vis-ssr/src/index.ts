// @ts-nocheck
import { createChart } from '@antv/g2-ssr';
import { ChartType, Options } from './types';

export async function generateChart(options: Options) {
  const { type } = options;
  if (type === ChartType.Line) {
    const { data, title, width, height, axisYTitle, axisXTitle } = options;
    const hasGroupField = (data || [])[0]?.group !== undefined;

    let encode = {};
    if (hasGroupField) {
      encode = { x: 'time', y: 'value', color: 'group' };
    } else {
      encode = { x: 'time', y: 'value' };
    }

    return await createChart({
      type: 'view',
      title,
      data,
      width,
      height,
      encode: encode,
      style: { minHeight: 1 },
      axis: {
        y: {
          title: axisYTitle || false,
        },
        x: {
          title: axisXTitle || false,
        },
      },
      children: [
        {
          type: 'line',
        },
      ],
    });
  } else if (type === ChartType.Column) {
    const { data, title, width, height, axisYTitle, axisXTitle, group, stack } = options;
    // @ts-ignore
    const hasGroupField = (data || [])[0]?.group !== undefined;

    let transforms: any = [];

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
    }
    return await createChart({
      width,
      height,
      title,
      data,
      type: 'interval',
      encode: hasGroupField
        ? {
            x: 'category',
            y: 'value',
            color: 'group',
          }
        : {
            x: 'category',
            y: 'value',
          },
      transform: transforms,
      style: {
        // 圆角样式
        radiusTopLeft: 10,
        radiusTopRight: 10,
      },
      axis: {
        x: {
          title: axisXTitle,
        },
        y: {
          title: axisYTitle,
        },
      },
    });
  } else if (type === ChartType.Pie) {
    const { data, title, width, height, innerRadius } = options;

    return await createChart({
      type: 'interval',
      title,
      width,
      height,
      data,
      encode: { y: 'value', color: 'category' },
      transform: [{ type: 'stackY' }],
      coordinate: {
        type: 'theta',
        outerRadius: 0.95,
        innerRadius,
      },
      style: {
        radius: 4,
        stroke: '#fff',
        lineWidth: 1,
      },
      labels: [
        {
          text: (data) => `${data.category}: ${data.value}`,
          position: 'outside',
          radius: 0.85,
          fontSize: 12,
        },
      ],
      legend: {
        color: { position: 'bottom', layout: { justifyContent: 'center' } },
      },
      animate: false,
      axis: false,
    });
  } else if (type === ChartType.Area) {
    const { data, title, width, height, stack, axisYTitle, axisXTitle } = options;

    let encode = {};
    let transform: any = [];
    if (stack) {
      encode = { x: 'time', y: 'value', color: 'group' };
      transform = [{ type: 'stackY' }];
    } else {
      encode = { x: 'time', y: 'value' };
    }

    return await createChart({
      type: 'view',
      title,
      data,
      width,
      height,
      encode,
      transform,
      style: { minHeight: 1 },
      axis: {
        y: {
          title: axisYTitle || false,
        },
        x: {
          title: axisXTitle || false,
        },
      },
      children: [
        {
          type: 'area',
          style: { opacity: 0.7 },
        },
      ],
    });
  } else if (type === ChartType.Bar) {
    const { data, title, width, height, stack, group, axisYTitle, axisXTitle } = options;
    // @ts-ignore
    const hasGroupField = (data || [])[0]?.group !== undefined;

    let transforms: any = [];

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
    }

    return await createChart({
      width,
      height,
      title,
      type: 'interval',
      data,
      encode: hasGroupField
        ? {
            x: 'category',
            y: 'value',
            color: 'group',
          }
        : {
            x: 'category',
            y: 'value',
          },
      transform: transforms,
      coordinate: { transform: [{ type: 'transpose' }] },
      style: {
        // 圆角样式
        radiusTopLeft: 10,
        radiusTopRight: 10,
      },
      axis: {
        x: {
          title: axisXTitle,
        },
        y: {
          title: axisYTitle,
        },
      },
    });
  } else if (type === ChartType.Histogram) {
    const { data, title, width, height, axisYTitle, axisXTitle, binNumber } = options;

    return await createChart({
      type: 'interval',
      width,
      height,
      data,
      title,
      encode: {
        x: (d) => d,
        y: 'count',
      },
      transform: [{ type: 'binX', y: 'count', thresholds: binNumber }],
      style: { minHeight: 1, columnWidthRatio: 1, inset: 0.5 },
      axis: {
        x: { title: axisXTitle },
        y: { title: axisYTitle },
      },
      animate: false,
    });
  } else if (type === ChartType.Scatter) {
    const { data, title, width, height, axisYTitle, axisXTitle } = options;
    return await createChart({
      type: 'point',
      data,
      width,
      height,
      title,
      encode: {
        x: 'x',
        y: 'y',
        // shape: 'point',
      },
      axis: {
        x: {
          title: axisXTitle,
        },
        y: {
          title: axisYTitle,
        },
      },
      style: { lineWidth: 1 },
      legend: { size: false },
      animate: false,
      tooltip: false,
    });
  } else if (type === ChartType.WordCloud) {
    const { data, title, width, height } = options;
    return await createChart({
      type: 'wordCloud',
      layout: {
        fontSize: [8, 42],
      },
      title,
      data,
      width,
      height,
      encode: {
        text: 'text',
        color: 'text',
        value: 'value',
      },
      legend: false,
    });
  } else if (type === ChartType.Treemap) {
    const { data, title, width, height } = options;
    return await createChart({
      type: 'treemap',
      width,
      height,
      title,
      data: {
        type: 'inline',
        value: {
          // 包装一层 root 根节点
          name: 'root',
          children: data,
        },
      },
      layout: {
        tile: 'treemapBinary',
        paddingInner: 2,
      },
      encode: { value: 'value' },
      style: {
        fillOpacity: 0.8,
        labelFontSize: 10,
      },
      tooltip: false,
      legend: false,
      animate: false,
    });
  } else if (type === ChartType.DualAxes) {
    const { series, categories, title, width, height } = options;
    type DualAxesSeriesItem = {
      type: string;
      data: number[];
      axisYTitle?: string;
    };

    enum ChartType {
      Column = 'column',
      Line = 'line',
    }

    function transform(series: DualAxesSeriesItem[], categories: string[]) {
      const newChildren = series.map((item: any, index: number) => {
        const { type, axisYTitle, ...others } = item;

        const baseConfig = {
          ...others,
          axis: { y: { title: axisYTitle } },
          encode: { x: 'category', y: axisYTitle, color: () => axisYTitle },
          legend: {
            color: {
              itemMarker: (v) => {
                if (v === axisYTitle) return 'smooth';
                return 'rect';
              },
            },
          },
          data: undefined,
        };

        if (type === ChartType.Column) {
          return { ...baseConfig, type: 'interval' };
        }

        if (type === ChartType.Line) {
          return {
            ...baseConfig,
            type,
            axis: { y: { position: 'right', title: axisYTitle } },
            encode: { x: 'category', y: axisYTitle, shape: 'smooth', color: () => axisYTitle },
            style: { lineWidth: 2, stroke: '#5AD8A6' },
            scale: { y: { independent: true } },
          };
        }

        return baseConfig;
      });

      const newData = categories.map((item: string, index: number) => {
        const temp = {
          category: item,
        } as {
          category: string;
          [key: string]: any;
        };
        series.forEach((s: DualAxesSeriesItem, i: number) => {
          const defaultYField = s.axisYTitle || `value_${i + 1}`;
          temp[defaultYField] = s.data[index];
        });
        return temp;
      });

      const legendTypeList = series.map((item: any) => {
        return item.type === ChartType.Line ? 'smooth' : 'rect';
      });

      return {
        children: newChildren,
        data: newData,
        legendTypeList,
      };
    }

    const config = transform(series, categories);

    return await createChart({
      type: 'view',
      autoFit: true,
      title,
      width,
      height,
      ...config,
    });
  } else if (type === ChartType.Radar) {
    const { data, title, width, height } = options;
    const hasGroupField = (data || [])[0]?.group !== undefined;

    let encode = {};
    if (hasGroupField) {
      encode = { x: 'name', y: 'value', color: 'group' };
    } else {
      encode = { x: 'name', y: 'value' };
    }

    return await createChart({
      title,
      type: 'view',
      width,
      data,
      height,
      children: [
        {
          axis: {
            x: {
              grid: true,
              line: true,
            },
            y: {
              zIndex: 1,
              title: false,
              line: true,
              nice: true,
            },
          },
          // @ts-ignore
          coordinateType: 'polar',
          scale: {
            x: {
              padding: 0.5,
              align: 0,
            },
            y: {
              nice: true,
            },
          },
          coordinate: {
            type: 'polar',
          },
          encode: encode,
          type: 'line',
        },
        {
          style: {
            fillOpacity: 0.5,
          },
          encode: encode,
          scale: {
            x: {
              padding: 0.5,
              align: 0,
            },
          },
          type: 'area',
        },
      ],
    });
  }
}
