export type CommonOptions = {
  width?: number;
  height?: number;
  theme?: string;
  title?: string;
};

export interface BasePlotProps<T> {
  data: T[];
  axisXTitle?: string;
  axisYTitle?: string;
  legendTypeList?: string[];
}
