/**
 * Measure text width using canvas
 */
export function measureTextWidth(text: string, font: any = {}): number {
  const { fontSize = 16, fontFamily = 'PingFang SC, sans-serif', fontWeight = 400 } = font;
  
  if (typeof document === 'undefined') return text.length * fontSize * 0.6;
  
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) return text.length * fontSize * 0.6;
  
  context.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
  const metrics = context.measureText(text);
  return metrics.width + 4;
}

/**
 * Measure text height
 */
export function measureTextHeight(text: string, font: any = {}): number {
  const { fontSize = 16 } = font;
  return fontSize * 1.5; // Line height factor
}

/**
 * Calculate text size with wrapping
 */
export function measureTextSize(
  text: string,
  offset = [0, 0],
  font: any = { fontSize: 16, fontFamily: 'PingFang SC, sans-serif' },
  minWidth = 0,
  maxWidth = Infinity,
): [number, number] {
  const height = measureTextHeight(text, font);
  const width = measureTextWidth(text, font);

  const lineNumber = maxWidth === Infinity ? 1 : Math.ceil(width / maxWidth);
  const [offsetWidth, offsetHeight] = offset;

  return [
    Math.max(minWidth, Math.min(maxWidth, width)) + offsetWidth,
    offsetHeight + height + height * 1.5 * (lineNumber - 1),
  ];
}

/**
 * Get linear text node style for MindMap
 */
export function getLinearTextNodeStyle(
  text: string,
  minWidth: number,
  maxWidth: number,
  depth: number = 0,
) {
  const font = {
    fontWeight: depth === 0 ? 600 : 400,
    fontSize: depth === 0 ? 24 : 16,
  };
  const offset = depth === 0 ? [64, 30] : [12, 12];
  const size = measureTextSize(text, offset, font, minWidth, maxWidth);
  return { font, size };
}

/**
 * Get boxed text node style for MindMap
 */
export function getBoxedTextNodeStyle(
  text: string,
  minWidth: number,
  maxWidth: number,
  depth: number = 0,
) {
  const font = {
    fontWeight: depth === 0 || depth === 1 ? 600 : 400,
    fontSize: depth === 0 ? 24 : 16,
  };
  const offset = depth === 0 ? [64, 30] : [36, 24];
  const size = measureTextSize(text, offset, font, minWidth, maxWidth);
  return { font, size };
}
