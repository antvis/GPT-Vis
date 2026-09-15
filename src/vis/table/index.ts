import { measureText } from 'measury';

import type { VisualizationOptions } from '../../types';

/**
 * TableConfig defines the configuration for rendering the table.
 */
export interface TableConfig {
  type?: 'table';
  data: Record<string, any>[];
  title?: string;
  theme?: 'default' | 'dark';
}

/**
 * TableInstance represents a table instance with render and destroy methods.
 */
export interface TableInstance {
  render: (config: TableConfig) => void;
  destroy: () => void;
}

const SCOPE_ID = '__gpt-vis-table__';
const FONT_FAMILY =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
const CELL_PADDING = 16; // 8px * 2
const MIN_WIDTH_MULTIPLIER = 1.1;

// CSS styles for the table component
const TABLE_STYLES = `
  .${SCOPE_ID} {
    font-family: ${FONT_FAMILY};
    overflow: auto;
    height: 100%;
    padding: 16px;
  }

  .${SCOPE_ID} .table-title {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 12px;
    color: #1d2129;
  }

  .${SCOPE_ID} table {
    border-collapse: separate;
    border-spacing: 0;
    background: #fff;
    border-radius: 8px;
    overflow: hidden;
  }

  .${SCOPE_ID} th,
  .${SCOPE_ID} td {
    border-bottom: 1px solid #f0f0f0;
    padding: 8px;
    text-align: left;
    font-size: 14px;
    color: #333;
    white-space: nowrap;
  }

  .${SCOPE_ID} th {
    background: #f5f5f5;
    font-weight: 600;
    color: #000000e0;
    position: relative;
  }

  .${SCOPE_ID} th:not(:last-child)::after {
    content: '';
    position: absolute;
    top: 25%;
    right: 0;
    width: 1px;
    height: 50%;
    background: #e0e0e0;
  }

  .${SCOPE_ID} tr {
    transition: background 0.2s;
  }

  .${SCOPE_ID} tbody tr:hover {
    background: #f5f5f5;
    cursor: pointer;
  }

  .${SCOPE_ID}[data-theme="dark"] {
    background: #000;
  }

  .${SCOPE_ID}[data-theme="dark"] .table-title {
    color: #ffffffd9;
  }

  .${SCOPE_ID}[data-theme="dark"] table {
    background: #141414;
  }

  .${SCOPE_ID}[data-theme="dark"] th,
  .${SCOPE_ID}[data-theme="dark"] td {
    border-bottom: 1px solid #303030;
    color: #ffffffd9;
  }

  .${SCOPE_ID}[data-theme="dark"] th {
    background: #1f1f1f;
    color: #ffffffa6;
  }

  .${SCOPE_ID}[data-theme="dark"] th:not(:last-child)::after {
    background: #303030;
  }

  .${SCOPE_ID}[data-theme="dark"] tbody tr:hover {
    background: #1f1f1f;
  }
`;

/**
 * Calculate the minimum width needed for a table based on its data.
 * This is a pure function that measures text width and returns the calculated min-width.
 *
 * @param data - Table data array
 * @param columns - Column names array
 * @returns Calculated minimum width in pixels
 */
export const calculateTableMinWidth = (data: Record<string, any>[], columns: string[]): number => {
  let maxRowWidth = 0;

  // Measure header row
  const headerWidth = columns.reduce((total, col) => {
    const metrics = measureText(String(col), {
      fontFamily: FONT_FAMILY,
      fontSize: 14,
      fontWeight: '600',
    });
    return total + metrics.width + CELL_PADDING;
  }, 0);
  maxRowWidth = Math.max(maxRowWidth, headerWidth);

  // Measure each data row
  data.forEach((row) => {
    const rowText = columns.map((col) => String(row[col] != null ? row[col] : '')).join('');
    const metrics = measureText(rowText, {
      fontFamily: FONT_FAMILY,
      fontSize: 14,
    });
    const rowWidth = metrics.width + columns.length * CELL_PADDING;
    maxRowWidth = Math.max(maxRowWidth, rowWidth);
  });

  // Return min-width with 110% multiplier for optimal spacing
  return maxRowWidth * MIN_WIDTH_MULTIPLIER;
};

// Inject CSS into the document head if not already present
const injectStyles = (): void => {
  if (document.querySelector(`style[data-scope="${SCOPE_ID}"]`)) {
    return;
  }
  const styleElement = document.createElement('style');
  styleElement.setAttribute('data-scope', SCOPE_ID);
  styleElement.textContent = TABLE_STYLES;
  document.head.appendChild(styleElement);
};

/**
 * Table component using pure JavaScript.
 *
 * @example
 * ```ts
 * const table = Table({
 *   container: '#container',
 *   width: 600,
 *   height: 400,
 * });
 *
 * table.render({
 *   type: 'table',
 *   data: [
 *     { "Indicator": "经度(°)", "Mean": "104.15°", "Std": "±0.64°" },
 *     { "Indicator": "纬度(°)", "Mean": "31.60°", "Std": "±0.48°" },
 *   ],
 *   title: '一个文本标题',
 * });
 *
 * table.destroy();
 * ```
 */
export const Table = (options: VisualizationOptions): TableInstance => {
  const { theme: chartTheme = 'default' } = options;
  const container =
    typeof options.container === 'string'
      ? document.querySelector(options.container)
      : options.container;

  if (!container) {
    throw new Error('Container not found');
  }

  let tableWrapper: HTMLDivElement | null = null;

  /**
   * Render the table with the given configuration.
   */
  const render = (config: TableConfig): void => {
    const { data = [], title, theme = chartTheme } = config;

    // Inject styles if not already present
    injectStyles();

    // Clean up previous render
    if (tableWrapper) {
      tableWrapper.remove();
    }

    // Create wrapper element
    tableWrapper = document.createElement('div');
    tableWrapper.className = SCOPE_ID;
    if (theme === 'dark') {
      tableWrapper.setAttribute('data-theme', 'dark');
    }

    if (title) {
      const titleElement = document.createElement('div');
      titleElement.className = 'table-title';
      titleElement.textContent = title;
      tableWrapper.appendChild(titleElement);
    }

    // Handle empty data case
    if (data.length === 0) {
      const emptyElement = document.createElement('div');
      emptyElement.setAttribute('style', 'padding: 20px; text-align: center; color: #999;');
      emptyElement.textContent = 'No data available';
      tableWrapper.appendChild(emptyElement);
      container.appendChild(tableWrapper);
      return;
    }

    // Get columns from the first data item
    const columns = Object.keys(data[0]);

    // Calculate the minimum width needed for the table using pure function
    let minWidth = calculateTableMinWidth(data, columns);
    // Ensure a minimum width for columns
    minWidth = Math.max(minWidth, columns.length * 100);

    const tableElement = document.createElement('table');
    tableElement.setAttribute('style', `min-width: ${minWidth}px;`);

    const tableHead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    columns.forEach((col) => {
      const headerCell = document.createElement('th');
      headerCell.textContent = col;
      headerRow.appendChild(headerCell);
    });
    tableHead.appendChild(headerRow);
    tableElement.appendChild(tableHead);

    const tableBody = document.createElement('tbody');
    data.forEach((row) => {
      const bodyRow = document.createElement('tr');
      columns.forEach((col) => {
        const bodyCell = document.createElement('td');
        bodyCell.textContent = String(row[col] != null ? row[col] : '');
        bodyRow.appendChild(bodyCell);
      });
      tableBody.appendChild(bodyRow);
    });
    tableElement.appendChild(tableBody);
    tableWrapper.appendChild(tableElement);

    container.appendChild(tableWrapper);
  };

  /**
   * Destroy the table instance and clean up resources.
   */
  const destroy = (): void => {
    if (tableWrapper) {
      tableWrapper.remove();
      tableWrapper = null;
    }
  };

  return {
    render,
    destroy,
  };
};
