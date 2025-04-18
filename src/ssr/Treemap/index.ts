import { createChart } from '@antv/g2-ssr';
import { type TreemapOptions } from '../type';

export async function Treemap(options: TreemapOptions) {
  const { data, title, width, height } = options;
  return await createChart({
    type: 'treemap',
    width,
    height,
    title,
    data: {
      type: 'inline',
      value: {
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
}
