import { measureText } from 'measury';
import type { VisualizationOptions } from '../../types';

/**
 * TableConfig defines the configuration for rendering the table.
 */
export interface TableConfig {
  type?: 'table';
  data: Record<string, any>[];
  title?: string;
}

/**
 * TableInstance represents a table instance with render and destroy methods.
 */
export interface TableInstance {
  render: (config: TableConfig) => void;
  destroy: () => void;
}

const SCOPE_ID = '__gpt-vis-table__';

// CSS styles for the table component
const TABLE_STYLES = `
  .${SCOPE_ID} {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    overflow-x: auto;
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
`;

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
    const { data = [], title } = config;

    // Inject styles if not already present
    injectStyles();

    // Clean up previous render
    if (tableWrapper) {
      tableWrapper.remove();
    }

    // Create wrapper element
    tableWrapper = document.createElement('div');
    tableWrapper.className = SCOPE_ID;

    // Handle empty data case
    if (data.length === 0) {
      tableWrapper.innerHTML = `
        ${title ? `<div class="table-title">${title}</div>` : ''}
        <div style="padding: 20px; text-align: center; color: #999;">No data available</div>
      `;
      container.appendChild(tableWrapper);
      return;
    }

    // Get columns from the first data item
    const columns = Object.keys(data[0]);

    // Calculate the minimum width needed for the table
    let maxRowWidth = 0;
    const fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
    
    // Measure header row
    const headerWidth = columns.reduce((total, col) => {
      const metrics = measureText(String(col), { fontFamily, fontSize: 14, fontWeight: '600' });
      return total + metrics.width + 16; // 16 = padding (8px * 2)
    }, 0);
    maxRowWidth = Math.max(maxRowWidth, headerWidth);

    // Measure each data row
    data.forEach((row) => {
      const rowText = columns.map((col) => String(row[col] != null ? row[col] : '')).join('');
      const metrics = measureText(rowText, { fontFamily, fontSize: 14 });
      const rowWidth = metrics.width + columns.length * 16; // Add padding for each cell
      maxRowWidth = Math.max(maxRowWidth, rowWidth);
    });

    // Set min-width to 110% of the calculated width
    const minWidth = maxRowWidth * 1.1;

    // Build table HTML using template strings
    const headerHTML = columns.map((col) => `<th>${col}</th>`).join('');
    const bodyHTML = data
      .map(
        (row) =>
          `<tr>${columns.map((col) => `<td>${row[col] != null ? row[col] : ''}</td>`).join('')}</tr>`,
      )
      .join('');

    tableWrapper.innerHTML = `
      ${title ? `<div class="table-title">${title}</div>` : ''}
      <table style="min-width: ${minWidth}px;">
        <thead><tr>${headerHTML}</tr></thead>
        <tbody>${bodyHTML}</tbody>
      </table>
    `;

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
