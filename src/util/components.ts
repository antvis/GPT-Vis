import type { Theme } from '@antv/g2';
import type { PluginOptions } from '@antv/g6';

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

/** Label content and placement belong to the chart; paint comes from the native theme. */
export function getDataLabels(
  theme: Theme,
  {
    visible,
    defaultVisible = false,
    contrast,
    style,
    transform,
    ...content
  }: {
    visible?: boolean;
    defaultVisible?: boolean;
    contrast?: 'inside' | 'outside';
    style?: Record<string, unknown>;
    transform?: Record<string, unknown>[];
    text: unknown;
    position?: string;
    dx?: number;
    dy?: number;
    formatter?: string;
  },
): Record<string, unknown>[] | undefined {
  if (visible === false) return [];
  if (visible !== true && !defaultVisible) return undefined;
  const paint = contrast === 'inside' ? theme.innerLabel : theme.label;
  const textColor = theme.label?.fill;
  const inverseColor = theme.innerLabel?.fill;
  const contrastTransform =
    contrast === 'inside' && textColor !== inverseColor
      ? [{ type: 'contrastReverse', palette: [textColor, inverseColor] }]
      : [];
  const transforms = [...contrastTransform, ...(transform ?? [])];
  return [
    { ...content, ...(transforms.length ? { transform: transforms } : {}), ...style, ...paint },
  ];
}

/** Keep the title plugin's canvas and graph padding in step with its typography. */
export function getGraphTitle(title?: string, subtitle?: string, style: Record<string, any> = {}) {
  if (!title)
    return {
      plugins: [] as PluginOptions,
      padding: 20 as number | [number, number, number, number],
    };
  const contentHeight =
    Math.ceil((style.titleFontSize ?? 16) * 1.2) +
    (subtitle ? (style.spacing ?? 8) + Math.ceil((style.subtitleFontSize ?? 12) * 1.2) : 0);
  return {
    plugins: [
      { key: 'title', type: 'title', title, subtitle, ...style, size: Math.max(44, contentHeight) },
    ] as PluginOptions,
    padding: [Math.max(46, Math.ceil(contentHeight + 24)), 20, 20, 20] as [
      number,
      number,
      number,
      number,
    ],
  };
}
