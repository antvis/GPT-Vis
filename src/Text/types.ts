import type { CSSProperties, PropsWithChildren } from 'react';
import type { TextEntityType } from './config';

/**
 * the props for the Text
 */
export type VisTextProps = PropsWithChildren<{
  // common props
  style?: CSSProperties;
  className?: string;

  children: string; // 明确指出 children 是文本

  /** 类型，包括内置的类型，以及 string 用于用户自行扩展 */
  type?: TextEntityType;
  /**
   * 原始数值
   * 用于传递各种情况的原始数据值，比如：
   * 1. metric_value: 未经过格式化的指标值，原始数据；eg 1.234
   * 2. proportion: 百分比，eg 0.37
   * 3. trend_desc: 趋势值，eg [1, 2, 6, 18, 24, 48]
   */
  origin?: any;
}>;
