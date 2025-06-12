import { createChart } from '@antv/g2-ssr';
import { THEME_MAP } from '../theme';
import { CommonOptions } from './types';

type VennDatum = {
  /**
   * Label for the venn chart segment.
   * This should be a string that describes the segment.
   * For example, "A", "B", or "A ∩ B" for intersections.
   * It is used to identify the segment in the chart.
   */
  label?: string;
  /**
   * Value for the venn chart segment.
   * This should be a number that represents the size or count of the segment.
   * For example, if the segment represents a set of items, this could be the number of items in that set.
   * It is used to determine the size of the segment in the chart.
   * For intersections, this value should represent the count of items that belong to the intersection of sets.
   * For example, if "A ∩ B" represents the intersection of sets A and B, this value should be the count of items that are in both sets.
   */
  value: number;
  /**
   * Sets that the segment belongs to.
   * This should be an array of strings representing the sets that the segment is part of.
   * For example, if the segment represents items that belong to both set A and set B, this could be ['A', 'B'].
   * It is used to determine how the segment is displayed in the venn chart.
   * For intersections, this array should include the sets that contribute to the intersection.
   * For example, if "A ∩ B" represents the intersection of sets A and B, this array should be ['A', 'B'].
   */
  sets: string[] | number[];
};

export type VennOptions = CommonOptions & {
  /**
   * Title of the venn chart.
   */
  title?: string;
  /**
   * The percentage value to display in the liquid chart.
   * This should be a number between 0 and 1, where 1 represents 100%.
   * For example, 0.75 represents 75%.
   */
  data: VennDatum[];
};

export async function Venn(options: VennOptions) {
  const { data, title, width = 600, height = 400, theme = 'default' } = options;

  return await createChart({
    type: 'path',
    theme: THEME_MAP[theme],
    title,
    width,
    height,
    data: {
      type: 'inline',
      value: data,
      transform: [
        {
          type: 'venn',
          padding: 8,
          sets: 'sets',
          size: 'value',
          as: ['key', 'path'],
        },
      ],
    },
    encode: { d: 'path', color: 'key' },
    style: {
      opacity: (d: VennDatum) => (d.sets.length > 1 ? 0.001 : 0.65),
    },
    labels: [
      {
        position: 'inside',
        text: (d: VennDatum) => d.label || '',
        // transform: [{ type: 'contrastReverse' }],
        fill: '#000',
        fillOpacity: 0.85,
        fontSize: 10,
      },
    ],
    legend: false,
    axis: false,
    tooltip: false,
    animate: false,
  });
}
