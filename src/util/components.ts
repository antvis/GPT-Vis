import type { Theme } from '@antv/g2';
import type { PluginOptions } from '@antv/g6';

export type ChartLocale = 'en-US' | 'zh-CN';

export const resolveChartLocale = (locale?: string): ChartLocale =>
  locale?.toLowerCase().startsWith('zh') ? 'zh-CN' : 'en-US';

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
  // Native overflowStroke chooses a contrasting outline when a label crosses its
  // mark's edge. Inside labels retain contrastReverse; explicit paint wins.
  const strokeTransform =
    paint?.stroke === undefined && style?.stroke === undefined ? [{ type: 'overflowStroke' }] : [];
  const transforms = [...contrastTransform, ...strokeTransform, ...(transform ?? [])];
  return [
    {
      ...content,
      ...(strokeTransform.length ? { lineWidth: 1.5, paintFirst: 'stroke' } : {}),
      ...(transforms.length ? { transform: transforms } : {}),
      ...style,
      ...paint,
    },
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
