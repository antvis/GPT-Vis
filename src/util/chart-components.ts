export type ChartLocale = 'en-US' | 'zh-CN';

export type CartesianXAxisOptions = {
  xLabels?: unknown[];
  chartWidth?: number;
};

export type CartesianAxisOptions = CartesianXAxisOptions & {
  axisXTitle?: string | false;
  axisYTitle?: string | false;
};

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

export const resolveChartLocale = (locale?: string): ChartLocale =>
  locale?.toLowerCase().startsWith('zh') ? 'zh-CN' : 'en-US';

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
  axisXTitle,
  axisYTitle,
  xLabels,
  chartWidth,
}: CartesianAxisOptions): Record<'x' | 'y', Record<string, unknown>> => {
  const useAngledXAxisLabels = shouldUseAngledXAxisLabels(xLabels, chartWidth);

  return {
    x: {
      title: axisXTitle || false,
      ...(useAngledXAxisLabels ? { labelTransform: 'rotate(45)', labelAutoRotate: false } : {}),
    },
    y: {
      title: axisYTitle || false,
    },
  };
};

export const getColorLegend = (visible: boolean): false | { color: Record<string, never> } =>
  visible ? { color: {} } : false;
