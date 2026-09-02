import type { VisualizationTheme } from '../types';
import { CHART_FONT_FAMILY, getChartVisualTokens } from './chart-tokens';

export interface CartesianXAxisOptions {
  xLabels?: unknown[];
  chartWidth?: number;
}

export interface CartesianAxisOptions extends CartesianXAxisOptions {
  theme: VisualizationTheme;
  axisXTitle?: string | false;
  axisYTitle?: string | false;
}

const DEFAULT_CHART_WIDTH = 640;
const AXIS_HORIZONTAL_PADDING = 96;
const ANGLED_LABEL_MARGIN_RIGHT_MIN = 32;
const ANGLED_LABEL_MARGIN_RIGHT_MAX = 64;
const ANGLED_LABEL_EDGE_GAP = 8;

const estimateLabelWidth = (value: unknown): number =>
  Array.from(String(value ?? '')).reduce(
    (width, character) => width + ((character.codePointAt(0) ?? 0) > 0xff ? 12 : 7),
    0,
  );

const shouldUseAngledXAxisLabels = (
  labels: unknown[] | undefined,
  chartWidth = DEFAULT_CHART_WIDTH,
): boolean => {
  if (!labels?.length) return false;

  const uniqueLabels = Array.from(new Set(labels.map((label) => String(label ?? ''))));
  if (uniqueLabels.length <= 1) return false;

  const availableWidth = Math.max(chartWidth - AXIS_HORIZONTAL_PADDING, 240);
  const estimatedWidth = uniqueLabels.reduce(
    (total, label) => total + Math.max(28, estimateLabelWidth(label) + 16),
    0,
  );

  return estimatedWidth > availableWidth;
};

export const getCartesianLayout = ({
  xLabels,
  chartWidth,
}: CartesianXAxisOptions): Record<string, number> => {
  if (!shouldUseAngledXAxisLabels(xLabels, chartWidth)) return {};

  const tailLabel = xLabels?.[xLabels.length - 1];
  const labelWidth = estimateLabelWidth(tailLabel);
  const projectedHalfWidth = ((labelWidth + 12) * Math.SQRT1_2) / 2;

  return {
    marginRight: Math.min(
      ANGLED_LABEL_MARGIN_RIGHT_MAX,
      Math.max(
        ANGLED_LABEL_MARGIN_RIGHT_MIN,
        Math.ceil(projectedHalfWidth + ANGLED_LABEL_EDGE_GAP),
      ),
    ),
  };
};

export const getCartesianAxis = ({
  theme,
  axisXTitle,
  axisYTitle,
  xLabels,
  chartWidth,
}: CartesianAxisOptions): Record<'x' | 'y', Record<string, any>> => {
  const tokens = getChartVisualTokens(theme);
  const isAcademy = theme === 'academy';
  const useAngledXAxisLabels = shouldUseAngledXAxisLabels(xLabels, chartWidth);
  const themeAxisStyle = isAcademy
    ? {
        titleFill: '#000000',
        titleOpacity: 1,
        titleFillOpacity: 1,
        titleStrokeOpacity: 1,
        titleFontSize: 11,
        titleFontWeight: 'bold',
        titleSpacing: 12,
        labelFill: '#000000',
        labelOpacity: 1,
        labelFillOpacity: 1,
        labelStrokeOpacity: 1,
        labelFontSize: 10,
        labelFontWeight: 'normal',
        labelSpacing: 4,
        line: true,
        lineLineWidth: 1,
        lineStroke: tokens.axisLine,
        lineStrokeOpacity: 1,
        tick: true,
        tickLength: 5,
        tickLineWidth: 1,
        tickStroke: tokens.axisTick,
        tickStrokeOpacity: 1,
      }
    : {
        titleFill: tokens.textSecondary,
        titleOpacity: 1,
        titleFillOpacity: 1,
        titleFontFamily: CHART_FONT_FAMILY,
        titleFontSize: 12,
        titleFontWeight: 500,
        titleLineWidth: 0,
        titleSpacing: 16,
        labelFill: tokens.textSecondary,
        labelOpacity: 1,
        labelFillOpacity: 1,
        labelFontFamily: CHART_FONT_FAMILY,
        labelFontSize: 12,
        labelFontWeight: 400,
        labelLineWidth: 0,
        labelSpacing: 6,
        line: true,
        lineLineWidth: 1,
        lineStroke: tokens.axisLine,
        lineStrokeOpacity: 1,
        tick: true,
        tickLength: 3,
        tickLineWidth: 1,
        tickStroke: tokens.axisTick,
        tickOpacity: 1,
        tickStrokeOpacity: 1,
      };
  const common = {
    labelAutoHide: { keepHeader: true, keepTail: true },
    ...themeAxisStyle,
  };

  return {
    x: {
      ...common,
      title: axisXTitle || false,
      ...(useAngledXAxisLabels
        ? {
            labelTransform: 'rotate(45)',
            labelAutoRotate: false,
          }
        : {
            labelAutoRotate: {
              optionalAngles: [0, 45, 90],
              recoverWhenFailed: true,
            },
          }),
      grid: isAcademy,
      ...(isAcademy
        ? {
            gridStroke: tokens.axisGrid,
            gridStrokeOpacity: 1,
            gridLineWidth: 1,
            gridLineDash: [0, 0],
          }
        : {}),
    },
    y: {
      ...common,
      title: axisYTitle || false,
      lineLineWidth: isAcademy ? 1 : 0.75,
      grid: true,
      gridStroke: tokens.axisGrid,
      gridStrokeOpacity: 1,
      gridLineWidth: isAcademy ? 1 : 0.5,
      gridLineDash: isAcademy ? [0, 0] : [2, 4],
      gridFilter: (_: unknown, index: number) => index !== 0,
    },
  };
};
