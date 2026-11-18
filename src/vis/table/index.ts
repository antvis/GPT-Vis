import { measureText } from 'measury';
import { bindAnnotations } from '../../annotation';
import { getAnnotationDefaults } from '../../theme/annotation';
import { getThemeObject } from '../../theme/table';
import type { ThemeStyle, VisualizationOptions, VisualizationTheme } from '../../types';
import type { TableAnnotation } from '../../types/annotation';

/**
 * TableConfig defines the configuration for rendering the table.
 */
export interface TableConfig {
  type?: 'table';
  data: Record<string, any>[];
  title?: string;
  subtitle?: string;
  theme?: VisualizationTheme;
  style?: ThemeStyle;
  annotations?: TableAnnotation<Record<string, unknown>>[];
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
    line-height: normal;
    overflow-wrap: normal;
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
    target.removeAttribute('style');
    Object.assign(target.style, style);
  }
};

const applyResolvedTableStyle = (
  wrapper: HTMLElement,
  style: ReturnType<typeof getThemeObject>,
): void => {
  applyDomStyle(wrapper.querySelector('.table-title'), style.title);
  applyDomStyle(wrapper.querySelector('.table-subtitle'), style.subtitle);
  const borderStyle = style.border;
  applyDomStyle(wrapper.querySelectorAll('th'), { ...style.header, ...borderStyle.cell });
  applyDomStyle(wrapper.querySelectorAll('td'), { ...style.cell, ...borderStyle.cell });
  applyDomStyle(wrapper.querySelector('table'), borderStyle.table);
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
  let elements: ReturnType<typeof createContent> | undefined;
  let cleanupAnnotations: (() => void) | undefined;

  const createContent = () => {
    const content = document.createElement('div');
    content.style.overflow = 'auto';
    const heading = document.createElement('div');
    heading.className = 'table-heading';
    const title = heading.appendChild(document.createElement('div'));
    title.className = 'table-title';
    const subtitle = heading.appendChild(document.createElement('div'));
    subtitle.className = 'table-subtitle';
    content.appendChild(heading);
    const empty = content.appendChild(document.createElement('div'));
    empty.className = 'table-empty';
    empty.textContent = 'No data available';
    const table = content.appendChild(document.createElement('table'));
    const header = table
      .appendChild(document.createElement('thead'))
      .appendChild(document.createElement('tr'));
    const body = table.appendChild(document.createElement('tbody'));
    return { content, heading, title, subtitle, empty, table, header, body };
  };

  // Rows have no public key field; preserve their slots and update only changed cell text.
  const updateCells = (row: HTMLElement, values: unknown[], tag: 'th' | 'td') => {
    while (row.children.length > values.length) row.lastElementChild!.remove();
    values.forEach((value, index) => {
      const cell = row.children[index] ?? row.appendChild(document.createElement(tag));
      const text = value == null ? '' : String(value);
      if (cell.textContent !== text) cell.textContent = text;
    });
  };

  /**
   * Render the table with the given configuration.
   */
  const render = (config: TableConfig): void => {
    const { data = [], title, subtitle, theme = chartTheme, style: localStyle = {} } = config;
    const style = getThemeObject('table', theme, localStyle);
    const { theme: rendererTheme } = style;

    // Inject styles if not already present
    injectStyles();

    cleanupAnnotations?.();
    cleanupAnnotations = undefined;
    if (!tableWrapper) {
      tableWrapper = document.createElement('div');
      tableWrapper.className = SCOPE_ID;
      elements = createContent();
      tableWrapper.appendChild(elements.content);
      container.appendChild(tableWrapper);
    }
    const wrapper = tableWrapper;
    const {
      content,
      heading,
      title: titleElement,
      subtitle: subtitleElement,
      empty,
      table,
      header,
      body,
    } = elements!;
    wrapper.setAttribute('data-theme', rendererTheme);
    wrapper.style.backgroundColor = style.backgroundColor ?? '';
    heading.hidden = !title && !subtitle;
    titleElement.hidden = !title;
    subtitleElement.hidden = !subtitle;
    titleElement.textContent = title ?? '';
    subtitleElement.textContent = subtitle ?? '';
    empty.hidden = data.length > 0;
    table.hidden = data.length === 0;
    const columns = Object.keys(data[0] ?? {});
    updateCells(header, columns, 'th');
    while (body.children.length > data.length) body.lastElementChild!.remove();
    data.forEach((row, index) => {
      const element = body.children[index] as HTMLElement | undefined;
      const target = element ?? body.appendChild(document.createElement('tr'));
      updateCells(
        target,
        columns.map((column) => row[column]),
        'td',
      );
    });

    applyResolvedTableStyle(wrapper, style);
    table.style.minWidth = `${Math.max(calculateTableMinWidth(data, columns), columns.length * 100)}px`;
    if (config.annotations?.length) {
      cleanupAnnotations = bindAnnotations({
        renderer: 'table',
        container: wrapper,
        content,
        data,
        annotations: config.annotations,
        defaults: getAnnotationDefaults('table', theme, localStyle),
      });
    }
  };

  /**
   * Destroy the table instance and clean up resources.
   */
  const destroy = (): void => {
    cleanupAnnotations?.();
    cleanupAnnotations = undefined;
    if (tableWrapper) {
      tableWrapper.remove();
      tableWrapper = null;
      elements = undefined;
    }
  };

  return {
    render,
    destroy,
  };
};
