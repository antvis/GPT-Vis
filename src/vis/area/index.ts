import { getThemeObject } from '../../theme/g2';
import type { ThemeStyle, VisualizationOptions, VisualizationTheme } from '../../types';
import {
  bindCartesianAxisLayout,
  bindCrosshairAxisLabels,
  CHART_STYLE_DEFAULTS,
  createCartesianAxis,
  createChartRenderer,
  datumKey,
  getChartAnimation,
  getColorLegend,
  getLineHighlightState,
  getSeriesHighlightByColorInteraction,
  getSharedTooltipInteraction,
} from '../../util';

/**
 * AreaDataItem is the type for each data item in the area chart.
 */
export type AreaDataItem = {
  time: string | number;
  value: number;
  group?: string;
};

/**
 * AreaConfig defines the configuration for rendering the area chart.
 */
export interface AreaConfig {
  type?: 'area';
  data: AreaDataItem[];
  stack?: boolean;
  title?: string;
  subtitle?: string;
  axisXTitle?: string;
  axisYTitle?: string;
  theme?: VisualizationTheme;
  style?: ThemeStyle;
}

/**
 * AreaInstance represents an area chart instance with render and destroy methods.
 */
export interface AreaInstance {
  render: (config: AreaConfig) => void;
  destroy: () => void;
}

const getLinearGradientColor = (color: string, backgroundColor = 'white') =>
  `linear-gradient(-90deg, ${backgroundColor} 0%, ${color} 100%)`;
const DEFAULT_COLOR = '#3A95FF';

/**
 * Area chart component using G2 5.0.
 *
 * @example
 * ```ts
 * const area = Area({
 *   container: '#container',
 *   width: 600,
 *   height: 400,
 * });
 *
 * area.render({
 *   type: 'area',
 *   data: [
 *     { time: '1 月', value: 23.895 },
 *     { time: '2 月', value: 23.695 },
 *     { time: '3 月', value: 23.655 },
 *   ],
 *   title: '1月到3月股票价格的变化',
 *   axisXTitle: '月份',
 *   axisYTitle: '价格',
 * });
 *
 * area.destroy();
 * ```
 */
export const Area = (options: VisualizationOptions): AreaInstance => {
  const { container, width, height, theme: chartTheme = 'default' } = options;
  const renderer = createChartRenderer({
    container,
    width,
    height,
    autoFit: true,
  });

  /**
   * Render the area chart with the given configuration.
   */
  const render = (config: AreaConfig): void => {
    const {
      data = [],
      theme = chartTheme,
      title,
      subtitle,
      axisXTitle,
      axisYTitle,
      stack = false,
      style: localStyle = {},
    } = config;

    const hasGroupField = data.length > 0 && data[0]?.group !== undefined;
    const cartesianAxisOptions = {
      axisXTitle,
      axisYTitle,
      preferHorizontal: true,
      xTicksAtEdges: true,
      xValues: data.map(({ time }) => time),
      container,
      chartWidth: width,
      chartHeight: height,
    };

    const appearance = getThemeObject('area', theme, localStyle);
    const { theme: rendererTheme } = appearance;
    const cartesianAxis = createCartesianAxis(cartesianAxisOptions, rendererTheme);
    const areaMark = {
      fillOpacity: CHART_STYLE_DEFAULTS.areaOpacity,
      ...appearance.mark.area,
    };
    const lineMark = {
      lineWidth: CHART_STYLE_DEFAULTS.lineWidth,
      strokeOpacity: CHART_STYLE_DEFAULTS.lineOpacity,
      ...appearance.mark.line,
    };
    const pointStyle = {
      shape: 'point',
      size: CHART_STYLE_DEFAULTS.pointSize,
      lineWidth: CHART_STYLE_DEFAULTS.pointLineWidth,
      stroke: rendererTheme.view!.viewFill as string,
      ...appearance.mark.point,
    };
    const baseTheme = rendererTheme.type;

    const lineWidth = lineMark.lineWidth;
    const colors = rendererTheme.category10 as string[];
    const backgroundColor = rendererTheme.view!.viewFill as string;
    const fillColor = getLinearGradientColor(colors[0] || DEFAULT_COLOR, backgroundColor);
    const areaOpacity = areaMark.fillOpacity ?? CHART_STYLE_DEFAULTS.areaOpacity;
    const tooltip = {
      items: [
        (d: any) => ({
          name: hasGroupField ? d.group : axisYTitle || d.time,
          value: d.value,
        }),
      ],
    };

    // Configure chart encode and transform based on stack and group
    let encode: any = {};
    let transform: any = [];
    const scaleConfig: any = { y: { nice: true } };
    let children: any = [];

    if (hasGroupField && stack) {
      // Stacked area chart
      encode = { x: 'time', y: 'value', color: 'group' };
      transform = [{ type: 'stackY' }];
      scaleConfig.color = { range: colors };
      children = [
        {
          type: 'area',
          style: areaMark,
        },
        { type: 'line', style: lineMark },
      ];
    } else if (hasGroupField) {
      // Multi-line area chart (not stacked)
      encode = { x: 'time', y: 'value', color: 'group' };
      scaleConfig.color = { range: colors };
      children = [
        {
          type: 'area',
          style: areaMark,
        },
        { type: 'line', style: lineMark },
      ];
    } else {
      // Single area chart
      encode = { x: 'time', y: 'value' };
      children = [
        {
          type: 'area',
          style: {
            ...areaMark,
            fill: fillColor,
          },
        },
        {
          type: 'line',
          style: {
            lineCap: 'round',
            lineJoin: 'round',
            ...lineMark,
            stroke: colors[0],
          },
        },
      ];
    }

    children = children.map((child: any) => ({
      ...child,
      encode: { key: datumKey('group') },
      animate: getChartAnimation(false, child.type === 'line' ? 'pathIn' : 'fadeIn'),
      tooltip: child.type === 'line' ? tooltip : false,
      state: hasGroupField
        ? child.type === 'area'
          ? {
              active: { fillOpacity: Math.min(areaOpacity + 0.1, 1) },
              inactive: { fillOpacity: 0.07 },
            }
          : getLineHighlightState(lineWidth)
        : undefined,
    }));

    if (!hasGroupField && data.length <= 24) {
      const { size: pointSize, ...pointMark } = pointStyle;
      children.push({
        type: 'point',
        encode: {
          x: 'time',
          y: 'value',
          key: datumKey('group', 'time'),
          size: pointSize,
        },
        animate: getChartAnimation(false, 'fadeIn'),
        tooltip: false,
        style: {
          ...pointMark,
          fill: colors[0],
        },
      });
    }

    // Configure chart options
    // Note: Using 'any' type due to G2's complex type system with transformations
    // This is consistent with how G2 5.0 is used elsewhere in the codebase
    const chartOptions: any = {
      type: 'view',
      data,
      title: title ? { title, subtitle } : '',
      encode,
      transform,
      children,
      scale: scaleConfig,
      axis: cartesianAxis.axis,
      ...cartesianAxis.layout(),
      legend: getColorLegend(hasGroupField),
      interaction: {
        tooltip: getSharedTooltipInteraction({ crosshairs: true }),
        ...(hasGroupField ? getSeriesHighlightByColorInteraction() : {}),
      },

      theme: rendererTheme,
    };

    renderer.render(chartOptions, (chart) => {
      const cleanupAxisLayout = bindCartesianAxisLayout(chart, cartesianAxis);
      const cleanupCrosshairAxisLabels = bindCrosshairAxisLabels(chart, baseTheme);
      return [cleanupCrosshairAxisLabels, cleanupAxisLayout];
    });
  };

  /**
   * Destroy the chart instance and clean up resources.
   */
  const destroy = (): void => {
    renderer.destroy();
  };

  return {
    render,
    destroy,
  };
};
