import type { S2Options, ThemeCfg } from '@antv/s2';
import { createSpreadsheet } from '@antv/s2-ssr';
import type { SSRResult } from '../types';
import { CommonOptions } from './types';

/**
 * 明细表数据项
 */
type TableSheetDataItem = Record<string, string | number | null | undefined>;

/**
 * 明细表字段配置
 */
type TableSheetFields = {
  /** 列头字段 */
  columns?: string[];
};

/**
 * 明细表数据配置
 */
type TableSheetDataCfg = {
  /** 原始数据 */
  data: TableSheetDataItem[];
  /** 字段配置 */
  fields: TableSheetFields;
  /** 排序配置 */
  sortParams?: {
    sortFieldId: string;
    sortMethod: 'ASC' | 'DESC';
  }[];
};

/**
 * S2 明细表配置项
 */
export type TableSheetOptions = CommonOptions & {
  /** 数据配置 */
  dataCfg: TableSheetDataCfg;
  /** 主题配置 */
  themeCfg?: ThemeCfg;
  /** S2 表格参数配置 (保留渲染相关的基础配置) */
  options?: Pick<S2Options, 'totals' | 'frozen' | 'conditions' | 'style'>;
};

/**
 * 渲染明细表
 */
export async function TableSheet(options: TableSheetOptions): Promise<SSRResult> {
  const {
    width = 600,
    height = 400,
    dataCfg,
    themeCfg,
    renderPlugins,
    options: s2Options,
  } = options;

  return await createSpreadsheet({
    sheetType: 'table',
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
