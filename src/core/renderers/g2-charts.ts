/**
 * G2-based chart renderers
 * Maps chart types to G2 rendering logic
 */

import type { Chart } from '@antv/g2';

export interface ChartRendererOptions {
  chart: Chart;
  data: any[];
  options: any;
}

/**
 * Render pie/donut chart
 */
export function renderPie({ chart, data, options }: ChartRendererOptions): void {
  const { innerRadius = 0 } = options;

  chart
    .coordinate({ type: 'theta', innerRadius })
    .data(data)
    .interval()
    .encode('y', 'value')
    .encode('color', 'category')
    .legend('color', { position: 'top' })
    .label({
      text: (d: any) => `${d.category}: ${d.value}`,
      position: 'outside',
    });
}

/**
 * Render line chart
 */
export function renderLine({ chart, data, options }: ChartRendererOptions): void {
  const { xField = 'x', yField = 'y', seriesField } = options;

  const mark = chart.data(data).line().encode('x', xField).encode('y', yField);

  if (seriesField) {
    mark.encode('color', seriesField).legend('color', { position: 'top' });
  }
}

/**
 * Render bar chart (horizontal)
 */
export function renderBar({ chart, data, options }: ChartRendererOptions): void {
  const { xField = 'x', yField = 'y', seriesField } = options;

  const mark = chart
    .coordinate({ transform: [{ type: 'transpose' }] })
    .data(data)
    .interval()
    .encode('x', xField)
    .encode('y', yField);

  if (seriesField) {
    mark.encode('color', seriesField).legend('color', { position: 'top' });
  }
}

/**
 * Render column chart (vertical)
 */
export function renderColumn({ chart, data, options }: ChartRendererOptions): void {
  const { xField = 'x', yField = 'y', seriesField } = options;

  const mark = chart.data(data).interval().encode('x', xField).encode('y', yField);

  if (seriesField) {
    mark.encode('color', seriesField).legend('color', { position: 'top' });
  }
}

/**
 * Render area chart
 */
export function renderArea({ chart, data, options }: ChartRendererOptions): void {
  const { xField = 'x', yField = 'y', seriesField } = options;

  const mark = chart.data(data).area().encode('x', xField).encode('y', yField);

  if (seriesField) {
    mark.encode('color', seriesField).legend('color', { position: 'top' });
  }
}

/**
 * Render scatter chart
 */
export function renderScatter({ chart, data, options }: ChartRendererOptions): void {
  const { xField = 'x', yField = 'y', seriesField, sizeField } = options;

  const mark = chart.data(data).point().encode('x', xField).encode('y', yField);

  if (seriesField) {
    mark.encode('color', seriesField);
  }

  if (sizeField) {
    mark.encode('size', sizeField);
  }

  mark.legend('color', { position: 'top' });
}

/**
 * Map of chart type to renderer function
 */
export const chartRenderers: Record<string, (options: ChartRendererOptions) => void> = {
  pie: renderPie,
  line: renderLine,
  bar: renderBar,
  column: renderColumn,
  area: renderArea,
  scatter: renderScatter,
};
