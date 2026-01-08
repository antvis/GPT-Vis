import {
  createSpreadsheet,
  type Options as S2SSROptions,
} from '@antv/s2-ssr';
import type { SSRResult } from '../types';
import { CommonOptions } from './types';

/**
 * S2 明细表配置项
 * 直接透传 S2-SSR 的 Options 格式
 */
export type TableSheetOptions = CommonOptions &
  Omit<S2SSROptions, 'sheetType'>;

/**
 * 渲染明细表
 */
export async function TableSheet(
  options: TableSheetOptions,
): Promise<SSRResult> {
  return await createSpreadsheet({
    ...options,
    sheetType: 'table',
  });
}
