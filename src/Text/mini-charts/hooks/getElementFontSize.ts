import { TEXT_THEME } from '../../theme';

function getStyle(ele: Element, style: string): string | undefined {
  return window.getComputedStyle
    ? // @ts-ignore style as any
      window.getComputedStyle(ele, null)[style]
    : // @ts-ignore currentStyle for IE
      ele?.currentStyle?.[style];
}

function isAbsoluteUnitPx(str: string | undefined): boolean | undefined {
  return str?.endsWith('px');
}

function getPxNumber(str: string): number | undefined {
  const removeUnit = str.replace(/px$/, '');
  const resultNumber = Number(removeUnit);
  if (!Number.isNaN(resultNumber)) return resultNumber;
  return undefined;
}

export function getElementFontSize(ele: Element, defaultSize = TEXT_THEME.fontSizeBase): number {
  const FONT_SIZE = 'font-size';
  const eleFontSizeStr = getStyle(ele, FONT_SIZE);
  if (eleFontSizeStr && isAbsoluteUnitPx(eleFontSizeStr)) {
    const px = getPxNumber(eleFontSizeStr);
    if (px) return px;
  }
  const bodyFontSizeStr = getStyle(window.document.body, FONT_SIZE);
  if (bodyFontSizeStr && isAbsoluteUnitPx(bodyFontSizeStr)) {
    const px = getPxNumber(bodyFontSizeStr);
    if (px) return px;
  }
  return defaultSize;
}
