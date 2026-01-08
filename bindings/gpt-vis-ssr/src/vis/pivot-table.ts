import type { S2Options, ThemeCfg } from '@antv/s2';
import { createSpreadsheet } from '@antv/s2-ssr';
import type { SSRResult } from '../types';
import { CommonOptions } from './types';

/**
 * 透视表数据项
 */
type PivotTableDataItem = Record<string, string | number | null | undefined>;

/**
 * 透视表字段配置
 */
type PivotTableFields = {
  /** 行头字段 */
  rows?: string[];
  /** 列头字段 */
  columns?: string[];
  /** 数值字段 */
  values?: string[];
  /** 数值是否置于列头 */
  valueInCols?: boolean;
};

/**
 * 透视表数据配置
 */
type PivotTableDataCfg = {
  /** 原始数据 */
  data: PivotTableDataItem[];
  /** 字段配置 */
  fields: PivotTableFields;
  /** 排序配置 */
  sortParams?: {
    sortFieldId: string;
    sortMethod: 'ASC' | 'DESC';
  }[];
};

/**
 * S2 透视表配置项
 */
export type PivotTableOptions = CommonOptions & {
  /** 数据配置 */
  dataCfg: PivotTableDataCfg;
  /** 主题配置 */
  themeCfg?: ThemeCfg;
  /** S2 表格参数配置 (保留渲染相关的基础配置) */
  options?: Pick<S2Options, 'totals' | 'frozen' | 'conditions' | 'style'>;
};

/**
 * 渲染透视表
 */
export async function PivotTable(options: PivotTableOptions): Promise<SSRResult> {
  const {
    width = 600,
    height = 400,
    dataCfg,
    themeCfg,
    renderPlugins,
    options: s2Options,
  } = options;

  return await createSpreadsheet({
    sheetType: 'pivot',
    width,
    height,
    dataCfg,
    themeCfg,
    options: s2Options,
    // 默认开启自动适配和 2倍像素比，不仅减少配置，也保证产物清晰度
    devicePixelRatio: 2,
    autoFit: true,
    renderPlugins,
  });
}
