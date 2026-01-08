import {
  createSpreadsheet,
  type Options as S2SSROptions,
} from '@antv/s2-ssr';
import type { SSRResult } from '../types';
import { CommonOptions } from './types';

/**
 * S2 透视表配置项
 * 直接透传 S2-SSR 的 Options 格式
 */
export type PivotTableOptions = CommonOptions &
  Omit<S2SSROptions, 'sheetType'>;

/**
 * 渲染透视表
 */
export async function PivotTable(
  options: PivotTableOptions,
): Promise<SSRResult> {
  return await createSpreadsheet({
    ...options,
    sheetType: 'pivot',
  });
}
