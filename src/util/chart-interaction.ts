import type { VisualizationTheme } from '../types';
import { CHART_STYLE_DEFAULTS, getChartVisualTokens } from './chart-tokens';

export interface TooltipInteractionOptions {
  shared?: boolean;
  crosshairs?: boolean;
}

export interface PointHighlightStateOptions {
  activeLineWidth?: number;
  inactiveOpacity?: number;
}

const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const getChartAnimation = (
  hasRendered: boolean,
  enterType?: 'fadeIn' | 'pathIn' | 'growInX' | 'growInY' | 'waveIn',
): false | Record<string, any> => {
  if (hasRendered || prefersReducedMotion()) return false;

  return {
    enter: {
      ...(enterType ? { type: enterType } : {}),
      duration: CHART_STYLE_DEFAULTS.animationDuration,
      easing: 'ease-out',
    },
    update: { type: null },
    exit: { type: null },
  };
};

export const getTooltipInteraction = (
  theme: VisualizationTheme,
  { shared = false, crosshairs = false }: TooltipInteractionOptions = {},
): Record<string, any> => {
  const tokens = getChartVisualTokens(theme);
  return {
    shared,
    series: shared,
    crosshairs,
    marker: true,
    crosshairsStroke: tokens.textSecondary,
    crosshairsStrokeOpacity: 0.18,
    crosshairsLineWidth: 1,
    crosshairsLineDash: [0, 0],
    markerR: 4,
    markerLineWidth: 2,
    markerStroke: tokens.background,
  };
};

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
  delay: CHART_STYLE_DEFAULTS.interactionDelay,
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
