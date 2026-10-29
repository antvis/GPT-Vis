import { CHART_STYLE_DEFAULTS, getChartVisualTokens } from './tokens';

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

export const getCategoryBackgroundHighlightState = (theme: string): Record<string, any> => {
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
  delay: CHART_STYLE_DEFAULTS.interactionDelay,
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

export const getSeriesHighlightByColorInteraction = (): Record<string, any> => ({
  elementHighlightByColor: { delay: CHART_STYLE_DEFAULTS.interactionDelay },
});

export const getLineHighlightState = (lineWidth: number): Record<string, any> => ({
  active: { lineWidth: lineWidth + 1, strokeOpacity: 1 },
  inactive: { strokeOpacity: CHART_STYLE_DEFAULTS.inactiveOpacity },
});

/** Preserve GPT-Vis hover feedback independently of the visual theme. */
export const getElementHoverScaleInteraction = (theme: string): Record<string, unknown> => ({
  delay: CHART_STYLE_DEFAULTS.interactionDelay,
  scale: 1.04,
  shadow: true,
  shadowBlur: theme === 'dark' ? 7 : theme === 'academy' ? 5 : 6,
  shadowColor:
    theme === 'dark'
      ? 'rgba(226, 232, 240, 0.38)'
      : theme === 'academy'
        ? 'rgba(63, 49, 38, 0.44)'
        : 'rgba(15, 23, 42, 0.46)',
  shadowOffsetX: 0,
  shadowOffsetY: theme === 'dark' ? 0 : 3,
  zIndex: 10,
});
