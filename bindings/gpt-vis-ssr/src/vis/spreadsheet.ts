import { createSpreadsheet } from '@antv/s2-ssr';
import type { SSRResult } from '../types';
import { CommonOptions } from './types';

/**
 * 主题名，可选值：default, dark
 */
type ThemeName = 'default' | 'dark';

/**
 * 数据项
 */
type DataItem = Record<string, string | number | null | undefined>;

/**
 * S2 表格配置项
 * - 当存在 rows 或 values 时，渲染为交叉表（pivot）
 * - 当 rows 和 values 都不存在时，渲染为普通表格（table）
 */
export type SpreadsheetOptions = CommonOptions & {
  /** 原始数据 */
  data: DataItem[];
  /** 行头字段（交叉表专用） */
  rows?: string[];
  /** 列头字段，用于指定列的顺序 */
  columns?: string[];
  /** 数值字段（交叉表专用） */
  values?: string[];
  /** 主题名称 */
  theme?: ThemeName;
};

/**
 * 渲染表格
 * 根据 rows/values 是否存在自动判断表格类型
 */
export async function Spreadsheet(options: SpreadsheetOptions): Promise<SSRResult> {
  const {
    width = 600,
    height = 400,
    data,
    rows,
    columns,
    values,
    theme = 'default',
    renderPlugins,
  } = options;

  // 判断是否为交叉表：存在 rows 或 values 时为交叉表
  const isPivot = (rows && rows.length > 0) || (values && values.length > 0);
  const sheetType = isPivot ? 'pivot' : 'table';

  // 构建字段配置
  const fields: { rows?: string[]; columns?: string[]; values?: string[] } = {};

  if (isPivot) {
    // 交叉表模式
    if (rows && rows.length > 0) {
      fields.rows = rows;
    }
    if (columns && columns.length > 0) {
      fields.columns = columns;
    }
    if (values && values.length > 0) {
      fields.values = values;
    }
  } else {
    // 普通表格模式
    if (columns && columns.length > 0) {
      // 使用指定的列顺序
      fields.columns = columns;
    } else if (data.length > 0) {
      // 按数据第一项的字段顺序
      fields.columns = Object.keys(data[0]);
    }
  }

  return await createSpreadsheet({
    sheetType,
    width,
    height,
    dataCfg: {
      data,
      fields,
    },
    themeCfg: {
      name: theme,
    },
    // 默认开启自动适配和 2倍像素比，不仅减少配置，也保证产物清晰度
    devicePixelRatio: 2,
    autoFit: true,
    renderPlugins,
  });
}
