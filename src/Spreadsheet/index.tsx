import type { S2DataConfig, S2Options, ThemeName as S2ThemeName, ThemeCfg } from '@antv/s2';
import { PivotSheet, TableSheet } from '@antv/s2';
import '@antv/s2/dist/s2.min.css';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const SpreadsheetWrapper = styled.div`
  .spreadsheet-title {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 12px;
    color: #1d2129;
  }
  .spreadsheet-container {
    width: 100%;
    height: 100%;
  }
`;

/**
 * 主题名
 */
type ThemeName = 'default' | 'dark';

/**
 * 数据项
 */
type DataItem = Record<string, string | number | null | undefined>;

export type SpreadsheetProps = {
  /** 原始数据 */
  data: DataItem[];
  /** 行头字段（存在时为透视表） */
  rows?: string[];
  /** 列头字段/列顺序 */
  columns?: string[];
  /** 数值字段（存在时为透视表） */
  values?: string[];
  /** 主题名称 */
  theme?: ThemeName;
  /** 表格标题 */
  title?: string;
  /** 宽度 */
  width?: number;
  /** 高度 */
  height?: number;
};

const Spreadsheet = (props: SpreadsheetProps) => {
  const {
    data,
    rows,
    columns,
    values,
    theme = 'default',
    title,
    width = 600,
    height = 400,
  } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const s2Ref = useRef<PivotSheet | TableSheet | null>(null);

  // 判断是否为透视表：存在 rows 或 values 时为透视表
  const isPivot = (rows && rows.length > 0) || (values && values.length > 0);

  useEffect(() => {
    if (!containerRef.current) return;

    // 构建字段配置
    const fields: S2DataConfig['fields'] = {};

    if (isPivot) {
      // 透视表模式
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
      // 明细表模式
      if (columns && columns.length > 0) {
        fields.columns = columns;
      } else if (data.length > 0) {
        fields.columns = Object.keys(data[0]);
      }
    }

    const dataCfg: S2DataConfig = {
      data,
      fields,
    };

    const themeCfg: ThemeCfg = {
      name: theme as S2ThemeName,
    };

    const options: S2Options = {
      width,
      height,
    };

    // 销毁旧实例
    if (s2Ref.current) {
      s2Ref.current.destroy();
    }

    // 创建新实例
    const SheetClass = isPivot ? PivotSheet : TableSheet;
    const s2 = new SheetClass(containerRef.current, dataCfg, options);
    s2.setThemeCfg(themeCfg);
    s2.render();
    s2Ref.current = s2;

    return () => {
      if (s2Ref.current) {
        s2Ref.current.destroy();
        s2Ref.current = null;
      }
    };
  }, [data, rows, columns, values, theme, width, height, isPivot]);

  return (
    <SpreadsheetWrapper>
      {title && <div className="spreadsheet-title">{title}</div>}
      <div ref={containerRef} className="spreadsheet-container" />
    </SpreadsheetWrapper>
  );
};

export default Spreadsheet;
