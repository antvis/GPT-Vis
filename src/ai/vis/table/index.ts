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

// Generate a unique ID for CSS scoping using timestamp and random number for better uniqueness
const generateId = () =>
  `gpt-vis-table-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

// CSS styles for the table component
const getTableStyles = (scopeId: string) => `
  .${scopeId} {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  }

  .${scopeId} .table-title {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 12px;
    color: #1d2129;
  }

  .${scopeId} table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    background: #fff;
    border-radius: 8px;
    overflow: hidden;
  }

  .${scopeId} th,
  .${scopeId} td {
    border-bottom: 1px solid #f0f0f0;
    padding: 8px;
    text-align: left;
    font-size: 14px;
    color: #333;
  }

  .${scopeId} th {
    background: #f5f5f5;
    font-weight: 600;
    color: #000000e0;
    position: relative;
  }

  .${scopeId} th:not(:last-child)::after {
    content: '';
    position: absolute;
    top: 25%;
    right: 0;
    width: 1px;
    height: 50%;
    background: #e0e0e0;
  }

  .${scopeId} tr {
    transition: background 0.2s;
  }

  .${scopeId} tbody tr:hover {
    background: #f5f5f5;
    cursor: pointer;
  }
`;

// Inject CSS into the document head
const injectStyles = (scopeId: string): HTMLStyleElement => {
  const styleElement = document.createElement('style');
  styleElement.setAttribute('data-scope', scopeId);
  styleElement.textContent = getTableStyles(scopeId);
  document.head.appendChild(styleElement);
  return styleElement;
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

  const scopeId = generateId();
  let styleElement: HTMLStyleElement | null = null;
  let tableWrapper: HTMLDivElement | null = null;

  /**
   * Render the table with the given configuration.
   */
  const render = (config: TableConfig): void => {
    const { data = [], title } = config;

    // Clean up previous render
    if (tableWrapper) {
      tableWrapper.remove();
    }

    // Inject styles if not already injected
    if (!styleElement) {
      styleElement = injectStyles(scopeId);
    }

    // Create wrapper element
    tableWrapper = document.createElement('div');
    tableWrapper.className = scopeId;

    // Add title if provided
    if (title) {
      const titleElement = document.createElement('div');
      titleElement.className = 'table-title';
      titleElement.textContent = title;
      tableWrapper.appendChild(titleElement);
    }

    // Handle empty data case
    if (data.length === 0) {
      const emptyMessage = document.createElement('div');
      emptyMessage.style.padding = '20px';
      emptyMessage.style.textAlign = 'center';
      emptyMessage.style.color = '#999';
      emptyMessage.textContent = 'No data available';
      tableWrapper.appendChild(emptyMessage);
      container.appendChild(tableWrapper);
      return;
    }

    // Create table element
    const tableElement = document.createElement('table');

    // Get columns from the first data item
    const columns = Object.keys(data[0]);

    // Create table head
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    columns.forEach((col) => {
      const th = document.createElement('th');
      th.textContent = col;
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    tableElement.appendChild(thead);

    // Create table body
    const tbody = document.createElement('tbody');
    data.forEach((row) => {
      const tr = document.createElement('tr');
      columns.forEach((col) => {
        const td = document.createElement('td');
        td.textContent = row[col] != null ? String(row[col]) : '';
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
    tableElement.appendChild(tbody);

    // Append table to wrapper
    tableWrapper.appendChild(tableElement);

    // Append wrapper to container
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
    if (styleElement) {
      styleElement.remove();
      styleElement = null;
    }
  };

  return {
    render,
    destroy,
  };
};
