import { measureText } from 'measury';
import { getThemeObject } from '../../theme';
import type { TableStyle, ThemeInput, VisualizationOptions } from '../../types';
import { escapeHtml } from '../../util/html';

/**
 * TableConfig defines the configuration for rendering the table.
 */
export interface TableConfig {
  type?: 'table';
  data: Record<string, any>[];
  title?: string;
  subtitle?: string;
  theme?: ThemeInput;
  style?: TableStyle;
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

  .${SCOPE_ID} .table-heading {
    margin-bottom: 12px;
  }

  .${SCOPE_ID} .table-title {
    font-size: 16px;
    font-weight: 500;
    color: #1d2129;
  }

  .${SCOPE_ID} .table-subtitle {
    margin-top: 4px;
    font-size: 12px;
    color: #667085;
  }

  .${SCOPE_ID} .table-empty {
    padding: 20px;
    text-align: center;
    color: #999;
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

  .${SCOPE_ID}[data-theme="dark"] .table-subtitle {
    color: #ffffffa6;
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

const applyDomStyle = (
  elements: Element | Iterable<Element> | null,
  style: Record<string, string>,
): void => {
  if (!elements) return;
  const targets = elements instanceof Element ? [elements] : elements;
  for (const target of targets as Iterable<HTMLElement>) {
    Object.assign(target.style, style);
  }
};

const applyResolvedTableStyle = (
  wrapper: HTMLElement,
  style: ReturnType<typeof getThemeObject<'table'>>,
): void => {
  applyDomStyle(wrapper.querySelector('.table-title'), style.title);
  applyDomStyle(wrapper.querySelector('.table-subtitle'), style.subtitle);
  applyDomStyle(wrapper.querySelectorAll('th'), style.header);
  applyDomStyle(wrapper.querySelectorAll('td'), style.cell);

  const borderStyle = style.border;
  applyDomStyle(wrapper.querySelector('table'), borderStyle.table);
  applyDomStyle(wrapper.querySelectorAll('th, td'), borderStyle.cell);
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
    const { data = [], title, subtitle, theme = chartTheme, style: localStyle = {} } = config;
    const style = getThemeObject('table', theme, { style: localStyle });
    const { rendererTheme } = style;

    // Inject styles if not already present
    injectStyles();

    // Clean up previous render
    if (tableWrapper) {
      tableWrapper.remove();
    }

    // Create wrapper element
    tableWrapper = document.createElement('div');
    tableWrapper.className = SCOPE_ID;
    if (rendererTheme === 'dark') {
      tableWrapper.setAttribute('data-theme', 'dark');
    }
    if (style.backgroundColor) tableWrapper.style.backgroundColor = style.backgroundColor;

    const titleHTML =
      title || subtitle
        ? `<div class="table-heading">
            ${title ? `<div class="table-title">${escapeHtml(title)}</div>` : ''}
            ${subtitle ? `<div class="table-subtitle">${escapeHtml(subtitle)}</div>` : ''}
          </div>`
        : '';

    // Handle empty data case
    if (data.length === 0) {
      tableWrapper.innerHTML = `
        ${titleHTML}
        <div class="table-empty">No data available</div>
      `;
      applyResolvedTableStyle(tableWrapper, style);
      container.appendChild(tableWrapper);
      return;
    }

    // Get columns from the first data item
    const columns = Object.keys(data[0]);

    // Calculate the minimum width needed for the table using pure function
    let minWidth = calculateTableMinWidth(data, columns);
    // Ensure a minimum width for columns
    minWidth = Math.max(minWidth, columns.length * 100);

    const headerHTML = columns.map((column) => `<th>${escapeHtml(column)}</th>`).join('');
    const bodyHTML = data
      .map(
        (row) =>
          `<tr>${columns.map((column) => `<td>${escapeHtml(row[column])}</td>`).join('')}</tr>`,
      )
      .join('');

    tableWrapper.innerHTML = `
      ${titleHTML}
      <table style="min-width: ${minWidth}px;">
        <thead><tr>${headerHTML}</tr></thead>
        <tbody>${bodyHTML}</tbody>
      </table>
    `;

    applyResolvedTableStyle(tableWrapper, style);
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
