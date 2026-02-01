/**
 * GPT-Vis Syntax Parser
 *
 * Parses a markdown-like syntax for visualization configurations.
 *
 * Syntax rules:
 * - `vis [chartType]` - Defines the chart type (required first line)
 * - `data` - Starts a data array section
 * - `  - key value` - Array item with key-value pairs
 * - `key: value` or `key value` - Top-level key-value pair
 * - `style` - Starts a style object section
 * - Multiple values separated by spaces become arrays (e.g., `palette #ff5a5f #1fb6ff`)
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
 */

/**
 * Parsed chart configuration result
 */
export interface ParsedConfig {
  type: string;
  [key: string]: unknown;
}

/**
 * Parser state for tracking current context
 */
interface ParserState {
  currentSection: string | null;
  currentArrayItem: Record<string, unknown> | null;
  currentArray: Record<string, unknown>[];
  result: ParsedConfig;
}

// Known section names that contain arrays
const ARRAY_SECTIONS = new Set(['data']);

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
 * Parse a key-value line (supports both "key: value" and "key value" formats)
 */
function parseKeyValue(line: string): { key: string; value: string } | null {
  const trimmed = line.trim();

  // Try "key: value" format first
  const colonMatch = trimmed.match(/^([a-zA-Z_][a-zA-Z0-9_-]*)\s*:\s*(.*)$/);
  if (colonMatch) {
    return { key: colonMatch[1], value: colonMatch[2] };
  }

  // Try "key value" format (key must be a valid identifier)
  const spaceMatch = trimmed.match(/^([a-zA-Z_][a-zA-Z0-9_-]*)\s+(.+)$/);
  if (spaceMatch) {
    return { key: spaceMatch[1], value: spaceMatch[2] };
  }

  // Single key without value
  const singleKey = trimmed.match(/^([a-zA-Z_][a-zA-Z0-9_-]*)$/);
  if (singleKey) {
    return { key: singleKey[1], value: '' };
  }

  return null;
}

/**
 * Get the indentation level of a line
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
 * Parse the visualization syntax string into a configuration object
 */
export function parse(syntax: string): ParsedConfig {
  const lines = syntax.split('\n');
  const state: ParserState = {
    currentSection: null,
    currentArrayItem: null,
    currentArray: [],
    result: { type: '' },
  };

  // Process each line
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();
    const indentLevel = getIndentLevel(line);

    // Skip empty lines
    if (trimmedLine === '') {
      continue;
    }

    // Handle "vis [type]" declaration
    if (trimmedLine.startsWith('vis ')) {
      finishCurrentSection(state);
      const chartType = trimmedLine.substring(4).trim();
      state.result.type = chartType;
      continue;
    }

    // Check for section headers (data, style, etc.) - single word, no indentation
    const isSectionHeader =
      /^[a-zA-Z_][a-zA-Z0-9_-]*$/.test(trimmedLine) && indentLevel === 0 && isKnownSection(trimmedLine);

    if (isSectionHeader) {
      // Finish previous section
      finishCurrentSection(state);

      // Start new section
      state.currentSection = trimmedLine;
      state.currentArray = [];
      state.currentArrayItem = null;
      continue;
    }

    // If we have no indentation and we're in a section, this is a top-level property
    // that ends the section
    if (indentLevel === 0 && state.currentSection) {
      // Finish the current section
      finishCurrentSection(state);

      // Parse as top-level key-value pair
      const kv = parseKeyValue(trimmedLine);
      if (kv) {
        state.result[kv.key] = parseValue(kv.value);
      }
      continue;
    }

    // Handle content within sections
    if (state.currentSection) {
      if (ARRAY_SECTIONS.has(state.currentSection)) {
        // Array section (data)
        if (isArrayItemLine(trimmedLine)) {
          // Finish previous array item
          if (state.currentArrayItem !== null) {
            state.currentArray.push(state.currentArrayItem);
          }

          // Start new array item
          state.currentArrayItem = {};

          // Parse the rest of the line after -
          const itemContent = parseArrayItemLine(trimmedLine);
          if (itemContent) {
            const kv = parseKeyValue(itemContent);
            if (kv) {
              state.currentArrayItem[kv.key] = parseValue(kv.value);
            }
          }
        } else if (state.currentArrayItem !== null) {
          // Continue current array item with additional properties
          const kv = parseKeyValue(trimmedLine);
          if (kv) {
            state.currentArrayItem[kv.key] = parseValue(kv.value);
          }
        }
      } else if (OBJECT_SECTIONS.has(state.currentSection)) {
        // Object section (style)
        const kv = parseKeyValue(trimmedLine);
        if (kv) {
          // Initialize section as object if needed
          if (!state.result[state.currentSection]) {
            state.result[state.currentSection] = {};
          }
          const sectionObj = state.result[state.currentSection] as Record<string, unknown>;
          sectionObj[kv.key] = parseMultipleValues(kv.value);
        }
      }
    } else {
      // Top-level key-value pair (not in a section)
      const kv = parseKeyValue(trimmedLine);
      if (kv) {
        state.result[kv.key] = parseValue(kv.value);
      }
    }
  }

  // Finish any remaining section
  finishCurrentSection(state);

  return state.result;
}

/**
 * Finish processing the current section
 */
function finishCurrentSection(state: ParserState): void {
  if (state.currentSection) {
    // Finish last array item
    if (state.currentArrayItem !== null) {
      state.currentArray.push(state.currentArrayItem);
      state.currentArrayItem = null;
    }

    // If we have array items, set the section as an array
    if (state.currentArray.length > 0) {
      state.result[state.currentSection] = state.currentArray;
    }

    state.currentSection = null;
    state.currentArray = [];
  }
}

/**
 * Check if a string is a valid visualization syntax
 */
export function isVisSyntax(input: string): boolean {
  const trimmed = input.trim();
  return trimmed.startsWith('vis ');
}
