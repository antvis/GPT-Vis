/** High-frequency subset of T8's public SeedTokenOptions. */
export interface SummaryComponentStyle {
  fontFamily?: string;
  fontSize?: number;
  lineHeight?: number;
  borderColor?: string;
  colorBase?: string;
  colorEntityBase?: string;
  colorHeadingBase?: string;
  colorPositive?: string;
  colorNegative?: string;
  colorConclusion?: string;
  colorDimensionValue?: string;
  colorMetricName?: string;
  colorMetricValue?: string;
  colorOtherValue?: string;
  colorLink?: string;
}

export interface SummaryStyle {
  backgroundColor?: string;
  summary?: SummaryComponentStyle;
}
