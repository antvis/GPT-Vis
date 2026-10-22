import type { AxisStyle, ChartStyle, LabelStyle, LegendStyle, ThemeSeedTokens } from '../../types';
import { definedObject } from './helpers';

type G2TokenStyle = Pick<ChartStyle, 'axis' | 'legend' | 'label' | 'mark'>;

const resolveAxis = (tokens: ThemeSeedTokens): AxisStyle | undefined =>
  definedObject({
    lineStroke: tokens.colorStroke,
    lineLineWidth: tokens.lineWidth,
    tickStroke: tokens.colorStroke,
    tickLineWidth: tokens.lineWidth,
    gridStroke: tokens.colorStroke,
    gridLineWidth: tokens.lineWidth,
    labelFill: tokens.colorTextSecondary,
    labelFontFamily: tokens.fontFamily,
    labelFontSize: tokens.fontSize,
    labelFontWeight: tokens.fontWeight,
    labelSpacing: tokens.padding1,
    titleFill: tokens.colorTextSecondary,
    titleFontFamily: tokens.fontFamily,
    titleFontSize: tokens.fontSize,
    titleFontWeight: tokens.fontWeight,
    titleSpacing: tokens.padding2,
  });

const resolveLegend = (tokens: ThemeSeedTokens): LegendStyle | undefined =>
  definedObject({
    titleFill: tokens.colorText,
    titleFontFamily: tokens.fontFamily,
    titleFontSize: tokens.fontSize,
    titleFontWeight: tokens.fontWeight,
    titleSpacing: tokens.padding1,
    itemLabelFill: tokens.colorText,
    itemLabelFontFamily: tokens.fontFamily,
    itemLabelFontSize: tokens.fontSize,
    itemLabelFontWeight: tokens.fontWeight,
    itemLabelLineHeight: tokens.lineHeight,
    itemSpacing: tokens.padding1,
    rowPadding: tokens.padding1,
    colPadding: tokens.padding2,
  });

const resolveLabel = (tokens: ThemeSeedTokens): LabelStyle | undefined =>
  definedObject({
    fontFamily: tokens.fontFamily,
    fontSize: tokens.fontSize,
    fontWeight: tokens.fontWeight,
    lineHeight: tokens.lineHeight,
  });

/** Expand seed tokens into G2 components and marks only. */
export const expandG2Tokens = (tokens: ThemeSeedTokens): G2TokenStyle => {
  const lineStyle = definedObject({ lineWidth: tokens.lineWidth });
  const sankeyStyle = definedObject({
    nodeStroke: tokens.colorStroke,
    nodeLineWidth: tokens.lineWidth,
    linkStroke: tokens.colorStroke,
    linkLineWidth: tokens.lineWidth,
    labelFill: tokens.colorText,
    labelFontFamily: tokens.fontFamily,
    labelFontSize: tokens.fontSize,
    labelFontWeight: tokens.fontWeight,
  });

  return {
    axis: resolveAxis(tokens),
    legend: resolveLegend(tokens),
    label: resolveLabel(tokens),
    mark: definedObject({
      line: lineStyle,
      point: lineStyle,
      interval: definedObject({ lineWidth: tokens.lineWidth, radius: tokens.radius }),
      box: lineStyle,
      connector: lineStyle,
      path: lineStyle,
      density: lineStyle,
      link: lineStyle,
      treemap: definedObject({ lineWidth: tokens.lineWidth, radius: tokens.radius }),
      liquid: definedObject({
        contentFill: tokens.colorText,
        contentFontFamily: tokens.fontFamily,
        contentFontWeight: tokens.fontWeight,
        backgroundFill: tokens.colorSurface,
        backgroundStroke: tokens.colorStroke,
        outlineStroke: tokens.colorDefault,
      }),
      sankey: sankeyStyle,
      wordCloud: definedObject({ fontFamily: tokens.fontFamily }),
    }),
  };
};
