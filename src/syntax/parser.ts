/**
 * GPT-Vis Syntax Parser
 *
 * Parses a markdown-like syntax for visualization configurations.
 *
 * Syntax rules:
 * - `vis [chartType]` - Defines the chart type (required first line)
 * - `data` - Starts a data array section
 * - `  - key value` - Array item with key-value pairs
 * - `  - value` - Simple array item (for flat arrays like histogram data)
 * - `key: value` or `key value` - Top-level key-value pair
 * - `style` - Starts a style object section
 * - Multiple values separated by spaces become arrays (e.g., `palette #ff5a5f #1fb6ff`)
 * - `children` - Nested array for hierarchical data (mind-map, treemap, etc.)
 *
 * @example
 * ```
 * vis pie
 * data
 *   - category 分类一
 *     value 27
 *   - category 分类二
 *     value 25
 * innerRadius: 0.6
 * style
 *   backgroundColor #333
 *   palette #ff5a5f #1fb6ff #13ce66
 * ```
 *
 * @example Simple array (histogram)
 * ```
 * vis histogram
 * data
 *   - 78
 *   - 88
 *   - 60
 * binNumber 5
 * ```
 *
 * @example Hierarchical data (mind-map)
 * ```
 * vis mind-map
 * data
 *   - name 项目计划
 *     children
 *       - name 研究阶段
 *         children
 *           - name 市场调研
 *           - name 技术可行性分析
 *       - name 开发阶段
 * ```
 */

/**
 * Parsed chart configuration result
 */
export interface ParsedConfig {
  type: string;
  [key: string]: unknown;
}

// Known section names that contain arrays
const ARRAY_SECTIONS = new Set(['data', 'categories', 'series', 'children', 'nodes', 'edges']);

// Known section names that contain objects
const OBJECT_SECTIONS = new Set(['style']);

/**
 * Try to parse a value as number, boolean, or keep as string
 */
function parseValue(value: string): unknown {
  // Trim the value
  const trimmed = value.trim();

  // Empty string
  if (trimmed === '') {
    return '';
  }

  // Boolean values
  if (trimmed === 'true') return true;
  if (trimmed === 'false') return false;

  // Numeric values
  const num = Number(trimmed);
  if (!isNaN(num) && trimmed !== '') {
    return num;
  }

  return trimmed;
}

/**
 * Parse multiple space-separated values into an array or single value
 * Used for style properties like palette where multiple colors are expected
 */
function parseMultipleValues(values: string): unknown {
  const trimmed = values.trim();

  // Split by spaces, but handle the case where we want a single value
  const parts = trimmed.split(/\s+/).filter((p) => p.length > 0);

  if (parts.length === 0) {
    return '';
  }

  if (parts.length === 1) {
    return parseValue(parts[0]);
  }

  // Multiple values become an array
  return parts.map(parseValue);
}

/**
 * Parse a key-value line (supports "key: value", "key=value" and "key value" formats)
 * Supports Unicode characters (Chinese, Japanese, Korean, etc.) in key names
 * Also supports special characters like parentheses, percent signs in key names
 */
function parseKeyValue(raw: string): { key: string; value: string } | null {
  const text = raw.trim();
  if (!text) return null;
  const match = text.match(/^([^:\s=]+)\s*[:=]\s*(.*)$/);
  if (match) {
    return { key: match[1], value: match[2] };
  }
  const matchSpace = text.match(/^([^\s]+)\s+(.*)$/);
  if (matchSpace) {
    return { key: matchSpace[1], value: matchSpace[2] };
  }
  return { key: text, value: '' };
}

/**
 * Check if a value is a simple value (not a key-value pair)
 * Simple values are: numbers, strings that don't look like key-value pairs
 */
function isSimpleValue(line: string): boolean {
  const trimmed = line.trim();

  // Check if it looks like a key-value pair
  const hasKeyValue = parseKeyValue(trimmed);
  if (hasKeyValue && hasKeyValue.value !== '') {
    return false;
  }

  // It's a simple value (number, string without spaces matching key pattern)
  return true;
}

/**
 * Get the indentation level of a line (normalized to units of 2 spaces)
 */
function getIndentLevel(line: string): number {
  const match = line.match(/^(\s*)/);
  return match ? match[1].length : 0;
}

/**
 * Check if a line is an array item marker (starts with -)
 */
function isArrayItemLine(line: string): boolean {
  return line.trim().startsWith('-');
}

/**
 * Parse an array item line (removes the leading -)
 */
function parseArrayItemLine(line: string): string {
  return line.trim().replace(/^-\s*/, '');
}

/**
 * Check if a key is a known section name (data, style, etc.)
 */
function isKnownSection(key: string): boolean {
  return ARRAY_SECTIONS.has(key) || OBJECT_SECTIONS.has(key);
}

/**
 * Line information for parsing
 */
interface LineInfo {
  line: string;
  trimmed: string;
  indent: number;
  lineNumber: number;
}

/**
 * Parse lines into line info array
 */
function parseLines(syntax: string): LineInfo[] {
  const lines = syntax.split('\n');
  const result: LineInfo[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Skip empty lines
    if (trimmed === '') {
      continue;
    }

    result.push({
      line,
      trimmed,
      indent: getIndentLevel(line),
      lineNumber: i,
    });
  }

  return result;
}

/**
 * Parse an array of items (data, children, etc.)
 * Supports nested children arrays for hierarchical data
 */
function parseArraySection(
  lines: LineInfo[],
  startIndex: number,
  baseIndent: number,
): { items: unknown[]; nextIndex: number } {
  const items: unknown[] = [];
  let currentItem: Record<string, unknown> | null = null;
  let isSimpleArray = false;
  let i = startIndex;
  let firstItemIndent = -1;

  while (i < lines.length) {
    const { trimmed, indent } = lines[i];

    // If we see something at base indent level or lower and it's not an array item,
    // we're done with this section
    if (indent <= baseIndent && !isArrayItemLine(trimmed)) {
      break;
    }

    // If we see an array item at a lower or equal indent to base,
    // we've reached a sibling at the parent level - return
    if (isArrayItemLine(trimmed) && indent <= baseIndent) {
      break;
    }

    // Check if this is a new array item at our level
    const isThisLevelItem =
      isArrayItemLine(trimmed) && (firstItemIndent === -1 || indent === firstItemIndent);

    // Handle array item marker at our level
    if (isThisLevelItem) {
      // Set the first item indent if not yet set
      if (firstItemIndent === -1) {
        firstItemIndent = indent;
      }

      // Save previous item if exists
      if (currentItem !== null && !isSimpleArray) {
        items.push(currentItem);
      }

      const itemContent = parseArrayItemLine(trimmed);

      if (itemContent) {
        // Determine if this is a simple value or a key-value pair
        if (isSimpleValue(itemContent)) {
          // Simple value array (e.g., histogram data: [78, 88, 60])
          isSimpleArray = true;
          items.push(parseValue(itemContent));
          currentItem = null;
        } else {
          // Object array with key-value pairs
          currentItem = {};
          const kv = parseKeyValue(itemContent);
          if (kv) {
            currentItem[kv.key] = parseValue(kv.value);
          }
        }
      } else {
        // Empty array item marker, start a new object
        currentItem = {};
      }
      i++;
      continue;
    }

    // If we have a first item indent set and we see an array item at a different indent,
    // it might be a nested child's item - just skip for now, let nested parsing handle it
    if (isArrayItemLine(trimmed) && firstItemIndent !== -1 && indent !== firstItemIndent) {
      // This shouldn't happen if we're parsing correctly - skip and continue
      i++;
      continue;
    }

    // Handle properties of current item (including nested children)
    if (currentItem !== null && !isSimpleArray) {
      const kv = parseKeyValue(trimmed);
      if (kv) {
        // Check if this is a 'children' key (start of nested array)
        if (kv.key === 'children' && kv.value === '') {
          // Parse nested children array - the children start after this line
          const { items: childItems, nextIndex } = parseArraySection(lines, i + 1, indent);
          currentItem.children = childItems;
          i = nextIndex;
          continue;
        } else {
          currentItem[kv.key] = parseValue(kv.value);
        }
      }
    }

    i++;
  }

  // Save last item if exists
  if (currentItem !== null && !isSimpleArray) {
    items.push(currentItem);
  }

  return { items, nextIndex: i };
}

/**
 * Parse the visualization syntax string into a configuration object
 */
export function parse(syntax: string): ParsedConfig {
  const lines = parseLines(syntax);
  const result: ParsedConfig = { type: '' };

  let i = 0;
  while (i < lines.length) {
    const { trimmed, indent } = lines[i];

    // Handle "vis [type]" declaration
    if (trimmed.startsWith('vis ')) {
      const chartType = trimmed.substring(4).trim();
      result.type = chartType;
      i++;
      continue;
    }

    // Check for section headers (data, style, etc.) - single word, no indentation
    const isSectionHeader =
      /^[a-zA-Z_][a-zA-Z0-9_-]*$/.test(trimmed) && indent === 0 && isKnownSection(trimmed);

    if (isSectionHeader) {
      if (ARRAY_SECTIONS.has(trimmed)) {
        // Check if the next non-empty indented line is a sub-section header (e.g. nodes/edges inside data)
        const sectionName = trimmed;
        const nextIndex = i + 1;
        let hasSubSections = false;

        if (nextIndex < lines.length && lines[nextIndex].indent > indent) {
          const nextTrimmed = lines[nextIndex].trimmed;
          hasSubSections =
            /^[a-zA-Z_][a-zA-Z0-9_-]*$/.test(nextTrimmed) && !isArrayItemLine(nextTrimmed);
        }

        if (hasSubSections) {
          // Parse as an object with named sub-arrays (e.g. data: { nodes: [], edges: [] })
          const dataObj: Record<string, unknown> = {};
          i++;
          while (i < lines.length && lines[i].indent > indent) {
            const subTrimmed = lines[i].trimmed;
            const subIndent = lines[i].indent;
            if (/^[a-zA-Z_][a-zA-Z0-9_-]*$/.test(subTrimmed) && !isArrayItemLine(subTrimmed)) {
              const { items: subItems, nextIndex: subNext } = parseArraySection(
                lines,
                i + 1,
                subIndent,
              );
              dataObj[subTrimmed] = subItems;
              i = subNext;
            } else {
              i++;
            }
          }
          result[sectionName] = dataObj;
          continue;
        }

        // Parse array section (standard behavior)
        const { items, nextIndex: arrNext } = parseArraySection(lines, i + 1, indent);
        if (items.length > 0) {
          result[sectionName] = items;
        }
        i = arrNext;
        continue;
      } else if (OBJECT_SECTIONS.has(trimmed)) {
        // Parse object section (style)
        const sectionName = trimmed;
        result[sectionName] = {};
        i++;

        while (i < lines.length) {
          const { trimmed: innerTrimmed, indent: innerIndent } = lines[i];

          // If indent goes back to 0, we're done with this section
          if (innerIndent === 0) {
            break;
          }

          const kv = parseKeyValue(innerTrimmed);
          if (kv) {
            (result[sectionName] as Record<string, unknown>)[kv.key] = parseMultipleValues(
              kv.value,
            );
          }
          i++;
        }
        continue;
      }
    }

    // Top-level key-value pair
    if (indent === 0) {
      const kv = parseKeyValue(trimmed);
      if (kv) {
        result[kv.key] = parseValue(kv.value);
      }
    }

    i++;
  }

  return result;
}

/**
 * Check if a val is a valid visualization syntax
 */
export function isVisSyntax(input: any): boolean {
  if (typeof input !== 'string') return false;
  const trimmed = input.trim();
  return trimmed.startsWith('vis ');
}
