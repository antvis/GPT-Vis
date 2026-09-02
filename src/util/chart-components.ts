import type { VisualizationTheme } from '../types';
import { CHART_FONT_FAMILY, getChartVisualTokens } from './chart-tokens';

export const getLegendCategoryStyle = (theme: VisualizationTheme): Record<string, any> => {
  const tokens = getChartVisualTokens(theme);
  return {
    backgroundFill: 'transparent',
    padding: [5, 0, 10, 0],
    itemMarkerSize: 10,
    itemMarkerFillOpacity: 0.92,
    itemMarkerStrokeOpacity: 0.92,
    itemLabelFill: tokens.textPrimary,
    itemLabelFillOpacity: 0.78,
    itemLabelFontFamily: CHART_FONT_FAMILY,
    itemLabelFontSize: 12,
    itemLabelFontWeight: 400,
    itemLabelLineHeight: 16,
    itemLabelLetterSpacing: 0.1,
    itemLabelTextBaseline: 'middle',
    itemSpacing: [8, 0, 0],
    itemCursor: 'pointer',
    rowPadding: 8,
    colPadding: 22,
    navButtonFill: tokens.textSecondary,
    navButtonFillOpacity: 0.72,
    navButtonSize: 9,
    navPageNumFill: tokens.textSecondary,
    navPageNumFillOpacity: 0.72,
    navPageNumFontFamily: CHART_FONT_FAMILY,
    navPageNumFontSize: 11,
    navPageNumFontWeight: 400,
    navControllerPadding: 4,
    navControllerSpacing: 14,
  };
};

export const getColorLegend = (
  visible: boolean,
  theme: VisualizationTheme,
): false | Record<string, any> => (visible ? { color: getLegendCategoryStyle(theme) } : false);

export const getChartTitleStyle = (theme: VisualizationTheme): Record<string, any> => {
  const tokens = getChartVisualTokens(theme);
  return {
    spacing: 6,
    titleFill: tokens.textPrimary,
    titleFontSize: 16,
    titleFontWeight: 600,
  };
};

export const getChartTitle = (
  title: string | undefined,
  theme: VisualizationTheme,
): string | Record<string, any> => {
  if (!title) return '';
  return {
    title,
    size: 40,
    ...getChartTitleStyle(theme),
  };
};
