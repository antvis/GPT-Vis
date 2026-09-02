import { LineCrosshair } from '@antv/component';
import type { Chart } from '@antv/g2';
import type { VisualizationTheme } from '../types';
import { CHART_FONT_FAMILY, type ChartVisualTokens, getChartVisualTokens } from './chart-tokens';

const formatCrosshairAxisValue = (
  value: unknown,
  formatter?: (value: unknown) => unknown,
  precision?: number,
) => {
  if (value === undefined || value === null || value === '') return '';

  try {
    const formatted = formatter?.(value);
    if (formatted !== undefined && formatted !== null) return String(formatted);
  } catch {
    // Fall back to the original value when a scale formatter rejects it.
  }

  if (value instanceof Date) return value.toLocaleString();
  if (typeof value === 'number' && Number.isFinite(value) && precision !== undefined) {
    return value.toFixed(precision);
  }
  return String(value);
};

const getNumberPrecision = (value: number): number => {
  if (!Number.isFinite(value) || value === 0) return 0;
  const [coefficient, exponentText = '0'] = Math.abs(value).toExponential().split('e');
  const coefficientPrecision = coefficient.split('.')[1]?.length || 0;
  return Math.max(0, coefficientPrecision - Number(exponentText));
};

const getCrosshairScalePrecision = (scale: any): number | undefined => {
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

  return Math.min(getNumberPrecision(interval) + 2, 20);
};

const getCrosshairTagStyle = (tokens: ChartVisualTokens): Record<string, any> => ({
  lineLineWidth: 0,
  lineStrokeOpacity: 0,
  linePointerEvents: 'none',
  tagPadding: [4, 7],
  tagRadius: 6,
  tagBackgroundFill: tokens.textPrimary,
  tagBackgroundStroke: 'transparent',
  tagBackgroundLineWidth: 0,
  tagBackgroundShadowColor:
    tokens.background === '#141414' ? 'rgba(0, 0, 0, 0.38)' : 'rgba(15, 23, 42, 0.18)',
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

const invertCrosshairValue = (scale: any, value: unknown): unknown => {
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

/**
 * Bridges G2 tooltip crosshairs to axis value tags.
 *
 * This adapter intentionally contains all access to G2's rendered plot internals,
 * keeping the rest of the chart-style helpers limited to declarative options.
 */
export const bindCrosshairAxisLabels = (chart: Chart, theme: VisualizationTheme): (() => void) => {
  if (!chart || typeof chart.on !== 'function') return () => undefined;

  const tagStyle = getCrosshairTagStyle(getChartVisualTokens(theme));
  let boundPlot: any = null;
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

  const ensureCrosshairs = (plot: any, xText: string, yText: string) => {
    if (boundPlot !== plot) destroyCrosshairs();
    if (xCrosshair && yCrosshair) return;

    const verticalRule = plot?.ruleY?.style;
    const horizontalRule = plot?.ruleX?.style;
    const layer = plot?.parentNode || plot;
    if (!verticalRule || !horizontalRule || !layer?.appendChild) return;
    const [plotX = 0, plotY = 0] = plot?.getLocalPosition?.() || [0, 0];

    xCrosshair = new LineCrosshair({
      style: {
        ...tagStyle,
        startPos: [Number(verticalRule.x1) + plotX, Number(verticalRule.y1) + plotY],
        endPos: [Number(verticalRule.x2) + plotX, Number(verticalRule.y2) + plotY],
        tagText: xText,
        tagPosition: 'end',
      },
    });
    yCrosshair = new LineCrosshair({
      style: {
        ...tagStyle,
        startPos: [Number(horizontalRule.x1) + plotX, Number(horizontalRule.y1) + plotY],
        endPos: [Number(horizontalRule.x2) + plotX, Number(horizontalRule.y2) + plotY],
        tagText: yText,
        tagPosition: 'start',
      },
    });
    xCrosshair.style.zIndex = 7;
    yCrosshair.style.zIndex = 7;
    xCrosshair.style.pointerEvents = 'none';
    yCrosshair.style.pointerEvents = 'none';
    layer.appendChild(xCrosshair);
    layer.appendChild(yCrosshair);
    boundPlot = plot;
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

  const updateCrosshairs = (event: any) => {
    const context = chart.getContext?.();
    const plot: any = context?.canvas?.document?.getElementsByClassName?.('plot')?.[0];
    if (!plot) return;

    const view = context?.views?.find?.(
      (candidate: any) => candidate?.scale?.x && candidate?.scale?.y && candidate?.coordinate,
    );
    const scale = view?.scale;
    const coordinate = view?.coordinate;
    const xFormatter = scale?.x?.getFormatter?.();
    const yFormatter = scale?.y?.getFormatter?.();
    const yPrecision = getCrosshairScalePrecision(scale?.y);

    const verticalRule = plot?.ruleY?.style;
    const horizontalRule = plot?.ruleX?.style;
    const [plotX = 0, plotY = 0] = plot?.getLocalPosition?.() || [0, 0];
    const eventY = Number(event?.offsetY ?? event?.canvasY);
    const globalY = Number.isFinite(eventY) ? eventY : latestPointerY;
    const pointerY = Number.isFinite(globalY)
      ? Number(globalY) - plotY
      : Number(horizontalRule?.y1);
    const x = clamp(
      Number(verticalRule?.x1),
      Number(horizontalRule?.x1),
      Number(horizontalRule?.x2),
    );
    const y = clamp(pointerY, Number(verticalRule?.y1), Number(verticalRule?.y2));
    const xAxisY = Number(verticalRule?.y2) + plotY;
    const yAxisX = Number(horizontalRule?.x1) + plotX;
    let invertedPosition: any;
    try {
      invertedPosition = coordinate?.invert?.([x, y]);
    } catch {
      invertedPosition = undefined;
    }
    const xValue = latestXValue ?? invertCrosshairValue(scale?.x, invertedPosition?.[0]);
    const yValue =
      invertCrosshairValue(scale?.y, invertedPosition?.[1]) ?? event?.data?.items?.[0]?.value;
    const xText = formatCrosshairAxisValue(xValue, xFormatter);
    const yText = formatCrosshairAxisValue(yValue, yFormatter, yPrecision);

    if (
      !Number.isFinite(x) ||
      !Number.isFinite(y) ||
      !Number.isFinite(xAxisY) ||
      !Number.isFinite(yAxisX) ||
      !xText ||
      !yText
    ) {
      hideCrosshairs();
      return;
    }

    verticalRule.x1 = x;
    verticalRule.x2 = x;
    horizontalRule.y1 = y;
    horizontalRule.y2 = y;

    ensureCrosshairs(plot, xText, yText);
    if (!xCrosshair || !yCrosshair) return;

    xCrosshair.setText(xText);
    xCrosshair.setPointer([x + plotX, xAxisY]);
    xCrosshair.style.visibility = 'visible';
    yCrosshair.setText(yText);
    yCrosshair.setPointer([yAxisX, y + plotY]);
    yCrosshair.style.visibility = 'visible';
  };

  const onPointerMove = (event: any) => {
    const y = Number(event?.offsetY ?? event?.canvasY);
    if (Number.isFinite(y)) latestPointerY = y;
    updateCrosshairs(event);
  };

  const onTooltipShow = (event: any) => {
    if (!event?.nativeEvent) return;
    if (event?.data?.data?.x !== undefined) latestXValue = event.data.data.x;
    updateCrosshairs(event);
  };

  chart.on('tooltip:show', onTooltipShow);
  chart.on('tooltip:hide', hideCrosshairs);
  chart.on('plot:pointermove', onPointerMove);
  chart.on('plot:pointerleave', resetCrosshairs);

  return () => {
    chart.off?.('tooltip:show', onTooltipShow);
    chart.off?.('tooltip:hide', hideCrosshairs);
    chart.off?.('plot:pointermove', onPointerMove);
    chart.off?.('plot:pointerleave', resetCrosshairs);
    destroyCrosshairs();
  };
};
