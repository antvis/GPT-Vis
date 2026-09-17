import type { VisualizationTheme } from '../types';
import { appendChildren, createTextElement } from './dom';
import { CHART_STYLE_DEFAULTS, getChartVisualTokens } from './tokens';

export type SharedTooltipInteractionOptions = {
  crosshairs?: boolean;
};

export type PointHighlightStateOptions = {
  activeLineWidth?: number;
  inactiveOpacity?: number;
};

type TooltipContentItem = {
  color?: unknown;
  name?: unknown;
  value?: unknown;
};

type TooltipContentOptions = {
  title?: unknown;
  items?: TooltipContentItem[];
};

const toTooltipText = (value: unknown): string => (value == null ? '' : String(value));

const createTooltipItem = ({ color, name, value }: TooltipContentItem): HTMLLIElement => {
  const marker = document.createElement('span');
  marker.className = 'g2-tooltip-list-item-marker';
  marker.style.backgroundColor = toTooltipText(color);

  const nameText = toTooltipText(name);
  const nameLabel = createTextElement('span', nameText, 'g2-tooltip-list-item-name-label');
  nameLabel.title = nameText;

  const nameElement = document.createElement('span');
  nameElement.className = 'g2-tooltip-list-item-name';
  appendChildren(nameElement, marker, nameLabel);

  const valueText = toTooltipText(value);
  const valueElement = createTextElement('span', valueText, 'g2-tooltip-list-item-value');
  valueElement.title = valueText;

  const listItem = document.createElement('li');
  listItem.className = 'g2-tooltip-list-item';
  appendChildren(listItem, nameElement, valueElement);
  return listItem;
};

/** Render G2 tooltip content without passing external values through an HTML parser. */
export const renderTextTooltip = (
  _event: unknown,
  { title, items = [] }: TooltipContentOptions,
): HTMLDivElement => {
  const content = document.createElement('div');
  const titleText = toTooltipText(title);

  if (titleText) {
    appendChildren(content, createTextElement('div', titleText, 'g2-tooltip-title'));
  }

  const list = document.createElement('ul');
  list.className = 'g2-tooltip-list';
  appendChildren(list, ...items.map(createTooltipItem));
  appendChildren(content, list);
  return content;
};

export const getTooltipInteraction = (
  options: Record<string, unknown> = {},
): Record<string, unknown> => ({
  ...options,
  render: renderTextTooltip,
});

export const getSharedTooltipInteraction = ({
  crosshairs = false,
}: SharedTooltipInteractionOptions = {}): Record<string, unknown> =>
  getTooltipInteraction({
    shared: true,
    series: true,
    crosshairs,
  });

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

export const getSeriesHighlightByColorInteraction = (): Record<string, boolean> => ({
  elementHighlightByColor: true,
});

export const getLineHighlightState = (lineWidth: number): Record<string, any> => ({
  active: { lineWidth: lineWidth + 1, strokeOpacity: 1 },
  inactive: { strokeOpacity: CHART_STYLE_DEFAULTS.inactiveOpacity },
});
