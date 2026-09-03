import { LineCrosshair, type LineCrosshairOptions } from '@antv/component';
import { selectPlotArea, type Chart, type G2Context } from '@antv/g2';
import type { VisualizationTheme } from '../types';
import { CHART_FONT_FAMILY, getChartVisualTokens, type ChartVisualTokens } from './tokens';

type RuntimeView = NonNullable<G2Context['views']>[number];
type RuntimeScale = RuntimeView['scale'][string];
type LineCrosshairStyle = NonNullable<LineCrosshairOptions['style']>;
type LineCrosshairTagStyle = Omit<LineCrosshairStyle, 'startPos' | 'endPos'>;
type Point = [number, number];

export type CrosshairAxisLabelsOptions = {
  yAxisPosition?: 'left' | 'right';
  yField?: string;
};

const MAX_CROSSHAIR_DECIMAL_PLACES = 6;

type RuleLine = {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
};

type TooltipRule = {
  style?: Partial<Record<keyof RuleLine, unknown>>;
};

type TooltipPlot = ReturnType<typeof selectPlotArea> & {
  ruleX?: TooltipRule;
  ruleY?: TooltipRule;
};

type CrosshairEvent = {
  canvasY?: number;
  data?: {
    data?: { x?: unknown };
    items?: Array<{ value?: unknown }>;
  };
  nativeEvent?: unknown;
  offsetY?: number;
};

const formatCrosshairAxisValue = (
  value: unknown,
  formatter?: (value: unknown) => unknown,
  precision?: number,
) => {
  if (value === undefined || value === null || value === '') return '';

  let displayValue = value;

  try {
    const formatted = formatter?.(value);
    if (formatted !== undefined && formatted !== null) {
      const numericFormatted =
        typeof formatted === 'number' ||
        (typeof formatted === 'string' &&
          formatted.trim() !== '' &&
          Number.isFinite(Number(formatted)))
          ? Number(formatted)
          : undefined;
      if (numericFormatted === undefined) return String(formatted);
      displayValue = numericFormatted;
    }
  } catch {
    // Fall back to the original value when a scale formatter rejects it.
  }

  if (displayValue instanceof Date) return displayValue.toLocaleString();
  if (typeof displayValue === 'number' && Number.isFinite(displayValue)) {
    if (displayValue !== 0 && Math.abs(displayValue) < 10 ** -MAX_CROSSHAIR_DECIMAL_PLACES) {
      return Number(displayValue.toPrecision(4)).toString();
    }
    const decimalPlaces = Math.min(
      Math.max(precision ?? MAX_CROSSHAIR_DECIMAL_PLACES, 0),
      MAX_CROSSHAIR_DECIMAL_PLACES,
    );
    return Number(displayValue.toFixed(decimalPlaces)).toString();
  }
  return String(displayValue);
};

const getNumberPrecision = (value: number): number => {
  if (!Number.isFinite(value) || value === 0) return 0;
  const normalizedValue = Number(value.toPrecision(12));
  const [coefficient, exponentText = '0'] = Math.abs(normalizedValue).toExponential().split('e');
  const coefficientPrecision = coefficient.split('.')[1]?.length || 0;
  return Math.max(0, coefficientPrecision - Number(exponentText));
};

const getCrosshairScalePrecision = (scale?: RuntimeScale): number | undefined => {
  const ticks = scale?.getTicks?.();
  if (!Array.isArray(ticks) || ticks.length < 2) return undefined;

  let interval = Number.POSITIVE_INFINITY;
  for (let index = 1; index < ticks.length; index += 1) {
    const current = Number(ticks[index]);
    const previous = Number(ticks[index - 1]);
    const difference = Math.abs(current - previous);
    if (Number.isFinite(difference) && difference > 0) interval = Math.min(interval, difference);
  }
  if (!Number.isFinite(interval)) return undefined;

  return Math.min(getNumberPrecision(interval) + 2, MAX_CROSSHAIR_DECIMAL_PLACES);
};

const getCrosshairTagStyle = (
  theme: VisualizationTheme,
  tokens: ChartVisualTokens,
): LineCrosshairTagStyle => ({
  lineLineWidth: 0,
  lineStrokeOpacity: 0,
  linePointerEvents: 'none',
  tagPadding: [4, 7],
  tagRadius: 6,
  tagBackgroundFill: tokens.textPrimary,
  tagBackgroundStroke: 'transparent',
  tagBackgroundLineWidth: 0,
  tagBackgroundShadowColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.38)' : 'rgba(15, 23, 42, 0.18)',
  tagBackgroundShadowBlur: 8,
  tagBackgroundShadowOffsetY: 2,
  tagLabelFill: tokens.background,
  tagLabelFillOpacity: 1,
  tagLabelFontFamily: CHART_FONT_FAMILY,
  tagLabelFontSize: 11,
  tagLabelFontWeight: 500,
  tagLabelLineWidth: 0,
  tagPointerEvents: 'none',
});

const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, Math.min(min, max)), Math.max(min, max));

const invertCrosshairValue = (scale: RuntimeScale | undefined, value: unknown): unknown => {
  if (!scale || typeof scale.invert !== 'function' || value === undefined) return undefined;

  if (typeof scale.getBandWidth === 'function') {
    const domain = scale.getOptions?.()?.domain;
    if (!Array.isArray(domain) || domain.length === 0 || !Number.isFinite(Number(value))) {
      return undefined;
    }

    let nearestValue = domain[0];
    let nearestDistance = Number.POSITIVE_INFINITY;
    for (const domainValue of domain) {
      const start = Number(scale.map?.(domainValue));
      const bandWidth = Number(scale.getBandWidth(domainValue)) || 0;
      const distance = Math.abs(start + bandWidth / 2 - Number(value));
      if (Number.isFinite(distance) && distance < nearestDistance) {
        nearestValue = domainValue;
        nearestDistance = distance;
      }
    }
    return nearestValue;
  }

  try {
    return scale.invert(value);
  } catch {
    return undefined;
  }
};

const getTooltipPlot = (context: G2Context): TooltipPlot | undefined => {
  const root = context.canvas?.getRoot();
  if (!root) return undefined;

  // G2 5.4 stores tooltip rules on the plot display object. Keep that version-specific
  // detail isolated here while using the public plot selector for discovery.
  return selectPlotArea(root) as TooltipPlot | undefined;
};

const getScaleField = (scale?: RuntimeScale): unknown => scale?.getOptions?.()?.field;

const findYScaleByField = (view: RuntimeView, yField: string): RuntimeScale | undefined =>
  Object.entries(view.scale).find(
    ([scaleName, scale]) => /^y\d*$/.test(scaleName) && getScaleField(scale) === yField,
  )?.[1];

const getYScale = (view: RuntimeView, yField?: string): RuntimeScale | undefined =>
  yField ? findYScaleByField(view, yField) : view.scale.y;

const getCartesianView = (context: G2Context, yField?: string): RuntimeView | undefined =>
  context.views?.find(
    (view) =>
      Boolean(view.scale?.x && getYScale(view, yField)) &&
      typeof view.coordinate?.invert === 'function',
  );

const getRuleLine = (rule?: TooltipRule): RuleLine | undefined => {
  const x1 = Number(rule?.style?.x1);
  const x2 = Number(rule?.style?.x2);
  const y1 = Number(rule?.style?.y1);
  const y2 = Number(rule?.style?.y2);
  if (![x1, x2, y1, y2].every(Number.isFinite)) return undefined;
  return { x1, x2, y1, y2 };
};

const getPlotOffset = (plot: TooltipPlot): Point => {
  const [x = 0, y = 0] = plot.getLocalPosition?.() || [];
  return [Number.isFinite(Number(x)) ? Number(x) : 0, Number.isFinite(Number(y)) ? Number(y) : 0];
};

const invertCoordinate = (view: RuntimeView, point: Point): Point | undefined => {
  try {
    const inverted = view.coordinate.invert(point);
    if (!Array.isArray(inverted) || inverted.length < 2) return undefined;

    const x = Number(inverted[0]);
    const y = Number(inverted[1]);
    return Number.isFinite(x) && Number.isFinite(y) ? [x, y] : undefined;
  } catch {
    return undefined;
  }
};

/**
 * Bridges G2 tooltip crosshairs to axis value tags.
 *
 * G2 does not currently expose axis tags for tooltip crosshairs, so this adapter
 * reads the rule geometry created by G2 5.4 and renders labels with LineCrosshair.
 */
export const bindCrosshairAxisLabels = (
  chart: Chart,
  theme: VisualizationTheme,
  { yAxisPosition = 'left', yField }: CrosshairAxisLabelsOptions = {},
): (() => void) => {
  if (!chart || typeof chart.on !== 'function') return () => undefined;

  const tagStyle = getCrosshairTagStyle(theme, getChartVisualTokens(theme));
  let boundPlot: TooltipPlot | null = null;
  let xCrosshair: LineCrosshair | null = null;
  let yCrosshair: LineCrosshair | null = null;
  let latestPointerY: number | null = null;
  let latestXValue: unknown;

  const destroyCrosshairs = () => {
    xCrosshair?.destroy();
    yCrosshair?.destroy();
    xCrosshair = null;
    yCrosshair = null;
    boundPlot = null;
  };

  const hideCrosshairs = () => {
    for (const crosshair of [xCrosshair, yCrosshair]) {
      if (crosshair) crosshair.style.visibility = 'hidden';
    }
  };

  const resetCrosshairs = () => {
    latestPointerY = null;
    latestXValue = undefined;
    hideCrosshairs();
  };

  const ensureCrosshairs = (
    plot: TooltipPlot,
    xLine: RuleLine,
    yLine: RuleLine,
    xText: string,
    yText: string,
  ) => {
    if (boundPlot !== plot) destroyCrosshairs();
    if (xCrosshair && yCrosshair) return;

    const layer = plot.parentNode || plot;
    const [plotX, plotY] = getPlotOffset(plot);
    const xStart: Point = [xLine.x1 + plotX, xLine.y1 + plotY];
    const xEnd: Point = [xLine.x2 + plotX, xLine.y2 + plotY];
    const yStart: Point = [yLine.x1 + plotX, yLine.y1 + plotY];
    const yEnd: Point = [yLine.x2 + plotX, yLine.y2 + plotY];

    if (!xCrosshair) {
      xCrosshair = new LineCrosshair({
        style: { ...tagStyle, startPos: xStart, endPos: xEnd, tagText: xText, tagPosition: 'end' },
      });
      xCrosshair.style.zIndex = 7;
      xCrosshair.style.pointerEvents = 'none';
      layer.appendChild(xCrosshair);
    }

    if (!yCrosshair) {
      yCrosshair = new LineCrosshair({
        style: {
          ...tagStyle,
          startPos: yStart,
          endPos: yEnd,
          tagText: yText,
          tagPosition: yAxisPosition === 'right' ? 'end' : 'start',
        },
      });
      yCrosshair.style.zIndex = 7;
      yCrosshair.style.pointerEvents = 'none';
      layer.appendChild(yCrosshair);
    }

    boundPlot = plot;
  };

  const updateCrosshairs = (event: CrosshairEvent) => {
    const context = chart.getContext();
    const plot = getTooltipPlot(context);
    const view = getCartesianView(context, yField);
    if (!plot || !view) {
      hideCrosshairs();
      return;
    }
    const yScale = getYScale(view, yField);

    const verticalRule = getRuleLine(plot.ruleY);
    const horizontalRule = getRuleLine(plot.ruleX);
    if (!verticalRule || !horizontalRule) {
      hideCrosshairs();
      return;
    }

    const [plotX, plotY] = getPlotOffset(plot);
    const eventY = Number(event.offsetY ?? event.canvasY);
    const globalY = Number.isFinite(eventY) ? eventY : latestPointerY;
    const pointerY = Number.isFinite(globalY) ? Number(globalY) - plotY : horizontalRule.y1;
    const x = clamp(verticalRule.x1, horizontalRule.x1, horizontalRule.x2);
    const y = clamp(pointerY, verticalRule.y1, verticalRule.y2);
    const invertedPosition = invertCoordinate(view, [x, y]);
    const xValue = latestXValue ?? invertCrosshairValue(view.scale.x, invertedPosition?.[0]);
    const yValue =
      invertCrosshairValue(yScale, invertedPosition?.[1]) ?? event.data?.items?.[0]?.value;
    const xText = formatCrosshairAxisValue(xValue, view.scale.x.getFormatter?.());
    const yText = formatCrosshairAxisValue(
      yValue,
      yScale?.getFormatter?.(),
      getCrosshairScalePrecision(yScale),
    );

    if (!xText || !yText) {
      hideCrosshairs();
      return;
    }

    if (plot.ruleY?.style) {
      plot.ruleY.style.x1 = x;
      plot.ruleY.style.x2 = x;
    }
    if (plot.ruleX?.style) {
      plot.ruleX.style.y1 = y;
      plot.ruleX.style.y2 = y;
    }

    const displayVerticalRule = { ...verticalRule, x1: x, x2: x };
    const displayHorizontalRule = { ...horizontalRule, y1: y, y2: y };
    ensureCrosshairs(plot, displayVerticalRule, displayHorizontalRule, xText, yText);
    if (!xCrosshair || !yCrosshair) return;

    xCrosshair.setText(xText);
    xCrosshair.setPointer([x + plotX, verticalRule.y2 + plotY]);
    xCrosshair.style.visibility = 'visible';
    yCrosshair.setText(yText);
    yCrosshair.setPointer([
      (yAxisPosition === 'right' ? horizontalRule.x2 : horizontalRule.x1) + plotX,
      y + plotY,
    ]);
    yCrosshair.style.visibility = 'visible';
  };

  const onPointerMove = (event: CrosshairEvent) => {
    const y = Number(event.offsetY ?? event.canvasY);
    if (Number.isFinite(y)) latestPointerY = y;
    updateCrosshairs(event);
  };

  const onTooltipShow = (event: CrosshairEvent) => {
    if (!event.nativeEvent) return;
    if (event.data?.data?.x !== undefined) latestXValue = event.data.data.x;
    updateCrosshairs(event);
  };

  chart.on('tooltip:show', onTooltipShow);
  chart.on('tooltip:hide', resetCrosshairs);
  chart.on('plot:pointermove', onPointerMove);
  chart.on('plot:pointerleave', resetCrosshairs);

  return () => {
    chart.off?.('tooltip:show', onTooltipShow);
    chart.off?.('tooltip:hide', resetCrosshairs);
    chart.off?.('plot:pointermove', onPointerMove);
    chart.off?.('plot:pointerleave', resetCrosshairs);
    destroyCrosshairs();
  };
};
