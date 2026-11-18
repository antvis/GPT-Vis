import { measureTextWidth } from '@antv/component';
import type { AxisComponent, Chart, Theme } from '@antv/g2';
import type { VisualizationOptions } from '../types';
import { CHART_FONT_FAMILY } from './tokens';

type CartesianAxisOptions = {
  container?: VisualizationOptions['container'];
  chartWidth?: number;
  chartHeight?: number;
  /** When omitted, infer from values; category IDs opt out explicitly. */
  xType?: 'number' | 'category';
  /** Prefer thinning to rotation for dense line/area categories. */
  preferHorizontal?: boolean;
  /** Point scales place the first/last ticks at the plot edges, without half a band. */
  xTicksAtEdges?: boolean;
  xValues?: unknown[];
  axisXTitle?: string | false;
  axisYTitle?: string | false;
  transposed?: boolean;
};

const DEFAULT_MARGIN_RIGHT = 16;
const MAX_DIAGONAL_MARGIN_RIGHT = 64;
// Conservative space budget before G2 resolves the actual plot (not a component default).
const AXIS_HORIZONTAL_PADDING = 96;

type CategoryLayout = { angle: 0 | 45 | 90; textWidth: number; marginRight?: number };
type CategoryLayoutOptions = Pick<
  CartesianAxisOptions,
  'transposed' | 'preferHorizontal' | 'xTicksAtEdges'
> & {
  width: number;
  height: number;
  labelCount: number;
  fullWidth: number;
  fontSize: number;
};

/** GPT-Vis policy only; component handles text truncation and overlap hiding. */
export function createCartesianAxis(options: CartesianAxisOptions, theme: Theme = {}) {
  const { axisXTitle, axisYTitle, transposed, xValues = [], xType } = options;
  const numericX =
    xType === undefined
      ? xValues.length > 0 &&
        xValues.every((value) => typeof value === 'number' && Number.isFinite(value))
      : xType === 'number';
  const numericLabels = {
    labelAutoRotate: false,
    transform: [{ type: 'hide' }],
  };
  const horizontalNumericLabels = {
    labelTextAlign: (_datum: unknown, index: number, ticks?: unknown[]) =>
      !ticks || ticks.length === 1
        ? 'center'
        : index === 0
          ? 'left'
          : index === ticks.length - 1
            ? 'right'
            : 'center',
  };
  const category = numericX ? undefined : createCategoryAxis(options, theme);
  const axis: Record<'x' | 'y', AxisComponent> = {
    x: {
      title: axisXTitle || false,
      ...(category?.labels ?? { ...numericLabels, ...horizontalNumericLabels }),
    },
    y: {
      title: axisYTitle || false,
      ...numericLabels,
      ...(transposed ? horizontalNumericLabels : {}),
    },
  };
  return { axis, layout: category?.layout ?? (() => ({ marginRight: undefined })) };
}

export function getCartesianAxis(options: CartesianAxisOptions, theme: Theme = {}) {
  return createCartesianAxis(options, theme).axis;
}

/** Update right margin before G2's existing autoFit render. */
export function bindCartesianAxisLayout(
  chart: Chart,
  axis: ReturnType<typeof createCartesianAxis>,
) {
  const updateMargin = () => chart.attr('marginRight', axis.layout().marginRight);
  chart.on('beforechangesize', updateMargin);
  return () => chart.off('beforechangesize', updateMargin);
}

/** Supply one policy to both G2's size measurement and component's final rendering. */
function createCategoryAxis(options: CartesianAxisOptions, theme: Theme) {
  const { xValues = [], transposed, preferHorizontal } = options;
  const labels = [...new Set(xValues.map((value) => String(value ?? '')))];
  const font = {
    fontSize: 12,
    fontFamily: CHART_FONT_FAMILY,
    ...theme.axis,
    ...theme.axisX,
  };
  const labelFont = {
    fontSize: font.labelFontSize ?? font.fontSize,
    fontFamily: font.labelFontFamily ?? font.fontFamily,
    fontWeight: font.labelFontWeight,
    fontStyle: font.labelFontStyle,
  };
  // Recompute during G2 measurement/render so autoFit uses the current container.
  const getSize = () => {
    const element =
      typeof options.container === 'string'
        ? typeof document === 'undefined'
          ? null
          : document.getElementById(options.container) || document.querySelector(options.container)
        : options.container;
    const width = element?.clientWidth || options.chartWidth || 640;
    const height = element?.clientHeight || options.chartHeight || 400;
    return { width, height };
  };
  // Text and typography are fixed for this render; only container size changes.
  let fullWidth: number | undefined;
  const categoryLayout = (): CategoryLayout => {
    // measureTextWidth already caches individual text/font measurements in component.
    fullWidth ??= labels.reduce(
      (max, label) => Math.max(max, measureTextWidth(label, labelFont)),
      0,
    );
    return getCategoryLayout({
      ...getSize(),
      transposed,
      preferHorizontal,
      xTicksAtEdges: options.xTicksAtEdges,
      labelCount: labels.length,
      fullWidth,
      fontSize: Number(labelFont.fontSize),
    });
  };
  const categoryLabels: AxisComponent = {
    // Explicit rotation also prevents G2's measurement pass forcing 0°/90°.
    labelAutoRotate: false,
    labelTransform: () => `rotate(${categoryLayout().angle})`,
    labelWordWrap: true,
    labelWordWrapWidth: () => categoryLayout().textWidth,
    labelMaxLines: 1,
    labelTextOverflow: '…',
    transform: [{ type: 'hide' }],
  };
  if (preferHorizontal && !transposed) {
    categoryLabels.labelTextAlign = (
      datum: { value: number; label: string },
      index: number,
      ticks?: unknown[],
    ) => {
      const layout = categoryLayout();
      if (layout.angle !== 0) return 'start';
      if (!ticks || ticks.length <= 1 || (index !== 0 && index !== ticks.length - 1))
        return 'center';
      // Component supplies normalized tick positions. Keep band labels
      // centered unless their text may cross the canvas's default margin.
      const edge = index === 0 ? datum.value : 1 - datum.value;
      const available =
        Math.max(12, getSize().width - AXIS_HORIZONTAL_PADDING) * edge + DEFAULT_MARGIN_RIGHT;
      const text = String(datum.label);
      const textWidth = Math.min(measureTextWidth(text, labelFont), layout.textWidth);
      return textWidth / 2 <= available ? 'center' : index === 0 ? 'left' : 'right';
    };
  }
  return {
    labels: categoryLabels,
    layout: () => ({ marginRight: categoryLayout().marginRight }),
  };
}

/** Decide angle and text budget before G2 measures the axis; component hides remaining overlaps. */
function getCategoryLayout({
  width,
  height,
  transposed,
  preferHorizontal,
  xTicksAtEdges,
  labelCount,
  fullWidth,
  fontSize,
}: CategoryLayoutOptions): CategoryLayout {
  if (transposed) return { angle: 0, textWidth: Math.max(24, Math.min(120, width * 0.3)) };

  const limit = Math.max(24, Math.min(160, height * 0.5));
  if (labelCount <= 1) return { angle: 0, textWidth: limit };

  const slot = Math.max(12, (width - AXIS_HORIZONTAL_PADDING) / labelCount - 6);
  if (preferHorizontal) {
    if (fullWidth <= fontSize * 3 || fullWidth <= slot) return { angle: 0, textWidth: limit };
    const marginRight = getDiagonalMarginRight(
      width,
      fullWidth,
      fontSize,
      labelCount,
      xTicksAtEdges,
    );
    if (marginRight > MAX_DIAGONAL_MARGIN_RIGHT) return { angle: 90, textWidth: limit };
    const fitsDiagonal =
      fullWidth <= slot * Math.SQRT2 &&
      fullWidth <= limit &&
      (fullWidth + fontSize) / Math.SQRT2 <= height * 0.25;
    return {
      angle: fitsDiagonal ? 45 : 0,
      textWidth: fitsDiagonal ? fullWidth + 1 : limit,
      marginRight: fitsDiagonal ? marginRight : undefined,
    };
  }

  const longest = Math.min(limit, fullWidth);
  if (longest <= fontSize * 6 || longest <= slot) return { angle: 0, textWidth: limit };

  // Keep text attached to its tick. The last band leaves only half a slot at the edge.
  const diagonalWidth = Math.min(limit, slot / Math.SQRT2);
  return diagonalWidth >= Math.min(longest, fontSize * 3)
    ? { angle: 45, textWidth: diagonalWidth }
    : { angle: 90, textWidth: limit };
}

/** Reserve diagonal overhang without moving labels away from their ticks. */
function getDiagonalMarginRight(
  width: number,
  textWidth: number,
  fontSize: number,
  labelCount: number,
  ticksAtEdges = false,
): number {
  const projection = (textWidth + fontSize / 2) / Math.SQRT2;
  const edgeFraction = ticksAtEdges ? 0 : 1 / (2 * labelCount);
  // Increasing the margin also shrinks the last band's half-slot. Solve for
  // total right margin, including a 4px gap; point scales have no half-slot.
  return Math.max(
    DEFAULT_MARGIN_RIGHT,
    Math.ceil(
      (projection + 4 - (width - AXIS_HORIZONTAL_PADDING + DEFAULT_MARGIN_RIGHT) * edgeFraction) /
        (1 - edgeFraction),
    ),
  );
}
