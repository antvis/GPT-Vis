import type { FunnelConfig } from '@ant-design/plots';
import { createChart } from '@antv/g2-ssr';
import { THEME_MAP } from '../constant';
import { BasePlotProps, CommonOptions } from './types';

type FunnelDataItem = {
  category: string;
  value: number;
  [key: string]: string | number;
};

export type FunnelProps = BasePlotProps<FunnelDataItem> & Partial<FunnelConfig>;

export type FunnelOptions = CommonOptions & FunnelProps;

export async function Funnel(options: FunnelOptions) {
  const { data, title, width = 600, height = 400, theme = 'default' } = options;
  const r = (start: any, end: any) => `${(((start - end) / start) * 100).toFixed(2)} %`;

  return await createChart({
    type: 'view',
    width,
    height,
    data,
    theme: THEME_MAP[theme],
    title,
    padding: 40,
    children: [
      {
        type: 'interval',
        data,
        encode: { x: 'category', y: 'value', color: 'category', shape: 'funnel' },
        transform: [{ type: 'symmetryY' }],
        scale: { x: { padding: 0 } },
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
            text: (d: any, i: any) => (i !== 0 ? '转换率' : ''),
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
            text: '转换率',
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
  });
}
