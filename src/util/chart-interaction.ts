import type { VisualizationTheme } from '../types';
import { CHART_STYLE_DEFAULTS, getChartVisualTokens } from './chart-tokens';

export type SharedTooltipInteractionOptions = {
  crosshairs?: boolean;
};

export type PointHighlightStateOptions = {
  activeLineWidth?: number;
  inactiveOpacity?: number;
};

export const getSharedTooltipInteraction = ({
  crosshairs = false,
}: SharedTooltipInteractionOptions = {}): Record<string, boolean> => ({
  shared: true,
  series: true,
  crosshairs,
});

export const getCategoryBackgroundHighlightState = (
  theme: VisualizationTheme,
): Record<string, any> => {
  const tokens = getChartVisualTokens(theme);
  return {
    active: {
      backgroundFill: tokens.grid,
      backgroundFillOpacity: theme === 'dark' ? 0.56 : 0.58,
      backgroundLineWidth: 0,
      backgroundPadding: 0.08,
      backgroundRadius: 4,
    },
  };
};

export const getCategoryHighlightInteraction = (): Record<string, any> => ({
  background: true,
  region: true,
});

export const getPointHighlightState = ({
  activeLineWidth = CHART_STYLE_DEFAULTS.pointActiveLineWidth,
  inactiveOpacity,
}: PointHighlightStateOptions = {}): Record<string, any> => ({
  active: {
    lineWidth: activeLineWidth,
    stroke: (_datum: unknown, _index: number, _data: unknown[], element: any) =>
      element?.style?.fill || element?.style?.stroke,
    fillOpacity: 1,
    zIndex: 10,
  },
  ...(inactiveOpacity === undefined
    ? {}
    : {
        inactive: {
          fillOpacity: inactiveOpacity,
          strokeOpacity: inactiveOpacity,
        },
      }),
});

export const getSeriesHighlightByColorInteraction = (): Record<string, boolean> => ({
  elementHighlightByColor: true,
});

export const getLineHighlightState = (lineWidth: number): Record<string, any> => ({
  active: { lineWidth: lineWidth + 1, strokeOpacity: 1 },
  inactive: { strokeOpacity: CHART_STYLE_DEFAULTS.inactiveOpacity },
});
