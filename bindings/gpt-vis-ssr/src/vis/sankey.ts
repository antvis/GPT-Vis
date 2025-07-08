import { createChart } from '@antv/g2-ssr';
import { THEME_MAP } from '../theme';
import { FontFamily } from '../types';
import { ACADEMY_COLOR_PALETTE, DEFAULT_COLOR_PALETTE, getTitle } from '../util';
import { CommonOptions } from './types';

type SankeyDatum = {
  source: string;
  target: string;
  value: number;
};

export type SankeyOptions = CommonOptions & {
  /**
   * Title of the sankey chart.
   */
  title?: string;
  /**
   * The Data for the sankey chart.
   * Each datum should have a source, target, and value.
   * The source and target are strings representing the nodes,
   * and value is a number representing the weight of the link.
   * For example:
   * [
   *   { source: 'A', target: 'B', value: 10 },
   *   { source: 'B', target: 'C', value: 5 },
   *   { source: 'A', target: 'C', value: 15 },
   * ]
   */
  data: SankeyDatum[];
  /**
   * Node alignment for the sankey chart.
   * Options are 'left', 'center', 'right', or 'justify'.
   * - 'left': Aligns nodes to the left.
   * - 'center': Centers nodes in the middle.
   * - 'right': Aligns nodes to the right.
   * - 'justify': Justifies nodes across the width of the chart.
   * Default is 'center'.
   */
  nodeAlign?: 'left' | 'center' | 'right' | 'justify';
  /**
   * The orientation of the sankey chart.
   * Can be 'horizontal' or 'vertical'.
   * Default is 'horizontal'.
   */
  // orient: 'horizontal' | 'vertical';
};

export async function Sankey(options: SankeyOptions) {
  const {
    title,
    width = 600,
    height = 400,
    theme = 'default',
    data,
    nodeAlign = 'center',
    texture = 'default',
    renderPlugins,
  } = options;

  return await createChart({
    devicePixelRatio: 3,
    title: getTitle(title, texture),
    width,
    height,
    theme: THEME_MAP[theme],
    type: 'sankey',
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
      color: { range: theme === 'academy' ? ACADEMY_COLOR_PALETTE : DEFAULT_COLOR_PALETTE },
    },
    style: {
      labelSpacing: 2,
      nodeLineWidth: 1,
      linkFillOpacity: 0.3,
      ...(texture === 'rough'
        ? {
            labelFontFamily: FontFamily.ROUGH,
            linkLineWidth: 0.5,
            linkStrokeOpacity: 0,
            linkFillOpacity: 1,
          }
        : {}),
    },
    animate: false,
    tooltip: false,
    legend: false,
    renderPlugins,
  });
}
