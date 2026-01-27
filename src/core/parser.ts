/**
 * Parser for AI-friendly visualization syntax
 * Inspired by Infographic and Toon format
 *
 * Example syntax:
 * vis pie
 * data
 *   - category 分类一
 *     value 27
 *   - category 分类二
 *     value 25
 * theme academy
 * innerRadius 0.6
 */

interface ParsedData {
  type: string;
  data?: any[];
  [key: string]: any;
}

/**
 * Parse a line to extract key-value pair
 */
function parseLine(line: string): { key: string; value: string } | null {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) {
    return null;
  }

  const match = trimmed.match(/^(\w+)\s+(.+)$/);
  if (match) {
    return { key: match[1], value: match[2] };
  }

  return null;
}

/**
 * Parse data array items
 */
function parseDataArray(lines: string[], startIndex: number): { data: any[]; endIndex: number } {
  const data: any[] = [];
  let currentItem: any = null;
  let i = startIndex;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // Check if line is a new item (starts with -)
    if (trimmed.startsWith('-')) {
      if (currentItem) {
        data.push(currentItem);
      }
      currentItem = {};

      // Parse the first property on the same line as -
      const afterDash = trimmed.substring(1).trim();
      const parsed = parseLine(afterDash);
      if (parsed) {
        currentItem[parsed.key] = parseValue(parsed.value);
      }
    } else if (trimmed && !trimmed.startsWith('#')) {
      // Check if this is a continuation of the current item
      const indentMatch = line.match(/^(\s+)/);
      if (indentMatch && currentItem) {
        const parsed = parseLine(trimmed);
        if (parsed) {
          currentItem[parsed.key] = parseValue(parsed.value);
        }
      } else {
        // End of data array
        break;
      }
    } else if (!trimmed) {
      // Empty line might indicate end of data section
      // But we should check next line first
      if (i + 1 < lines.length) {
        const nextLine = lines[i + 1].trim();
        if (nextLine && !nextLine.startsWith('-') && !nextLine.match(/^\s/)) {
          // Next line is a new top-level key
          break;
        }
      }
    }

    i++;
  }

  if (currentItem) {
    data.push(currentItem);
  }

  return { data, endIndex: i };
}

/**
 * Parse value to appropriate type
 */
function parseValue(value: string): any {
  const trimmed = value.trim();

  // Boolean
  if (trimmed === 'true') return true;
  if (trimmed === 'false') return false;

  // Number
  if (/^-?\d+\.?\d*$/.test(trimmed)) {
    return parseFloat(trimmed);
  }

  // String (remove quotes if present)
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }

  return trimmed;
}

/**
 * Parse visualization syntax to configuration object
 */
export function parseSyntax(text: string): ParsedData {
  const lines = text.split('\n');
  const result: ParsedData = { type: '' };
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // Skip empty lines and comments
    if (!trimmed || trimmed.startsWith('#')) {
      i++;
      continue;
    }

    // Parse vis type
    if (trimmed.startsWith('vis ')) {
      result.type = trimmed.substring(4).trim();
      i++;
      continue;
    }

    // Parse data section
    if (trimmed === 'data') {
      const { data, endIndex } = parseDataArray(lines, i + 1);
      result.data = data;
      i = endIndex;
      continue;
    }

    // Parse other key-value pairs
    const parsed = parseLine(line);
    if (parsed) {
      result[parsed.key] = parseValue(parsed.value);
    }

    i++;
  }

  return result;
}

/**
 * Validate if text is in syntax format (vs JSON)
 */
export function isSyntaxFormat(text: string): boolean {
  const trimmed = text.trim();

  // JSON format starts with { or [
  if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
    return false;
  }

  // Syntax format should contain 'vis' keyword
  return trimmed.includes('vis ') || trimmed.includes('data');
}
