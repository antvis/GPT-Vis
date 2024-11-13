import type { CSSProperties } from 'react';
import { TEXT_THEME } from './constants';
import { ArrowDown, ArrowUp } from './custom-icons';
import { ProportionChart, SingleLineChart } from './mini-charts';
import type { VisTextProps } from './types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const INNER_ENTITY_TYPES = [
  'metric_name', // 指标名
  'metric_value', // 主指标值
  'other_metric_value', // 其他指标值
  'time_desc', // 时间描述
  'dim_value', // 维值
  'trend_desc', // 趋势描述
  'delta_value', // 变化值（非正非负）
  'ratio_value', // 变化率（非正非负）
  'delta_value_pos', // 变化值正
  'delta_value_neg', // 变化值负
  'ratio_value_pos', // 变化率正
  'ratio_value_neg', // 变化率负
  'proportion', // 占比
  'contribute_ratio', // 贡献度
] as const;

export type InnerEntityType = (typeof INNER_ENTITY_TYPES)[number];

export type TextEntityType = InnerEntityType | string;

export type TextEncoding = Partial<
  Pick<CSSProperties, 'color' | 'backgroundColor' | 'fontWeight'> & {
    /** 前缀 */
    prefix: string;
    /** 后缀 */
    suffix: string;

    // TODO @羽熙 支持更多文本映射通道，eg underline 等
  }
>;

export const STATICS_KEY = '__statics' as const;

/** 文本组件配置信息 */
export type TextConfig =
  // 实体短语类型映射
  Record<InnerEntityType & string, TextEncoding> & {
    // 静态组件映射, 如 icon 和 mimi-chart
    [STATICS_KEY]: Record<string, React.FC<VisTextProps>>;
  };

export const DEFAULT_VIS_TEXT_CONFIG: TextConfig = {
  [STATICS_KEY]: {
    'icon:arrow-up': ArrowUp,
    'icon:arrow-down': ArrowDown,
    'mini-chart:proportion': ProportionChart,
    // TODO @羽熙 当前仅支持单折线图，之后可以考虑支持多折线图，在组件内实现分支判断
    'mini-chart:line': SingleLineChart,
  },
  metric_name: {
    color: TEXT_THEME.black88,
    fontWeight: 500,
  },
  metric_value: {
    color: TEXT_THEME.primaryColor,
  },
  other_metric_value: {
    color: TEXT_THEME.black65,
  },
  delta_value: {
    color: TEXT_THEME.black65,
  },
  ratio_value: {
    color: TEXT_THEME.black65,
  },
  delta_value_pos: {
    color: TEXT_THEME.posColor,
    prefix: '+',
  },
  delta_value_neg: {
    color: TEXT_THEME.negColor,
    prefix: '-',
  },
  ratio_value_pos: {
    color: TEXT_THEME.posColor,
    prefix: 'icon:arrow-up',
  },
  ratio_value_neg: {
    color: TEXT_THEME.negColor,
    prefix: 'icon:arrow-down',
  },
  contribute_ratio: {
    color: TEXT_THEME.statisticsInsightColor,
  },
  trend_desc: {
    color: TEXT_THEME.statisticsInsightColor,
    suffix: 'mini-chart:line',
  },
  dim_value: {
    color: TEXT_THEME.black88,
  },
  time_desc: {
    color: TEXT_THEME.black88,
  },
  proportion: {
    suffix: 'mini-chart:proportion',
  },
};
